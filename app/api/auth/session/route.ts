import { NextResponse } from 'next/server';
import { getSessionUser, isUserAdmin } from '@/lib/auth/session';

export async function GET() {
  const user = await getSessionUser();
  return NextResponse.json({
    user,
    isAdmin: isUserAdmin(user),
  });
}
