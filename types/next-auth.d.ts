// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // or whatever type your user id is
    firstName: string;
    lastName: string;
    email: string;
  }

  interface Session {
    user: User;
  }
}
