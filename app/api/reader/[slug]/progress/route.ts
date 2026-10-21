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

function getUserIdOrGuest(req: NextRequest, user: any): { userId: string; isNewGuest: boolean; guestId: string } {
  if (user?.id) {
    return { userId: user.id, isNewGuest: false, guestId: user.id };
  }
  const existingGuest = req.cookies.get('boardedge_guest_id')?.value;
  if (existingGuest) {
    return { userId: existingGuest, isNewGuest: false, guestId: existingGuest };
  }
  const leadPhone = req.cookies.get('loopedu_lead_phone')?.value;
  if (leadPhone) {
    const id = `lead_${leadPhone.replace(/\D/g, '')}`;
    return { userId: id, isNewGuest: true, guestId: id };
  }
  const newGuestId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  return { userId: newGuestId, isNewGuest: true, guestId: newGuestId };
}

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await getSessionUser();
    const { userId, isNewGuest, guestId } = getUserIdOrGuest(req, user);

    const slug = params.slug as SubjectSlug;
    const studyState = await getUserStudyState(userId, slug);

    const res = NextResponse.json({
      success: true,
      studyState,
      userId,
      isGuest: !user,
    });

    if (isNewGuest) {
      res.cookies.set('boardedge_guest_id', guestId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax',
      });
    }

    return res;
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
    const { userId, isNewGuest, guestId } = getUserIdOrGuest(req, user);

    const slug = params.slug as SubjectSlug;
    const { action, questionId } = await req.json();

    if (!questionId) {
      return NextResponse.json({ error: 'questionId is required' }, { status: 400 });
    }

    let responsePayload: any = { success: true };

    if (action === 'toggle_attempt') {
      const state = await toggleAttempted(userId, questionId, slug);
      responsePayload.attempted = state;
    } else if (action === 'toggle_revisit') {
      const state = await toggleNeedsRevisit(userId, questionId, slug);
      responsePayload.needsRevisit = state;
    } else if (action === 'toggle_bookmark') {
      const state = await toggleBookmark(userId, questionId);
      responsePayload.bookmarked = state;
    } else if (action === 'set_last_studied') {
      await setLastStudied(userId, slug, questionId);
    } else {
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }

    const res = NextResponse.json(responsePayload);
    if (isNewGuest) {
      res.cookies.set('boardedge_guest_id', guestId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      });
    }

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
