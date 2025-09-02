import type { Metadata } from "next";
import "./globals.css";
import CoustomLayout from "@/customs/CustomLayout";

export const metadata: Metadata = {
  title: "Gadget Hunter",
  description: "A trustable and reliable gadget store",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <CoustomLayout>{children}</CoustomLayout>
      </body>
    </html>
  );
}
