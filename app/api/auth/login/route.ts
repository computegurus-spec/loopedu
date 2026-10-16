import { NextRequest, NextResponse } from 'next/server';
import { getAuth0Instance, getRequestOrigin } from '@/lib/auth/auth0-config';

export async function GET(req: NextRequest) {
  try {
    const origin = getRequestOrigin(req);
    const auth0 = getAuth0Instance(origin);
    return await (auth0.handleLogin as any)(
      req,
      { params: { auth0: 'login' } },
      {
        returnTo: '/learn',
        authorizationParams: {
          redirect_uri: `${origin}/api/auth/callback`,
        },
      }
    );
  } catch (err: any) {
    console.error('Auth0 login error:', err);
    return NextResponse.redirect(new URL('/login?error=auth0_failed', req.url));
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const identifier = (body.username || body.identifier || body.email || '').trim();
    const password = (body.password || '').trim();

    if (!identifier) {
      return NextResponse.json({ error: 'Please enter your username or email address.' }, { status: 400 });
    }

    // 1. Direct developer/owner credentials (username: Sadish, password: Sadish)
    if (identifier.toLowerCase() === 'sadish' && password.toLowerCase() === 'sadish') {
      const sessionPayload = {
        id: 'usr_sadish_owner',
        email: 'sadish@loopedu.in',
        name: 'Sadish',
        role: 'admin',
        isPro: true,
      };

      const res = NextResponse.json({
        success: true,
        user: sessionPayload,
        redirectUrl: '/learn',
      });

      res.cookies.set('boardedge_session', JSON.stringify(sessionPayload), {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      res.cookies.delete('boardedge_demo_role');

      return res;
    }

    // 2. Standard authentication
    const isEmail = identifier.includes('@');
    const email = isEmail ? identifier.toLowerCase() : `${identifier.toLowerCase()}@loopedu.in`;
    const name = body.name?.trim() || (isEmail ? identifier.split('@')[0] : identifier);
    const isAdmin = email === 'admin@loopedu.in' || email === 'founder@tinko.in' || body.role === 'admin';

    const sessionPayload = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email,
      name,
      role: isAdmin ? 'admin' : 'customer',
      isPro: isAdmin,
    };

    const res = NextResponse.json({
      success: true,
      user: sessionPayload,
      redirectUrl: isAdmin ? '/admin' : '/learn',
    });

    res.cookies.set('boardedge_session', JSON.stringify(sessionPayload), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    res.cookies.delete('boardedge_demo_role');

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Authentication error' }, { status: 500 });
  }
}
