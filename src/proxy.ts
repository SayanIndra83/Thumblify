import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './app/auth'
 
export async function proxy(request: NextRequest) {

  const session = await auth()
  const requestUrl = request.url
  const {pathname} = request.nextUrl
  const isUrlPrivate = pathname.startsWith('/user')
  if((!session || !session.user) && isUrlPrivate) {
    // send to signin
    const newUrl = new URL('/sign-in', requestUrl)
    // get back to the request url
    newUrl.searchParams.set('callbackUrl', requestUrl)
    return NextResponse.redirect(newUrl)
  }

  return NextResponse.next()
}
 

 
export const config = {
  matcher: ['/user/:path*', '/']
}