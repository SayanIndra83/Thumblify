'use client'
import LoginForm from "@/components/LoginPage"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"


function SignInContent () {
  const searchParams = useSearchParams()
  let callbackUrl = searchParams.get('callbackUrl')
  if(callbackUrl) callbackUrl = decodeURIComponent(callbackUrl)
  if(!callbackUrl) callbackUrl = '/'
  return (
    <LoginForm callbackUrl = {callbackUrl}/>
  )
}
function page() {
  return (
      <Suspense fallback={<div className="flex justify-center p-10 text-zinc-400">Loading...</div>}>
          <SignInContent />
      </Suspense>
  )
}

export default page
