"use client";

import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/auth/login");
      return;
    }

    if (session.user.role !== userRole) {
      router.push("/unauthorized");
    }
  }, [status, session, router, userRole]);

  if (status === "loading" || !session || session.user?.role !== userRole) {
    return <Loading />;
  }

  return <>{children}</>;
}
