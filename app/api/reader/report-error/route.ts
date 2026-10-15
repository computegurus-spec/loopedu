import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth/session';
import { recordContentErrorReport } from '@/lib/db/store';
import { SubjectSlug } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    const { questionId, subjectSlug, reportType, description } = await req.json();

    if (!questionId || !subjectSlug || !description) {
      return NextResponse.json({ error: 'Missing required report fields' }, { status: 400 });
    }

    const report = await recordContentErrorReport({
      userId: user?.id || 'anonymous_reader',
      userEmail: user?.email || 'reader@blocks-and-loops.com',
      questionId,
      subjectSlug: subjectSlug as SubjectSlug,
      reportType: reportType || 'other',
      description,
    });

    return NextResponse.json({ success: true, report });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
