import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/api/auth/login"]

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Check for session cookie
  const sessionCookie = request.cookies.get("session")

  if (!sessionCookie) {
    // Redirect to login if no session
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    // Validate session token (basic validation)
    const sessionData = JSON.parse(Buffer.from(sessionCookie.value, "base64").toString())

    // Check if session is expired (7 days)
    const sessionAge = Date.now() - sessionData.timestamp
    const maxAge = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

    if (sessionAge > maxAge) {
      // Session expired, redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.set("session", "", { maxAge: 0 })
      return response
    }

    return NextResponse.next()
  } catch (error) {
    // Invalid session, redirect to login
    const response = NextResponse.redirect(new URL("/login", request.url))
    response.cookies.set("session", "", { maxAge: 0 })
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|login).*)",
  ],
}
