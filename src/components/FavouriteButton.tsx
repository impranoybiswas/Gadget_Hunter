"use client";

import { useToggleFavorite } from "@/hooks/useFavCarts";
import { useUserData } from "@/hooks/useUserData";
import React, { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

interface FavouriteButtonProps {
  productId: string;
}

export default function FavouriteButton({ productId }: FavouriteButtonProps) {
  const { currentUser, isLoading: userLoading } = useUserData();
  const [isFavourite, setIsFavourite] = useState(false);
  const toggleFavorite = useToggleFavorite();

  // Sync local state with user data
  useEffect(() => {
    if (currentUser?.favorites) {
      setIsFavourite(currentUser.favorites.includes(productId));
    }
  }, [currentUser?.favorites, productId]);

  // Handle click
  const handleToggle = () => {
    if (!currentUser?.email) {
      // Optional: show toast or alert
      alert("Please log in to save favorites.");
      return;
    }

    toggleFavorite.mutate(productId, {
      onSuccess: () => {
        // Optimistic update (instant feedback)
        setIsFavourite((prev) => !prev);
      },
    });
  };

  if (userLoading)
    return (
      <div className="loading loading-ring loading-sm" aria-label="loading" />
    );

  return (
    <button
      onClick={handleToggle}
      disabled={userLoading}
      className={`size-8 rounded-full bg-gray-200 hover:bg-gray-300 text-base flex items-center justify-center transition disabled:opacity-50 active:scale-95 cursor-pointer`}
    >
      {isFavourite ? (
        <GoHeartFill className="text-red-500" />
      ) : (
        <GoHeart className="text-gray-600" />
      )}
    </button>
  );
}
