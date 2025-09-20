"use client";

import Section from "@/ui/Section";

const reviews = [
  {
    name: "Alice",
    text: "Amazing products and super fast delivery!",
    rating: 5,
  },
  {
    name: "Rahim",
    text: "Loved the discounts, will shop again.",
    rating: 4,
  },
];

export default function ReviewSection() {
  return (
    <Section title="Reviews" subtitle="What our customers say" className="grid sm:grid-cols-2 gap-6">
      {reviews.map((r, i) => (
        <div
          key={i}
          className="border rounded-xl p-6 shadow hover:shadow-md transition"
        >
          <p className="italic mb-3">“{r.text}”</p>
          <div className="flex items-center justify-between">
            <span className="font-semibold">{r.name}</span>
            <span className="text-yellow-500">{"⭐".repeat(r.rating)}</span>
          </div>
        </div>
      ))}
    </Section>
  );
}
