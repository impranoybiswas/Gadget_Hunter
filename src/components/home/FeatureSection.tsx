"use client";
import { useGetItems } from "@/hooks/useItems";
import Section from "@/ui/Section";
import Image from "next/image";
import Link from "next/link";
import { TbCurrencyTaka } from "react-icons/tb";

export default function FeaturedProductSection() {
  const { data, isLoading } = useGetItems(1, "", "", "");

  if (isLoading) return <p>Loading...</p>;

  const products = data?.items.slice(0, 8) || [];

  return (
    <Section title="Featured Products" subtitle="Top picks curated for you" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {products.map((p) => (
        <Link
          key={p._id}
          href={`/shop/${p._id}`}
          className="rounded-md shadow-sm hover:shadow-md transition overflow-hidden flex gap-2 relative group p-2 border border-base-300"
        >
          <Image
            width={500}
            height={500}
            src={p.images[0] || "./assets/placeholder-image.svg"}
            alt={p.name}
            className="overflow-hidden size-16 md:size-20 object-cover rounded-md group-hover:scale-105 transition-all duration-500 ease-in-out border border-base-300"
          />
          
            <div className="flex flex-col gap-0 flex-1">
            <p className="font-medium text-sm lg:text-base uppercase">{p.brand}</p>
            <p className="font-medium text-sm md:text-base pb-1 line-clamp-1">{p.name}</p>
            <span className=" text-sm md:text-base flex items-center gap-0 text-primary"><TbCurrencyTaka size={16} />{p.price} Only</span>
            </div>
            {/* <p className="absolute top-2 right-2 text-xs font-medium text-white bg-primary border border-primary px-3 py-1 rounded-md uppercase">{p.brand}</p> */}
            
      
        </Link>
      ))}
    </Section>
  );
}
