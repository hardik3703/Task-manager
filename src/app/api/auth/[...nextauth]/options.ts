// authOptions.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();

        try {
          const user = await UserModel.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isCorrectPass = await bcrypt.compare(credentials.password, user.password);
          if (isCorrectPass) {
            return { id: user._id.toString(), name: user.name, email: user.email };
          }

          throw new Error("Incorrect password");
        } catch (error) {
          throw new Error((error as Error).message);
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token._id ? token._id.toString() : "",
          name: token.name ? token.name.toString() : "",
          email: token.email ? token.email.toString() : "",
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id;
        token.name = user.name; // Ensure this line is included
        token.email = user.email;
      }
      return token;
    },
  },

  pages: {
    signIn: "/signin",
  },

  session: {
    strategy: "jwt",
  },
//   cookies: {
//     sessionToken: {
//       name: `__Secure-next-auth.session-token`,
//       options: {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
//         sameSite: 'lax',
//         path: '/',
//       },
//     },
//   },
  secret: "4b2c8e7d8a3f5e0a2f6e8d4c5b7a9e6c0f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o",
};
