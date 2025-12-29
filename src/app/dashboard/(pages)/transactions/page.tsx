"use client";

import { useGetPayments } from "@/hooks/usePayments";
import { useUserData } from "@/hooks/useUserData";
import { format } from "date-fns";
import { useGetItem } from "@/hooks/useItems";

export default function Transactions() {
  const { currentUser, isLoading: userLoading } = useUserData();
  const { data: payments, isLoading } = useGetPayments(currentUser?.email ? { email: currentUser.email } : undefined);

  if (userLoading || isLoading) {
    return <p className="text-gray-400 text-sm">Loading transactions...</p>;
  }

  if (!payments || payments.length === 0) {
    return <p className="text-gray-500">No transactions found.</p>;
  }

  return (
    <section className="bg-white rounded-xl shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Transaction</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3">Paid At</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.tranId}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 border-t font-mono text-xs border-t-gray-200">
                  {payment.tranId}
                </td>

                <td className="px-4 py-3 border-t space-y-1 border-t-gray-200">
                  {payment.items.map((item) => (
                    <PaidItem key={item.id} id={item.id} qty={item.quantity} />
                  ))}
                </td>

                <td className="px-4 py-3 border-t border-t-gray-200 text-right font-semibold text-green-700">
                  ৳ {payment.amount.toLocaleString()}
                </td>

                <td className="px-4 py-3 border-t border-t-gray-200 text-gray-600">
                  {payment.paidAt
                    ? format(new Date(payment.paidAt), "dd MMM yyyy, hh:mm a")
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}





interface Props {
  id: string;
  qty: number;
}

export function PaidItem({ id, qty }: Props) {
  const { data: item, isLoading } = useGetItem(id);

  if (isLoading) {
    return <div className="text-gray-400">Loading item...</div>;
  }

  if (!item) {
    return <div className="text-red-500">Item not found</div>;
  }

  return (
    <div className="flex justify-between gap-2 text-gray-700">
      <span className="truncate">{item.name}</span>
      <span className="text-xs text-gray-500">× {qty}</span>
    </div>
  );
}

