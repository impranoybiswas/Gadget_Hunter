import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/libs/connectDB";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const tranIdRaw = form.get("tran_id");
    const paymentStatus = form.get("status");
    const valId = form.get("val_id");

    if (!tranIdRaw || typeof tranIdRaw !== "string") {
      return NextResponse.json(
        { error: "Invalid transaction id" },
        { status: 400 }
      );
    }

    if (paymentStatus !== "VALID") {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ticket/event/fail`,
        { status: 303 }
      );
    }

    const tranId = tranIdRaw.trim();

    const payments = await getCollection("payments");

    const trx = await payments?.findOne({ tranId });

    if (!trx) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    // Prevent double processing
    if (trx.status === "PAID") {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ticket/event/success?tranId=${tranId}`,
        { status: 303 }
      );
    }

    // TODO: Atomic seat decrement should be done here
    // Example (recommended):
    // await events.updateOne(
    //   { _id: trx.eventId, availableSeats: { $gte: trx.seats } },
    //   { $inc: { availableSeats: -trx.seats } }
    // );

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

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/ticket/event/success?tranId=${tranId}`,
      { status: 303 }
    );
  } catch (error) {
    console.error("Payment success error:", error);
    return NextResponse.json(
      { error: "Payment processing failed" },
      { status: 500 }
    );
  }
}
