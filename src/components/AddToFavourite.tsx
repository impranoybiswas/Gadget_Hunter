"use client";

import { useUserData } from "@/hooks/useUserData";
import React, { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

export default function AddToFavourite({ productId }: { productId: string }) {
  const { currentUser, isLoading } = useUserData();
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fav = currentUser?.favorites?.includes(productId) || false;
    setIsFavourite(fav);
  }, [currentUser?.favorites, productId]);

  const handleToggleFavourite = async () => {
    if (!currentUser?.email) {
      alert("Please login first!");
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
        setIsFavourite(prev => !prev); // optimistic UI
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
      className="btn btn-sm btn-circle btn-outline bg-base-100 hover:bg-base-300 transition-all duration-300 ease-in-out"
    >
      {isFavourite ? <GoHeartFill className="text-red-500" size={22} /> : <GoHeart size={22} />}
    </button>
  );
}
