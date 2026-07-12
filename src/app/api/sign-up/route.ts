import dbConnect from "@/app/lib/db";
import UserModel from "@/app/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import redis from "@/app/lib/Redis";

export async function POST(req:NextRequest) {
    try {
        await dbConnect()
        const {userName ,email, password} = await req.json()
        // console.log({userName, email, password})
        if(!userName || !email || !password) return NextResponse.json({message: "An credentials required", success: false}, {status: 400})
        
        const existingUser = await UserModel.findOne({email})
        if(existingUser && existingUser.isVerified) return NextResponse.json({message: "User already exists", success: false}, {status: 400})
        // console.log(existingUser)

        const hashedPassword = await bcrypt.hash(password, 10)
        // send otp
        const otp = Math.floor(Math.random()*9000 + 1000).toString()
        // expired after 30 mins
        await redis.set(`user_otp:${email}`, otp, {ex : 1800})
        // give email handling to queue

        if(existingUser) await UserModel.deleteOne({email})
        await UserModel.create({email, userName, password: hashedPassword});


        return NextResponse.json({
            message: "Account created",
            success: true,
            otp
        }, {status: 201})

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "An unexpected error occured", success: false}, {status: 500})
    }
}