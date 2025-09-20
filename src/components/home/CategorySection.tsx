"use client";
import Section from "@/ui/Section";
import Link from "next/link";
import { IoWatchOutline } from "react-icons/io5";
import {
  FaMobileScreen,
  FaLaptop,
  FaTv,
  FaHeadphones,
  FaTabletScreenButton,
} from "react-icons/fa6";

const categories = [
  {
    name: "mobile",
    icon: <FaMobileScreen />,
  },
  {
    name: "laptop",
    icon: <FaLaptop />,
  },
  {
    name: "smartwatch",
    icon: <IoWatchOutline />,
  },
  {
    name: "monitor",
    icon: <FaTv />,
  },
  {
    name: "headphone",
    icon: <FaHeadphones />,
  },
  {
    name: "tablet",
    icon: <FaTabletScreenButton />,
  },
];

export default function CategorySection() {
  return (
    <Section
      title="Categories"
      subtitle="Find products tailored to your needs"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-5"
    >
      {categories.map((category, i) => (
        <Link
          key={i}
          href={`/shop?category=${category.name}`}
          className="group border border-base-300 rounded-md overflow-hidden shadow hover:shadow-lg bg-primary flex flex-col items-center justify-center gap-0 md:ga-3 h-32 md:h-46 uppercase text-white hover:-translate-y-1 hover:scale-103 transition-all duration-500 ease-in-out text-shadow-2xs"
        >
          <span className="size-20 flex items-center justify-center text-4xl md:text-5xl">
            {category.icon}
          </span>

          <span className="font-semibold text-base md:text-2xl">
            {category.name}
          </span>
        </Link>
      ))}
    </Section>
  );
}
