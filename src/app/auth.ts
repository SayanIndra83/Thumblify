import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import dbConnect from "./lib/db"
import UserModel from "./models/user.models"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"
 
class AuthError extends CredentialsSignin{
  constructor(msg: string){
    super()
    this.code = msg
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" ,label: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials:any) : Promise<any> {
        try {
            if(!credentials.email || !credentials.password) throw new AuthError("All credentials required")
            await dbConnect();
            const user = await UserModel.findOne({email: credentials.email});
            if(!user || !user.isVerified) throw new AuthError("User not found")
            if(!user.password) throw new AuthError("Please login through google")
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
            if(!isPasswordCorrect) throw new AuthError("Incorrect password")
            
            return {
                        id: user._id.toString(),
                        email: user.email,
                        userName: user.userName,
                        isVerified: user.isVerified,
                        userImage: user.userImage,
                    };
        } catch (error : any) {
            if(error instanceof AuthError) throw error
            throw new AuthError("An unexpexted error occured")
        }
      }
    }),
    Google({
      clientId:process.env.CLIENT_ID,
      clientSecret:process.env.CLIENT_SECRET
    })
  ],
  pages:{signIn : "/sign-in"},
  secret: process.env.BETTER_AUTH_SECRET,
  session:{
    strategy: "jwt",
    maxAge: 3*24*60*60
  },
  callbacks:{
    // using google
    async signIn ({account, user}) {
        if (account?.provider === "google") {
            const email = user.email
            await dbConnect()
            let existingUser = await UserModel.findOne({email});
            if(!existingUser){
                existingUser = await UserModel.create({
                    email, 
                    userName: user.name || user.email?.split("@")[0],
                    isVerified: true,
                    userImage: user.image|| ""
                })
            }

            user.id = existingUser._id?.toString()
            user.userName = existingUser.userName
            user.email = existingUser.email
            user.isVerified = existingUser.isVerified
            if(existingUser.userImage) user.userImage = existingUser.userImage
      }

      return true
    },

    async jwt ({token, user}) {
        if(user) {
            token.id = user.id?.toString()
            token.userName = user.userName
            token.email = user.email
            if(user.userImage) token.userImage = user.userImage
            token.isVerified = user.isVerified
        }
        return token
    },

    async session({token, user, session}){
        if(token && session.user) {
            session.user.id = token.id as string
            session.user.email = token.email as string
            session.user.userName = token.userName as string
            session.user.isVerified = token.isVerified as boolean
            if(token.userImage) session.user.userImage = token.userImage as string
        }
        return session
    }
  }

})