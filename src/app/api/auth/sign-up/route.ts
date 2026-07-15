import dbConnect from "@/app/lib/db";
import UserModel from "@/app/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import redis from "@/app/lib/Redis";
import client from "@/app/lib/Qstash";

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
        
        // mailing configure
        const username = userName || "there"
        const subject = "Verify your email address";
        
        const html = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #ffffff; border: 1px solid #f3f4f6; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="color: #f0146b; margin: 0; font-size: 28px; font-weight: 700;">Welcome!</h1>
                <p style="color: #6b7280; font-size: 16px; margin-top: 8px;">We're thrilled to have you on board.</p>
            </div>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                Hi <strong>${username}</strong>,
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                To complete your registration and secure your account, please verify your email address using the confirmation code below:
            </p>
            
            <div style="background-color: #fff0f5; border: 2px dashed #ffb3d1; border-radius: 12px; padding: 24px; text-align: center; margin: 32px 0;">
                <span style="font-size: 42px; font-weight: 800; letter-spacing: 12px; color: #f0146b; display: block; margin-left: 12px;">${otp}</span>
            </div>
            
            <p style="color: #4b5563; font-size: 14px; line-height: 1.5; margin-bottom: 32px; text-align: center;">
                This code will expire in <strong>30 minutes</strong>. For your security, please do not share this code with anyone.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />
            
            <p style="color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.5;">
                If you didn't attempt to create an account with this email address, you can safely ignore this message.
                <br><br>
                &copy; ${new Date().getFullYear()} Thumblify. All rights reserved.
            </p>
        </div>
        `;
        await client.publishJSON({
            url: `${process.env.NEXT_BASE_PUBLIC_URL}/api/worker`,
            body:{
                to : email
                , subject, html,
                type: "SIGNUP_VERIFICATION"
            }
        })
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