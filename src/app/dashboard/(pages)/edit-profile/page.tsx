"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserData } from "@/hooks/useUserData";
import toast from "react-hot-toast";
import Button from "@/ui/Button";
import axiosApi from "@/libs/axiosInstance";
import { ImageUpload } from "@/customs/ImageUpload";
import { motion } from "framer-motion";
import { FaImage, FaUser, FaVenusMars } from "react-icons/fa";


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
      toast.error((err as Error).message || "Something went wrong!");
    }
  };

  return (
    <section className="w-full flex justify-center">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white rounded-xl shadow-md border border-gray-100 p-6 sm:p-8 md:p-10 space-y-8 transition-all hover:shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Title */}
        <div className="text-center mb-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            Edit Your Profile
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Update your personal information and profile picture.
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <motion.div
            className="flex flex-col"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <label
              htmlFor="name"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
            >
              <FaUser size={16} className="text-indigo-600" /> Full Name{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your full name"
              className="rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-2.5 outline-none transition placeholder:text-gray-400"
            />
          </motion.div>

          {/* Gender Field */}
          <motion.div
            className="flex flex-col"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <label
              htmlFor="gender"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
            >
              <FaVenusMars size={16} className="text-pink-600" /> Gender
            </label>
            <select
              id="gender"
              {...register("gender")}
              className="rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-2.5 outline-none transition bg-white"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </motion.div>
        </div>

        {/* Image Upload */}
        <motion.div
          className="flex flex-col gap-3"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 sm:mb-0">
            <FaImage size={16} className="text-blue-500" />
            Profile Picture
          </label>

          <ImageUpload
            folder="gadget_hunters/profile_images"
            label="Upload New Image"
            onUploadSuccess={(url) =>
              setValue("image", url, { shouldValidate: true })
            }
            imageUrl={image}
          />
        </motion.div>

        {/* Submit Button */}
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
