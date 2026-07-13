import { auth } from "@/app/auth";
import dbConnect from "@/app/lib/db";
import ThumbModel from "@/app/models/thumbnail.models";
import UserModel from "@/app/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest, {params} : {params:Promise<{thumbnailId: string}>}) {
    try {
        const session = await auth()
        if(!session || !session.user) {
            return NextResponse.json({message: "Unauthorized", success: false}, {status: 401})
        }
        const userId = session.user.id
        const { thumbnailId } = await params
        
        if(!thumbnailId) {
            return NextResponse.json({message: "Thumbnail ID is required", success: false}, {status: 400})
        }

        await dbConnect()
        const deletedThumbnail = await ThumbModel.findOneAndDelete({ _id: thumbnailId, userId })
        if(!deletedThumbnail) {
            return NextResponse.json({message: "Thumbnail not found or you don't have permission to delete it", success: false}, {status: 404})
        }
        await UserModel.findByIdAndUpdate(userId, {
            $pull: {thumbnails: thumbnailId}
        })
        return NextResponse.json({message: "Thumbnail deleted", success: true}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error", success: false}, {status: 500})
    }
}