import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, name, role } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const sessionPayload = {
      id: userId,
      email: email.trim().toLowerCase(),
      name: name?.trim() || email.split('@')[0],
      role: role === 'admin' ? 'admin' : 'customer',
    };

    const res = NextResponse.json({ success: true, user: sessionPayload });
    res.cookies.set('boardedge_session', JSON.stringify(sessionPayload), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
