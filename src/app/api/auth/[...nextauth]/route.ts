import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { getUsersCollection } from "@/app/api/collection";
import { formattedDate } from "@/utilities/MyFormat";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Step 1: Check if email & password exist
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password required");
        }

        const users = await getUsersCollection();

        // Step 2: Find user by email
        const user = await users.findOne({ email: credentials.email });
        if (!user) throw new Error("No user found");

        // Step 3: Check password
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect) throw new Error("Wrong password");

        // Step 4: Update last login
        await users.updateOne(
          { _id: user._id },
          { $set: { lastSignInAt: formattedDate } }
        );

        // Step 5: Return minimal user object
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
        token.id = user.id || token.sub;
        token.email = user.email;
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

    // Google signIn hook
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const users = await getUsersCollection();

        // check if user exists
        const existingUser = await users.findOne({ email: user.email });

        if (!existingUser) {
          // নতুন user insert
          await users.insertOne({
            email: user.email,
            provider: "google",
            name: user.name,
            image: user.image,
            role: "user",
            createdAt: formattedDate,
            lastSignInAt: formattedDate,
          });
        } else {
          // user last login update
          await users.updateOne(
            { _id: existingUser._id },
            { $set: { lastSignInAt: formattedDate } }
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
