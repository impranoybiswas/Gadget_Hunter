import { getCollection } from "@/libs/connectDB";
import { NextResponse } from "next/server";

//__________GET Items
export async function GET() {
  try {
    const collection = await getCollection("head_data");

    if (!collection) {
      throw new Error("Failed to connect to collection");
    }

    const items = await collection.find({}).toArray();

    return new NextResponse(JSON.stringify(items), { status: 200 });
  } catch (error) {
    console.error("Error fetching head data:", error);
    return new NextResponse("Error fetching head data", { status: 500 });
  }
}
