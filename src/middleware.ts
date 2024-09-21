// middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = "4b2c8e7d8a3f5e0a2f6e8d4c5b7a9e6c0f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = await getToken({ req: request, secret });

    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        if (token) {
            // Redirect authenticated users away from login/register
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    } else if (pathname.startsWith('/dashboard') || pathname.startsWith('/profile')) {
        if (!token) {
            // Redirect unauthenticated users to login
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/register', '/dashboard/:path*', '/profile/:path*'],
};
