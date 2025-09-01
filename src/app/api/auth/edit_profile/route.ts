import { NextRequest, NextResponse } from "next/server";
import { getUsersCollection } from "../../collection";

//get user By Email
export async function GET(req: NextRequest) {
    try {
      const url = new URL(req.url);
      const email = url.searchParams.get("email");
  
      if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
      }
  
      const users = await getUsersCollection();
      const user = await users.findOne({ email });
  
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json(user);
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
      const { email, name, gender, image } = await req.json();
  
      if (!email || !name) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
  
      const users = await getUsersCollection();
      const updateData: any = { name, gender };
      if (image) updateData.image = image;
  
      const result = await users.updateOne({ email }, { $set: updateData });
  
      if (result.matchedCount === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Profile updated successfully" });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }
  