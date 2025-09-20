"use client";

import React, { useEffect, useState } from "react";
import { useGetItems } from "@/hooks/useItems";
import { useSearchParams, useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { Product } from "@/types/product";
import Container from "@/ui/Container";
import Section from "@/ui/Section";
import ProductCard from "@/components/ProductCard";

// Demo: ideally fetch these from backend
const categories = ["mobile", "tablet", "laptop", "accessory"];
const brands = ["apple", "samsung", "xiaomi", "oppo"];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentBrand = searchParams.get("brand") || "";

  const [page, setPage] = useState(currentPage);
  const [search, setSearch] = useState(currentSearch);
  const [category, setCategory] = useState(currentCategory);
  const [brand, setBrand] = useState(currentBrand);

  const { data, isLoading } = useGetItems(page, search, category, brand);

  // Sync filters with URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (brand) params.set("brand", brand);

    router.push(`/shop?${params.toString()}`);
  }, [page, search, category, brand, router]);

  if (isLoading) return <Loading />;

  const products = data?.items || [];
  const totalPages = data?.totalPages || 1;

  return (
    <Container>
      <Section
        title="Our Products"
        subtitle="Browse and discover the best items available"
        className="space-y-6"
      >
        {/* Filter Row */}
        <div className="flex flex-col gap-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search products..."
            className="border rounded-lg p-3 w-full shadow-sm"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />

          {/* Category Tabs with Horizontal Scroll */}
          <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
            {/* All Tab */}
            <button
              onClick={() => {
                setPage(1);
                setCategory("");
              }}
              className={`px-4 py-2 whitespace-nowrap rounded-lg border ${
                category === "" ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setPage(1);
                  setCategory(cat);
                }}
                className={`px-4 py-2 whitespace-nowrap rounded-lg border ${
                  category === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Brand Dropdown */}
          <select
            value={brand}
            onChange={(e) => {
              setPage(1);
              setBrand(e.target.value);
            }}
            className="border rounded-lg p-3 w-full md:w-48 shadow-sm"
          >
            <option value="">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b.charAt(0).toUpperCase() + b.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products.length > 0 ? (
            products.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No products found.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
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
          <span className="font-medium">
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
      </Section>
    </Container>
  );
}
