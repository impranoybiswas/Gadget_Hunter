"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useAddItem } from "@/hooks/useItems";
import { Product } from "@/types/product";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

/**
 * Type definition for form fields.
 * Matches Product + file inputs.
 */
type ProductFormValues = {
  name: string;
  brand: string;
  price: number;
  quantity: number;
  category: string;
  warranty: string;
  description: string;
  isBrandNew: string; // radio: "true" | "false"
  thumbnail: FileList;
  image1: FileList;
  image2: FileList;
  image3: FileList;
};

export default function AddProduct() {
  // react-hook-form setup
  const { register, handleSubmit, reset } = useForm<ProductFormValues>();

  // mutation hook for API call
  const addProduct = useAddItem();

  // custom hook for uploading images to Cloudinary
  const { uploadImage, loading } = useCloudinaryUpload("products");

  /**
   * Handles form submission.
   * 1. Upload images to Cloudinary
   * 2. Build product object
   * 3. Send to backend
   */
  const onSubmit = async (data: ProductFormValues) => {
    try {
      // Upload thumbnail
      let thumbnailUrl = "";
      if (data.thumbnail?.[0]) {
        thumbnailUrl = (await uploadImage(data.thumbnail[0])) || "";
      }

      // Upload other images
      const imagesUrls: string[] = [];
      for (const key of ["image1", "image2", "image3"] as const) {
        if (data[key]?.[0]) {
          const url = await uploadImage(data[key][0]);
          if (url) imagesUrls.push(url);
        }
      }

      // Build product object
      const product: Product = {
        name: data.name,
        brand: data.brand,
        price: Number(data.price),
        quantity: Number(data.quantity),
        category: data.category,
        warranty: data.warranty,
        description: data.description,
        isBrandNew: data.isBrandNew === "true",
        thumbnail: thumbnailUrl,
        images: imagesUrls,
      };

      // Call backend mutation
      addProduct.mutate(product);

      // Reset form after successful submission
      reset();
    } catch (err) {
      console.error("❌ Error while adding product:", err);
    }
  };

  return (
    <section className="flex flex-col gap-6">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold p-4 rounded bg-blue-600 text-white uppercase shadow">
        Add New Product
      </h1>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 p-6 border rounded-lg shadow bg-white"
      >
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            {...register("name")}
            placeholder="Product Name"
            className="border p-2 rounded w-full"
            required
          />
          <input
            {...register("brand")}
            placeholder="Brand"
            className="border p-2 rounded w-full"
            required
          />
          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            placeholder="Price"
            className="border p-2 rounded w-full"
            required
          />
          <input
            {...register("quantity", { valueAsNumber: true })}
            type="number"
            placeholder="Quantity"
            className="border p-2 rounded w-full"
            required
          />
          <input
            {...register("category")}
            placeholder="Category"
            className="border p-2 rounded w-full"
          />
          <input
            {...register("warranty")}
            placeholder="Warranty"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Description */}
        <textarea
          {...register("description")}
          placeholder="Description"
          className="border p-2 rounded w-full min-h-[100px]"
        />

        {/* File Inputs */}
        <div className="space-y-2">
          <label className="block font-medium">Thumbnail</label>
          <input type="file" accept="image/*" {...register("thumbnail")} />

          <label className="block font-medium">Gallery Images</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input type="file" accept="image/*" {...register("image1")} />
            <input type="file" accept="image/*" {...register("image2")} />
            <input type="file" accept="image/*" {...register("image3")} />
          </div>
        </div>

        {/* Radio Buttons */}
        <div className="flex gap-6 items-center">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="true"
              {...register("isBrandNew")}
              defaultChecked
            />
            <span>Brand New</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="false" {...register("isBrandNew")} />
            <span>Used</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium transition disabled:opacity-50"
          disabled={loading || addProduct.status === "pending"}
        >
          {loading || addProduct.status === "pending" ? (
            <span className="flex items-center gap-2">
              <span className="loading loading-ring loading-sm" />
              Adding...
            </span>
          ) : (
            "Add Product"
          )}
        </button>
      </form>
      <div className="h-100"/>
    </section>
  );
}
