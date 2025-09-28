import { getUsersCollection, getItemsCollection } from "@/libs/collection";
import { getSessionUser } from "@/libs/getSessionUser";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const { email } = await getSessionUser(); 

    const users = await getUsersCollection();
    const products = await getItemsCollection();

    const user = await users.findOne({ email });

    if (!user?.favorites?.length) {
      return NextResponse.json({ items: [] });
    }

    const favoriteProducts = await products
      .find({ _id: { $in: user.favorites.map((id : string) => new ObjectId(id)) } })
      .toArray();

    return NextResponse.json({ items: favoriteProducts });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
