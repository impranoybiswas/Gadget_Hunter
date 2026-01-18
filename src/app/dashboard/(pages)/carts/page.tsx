"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTrashAlt, FaBoxOpen, FaInfo } from "react-icons/fa";
import { LuLoader } from "react-icons/lu";
import { useCarts, useRemoveCart } from "@/hooks/useFavCarts";
import CartButton from "@/components/CartButton";
import CheckoutButton from "@/components/CheckoutButton";
import { Product } from "@/types/product";

export default function CartTable() {
  const { data: carts = [], isLoading, isError } = useCarts();
  const removeCart = useRemoveCart();

  // Selected products state
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  // Handle checkbox select/deselect
  const handleSelectProduct = (product: Product, checked: boolean) => {
    setSelectedProducts((prev) => {
      if (checked) {
        return [...prev, product];
      } else {
        return prev.filter((p) => p._id !== product._id);
      }
    });
  };

  // Update selectedProducts if quantity changes in cart
  const updatedSelectedProducts = useMemo(() => {
    return selectedProducts.map((p) => {
      const updated = carts.find((c) => c._id === p._id);
      return updated || p;
    });
  }, [selectedProducts, carts]);

  // Total of selected products
  const selectedTotal = useMemo(() => {
    return updatedSelectedProducts.reduce(
      (acc, item) => acc + (item.totalPrice || item.price * (item.quantity || 1)),
      0
    );
  }, [updatedSelectedProducts]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48 text-base-content/50">
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
      <div className="flex flex-col items-center justify-center py-10 text-base-content/50">
        <FaBoxOpen className="text-5xl mb-2 text-base-content/30" />
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <section className="w-full space-y-4">
      {/* ================= Summary + Checkout ================= */}
      <div className="flex flex-col md:flex-row items-center justify-end gap-4 mt-6 w-full">
        {/* Total Amount */}
        <div className="flex flex-row items-center gap-2 bg-base-200 h-12 px-6 rounded-lg border border-base-content/10 w-full md:w-auto">
          <span className="text-sm text-base-content/70 font-medium">
            Selected Total:
          </span>
          <span className="text-xl font-bold text-success">
            BDT {selectedTotal.toFixed(2)}
          </span>
        </div>

        {/* Checkout Button */}
        <div className="w-full md:w-auto">
          <CheckoutButton
            selectedProducts={updatedSelectedProducts}
            cartTotal={selectedTotal}
          />
        </div>
      </div>

      {/* ================= Desktop Table ================= */}
      <div className="hidden md:block overflow-x-auto bg-base-100 border border-base-content/10 shadow-sm rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-base-200 text-base-content/70 uppercase text-xs">
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
              <tr key={product._id} className="border-t border-base-content/5 hover:bg-base-200/50">
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
                  <div className="relative w-12 h-12">
                    <Image
                      src={
                        product.images?.[0] || "/assets/placeholder-image.svg"
                      }
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </td>

                <td className="px-4 py-3 font-medium text-base-content">
                  {product.name}
                </td>

                <td className="px-4 py-3">{product.price.toFixed(2)} BDT</td>

                <td className="px-4 py-3">
                  <CartButton
                    productId={product._id as string}
                    maxQuantity={product.quantity}
                  />
                </td>

                <td className="px-4 py-3 font-semibold">
                  {(
                    product.totalPrice ||
                    product.price * (product.quantity || 1)
                  ).toFixed(2)}{" "}
                  BDT
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/shop/${product._id}`}
                      className="p-2 bg-info/10 text-info rounded-full hover:bg-info/20 transition-colors"
                    >
                      <FaInfo />
                    </Link>

                    <button
                      onClick={() => removeCart.mutate(product._id as string)}
                      className="p-2 bg-error/10 text-error rounded-full hover:bg-error/20 transition-colors cursor-pointer"
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
            className="bg-base-100 border border-base-content/10 rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                className="w-4 h-4 accent-success cursor-pointer"
                checked={selectedProducts.some((p) => p._id === product._id)}
                onChange={(e) =>
                  handleSelectProduct(product, e.target.checked)
                }
              />
              <p className="font-semibold text-base-content">{product.name}</p>
            </div>

            <div className="relative w-full h-40 mb-4 bg-base-200 rounded-lg overflow-hidden">
              <Image
                src={product.images?.[0] || "/assets/placeholder-image.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-base-content/60">Price:</span>
                <span className="font-medium text-base-content">{product.price.toFixed(2)} BDT</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-base-content/60">Quantity:</span>
                <CartButton
                  productId={product._id as string}
                  maxQuantity={product.quantity}
                />
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-base-content/5 text-base">
                <span className="font-bold text-base-content">Total:</span>
                <span className="font-bold text-success">
                  {(
                    product.totalPrice || product.price * (product.quantity || 1)
                  ).toFixed(2)}{" "}
                  BDT
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-base-content/5">
              <Link
                href={`/shop/${product._id}`}
                className="flex-1 flex items-center justify-center gap-2 p-2 bg-info/10 text-info rounded-lg hover:bg-info/20 transition-colors text-sm"
              >
                <FaInfo size={12} />
                <span>Details</span>
              </Link>

              <button
                onClick={() => removeCart.mutate(product._id as string)}
                className="flex-1 flex items-center justify-center gap-2 p-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors text-sm cursor-pointer"
              >
                <FaTrashAlt size={12} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
