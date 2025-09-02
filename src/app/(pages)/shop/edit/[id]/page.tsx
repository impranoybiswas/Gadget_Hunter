"use client";
import { useGetProduct, useUpdateProduct } from "@/hooks/useProducts";
import React from "react";

export default function ProductEdit({ params }: { params: { id: string } }) {
  const id = params.id;

  const { data: product, isLoading } = useGetProduct(id);

  const { mutate } = useUpdateProduct();
  return (
    <div className="mt-30">
      {id}

      {/* Update Form */}
      {!isLoading && product && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            mutate({
              ...product,
              name: data.name as string,
              price: Number(data.price),
            });
          }}
          className="flex gap-2 mb-6"
        >
          <input
            defaultValue={product.name}
            placeholder="Name"
            name="name"
            className="border p-2"
          />
          <input
            defaultValue={product.price}
            placeholder="Price"
            name="price"
            type="number"
            className="border p-2"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
}
