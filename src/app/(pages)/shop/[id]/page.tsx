"use client";

import { useParams } from "next/navigation";
import { useGetItem } from "@/hooks/useItems";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Loading from "@/app/loading";
import Container from "@/ui/Container";
import Section from "@/ui/Section";
import Image from "next/image";
import ToggleToFavourite from "@/components/FavouriteButton";
import CartButton from "@/components/CartButton";
import { FaShoppingCart } from "react-icons/fa";

/**
 * =========================
 * Product Details Page
 * =========================
 * Shows detailed information about a single product in a clean professional layout.
 */
export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  // Fetch product details
  const { data: product, isLoading } = useGetItem(id);

  if (isLoading) return <Loading />;
  if (!product) {
    return (
      <Container>
        <p className="text-center text-gray-500 py-10">Product not found.</p>
      </Container>
    );
  }

  return (
    <Container>
      <Section
        title={product.name}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-10"
      >
        {/* Left: Image Gallery */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="w-full h-80 md:h-[28rem] lg:h-[32rem]"
          >
            {product.images.map((img, index) => (
              <SwiperSlide key={index} className="relative w-full h-full">
                <Image
                  src={img}
                  alt={product.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col gap-5">
          {/* Brand & Price */}
          <div className="flex flex-col gap-2">
            <span className="uppercase font-semibold py-1 px-3 border border-gray-300 w-fit rounded-md text-gray-700">
              {product.brand}
            </span>
            <span className="text-2xl font-bold text-primary">
              BDT {product.price.toFixed(2)}
            </span>
          </div>

          {/* Product Details */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 text-sm">
            <li>
              <strong>Category:</strong> {product.category}
            </li>
            <li>
              <strong>Warranty:</strong> {product.warranty}
            </li>
            <li>
              <strong>Quantity:</strong> {product.quantity} Available
            </li>
            <li>
              <strong>Condition:</strong>{" "}
              {product.isBrandNew ? "Brand New" : "Used"}
            </li>
          </ul>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="leading-relaxed text-gray-600 text-justify">
              {product.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            {/* Add to Favorite */}
            <div className="flex items-center gap-3 bg-pink-50 hover:bg-pink-100 transition px-4 py-2 rounded-lg cursor-pointer shadow-sm">
              <span className="font-medium text-gray-700 text-sm">Add to Favorite</span>
              <ToggleToFavourite productId={product._id as string} />
            </div>

            {/* Add to Cart */}
            <div className="flex items-center gap-3 bg-indigo-50 hover:bg-indigo-100 transition px-4 py-2 rounded-lg cursor-pointer shadow-sm">
              <FaShoppingCart className="text-indigo-600 text-lg" />
              <span className="font-medium text-gray-700 text-sm">Add to Cart</span>
              <CartButton productId={product._id as string} maxQuantity={product.quantity} />
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}
