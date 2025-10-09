"use client";

import { useToggleCart } from "@/hooks/useFavCarts";
import { useUserData } from "@/hooks/useUserData";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { LuLoader } from "react-icons/lu";

interface CartButtonProps {
  productId: string;
  maxQuantity: number;
}

export default function CartButton({
  productId,
  maxQuantity,
}: CartButtonProps) {
  const { currentUser, isLoading: userLoading } = useUserData();
  const [quantity, setQuantity] = useState(0);

  const toggleCart = useToggleCart();

  // Load user's existing cart item if found
  useEffect(() => {
    const cartItem = currentUser?.carts?.find(
      (c: { productId: string }) => c.productId === productId
    );
    setQuantity(cartItem?.quantity || 0);
  }, [currentUser?.carts, productId]);

  // Update cart quantity using useToggleCart
  const updateCart = (qty: number) => {
    if (!currentUser?.email) return; // backend handles session

    if (qty < 1) {
      toggleCart.mutate({ productId, quantity: 0 }); // remove item
      return;
    }
    if (qty > maxQuantity) {
      // Limit check
      return;
    }

    toggleCart.mutate(
      { productId, quantity: qty },
      {
        onSuccess: () => {
          setQuantity(qty);
        },
      }
    );
  };

  if (userLoading)
    return (
      <div className="flex justify-center items-center p-2">
        <LuLoader className="animate-spin text-gray-500" size={20} />
      </div>
    );

  return (
    <div className="flex items-center space-x-2">
      {/* Minus Button */}
      <button
        disabled={quantity <= 1}
        onClick={() => updateCart(quantity - 1)}
        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition disabled:opacity-50 active:scale-95 cursor-pointer"
      >
        <FaMinus />
      </button>

      {/* Quantity Input */}
      <input
        type="number"
        value={quantity}
        min={0}
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
        disabled={quantity >= maxQuantity}
        onClick={() => updateCart(quantity + 1)}
        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition disabled:opacity-50 active:scale-95 cursor-pointer"
      >
        <FaPlus />
      </button>
    </div>
  );
}
