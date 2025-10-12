"use client";

import { useParams } from "next/navigation";
import { useGetItem } from "@/hooks/useItems";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Loading from "@/app/loading";
import Container from "@/ui/Container";
import Section from "@/ui/Section";
import ToggleToFavourite from "@/components/FavouriteButton";
import CartButton from "@/components/CartButton";
import { FaShoppingCart } from "react-icons/fa";

/**
 * =========================================================
 * Product Detail Page — Clean, Modern, and Responsive Layout
 * =========================================================
 */
export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  // Fetch product
  const { data: product, isLoading } = useGetItem(id);

  if (isLoading) return <Loading />;

  if (!product) {
    return (
      <Container>
        <p className="text-center text-gray-500 py-16 text-lg font-medium">
          Product not found.
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <Section
        title={product.name}
        subtitle="Detailed view of the selected product"
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8"
      >
        {/* ======== Left: Image Gallery ======== */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500 }}
            loop
            className="w-full h-80 md:h-[28rem] lg:h-[32rem]"
          >
            {product.images?.length ? (
              product.images.map((img, index) => (
                <SwiperSlide key={index} className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={product.name}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </SwiperSlide>
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400">
                No Image Available
              </div>
            )}
          </Swiper>
        </div>

        {/* ======== Right: Product Info ======== */}
        <div className="flex flex-col justify-between gap-6">
          {/* Product Heading & Brand */}
          <div>
            <p className="uppercase tracking-wide text-sm font-semibold text-gray-500 mb-1">
              {product.brand}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Price */}
          <div>
            <p className="text-2xl md:text-3xl font-extrabold text-primary mb-2">
              BDT {product.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              Inclusive of all applicable taxes.
            </p>
          </div>

          {/* Product Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700">
            <div>
              <span className="font-semibold text-gray-800">Category:</span>{" "}
              {product.category}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Warranty:</span>{" "}
              {product.warranty || "N/A"}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Condition:</span>{" "}
              {product.isBrandNew ? "Brand New" : "Used"}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Available:</span>{" "}
              {product.quantity} pcs
            </div>
          </div>

          {/* Description */}
          <div className="pt-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed text-justify">
              {product.description || "No description available."}
            </p>
          </div>

          {/* ======== Action Buttons ======== */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            {/* Favourite Button */}
            <div className="flex items-center justify-center gap-3 w-full sm:w-auto border border-pink-200 bg-pink-50 hover:bg-pink-100 transition-all duration-300 px-5 py-2.5 rounded-lg shadow-sm cursor-pointer">
              <span className="font-medium text-gray-700 text-sm">
                Add to Favourite
              </span>
              <ToggleToFavourite productId={product._id as string} />
            </div>

            {/* Add to Cart */}
            <div className="flex items-center justify-center gap-3 w-full sm:w-auto border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 transition-all duration-300 px-5 py-2.5 rounded-lg shadow-sm cursor-pointer">
              <FaShoppingCart className="text-indigo-600 text-lg" />
              <span className="font-medium text-gray-700 text-sm">
                Add to Cart
              </span>
              <CartButton
                productId={product._id as string}
                maxQuantity={product.quantity}
              />
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}
