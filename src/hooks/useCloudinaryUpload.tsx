"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

type UseCloudinaryUploadReturn = {
  uploadImage: (file: File) => Promise<string | null>;
  loading: boolean;
};

export const useCloudinaryUpload = (folder: string = "default"): UseCloudinaryUploadReturn => {
  const [loading, setLoading] = useState(false);

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file) return null;

    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image size should be under 3MB");
      return null;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
      formData.append("folder", folder);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || "Upload failed");
      }

      const data = await res.json();
      toast.success("Image uploaded successfully!");
      return data.secure_url;
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, loading };
};
