"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useFavourites } from "@/hooks/useFavCarts";
import AddToFavourite from "@/components/FavouriteButton";
import { LuLoader } from "react-icons/lu";
import { TbAlertTriangle } from "react-icons/tb";
import { FcInfo, FcPackage } from "react-icons/fc";

export default function FavoritesTable() {
  const { data: favorites, isLoading, isError } = useFavourites();

  // =========================
  // 🌀 Loading State
  // =========================
  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center py-16 text-gray-500">
        <LuLoader className="animate-spin text-4xl mb-3 text-indigo-500" />
        <p className="text-lg font-medium">Loading your favorites...</p>
      </div>
    );

  // =========================
  // ❌ Error State
  // =========================
  if (isError)
    return (
      <div className="flex flex-col justify-center items-center py-16 text-red-500">
        <TbAlertTriangle className="text-5xl mb-3" />
        <p className="text-lg font-medium">Failed to load favorites.</p>
      </div>
    );

  // =========================
  // 📦 Empty State
  // =========================
  if (!favorites || favorites.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <FcPackage className="text-6xl mb-3 text-gray-400" />
        <p className="text-lg font-medium">You haven’t added any favorites yet.</p>
        <p className="text-sm text-gray-400 mt-1">
          Browse products and tap the ♥ icon to save them here.
        </p>
      </div>
    );

  // =========================
  // 🧾 Table Layout (Desktop)
  // 📱 Card Layout (Mobile)
  // =========================
  return (
    <section className="w-full">
      <div className="overflow-x-auto bg-white border border-gray-200 shadow-sm rounded-xl">
        {/* Table Header */}
        <table className="min-w-full hidden md:table text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Details</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {favorites.map((product) => (
              <tr
                key={product._id}
                className="border-t hover:bg-gray-50 transition-colors duration-150"
              >
                {/* Product Image */}
                <td className="px-5 py-4">
                  <Image
                    src={product.images?.[0] || "/assets/placeholder-image.svg"}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="w-16 h-16 object-cover rounded-md shadow-sm border border-gray-200"
                  />
                </td>

                {/* Product Info */}
                <td className="px-5 py-4 align-middle">
                  <h3 className="font-medium text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mt-1 font-semibold">
                    ${product.price.toFixed(2)}
                  </p>
                </td>

                {/* Action Buttons */}
                <td className="px-5 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {/* View Product */}
                    <Link
                      href={`/shop/${product._id}`}
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                      title="View Details"
                    >
                      <FcInfo size={16} />
                    </Link>

                    {/* Remove Favorite */}
                    <AddToFavourite productId={product._id as string} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Card Layout */}
        <div className="md:hidden divide-y divide-gray-200">
          {favorites.map((product) => (
            <div
              key={product._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={product.images?.[0] || "/assets/placeholder-image.svg"}
                  alt={product.name}
                  width={70}
                  height={70}
                  className="w-20 h-20 object-cover rounded-md border border-gray-200"
                />

                <div>
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 font-semibold mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <Link
                  href={`/shop/${product._id}`}
                  className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                >
                  <FcInfo size={16} />
                </Link>

                <AddToFavourite productId={product._id as string} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
