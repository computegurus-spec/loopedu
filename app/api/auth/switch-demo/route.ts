import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { role } = await req.json();
    const validRoles = ['student', 'parent', 'admin'];

    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: 'Invalid demo role' }, { status: 400 });
    }

    const res = NextResponse.json({ success: true, role });
    res.cookies.set('boardedge_demo_role', role, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
