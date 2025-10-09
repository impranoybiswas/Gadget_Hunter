"use client";
import { useGetItems } from "@/hooks/useItems";
import Section from "@/ui/Section";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

export default function TopCategorySection() {
  return (
    <Section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <CategorySwiper category="mobile" />
      <CategorySwiper category="tablet" />
      <CategorySwiper category="smart watch" />
      <CategorySwiper category="earbuds" />
    </Section>
  );
}

export function CategorySwiper({ category }: { category: string }) {
  const { data, isLoading } = useGetItems(1, "", category, "");
  if (isLoading) return <p>Loading...</p>;
  const products = data?.items.slice(0, 5) || [];
  return (
    <div className="bg-primary min-h-64 rounded-md flex flex-col items-center p-2 ">
      <span className="py-4 font-semibold text-lg uppercase text-white">
        {category}
      </span>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        loop={true}
        className="w-full h-full"
      >
        {products.map((data, index) => (
          <SwiperSlide key={index} className="w-full h-full rounded-md">
            <Link
              href={`/shop/${data._id}`}
              className="flex flex-col text-lg md:text-xl font-semibold text-shadow-xs text-primary bg-base-100 pb-5 text-center rounded-md mb-2 w-full border border-base-300 p-2"
            >
              <Image
                className="object-cover w-full h-40 rounded-md mb-4 border border-base-300"
                src={data.images[0] || "./assets/placeholder-image.svg"}
                alt="logo"
                height={500}
                width={500}
              />
              {data.name}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
