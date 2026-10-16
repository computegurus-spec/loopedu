import { NextRequest, NextResponse } from 'next/server';
import { handleLogout } from '@auth0/nextjs-auth0';
import { ensureAuth0Config } from '@/lib/auth/auth0-config';

export async function GET(req: NextRequest) {
  try {
    ensureAuth0Config(req);
    const res = await (handleLogout as any)(req, { params: { auth0: 'logout' } }, { returnTo: '/' });
    if (res && res.cookies) {
      res.cookies.delete('boardedge_session');
      res.cookies.delete('boardedge_demo_role');
      res.cookies.delete('appSession');
    }
    return res;
  } catch {
    const res = NextResponse.redirect(new URL('/', req.url));
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
