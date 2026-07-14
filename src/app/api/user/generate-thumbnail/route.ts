import { auth } from "@/app/auth";
import { aiGenerate } from "@/app/lib/ai";
import dbConnect from "@/app/lib/db";
import redis from "@/app/lib/Redis";
import ThumbModel from "@/app/models/thumbnail.models";
import UserModel from "@/app/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    let thumbnailId:string | undefined
    let currUserId:string | undefined
    try {
        const session = await auth()
        if(!session || !session.user) {
            return NextResponse.json({message: "Unauthorized", success: false}, {status: 401})
        }
        await dbConnect()
        const user = session.user
        currUserId = user.id
        const existingUser = await UserModel.findById(user.id)
        if(!existingUser) return NextResponse.json({message: "User not found", success: false}, {status: 404})

        // Continue with the rest of the logic
        const { title, description, style, aspect_ratio, color_scheme} = await req.json();

        // FLOW OF OUR TASK -->>
        // flow --> get the thumbnail datas and create an document with isGenerating true
        // add this thumbnail to the corresponding user
        // ai calling --> ai will generate the image and then upload it to cloudunary from ai.ts
        // on success on cloudinary --> return upload url to ai function --> ai will return back the imageUrl to this route
        // set the imageUrl and save it
        // on failure --> delete the model and remove from user model array too



        const thumbnail = await ThumbModel.create({
            title, description, style, aspect_ratio, color_scheme,  userId: user.id, isGenerating: true
        })

        // console.log(thumbnail)
        thumbnailId = thumbnail._id.toString()

        await UserModel.findByIdAndUpdate(user.id, {
            $push: {thumbnails: thumbnail._id}
        })

        const cloudinaryUrl = await aiGenerate({title, description, style, aspect_ratio, color_scheme})
        
        thumbnail.image_url = cloudinaryUrl.secure_url
        thumbnail.isGenerating = false
        await thumbnail.save()
        
        await redis.del(`thumbnails:${currUserId}`)
        return NextResponse.json({message: "Thumbnail generated",thumbnail, success: true}, {status: 201})
    } catch (error) {
        try {
            if(thumbnailId && currUserId) {
                await ThumbModel.findByIdAndDelete(thumbnailId)
                await UserModel.findByIdAndUpdate(currUserId, {
                    $pull: {thumbnails: thumbnailId}
                })
            }
        } catch (error) {
            console.error("Error during cleanup:", error)
        }
        return NextResponse.json({message: "Internal Server Error", success: false}, {status: 500})
    }
}