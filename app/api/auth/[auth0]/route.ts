import { NextRequest, NextResponse } from 'next/server';
import { getAuth0Instance, getRequestOrigin } from '@/lib/auth/auth0-config';

export async function GET(req: NextRequest, ctx: any) {
  const origin = getRequestOrigin(req);
  const auth0 = getAuth0Instance(origin);
  const route = ctx?.params?.auth0;

  try {
    if (route === 'callback') {
      const res = await (auth0.handleCallback as any)(req, ctx, {
        redirectUri: `${origin}/api/auth/callback`,
      });

      // Synchronize Auth0 session into boardedge_session cookie for seamless app access
      try {
        const session = await (auth0.getSession as any)(res);
        if (session?.user) {
          const u = session.user;
          const email = (u.email || `${u.sub}@auth0.user`).toLowerCase();
          const adminEmails = (process.env.ADMIN_EMAILS || 'founder@tinko.in,admin@blocks-and-loops.com')
            .toLowerCase()
            .split(',')
            .map((e) => e.trim());
          const isAdmin = adminEmails.includes(email) || email === 'sadish@loopedu.in';

          const sessionPayload = {
            id: u.sub,
            email,
            name: u.name || u.nickname || (isAdmin ? 'Admin' : 'Student'),
            role: isAdmin ? 'admin' : 'customer',
            isPro: isAdmin,
          };

          res.cookies.set('boardedge_session', JSON.stringify(sessionPayload), {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30, // 30 days
          });
          res.cookies.delete('boardedge_demo_role');
        }
      } catch (sessionSyncErr) {
        console.error('Session sync error on Auth0 callback:', sessionSyncErr);
      }

      return res;
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
    const causeMessage = err?.cause?.message || err?.message;

    console.error('Auth0 callback error details:', {
      message: err?.message,
      cause: causeMessage,
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
    const finalDescription =
      errorDesc ||
      causeMessage ||
      (errorParam ? `Auth0 error: ${errorParam}` : 'Authentication could not be completed.');
    loginUrl.searchParams.set('error_description', finalDescription);
    loginUrl.searchParams.set('error', 'auth_failed');
    return NextResponse.redirect(loginUrl);
  }
}
