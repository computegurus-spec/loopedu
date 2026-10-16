import { NextRequest, NextResponse } from 'next/server';
import { getAuth0Instance, getRequestOrigin } from '@/lib/auth/auth0-config';

export async function GET(req: NextRequest, ctx: any) {
  const origin = getRequestOrigin(req);
  const auth0 = getAuth0Instance(origin);
  const route = ctx?.params?.auth0;

  try {
    if (route === 'callback') {
      return await (auth0.handleCallback as any)(req, ctx, {
        redirectUri: `${origin}/api/auth/callback`,
      });
    }

    if (route === 'logout') {
      return await (auth0.handleLogout as any)(req, ctx, {
        returnTo: `${origin}/`,
      });
    }

    return await (auth0.handleAuth() as any)(req, ctx);
  } catch (err: any) {
    console.error('Auth0 route error caught gracefully:', err?.message || err);

    // If callback fails (e.g. code expired, state already consumed, or user refreshed callback URL),
    // redirect smoothly to /learn if session is already active, or back to /login without 500 error
    try {
      const session = await (auth0.getSession as any)();
      if (session?.user) {
        return NextResponse.redirect(new URL('/learn', origin));
      }
    } catch {
      // ignore
    }

    return NextResponse.redirect(new URL('/login?error=auth_failed', origin));
  }
}
