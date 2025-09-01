"use client";
import React, { useState } from "react";
import { useProducts, useAddProduct, useDeleteProduct } from "@/hooks/useProducts";
import Link from "next/link";

export default function ProductsPage() {
  const { data: products, isLoading } = useProducts();
  const addProduct = useAddProduct();
  const deleteProduct = useDeleteProduct();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Add Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addProduct.mutate({ name, price: Number(price) });
          setName("");
          setPrice("");
        }}
        className="flex gap-2 mb-6"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-2"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
          className="border p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>

      {/* Product List */}
      <ul className="space-y-2">
        {products?.map((p) => (
          <li key={p._id} className="border p-2 rounded flex justify-between">
            {p.name} - ${p.price}
            <button
              onClick={() => deleteProduct.mutate(p._id)}
              className="text-red-600"
            >
              Delete
            </button>
            <Link href={`/products/edit/${p._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
