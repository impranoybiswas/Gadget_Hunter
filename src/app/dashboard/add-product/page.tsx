"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddItem } from "@/hooks/useItems";
import { Product } from "@/types/product";
import { ImageUpload } from "@/customs/ImageUpload";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

/** Form field types */
type ProductFormValues = {
  name: string;
  brand: string;
  price: number;
  quantity: number;
  category: string;
  warranty: string;
  description: string;
  isBrandNew: string; // "true" | "false"
};

export default function AddProduct() {
  const { register, handleSubmit, reset } = useForm<ProductFormValues>();
  const addProduct = useAddItem();

  // Image state management
  const [images, setImages] = useState<string[]>(["", "", ""]);
  const [loading, setLoading] = useState(false);

  /** Handle new image upload */
  const handleImageUpload = (url: string, index: number) => {
    const updated = [...images];
    updated[index] = url;
    setImages(updated);
  };

  /** Handle form submission */
  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);

      // Validation check
      const uploadedImages = images.filter((img) => img);
      if (uploadedImages.length === 0) {
        toast.error("Please upload at least one product image.");
        setLoading(false);
        return;
      }

      const product: Product = {
        name: data.name.trim(),
        brand: data.brand.trim(),
        price: Number(data.price),
        quantity: Number(data.quantity),
        category: data.category.trim(),
        warranty: data.warranty.trim(),
        description: data.description.trim(),
        isBrandNew: data.isBrandNew === "true",
        images: uploadedImages,
      };

      // Send to backend
      await addProduct.mutateAsync(product);
      toast.success("✅ Product added successfully!");
      reset();
      setImages(["", "", ""]);
    } catch (err) {
      console.error("❌ Error adding product:", err);
      toast.error("Something went wrong while adding product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800">
          Add New Product
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Fill out the details below to list a new gadget in the store.
        </p>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-base-300 border border-base-300-gray-100 shadow-lg rounded-2xl p-6 sm:p-8 space-y-6"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Basic Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              {...register("name", { required: true })}
              placeholder="Google Pixel 6"
              className="w-full border border-base-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Brand</label>
            <input
              {...register("brand", { required: true })}
              placeholder="Google"
              className="w-full border border-base-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price (BDT)</label>
            <input
              {...register("price", { required: true, valueAsNumber: true })}
              type="number"
              placeholder="59999"
              className="w-full border border-base-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <input
              {...register("quantity", { required: true, valueAsNumber: true })}
              type="number"
              placeholder="5"
              className="w-full border border-base-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <input
              {...register("category")}
              placeholder="Mobile, Laptop, Accessories..."
              className="w-full border border-base-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Warranty</label>
            <input
              {...register("warranty")}
              placeholder="12 months"
              className="w-full border border-base-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Product Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Describe the key features of your gadget..."
            className="w-full border border-base-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none min-h-[120px]"
          />
        </div>

        {/* New / Used Toggle */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Product Condition
          </label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="true"
                {...register("isBrandNew")}
                className="text-blue-600"
              />
              <span>Brand New</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="false"
                {...register("isBrandNew")}
                className="text-blue-600"
              />
              <span>Used</span>
            </label>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Product Images (Up to 3)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <ImageUpload
                key={i}
                folder="gadget_hunters/products"
                label={`Upload Image ${i + 1}`}
                imageUrl={images[i] || "/assets/placeholder-image.svg"}
                onUploadSuccess={(url) => handleImageUpload(url, i)}
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-end">
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={loading || addProduct.status === "pending"}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition disabled:opacity-50 flex items-center gap-2"
          >
            {loading || addProduct.status === "pending" ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Adding...
              </>
            ) : (
              "Add Product"
            )}
          </motion.button>
        </div>
      </motion.form>
    </section>
  );
}
