import { NextRequest, NextResponse } from "next/server";
import { getItemsCollection } from "../../../libs/collection";

//__________GET Items
export async function GET(request: NextRequest) {
  try {
    const collection = await getItemsCollection();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 9;
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    const query = search ? { name: { $regex: search, $options: "i" } } : {};
    const total = await collection.countDocuments(query);

    const items = await collection
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      items,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new NextResponse("Error fetching products", { status: 500 });
  }
}

//_________POST Data
export async function POST(request: NextRequest) {
  try {
    const collection = await getItemsCollection();
    const data = await request.json();
    const result = await collection.insertOne(data);
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error creating product:", error);
    return new NextResponse("Error creating product", { status: 500 });
  }
}
