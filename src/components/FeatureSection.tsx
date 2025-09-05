"use client";
import { useGetItems } from "@/hooks/useItems";
import Section from "@/ui/Section";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedProductSection() {
  const { data, isLoading } = useGetItems(1, "");

  if (isLoading) return <p>Loading...</p>;

  const products = data?.items.slice(0, 6) || []; // show only first 6

  return (
    <Section title="Featured Products" subtitle="Top picks curated for you" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <div
          key={p._id}
          className="border rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
        >
          <Image
            width={500}
            height={500}
            src={p.thumbnail}
            alt={p.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex flex-col flex-1">
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-gray-500 text-sm">{p.brand}</p>
            <p className="font-bold text-blue-600 mt-auto">${p.price}</p>
            <Link
              href={`/shop/${p._id}`}
              className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </Section>
  );
}
