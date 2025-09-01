"use client";

import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type RoleBasedRouteProps = {
  children: React.ReactNode;
  userRole: string;
};

export default function RoleBasedRoute({
  children,
  userRole,
}: RoleBasedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <Loading />;

  if (!session) {
    router.push("/auth/login");
    return null;
  }

  if (session.user?.role !== userRole) {
    router.push("/unauthorized");
    return null;
  }

  return <>{children}</>;
}
