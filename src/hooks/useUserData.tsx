"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axiosApi from "@/libs/axiosInstance";

/**
 * User type returned from backend
 */
export type User = {
  _id: string;
  email: string;
  name: string;
  provider: string;
  image: string;
  gender: string;
  role: string;
  createdAt: string;
  lastSignInAt: string;
};

/**
 * Fetch a user by email from the backend
 */
const fetchUser = async (email: string): Promise<User> => {
  
  if (!email) {
    throw new Error("Email is required to fetch user data");
  }

  const res = await axiosApi.get(`/user`, { params: { email } });
  return res.data;
};

/**
 * Custom hook to fetch the current logged-in user's data
 * - Uses NextAuth session to get the email
 * - Uses TanStack Query to fetch user from backend
 */
export function useUserData() {
  const { data: session, status } = useSession();

  const email = session?.user?.email ?? "";

  const query = useQuery<User>({
    queryKey: ["user", email],
    queryFn: () => fetchUser(email),
    enabled: Boolean(email), // only run if email exists
    staleTime: 5 * 60 * 1000, // 5 min cache for performance
    retry: 1, // retry once if it fails
  });

  return {
    ...query,       // includes: data, isLoading, isError, error, refetch, etc.
    currentUser: query.data, // alias for clarity
    session,        // NextAuth session
    status,         // "loading" | "authenticated" | "unauthenticated"
  };
}
