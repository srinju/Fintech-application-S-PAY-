import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { createDwollaCustomer } from "@/lib/actions/dwolla.actions";
import { extractCustomerIdFromUrl } from "@/lib/utils";

const prisma = new PrismaClient();

const signupSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  address1: z.string().nonempty("Address is required"),
  city: z.string().nonempty("City is required"),
  state : z.string().min(2),
  postalCode: z.string().nonempty("Postal code is required"),
  dateOfBirth: z.string().nonempty("Date of birth is required"),
  ssn: z.string().nonempty("SSN is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = signupSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "User with this email already exists!",
        },
        {
          status: 409,
        }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        address1: validatedData.address1,
        city: validatedData.city,
        state : validatedData.state,
        postalCode: validatedData.postalCode,
        dateOfBirth: validatedData.dateOfBirth,
        ssn: validatedData.ssn,
      },
    });

    if(!newUser){
        throw new Error("error occured while creating new user!");
    }

    //creating dwolla customer url and linking it with the new user
    const dwollaCustomerUrl = await createDwollaCustomer({
        ...validatedData,
        type : 'personal'
    });

    if(!dwollaCustomerUrl) {
        throw new Error("error occured while creating dwolla customer url");
    }

    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

   //update the new user with dwolla customer detials in the database>
   const updatedUser = await prisma.user.update({
    where : {
        id : newUser.id
    },
    data : {
        dwollaCustomerId : dwollaCustomerId,
        dwollaCustomerUrl : dwollaCustomerUrl
    }
   })

    return NextResponse.json(
      {
        user: updatedUser,
        message: "User created and dwolla customer linked  successfully!",
      },
      {
        status: 201,
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Error occurred!",
      },
      {
        status: 500,
      }
    );
  }
}
