"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Marquee from "react-fast-marquee";
import Image from "next/image";

const swiperData = [
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, voluptate.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    url: "#",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, voluptate.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    url: "#",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, voluptate.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    url: "#",
  },
];

export default function Header() {
  return (
    <header className="w-full h-dvh">
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5 ">
        <div className="w-full h-120 overflow-hidden col-span-1 lg:col-span-2 rounded">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="w-full h-full"
          >
            {swiperData.map((data, index) => (
              <SwiperSlide key={index}>
                <Image src={data.image} alt="logo" width={1000} height={2000} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="w-full h-120 col-span-1 flex flex-col gap-5">
          <div className="w-full h-1/2 rounded bg-purple-600" />
          <div className="w-full h-1/2 rounded bg-teal-600" />
        </div>
      </div>
      <div className="py-2 bg-white rounded mt-5">
        <Marquee speed={60} gradient={false}>
          <Image
            src="/assets/brand_title.png"
            alt="logo"
            width={1000}
            height={2000}
          />
        </Marquee>
      </div>
    </header>
  );
}
