import * as z from "zod"

export const otpSchema = z.object({
    otp:z.string().length(4, "OTP must be of length 6")
})