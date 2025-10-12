"use client";

import React, { useContext } from "react";
import { ScrollContext } from "@/providers/ScrollProvider";
import { HiArrowUp } from "react-icons/hi";

export default function GoToTop() {
  const context = useContext(ScrollContext);

  // Safety check if the context is missing
  if (!context) return null;

  const { isScrolled } = context;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isScrolled && (
        <button
          onClick={scrollToTop}
          aria-label="Go to top"
          className="fixed bottom-8 right-8 z-50 bg-base-100 hover:bg-base-200 rounded-full shadow-lg transition-all duration-300 animate-bounce flex items-center justify-center text-primary cursor-pointer p-2"
        >
          <HiArrowUp size={28} />
        </button>
      )}
    </>
  );
}
