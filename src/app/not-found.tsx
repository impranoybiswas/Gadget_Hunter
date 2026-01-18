"use client";

import { FaSearch } from "react-icons/fa";

import Container from "@/ui/Container";
import Section from "@/ui/Section";

import GoBackButton from "@/components/GoBackButton";

/**
 * 404 Not Found Page
 * 
 * displayed when a user attempts to access a non-existent route.
 * Provides a user-friendly message and a way to navigate back.
 */
export default function NotFound() {
  return (
    <Container>
      <Section className="flex flex-col items-center">
        <div className="text-8xl font-bold text-base-content/20 mt-20">404</div>

        <div className="flex items-center gap-3 text-2xl font-semibold mt-6 text-base-content">
          <FaSearch className="text-info" />
          Page Not Found
        </div>

        <p className="mt-3 text-base-content/60 max-w-md text-center">
          The page you are looking for doesn’t exist or may have been moved.
          Let’s get you back to shopping amazing gadgets.
        </p>

        <GoBackButton />

        <div className="mt-12 text-sm text-base-content/30">
          © {new Date().getFullYear()} Gadget Hunter
        </div>
      </Section>
    </Container>
  );
}
