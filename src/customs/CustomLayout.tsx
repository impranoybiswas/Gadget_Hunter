"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import ThemeProvider from "@/providers/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import ScrollProvider from "@/providers/ScrollProvider";
import GoToTop from "@/components/GoToTop";

export default function CoustomLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideLayout =
    pathname.startsWith("/auth") || pathname.startsWith("/dashboard");

  return (
    <ThemeProvider>
      <SessionProvider>
        <QueryProvider>
          <ScrollProvider>
            <Toaster />
            {hideLayout || <Navbar />}
            {children}
            <GoToTop/>
            {hideLayout || <Footer />}
          </ScrollProvider>
        </QueryProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
