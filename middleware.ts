/**
 * Protects /dashboard: uses Neon Auth (base) when configured, else Supabase.
 * Redirects to /login when unauthenticated.
 */

import { type NextRequest, NextResponse } from 'next/server';

const dashboardPrefix = '/dashboard';

function isDashboard(pathname: string) {
  return pathname === dashboardPrefix || pathname.startsWith(dashboardPrefix + '/');
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  try {
    const baseUrl = process.env.NEON_AUTH_BASE_URL;
    const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;
    const neonConfigured = !!(baseUrl && cookieSecret);

    if (neonConfigured) {
      const { getSessionCookie } = await import('better-auth/cookies');
      const sessionCookie = getSessionCookie(request);
      if (isDashboard(pathname) && !sessionCookie) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('next', pathname);
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.next({ request });
    }

    const { updateSession } = await import('@/lib/supabase/middleware');
    const { response, user } = await updateSession(request);
    if (isDashboard(pathname) && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && !user) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return response;
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[middleware]', err);
    }
    return NextResponse.next({ request });
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|admin|api).*)',
  ],
};
