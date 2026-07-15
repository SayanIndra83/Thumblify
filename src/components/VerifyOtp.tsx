import { ApiResponse } from "@/app/types/ApiResponse"
import axios, { AxiosError } from "axios"
import { Key, Loader2 } from "lucide-react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import React, { useRef, useState } from "react"
import toast from "react-hot-toast"
import Softbackdrop from "./Softbackdrop"

function VerifyOtp({email} : {email:string}) {
    const router = useRouter()
    const [otp, setOtp] = useState(["", "", "", ""])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const handleSubmit = async(e:React.FormEvent)=> {
        e.preventDefault()
        setIsSubmitting(true)
        const otpString = otp.join("")
        if (otpString.length !== 4) return
        try {
            const response = await axios.post('/api/auth/verify-otp', {
                email, otp : otpString
            })
            toast.success(response.data.message || "Otp successfully verified")
            router.push('/sign-in')
        } catch (error) {
           const axiosError = error as AxiosError<ApiResponse>
           toast.error(axiosError.response?.data?.message || "Something went wrong") 
        }finally{
            setIsSubmitting(false)
            setOtp(["", "", "", ""])
        }
    }

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text/plain").replace(/\D/g, "").slice(0, 4);
        if (pastedData) {
            const newOtp = [...otp];
            for (let i = 0; i < pastedData.length; i++) {
                newOtp[i] = pastedData[i];
            }
            setOtp(newOtp);
            const focusIndex = Math.min(pastedData.length, 3);
            inputRefs.current[focusIndex]?.focus();
        }
    }

  return (
    <>
        <Softbackdrop/>
        <div className='relative h-auto pt-20 px-6 pb-5 flex flex-col justify-center items-center overflow-hidden w-full'>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='relative z-10 w-full max-w-md bg-white/3 backdrop-blur-2xl border border-white/8 p-8 rounded-4xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex flex-col items-center'
            >
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className='text-3xl text-white font-semibold mb-1'
                >
                    Verify OTP
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className='text-gray-400 text-sm mb-6 text-center leading-relaxed'
                >
                    Please enter the otp sent to your email
                </motion.p>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className='flex flex-col gap-5 w-full'
                >

                    <div className="flex gap-3 justify-center w-full my-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el }}
                                type="text"
                                inputMode="numeric"
                                placeholder="0"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-14 h-14 text-center text-xl font-bold border border-white/10 rounded-xl bg-black/20 text-white focus:outline-none focus:border-[#f0146b] focus:ring-1 focus:ring-[#f0146b] focus:bg-black/40 transition-all shadow-inner"
                            />
                        ))}
                    </div>

                    {(() => {
                        const formValid = otp.join("").length === 4
                        return <button
                            disabled={isSubmitting || !formValid}
                            type='submit'
                            className='mt-2 w-full bg-[#f0146b] hover:bg-[#d4115e] disabled:bg-[#f0146b]/60 disabled:text-white/60 cursor-pointer disabled:cursor-not-allowed py-3 rounded-full text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-3'
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className='animate-spin text-white' />
                                    verifying...
                                </>
                            ) : (
                                "Verify"
                            )}
                        </button>
                    })()}

                </motion.form>
            </motion.div>
        </div>

    </>
    )
}


export default VerifyOtp
