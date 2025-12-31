import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ToWords } from "to-words";
import { Payment, Product } from "@/types/product";
import JsBarcode from "jsbarcode";

// ToWords instance for currency in words
const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    currencyOptions: {
      name: "Taka",
      plural: "Taka",
      symbol: "৳",
      fractionalUnit: { name: "Paisa", plural: "Paisa", symbol: "৳" },
    },
  },
});

export const generatePDF = async (payment: Payment, products: Product[]) => {
  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a5",
  });

  const totalAmount = toWords.convert(payment.amount);

  // Centered Header Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Gadget Hunter", 75, 20, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.text("Online Invoice", 75, 28, { align: "center" });

  doc.setFontSize(11);
  doc.setTextColor(0, 0, 62);
  doc.text(
    `Date: ${format(new Date(payment.createdAt), "dd/MM/yyyy")}`,
    14,
    35,
    { align: "left" }
  );
  doc.text(`Transaction ID: ${payment.tranId}`, 14, 40, { align: "left" });
  doc.text(`User Email: ${payment.user}`, 14, 45, { align: "left" });

  const canvas = document.createElement("canvas");

  JsBarcode(canvas, payment.tranId, {
    format: "CODE128",
    width: 2,
    height: 50,
  });

  doc.addImage(canvas.toDataURL("image/png"), "PNG", 45, 50, 60, 15);

  const bodyRows = products.map((product, i) => [
    product.name,
    payment.items[i].quantity,
    product.price.toLocaleString("en-US"),
    (product.price * payment.items[i].quantity).toLocaleString("en-US"),
  ]);

  autoTable(doc, {
    startY: 70,
    theme: "grid",
    head: [["Product", "Quantity", "Unit Price", "Total Price"]],
    body: [
      ...bodyRows,
      [
        {
          colSpan: 3,
          content: "Total(BDT)",
          styles: { halign: "right", fontStyle: "bold" },
        },
        {
          content: payment.amount.toLocaleString("en-US"),
          styles: { halign: "right", fontStyle: "bold" },
        },
      ],
      [
        {
          content: `In Words :  ${totalAmount}`,
          styles: { halign: "left", fontSize: 9 },
          colSpan: 4,
        },
      ],
    ],
    styles: {
      font: "helvetica",
      fontSize: 10,
      overflow: "linebreak",
    },
    bodyStyles: {
      valign: "middle",
    },
    columnStyles: {
      0: { halign: "left" },
      1: { halign: "center" },
      2: { halign: "right" },
      3: { halign: "right" },
    },
  });



  doc.setFontSize(8);
  doc.setTextColor(0, 0, 62);
  doc.text("Thank you for shopping with us!", 70, 190, { align: "center" });

  // Save PDF
  doc.save(`invoice.pdf`);
};
