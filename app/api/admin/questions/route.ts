import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser, isUserAdmin } from '@/lib/auth/session';
import { updateQuestion, toggleSampleQuestion, getQuestionVersions, getQuestion } from '@/lib/db/store';

export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!isUserAdmin(user)) {
    return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const questionId = searchParams.get('id');

  if (!questionId) {
    return NextResponse.json({ error: 'Question ID required' }, { status: 400 });
  }

  const question = await getQuestion(questionId);
  const versions = await getQuestionVersions(questionId);

  return NextResponse.json({ question, versions });
}

export async function PATCH(req: NextRequest) {
  const user = await getSessionUser();
  if (!isUserAdmin(user)) {
    return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 });
  }

  try {
    const { id, updates, changeReason, toggleSample, isSample } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Question ID is required' }, { status: 400 });
    }

    if (toggleSample !== undefined) {
      await toggleSampleQuestion(id, Boolean(isSample), user!.email);
      return NextResponse.json({ success: true, is_sample: isSample });
    }

    if (!updates || !changeReason) {
      return NextResponse.json(
        { error: 'Updates object and changeReason are required for auditing.' },
        { status: 400 }
      );
    }

    const updated = await updateQuestion(id, updates, user!.email, changeReason);
    return NextResponse.json({ success: true, question: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
