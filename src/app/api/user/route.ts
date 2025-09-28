import { NextRequest, NextResponse } from "next/server";
import { getUsersCollection } from "../../../libs/collection";
import bcrypt from "bcryptjs";
import { formattedDate } from "@/utilities/MyFormat";
import { getSessionUser } from "@/libs/getSessionUser";

/**
 * GET /api/user
 * Fetch a single user by email.
 */

export async function GET() {
  try {
    // User fetch
    const { user, error } = await getSessionUser();
    if (error) return error;

    // password hide
    const safeUser = { ...user };
    delete safeUser.password;

    return NextResponse.json(safeUser);
  } catch (error) {
    console.error("GET /api/user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/user
 * Update user profile data. Requires session (authenticated user).
 */
export async function PATCH(request: NextRequest) {
  try {
    // User fetch
    const { email, error } = await getSessionUser();
    if (error) return error;

    // Parse update data
    const updateData = await request.json();

    if (!updateData || Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No update data provided" },
        { status: 400 }
      );
    }

    // Hash password if present
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    // ✅ Fix: users collection আনতে হবে
    const users = await getUsersCollection();

    const result = await users.updateOne(
      { email },
      {
        $set: {
          ...updateData,
          lastUpdatedAt: formattedDate(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("PATCH /api/user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
