"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaTrashAlt,
  FaBoxOpen,
  FaDollarSign,
  FaInfo,
  FaShoppingCart,
} from "react-icons/fa";
import { LuLoader } from "react-icons/lu";
import { useCarts, useRemoveCart } from "@/hooks/useFavCarts";
import CartButton from "@/components/CartButton";

export default function CartTable() {
  const { data: carts = [], isLoading, isError } = useCarts();
  const removeCart = useRemoveCart();

  const grandTotal = useMemo(() => {
    return (
      carts?.reduce(
        (acc, item) =>
          acc + (item.totalPrice || item.price * (item.quantity || 1)),
        0
      ) || 0
    );
  }, [carts]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-48 text-gray-500">
        <LuLoader className="animate-spin mr-2 text-2xl" />
        Loading your cart...
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load cart items.
      </div>
    );

  if (!carts || carts.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-500">
        <FaBoxOpen className="text-5xl mb-2 text-gray-400" />
        <p>Your cart is empty.</p>
      </div>
    );

  return (
    <section className="w-full space-y-4">

      {/* --- Desktop Table --- */}
      <div className="hidden md:block overflow-x-auto bg-white border border-gray-200 shadow-sm rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((product) => (
              <tr
                key={product._id}
                className="border-t border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="relative w-14 h-14 md:w-16 md:h-16">
                    <Image
                      src={product.images?.[0] || "/assets/placeholder-image.svg"}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg shadow-sm"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 truncate max-w-[200px]">
                  {product.name}
                </td>
                <td className="px-4 py-3 text-gray-700">{product.price.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <CartButton productId={product._id as string} maxQuantity={product.quantity} />
                </td>
                <td className="px-4 py-3 font-semibold text-gray-900">
                  {(product.totalPrice || product.price * (product.quantity || 1)).toFixed(2)} BDT
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href={`/shop/${product._id}`}
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                      title="View details"
                    >
                      <FaInfo size={16} />
                    </Link>
                    <button
                      onClick={() => removeCart.mutate(product._id as string)}
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
                      title="Remove item"
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Mobile Card Layout --- */}
      <div className="md:hidden flex flex-col gap-4">
        {carts.map((product) => (
          <div
            key={product._id}
            className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4"
          >
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={product.images?.[0] || "/assets/placeholder-image.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1 w-full">
              <p className="font-medium text-gray-800">{product.name}</p>
              <p className="text-gray-700">Price: {product.price.toFixed(2)} BDT</p>
              <div className="flex items-center gap-2">
                <span>Qty:</span>
                <CartButton productId={product._id as string} maxQuantity={product.quantity} />
              </div>
              <p className="font-semibold text-gray-900">
                Total: {(product.totalPrice || product.price * (product.quantity || 1)).toFixed(2)} BDT
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <Link
                href={`/shop/${product._id}`}
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
              >
                <FaInfo />
              </Link>
              <button
                onClick={() => removeCart.mutate(product._id as string)}
                className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Grand Total + Checkout */}
      <div className="mt-4 flex flex-col md:flex-row md:items-center justify-end gap-3">
        <div className="bg-gray-50 border border-gray-200 px-6 py-4 rounded-xl shadow-sm flex items-center gap-2">
          <FaDollarSign className="text-green-600 text-xl" />
          <span className="text-lg font-semibold text-gray-800">
            Grand Total: <span className="text-green-700">BDT {grandTotal.toFixed(2)}</span>
          </span>
        </div>
        <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-3 rounded-xl transition">
          <FaShoppingCart /> Checkout
        </button>
      </div>
    </section>
  );
}
