import { NextResponse } from 'next/server';
import { getSessionUser, isUserAdmin } from '@/lib/auth/session';
import {
  getSubjects,
  getAllOrders,
  getAllEntitlements,
  getSubjectRequests,
  getContentErrorReports,
  getAdminAuditLogs,
} from '@/lib/db/store';

export async function GET() {
  const user = await getSessionUser();
  if (!isUserAdmin(user)) {
    return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 });
  }

  const subjects = await getSubjects();
  const orders = await getAllOrders();
  const entitlements = await getAllEntitlements();
  const requests = await getSubjectRequests();
  const errorReports = await getContentErrorReports();
  const auditLogs = await getAdminAuditLogs();

  const totalRevenuePaise = orders
    .filter((o) => o.status === 'captured')
    .reduce((acc, curr) => acc + curr.amount_in_paise, 0);

  return NextResponse.json({
    summary: {
      totalSubjects: subjects.length,
      publishedSubjects: subjects.filter((s) => s.status === 'published').length,
      reviewPendingSubjects: subjects.filter((s) => s.status === 'review_pending').length,
      totalOrders: orders.length,
      capturedOrders: orders.filter((o) => o.status === 'captured').length,
      totalEntitlements: entitlements.length,
      activeEntitlements: entitlements.filter((e) => e.status === 'active').length,
      totalSubjectRequests: requests.length,
      openErrorReports: errorReports.filter((r) => r.status === 'open').length,
      totalRevenuePaise,
    },
    subjects,
    orders,
    entitlements,
    requests,
    errorReports,
    auditLogs: auditLogs.slice(0, 50),
  });
}
