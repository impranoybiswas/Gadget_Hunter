"use client";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Section from "@/ui/Section";
import { FaStar } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    id: 1,
    name: "Raju Kader",
    photo: "https://i.pravatar.cc/300?img=1",
    rating: 5,
    review: "The booking experience was smooth and easy. Loved the event!",
  },
  {
    id: 2,
    name: "Rahim Ahmed",
    photo: "https://i.pravatar.cc/300?img=2",
    rating: 4,
    review: "Affordable tickets and very user-friendly system.",
  },
  {
    id: 3,
    name: "Riya Chowdhury",
    photo: "https://i.pravatar.cc/300?img=3",
    rating: 5,
    review: "Best ticket booking site I’ve ever used. Highly recommended!",
  },
  {
    id: 4,
    name: "Karim Khan",
    photo: "https://i.pravatar.cc/300?img=4",
    rating: 4,
    review: "Quick checkout process and great offers available.",
  },
  {
    id: 5,
    name: "Emily Brown",
    photo: "https://i.pravatar.cc/300?img=5",
    rating: 5,
    review: "I loved how fast I got my e-ticket with QR code.",
  },
  {
    id: 6,
    name: "David Smith",
    photo: "https://i.pravatar.cc/300?img=6",
    rating: 3,
    review: "Good platform but could use more payment options.",
  },
  {
    id: 7,
    name: "Fatima Noor",
    photo: "https://i.pravatar.cc/300?img=7",
    rating: 5,
    review: "Amazing discounts! I saved a lot booking early.",
  },
  {
    id: 8,
    name: "John Wilson",
    photo: "https://i.pravatar.cc/300?img=8",
    rating: 4,
    review: "Easy navigation, nice UI, and reliable service.",
  },
  {
    id: 9,
    name: "Maya Ali",
    photo: "https://i.pravatar.cc/300?img=9",
    rating: 5,
    review: "Loved the seamless process and quick customer support.",
  },
  {
    id: 10,
    name: "Carlos Mendes",
    photo: "https://i.pravatar.cc/300?img=10",
    rating: 4,
    review: "Convenient and trustworthy ticket booking site.",
  },
];

export default function ReviewSection() {
  return (
    <Section title="Reviews" subtitle="What our customers say" className="mb-5">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        loop={true}
        className="w-full h-full"
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {reviews.map((data) => (
          <SwiperSlide
            key={data.id}
            className="h-full"
          >
            <div className="rounded-md border border-base-300 shadow-md p-4 flex flex-col items-center text-center h-full hover:-translate-y-2 transition-all duration-400 ease-in-out mt-3 mb-8">
              <Image
                className="object-cover w-20 h-20 rounded-full mb-3 border-2 border-gray-300"
                src={data.photo}
                alt={data.name}
                height={80}
                width={80}
              />
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {data.name}
              </h3>
              <div className="flex justify-center my-2">
                {Array.from({ length: data.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-sm opacity-80 line-clamp-2">
                “{data.review}”
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
}
