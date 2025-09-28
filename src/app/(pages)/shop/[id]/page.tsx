"use client";

import { useParams } from "next/navigation";
import { useGetItem } from "@/hooks/useItems";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Loading from "@/app/loading";
import Container from "@/ui/Container";
import Section from "@/ui/Section";
import Image from "next/image";
import AddToFavourite from "@/components/AddToFavourite";

/**
 * =========================
 * Product Details Page
 * =========================
 * Shows detailed information about a single product.
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
        <p className="text-center text-gray-500">Product not found.</p>
      </Container>
    );
  }

  return (
    <Container>
      <Section title={product.name} className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-10">
        {/* Left: Image Gallery */}
        <div className="rounded-lg overflow-hidden">
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="w-full h-84 md:h-100 lg:h-120"
          >
            {product.images.map((data, index) => (
              <SwiperSlide key={index} className="w-full h-full relative">
                <Image
                  className="object-cover"
                  src={data}
                  alt="image"
                  fill
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col gap-4">
          <p className="uppercase font-semibold py-2 px-4 border border-base-300 w-fit rounded-md"> {product.brand}</p>
          <p className="text-xl text-primary font-semibold">BDT {product.price}</p>

          {/* Extra Info */}
          <ul className="space-y-1">
            <li className="capitalize">
              <strong>Category :</strong> {product.category}
            </li>
            <li>
              <strong>Warranty :</strong> {product.warranty}
            </li>
            <li>
              <strong>Quantity :</strong> {product.quantity} Available
            </li>
            <li>
              <strong>Condition :</strong>{" "}
              {product.isBrandNew ? "Brand New" : "Used"}
            </li>
          </ul>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mt-4 mb-2">Description</h3>
            <p className="leading-relaxed opacity-80 text-justify">{product.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <AddToFavourite productId={product._id as string} />
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-4 rounded-lg transition">
              Buy Now
            </button>
          </div>
        </div>
      </Section>
    </Container>
  );
}
