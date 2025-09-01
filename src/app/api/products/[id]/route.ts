import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getProductsCollection } from "../../collection";


//__________GET Single Data
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const collection = await getProductsCollection();
    const product = await collection.findOne({ _id: new ObjectId(params.id) });
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new NextResponse("Error fetching product", { status: 500 });
  }
}

//__________PATCH Data
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const collection = await getProductsCollection();
    const data = await request.json();
    const result = await collection.updateOne({ _id: new ObjectId(params.id) }, { $set: data });
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return new NextResponse("Error updating product", { status: 500 });
  }
}

//__________DELETE Data
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const collection = await getProductsCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(params.id) });
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return new NextResponse("Error deleting product", { status: 500 });
  }
}