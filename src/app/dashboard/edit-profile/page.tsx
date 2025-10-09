"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserData } from "@/hooks/useUserData";
import toast from "react-hot-toast";
import Button from "@/ui/Button";
import axiosApi from "@/libs/axiosInstance";
import { ImageUpload } from "@/customs/ImageUpload";
import { motion } from "framer-motion";

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

  const image = watch("image");

  useEffect(() => {
    if (currentUser) {
      reset({
        name: currentUser.name || "",
        gender: currentUser.gender || "",
        image: currentUser.image || "",
      });
    }
  }, [currentUser, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await axiosApi.patch(`/user`, data);
      toast.success("Profile updated successfully!");
    } catch (err: unknown) {
      console.error("Profile update failed:", err);
      toast.error((err as Error).message || "Something went wrong");
    }
  };

  return (
    <section className="max-w-3xl mx-auto w-full p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Edit Profile
        </h1>
        <p className="text-gray-500 text-sm">
          Update your personal information and profile picture.
        </p>
      </div>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 md:p-8 space-y-6"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your full name"
              className="rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary p-2.5 outline-none transition"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              {...register("gender")}
              className="rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary p-2.5 outline-none transition"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Profile Picture
          </label>
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <ImageUpload
              folder="gadget_hunters/profile_images"
              label="Upload New Image"
              onUploadSuccess={(url) => setValue("image", url, { shouldValidate: true })}
              imageUrl={image}
            />
            
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-end">
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              label={isSubmitting ? "Updating..." : "Update Profile"}
              disabled={isSubmitting}
              isOutline={false}
              isLarge={true}
            />
          </motion.div>
        </div>
      </motion.form>
    </section>
  );
}
