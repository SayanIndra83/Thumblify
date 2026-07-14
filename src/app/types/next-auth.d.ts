declare module 'next-auth' {
    interface User{
        id?: string
        userName?: string
        email?: string
        userImage: string | null
        isVerified?: boolean
    }
    interface session{
        user:{
        id?: string
        userName?: string
        email?: string
        userImage: string | null
        isVerified?: boolean
        } & DefaultSession["user"]
    }
}

declare module 'next-auth/jwt'{
    interface JWT{
        userName?:string
        email?: string,
        userImage: string | null
        isVerified?: boolean
        id?: string
    }
}
export {}