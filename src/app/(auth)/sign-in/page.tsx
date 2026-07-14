'use client'
import LoginForm from "@/components/LoginPage"
import { useSearchParams } from "next/navigation"

function page() {
  const searchParams = useSearchParams()
  let callbackUrl = searchParams.get('callbackUrl')
  if(callbackUrl) callbackUrl = decodeURIComponent(callbackUrl)
  if(!callbackUrl) callbackUrl = '/'
  return (
    <>
    <LoginForm callbackUrl = {callbackUrl}/>
    </>
  )
}

export default page
