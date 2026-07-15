import {Loader2, Lock, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { emailSchema } from '@/app/schema/email.schema'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/app/types/ApiResponse'
import Softbackdrop from './Softbackdrop'

function VerifyEmail() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [emailError, setEmailError] = useState("")

    const validateEmail = () => {
        const result = emailSchema.safeParse({ email })
        if (!result.success && result.error.flatten().fieldErrors.email) {
            setEmailError(result.error?.flatten().fieldErrors.email?.[0] ?? "")
        }
        else setEmailError("")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const response = await axios.post(`/api/auth/verify-email`, {email})
            toast.success(response.data?.message || "Email verified")
            router.push(`/reset-password?email=${encodeURIComponent(email)}`)
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            toast.error(axiosError?.response?.data?.message || "Something went wrong")
        }finally{
            setEmail("")
            setIsSubmitting(false)
        }
    }

    return (
        <>
        <Softbackdrop/>
        <div className='relative h-auto px-6 py-10 pt-32 flex flex-col justify-center items-center overflow-hidden w-full'>


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
                    Verify Email
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className='text-gray-400 text-sm mb-6 text-center leading-relaxed'
                >
                    Verify your registered email to reset password
                </motion.p>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className='flex flex-col gap-4 w-full'
                >

                    <div className='relative'>
                        <Mail size={18} className='absolute left-4 top-3.5 text-gray-400 pointer-events-none' />
                        <input
                            name='email'
                            type='email'
                            placeholder='Email id'
                            required={true}
                            spellCheck={false}
                            value={email}
                            autoCorrect="off"
                            autoCapitalize="off"
                            onChange={(e) => {
                                setEmailError("")
                                setEmail(e.target.value)
                            }}
                            onBlur={validateEmail}
                            className='focus:outline-none w-full border border-white/10 rounded-full bg-black/20 pl-11 pr-4 py-3 text-white text-sm placeholder-gray-500 focus:ring-1 focus:ring-[#f0146b] focus:border-[#f0146b] focus:bg-black/40 transition-all shadow-inner' />

                        {emailError && (
                            <p className="text-red-500 text-xs mt-1 ml-4">{emailError}</p>
                        )}
                    </div>


                    {(() => {
                        const formValid = email !== "" && emailError === ""
                        return <button
                            disabled={isSubmitting || !formValid}
                            type='submit'
                            className='mt-2 w-full bg-[#f0146b] hover:bg-[#d4115e] disabled:bg-[#f0146b]/60 disabled:text-white/60 cursor-pointer disabled:cursor-not-allowed py-3 rounded-full text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-3 '
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className='animate-spin text-white' />
                                    Verifying...
                                </>
                            ) : (
                                "Verify"
                            )}
                        </button>
                    })()}

                    <div className='flex justify-center items-center text-gray-400 text-sm mt-3 gap-1'>
                        <span>Back to Login ?</span>
                        <Link
                            href={'/sign-in'}
                            className='text-[#f0146b] hover:text-[#ff3085] transition-all duration-200'
                        >
                            click here
                        </Link>
                    </div>

                </motion.form>
            </motion.div>
        </div>
        </>
        
    )
}

export default VerifyEmail