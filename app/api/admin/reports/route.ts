import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser, isUserAdmin } from '@/lib/auth/session';
import { updateErrorReportStatus } from '@/lib/db/store';
import { ContentErrorReport } from '@/types';

export async function PATCH(req: NextRequest) {
  const user = await getSessionUser();
  if (!isUserAdmin(user)) {
    return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 });
  }

  try {
    const { reportId, status, adminNotes } = await req.json();

    if (!reportId || !status) {
      return NextResponse.json({ error: 'reportId and status are required' }, { status: 400 });
    }

    const updated = await updateErrorReportStatus(
      reportId,
      status as ContentErrorReport['status'],
      adminNotes || '',
      user!.email
    );

    return NextResponse.json({ success: true, report: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
