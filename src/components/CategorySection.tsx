"use client";
import Section from "@/ui/Section";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Mobiles", slug: "mobile", image: "https://via.placeholder.com/300x200" },
  { name: "Laptops", slug: "laptop", image: "https://via.placeholder.com/300x200" },
  { name: "Accessories", slug: "accessory", image: "https://via.placeholder.com/300x200" },
];

export default function CategorySection() {
  return (
    <Section title="Categories" subtitle="Find products tailored to your needs" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((c, i) => (
        <Link
          key={i}
          href={`/shop?category=${c.slug}`}
          className="group border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
        >
          <Image width={500} height={500} src={c.image} alt={c.name} className="w-full h-48 object-cover" />
          <div className="p-4 text-center">
            <h3 className="font-semibold text-lg group-hover:text-blue-600">
              {c.name}
            </h3>
          </div>
        </Link>
      ))}
    </Section>
  );
}
