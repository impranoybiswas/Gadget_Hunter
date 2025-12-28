"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaTrashAlt,
  FaBoxOpen,
  FaInfo,
} from "react-icons/fa";
import { LuLoader } from "react-icons/lu";

import { useCarts, useRemoveCart } from "@/hooks/useFavCarts";

import CartButton from "@/components/CartButton";
import CheckoutButton from "@/components/CheckoutButton";

import { Product } from "@/types/product";

export default function CartTable() {
  const { data: carts = [], isLoading, isError } = useCarts();
  const removeCart = useRemoveCart();

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  // handle checkbox select / deselect
  const handleSelectProduct = (product: Product, checked: boolean) => {
    setSelectedProducts((prev) => {
      if (checked) {
        return [...prev, product];
      } else {
        return prev.filter((p) => p._id !== product._id);
      }
    });
  };

  // grand total of ALL carts
  const grandTotal = useMemo(() => {
    return carts.reduce(
      (acc, item) =>
        acc + (item.totalPrice || item.price * (item.quantity || 1)),
      0
    );
  }, [carts]);

  // total of SELECTED carts (checkout total)
  const selectedTotal = useMemo(() => {
    return selectedProducts.reduce(
      (acc, item) =>
        acc + (item.totalPrice || item.price * (item.quantity || 1)),
      0
    );
  }, [selectedProducts]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-500">
        <LuLoader className="animate-spin mr-2 text-2xl" />
        Loading your cart...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load cart items.
      </div>
    );
  }

  if (!carts || carts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-500">
        <FaBoxOpen className="text-5xl mb-2 text-gray-400" />
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <section className="w-full space-y-4">

      {/* ================= Desktop Table ================= */}
      <div className="hidden md:block overflow-x-auto bg-white border border-gray-200 shadow-sm rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-center">Select</th>
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
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-green-600 cursor-pointer"
                    checked={selectedProducts.some(
                      (p) => p._id === product._id
                    )}
                    onChange={(e) =>
                      handleSelectProduct(product, e.target.checked)
                    }
                  />
                </td>

                <td className="px-4 py-3">
                  <div className="relative size-12">
                    <Image
                      src={product.images?.[0] || "/assets/placeholder-image.svg"}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </td>

                <td className="px-4 py-3 font-medium text-gray-800">
                  {product.name}
                </td>

                <td className="px-4 py-3">
                  {product.price.toFixed(2)} BDT
                </td>

                <td className="px-4 py-3">
                  <CartButton
                    productId={product._id as string}
                    maxQuantity={product.quantity}
                  />
                </td>

                <td className="px-4 py-3 font-semibold">
                  {(product.totalPrice ||
                    product.price * (product.quantity || 1)
                  ).toFixed(2)}{" "}
                  BDT
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/shop/${product._id}`}
                      className="p-2 bg-blue-100 text-blue-600 rounded-full"
                    >
                      <FaInfo />
                    </Link>

                    <button
                      onClick={() =>
                        removeCart.mutate(product._id as string)
                      }
                      className="p-2 bg-red-100 text-red-600 rounded-full"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Mobile Cards ================= */}
      <div className="md:hidden flex flex-col gap-4">
        {carts.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <input
                type="checkbox"
                className="w-4 h-4 accent-green-600"
                checked={selectedProducts.some(
                  (p) => p._id === product._id
                )}
                onChange={(e) =>
                  handleSelectProduct(product, e.target.checked)
                }
              />
              <p className="font-medium">{product.name}</p>
            </div>

            <div className="relative w-full h-40 mb-3">
              <Image
                src={product.images?.[0] || "/assets/placeholder-image.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <p>Price: {product.price.toFixed(2)} BDT</p>

            <div className="flex items-center gap-2 my-2">
              <span>Qty:</span>
              <CartButton
                productId={product._id as string}
                maxQuantity={product.quantity}
              />
            </div>

            <p className="font-semibold">
              Total:{" "}
              {(product.totalPrice ||
                product.price * (product.quantity || 1)
              ).toFixed(2)}{" "}
              BDT
            </p>

            <div className="flex gap-2 mt-3">
              <Link
                href={`/shop/${product._id}`}
                className="p-2 bg-blue-100 text-blue-600 rounded-full"
              >
                <FaInfo />
              </Link>

              <button
                onClick={() =>
                  removeCart.mutate(product._id as string)
                }
                className="p-2 bg-red-100 text-red-600 rounded-full"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= Summary + Checkout ================= */}
      <div className="flex flex-col md:flex-row justify-end gap-4 mt-4">
        <div className="bg-gray-50 border px-6 py-4 rounded-xl">
          <p className="text-sm text-gray-600">Selected Total</p>
          <p className="text-lg font-semibold text-green-700">
            BDT {selectedTotal.toFixed(2)}
          </p>
        </div>

        <CheckoutButton
          selectedProducts={selectedProducts}
        
        />
      </div>
    </section>
  );
}
