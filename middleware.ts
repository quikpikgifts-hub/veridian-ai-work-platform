/**
 * middleware.ts — Next.js Edge Middleware
 *
 * Handles session refresh, authentication, and RBAC route protection.
 * PUBLIC routes:  /, /login, /consultation
 * PUBLIC API:     /api/consultation, /api/health, /api/audit
 * PROTECTED:      everything else — requires valid Supabase session + role permission
 *
 * Demo / dev mode: when Supabase env vars are absent or placeholder values,
 * ALL routes are open and no redirect occurs.
 *
 * NOTE: proxy.ts is retained for reference only — this file is the active middleware.
 */
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { canAccessRoute } from '@/lib/rbac';

/* ── Public paths — never require auth ──────────────────────── */
const PUBLIC_PATHS = new Set(['/', '/login', '/consultation']);
const PUBLIC_API_PREFIXES = ['/api/health', '/api/consultation', '/api/audit'];

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) return true;
  if (PUBLIC_API_PREFIXES.some(p => pathname.startsWith(p))) return true;
  if (pathname.startsWith('/_next/')) return true;
  if (pathname.startsWith('/static/')) return true;
  if (/\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|txt|xml)$/i.test(pathname)) return true;
  return false;
}

/* ── Placeholder detection ───────────────────────────────────── */
// Catches values that are set but are still template / example strings.
function isPlaceholder(val: string | undefined | null): boolean {
  if (!val || val.trim() === '') return true;
  if (val.includes('your-project-ref')) return true; // example Supabase URL
  if (val.trimEnd().endsWith('...')) return true;    // truncated JWT / key
  return false;
}

/* ── Middleware ──────────────────────────────────────────────── */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Always allow public routes — skip auth entirely
  if (isPublicPath(pathname)) {
    return NextResponse.next({ request });
  }

  const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 2. Demo / dev mode — Supabase not configured or still placeholder
  //    Pass ALL requests through. No auth check, no redirect.
  if (isPlaceholder(supabaseUrl) || isPlaceholder(supabaseAnon)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[middleware] Demo mode active — all routes open (Supabase not configured).');
    }
    return NextResponse.next({ request });
  }

  // 3. Real Supabase configured — enforce authentication
  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl!, supabaseAnon!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, {
            ...options,
            httpOnly: true,
            secure:   process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path:     '/',
          })
        );
      },
    },
  });

  // 4. Get user — wrapped in try/catch so a Supabase network error
  //    never locks out the entire platform in development.
  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (err) {
    console.error('[middleware] Supabase getUser() threw — treating as unauthenticated:', err);
    // In production always enforce; in dev pass through so devs aren't blocked
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[middleware] Dev mode: passing request through despite auth error.');
      return NextResponse.next({ request });
    }
  }

  // 5. Not authenticated → redirect to login
  if (!user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = (user.user_metadata?.role as string) ?? 'viewer';

  // 6. RBAC — authenticated but wrong role → redirect to dashboard with error
  if (!canAccessRoute(role, pathname)) {
    console.warn(`[middleware] RBAC denied: role=${role} path=${pathname}`);
    const dashUrl = new URL('/dashboard', request.url);
    dashUrl.searchParams.set('error', 'unauthorized');
    return NextResponse.redirect(dashUrl);
  }

  // 7. Authorised — forward identity headers to server components
  response.headers.set('x-user-id',    user.id);
  response.headers.set('x-user-email', user.email ?? '');
  response.headers.set('x-user-role',  role);

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
