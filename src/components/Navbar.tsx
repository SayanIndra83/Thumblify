'use client'
import { ArrowRight, ImageIcon, LayoutGrid, Loader, LogOut, MenuIcon, User, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { navlinks } from "@/data/navlinks";
import { INavLink } from "@/dataTypes";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false)
    const [loggingOut, setLoggingOut] = useState(false)
    const router = useRouter()
    const session = useSession()
    const user = session.data?.user
    // console.log(user)
    const profileDropDown = useRef<HTMLDivElement>(null)

     useEffect(()=>{
        const handleClickOutSide = (e:MouseEvent) =>{
            if(profileDropDown.current && !profileDropDown.current.contains(e.target as Node)){
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutSide)
        return () => document.removeEventListener("mousedown", handleClickOutSide)
    }, [])

    const handleLogout = async ()=> {
        setLoggingOut(true)
        try {
            await signOut({callbackUrl: '/sign-in'})
        } catch (error) {
            toast.error("Logout failed")
        }finally{
            setLoggingOut(false)
            setLoggingOut(false)
            setOpen(false)
        }
    }

    return (
        <>
            <motion.nav className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
                <a href="/">
                    <Image className="h-8.5 w-auto" src="/assets/logo.svg" alt="logo" width={130} height={34} priority />
                </a>

                <div className="hidden md:flex items-center gap-8 transition duration-500">
                    {navlinks.map((link: INavLink) => (
                        <Link key={link.name} href={link.href} className="hover:text-pink-500 transition">
                            {link.name}
                        </Link>
                    ))}
                    {user ? (
                        <Link href={'/generate'} className="hover:text-pink-500 transition">
                            Generate
                        </Link>
                    )
                :
                (
                  <Link href={'/#pricing'} className="hover:text-pink-500 transition">
                            Pricing
                        </Link>  
                )}
                </div>
                

                <div className="flex justify-center items-center gap-10">
                {user
                ? (

        <div
         className='relative'
        ref={profileDropDown}>
        <div
        className='rounded-full h-10 w-10 bg-white/10 border border-white/20 flex justify-center items-center shadow-md hover:scale-105 overflow-hidden transition-all relative cursor-pointer text-gray-300 hover:border-[#f0146b]'
        onClick={() => setOpen(prev => !prev)}
        >
            {
                user?.userImage? (
                    <Image 
                    alt='User Image'
                    src={user.userImage}
                    fill
                    className='object-cover rounded-full'
                    />
                ) :(<User className='h-5 w-5'/>)
            }
        </div>

        <AnimatePresence>
                {
            open && 
                <motion.div
                initial={{
                    opacity:0,
                    y:-10,
                    scale:0.95
                }}
                animate={{
                    opacity:1,
                    y:0,
                    scale:1
                }}
                transition={{
                    duration:0.3
                }}
                exit={{
                   opacity:0,
                    y:-10,
                    scale:0.95,
                    transition:{duration:0.3}
                }}
                className='absolute hidden md:flex right-0 w-64 mt-4 rounded-2xl shadow-2xl border border-white/8 bg-[#161217]/95 backdrop-blur-2xl p-3 z-50 flex-col gap-2'
                                    >
                                        <div className='flex items-center gap-3 w-full px-3 py-2.5 border-b border-white/5 mb-2'>
                                            <div className='flex items-center justify-center rounded-full w-10 h-10 bg-[#f0146b]/20 text-[#f0146b] relative shrink-0'>
                                                {user?.userImage ? (
                                                    <Image
                                                        alt='User Image'
                                                        src={user.userImage}
                                                        fill
                                                        className='object-cover rounded-full'
                                                    />
                                                ) : (<User size={18} />)}
                                            </div>
                                            <div className="flex flex-col overflow-hidden">
                                                <span className='text-gray-100 font-semibold text-sm truncate w-full'>{user?.userName || "User"}</span>
                                                <span className="text-gray-500 text-xs truncate w-full">{user?.email || ""}</span>
                                            </div>
                                        </div>

                                        <Link
                                            href={'/user/generate'}
                                            onClick={() => setOpen(false)}
                                            className='flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white font-medium text-sm group transition-all duration-200'
                                        >
                                            <ImageIcon className='text-gray-400 group-hover:text-[#f0146b] h-4 w-4 transition-colors' />
                                            <span>Generate Thumbnail</span>
                                        </Link>

                                        <Link
                                            href={'/user/my-generates'}
                                            onClick={() => setOpen(false)}
                                            className='flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white font-medium text-sm group transition-all duration-200'
                                        >
                                            <LayoutGrid className='text-gray-400 group-hover:text-[#f0146b] h-4 w-4 transition-colors' />
                                            <span>My Generates</span>
                                        </Link>

                                        <button
                                            disabled={loggingOut}
                                            onClick={handleLogout}
                                            className='flex items-center gap-3 w-full px-3 py-2.5 mt-1 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 text-red-400 font-medium text-sm group transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                                        >
                                            {loggingOut ? (
                                                <>
                                                    <Loader className='h-4 w-4 animate-spin' />
                                                    <span>Logging Out...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <LogOut className='h-4 w-4 group-hover:-translate-x-0.5 transition-transform' />
                                                    <span>Log out</span>
                                                </>
                                            )}
                                        </button>
                </motion.div>
}
            </AnimatePresence>
        </div>
            
                )
                : (
                <button 
                onClick={() => router.push("/sign-in")}
                className="hidden md:flex gap-2 items-center justify-center px-6 py-2.5 bg-pink-600 hover:bg-pink-700 group active:scale-95 transition-all rounded-full">
                    Get Started
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-all duration-200 "/>
                </button>
                )
                }

            

                <button onClick={() => setIsOpen(true)} className="md:hidden">
                    <MenuIcon size={26} className="active:scale-90 transition" />
                </button>

                </div>
            </motion.nav>

            <div className={`fixed inset-0 z-100 bg-[#070305]/90 backdrop-blur-xl flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-400 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-gray-200 hover:text-white bg-pink-600 rounded-lg px-4 py-2  transition-colorsrounded-full">
                    <XIcon size={24} />
                </button>

                <div className="flex flex-col items-center w-full max-w-xs gap-3">
                    {navlinks.map((link: INavLink) => (
                        <Link 
                            key={link.name} 
                            href={link.href} 
                            onClick={() => setIsOpen(false)}
                            className="w-full text-center py-3 text-gray-300 hover:text-white font-medium hover:bg-white/5 rounded-xl transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link href={'/#pricing'}
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-3 text-gray-300 hover:text-white font-medium hover:bg-white/5 rounded-xl transition-colors"
                    >
                    Pricing
                    </Link>
                    
                    {user && (
                        <>
                            
                            <Link 
                                href={'/user/generate'} 
                                onClick={() => setIsOpen(false)}
                                className="w-full text-center py-3 text-gray-300 hover:text-[#f0146b] font-medium hover:bg-white/5 rounded-xl transition-colors"
                            >
                                Generate Thumbnail
                            </Link>
                            
                            <Link 
                                href={'/user/my-generates'} 
                                onClick={() => setIsOpen(false)}
                                className="w-full text-center py-3 text-gray-300 hover:text-[#f0146b] font-medium hover:bg-white/5 rounded-xl transition-colors"
                            >
                                My Generates
                            </Link>
                            
                            <button
                                disabled={loggingOut}
                                onClick={handleLogout}
                                className='flex items-center justify-center gap-2 w-full py-3 mt-4 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 text-red-400 font-medium transition-colors disabled:opacity-50'
                            >
                                {loggingOut ? (
                                    <>
                                        <Loader className='h-5 w-5 animate-spin' />
                                        <span>Logging Out...</span>
                                    </>
                                ) : (
                                    <>
                                        <LogOut className='h-5 w-5' />
                                        <span>Log out</span>
                                    </>
                                )}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}