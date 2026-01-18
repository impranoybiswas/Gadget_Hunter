import { getUsersCollection, getItemsCollection } from "@/libs/collection";
import { getSessionUser } from "@/libs/getSessionUser";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser?.email) {
      return NextResponse.json({ items: [] });
    }
    const { email } = sessionUser;

    const users = await getUsersCollection();
    const products = await getItemsCollection();

    const user = await users.findOne({ email });

    if (!user?.carts?.length) return NextResponse.json({ items: [] });

    const cartProducts = await products
      .find({
        _id: {
          $in: user.carts.map(
            (c: { productId: string }) => new ObjectId(c.productId)
          ),
        },
      })
      .toArray();

    // Merge quantity
    const itemsWithQuantity = cartProducts.map((product) => {
      const cartItem = user.carts.find(
        (c: { productId: string }) => c.productId === product._id.toString()
      );
      const cartQuantity = cartItem?.quantity || 0;

      return {
        ...product,
        cartQuantity,
        totalPrice: product.price * cartQuantity,
      };
    });

    return NextResponse.json({ items: itemsWithQuantity });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
