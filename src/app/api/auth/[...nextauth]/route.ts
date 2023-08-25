import NextAuth, { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { GithubProfile } from "next-auth/providers/github";
import GithubProvider from "next-auth/providers/github";
import { OAuthProviders } from "@/constants/enums";
import { authAction } from "@/lib/server/actions";

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },

  providers: [
    GithubProvider({
      async profile(profile: GithubProfile) {
        const user = await authAction.OAuthLogin({
          email: profile.email!,
          name: profile.name!,
          oauth: {
            oauthId: profile.id.toString(),
            provider: OAuthProviders.GITHUB,
          },
        });

        return user;
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
        try {
          const user = await authAction.login({
            email: credentials?.email!,
            password: credentials?.password!,
          });

          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
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
