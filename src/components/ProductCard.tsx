import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import FavouriteButton from "./FavouriteButton";
import { motion } from "framer-motion";
import Skeleton from "@/ui/Skeleton";

/**
 * ProductCard Component
 * 
 * Displays a single product's information in a card format.
 * Includes hover effects, wishlist functionality, and navigation to product details.
 */
export default function ProductCard({
  product,
  isLoading
}: {
  product?: Product;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="border border-base-content/5 rounded-xl bg-base-100 overflow-hidden flex flex-col p-4 gap-4 shadow-sm">
        <Skeleton variant="rectangle" className="aspect-square w-full" />
        <div className="space-y-2">
          <Skeleton variant="text" className="h-3 w-1/3" />
          <Skeleton variant="text" className="h-5 w-3/4" />
          <Skeleton variant="text" className="h-6 w-1/2" />
        </div>
      </div>
    );
  }

  if (!product) return null;

  const { _id, name, brand, price, images, category } = product;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative border border-base-content/10 rounded-xl shadow-sm hover:shadow-lg bg-base-100 overflow-hidden flex flex-col transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-square overflow-hidden bg-base-200">
        <Image
          src={images?.[0] || "/assets/placeholder-image.svg"}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
          sizes="(max-width: 768px) 100vw, 25vw"
        />

        {/* Wishlist Button */}
        <div className="absolute top-3 right-3 z-10">
          <FavouriteButton productId={_id as string} />
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Hover Action */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Link
            href={`/shop/${_id}`}
            className="px-4 py-2 text-sm font-semibold rounded-full bg-base-100 text-primary shadow hover:bg-primary hover:text-primary-content transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-4">
        <p className="text-xs md:text-sm text-base-content/50 uppercase tracking-wide mb-1">
          {brand}
        </p>
        <h3 className="text-sm md:text-base font-semibold text-base-content line-clamp-1 mb-2">
          {name}
        </h3>

        <div className="flex items-center text-primary font-semibold text-base">
          <TbCurrencyTaka size={18} />
          {price}
          <span className="text-sm text-base-content/40 font-normal ml-1">Only</span>
        </div>

        {/* Action Button for mobile */}
        <div className="mt-4 block md:hidden">
          <Link
            href={`/shop/${_id}`}
            className="flex w-full justify-center items-center bg-primary text-primary-content py-2 rounded-md shadow-sm hover:bg-primary/90 transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Floating Label (Optional) */}
      <div className="absolute top-3 left-3 bg-primary text-primary-content text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
        {category}
      </div>
    </motion.div>
  );
}
