"use client";

import React, { useMemo } from "react";
import { useUserData } from "@/hooks/useUserData";
import Image from "next/image";
import { Product } from "@/types/product";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosApi from "@/libs/axiosInstance";
import CartButton from "@/components/CartButton";
import toast from "react-hot-toast";
import {
  FaTrashAlt,
  FaShoppingCart,
  FaBoxOpen,
  FaDollarSign,
  FaInfo,
} from "react-icons/fa";
import { LuLoader } from "react-icons/lu";
import Link from "next/link";

export default function CartTable() {
  const { currentUser, isLoading: userLoading } = useUserData();
  const queryClient = useQueryClient();

  // Fetch cart products
  const fetchCarts = async (): Promise<Product[]> => {
    const res = await axiosApi.get("/items/carts/all");
    return res.data.items || [];
  };

  const {
    data: carts,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["carts", currentUser?.email],
    queryFn: fetchCarts,
    enabled: !!currentUser?.email,
    staleTime: 0,
    retry: 1,
    refetchInterval: 1000,
  });

  // Remove cart item
  const handleRemoveCart = async (productId: string) => {
    try {
      await axiosApi.post("/items/carts/remove", { productId });
      toast.success("Item removed from cart!");
      queryClient.invalidateQueries({
        queryKey: ["carts", currentUser?.email],
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item!");
    }
  };

  // Calculate grand total
  const grandTotal = useMemo(() => {
    return (
      carts?.reduce(
        (acc, item) =>
          acc + (item.totalPrice || item.price * (item.quantity || 1)),
        0
      ) || 0
    );
  }, [carts]);

  // Loading states
  if (userLoading || isLoading)
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        <LuLoader className="animate-spin mr-2" /> Loading your cart...
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
    <div className="w-full mt-4">
      <div className="flex items-center mb-4 space-x-2 text-gray-700">
        <FaShoppingCart className="text-2xl text-indigo-600" />
        <h2 className="text-xl font-semibold">My Cart</h2>
      </div>

      <div className="overflow-x-auto bg-white border border-gray-200 shadow-sm rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3 flex items-center gap-1">Price (BDT)</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {carts.map((product) => (
              <tr
                key={product._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">
                  <Image
                    src={product.images[0] || "/assets/placeholder-image.svg"}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="size-16 object-cover rounded-md shadow-sm"
                  />
                </td>

                <td className="px-4 py-3 font-medium text-gray-800">
                  {product.name}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {product.price.toFixed(2)}
                </td>

                <td className="px-4 py-3">
                  <CartButton
                    productId={product._id as string}
                    maxQuantity={product.quantity}
                  />
                </td>

                <td className="px-4 py-3 font-semibold text-gray-900">
                  {(
                    product.totalPrice ||
                    product.price * (product.quantity || 1)
                  ).toFixed(2)}{" "}
                  BDT
                </td>

                <td className="px-4 py-3 text-center space-x-2">
                  <Link
                    href={`/shop/${product._id}`}
                    className="p-2 rounded-full inline-flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                    title="Show details"
                  >
                    <FaInfo />
                  </Link>

                  <button
                    onClick={() => handleRemoveCart(product._id as string)}
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition cursor-pointer"
                    title="Remove item"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grand Total Section */}
      <div className="mt-6 flex justify-end">
        <div className="bg-gray-100 px-6 py-4 rounded-lg shadow-sm flex items-center space-x-3">
          <FaDollarSign className="text-green-600 text-xl" />
          <span className="text-lg font-semibold text-gray-800">
            Grand Total: BDT {grandTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
