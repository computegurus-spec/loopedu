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
    const errorParam = req.nextUrl.searchParams.get('error');
    const errorDesc = req.nextUrl.searchParams.get('error_description');
    console.error('Auth0 callback error details:', {
      message: err?.message,
      cause: err?.cause?.message || err?.cause,
      errorParam,
      errorDesc,
    });

    // If active session exists, proceed to /learn
    try {
      const session = await (auth0.getSession as any)();
      if (session?.user) {
        return NextResponse.redirect(new URL('/learn', origin));
      }
    } catch {
      // ignore
    }

    const loginUrl = new URL('/login', origin);
    if (errorDesc) {
      loginUrl.searchParams.set('error_description', errorDesc);
    } else {
      loginUrl.searchParams.set('error', 'auth_failed');
    }
    return NextResponse.redirect(loginUrl);
  }
}
