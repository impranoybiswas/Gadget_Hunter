"use client";

import axiosApi from "@/libs/axiosInstance";
import { Payment } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

type PaymentQuery = {
  email?: string;
  tranId?: string;
};

const fetchPayments = async (query?: PaymentQuery): Promise<Payment[]> => {
  let url = "/payment/history";

  if (query?.tranId) {
    url += `?tranId=${query.tranId}`;
  } else if (query?.email) {
    url += `?email=${query.email}`;
  }

  const res = await axiosApi.get<{ result: Payment[] }>(url);
  return res.data.result || [];
};

export function useGetPayments(query?: PaymentQuery) {
  return useQuery<Payment[], Error>({
    queryKey: ["payments", query],
    queryFn: () => fetchPayments(query),
    staleTime: 1000 * 60 * 2,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!query,
  });
}
