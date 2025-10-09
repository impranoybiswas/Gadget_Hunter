"use client";

import ProtectedLayout from "@/customs/ProtectedLayout";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  // Split path and filter out empty parts
  const segments = pathname.split("/").filter(Boolean);

  // Generate a breadcrumb-like title
  const title = segments
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" / ");

  return (
    <ProtectedLayout protectedFor="user">
      <main className="w-full min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1 mt-16 min-h-[calc(100vh-64px)]">
          <Sidebar />
          <div className="flex-1 px-5 md:px-8 lg:px-10 py-10">
            {/* Header / Breadcrumb */}
            <div className="pl-5 py-3 bg-white border border-gray-200 rounded-xl shadow text-lg font-semibold flex items-center gap-2 mb-6 md:mb-8">
              <FaChevronRight className="text-gray-500 w-5 h-5" />
              <span className="uppercase tracking-wide text-gray-700">
                {title || "Dashboard"}
              </span>
            </div>

            {/* Main Content */}
            {children}
          </div>
        </div>
      </main>
    </ProtectedLayout>
  );
}
