import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser, isUserAdmin } from '@/lib/auth/session';
import { getSubjectRequests } from '@/lib/db/store';
import { sanitizeCsvField } from '@/lib/utils';

export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!isUserAdmin(user)) {
    return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const format = searchParams.get('format');
  const requests = await getSubjectRequests();

  if (format === 'csv') {
    // Generate safe CSV protected against CSV / formula injection
    const headers = ['Request ID', 'Class', 'Subject', 'Notes', 'Email', 'Consent to Notify', 'Date'];
    const rows = requests.map((r) => [
      sanitizeCsvField(r.id),
      sanitizeCsvField(r.class_name),
      sanitizeCsvField(r.subject_name),
      sanitizeCsvField(r.notes || ''),
      sanitizeCsvField(r.email || ''),
      sanitizeCsvField(r.consent_notify ? 'Yes' : 'No'),
      sanitizeCsvField(r.created_at),
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="boardedge_subject_requests_${Date.now()}.csv"`,
      },
    });
  }

  return NextResponse.json({ requests });
}
