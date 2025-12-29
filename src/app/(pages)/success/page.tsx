"use client";

import { useSearchParams } from "next/navigation";
import { useGetPayments } from "@/hooks/usePayments";
import Container from "@/ui/Container";
import Section from "@/ui/Section";
import Link from "next/link";
import { FaFilePdf, FaHome, FaShoppingCart } from "react-icons/fa";
import { useGetItem } from "@/hooks/useItems";
import Button from "@/ui/Button";
import { useUserData } from "@/hooks/useUserData";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tranId");
  const {status} = useUserData();

  const { data, isLoading, error } = useGetPayments(
    tranId ? { tranId } : undefined
  );

  if (isLoading) {
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
            <div className="mt-8 flex gap-4 text-base">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition"
              >
                <FaHome />
                Back to Home
              </Link>

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                <FaShoppingCart />
                Browse Products
              </Link>
            </div>
          </div>
        </Section>
      </Container>
    );
  }

  const payment = data?.[0]; // tranId unique → single result
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
                      <PaidItem id={item.id} />
                    </tr>
                  ))}

                  <tr className="text-gray-700 font-semibold">
                    <td colSpan={3} className="text-right py-2 px-3">
                      Total Price :
                    </td>
                    <td className="text-right p-2">BDT {payment.amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div></div>
          </div>
        )}

        {/* Download Invoice Button */}

        {
          status === "authenticated" &&( <Button
          isLarge
          isOutline={false}
          label="Download Invoice"
          leftIcon={<FaFilePdf />}
          onClick={() => alert("Nice")}
          className="mt-8"
          />)
        }

        <div className="mt-8 flex gap-4 text-base">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition"
          >
            <FaHome />
            Back to Home
          </Link>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            <FaShoppingCart />
            Browse Products
          </Link>
        </div>
      </Section>
    </Container>
  );
}

export function PaidItem({ id }: { id: string }) {
  const { data: item, isLoading } = useGetItem(id);

  if (isLoading) {
    return <div className="text-gray-400">Loading item...</div>;
  }

  if (!item) {
    return <div className="text-red-500">Item not found</div>;
  }

  return (
    <>
      {/* Product */}
      <td className="p-2 text-gray-800 font-medium text-sm tracking-tight">
        {item.name}
      </td>

      {/* Quantity */}
      <td className="p-2 text-sm text-gray-700 text-center">{item.cartQuantity || 1}</td>

      {/* Base Price */}
      <td className="p-2 text-sm text-gray-700 text-right">
        {item.price.toFixed(2)}
      </td>

      {/* Total Price */}
      <td className="p-2 text-sm font-semibold text-green-700 text-right">
        {(item.totalPrice || item.price * (item.cartQuantity || 1)).toFixed(2)}
      </td>
    </>
  );
}
