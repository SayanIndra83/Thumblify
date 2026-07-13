'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useSession } from "next-auth/react";

export default function Footer() {
    const session  = useSession()
    const user = session?.data?.user
    return (
        <footer className="w-full mt-40 border-t border-white/[0.05] bg-[#070305]/20 backdrop-blur-sm">
            <div className="pt-10 pb-5 px-6 md:px-16 lg:px-24 xl:px-32 text-sm text-gray-400 max-w-[1600px] mx-auto flex flex-col gap-8">
                
                <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
                    
                    <motion.div 
                        className="flex flex-col md:flex-row gap-12 lg:gap-16 w-full lg:w-1/2 justify-between lg:pr-12"
                        initial={{ x: -150, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
                    >
                        <div className="flex flex-col gap-5 w-full md:w-[55%]">
                            <Link href="/">
                                <Image className="h-8 w-auto" src="/assets/logo.svg" alt="Thumblify logo" width={130} height={34} priority />
                            </Link>
                            <p className="leading-relaxed text-gray-400">
                                Making every customer feel valued—no matter the size of your audience.
                            </p>
                        </div>

                        <div className="flex flex-col gap-5 w-full md:w-[45%]">
                            <p className="text-gray-100 font-semibold text-base">Products</p>
                            <ul className="flex flex-col gap-3.5">
                                <li><Link href="/" className="inline-flex hover:text-[#f0146b] hover:translate-x-1 transition-all duration-200">Home</Link></li>
                                <li><Link href="/#features" className="inline-flex hover:text-[#f0146b] hover:translate-x-1 transition-all duration-200">Features</Link></li>
                                <li><Link href="/#testimonials" className="inline-flex hover:text-[#f0146b] hover:translate-x-1 transition-all duration-200">Testimonials</Link></li>
                                <li><Link href="/#pricing" className="inline-flex hover:text-[#f0146b] hover:translate-x-1 transition-all duration-200">Pricing</Link></li>
                                {user && 
                                (
                                    <li><Link href="/user/generate" className="inline-flex hover:text-[#f0146b] hover:translate-x-1 transition-all duration-200">Generate Thumbnail</Link></li>
                                )}
                            </ul>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="flex flex-col md:flex-row gap-12 lg:gap-16 w-full lg:w-1/2 justify-between"
                        initial={{ x: 150, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
                    >
                        <div className="flex flex-col gap-5 w-full md:w-[45%]">
                            <p className="text-gray-100 font-semibold text-base">Contact Us</p>
                            <ul className="flex flex-col gap-4">
                                <li className="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f0146b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0 mt-0.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                    <span>Garfa 3rd Lane, Jadavpur<br/>Kolkata, West Bengal</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f0146b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                    <span>+91 99336 71072</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f0146b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                    <span>hello@thumblify.com</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-5 w-full md:w-[55%]">
                            <p className="text-gray-100 font-semibold text-base">Connect with Developer</p>
                            <p className="text-gray-400 leading-relaxed">
                                Designed and built by <span className="text-gray-200 font-medium">Sayan Indra</span>. Let's connect and build something awesome together.
                            </p>
                            
                            <div className="flex items-center gap-3 mt-1">
                                <a href="https://github.com/sayanindra83" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 border border-white/10 text-gray-400 hover:bg-[#f0146b] hover:border-[#f0146b] hover:text-white rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(240,20,107,0.5)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                                </a>
                                <a href="https://www.linkedin.com/in/sayan-indra-a41319369/" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 border border-white/10 text-gray-400 hover:bg-[#f0146b] hover:border-[#f0146b] hover:text-white rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(240,20,107,0.5)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                </a>
                                <a href="https://instagram.com/sayanindra143" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 border border-white/10 text-gray-400 hover:bg-[#f0146b] hover:border-[#f0146b] hover:text-white rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(240,20,107,0.5)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                                </a>
                                <a href="mailto:sayanindra77@gmail.com" className="p-2.5 bg-white/5 border border-white/10 text-gray-400 hover:bg-[#f0146b] hover:border-[#f0146b] hover:text-white rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(240,20,107,0.5)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div 
                    className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-white/5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <p>&copy; {new Date().getFullYear()} Thumblify. All rights reserved.</p>
                    
                    <div className="flex items-center gap-8">
                        <Link href="/" className="hover:text-[#f0146b] transition-colors">Privacy Policy</Link>
                        <Link href="/" className="hover:text-[#f0146b] transition-colors">Terms of Service</Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}