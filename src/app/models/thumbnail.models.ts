import mongoose from "mongoose";

export interface IThumbnail {
    _id?: string;
    userId: string;
    title: string;
    description?: string;
    style: "Bold & Graphic" | "Tech/Futuristic" | "Minimalist" | "Photorealistic" | "Illustrated";
    aspect_ratio?: "16:9" | "1:1" | "9:16";
    color_scheme?: "vibrant" | "sunset" | "forest" | "neon" | "purple" | "monochrome" | "ocean" | "pastel";
    image_url?: string;
    isGenerating?: boolean;
    createdAt?: string;
    updatedAt?: string;
    text_overlay: boolean
}

const thumbnailSchema = new mongoose.Schema<IThumbnail>({
userId: {
    type: String,
    ref: "User",
    required: true
},
title:{
    type: String,
    required: true,
    trim: true
},
description:{
    type: String,
    trim: true
},
style:{
    type: String,
    required:true,
    enum: ["Bold & Graphic" ,"Tech/Futuristic" ,"Minimalist" ,"Photorealistic" ,"Illustrated"]
},
aspect_ratio:{
    type: String,
    enum: ["16:9", "1:1" ,"9:16"]
},
color_scheme:{
    type: String,
    enum: [ "vibrant" ,"sunset" ,"forest" ,"neon" ,"purple" ,"monochrome" ,"ocean" ,"pastel"]
},
image_url:{
type: String,
default: ""
},
text_overlay: {
    type : Boolean,
    default: true
},
isGenerating: {
    type: Boolean,
    default: true
}
}, {timestamps: true})


const ThumbModel = mongoose.models.Thumbnail as mongoose.Model<IThumbnail> || mongoose.model("Thumbnail", thumbnailSchema)


export default ThumbModel