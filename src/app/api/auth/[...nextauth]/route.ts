import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { getUsersCollection } from "@/libs/collection";
import { formattedDate } from "@/utilities/MyFormat";

export const authOptions: AuthOptions = {
  providers: [
    // --- Email/Password login ---
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const users = await getUsersCollection();

        // Step 1: Find user by email
        const user = await users.findOne({ email: credentials.email });
        if (!user) throw new Error("No user found with this email");

        // Step 2: Verify password
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect) throw new Error("Incorrect password");

        // Step 3: Update lastSignInAt every login
        await users.updateOne(
          { _id: user._id },
          { $set: { lastSignInAt: formattedDate() } }
        );

        // Step 4: Ensure createdAt exists
        if (!user.createdAt) {
          await users.updateOne(
            { _id: user._id },
            { $set: { createdAt: formattedDate() } }
          );
        }

        // Step 5: Return user with role
        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role, // IMPORTANT
        };
      },
    }),

    // --- Google OAuth login ---
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

  session: { strategy: "jwt" },

  callbacks: {
    // JWT callback runs on login + subsequent requests
    async jwt({ token, user }) {
      // If login just happened, attach basic info
      if (user) {
        token.id = user.id || token.sub;
        token.email = user.email || "";
        token.role = user.role || "";
      }

      // Always fetch latest role from DB
      if (token.email) {
        const users = await getUsersCollection();
        const dbUser = await users.findOne({ email: token.email });
        if (dbUser?.role) {
          token.role = dbUser.role;
        }
      }

      return token;
    },

    // Session callback exposes token info to client
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },

    // Handle Google sign-in user creation
    async signIn({ user, account }) {
      const users = await getUsersCollection();

      if (account?.provider === "google") {
        const existingUser = await users.findOne({ email: user.email });

        if (!existingUser) {
          // New Google user → assign default "user" role
          await users.insertOne({
            name: user.name,
            email: user.email,
            provider: "google",
            image: user.image,
            role: "user", // default role
            createdAt: formattedDate(),
            lastSignInAt: formattedDate(),
          });
        } else {
          // Update lastSignInAt
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
