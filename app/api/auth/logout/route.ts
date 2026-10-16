import { NextRequest, NextResponse } from 'next/server';
import { getAuth0Instance, getRequestOrigin } from '@/lib/auth/auth0-config';

export async function GET(req: NextRequest) {
  const origin = getRequestOrigin(req);
  try {
    const auth0 = getAuth0Instance(origin);
    const res = await (auth0.handleLogout as any)(req, { params: { auth0: 'logout' } }, { returnTo: `${origin}/` });
    if (res && res.cookies) {
      res.cookies.delete('boardedge_session');
      res.cookies.delete('boardedge_demo_role');
      res.cookies.delete('appSession');
    }
    return res;
  } catch {
    const res = NextResponse.redirect(new URL('/', origin));
    res.cookies.delete('boardedge_session');
    res.cookies.delete('boardedge_demo_role');
    res.cookies.delete('appSession');
    return res;
  }
}

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete('boardedge_session');
  res.cookies.delete('boardedge_demo_role');
  res.cookies.delete('appSession');
  return res;
}
