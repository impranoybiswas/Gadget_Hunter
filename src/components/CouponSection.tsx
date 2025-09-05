"use client";

import Section from "@/ui/Section";

const coupons = [
  { code: "SAVE10", discount: "10%", desc: "Get 10% off on mobiles" },
  { code: "NEWUSER20", discount: "20%", desc: "20% off for first-time buyers" },
];

export default function CouponSection() {
  return (
    <Section title="Coupon Discounts" subtitle="Save big with our latest deals" className="grid sm:grid-cols-2 gap-6">
      {coupons.map((c, i) => (
        <div
          key={i}
          className="border rounded-xl p-6 text-center shadow hover:shadow-md transition"
        >
          <h3 className="font-bold text-xl text-blue-600">{c.discount} OFF</h3>
          <p className="mt-2">{c.desc}</p>
          <p className="mt-4 font-mono text-lg bg-gray-100 inline-block px-4 py-1 rounded">
            {c.code}
          </p>
        </div>
      ))}
    </Section>
  );
}
