"use client";

import { ReactNode } from "react";
import ThemeProvider from "./ThemeProvider";
import { SessionProvider } from "next-auth/react";
import QueryProvider from "./QueryProvider";
import { Toaster } from "react-hot-toast";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <QueryProvider>
          <Toaster/>
          {children}</QueryProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
