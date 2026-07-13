import { sendMail } from "@/app/lib/mailer";
import { NextRequest, NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";

async function handler(req:NextRequest) {
    try {
        const {to, html, subject, type} = await req.json()
        await sendMail(to, subject, html)
        console.log("Email sent successfully")
        return NextResponse.json({ success: true, message: "Email sent" }, { status: 200 });
    } catch (error) {
        console.log("Something went wrong in mail sending worker", error)
        return NextResponse.json({ success: false, message: "Email failed" }, { status: 500 });
    }
}

export const POST = verifySignatureAppRouter(handler);