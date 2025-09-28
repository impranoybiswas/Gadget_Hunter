"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserData } from "@/hooks/useUserData";
import toast from "react-hot-toast";
import Button from "@/ui/Button";
import axiosApi from "@/libs/axiosInstance";
import { ImageUpload } from "@/customs/ImageUpload";

// Form values type
type ProfileFormValues = {
  name: string;
  gender: string;
  image: string;
};

export default function EditProfilePage() {
  const { currentUser } = useUserData();

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
   * Handle profile update submission
   */
  const onSubmit = async (data: ProfileFormValues) => {
    try {
      // ✅ Use PUT to update user profile (adjust endpoint if needed)
      await axiosApi.patch(`/user`, data);

      toast.success("Profile updated successfully!");
    } catch (err: unknown) {
      console.error("Profile update failed:", err);
      toast.error((err as Error).message || "Something went wrong");
    }
  };

  return (
    <section className="w-full mx-auto flex flex-col gap-6">
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
          <ImageUpload
            folder="gadget_hunters/profile_images"
            label="Profile Picture"
            onUploadSuccess={(url) => setValue("image", url, { shouldValidate: true })}
            imageUrl={image}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
          isOutline={false}
          isLarge={true}
            type="submit"
            label={isSubmitting ? "Updating..." : "Update Profile"}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </section>
  );
}
