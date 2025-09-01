import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // <-- add this
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role?: string; // <-- add this
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email?: string | null;
    role?: string; // <-- add this
  }
}
