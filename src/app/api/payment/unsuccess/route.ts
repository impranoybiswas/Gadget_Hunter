import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/libs/connectDB";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const tranIdRaw = form.get("tran_id");

    const tranId = tranIdRaw?.toString().trim();

    const payments = await getCollection("payments");

    const trx = await payments?.findOne({ tranId });

    if (!trx) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    // 🛡️ Prevent double execution
    if (trx.status === "PAID") {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL!, {
        status: 303,
      });
    }

    // Delete transaction record
    await payments?.deleteOne({ tranId });

    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL!, {
      status: 303,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
