"use client";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useUserData } from "@/hooks/useUserData";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: LayoutProps) {
  const { session, status, isLoading } = useUserData();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading") {
      if (!session) {
        router.push("/auth/login");
      }
    }
  }, [session, status, router]);

  if (status === "loading" || !session || isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
