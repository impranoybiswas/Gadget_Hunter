"use client";

import Image from "next/image";
import { Product } from "@/types/product";
import Modal from "@/ui/Modal";
import { PayButton } from "./PayButton";

type Props = {
  selectedProducts: Product[];
  cartTotal: number;
};

export default function CheckoutButton({ selectedProducts, cartTotal }: Props) {


  return (
    <Modal lebel="Checkout Now" disabled={selectedProducts.length === 0}>
      <div className="space-y-4">

        {/* Header */}
        <h2 className="text-lg font-semibold text-gray-800">
          Order Summary
        </h2>

        {/* Selected Products */}
        <div className="max-h-64 overflow-y-auto space-y-3">
          {selectedProducts.map((product) => (
            <div
              key={product._id}
              className="flex items-center gap-3 border rounded-lg p-3"
            >
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image
                  src={product.images?.[0] || "/assets/placeholder-image.svg"}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  {product.name}
                </p>
                <p className="text-sm text-gray-600">
                  Qty: {product.quantity || 1}
                </p>
              </div>

              <p className="font-semibold text-gray-900">
                BDT{" "}
                {(product.totalPrice ||
                  product.price * (product.quantity || 1)
                ).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center border-t pt-4">
          <span className="text-gray-700 font-medium">
            Total Amount
          </span>
          <span className="text-lg font-bold text-green-700">
            BDT {cartTotal.toFixed(2)}
          </span>
        </div>

        {/* Pay Now */}
        <div className="pt-2">
          <PayButton cartTotal={cartTotal} selectedProducts={selectedProducts} />
        </div>

      </div>
    </Modal>
  );
}
