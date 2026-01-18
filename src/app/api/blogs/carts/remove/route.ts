import { getUsersCollection } from "@/libs/collection";
import { getSessionUser } from "@/libs/getSessionUser";
import { NextResponse } from "next/server";
import { Document } from "mongodb";

export async function POST(request: Request) {
  try {
    // Step 1: Get logged-in user's email
    const { email } = await getSessionUser();
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Step 2: Get productId from request body
    const { productId } = await request.json();
    if (!productId) {
      return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    // Step 3: Get users collection and find user
    const users = await getUsersCollection();
    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Step 4: Remove product from carts
    await users.updateOne(
      { email },
      { $pull: { carts: { productId } } as unknown as Document }
    );

    // Step 5: Return success
    return NextResponse.json({
      success: true,
      message: "Product removed from cart",
    });
  } catch (err) {
    console.error("Error removing cart item:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
