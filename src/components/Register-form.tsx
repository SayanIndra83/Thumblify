import { EyeClosed, EyeIcon, Loader2, Lock, Mail, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import googleImage from "@/assets/google_logo.webp"
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { passwordSchema } from '@/app/schema/password.schema'
import { emailSchema } from '@/app/schema/email.schema'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/app/types/ApiResponse'
import Softbackdrop from './Softbackdrop'

function SignUpForm() {
    const router = useRouter()
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const [isPassShow, setIsPassShow] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [emailError, setEmailError] = useState("")
    const [passError, setPassError] = useState("")


    const validateEmail = () => {
        const result = emailSchema.safeParse({ email })
        if (!result.success && result.error.flatten().fieldErrors.email) {
            setEmailError(result.error?.flatten().fieldErrors.email?.[0] ?? "")
        }
        else setEmailError("")
    }

    const validatePass = () => {
        const result = passwordSchema.safeParse({ password })
        if (!result.success && result.error.flatten().fieldErrors.password) {
            setPassError(result.error?.flatten().fieldErrors.password?.[0] ?? "")
        }
        else setPassError("")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const res = await axios.post('/api/auth/sign-up', {
                email, password, userName
            })
            setUserName("")
            setEmail("")
            setPassword("")
            toast.success(res?.data?.message || "Account created successfully")
            router.push(`verify-otp/${email}`)
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            toast.error(axiosError.response?.data?.message || "Something went wrong")
        }
        finally{
            setIsSubmitting(false)
        }
    }

    return (
        <>
        <Softbackdrop/>
        
        <div className='relative min-h-[70%] px-6 pb-20 pt-32 flex flex-col justify-center items-center overflow-hidden w-full'>


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
                    Welcome
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className='text-gray-400 text-sm mb-6'
                >
                    Create an account to continue
                </motion.p>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className='flex flex-col gap-4 w-full'
                >

                    <div className='relative'>
                        <User size={18} className='absolute left-4 top-3.5 text-gray-400 pointer-events-none' />
                        <input
                            name='userName'
                            type='text'
                            placeholder='Username'
                            required={true}
                            spellCheck={false}
                            value={userName}
                            autoCorrect="off"
                            autoCapitalize="off"
                            onChange={(e) => {
                                setUserName(e.target.value)
                            }}
                            className='focus:outline-none w-full border border-white/10 rounded-full bg-black/20 pl-11 pr-4 py-3 text-white text-sm placeholder-gray-500 focus:ring-1 focus:ring-[#f0146b] focus:border-[#f0146b] focus:bg-black/40 transition-all shadow-inner' />
                    </div>

                    <div className='relative'>
                        <Mail size={18} className='absolute left-4 top-3.5 text-gray-400 pointer-events-none' />
                        <input
                            name='email'
                            type='text'
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

                    <div className='relative'>
                        <Lock size={18} className='absolute left-4 top-3.5 text-gray-400 pointer-events-none' />
                        <input
                            name='password'
                            type={isPassShow ? "text" : "password"}
                            placeholder='Password'
                            required={true}
                            spellCheck={false}
                            value={password}
                            autoCorrect="off"
                            autoCapitalize="off"
                            onChange={(e) => {
                                setPassword(e.target.value)
                                if (passError) setPassError("")
                            }}
                            onBlur={validatePass}
                            className='focus:outline-none w-full border border-white/10 rounded-full bg-black/20 pl-11 pr-10 py-3 text-white text-sm placeholder-gray-500 focus:ring-1 focus:ring-[#f0146b] focus:border-[#f0146b] focus:bg-black/40 transition-all shadow-inner' />

                        <button className='absolute right-4 top-3.5 text-gray-400 hover:text-gray-300 transition-colors cursor-pointer'
                            onClick={() => setIsPassShow(!isPassShow)}
                            type='button'
                        >
                            {isPassShow ? <EyeClosed size={18} /> : <EyeIcon size={18} />}
                        </button>

                        {passError && (
                            <p className="text-red-500 text-xs mt-1 ml-4">{passError}</p>
                        )}
                    </div>

                    {(() => {
                        const formValid = userName !== "" && email !== "" && password !== "" && passError === "" && emailError === ""
                        return <button
                            disabled={isSubmitting || !formValid}
                            type='submit'
                            className='mt-2 w-full bg-[#f0146b] hover:bg-[#d4115e] disabled:bg-[#f0146b]/60 disabled:text-white/60 cursor-pointer disabled:cursor-not-allowed py-3 rounded-full text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-3'
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className='animate-spin text-white' />
                                    Creating account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    })()}

                    <div className='flex justify-center items-center text-gray-400 text-sm mt-3 gap-1'>
                        <span>Already have an account?</span>
                        <Link
                            href={'/sign-in'}
                            className='text-[#f0146b] hover:text-[#ff3085] transition-all duration-200'
                        >
                            Login
                        </Link>
                    </div>

                    <div className='w-full flex gap-3 text-gray-600 text-xs mt-3 items-center'>
                        <span className='flex-1 h-px bg-white/10'></span>
                        <span>OR</span>
                        <span className='flex-1 h-px bg-white/10'></span>
                    </div>

                    <button
                        type='button'
                        className='w-full flex gap-3 items-center justify-center bg-white/2 hover:bg-white/6 border border-white/5 py-3 rounded-full cursor-pointer text-gray-300 text-sm backdrop-blur-md transition-all duration-200'
                        onClick={() => signIn("google", { callbackUrl: '/' })}
                    >
                        <Image src={googleImage} alt='google logo' width={18} height={18} /> 
                        Continue with Google
                    </button>

                </motion.form>
            </motion.div>
        </div>
        </>
    )
}

export default SignUpForm