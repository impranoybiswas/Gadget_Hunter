import { NextResponse } from "next/server";
import { requireRole } from "@/libs/roleCheck";

export async function GET() {
    const { error, status } = await requireRole(["admin"]);

    if (error) {
        return NextResponse.json({ error }, { status });
      }

  return NextResponse.json({ message: "Welcome Admin!" });
}
