import { NextRequest, NextResponse } from "next/server";
import { getUsersCollection } from "../collection";


//Get Single User
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const users = await getUsersCollection();
    const user = await users.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


//Edit User Data
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryEmail = searchParams.get("email");
    if (!queryEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const { name, gender, image } = await request.json();

    const updateData: any = {};
    if (name) updateData.name = name;
    if (gender) updateData.gender = gender;
    if (image) updateData.image = image;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    const users = await getUsersCollection();
    const result = await users.updateOne({ email: queryEmail }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
