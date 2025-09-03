"use client";

import { useGetItem, useUpdateItem } from "@/hooks/useItems";
import React from "react";

export default function ProductEdit({ params }: { params: { id: string } }) {
  const id = params.id;

  const { data: product, isLoading } = useGetItem(id);
  const updateProduct = useUpdateItem();

  if (isLoading) {
    return <p className="p-4">Loading product...</p>;
  }

  if (!product) {
    return <p className="p-4 text-red-600">Product not found.</p>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));

    // Ensure required fields are valid
    if (!name || isNaN(price)) {
      alert("Please provide valid name and price.");
      return;
    }

    // Trigger mutation
    updateProduct.mutate(
      { _id: id, name, price },
      {
        onSuccess: () => {
          alert("✅ Product updated successfully!");
        },
        onError: () => {
          alert("❌ Failed to update product. Please try again.");
        },
      }
    );
  };

  return (
    <div className="mt-10 p-4">
      <h2 className="text-xl font-semibold mb-4">
        Edit Product – {product._id}
      </h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          defaultValue={product.name}
          placeholder="Name"
          name="name"
          className="border p-2 flex-1"
        />
        <input
          defaultValue={product.price}
          placeholder="Price"
          name="price"
          type="number"
          className="border p-2 w-32"
        />
        <button
          type="submit"
          disabled={updateProduct.isPending}
          className={`px-4 py-2 rounded text-white ${
            updateProduct.isPending ? "bg-gray-400" : "bg-green-600"
          }`}
        >
          {updateProduct.isPending ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
