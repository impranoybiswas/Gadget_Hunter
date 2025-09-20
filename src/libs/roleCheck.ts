import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Check authentication & role
export async function requireRole(requiredRoles: string[]) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { error: "Not authenticated", status: 401 };
  }

  if (!requiredRoles.includes(session.user.role || "")) {
    return { error: `Forbidden: Required role ${requiredRoles}`, status: 403 };
  }

  return { session };
}
