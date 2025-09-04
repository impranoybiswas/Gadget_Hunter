"use client";

import Loading from "@/app/loading";
import { useUserData } from "@/hooks/useUserData";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  protectedFor?: "user" | "member" | "admin";
}

const roleHierarchy = ["user", "member", "admin"];

export default function ProtectedLayout({
  children,
  protectedFor,
}: ProtectedLayoutProps) {
  const { session, status, currentUser } = useUserData();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || pathname;

  useEffect(() => {
    if (!protectedFor) return; // protection off
  
    if (status === "loading") return;
  
    if (!session) {
      router.push(`/auth/login?callbackUrl=${callbackUrl}`);
      return;
    }
  
    if (!currentUser) return; // wait until user data is loaded
  
    // role check based on hierarchy
    const requiredIndex = roleHierarchy.indexOf(protectedFor);
    const userIndex = roleHierarchy.indexOf(currentUser.role);
  
    if (userIndex === -1 || userIndex < requiredIndex) {
      router.push("/access-denied");
    }
  }, [protectedFor, session, status, currentUser, router, callbackUrl]);

  if (protectedFor && status === "loading") return <Loading/>;
  if (protectedFor && !session) return null;

  return <>{children}</>;
}
