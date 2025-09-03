"use client";
import React, { useEffect, useState } from "react";
import { useGetItems, useAddItem, useDeleteItem } from "@/hooks/useItems";
import Link from "next/link";
import Loading from "@/app/loading";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "@/types/product";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 🔹 URL থেকে page আর search query বের করা
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("search") || "";

  const [page, setPage] = useState(currentPage);
  const [search, setSearch] = useState(currentSearch);

  const { data, isLoading } = useGetItems(page, search);
  const addProduct = useAddItem();
  const deleteProduct = useDeleteItem();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 🔹 যখন page বা search change হবে, URL এ reflect করাও
  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (search) params.set("search", search);

    router.push(`/shop?${params.toString()}`);
  }, [page, search, router]);

  if (isLoading) return <Loading />;

  const products = data?.items || [];
  const totalPages = data?.totalPages || 1;

  const handleAddProduct = (e : React.FormEvent) => {
    e.preventDefault();
    const newProduct = { name, price : parseInt(price)};
          addProduct.mutate(newProduct as Product);
          setName("");
          setPrice("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Add Form */}
      <form
        onSubmit={handleAddProduct}
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

      {/* Search box */}
      <input
        type="text"
        placeholder="Search products..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => {
          setPage(1); // reset to first page when searching
          setSearch(e.target.value);
        }}
      />

      {/* Product List */}
      <ul className="space-y-2">
        {products?.map((p) => (
          <li
            key={p._id}
            className="border p-2 rounded flex justify-between items-center"
          >
            <span>
              {p.name} - ${p.price}
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => deleteProduct.mutate(p._id!)}
                className="text-red-600"
              >
                Delete
              </button>
              <Link href={`/shop/edit/${p._id}`} className="text-blue-600">
                Edit
              </Link>
              <Link href={`/shop/${p._id}`} className="text-green-600">
                View
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          First
        </button>

        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>

        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
}
