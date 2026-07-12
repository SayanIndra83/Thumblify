import dbConnect from "@/app/lib/db";
import redis from "@/app/lib/Redis";
import UserModel from "@/app/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const {email} = await req.json()
        // email not provided
        if(!email) return NextResponse.json({message: "Email is required", success: false}, {status: 400})
        
        // user with email does not exist
        await dbConnect();
        const user = await UserModel.findOne({email});
        if(!user || !user.isVerified)  return NextResponse.json({message: "User not found", success: false}, {status: 404})

        const otp = Math.floor(Math.random()*9000 + 1000).toString()
        await redis.set(`user_otp:${email}`, otp, {ex: 600})

        return NextResponse.json({message: "An otp has been sent to your email", success: true, otp}, {status: 201})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "An unexpected error occured", success: false}, {status: 500})
    }
}