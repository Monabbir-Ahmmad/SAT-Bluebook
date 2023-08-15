import { authAction, userAction } from "@/lib/server/actions";
import { verifyPassword } from "@/lib/server/utils/password.util";
import NextAuth, { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { GithubProfile } from "next-auth/providers/github";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },

  providers: [
    GithubProvider({
      profile(profile: GithubProfile) {
        return {
          ...profile,
          id: profile.id.toString(),
          role: profile.role ?? "user",
        };
      },
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Your email address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password",
        },
      },

      async authorize(credentials) {
        const user = await userAction.findByEmail(credentials?.email!);

        if (
          user &&
          (await verifyPassword(credentials?.password!, user.password))
        ) {
          return user;
        } else return null;
      },
    }),
  ],

  callbacks: {
    async signIn({ profile }) {
      try {
        const user = await userAction.findByEmail(profile?.email!);

        if (!user) {
          await authAction.register({
            email: profile?.email!,
            name: profile?.name!,
            password: "",
            confirmPassword: "",
          });
        }
      } catch (error) {
        console.log(error);
        return false;
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.sub!;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
