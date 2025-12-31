"use client";

import { FaSearch } from "react-icons/fa";

import Container from "@/ui/Container";
import Section from "@/ui/Section";

import GoBackButton from "@/components/GoBackButton";

export default function NotFound() {
  return (
    <Container>
      <Section className="flex flex-col items-center">
        <div className="text-8xl font-bold text-gray-800 mt-20">404</div>

        <div className="flex items-center gap-3 text-2xl font-semibold mt-6 text-gray-700">
          <FaSearch className="text-sky-600" />
          Page Not Found
        </div>

        <p className="mt-3 text-gray-500 max-w-md">
          The page you are looking for doesn’t exist or may have been moved.
          Let’s get you back to shopping amazing gadgets.
        </p>

        <GoBackButton/>

        <div className="mt-12 text-sm text-gray-400">
          © {new Date().getFullYear()} Gadget Hunter
        </div>
      </Section>
    </Container>
  );
}
