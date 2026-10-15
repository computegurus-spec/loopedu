import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser, isUserAdmin } from '@/lib/auth/session';
import { updateSubject } from '@/lib/db/store';
import { SubjectSlug } from '@/types';

export async function PATCH(req: NextRequest) {
  const user = await getSessionUser();
  if (!isUserAdmin(user)) {
    return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 });
  }

  try {
    const { slug, status, reviewNotes, editorialReviewStatus, rightsReviewStatus } = await req.json();

    if (!slug) {
      return NextResponse.json({ error: 'Subject slug is required' }, { status: 400 });
    }

    const updated = await updateSubject(
      slug as SubjectSlug,
      {
        ...(status && { status }),
        ...(reviewNotes !== undefined && { reviewNotes }),
        ...(editorialReviewStatus && { editorialReviewStatus }),
        ...(rightsReviewStatus && { rightsReviewStatus }),
      },
      user!.email
    );

    return NextResponse.json({ success: true, subject: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
