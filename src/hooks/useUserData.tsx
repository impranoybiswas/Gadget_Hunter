"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axiosApi from "@/libs/axiosInstance";
import { DBUser } from "@/types/dbUser";

/**
 * User type returned from backend
 */

/**
 * Fetch current logged-in user (backend verifies via session)
 */
const fetchUser = async (): Promise<DBUser> => {
  const response = await axiosApi.get<DBUser>("/user");
  return response.data;
};

/**
 * Custom hook to fetch the current logged-in user's data.
 * 
 * Uses React Query to cache and manage user state.
 * Depends on NextAuth session status.
 * 
 * @returns {Object} User data query result, session, and authentication status
 */
export function useUserData() {
  const { data: session, status } = useSession();

  const query = useQuery<DBUser>({
    queryKey: ["current-user"],
    queryFn: fetchUser,
    enabled: status === "authenticated", // run only if logged in
    staleTime: 5 * 60 * 1000, // 5 min cache
    retry: 1,
  });

  return {
    ...query,
    currentUser: query.data, // alias
    session,
    status,
  };
}
