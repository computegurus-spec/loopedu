import crypto from 'crypto';

export interface ConsentRecord {
  id: string;
  userId: string;
  consentType: 'terms_of_service' | 'privacy_policy' | 'daily_briefing' | 'guardian_consent_minor';
  status: 'granted' | 'withdrawn';
  grantedAt: string;
  withdrawnAt?: string;
  ipAddressHash: string; // Hashed, not raw IP
  version: string;
}

export interface GuardianLink {
  id: string;
  studentId: string;
  guardianId: string;
  guardianEmail: string;
  status: 'pending' | 'verified' | 'revoked';
  permissions: {
    viewStudyPlans: boolean;
    viewPracticeProgress: boolean;
    viewMindCoachConversations: false; // Invariant: ALWAYS FALSE (strictly private)
  };
  createdAt: string;
  verifiedAt?: string;
}

export interface AccountDeletionRequest {
  id: string;
  userId: string;
  requestedAt: string;
  status: 'pending' | 'processed';
  scheduledPurgeDate: string;
  auditTombstoneHash: string;
}

// In-memory privacy ledgers for dev/demo mode
const consentStore = new Map<string, ConsentRecord[]>();
const guardianLinks = new Map<string, GuardianLink[]>();
const deletionRequests = new Map<string, AccountDeletionRequest>();

/**
 * Record a user consent grant or withdrawal
 */
export function recordConsent(
  userId: string,
  type: ConsentRecord['consentType'],
  status: 'granted' | 'withdrawn',
  version: string = '2026.1'
): ConsentRecord {
  const ipHash = crypto.createHash('sha256').update(`client_salt_${Date.now()}`).digest('hex').substring(0, 16);
  const record: ConsentRecord = {
    id: `cst_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    userId,
    consentType: type,
    status,
    grantedAt: status === 'granted' ? new Date().toISOString() : '',
    withdrawnAt: status === 'withdrawn' ? new Date().toISOString() : undefined,
    ipAddressHash: ipHash,
    version,
  };

  const userConsents = consentStore.get(userId) || [];
  userConsents.push(record);
  consentStore.set(userId, userConsents);
  return record;
}

/**
 * Get all consent history for a user
 */
export function getUserConsents(userId: string): ConsentRecord[] {
  return consentStore.get(userId) || [];
}

/**
 * Link guardian with scoped permissions (strictly wellness-isolated)
 */
export function inviteGuardian(studentId: string, guardianEmail: string): GuardianLink {
  const link: GuardianLink = {
    id: `glink_${Date.now()}`,
    studentId,
    guardianId: `usr_parent_${Date.now()}`,
    guardianEmail,
    status: 'pending',
    permissions: {
      viewStudyPlans: true,
      viewPracticeProgress: true,
      viewMindCoachConversations: false, // Mandatory invariant: cannot be granted
    },
    createdAt: new Date().toISOString(),
  };

  const existing = guardianLinks.get(studentId) || [];
  existing.push(link);
  guardianLinks.set(studentId, existing);
  return link;
}

/**
 * Revoke guardian access
 */
export function revokeGuardianAccess(studentId: string, linkId: string): boolean {
  const links = guardianLinks.get(studentId) || [];
  const target = links.find((l) => l.id === linkId);
  if (target) {
    target.status = 'revoked';
    return true;
  }
  return false;
}

/**
 * Escape spreadsheet formula injection (CWE-1236)
 */
export function sanitizeCsvField(value: any): string {
  let str = String(value ?? '');
  const dangerousPrefixes = ['=', '+', '-', '@', '\t', '\r'];
  if (dangerousPrefixes.some((p) => str.startsWith(p))) {
    str = "'" + str;
  }
  return `"${str.replace(/"/g, '""')}"`;
}

/**
 * Generate sanitized personal data export package (JSON & CSV)
 */
export function generateUserDataExport(
  userId: string,
  userProfile: any,
  studyTasks: any[],
  mistakeRecords: any[]
): { json: string; csv: string } {
  // 1. JSON export (complete and structured)
  const jsonData = {
    exportedAt: new Date().toISOString(),
    userId,
    profile: {
      name: userProfile.name,
      stage: userProfile.stage,
      targetExams: userProfile.targetExams,
      subjects: userProfile.subjects,
    },
    studyTasks,
    mistakeRecords,
    consents: getUserConsents(userId),
    notice: 'Mind Coach raw reflection entries are private and excluded from exports for student safeguarding.',
  };

  // 2. CSV export with sanitized formula prefixes
  const csvHeaders = ['RecordType', 'Identifier', 'TitleOrDescription', 'StatusOrStage', 'Timestamp'];
  const csvRows: string[][] = [csvHeaders];

  // Profile row
  csvRows.push([
    sanitizeCsvField('Profile'),
    sanitizeCsvField(userId),
    sanitizeCsvField(`Stage: ${userProfile.stage}; Goals: ${(userProfile.targetExams || []).join(', ')}`),
    sanitizeCsvField(userProfile.stage),
    sanitizeCsvField(new Date().toISOString()),
  ]);

  // Tasks rows
  studyTasks.forEach((t) => {
    csvRows.push([
      sanitizeCsvField('StudyTask'),
      sanitizeCsvField(t.id || 'task'),
      sanitizeCsvField(t.title || t.subject || 'Task'),
      sanitizeCsvField(t.completed ? 'Completed' : 'Pending'),
      sanitizeCsvField(t.date || new Date().toISOString()),
    ]);
  });

  const csvString = csvRows.map((r) => r.join(',')).join('\n');

  return {
    json: JSON.stringify(jsonData, null, 2),
    csv: csvString,
  };
}

/**
 * Register an idempotent account deletion request
 */
export function requestAccountDeletion(userId: string): AccountDeletionRequest {
  if (deletionRequests.has(userId)) {
    return deletionRequests.get(userId)!;
  }

  const purgeDate = new Date();
  purgeDate.setDate(purgeDate.getDate() + 30); // 30-day statutory cooling / purge period

  const tombstone = crypto.createHash('sha256').update(`${userId}:${Date.now()}:tombstone`).digest('hex');

  const req: AccountDeletionRequest = {
    id: `del_${Date.now()}`,
    userId,
    requestedAt: new Date().toISOString(),
    status: 'pending',
    scheduledPurgeDate: purgeDate.toISOString(),
    auditTombstoneHash: tombstone,
  };

  deletionRequests.set(userId, req);
  return req;
}
