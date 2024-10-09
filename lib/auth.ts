//lib/auth.ts >>

//next auth write here
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"; 
import { PrismaClient } from '@prisma/client';
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import {z} from "zod"

const prisma = new PrismaClient();

const credentialsSchema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password : z.string().min(6,"password must be atleast 6 charecters long").nonempty("password is required")
});

export const NEXT_AUTH: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'example@welcome.com', required: true },
                password: { label: 'Password', type: 'password', required: true }
            },
            async authorize(credentials: any) {
                try{
                    const validatedCredentials = credentialsSchema.parse(credentials);
                    const existingUser = await prisma.user.findFirst({
                        where: { email: validatedCredentials.email }
                    });

                    if (!existingUser) {
                        return null; // User not found
                    }

                    // Check password
                    const passwordValidation = await bcrypt.compare(validatedCredentials.password, existingUser.password);
                    
                    if (!passwordValidation) {
                        return null; // Password doesn't match
                    }

                    return existingUser; // Return user if authorized
                } catch(err){
                    console.error("error occured!", err);
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session;
        }
    }
};
