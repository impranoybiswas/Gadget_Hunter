import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { _id, thumbnail, name, brand, price } = product;

  return (
    <div className="group relative border rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white flex flex-col">
      {/* Thumbnail */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          fill
          src={
            thumbnail ||
            "./assets/placeholder-image.svg"
          }
          alt={name}
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badge */}
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md">
          New
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
          {name}
        </h2>
        <p className="text-gray-500 text-sm mb-2">{brand}</p>
        <p className="font-bold text-xl text-blue-600 mb-4">${price}</p>

        {/* Actions */}
        <div className="mt-auto">
          <Link
            href={`/shop/${_id}`}
            className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
