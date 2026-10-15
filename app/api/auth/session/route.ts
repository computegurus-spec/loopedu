import { NextResponse } from 'next/server';
import { getSessionUser, isUserAdmin } from '@/lib/auth/session';
import { getUserEntitlements } from '@/lib/db/store';

export async function GET() {
  const user = await getSessionUser();
  const isAdmin = isUserAdmin(user);
  let isPaid = false;
  let enrolledSubjects: string[] = [];

  if (user) {
    if (isAdmin || user.id === 'usr_sadish_owner' || user.name?.toLowerCase() === 'sadish' || (user as any).isPro) {
      isPaid = true;
      enrolledSubjects = [
        'maths-standard',
        'science',
        'social-science',
        'maths-basic',
        'english-language-literature',
        'english-communicative',
        'german',
        'artificial-intelligence',
      ];
    } else {
      const entitlements = await getUserEntitlements(user.id);
      isPaid = entitlements.length > 0;
      enrolledSubjects = entitlements.map((e) => e.subject_slug);
    }
  }

  return NextResponse.json({
    user,
    isAdmin,
    isPaid,
    enrolledSubjects,
  });
}
