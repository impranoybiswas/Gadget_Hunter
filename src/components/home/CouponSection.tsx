"use client";

import Section from "@/ui/Section";
import { FaCopy } from "react-icons/fa";

const coupons = [
  { code: "SAVE10", discount: "10%", desc: "Get 10% off on mobiles" },
  { code: "NEWUSER20", discount: "20%", desc: "20% off for first-time buyers" },
  { code: "NEW30", discount: "30%", desc: "20% off for first-time buyers" },
  { code: "PACKME", discount: "25%", desc: "20% off for first-time buyers" },
];

export default function CouponSection() {
  const handleCopy = (e : React.MouseEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText;
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard");
    })
  };
  return (
    <Section
      title="Coupon Discounts"
      subtitle="Save big with our latest deals"
      className="grid grid-cols-2 md:grid-cols-4 gap-5"
    >
      {coupons.map((c, i) => (
        <div
          key={i}
          className="rounded-md bg-primary text-white shadow hover:shadow-md flex justify-center items-center flex-col gap-2 py-10 hover:-translate-y-1 hover:scale-103 transition-all duration-500 ease-in-out"
        >
          <div className="border-6 md:border-8 border-yellow-300 text-yellow-300 rounded-full size-20 md:size-26 lg:size-30 flex flex-col items-center justify-center gap-0"><span className="font-bold text-2xl md:text-4xl">{c.discount}</span> <span className="font-semibold">OFF</span></div>
          <p className="mt-2 text-sm md:text-base lg:text-lg text-center">{c.desc}</p>
          <p onClick={handleCopy} className="mt-4 font-mono text-lg bg-secondary/20 flex items-center gap-3 px-4 py-1 rounded cursor-copy">
            {c.code} <FaCopy/>
          </p>
        </div>
      ))}
    </Section>
  );
}
