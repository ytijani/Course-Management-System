import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');

  // Define paths that don't require authentication
  const publicPaths = ['/sign-in', '/sign-up', '/','/search','/mycourses'];

  // Check if the user is trying to access a protected route
  if (!token && !publicPaths.includes(request.nextUrl.pathname)) {
    // If not logged in and trying to access a protected route, redirect to sign-in
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // If logged in, and trying to access sign-in or register, redirect to home
  if (token && publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Specify the paths that should be handled by this middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Exclude API routes and static files
};
