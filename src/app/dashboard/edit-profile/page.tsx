"use client";
import React, { useState } from "react";
import { useUserData } from "@/hooks/useUserData";
import Image from "next/image";
import toast from "react-hot-toast";
import Button from "@/ui/Button";
import DashboardLayout from "../components/DashboardLayout";

export default function ProfilePage() {
  const { data: user } = useUserData();
  const { email, name: currentName, gender: currentGender, image: currentImage } = user || {};
  const [name, setName] = useState(currentName);
  const [gender, setGender] = useState(currentGender);
  const [image, setImage] = useState(currentImage);
  const [loading, setLoading] = useState(false);

  // Upload image to Cloudinary
  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    formData.append("folder", "profile_images");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || "Upload failed");
    }

    const data = await res.json();
    return data.secure_url;
  };

  // Handle image file selection
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image size should be under 3MB");
      return;
    }

    setLoading(true);
    try {
      const uploadedUrl = await uploadToCloudinary(file);
      setImage(uploadedUrl); // immediately show preview
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  // Submit profile update to backend (MongoDB)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/user?email=${email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, gender, image }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");

      toast.success("Profile updated successfully!");
    } catch (err: unknown) {
      console.error(err);
      toast.error((err as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <DashboardLayout>
          <section className="p-4 flex flex-col gap-4">
            <h1 className="text-2xl p-4 rounded-sm bg-primary text-white uppercase">Profile</h1>
              <form
              onSubmit={handleSubmit}
              className="flex w-full relative flex-col gap-4 bg-blue-100 p-4 rounded-sm"
            >
              {/* Name */}
              <div className="p-2 border rounded-sm border-gray-400">
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full input input-bordered focus:outline-none"
                />
              </div>
        
              {/* Gender */}
              <div  className="p-2 border rounded-sm border-gray-400">
                <label className="block mb-1 font-medium">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full input input-bordered focus:outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
        
              {/* Profile Image */}
              <div className="p-2 border rounded-sm border-gray-400 flex gap-5">
                <div className="flex-1">
                <label className="block mb-1 font-medium">Profile Image</label>
                <input className="w-full input input-bordered focus:outline-none flex items-center" type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                {image && (
                  <Image
                    src={image}
                    width={200}
                    height={200}
                    alt="Preview"
                    className="mt-2 size-12 md:size-16 lg:size-20 object-cover rounded-md border"
                  />
                )}
              </div>
        
              {/* Submit button */}
              <Button type="submit" label={loading ? "Updating..." : "Update Profile"} />
            </form>
          
          </section>
        </DashboardLayout>
  );
}
