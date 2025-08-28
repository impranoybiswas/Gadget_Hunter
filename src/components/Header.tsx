"use client"
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function Header() {
  return (
    <header className='w-full h-dvh'>

        <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-5 '>
        <div className='w-full h-120 overflow-hidden col-span-1 lg:col-span-2 rounded'>
        <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full h-full">
        <SwiperSlide><div className='w-full h-300 bg-green-600'/></SwiperSlide>
        <SwiperSlide><div className='w-full h-300 bg-blue-600'/></SwiperSlide>
        <SwiperSlide><div className='w-full h-300 bg-yellow-600'/></SwiperSlide>
        </Swiper>
        </div>

        <div className='w-full h-120 col-span-1 flex flex-col gap-5'>
        <div className='w-full h-1/2 rounded bg-purple-600'/>
        <div className='w-full h-1/2 rounded bg-teal-600'/>
        </div>

        </div>
      
      
      
    </header>
  )
}
