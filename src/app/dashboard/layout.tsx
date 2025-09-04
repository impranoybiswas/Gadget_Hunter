"use client";

import ProtectedLayout from "@/customs/ProtectedLayout";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

type DashboardLayoutProps = { children: React.ReactNode };

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedLayout protectedFor="user">
      <main className="w-full min-h-screen bg-gray-50">
        <Navbar />
        <section className="flex">
          <Sidebar />
          <div className="flex-1 pt-20 px-4">{children}</div>
        </section>
      </main>
    </ProtectedLayout>
  );
}
