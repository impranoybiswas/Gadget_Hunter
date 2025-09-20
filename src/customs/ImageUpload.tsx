"use client";

import { useImageKitUpload } from "@/hooks/useImageKitUpload";
import Image from "next/image";

type ImageUploadProps = {
  folder?: string;
  onUploadSuccess: (url: string) => void; // required, parent handles state
  label?: string;
  className?: string;
  imageUrl?: string | null; // controlled by parent
};

export function ImageUpload({
  folder = "default",
  onUploadSuccess,
  label = "Upload Image",
  className = "",
  imageUrl = null,
}: ImageUploadProps) {
  const { uploadImage, loading } = useImageKitUpload(folder);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadedUrl = await uploadImage(file);
    if (uploadedUrl) {
      onUploadSuccess(uploadedUrl); // ✅ only notify parent
    }
  };

  return (
    <div
      className={`flex w-full h-22 items-start justify-between gap-2 ${className} border shadow border-gray-200 rounded-md p-3`}
    >
      {/* Upload Input */}
      <div className="flex flex-col gap-2">
        <label className="font-medium">{label}</label>
        <input
          type="file"
          onChange={handleChange}
          disabled={loading}
          className="block text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-primary file:text-white
            hover:file:bg-primary/90"
        />
      </div>

      {/* Preview Image */}
      <div className="text-primary">
        <Image
          width={200}
          height={200}
          className="size-16 object-cover rounded-lg shadow"
          src={
            loading
              ? "/assets/uploading.svg"
              : imageUrl || "/assets/placeholder_image.svg"
          }
          alt="Uploaded preview"
        />
      </div>
    </div>
  );
}
