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

        // Step 4: If createdAt is missing (edge case), set it
        if (!user.createdAt) {
          await users.updateOne(
            { _id: user._id },
            { $set: { createdAt: formattedDate() } }
          );
        }

        // Step 5: Return minimal user object
        return {
          id: user._id.toString(),
          email: user.email,
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

  // Use JWT session strategy
  session: { strategy: "jwt" },

  callbacks: {
    // Attach user ID and email to JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || token.sub;
        token.email = user.email || "";
      }
      return token;
    },

    // Attach token info to session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },

    // Google Sign-In handler
    async signIn({ user, account }) {
      const users = await getUsersCollection();

      if (account?.provider === "google") {
        // Step 1: Check if user already exists
        const existingUser = await users.findOne({ email: user.email });

        if (!existingUser) {
          // Step 2: Insert new Google user
          await users.insertOne({
            name: user.name,
            email: user.email,
            provider: "google",
            image: user.image,
            role: "user",
            createdAt: formattedDate(),
            lastSignInAt: formattedDate(),
          });
        } else {
          // Step 3: Update lastSignInAt for existing user
          await users.updateOne(
            { _id: existingUser._id },
            { $set: { lastSignInAt: formattedDate() } }
          );
        }
      }

      // For Credentials login, lastSignInAt already updated in authorize()
      return true;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
