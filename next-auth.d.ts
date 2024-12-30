// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { IAuthSession, IUser } from "@/interfaces/user.interface";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: IAuthSession & DefaultSession;
  }

  interface User extends DefaultUser, IUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT, IAuthSession {}
}
