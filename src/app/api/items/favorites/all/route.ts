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

    if (!user?.favorites?.length) {
      return NextResponse.json({ items: [] });
    }

    const favoriteIds = user.favorites
      .filter((id: string) => ObjectId.isValid(id))
      .map((id: string) => new ObjectId(id));

    if (!favoriteIds.length) {
      return NextResponse.json({ items: [] });
    }

    const favoriteProducts = await products
      .find({ _id: { $in: favoriteIds } })
      .toArray();

    return NextResponse.json({ items: favoriteProducts });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
