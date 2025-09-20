"use client";

import ProtectedLayout from "@/customs/ProtectedLayout";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

type DashboardLayoutProps = { children: React.ReactNode };

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedLayout protectedFor="user">
      <main className="w-full min-h-screen bg-gray-50 flex flex-col">
  <Navbar />
  <div className="flex flex-1 mt-16 min-h-[calc(100vh-64px)]">
    <Sidebar />
    <div className="flex-1 px-4">{children}</div>
  </div>
</main>
    </ProtectedLayout>
  );
}
