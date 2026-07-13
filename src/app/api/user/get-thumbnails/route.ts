import { auth } from "@/app/auth";
import dbConnect from "@/app/lib/db";
import ThumbModel from "@/app/models/thumbnail.models";
import UserModel from "@/app/models/user.models";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await auth()
        if(!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
        }   
        const userId = session.user.id;
        await dbConnect();
        const user = await UserModel.findById(userId).select("thumbnails").populate({ path: "thumbnails", options: { sort: { createdAt: -1 } } }).lean();

        const thumbnails = user?.thumbnails || [];
        return NextResponse.json({ message: "Thumbnails retrieved", success: true, thumbnails }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}