'use client'

import { Suspense } from 'react'
import ResetPassword from '@/components/ResetPassword'
import { useSearchParams } from 'next/navigation'

function ResetPasswordContent() {
    const searchParams = useSearchParams()
    const email = searchParams?.get("email")
    
    if(!email) return null
    const decodedEmail = decodeURIComponent(email)
    
    return <ResetPassword email={decodedEmail}/>
}

export default function Page() {
  return (
    <Suspense fallback={<div className="flex justify-center p-10 text-zinc-400">Loading...</div>}>
        <ResetPasswordContent />
    </Suspense>
  )
}