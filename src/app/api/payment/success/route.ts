import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/libs/connectDB";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const tranIdRaw = form.get("tran_id");
    const paymentStatus = form.get("status");
    const valId = form.get("val_id");

    if (!tranIdRaw || paymentStatus !== "VALID") {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL!, {
        status: 303,
      });
    }

    const tranId = tranIdRaw.toString().trim();

    const payments = await getCollection("payments");
    const products = await getCollection("products");

    const trx = await payments?.findOne({ tranId });

    if (!trx) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    // 🛡️ Prevent double execution
    if (trx.status === "PAID") {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL!, {
        status: 303,
      });
    }

    const items: { id: string; quantity: number }[] = trx.items;

    // 🔁 Reduce quantity for each product
    for (const item of items) {
      await products?.updateOne(
        { _id: new ObjectId(item.id) },
        { $inc: { quantity: -item.quantity } }
      );
    }

    // ✅ Mark payment as PAID
    await payments?.updateOne(
      { tranId },
      {
        $set: {
          status: "PAID",
          paidAt: new Date(),
          valId,
        },
      }
    );

    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL!, {
      status: 303,
    });
  } catch (error) {
    console.error("Payment success error:", error);
    return NextResponse.json(
      { error: "Payment processing failed" },
      { status: 500 }
    );
  }
}
