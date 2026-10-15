import { NextRequest, NextResponse } from 'next/server';
import { recordSubjectRequest } from '@/lib/db/store';

export async function POST(req: NextRequest) {
  try {
    const { className, subjectName, notes, email, consentNotify } = await req.json();

    if (!className || typeof className !== 'string' || !className.trim()) {
      return NextResponse.json({ error: 'Class is required.' }, { status: 400 });
    }

    if (!subjectName || typeof subjectName !== 'string' || !subjectName.trim()) {
      return NextResponse.json({ error: 'Subject name is required.' }, { status: 400 });
    }

    if (consentNotify && (!email || !email.includes('@'))) {
      return NextResponse.json(
        { error: 'A valid email address is required if you check the notification consent.' },
        { status: 400 }
      );
    }

    const record = await recordSubjectRequest({
      className,
      subjectName,
      notes,
      email,
      consentNotify: Boolean(consentNotify),
    });

    return NextResponse.json({ success: true, record });
  } catch (err: any) {
    console.error('[API Subject Request Error]', err);
    return NextResponse.json({ error: err.message || 'Failed to submit request.' }, { status: 500 });
  }
}
