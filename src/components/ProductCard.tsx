import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import AddToFavourite from "./AddToFavourite";

export default function ProductCard({ product }: { product: Product }) {
  const { _id, name, brand, price, images } = product;

  return (
    <div className="group relative border border-base-300 rounded-md shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-base-100 flex flex-col p-2 hover:-translate-y-2">
      {/* Thumbnail */}
      <div className="relative w-full h-60 overflow-hidden bg-gray-50 border border-base-300 rounded-md">
        <Image
          fill
          src={images[0] || "/assets/placeholder-image.svg"}
          alt={name}
          className="object-cover transition-transform duration-500 h-40 group-hover:scale-110 w-full "
        />

        {/* Wishlist Icon */}
        <span className="absolute top-3 right-3">
          <AddToFavourite productId={_id as string} />
        </span>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 pt-3">
        <p className="font-medium text-sm md:text-base uppercase pl-2">
          {brand}
        </p>
        <p className="font-medium text-sm md:text-base pb-1 line-clamp-1 pl-2">
          {name}
        </p>
        <span className="pl-2 text-sm md:text-base flex items-center gap-0 text-primary">
          <TbCurrencyTaka size={20} />
          {price} Only
        </span>

        {/* Actions */}
        <div className="mt-5">
          <Link
            href={`/shop/${_id}`}
            className="flex w-full justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded-md transition-colors duration-300 shadow-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
