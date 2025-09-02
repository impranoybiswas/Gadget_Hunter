"use client";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useUserData } from "@/hooks/useUserData";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

export default function DashboardLayout({children,}: {children: React.ReactNode}) {
  const {session, status} = useUserData();
  const router = useRouter()
  if (!session) return router.push("/auth/login");
  if (status === "loading") return <Loading/>;
  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Navbar */}
        <Navbar />
        {children}
      </main>
    </div>
  );
}
