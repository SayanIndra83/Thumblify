'use client'
import ResetPassword from '@/components/ResetPassword'
import { useSearchParams } from 'next/navigation'


function page() {
    const searchParams = useSearchParams()
    const email = searchParams.get("email")
    if(!email) return null
    const decodedEmail = decodeURIComponent(email)
    console.log(decodedEmail)
  return (
    <>
    <ResetPassword email={decodedEmail}/>
    </>
  )
}

export default page
