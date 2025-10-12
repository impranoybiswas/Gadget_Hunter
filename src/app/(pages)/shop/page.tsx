"use client";

import React, { useEffect, useState } from "react";
import { useGetItems } from "@/hooks/useItems";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import Container from "@/ui/Container";
import Section from "@/ui/Section";
import Loading from "@/app/loading";
import { FaSearch } from "react-icons/fa";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL State
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentBrand = searchParams.get("brand") || "";

  // Local State
  const [page, setPage] = useState(currentPage);
  const [search, setSearch] = useState(currentSearch);
  const [category, setCategory] = useState(currentCategory);
  const [brand, setBrand] = useState(currentBrand);

  // Fetch data
  const { data, isLoading } = useGetItems(page, search, category, brand);
  const { data: allData } = useGetItems(1, "", "", "");

  const allCategories = Array.from(new Set(allData?.items.map((p) => p.category) || []));
  const allBrands = Array.from(new Set(allData?.items.map((p) => p.brand) || []));

  // Sync URL params
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
        subtitle="Explore top-quality items curated just for you"
        className="space-y-10"
      >
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Search Input */}
          <div className="relative lg:col-span-2">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="w-full border border-base-300 rounded-md pl-10 p-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary transition duration-300"
            />
          </div>

          {/* Brand Dropdown */}
          <select
            value={brand}
            onChange={(e) => {
              setPage(1);
              setBrand(e.target.value);
            }}
            className="border border-base-300 rounded-md p-3 shadow-sm focus:ring-1 focus:ring-primary transition duration-300"
          >
            <option value="">All Brands</option>
            {allBrands.map((b) => (
              <option key={b} value={b}>
                {b.charAt(0).toUpperCase() + b.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {["All", ...allCategories].map((cat) => {
            const value = cat === "All" ? "" : cat;
            const isActive = category === value;
            return (
              <button
                key={cat}
                onClick={() => {
                  setPage(1);
                  setCategory(value);
                }}
                className={`px-5 py-2 rounded-md whitespace-nowrap border transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-sm border-primary"
                    : "bg-base-200 hover:bg-base-300 border-base-300"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
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
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
            <button
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              First
            </button>
            <button
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </button>

            <span className="font-medium text-gray-700">
              Page {page} of {totalPages}
            </span>

            <button
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
            <button
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            >
              Last
            </button>
          </div>
        )}
      </Section>
    </Container>
  );
}
