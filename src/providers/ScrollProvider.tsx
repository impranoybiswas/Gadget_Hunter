"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";

interface ScrollContextType {
  isScrolled: boolean;
}

export const ScrollContext = createContext<ScrollContextType | undefined>(
  undefined
);

function ScrollProvider({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ScrollContext.Provider value={{ isScrolled }}>
      {children}
    </ScrollContext.Provider>
  );
}

export default ScrollProvider;
