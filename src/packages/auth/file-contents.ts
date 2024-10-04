export const nextAuthDTsContent = `// @typescript-eslint/no-unused-vars
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
    };
  }
}
`;

export const authTsContent = `import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession } from "next-auth";
import type { Session, NextAuthOptions } from "next-auth";
import { db } from "~/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    // eslint-disable-next-line
    async session({ token, session }) {
      if (token) {
        session.user.id = token.userId;
        session.user.email = token.email;
      }
      return session;
    },
    async jwt({ token, user, trigger, session: nextSession }) {
      const session = nextSession as Session;
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email!,
        },
      });
      if (!dbUser) {
        token.id = user.id;
        return token;
      }
      if (trigger === "update") {
        return { ...token, ...session };
      }

      // @typescript-eslint/no-unnecessary-type-assertion
      return {
        userId: dbUser.id,
        email: dbUser.email,
      };
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        if (!credentials.email || !credentials.password) {
          return null;
        }

        try {
          const user = await db.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (!user) {
            return null;
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!isValidPassword) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
`;
