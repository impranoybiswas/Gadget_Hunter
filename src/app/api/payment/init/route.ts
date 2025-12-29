import { NextRequest, NextResponse } from "next/server";
import { getPaymentsCollection } from "@/libs/collection";

export async function POST(req: NextRequest) {

  try {
    const body = await req.json();

    const amount: number = Number(body.amount);
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid payment amount" },
        { status: 400 }
      );
    }

    // robust & unique transaction id
    const tranId = `EVT_${Date.now()}_${Math.floor(100000 + Math.random() * 900000)}`;

    const payments = await getPaymentsCollection();

    // save initial transaction record
    await payments.insertOne({
      tranId,
      user: body.customer?.email,
      items: body.items,
      amount,
      status: "INITIATED",
      createdAt: new Date(),
    });

    const payload: Record<string, string> = {
      store_id: process.env.SSLC_STORE_ID as string,
      store_passwd: process.env.SSLC_STORE_PASSWORD as string,

      total_amount: amount.toString(),
      currency: "BDT",
      tran_id: tranId,

      product_category: "event",
      product_name: "Event Ticket",
      product_profile: "general",

      cus_name: body.customer?.name || "N/A",
      cus_email: body.customer?.email || "N/A",
      cus_phone: body.customer?.phone || "N/A",
      cus_add1: body.customer?.address || "N/A",
      cus_city: "N/A",
      cus_country: "Bangladesh",

      shipping_method: "NO",

      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success`,
      fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/unsuccess`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/unsuccess`,
    };

    const response = await fetch(
      "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(payload),
      }
    );

    const result = await response.json();
    console.log(result);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Payment initiation error:", err);
    return NextResponse.json(
      { error: "Payment initiation failed" },
      { status: 500 }
    );
  }
}



