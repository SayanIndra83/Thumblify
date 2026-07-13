import mongoose, { Model } from "mongoose"

export interface IUser{
    userName: string;
    email: string;
    password: string | null;
    userImage:string | null;
    isVerified: boolean;
    thumbnails?: [mongoose.Types.ObjectId]
}

const UserSchema = new mongoose.Schema<IUser>({
    userName: {
        type: String,
        required: true,
    },
    email:{
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please provide a valid email address."],
},
password:{
    type: String,
    required: false,
    default: null
},
userImage:{
    type: String,
    required: false,
    default: null
},
isVerified:{
    type: Boolean,
    default:false
},
thumbnails:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Thumbnail"
}
}
, {timestamps: true})

const UserModel =( mongoose.models.User as Model<IUser> )|| (mongoose.model<IUser>("User", UserSchema))

export default UserModel