"use client";

import React from "react";
import { useUserData } from "@/hooks/useUserData";
import Image from "next/image";
import { Product } from "@/types/product";
import AddToFavourite from "@/components/AddToFavourite";
import { useQuery } from "@tanstack/react-query";
import axiosApi from "@/libs/axiosInstance";

export default function FavoritesTable() {
  const { currentUser, isLoading: userLoading } = useUserData();

  const fetchFavorites = async (): Promise<Product[]> => {
    const res = await axiosApi.get("/items/favorites/all");
    return res.data.items || [];
  };

  const {
    data: favorites,
    isLoading,
    isError,
    refetch,
  } = useQuery<Product[]>({
    queryKey: ["favorites", currentUser?.email],
    queryFn: fetchFavorites,
    enabled: !!currentUser?.email, // only fetch if user is logged in
    staleTime: 5 * 60 * 1000, // cache for 5 min
    retry: 1,
  });

  if (userLoading || isLoading) return <div>Loading favorites...</div>;
  if (isError) return <p>Error loading favorites.</p>;
  if (!favorites || favorites.length === 0) return <p>No favorites found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Title & Price</th>
            <th className="px-4 py-2 text-left">Favorite</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((product) => (
            <tr onClick={() => refetch()} key={product._id} className="border-t">
              <td className="px-4 py-2">
                <Image
                  src={product.images[0] || "/assets/placeholder-image.svg"}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2 flex flex-col">
                {product.name} <span>${product.price}</span>
              </td>
              <td className="px-4 py-2">
                <AddToFavourite productId={product._id as string} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
