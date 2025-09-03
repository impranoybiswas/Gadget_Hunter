"use client";
import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useForm } from "react-hook-form";
import { useAddItem } from "@/hooks/useItems";
import { Product } from "@/types/product";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

type ProductFormValues = {
  name: string;
  brand: string;
  price: number;
  quantity: number;
  category: string;
  warranty: string;
  description: string;
  isBrandNew: string; // string from radio, convert to boolean
  thumbnail: FileList;
  image1: FileList;
  image2: FileList;
  image3: FileList;
};

export default function AddProduct() {
  const { register, handleSubmit, reset } = useForm<ProductFormValues>();
  const addProduct = useAddItem();
  console.log("add product", addProduct);

  // use your custom Cloudinary hook
  const { uploadImage, loading } = useCloudinaryUpload("products");

  const onSubmit = async (data: ProductFormValues) => {
    try {
      // Upload thumbnail
      let thumbnailUrl = "";
      if (data.thumbnail?.[0]) {
        thumbnailUrl = (await uploadImage(data.thumbnail[0])) || "";
      }

      // Upload images
      const imagesUrls: string[] = [];
      for (const key of ["image1", "image2", "image3"] as const) {
        if (data[key]?.[0]) {
          const url = await uploadImage(data[key][0]);
          if (url) imagesUrls.push(url);
        }
      }

      // Build Product object
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

      // Send to backend via hook
      addProduct.mutate(product);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <section className="p-4 flex flex-col gap-4">
        <h1 className="text-2xl p-4 rounded-sm bg-primary text-white uppercase">
          Add Product
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-4 border rounded"
        >
          <input {...register("name")} placeholder="Product Name" className="border p-2 w-full" />
          <input {...register("brand")} placeholder="Brand" className="border p-2 w-full" />
          <input {...register("price", { valueAsNumber: true })} type="number" placeholder="Price" className="border p-2 w-full" />
          <input {...register("quantity", { valueAsNumber: true })} type="number" placeholder="Quantity" className="border p-2 w-full" />
          <input {...register("category")} placeholder="Category" className="border p-2 w-full" />
          <input {...register("warranty")} placeholder="Warranty" className="border p-2 w-full" />
          <textarea {...register("description")} placeholder="Description" className="border p-2 w-full" />

          {/* Thumbnail */}
          <label>
            Thumbnail:
            <input type="file" accept="image/*" {...register("thumbnail")} />
          </label>

          {/* Three separate images */}
          <label>
            Image 1:
            <input type="file" accept="image/*" {...register("image1")} />
          </label>
          <label>
            Image 2:
            <input type="file" accept="image/*" {...register("image2")} />
          </label>
          <label>
            Image 3:
            <input type="file" accept="image/*" {...register("image3")} />
          </label>

          {/* Radio buttons for isBrandNew */}
          <div className="flex gap-4">
            <label>
              <input type="radio" value="true" {...register("isBrandNew")} defaultChecked /> Brand New
            </label>
            <label>
              <input type="radio" value="false" {...register("isBrandNew")} /> Used
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={loading || addProduct.status === "pending"}
          >
            {loading || addProduct.status === "pending" ? (<span><span className="loading loading-ring loading-sm"/> Adding...</span> ) : "Add Product"}
          </button>
        </form>
      </section>
    </DashboardLayout>
  );
}
