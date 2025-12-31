"use client";

import { useSearchParams } from "next/navigation";
import { useGetPayments } from "@/hooks/usePayments";
import Container from "@/ui/Container";
import Section from "@/ui/Section";
import { useGetItem } from "@/hooks/useItems";
import { useUserData } from "@/hooks/useUserData";
import InvoiceButton from "@/components/InvoiceButton";
import GoBackButton from "@/components/GoBackButton";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tranId");
  const { currentUser, status } = useUserData();

  const { data, isLoading, error } = useGetPayments(
    tranId ? { tranId } : undefined
  );

  if (isLoading && status === "loading") {
    return (
      <Container>
        <Section>
          <div className="w-full h-100 flex flex-col items-center justify-center">
            Loading payment details...
          </div>
        </Section>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Section>
          <div className="w-full h-100 flex flex-col items-center justify-center">
            Something went wrong
          </div>
        </Section>
      </Container>
    );
  }

  if (!tranId || !data || data.length === 0) {
    return (
      <Container>
        <Section>
          <div className="w-full h-100 flex flex-col items-center justify-center uppercase text-red-500 text-3xl font-semibold">
            Invalid payment
            <GoBackButton />
          </div>
        </Section>
      </Container>
    );
  }

  const payment = data?.[0]; // tranId unique → single result

  if (status !== "authenticated") {
    return (
      <Container>
        <Section>
          <div className="w-full h-100 flex flex-col items-center justify-center uppercase text-red-500 text-3xl font-semibold">
            You are not authenticated
          </div>
        </Section>
      </Container>
    );
  }

  if (payment.user !== currentUser?.email) {
    return (
      <Container>
        <Section>
          <div className="w-full h-100 flex flex-col items-center justify-center uppercase text-red-500 text-3xl font-semibold">
            This payment is not confirmed by your Account.
          </div>
        </Section>
      </Container>
    );
  }

  return (
    <Container>
      <Section className="flex items-center flex-col">
        <h1 className="text-3xl font-semibold text-green-600 my-8">
          Payment Successful
        </h1>

        {payment && (
          <div className="mt-4 space-y-3">
            <div className="text-sm">
              <p>
                <strong>User Email:</strong> {payment.user}
              </p>
              <p>
                <strong>Transaction ID:</strong> {payment.tranId}
              </p>
            </div>

            <div className="overflow-x-auto">
              {/* Table */}
              <table className="w-full text-left border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-sm font-medium text-gray-700">
                      Product
                    </th>
                    <th className="p-2 text-sm font-medium text-gray-700">
                      Qty
                    </th>
                    <th className="p-2 text-sm font-medium text-gray-700">
                      Unit Price (BDT)
                    </th>
                    <th className="p-2 text-sm font-medium text-gray-700">
                      Total Price (BDT)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payment.items.map((item) => (
                    <tr
                      className="border-b last:border-b-0 hover:bg-gray-50"
                      key={item.id}
                    >
                      <PaidItem item={item} />
                    </tr>
                  ))}

                  <tr className="text-gray-700 font-semibold">
                    <td colSpan={3} className="text-right py-2 px-3">
                      Total Price :
                    </td>
                    <td className="text-right p-2">
                      BDT {payment.amount.toLocaleString("en-US")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div></div>
          </div>
        )}

        {/* Download Invoice Button */}

        {status === "authenticated" && currentUser?.email === payment.user && (
          <InvoiceButton payment={payment} />
        )}

        <GoBackButton />
      </Section>
    </Container>
  );
}

interface Item {
  id: string;
  quantity: number;
}

export function PaidItem({ item }: { item: Item }) {
  const { data: product, isLoading } = useGetItem(item.id);

  if (isLoading) {
    return <div className="text-gray-400">Loading item...</div>;
  }

  if (!product) {
    return <div className="text-red-500">Item not found</div>;
  }

  return (
    <>
      {/* Product */}
      <td className="p-2 text-gray-800 font-medium text-sm tracking-tight">
        {product.name}
      </td>

      {/* Quantity */}
      <td className="p-2 text-sm text-gray-700 text-center">
        {item.quantity || 1}
      </td>

      {/* Base Price */}
      <td className="p-2 text-sm text-gray-700 text-right">
        {product.price.toFixed(2)}
      </td>

      {/* Total Price */}
      <td className="p-2 text-sm font-semibold text-green-700 text-right">
        {(product.price * (item.quantity || 1)).toFixed(2)}
      </td>
    </>
  );
}
