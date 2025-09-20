"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Marquee from "react-fast-marquee";
import Image from "next/image";

export const bannerData = [
  {
    id: 1,
    title: "Smartphones",
    subtitle: "Latest flagship & budget devices",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: 2,
    title: "Headphones",
    subtitle: "Crystal clear sound, wireless freedom",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
  },
  {
    id: 3,
    title: "Laptops",
    subtitle: "Work, play & everything in between",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: 4,
    title: "Monitors",
    subtitle: "High refresh rate & 4K displays",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: 5,
    title: "Smart Gadgets",
    subtitle: "Wearables, speakers & more",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
];

const swiperData = bannerData.slice(0, 3);
const sideData = bannerData.slice(3, 7);


export default function Header() {
  return (
    <header className="w-full">
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        <div className="w-full h-100 md:h-120 overflow-hidden col-span-1 lg:col-span-2 rounded">
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
              <SwiperSlide key={index} className="w-full h-full relative">
                <Image className="object-cover" src={data.image} alt="logo" fill />
                <div className="absolute bottom-0 left-0 w-full p-5 mx-auto bg-primary/30 text-white font-semibold flex flex-col">
                  <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-shadow-xs">{data.title}</span>
                  <span className="text-lg">{data.subtitle}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="w-full h-120 col-span-1 flex flex-col gap-6">

          {
            sideData.map((data, index) => (
              <div key={index} className="w-full h-1/2 rounded overflow-hidden relative group">
                <Image className="object-cover group-hover:scale-110 transition-transform duration-500" src={data.image} alt="logo" fill />
                <div className="absolute bottom-4 left-0 w-full p-5 mx-auto bg-primary/30 text-white font-semibold flex flex-col">
                  <span className="text-xl font-semibold text-shadow-xs">{data.title}</span>
                  <span className="text-sm">{data.subtitle}</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className="bg-white rounded mt-6 h-15 flex items-center">
        <Marquee speed={60} gradient={false}>
          <div className="relative w-full h-full">
            <Image
              src="/assets/brand_title.png"
              alt="logo"
              width={1000}
              height={1000}
              className="w-full h-full"
            />
          </div>
        </Marquee>
      </div>
    </header>
  );
}
