import { getPaymentsCollection } from "@/libs/collection";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const email = searchParams.get("email");
    const tranId = searchParams.get("tranId");

    const payments = await getPaymentsCollection();

    const query: Record<string, string> = {};

    if (tranId) {
      query.tranId = tranId; // exact match
    } else if (email) {
      query.user = email; // email-based filter
    }

    const result = await payments?.find(query).toArray();

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}
