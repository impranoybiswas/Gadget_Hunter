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
  favorites: string[];
  carts: { productId?: string; quantity?: number }[];
};

/**
 * Fetch current logged-in user (backend verifies via session)
 */
const fetchUser = async (): Promise<User> => {
  const response = await axiosApi.get<User>("/user");
  return response.data;
};

/**
 * Custom hook to fetch the current logged-in user's data
 */
export function useUserData() {
  const { data: session, status } = useSession();

  const query = useQuery<User>({
    queryKey: ["user"],
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
