import { getUsersCollection } from "@/libs/collection";
import { getSessionUser } from "@/libs/getSessionUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await getSessionUser();
    const { productId, quantity } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 }
      );
    }

    const users = await getUsersCollection();
    const user = await users.findOne({ email });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const carts = user.carts || [];

    const index = carts.findIndex((c: { productId: string }) => c.productId === productId);

    if (index > -1) {
      // update quantity
      if (quantity <= 0) {
        carts.splice(index, 1); // remove if 0
      } else {
        carts[index].quantity = quantity;
      }
    } else {
      carts.push({ productId, quantity: quantity || 1 });
    }

    await users.updateOne({ email }, { $set: { carts } });

    return NextResponse.json({
      success: true,
      carts,
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
