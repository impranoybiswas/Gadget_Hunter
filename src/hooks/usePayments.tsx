"use client";

import axiosApi from "@/libs/axiosInstance";
import { Payment } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

const fetchPayments = async (): Promise<Payment[]> => {
  const res = await axiosApi.get("/payment/init");
  return res.data;
};

export function useGetPayments() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: fetchPayments,
  });
}
