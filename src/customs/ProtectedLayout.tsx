"use client";

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
  const { session, status, data: user } = useUserData();
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
  
    if (!user) return; // wait until user data is loaded
  
    // role check based on hierarchy
    const requiredIndex = roleHierarchy.indexOf(protectedFor);
    const userIndex = roleHierarchy.indexOf(user.role);
  
    if (userIndex === -1 || userIndex < requiredIndex) {
      router.push("/access-denied");
    }
  }, [protectedFor, session, status, user, router, callbackUrl]);

  if (protectedFor && status === "loading") return <p>Loading...</p>;
  if (protectedFor && !session) return null;

  return <>{children}</>;
}
