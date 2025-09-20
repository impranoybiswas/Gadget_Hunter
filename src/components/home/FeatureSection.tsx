"use client";
import { useGetItems } from "@/hooks/useItems";
import Section from "@/ui/Section";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedProductSection() {
  const { data, isLoading } = useGetItems(1, "", "", "");

  if (isLoading) return <p>Loading...</p>;

  const products = data?.items.slice(0, 8) || [];

  return (
    <Section title="Featured Products" subtitle="Top picks curated for you" className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {products.map((p) => (
        <Link
          key={p._id}
          href={`/shop/${p._id}`}
          className="rounded-md shadow-sm hover:shadow-md transition overflow-hidden flex flex-col relative group "
        >
          <Image
            width={500}
            height={500}
            src={p.thumbnail || "./assets/placeholder-image.svg"}
            alt={p.name}
            className="w-full overflow-hidden h-30 md:h-46 object-cover rounded-md group-hover:scale-110 transition-all duration-500 ease-in-out"
          />
          
            <p className="absolute bottom-5 right-0 bg-base-100 font-medium text-base md:text-lg w-full py-1 text-center">{p.name}</p>
            <p className="absolute top-2 right-2 text-xs font-medium text-white bg-primary border border-primary px-3 py-1 rounded-md uppercase">{p.brand}</p>
            
      
        </Link>
      ))}
    </Section>
  );
}
