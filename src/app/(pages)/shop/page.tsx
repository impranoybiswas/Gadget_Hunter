"use client";

import React, { useEffect, useState } from "react";
import { useGetItems } from "@/hooks/useItems";
import { useSearchParams, useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { Product } from "@/types/product";
import Container from "@/ui/Container";
import Section from "@/ui/Section";
import ProductCard from "@/components/ProductCard";
import { FaSearch } from "react-icons/fa";

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
  const { data: allData } = useGetItems(1, "", "", "");
  const allCategories = allData?.items.map((p) => p.category);
  const categories = [...new Set(allCategories)];
  const allBrands = allData?.items.map((p) => p.brand);
  const brands = [...new Set(allBrands)];

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
        className="space-y-8"
      >
        {/* Filter Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Search Input */}
          <div className="relative w-full lg:col-span-2">
            <input
              type="text"
              placeholder="Search products..."
              className="border border-base-300 rounded-md p-3 w-full shadow-sm focus-within:outline-primary focus-within:outline-1 focus-within:shadow-md transition-all duration-300  ease-in-out pl-10"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Brand Dropdown */}

            <select
              value={brand}
              onChange={(e) => {
                setPage(1);
                setBrand(e.target.value);
              }}
              className="border border-base-300 rounded-md shadow-sm p-3 w-full focus-within:outline-primary focus-within:outline-1 focus-within:shadow-md transition-all duration-300  ease-in-out "
            >
              <option value="">All Brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b.charAt(0).toUpperCase() + b.slice(1)}
                </option>
              ))}
            </select>
   

          {/* Category Tabs with Horizontal Scroll */}
          <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar col-span-1 md:col-span-2">
            {/* All Tab */}
            <button
              onClick={() => {
                setPage(1);
                setCategory("");
              }}
              className={`px-5 py-2 cursor-pointer whitespace-nowrap rounded-md border border-base-300 transition-all ${
                category === ""
                  ? "bg-primary text-white shadow"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
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
                className={`px-5 py-2 cursor-pointer whitespace-nowrap rounded-md border-base-300 border transition-all ${
                  category === cat
                    ? "bg-primary text-white shadow"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
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
            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            First
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
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
