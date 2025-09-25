import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  // Get the session
  const { data: { session } } = await supabase.auth.getSession();

  // Log missing env vars for debugging
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY', 
    'SUPABASE_SERVICE_ROLE_KEY',
    'ADMIN_EMAILS'
  ];
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missingVars.length > 0) {
    console.log('Missing environment variables:', missingVars);
  }

  // Protect /member/** routes - require session
  if (request.nextUrl.pathname.startsWith('/member')) {
    if (!session) {
      return NextResponse.redirect(new URL('/member/signin', request.url));
    }
  }

  // Protect /admin/** routes - require session and admin email
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Check if user email is in admin list
    const adminEmails = process.env.ADMIN_EMAILS || '';
    const adminEmailList = adminEmails.split(',').map(email => email.trim().toLowerCase());
    const userEmail = session.user?.email?.toLowerCase();

    if (!userEmail || !adminEmailList.includes(userEmail)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/member/:path*'
  ]
};