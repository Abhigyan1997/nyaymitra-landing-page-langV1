import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })

    const { pathname } = request.nextUrl

    // Protected routes
    const protectedRoutes = [
        "/dashboard",
        // "/services/downloads",
        // "/notary",
        // "/ai-affidavit",
        // "/booking",
        // "/store",
        // "/ai-pdf"
    ]

    // Auth routes
    const authRoutes = ["/auth/login", "/auth/register"]

    // If trying to access protected route without token
    if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    // If logged in but trying to access auth route
    if (authRoutes.includes(pathname) && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/services/:path*",
        "/notary/:path*",
        "/ai-affidavit/:path*",
        "/booking/:path*",
        "/store/:path*",
        "/ai-pdf/:path*",
        "/auth/:path*"
    ],
}