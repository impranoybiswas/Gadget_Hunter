"use client";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Section from "@/ui/Section";
import { FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";

import "swiper/css";
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
    <Section
      title="Customer Reviews"
      subtitle="Hear from our happy customers"
      className="mb-10"
    >
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={24}
        className="w-full"
        breakpoints={{
          320: { slidesPerView: 1.3 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="w-full py-10 px-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-base-200 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-500 ease-in-out p-5 text-center h-full flex flex-col justify-between"
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Image
                    className="rounded-full border-4 border-primary/30 object-cover"
                    src={review.photo}
                    alt={review.name}
                    width={80}
                    height={80}
                  />
                  <span className="absolute -bottom-1 right-0 bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                    ★ {review.rating}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
                  {review.name}
                </h3>

                <div className="flex justify-center mt-2 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed line-clamp-2">
                  “{review.review}”
                </p>
              </div>

              <div className="mt-5">
                <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
}
