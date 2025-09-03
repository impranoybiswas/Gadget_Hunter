"use client";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ProtectedLayout from "@/customs/ProtectedLayout";

type DashboardLayoutProps = { children: React.ReactNode };

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedLayout protectedFor="user">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen">
          <Navbar />
          {children}
        </main>
      </div>
    </ProtectedLayout>
  );
}
