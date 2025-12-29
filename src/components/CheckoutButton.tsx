"use client";

import { Product } from "@/types/product";
import Modal from "@/ui/Modal";
import { PayButton } from "./PayButton";
import Button from "@/ui/Button";
import { FaCartShopping } from "react-icons/fa6";

type Props = {
  selectedProducts: Product[];
  cartTotal: number;
};

export default function CheckoutButton({ selectedProducts, cartTotal }: Props) {
  return (
    <Modal
      lebel={
        <Button
          label="Checkout"
          leftIcon={<FaCartShopping />}
          isLarge
          isOutline={false}
          disabled={selectedProducts.length === 0}
        />
      }
    >
      <div className="space-y-4">
        {/* Header */}
        <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-sm font-medium text-gray-700">Product</th>
                <th className="p-2 text-sm font-medium text-gray-700">Qty</th>
                <th className="p-2 text-sm font-medium text-gray-700">Unit Price</th>
                <th className="p-2 text-sm font-medium text-gray-700">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product) => (
                <tr
                  key={product._id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  {/* Product */}
                  <td className="p-2 text-gray-800 font-medium text-sm tracking-tight">
                
                    {product.name}
                  </td>

                  {/* Quantity */}
                  <td className="p-2 text-sm text-gray-700">
                    {product.cartQuantity || 1}
                  </td>

                  {/* Base Price */}
                  <td className="p-2 text-sm text-gray-700">
                    BDT {product.price.toFixed(2)}
                  </td>

                  {/* Total Price */}
                  <td className="p-2 text-sm font-semibold text-green-700">
                    BDT{" "}
                    {(
                      product.totalPrice ||
                      product.price * (product.cartQuantity || 1)
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center border-t pt-4">
          <span className="text-gray-700 font-medium">Total Amount</span>
          <span className="text-lg font-bold text-green-700">
            BDT {cartTotal.toFixed(2)}
          </span>
        </div>

        {/* Pay Now */}
        <div className="pt-2 float-end">
          <PayButton cartTotal={cartTotal} selectedProducts={selectedProducts} />
        </div>
      </div>
    </Modal>
  );
}
