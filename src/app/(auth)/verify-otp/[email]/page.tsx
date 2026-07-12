'use client'

import VerifyOtp from "@/components/VerifyOtp"
import { useParams } from "next/navigation"

function page() {
    const params = useParams<{email:string}>()
    const email = decodeURIComponent(params.email)
    // console.log(email)
  return (
    <>
    <VerifyOtp email={email}/>
    </>

  )
}

export default page
