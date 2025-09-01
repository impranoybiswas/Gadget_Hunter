import { NextRequest, NextResponse } from "next/server";
import { getProductsCollection } from "../collection";


//__________GET Data
export async function GET() {
  try {
    const collection = await getProductsCollection();
    const products = await collection.find().toArray();
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new NextResponse("Error fetching products", { status: 500 });
  }
}

//_________POST Data
export async function POST(request: NextRequest) {
  try {
    const collection = await getProductsCollection();
    const data = await request.json();
    const result = await collection.insertOne(data);
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error creating product:", error);
    return new NextResponse("Error creating product", { status: 500 });
  }
}

