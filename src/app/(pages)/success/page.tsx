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
        <h1 className="text-3xl font-semibold text-success my-8">
          Payment Successful
        </h1>

        {payment && (
          <div className="mt-4 space-y-3 w-full max-w-2xl bg-base-200/50 p-6 rounded-xl border border-base-content/10">
            <div className="text-sm text-base-content/70">
              <p>
                <strong className="text-base-content">User Email:</strong> {payment.user}
              </p>
              <p>
                <strong className="text-base-content">Transaction ID:</strong> {payment.tranId}
              </p>
            </div>

            <div className="overflow-x-auto">
              {/* Table */}
              <table className="w-full text-left border border-base-content/10 rounded-lg overflow-hidden">
                <thead className="bg-base-200">
                  <tr>
                    <th className="p-3 text-sm font-medium text-base-content/70">
                      Product
                    </th>
                    <th className="p-3 text-sm font-medium text-base-content/70 text-center">
                      Qty
                    </th>
                    <th className="p-3 text-sm font-medium text-base-content/70 text-right">
                      Unit Price (BDT)
                    </th>
                    <th className="p-3 text-sm font-medium text-base-content/70 text-right">
                      Total Price (BDT)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payment.items.map((item) => (
                    <tr
                      className="border-b border-base-content/5 last:border-b-0 hover:bg-base-300/30"
                      key={item.id}
                    >
                      <PaidItem item={item} />
                    </tr>
                  ))}

                  <tr className="text-base-content font-bold">
                    <td colSpan={3} className="text-right py-4 px-3 border-t border-base-content/10">
                      Grand Total :
                    </td>
                    <td className="text-right p-4 border-t border-base-content/10 text-success">
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
    return <div className="text-base-content/40 italic p-3">Loading item...</div>;
  }

  if (!product) {
    return <div className="text-red-500">Item not found</div>;
  }

  return (
    <>
      {/* Product */}
      <td className="p-3 text-base-content font-medium text-sm tracking-tight">
        {product.name}
      </td>

      {/* Quantity */}
      <td className="p-3 text-sm text-base-content/70 text-center">
        {item.quantity || 1}
      </td>

      {/* Base Price */}
      <td className="p-3 text-sm text-base-content/70 text-right">
        {product.price.toFixed(2)}
      </td>

      {/* Total Price */}
      <td className="p-3 text-sm font-bold text-success text-right">
        {(product.price * (item.quantity || 1)).toFixed(2)}
      </td>
    </>
  );
}
