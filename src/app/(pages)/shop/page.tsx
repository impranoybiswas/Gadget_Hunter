"use client";

import React, { useEffect, useState } from "react";
import { useGetItems } from "@/hooks/useItems";
import { useSearchParams, useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { Product } from "@/types/product";
import Container from "@/ui/Container";
import Section from "@/ui/Section";
import ProductCard from "@/components/ProductCard";

/**
 * =========================
 * Shop Page
 * =========================
 * - Shows products in card layout
 * - Search bar for filtering
 * - Pagination controls
 * - "View Details" navigation
 */
export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract current page & search from URL params
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("search") || "";

  // Local state for controlled inputs
  const [page, setPage] = useState(currentPage);
  const [search, setSearch] = useState(currentSearch);

  // Fetch paginated products
  const { data, isLoading } = useGetItems(page, search);

  // When page or search changes, update URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (search) params.set("search", search);

    router.push(`/shop?${params.toString()}`);
  }, [page, search, router]);

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
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded-lg p-3 w-full shadow-sm"
          value={search}
          onChange={(e) => {
            setPage(1); // Reset to first page on new search
            setSearch(e.target.value);
          }}
        />

        {/* Product Grid */}
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

        {/* Pagination Controls */}
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
