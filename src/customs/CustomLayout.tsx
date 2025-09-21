"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import ThemeProvider from "@/providers/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

export default function CoustomLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideLayout =
    pathname.startsWith("/auth") || pathname.startsWith("/dashboard");

  return (
    <ThemeProvider>
      <SessionProvider>
        <QueryProvider>
          <Toaster />
          {hideLayout || <Navbar />}
          {children}
          {hideLayout || <Footer />}
        </QueryProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
