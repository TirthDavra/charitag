import { User as IUser, IUserDetails } from "./interface";
import NextAuth, { DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

export interface IUserAuthSession {
  user: IUser;
}
declare module "next-auth" {
  interface Session {
    user: IUser;
  }
  interface User extends IUser {}
}

// declare module "@auth/core/adapters" {
//   interface AdapterUser extends BaseAdapterUser, User {}
// }
// declare module "next-auth/jwt" {
//   interface JWT {
//     user?: User;
//   }
// }
