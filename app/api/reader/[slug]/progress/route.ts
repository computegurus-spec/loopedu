import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth/session';
import {
  getUserStudyState,
  toggleAttempted,
  toggleNeedsRevisit,
  toggleBookmark,
  setLastStudied,
} from '@/lib/db/store';
import { SubjectSlug } from '@/types';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const slug = params.slug as SubjectSlug;
    const studyState = await getUserStudyState(user.id, slug);

    return NextResponse.json({
      success: true,
      studyState,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const slug = params.slug as SubjectSlug;
    const { action, questionId } = await req.json();

    if (!questionId) {
      return NextResponse.json({ error: 'questionId is required' }, { status: 400 });
    }

    if (action === 'toggle_attempt') {
      const state = await toggleAttempted(user.id, questionId, slug);
      return NextResponse.json({ success: true, attempted: state });
    }

    if (action === 'toggle_revisit') {
      const state = await toggleNeedsRevisit(user.id, questionId, slug);
      return NextResponse.json({ success: true, needsRevisit: state });
    }

    if (action === 'toggle_bookmark') {
      const state = await toggleBookmark(user.id, questionId);
      return NextResponse.json({ success: true, bookmarked: state });
    }

    if (action === 'set_last_studied') {
      await setLastStudied(user.id, slug, questionId);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
