import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect admin routes - redirect to home if not authenticated
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Simple placeholder auth check - in production this would check Supabase session
    const isAuthenticated = false; // TODO: Implement proper Supabase auth check
    
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*'
  ]
};