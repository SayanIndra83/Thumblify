import dbConnect from "@/app/lib/db";
import client from "@/app/lib/Qstash";
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

        // send email
         const username = user?.userName || "there"
        const subject = "Password Reset Verification Code";
    
      const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
        <h2 style="color: #f0146b; text-align: center; margin-bottom: 24px;">Reset Your Password</h2>
        
        <p style="color: #374151; font-size: 16px; line-height: 1.5;">Hello ${username},</p>
        
        <p style="color: #374151; font-size: 16px; line-height: 1.5;">
          We received a request to reset the password for your account. Use the verification code below to complete the process. This code is valid for <strong>10 minutes</strong>.
        </p>
        
        <div style="background-color: #fff0f5; border: 2px dashed #ffb3d1; border-radius: 12px; padding: 24px; text-align: center; margin: 32px 0;">
            <span style="font-size: 36px; font-weight: bold; letter-spacing: 12px; color: #f0146b; display: block; margin-left: 12px;">${otp}</span>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
          If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
        </p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        
        <p style="color: #9ca3af; font-size: 12px; text-align: center;">
          &copy; ${new Date().getFullYear()} Thumbly. All rights reserved.
        </p>
      </div>
    `;
        await client.publishJSON({
            url: `${process.env.NEXT_BASE_PUBLIC_URL}/api/worker`,
            body:{
                to : email
                , subject, html,
                type: "EMAIL_VERIFICATION"
            }
        })
        return NextResponse.json({message: "An otp has been sent to your email", success: true, otp}, {status: 201})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "An unexpected error occured", success: false}, {status: 500})
    }
}