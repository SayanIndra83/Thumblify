import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisScroll from "@/components/LenisScroll";
import AuthProvider from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
export const metadata: Metadata = {
  title: "Thumblify - AI Thumbnail Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <head>
        <link rel="preload" href="/assets/background-splash.svg" as="image" />
      </head>
      <body>
        <Toaster position="bottom-right" />
        <LenisScroll />
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
