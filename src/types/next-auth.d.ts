import { DefaultSession, DefaultUser } from "next-auth";

// Extend JWT
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    role?: string;
  }
  interface User {
    id?: string;
    email?: string;
    role?: string;
  }
}

// Extend NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    } & DefaultSession["user"];
  }

  export interface User extends DefaultUser {
    _id: string;
    email: string;
    name: string;
    provider: string;
    image: string;
    gender: string;
    role: string;
    createdAt: string;
    lastSignInAt: string;
    favorites: string[];
    carts: { productId?: string; quantity?: number }[];
  }
}
