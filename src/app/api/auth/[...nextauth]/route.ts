import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { getUsersCollection } from "@/app/api/collection";
import { formattedDate } from "@/utilities/MyFormat";
import { ObjectId } from "mongodb";

// --- Type augmentations ---
import type { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";

// Extend session user
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    email?: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password required");
        }

        const users = await getUsersCollection();

        const user = await users.findOne<{ 
          _id: ObjectId; 
          email: string; 
          password: string; 
        }>({ email: credentials.email });

        if (!user) throw new Error("No user found");

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect) throw new Error("Wrong password");

        await users.updateOne(
          { _id: user._id },
          { $set: { lastSignInAt: formattedDate() } }
        );

        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = (user as { id: string }).id || token.sub;
        token._email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const users = await getUsersCollection();
        const existingUser = await users.findOne({ email: user.email });

        if (!existingUser) {
          await users.insertOne({
            email: user.email,
            provider: "google",
            name: user.name,
            image: user.image,
            role: "user",
            createdAt: formattedDate(),
            lastSignInAt: formattedDate(),
          });
        } else {
          await users.updateOne(
            { _id: existingUser._id },
            { $set: { lastSignInAt: formattedDate() } }
          );
        }
      }
      return true;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
