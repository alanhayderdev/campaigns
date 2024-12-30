import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { users } from "./app/util/users";

export function copyPropertiesToTarget(target: object, source: object): void {
  for (const key of Object.keys(source)) {
    (target as any)[key] = (source as any)[key];
  }
}

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  secret: "secret",

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials: {email: string, password: string}): Promise<any> => {
        try {
          const user = users.find(
            (el) =>
              el.email === credentials.email &&
              el.password === credentials.password
          );
          if (!user) throw new Error("user not found");
          return user;
        } catch (error: any) {
          console.log(error.message);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        copyPropertiesToTarget(token, session);
      }
      if (user) {
        copyPropertiesToTarget(token, user);
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        copyPropertiesToTarget(session.user, token);
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});
