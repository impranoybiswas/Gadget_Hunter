"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserData } from "@/hooks/useUserData";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import Image from "next/image";
import toast from "react-hot-toast";
import Button from "@/ui/Button";
import axiosApi from "@/libs/axiosInstance";

// Form values type
type ProfileFormValues = {
  name: string;
  gender: string;
  image: string;
};

export default function EditProfilePage() {
  const { currentUser } = useUserData();
  const { uploadImage, loading: uploading } =
    useCloudinaryUpload("profile_images");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      name: "",
      gender: "",
      image: "",
    },
  });

  // Watch the "image" field to preview uploaded profile picture
  const image = watch("image");

  /**
   * Sync form values with current user data
   */
  useEffect(() => {
    if (currentUser) {
      reset({
        name: currentUser.name || "",
        gender: currentUser.gender || "",
        image: currentUser.image || "",
      });
    }
  }, [currentUser, reset]);

  /**
   * Handle profile image upload
   */
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const uploadedUrl = await uploadImage(file);
      if (uploadedUrl) {
        setValue("image", uploadedUrl, { shouldValidate: true });
        toast.success("Image uploaded successfully!");
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Failed to upload image");
    }
  };

  /**
   * Handle profile update submission
   */
  const onSubmit = async (data: ProfileFormValues) => {
    try {
      // ✅ Use PUT to update user profile (adjust endpoint if needed)
      await axiosApi.patch(`/user?email=${currentUser?.email}`, data);

      toast.success("Profile updated successfully!");
    } catch (err: unknown) {
      console.error("Profile update failed:", err);
      toast.error((err as Error).message || "Something went wrong");
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Edit Profile
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white shadow-md rounded-lg p-6 border"
      >
        {/* Name Field */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2"
          />
        </div>

        {/* Gender Select */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            {...register("gender")}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Profile Image Upload */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Profile Image
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              disabled={uploading || isSubmitting}
              onChange={handleImageChange}
              className="block text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-white
                hover:file:bg-primary/90"
            />

            {/* Show preview if an image is set */}
            {image && (
              <Image
                src={image}
                width={64}
                height={64}
                alt="Profile preview"
                className="rounded-full border object-cover w-16 h-16"
              />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            label={isSubmitting ? "Updating..." : "Update Profile"}
            disabled={uploading || isSubmitting}
          />
        </div>
      </form>
    </section>
  );
}
