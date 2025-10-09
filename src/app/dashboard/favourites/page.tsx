"use client";

import React from "react";
import Image from "next/image";
import AddToFavourite from "@/components/FavouriteButton";
import { FaHeart, FaBoxOpen, FaInfo } from "react-icons/fa";
import Link from "next/link";
import { useFavourites } from "@/hooks/useFavCarts";

export default function FavoritesTable() {
  const { data: favorites, isLoading, isError } = useFavourites();

  console.log(favorites);

  // Loading states
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        <FaBoxOpen className="animate-pulse text-3xl mr-2 text-gray-400" />
        Loading your favorites...
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load favorites.
      </div>
    );

  if (!favorites || favorites.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-500">
        <FaBoxOpen className="text-5xl mb-2 text-gray-400" />
        <p>No favorites found.</p>
      </div>
    );

  return (
    <div className="w-full mt-4">
      <div className="flex items-center mb-4 space-x-2 text-gray-700">
        <FaHeart className="text-2xl text-pink-600" />
        <h2 className="text-xl font-semibold">My Favorites</h2>
      </div>

      <div className="overflow-x-auto bg-white border border-gray-200 shadow-sm rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Name & Price</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {favorites.map((product) => (
              <tr
                key={product._id}
                className="border-t hover:bg-gray-50 transition cursor-pointer"
              >
                {/* Product Image */}
                <td className="px-4 py-3">
                  <Image
                    src={product.images[0] || "/assets/placeholder-image.svg"}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="w-16 h-16 object-cover rounded-md shadow-sm"
                  />
                </td>

                {/* Product Name + Price */}
                <td className="px-4 py-3 flex flex-col">
                  <span className="font-medium text-gray-800">
                    {product.name}
                  </span>
                  <span className="text-gray-700 mt-1">
                    ${product.price.toFixed(2)}
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="px-4 py-3 ">
                  <div className="flex items-center justify-center gap-2">
                    {/* View Product */}
                    <Link
                      href={`/shop/${product._id}`}
                      className="p-2 rounded-full inline-flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                      title="Show details"
                    >
                      <FaInfo />
                    </Link>

                    {/* Remove from favorites */}

                    <AddToFavourite productId={product._id as string} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
