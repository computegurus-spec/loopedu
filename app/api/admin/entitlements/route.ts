import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser, isUserAdmin } from '@/lib/auth/session';
import { grantManualEntitlement, revokeEntitlement } from '@/lib/db/store';
import { SubjectSlug } from '@/types';

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!isUserAdmin(user)) {
    return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 });
  }

  try {
    const { action, userId, userEmail, subjectSlug, durationDays, reason } = await req.json();

    if (action === 'grant') {
      if (!userId || !subjectSlug) {
        return NextResponse.json({ error: 'Missing userId or subjectSlug' }, { status: 400 });
      }

      const entitlement = await grantManualEntitlement({
        userId,
        userEmail: userEmail || `${userId}@manual-grant.com`,
        subjectSlug: subjectSlug as SubjectSlug,
        durationDays: Number(durationDays) || 365,
        adminEmail: user!.email,
        reason: reason || 'Manual administrative grant',
      });

      return NextResponse.json({ success: true, entitlement });
    }

    if (action === 'revoke') {
      if (!userId || !subjectSlug || !reason) {
        return NextResponse.json({ error: 'Missing userId, subjectSlug, or reason' }, { status: 400 });
      }

      await revokeEntitlement(userId, subjectSlug as SubjectSlug, reason, user!.email);
      return NextResponse.json({ success: true, revoked: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
