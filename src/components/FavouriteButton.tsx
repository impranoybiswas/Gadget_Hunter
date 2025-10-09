"use client";

import { useUserData } from "@/hooks/useUserData";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoHeart, GoHeartFill } from "react-icons/go";

export default function FavouriteButton({ productId }: { productId: string }) {
  const { currentUser, isLoading } = useUserData();
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fav = currentUser?.favorites?.includes(productId) || false;
    setIsFavourite(fav);
  }, [currentUser?.favorites, productId]);

  const handleToggleFavourite = async () => {
    if (!currentUser?.email) {
      toast.error("Please login first!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/items/favorites/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Something went wrong");
      } else {
        setIsFavourite((prev) => !prev); // optimistic UI
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update favorites");
    }

    setLoading(false);
  };

  if (isLoading) return <div className="loading loading-ring loading-sm" />;

  return (
    <button
      onClick={handleToggleFavourite}
      disabled={loading}
      className="size-8 rounded-full bg-gray-200 hover:bg-gray-300 text-base flex items-center justify-center transition disabled:opacity-50 active:scale-95 cursor-pointer"
    >
      {isFavourite ? <GoHeartFill className="text-red-500" /> : <GoHeart />}
    </button>
  );
}
