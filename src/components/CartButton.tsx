"use client";

import { useUserData } from "@/hooks/useUserData";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { LuLoader } from "react-icons/lu";
import toast from "react-hot-toast";

interface CartButtonProps {
  productId: string;
  maxQuantity: number;
}

export default function CartButton({ productId, maxQuantity }: CartButtonProps) {
  const { currentUser, isLoading } = useUserData();
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load user's existing cart item if found
  useEffect(() => {
    const cartItem = currentUser?.carts?.find(
      (c: { productId: string }) => c.productId === productId
    );
    if (cartItem) setQuantity(cartItem.quantity);
  }, [currentUser?.carts, productId]);

  // Update cart on backend and UI
  const updateCart = async (qty: number) => {
    if (!currentUser?.email) {
      toast.error("Please login first!");
      return;
    }

    // Check quantity limits before sending request
    if (qty < 1) {
      toast.error("Minimum 1 item required!");
      return;
    }
    if (qty > maxQuantity) {
      toast.error("Unable Quantity! Only limited stock available.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/items/carts/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: qty }),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "Failed to update cart!");
      } else {
        setQuantity(qty);
        toast.success("Cart updated successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while updating cart!");
    }
    setLoading(false);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center p-2">
        <LuLoader className="animate-spin text-gray-500" size={20} />
      </div>
    );

  return (
    <div className="flex items-center space-x-2">
      {/* Minus Button */}
      <button
        disabled={loading || quantity <= 1}
        onClick={() => updateCart(quantity - 1)}
        className="size-8 rounded-full bg-gray-200 hover:bg-gray-300 text-base flex items-center justify-center transition disabled:opacity-50 active:scale-95 cursor-pointer"
      >
        <FaMinus />
      </button>

      {/* Quantity Input */}
      <input
        type="number"
        value={quantity}
        min={1}
        max={maxQuantity}
        onChange={(e) => {
          const val = parseInt(e.target.value);
          if (isNaN(val)) return;
          updateCart(val);
        }}
        className="w-14 h-8 text-center border border-gray-300 rounded-full py-1 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
      />

      {/* Plus Button */}
      <button
        disabled={loading || quantity >= maxQuantity}
        onClick={() => updateCart(quantity + 1)}
        className="size-8 rounded-full bg-gray-200 hover:bg-gray-300 text-base flex items-center justify-center transition disabled:opacity-50 active:scale-95 cursor-pointer"
      >
        <FaPlus />
      </button>
    </div>
  );
}
