import { connectDB } from "@/lib/db";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try {
        const {email, password} = await request.json();

        if(!email || !password){
            return NextResponse.json(
                {error: "Email and Password required"},
                {status: 400}
            )
        }

        await connectDB();

        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return NextResponse.json(
                {error: "User already registered"},
                {status: 404}
            )
        }

        const newUser = await UserModel.create({
            email,
            password
        })

        return NextResponse.json(
            {message: "User registered successfully", newUser},
            {status: 201}
        )

    } catch (error) {
        console.error("Registration failed", error);
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}