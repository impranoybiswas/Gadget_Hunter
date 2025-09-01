"use client";
import axiosApi from "@/libs/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export type User = {
  _id: string;
  email: string;
  name: string;
};

//Get User
const fetchUser = async (email: string) => {
  const res = await axiosApi.get(`/user?email=${email}`);
  return res.data;
};

export function useUserData() {
  const { data: session, status } = useSession();
  const email = session?.user?.email;

  const query = useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUser(email as string),
    enabled: !!email, // only run when email exists
  });

  return {
    ...query, // gives you data, isLoading, isError, refetch, etc.
    session,
    status,
  };
}
