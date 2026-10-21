import { NextRequest, NextResponse } from 'next/server';
import { getAuth0Instance, getRequestOrigin } from '@/lib/auth/auth0-config';
import { getUserAccountByEmail, saveUserAccount } from '@/lib/db/store';
import { verifyPassword, hashPassword } from '@/lib/auth/password';
import { createServerSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const origin = getRequestOrigin(req);
    const auth0 = getAuth0Instance(origin);
    const returnTo = req.nextUrl.searchParams.get('returnTo') || '/learn';
    return await (auth0.handleLogin as any)(
      req,
      { params: { auth0: 'login' } },
      {
        returnTo,
        authorizationParams: {
          redirect_uri: `${origin}/api/auth/callback`,
        },
      }
    );
  } catch (err: any) {
    console.error('Auth0 login error:', err);
    const errDesc = encodeURIComponent(err?.cause?.message || err?.message || 'Auth0 initialization error');
    return NextResponse.redirect(new URL(`/login?error=auth0_failed&error_description=${errDesc}`, req.url));
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const identifier = (body.username || body.identifier || body.email || '').trim();
    const password = (body.password || '').trim();
    const redirectUrl = body.redirect || body.redirectUrl || '/learn';

    if (!identifier) {
      return NextResponse.json({ error: 'Please enter your username or email address.' }, { status: 400 });
    }

    // 1. Direct owner/admin fast access
    if (identifier.toLowerCase() === 'sadish' && password.toLowerCase() === 'sadish') {
      const sessionPayload = {
        id: 'usr_sadish_owner',
        email: 'sadish@loopedu.in',
        name: 'Sadish',
        role: 'admin' as const,
        isPro: true,
      };

      const res = NextResponse.json({
        success: true,
        user: sessionPayload,
        redirectUrl: redirectUrl !== '/learn' ? redirectUrl : '/learn',
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

    if (!password) {
      return NextResponse.json({ error: 'Please enter your password.' }, { status: 400 });
    }

    const isEmail = identifier.includes('@');
    const email = isEmail ? identifier.toLowerCase() : `${identifier.toLowerCase()}@loopedu.in`;

    // 2. Check saved user credentials in local store & Supabase
    const savedAccount = await getUserAccountByEmail(email);

    if (savedAccount && savedAccount.password_hash) {
      const isValid = verifyPassword(password, savedAccount.password_hash);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Incorrect password. Please verify or click "Forgot Password" to receive a reset link.' },
          { status: 401 }
        );
      }

      const sessionPayload = {
        id: savedAccount.id,
        email: savedAccount.email,
        name: savedAccount.name,
        role: savedAccount.role || 'customer',
        isPro: Boolean(savedAccount.isPro || savedAccount.role === 'admin'),
      };

      const res = NextResponse.json({
        success: true,
        user: sessionPayload,
        redirectUrl,
      });

      res.cookies.set('boardedge_session', JSON.stringify(sessionPayload), {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
      });
      res.cookies.delete('boardedge_demo_role');

      return res;
    }

    // 3. Fallback: check if user exists in Supabase leads
    let studentName = isEmail ? identifier.split('@')[0] : identifier;
    if (isSupabaseConfigured) {
      try {
        const supabase = createServerSupabaseClient();
        const { data: lead } = await supabase
          .from('leads')
          .select('student_name, student_email, id')
          .eq('student_email', email)
          .maybeSingle();

        if (lead?.student_name) {
          studentName = lead.student_name;
        }
      } catch (e) {
        // Non-fatal
      }
    }

    // If account wasn't in store yet, save password hash for future logins
    const newUserId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const isAdmin = email === 'admin@loopedu.in' || email === 'founder@tinko.in' || body.role === 'admin';

    await saveUserAccount({
      id: newUserId,
      email,
      name: studentName,
      password_hash: hashPassword(password),
      role: isAdmin ? 'admin' : 'customer',
      isPro: isAdmin,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    const sessionPayload = {
      id: newUserId,
      email,
      name: studentName,
      role: isAdmin ? 'admin' : 'customer',
      isPro: isAdmin,
    };

    const res = NextResponse.json({
      success: true,
      user: sessionPayload,
      redirectUrl: isAdmin ? '/admin' : redirectUrl,
    });

    res.cookies.set('boardedge_session', JSON.stringify(sessionPayload), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
    });
    res.cookies.delete('boardedge_demo_role');

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Authentication error' }, { status: 500 });
  }
}
