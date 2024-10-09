//signup api route to handle signup request>>

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {z} from "zod";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();

const signupSchema = z.object({
    email : z.string().email("invalid email address").nonempty("email is required"),
    password : z.string().min(6,"password must be atleast 6 charecters").nonempty("password is requried"),
    firstName : z.string().nonempty("First name is required"), 
    lastName : z.string().nonempty("Last name is required"),
    adress1 :  z.string().nonempty("Address is required"),
    city : z.string().nonempty("City is required"),
    postalCode : z.string().nonempty("Postal code is required") ,
    dateOfBirth :  z.string().nonempty("Date of birth is required"),
    ssn : z.string().nonempty("SSN is required")
});

export default async function handler(req : NextApiRequest,res : NextApiResponse) {
    if(req.method === 'POST') {
        return res.status(405).json({
            error: "method not allowed , some bakchodi happened!"
        });
    }
    try {
        const validatedData = signupSchema.parse(req.body);
        const existingUser = await prisma.user.findFirst({
            where : {
                email : validatedData.email
            }
        });
        if(existingUser){ //check for same user in the db
            return res.status(400).json({
                message : "User already exists!"
            });
        }
        const hashedPassword = await bcrypt.hash(validatedData.password , 10); //hashed the password
        //creating new user in the db
        const newUser = await prisma.user.create({
            data : {
                email : validatedData.email,
                password : validatedData.password,
                firstName : validatedData.firstName,
                lastName : validatedData.lastName,
                address1 : validatedData.adress1,
                city : validatedData.city,
                postalCode : validatedData.postalCode,
                dateOfBirth : validatedData.dateOfBirth,
                ssn : validatedData.ssn
            }
        });
        res.status(201).json({
            message : "User created successfully",
            user : newUser
        })
    } catch(e) {
        console.error("some error occured!" , e);
        res.status(500).json({
            error : "internal server error"
        });
    }
}