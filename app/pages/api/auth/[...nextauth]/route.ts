

//makes the handler that receives all the requests 

import { NEXT_AUTH } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(NEXT_AUTH);

export {handler as GET , handler as POST};