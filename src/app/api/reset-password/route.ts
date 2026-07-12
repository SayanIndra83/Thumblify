import dbConnect from "@/app/lib/db"
import redis from "@/app/lib/Redis"
import UserModel from "@/app/models/user.models"
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req:NextRequest) {
    // user gives email, otp and newPassword
    // check user exists
    // verify otp
    // set new Password
    try {
        const {email, password, otp} = await req.json()
        if(!email || !password || !otp) return NextResponse.json({message: "All credentials are required", success: false}, {status: 400})
        
        await dbConnect()
        const user = await UserModel.findOne({email})
        if(!user || !user.isVerified) return NextResponse.json({message: "User not found", success: false}, {status: 404})
        
        const storedOtp = await redis.get(`user_otp:${email}`);
        if(!storedOtp) return NextResponse.json({message: "OTP is expired, please request a new one", success: false}, {status: 400})
        
        if(storedOtp.toString() !== otp) return NextResponse.json({message: "Invalid Otp", success: false}, {status: 404})

        await redis.del(`user_otp:${email}`)

        const hashedPassword = await bcrypt.hash(password, 10)
        await UserModel.updateOne({email}, {password: hashedPassword})

        return NextResponse.json({message: "Password reset successfully", success: true}, {status: 201})

    } catch (error) {
            console.log(error)
            return NextResponse.json({message: "An unexpected error occured", success: false}, {status: 500})
        }
}