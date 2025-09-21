"use client";

import { useParams } from "next/navigation";
import { useGetItem } from "@/hooks/useItems";

import Loading from "@/app/loading";
import Container from "@/ui/Container";
import Section from "@/ui/Section";
import Image from "next/image";

/**
 * =========================
 * Product Details Page
 * =========================
 * Shows detailed information about a single product.
 */
export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  // Fetch product details
  const { data: product, isLoading } = useGetItem(id);

  if (isLoading) return <Loading />;
  if (!product) {
    return (
      <Container>
        <p className="text-center text-gray-500">Product not found.</p>
      </Container>
    );
  }

  return (
    <Container>
      <Section
        title={product.name}
        subtitle={`Explore full details about ${product.name}`}
        className="grid lg:grid-cols-2 gap-10"
      >
        {/* Left: Main Image + Gallery */}
        <div>
          <Image
            width={1000}
            height={1000}
            src={product.images[0]  ||
              "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
            alt={product.name}
            className="w-full h-80 object-cover rounded-xl shadow-md mb-4"
          />
          <div className="grid grid-cols-3 gap-3">
            {product.images?.map((img, idx) => (
              <Image
                width={1000}
                height={1000}
                key={idx}
                src={img ||
                  "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
                alt={`Preview ${idx + 1}`}
                className="h-24 w-full object-cover rounded-lg border"
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600">Brand: {product.brand}</p>
          <p className="text-xl text-blue-600 font-semibold">
            ${product.price}
          </p>

          {/* Extra Info */}
          <ul className="space-y-1 text-gray-700">
            <li>
              <strong>Category:</strong> {product.category}
            </li>
            <li>
              <strong>Warranty:</strong> {product.warranty}
            </li>
            <li>
              <strong>Quantity:</strong> {product.quantity} available
            </li>
            <li>
              <strong>Condition:</strong>{" "}
              {product.isBrandNew ? "Brand New" : "Used"}
            </li>
          </ul>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mt-4 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
              Add to Cart
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-4 rounded-lg transition">
              Buy Now
            </button>
          </div>
        </div>
      </Section>
    </Container>
  );
}
