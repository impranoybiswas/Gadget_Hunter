import { useGetItems } from "@/hooks/useItems";
import { generatePDF } from "@/libs/generatePDF";
import { Payment } from "@/types/product";
import Button from "@/ui/Button";
import React from "react";
import { FaFilePdf } from "react-icons/fa";

export default function InvoiceButton({ payment }: { payment: Payment }) {

  const { items } = payment;
    
  const { data: products, isLoading, error } = useGetItems(1, "", "", "", true);

  if (isLoading || !products) return [];

  if (error) return null;

  const itemsIds = new Set(items.map((i) => i.id));

  const paidProducts = products?.items.filter((p) => itemsIds.has(p._id)) ?? [];


  const handleDownloadInvoice = () => {
    generatePDF(payment, paidProducts);
  };
  return (
    <Button
      isLarge
      isOutline={false}
      label="Download Invoice"
      leftIcon={<FaFilePdf />}
      onClick={handleDownloadInvoice}
      className="mt-8"
    />
  );
}
