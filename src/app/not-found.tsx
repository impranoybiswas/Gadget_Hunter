"use client";

import Link from "next/link";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

import Container from "@/ui/Container";
import Section from "@/ui/Section";

export default function NotFound() {
  return (
    <Container>
      <Section>
        <div className="text-7xl font-bold text-gray-800">404</div>

        <div className="flex items-center gap-3 text-2xl font-semibold mt-4 text-gray-700">
          <FaSearch className="text-sky-600" />
          Page Not Found
        </div>

        <p className="mt-3 text-gray-500 max-w-md">
          The page you are looking for doesn’t exist or may have been moved.
          Let’s get you back to shopping amazing gadgets.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition"
          >
            <FaShoppingCart />
            Back to Home
          </Link>

          <Link
            href="/shop"
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Browse Products
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-400">
          © {new Date().getFullYear()} Gadget Hunter
        </div>
      </Section>
    </Container>
  );
}
