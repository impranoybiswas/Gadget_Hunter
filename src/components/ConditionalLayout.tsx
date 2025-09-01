"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";


export default function ConditionalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/auth") || pathname.startsWith("/dashboard");

  return (
    <>
      {hideLayout || <Navbar />}
      {children}

    </>
  );
}
