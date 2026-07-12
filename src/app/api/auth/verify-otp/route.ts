import dbConnect from "@/app/lib/db";
import redis from "@/app/lib/Redis";
import UserModel from "@/app/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const {email, otp} = await req.json()
        if(!email || !otp) return NextResponse.json({message: "All credentials are required", success: false}, {status: 400})
        await dbConnect()
        const user = await UserModel.findOne({email})
        if(!user) return NextResponse.json({message: "User not found", success: false}, {status: 404})
        const storedOtp = await redis.get(`user_otp:${email}`);
        if(!storedOtp) return NextResponse.json({message: "OTP is expired, please request a new one", success: false}, {status: 400})
        console.log(storedOtp)
        if(storedOtp.toString() !== otp) return NextResponse.json({message: "Invalid Otp", success: false}, {status: 400})

        await redis.del(`user_otp:${email}`)
        user.isVerified = true;
        await user.save();

        return NextResponse.json({message: "Otp verified", success: true}, {status: 201})

    } catch (error) {
        return NextResponse.json({message: "An unexpected error occured", success: false}, {status: 500})
    }
}