import fs from 'fs';
import path from 'path';
import {
  AdminAuditLog,
  ContentErrorReport,
  Entitlement,
  Order,
  Question,
  QuestionVersion,
  StudentLead,
  Subject,
  SubjectRequestRecord,
  SubjectSlug,
  TrialStatus,
  UserProfile,
  StudentAction,
  StudentAchievement,
} from '@/types';
import { ALL_SUBJECTS } from '@/lib/subjects';
import { createServerSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/server';

export interface DBUserAccount {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  role: 'customer' | 'admin';
  whatsapp_number?: string;
  grade?: string;
  isPro?: boolean;
  created_at: string;
  updated_at: string;
}

interface DBState {
  subjects: Subject[];
  questions: Record<string, Question>; // keyed by ID
  question_versions: QuestionVersion[];
  profiles: Record<string, UserProfile>;
  users: Record<string, DBUserAccount>; // keyed by email.toLowerCase()
  leads: Record<string, StudentLead>; // keyed by id or phone
  orders: Record<string, Order>;
  entitlements: Record<string, Entitlement>;
  user_progress: Record<string, { attempted: boolean; needs_revisit: boolean; last_studied_at: string }>; // key: userId_questionId
  user_bookmarks: Record<string, boolean>; // key: userId_questionId
  user_last_studied: Record<string, string>; // key: userId_subjectSlug -> questionId
  student_actions: StudentAction[];
  student_achievements: Record<string, StudentAchievement[]>; // key: userId
  subject_requests: SubjectRequestRecord[];
  content_error_reports: ContentErrorReport[];
  admin_audit_logs: AdminAuditLog[];
}

const DATA_DIR = path.join(process.cwd(), 'data', 'private');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure data/private exists
function ensureDirExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Memory cache for fast reads
let memoryCache: DBState | null = null;

function loadDB(): DBState {
  if (memoryCache) return memoryCache;
  ensureDirExists();

  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf8');
      memoryCache = JSON.parse(raw);
      if (memoryCache) {
        if (!memoryCache.users) memoryCache.users = {};
        if (!memoryCache.student_actions) memoryCache.student_actions = [];
        if (!memoryCache.student_achievements) memoryCache.student_achievements = {};
        if (!memoryCache.user_progress) memoryCache.user_progress = {};
        if (!memoryCache.user_bookmarks) memoryCache.user_bookmarks = {};
        if (!memoryCache.user_last_studied) memoryCache.user_last_studied = {};
        return memoryCache;
      }
    } catch (err) {
      console.error('[DB] Failed to parse local database.json, initializing fresh store.', err);
    }
  }

  // Initialize fresh DB state
  const initial: DBState = {
    subjects: ALL_SUBJECTS,
    questions: {},
    question_versions: [],
    profiles: {
      'admin-default': {
        id: 'admin-default',
        email: 'founder@tinko.in',
        name: 'Sadish Sugumaran',
        role: 'admin',
        created_at: new Date().toISOString(),
      },
      'demo-student': {
        id: 'demo-student',
        email: 'student@blocks-and-loops.com',
        name: 'Class 10 Student',
        role: 'customer',
        created_at: new Date().toISOString(),
      },
    },
    users: {},
    leads: {},
    orders: {},
    entitlements: {},
    user_progress: {},
    user_bookmarks: {},
    user_last_studied: {},
    student_actions: [],
    student_achievements: {},
    subject_requests: [],
    content_error_reports: [],
    admin_audit_logs: [],
  };

  // Try auto-loading from source question banks if available
  const sourcePath =
    process.env.SOURCE_QUESTION_BANKS_DIR ||
    'C:\\Users\\sadis\\Documents\\Codex\\2026-10-13\\i-x20\\outputs\\CBSE_2027_Question_Banks';
  const editorialFile = path.join(sourcePath, 'Editorial_Content.json');

  if (fs.existsSync(editorialFile)) {
    try {
      const rawEditorial = fs.readFileSync(editorialFile, 'utf8');
      const parsedEditorial = JSON.parse(rawEditorial);
      let count = 0;

      for (const subject of ALL_SUBJECTS) {
        const trackQuestions: any[] = parsedEditorial[subject.track] || [];
        trackQuestions.forEach((q, idx) => {
          const qId = q.id || `${subject.track}-${idx + 1}`;
          const isSample = subject.sampleQuestionIds.includes(qId) || idx < 5;
          initial.questions[qId] = {
            id: qId,
            track: subject.track,
            subjectSlug: subject.slug,
            topic: q.topic || 'General Practice',
            chapter: q.chapter || 1,
            pattern: q.pattern || 'Standard question',
            lens: q.lens || undefined,
            question: q.question,
            answer: q.answer,
            explanation: q.explanation,
            marks: q.marks || 1,
            source: q.source || subject.curriculumRef,
            source_type: q.source_type || 'Original model explanation',
            keywords: q.keywords || [],
            original_index: q.original_index ?? idx,
            priority_score: q.priority_score ?? 50,
            years_observed: q.years_observed || [2026],
            current_sample_support: !!q.current_sample_support,
            priority_band: q.priority_band || 'Core practice',
            rank: q.rank || idx + 1,
            version: 1,
            is_active: true,
            is_sample: isSample,
          };
          count++;
        });
      }
      console.log(`[DB] Successfully loaded ${count} questions from source banks into local store.`);
    } catch (e) {
      console.error('[DB] Error importing source Editorial_Content.json:', e);
    }
  }

  memoryCache = initial;
  saveDB(initial);
  return initial;
}

function saveDB(data: DBState) {
  memoryCache = data;
  try {
    ensureDirExists();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err: any) {
    // Non-fatal: in serverless environments like Vercel, filesystem is read-only
    console.warn('[DB] Operating in ephemeral memory mode (read-only filesystem):', err?.message || err);
  }
}

// ==========================================
// DB ACCESS METHODS
// ==========================================

export async function getSubjects(): Promise<Subject[]> {
  const db = loadDB();
  return db.subjects;
}

export async function getSubject(slug: SubjectSlug): Promise<Subject | undefined> {
  const db = loadDB();
  return db.subjects.find((s) => s.slug === slug);
}

export async function updateSubject(
  slug: SubjectSlug,
  updates: Partial<Subject>,
  adminEmail: string
): Promise<Subject | null> {
  const db = loadDB();
  const idx = db.subjects.findIndex((s) => s.slug === slug);
  if (idx === -1) return null;

  const current = db.subjects[idx];
  const updated: Subject = {
    ...current,
    ...updates,
  };
  db.subjects[idx] = updated;

  await logAdminAction(adminEmail, 'UPDATE_SUBJECT', 'subject', slug, {
    previous: { status: current.status, reviewNotes: current.reviewNotes },
    updated: updates,
  });

  saveDB(db);
  return updated;
}

export async function getQuestionsForSubject(
  slug: SubjectSlug,
  options: {
    isEntitled?: boolean;
    isAdmin?: boolean;
    limit?: number;
    offset?: number;
    topic?: string;
    search?: string;
  } = {}
): Promise<{ questions: Question[]; total: number; trialActive?: boolean; trialLimit?: number }> {
  const db = loadDB();
  const allForSubject = Object.values(db.questions)
    .filter((q) => q.subjectSlug === slug && q.is_active)
    .sort((a, b) => a.rank - b.rank);

  let filtered = allForSubject;

  // Access control & 10-Question Free Weekly Trial Policy:
  // If not entitled and not admin, deliver the first 10 questions as the 100% free weekly practice set!
  // These 10 questions have model answers, formulas, and step hints unlocked.
  if (!options.isEntitled && !options.isAdmin) {
    filtered = allForSubject.slice(0, 10).map((q) => ({
      ...q,
      is_sample: true, // ensure model answers & hints are accessible during trial
    }));
  }

  if (options.topic) {
    filtered = filtered.filter((q) => q.topic.toLowerCase() === options.topic?.toLowerCase());
  }

  if (options.search) {
    const qTerm = options.search.toLowerCase();
    filtered = filtered.filter(
      (q) =>
        q.question.toLowerCase().includes(qTerm) ||
        q.topic.toLowerCase().includes(qTerm) ||
        q.id.toLowerCase().includes(qTerm)
    );
  }

  const total = (!options.isEntitled && !options.isAdmin) ? Math.min(10, filtered.length) : filtered.length;
  const offset = options.offset || 0;
  const limit = options.limit || 50;
  const paginated = filtered.slice(offset, offset + limit);

  return {
    questions: paginated,
    total,
    trialActive: !options.isEntitled && !options.isAdmin,
    trialLimit: 10,
  };
}

export async function getQuestion(id: string): Promise<Question | undefined> {
  const db = loadDB();
  return db.questions[id];
}

export async function getSampleQuestions(slug: SubjectSlug): Promise<Question[]> {
  const db = loadDB();
  return Object.values(db.questions)
    .filter((q) => q.subjectSlug === slug && q.is_active && q.is_sample)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 10);
}

export async function updateQuestion(
  id: string,
  updates: Partial<Question>,
  changedBy: string,
  changeReason: string
): Promise<Question | null> {
  const db = loadDB();
  const current = db.questions[id];
  if (!current) return null;

  // Record version history
  const versionRecord: QuestionVersion = {
    id: `ver_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    question_id: id,
    version_number: current.version,
    question: current.question,
    answer: current.answer,
    explanation: current.explanation,
    marks: current.marks,
    changed_by: changedBy,
    change_reason: changeReason,
    created_at: new Date().toISOString(),
  };
  db.question_versions.push(versionRecord);

  // Apply updates with version bump
  const updated: Question = {
    ...current,
    ...updates,
    version: current.version + 1,
    updated_at: new Date().toISOString(),
  };

  db.questions[id] = updated;

  await logAdminAction(changedBy, 'UPDATE_QUESTION', 'question', id, {
    version: updated.version,
    changeReason,
  });

  saveDB(db);
  return updated;
}

export async function toggleSampleQuestion(id: string, isSample: boolean, adminEmail: string): Promise<boolean> {
  const db = loadDB();
  const current = db.questions[id];
  if (!current) return false;

  current.is_sample = isSample;
  saveDB(db);

  await logAdminAction(adminEmail, 'TOGGLE_SAMPLE_QUESTION', 'question', id, { is_sample: isSample });
  return true;
}

export async function getQuestionVersions(questionId: string): Promise<QuestionVersion[]> {
  const db = loadDB();
  return db.question_versions.filter((v) => v.question_id === questionId);
}

// ==========================================
// ENTITLEMENTS & ORDERS
// ==========================================

export async function getUserEntitlements(userId: string): Promise<Entitlement[]> {
  const db = loadDB();
  const now = new Date();
  return Object.values(db.entitlements).filter(
    (e) => e.user_id === userId && e.status === 'active' && new Date(e.expires_at) > now
  );
}

export async function hasActiveEntitlement(userId: string, subjectSlug: SubjectSlug): Promise<boolean> {
  const db = loadDB();
  const now = new Date();
  const key = `${userId}_${subjectSlug}`;
  const ent = db.entitlements[key];
  if (!ent) return false;
  return ent.status === 'active' && new Date(ent.expires_at) > now;
}

export async function createOrder(data: {
  userId: string;
  userEmail: string;
  subjectSlug: SubjectSlug;
  amountInPaise: number;
  razorpayOrderId: string;
  accessDurationDays: number;
}): Promise<Order> {
  const db = loadDB();
  const order: Order = {
    id: `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    user_id: data.userId,
    user_email: data.userEmail,
    subject_slug: data.subjectSlug,
    amount_in_paise: data.amountInPaise,
    currency: 'INR',
    razorpay_order_id: data.razorpayOrderId,
    status: 'created',
    access_duration_days: data.accessDurationDays,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.orders[order.id] = order;
  saveDB(db);
  return order;
}

export async function findOrderByRazorpayOrderId(rzpOrderId: string): Promise<Order | undefined> {
  const db = loadDB();
  return Object.values(db.orders).find((o) => o.razorpay_order_id === rzpOrderId);
}

export async function capturePaymentAndGrantEntitlement(params: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature?: string;
}): Promise<{ order: Order; entitlement: Entitlement }> {
  const db = loadDB();
  const order = Object.values(db.orders).find((o) => o.razorpay_order_id === params.razorpayOrderId);

  if (!order) {
    throw new Error(`Order not found for razorpay_order_id: ${params.razorpayOrderId}`);
  }

  // Idempotent: if already captured, return existing
  if (order.status === 'captured') {
    const key = `${order.user_id}_${order.subject_slug}`;
    const ent = db.entitlements[key];
    if (ent) return { order, entitlement: ent };
  }

  order.status = 'captured';
  order.razorpay_payment_id = params.razorpayPaymentId;
  order.razorpay_signature = params.razorpaySignature;
  order.updated_at = new Date().toISOString();

  // Create or refresh entitlement
  const key = `${order.user_id}_${order.subject_slug}`;
  const grantedAt = new Date();
  const expiresAt = new Date(grantedAt.getTime() + order.access_duration_days * 24 * 60 * 60 * 1000);

  const entitlement: Entitlement = {
    id: `ent_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    user_id: order.user_id,
    subject_slug: order.subject_slug,
    order_id: order.id,
    status: 'active',
    granted_at: grantedAt.toISOString(),
    expires_at: expiresAt.toISOString(),
    grant_type: 'purchase',
    access_duration_days: order.access_duration_days,
  };

  db.entitlements[key] = entitlement;
  saveDB(db);

  return { order, entitlement };
}

export async function grantManualEntitlement(params: {
  userId: string;
  userEmail: string;
  subjectSlug: SubjectSlug;
  durationDays: number;
  adminEmail: string;
  reason: string;
}): Promise<Entitlement> {
  const db = loadDB();
  const key = `${params.userId}_${params.subjectSlug}`;
  const grantedAt = new Date();
  const expiresAt = new Date(grantedAt.getTime() + params.durationDays * 24 * 60 * 60 * 1000);

  const entitlement: Entitlement = {
    id: `ent_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    user_id: params.userId,
    subject_slug: params.subjectSlug,
    status: 'active',
    granted_at: grantedAt.toISOString(),
    expires_at: expiresAt.toISOString(),
    grant_type: 'manual_admin',
    access_duration_days: params.durationDays,
  };

  db.entitlements[key] = entitlement;
  await logAdminAction(params.adminEmail, 'GRANT_MANUAL_ENTITLEMENT', 'entitlement', key, {
    userEmail: params.userEmail,
    subjectSlug: params.subjectSlug,
    reason: params.reason,
    durationDays: params.durationDays,
  });

  saveDB(db);
  return entitlement;
}

export async function revokeEntitlement(
  userId: string,
  subjectSlug: SubjectSlug,
  reason: string,
  adminEmail: string
): Promise<boolean> {
  const db = loadDB();
  const key = `${userId}_${subjectSlug}`;
  const ent = db.entitlements[key];
  if (!ent) return false;

  ent.status = 'revoked';
  ent.revocation_reason = reason;

  await logAdminAction(adminEmail, 'REVOKE_ENTITLEMENT', 'entitlement', key, {
    reason,
    userId,
    subjectSlug,
  });

  saveDB(db);
  return true;
}

export async function getAllOrders(): Promise<Order[]> {
  const db = loadDB();
  return Object.values(db.orders).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getAllEntitlements(): Promise<Entitlement[]> {
  const db = loadDB();
  return Object.values(db.entitlements).sort(
    (a, b) => new Date(b.granted_at).getTime() - new Date(a.granted_at).getTime()
  );
}

// ==========================================
// STUDY PROGRESS & BOOKMARKS
// ==========================================

export async function getUserStudyState(userId: string, subjectSlug: SubjectSlug) {
  const db = loadDB();
  const attemptedMap: Record<string, boolean> = {};
  const revisitMap: Record<string, boolean> = {};
  const bookmarkMap: Record<string, boolean> = {};

  const prefix = `${userId}_`;
  for (const [k, v] of Object.entries(db.user_progress)) {
    if (k.startsWith(prefix)) {
      const qId = k.replace(prefix, '');
      if (v.attempted) attemptedMap[qId] = true;
      if (v.needs_revisit) revisitMap[qId] = true;
    }
  }

  for (const [k, v] of Object.entries(db.user_bookmarks)) {
    if (k.startsWith(prefix) && v) {
      const qId = k.replace(prefix, '');
      bookmarkMap[qId] = true;
    }
  }

  const lastQuestionId = db.user_last_studied[`${userId}_${subjectSlug}`] || null;

  return {
    attempted: attemptedMap,
    needsRevisit: revisitMap,
    bookmarks: bookmarkMap,
    lastQuestionId,
  };
}

export async function toggleAttempted(userId: string, questionId: string, subjectSlug: SubjectSlug): Promise<boolean> {
  const db = loadDB();
  const key = `${userId}_${questionId}`;
  const existing = db.user_progress[key] || {
    attempted: false,
    needs_revisit: false,
    last_studied_at: new Date().toISOString(),
  };

  existing.attempted = !existing.attempted;
  existing.last_studied_at = new Date().toISOString();
  db.user_progress[key] = existing;
  db.user_last_studied[`${userId}_${subjectSlug}`] = questionId;

  saveDB(db);
  return existing.attempted;
}

export async function toggleNeedsRevisit(userId: string, questionId: string, subjectSlug: SubjectSlug): Promise<boolean> {
  const db = loadDB();
  const key = `${userId}_${questionId}`;
  const existing = db.user_progress[key] || {
    attempted: false,
    needs_revisit: false,
    last_studied_at: new Date().toISOString(),
  };

  existing.needs_revisit = !existing.needs_revisit;
  existing.last_studied_at = new Date().toISOString();
  db.user_progress[key] = existing;
  db.user_last_studied[`${userId}_${subjectSlug}`] = questionId;

  saveDB(db);
  return existing.needs_revisit;
}

export async function toggleBookmark(userId: string, questionId: string): Promise<boolean> {
  const db = loadDB();
  const key = `${userId}_${questionId}`;
  const current = !!db.user_bookmarks[key];
  db.user_bookmarks[key] = !current;
  saveDB(db);
  return !current;
}

export async function setLastStudied(userId: string, subjectSlug: SubjectSlug, questionId: string): Promise<void> {
  const db = loadDB();
  db.user_last_studied[`${userId}_${subjectSlug}`] = questionId;
  saveDB(db);
}

// ==========================================
// SUBJECT REQUESTS
// ==========================================

export async function recordSubjectRequest(data: {
  className: string;
  subjectName: string;
  notes?: string;
  email?: string;
  consentNotify: boolean;
}): Promise<SubjectRequestRecord> {
  const db = loadDB();
  const record: SubjectRequestRecord = {
    id: `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    class_name: data.className.trim(),
    subject_name: data.subjectName.trim(),
    notes: data.notes?.trim() || undefined,
    email: data.email?.trim() || undefined,
    consent_notify: data.consentNotify,
    created_at: new Date().toISOString(),
    status: 'new',
  };

  db.subject_requests.push(record);
  saveDB(db);
  return record;
}

export async function getSubjectRequests(): Promise<SubjectRequestRecord[]> {
  const db = loadDB();
  return [...db.subject_requests].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

// ==========================================
// CONTENT ERROR REPORTS
// ==========================================

export async function recordContentErrorReport(data: {
  userId: string;
  userEmail: string;
  questionId: string;
  subjectSlug: SubjectSlug;
  reportType: ContentErrorReport['report_type'];
  description: string;
}): Promise<ContentErrorReport> {
  const db = loadDB();
  const record: ContentErrorReport = {
    id: `err_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    user_id: data.userId,
    user_email: data.userEmail,
    question_id: data.questionId,
    subject_slug: data.subjectSlug,
    report_type: data.reportType,
    description: data.description.trim(),
    status: 'open',
    created_at: new Date().toISOString(),
  };

  db.content_error_reports.push(record);
  saveDB(db);
  return record;
}

export async function getContentErrorReports(): Promise<ContentErrorReport[]> {
  const db = loadDB();
  return [...db.content_error_reports].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function updateErrorReportStatus(
  reportId: string,
  status: ContentErrorReport['status'],
  adminNotes: string,
  adminEmail: string
): Promise<ContentErrorReport | null> {
  const db = loadDB();
  const report = db.content_error_reports.find((r) => r.id === reportId);
  if (!report) return null;

  report.status = status;
  report.admin_notes = adminNotes;

  await logAdminAction(adminEmail, 'UPDATE_ERROR_REPORT', 'error_report', reportId, { status, adminNotes });
  saveDB(db);
  return report;
}

// ==========================================
// ADMIN AUDIT LOGS
// ==========================================

export async function logAdminAction(
  adminEmail: string,
  action: string,
  targetType: string,
  targetId: string,
  details: Record<string, unknown>
): Promise<AdminAuditLog> {
  const db = loadDB();
  const log: AdminAuditLog = {
    id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    admin_email: adminEmail,
    action,
    target_type: targetType,
    target_id: targetId,
    details,
    created_at: new Date().toISOString(),
  };

  db.admin_audit_logs.unshift(log);
  // Cap at 1000 logs in memory
  if (db.admin_audit_logs.length > 1000) {
    db.admin_audit_logs.pop();
  }
  return log;
}

export async function getAdminAuditLogs(): Promise<AdminAuditLog[]> {
  const db = loadDB();
  return db.admin_audit_logs;
}

// ==========================================
// LEADS & 10-QUESTION FREE TRIAL TRACKING
// ==========================================

export async function registerOrUpdateLead(
  leadInput: {
    student_name: string;
    whatsapp_number: string;
    student_email?: string;
    grade?: string;
    target_exam?: string;
    school_name?: string;
    city?: string;
    parent_name?: string;
    parent_email?: string;
    parent_whatsapp?: string;
    selected_subjects?: SubjectSlug[];
    daily_minutes?: number;
    referred_by?: string;
  }
): Promise<StudentLead> {
  const db = loadDB();
  if (!db.leads) db.leads = {};

  const cleanPhone = leadInput.whatsapp_number.replace(/\D/g, '');
  const existingId = Object.keys(db.leads).find(
    (k) => db.leads[k].whatsapp_number.replace(/\D/g, '') === cleanPhone
  );

  const now = new Date();
  const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
  const existingLead = existingId ? db.leads[existingId] : null;

  const leadId = existingLead ? existingLead.id : `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const referralCode = existingLead?.referral_code || `REF${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const updatedLead: StudentLead = {
    id: leadId,
    student_name: leadInput.student_name || existingLead?.student_name || 'Student',
    student_email: leadInput.student_email || existingLead?.student_email,
    whatsapp_number: leadInput.whatsapp_number,
    grade: leadInput.grade || existingLead?.grade || 'Class 10',
    target_exam: leadInput.target_exam || existingLead?.target_exam || 'CBSE 2027',
    school_name: leadInput.school_name || existingLead?.school_name,
    city: leadInput.city || existingLead?.city,
    parent_name: leadInput.parent_name || existingLead?.parent_name,
    parent_email: leadInput.parent_email || existingLead?.parent_email,
    parent_whatsapp: leadInput.parent_whatsapp || existingLead?.parent_whatsapp,
    selected_subjects: leadInput.selected_subjects || existingLead?.selected_subjects || ['maths-standard'],
    daily_minutes: leadInput.daily_minutes || existingLead?.daily_minutes || 15,
    trial_questions_attempted: existingLead?.trial_questions_attempted || 0,
    trial_cycle_started_at: existingLead?.trial_cycle_started_at || now.toISOString(),
    trial_resets_at: existingLead?.trial_resets_at || new Date(now.getTime() + ONE_WEEK_MS).toISOString(),
    referral_code: referralCode,
    referred_by: leadInput.referred_by || existingLead?.referred_by,
    bonus_questions: existingLead?.bonus_questions || (leadInput.referred_by ? 5 : 0),
    created_at: existingLead?.created_at || now.toISOString(),
    updated_at: now.toISOString(),
  };

  db.leads[leadId] = updatedLead;
  saveDB(db);

  // Sync to Cloud Supabase PostgreSQL when configured
  if (isSupabaseConfigured) {
    try {
      const supabase = createServerSupabaseClient();
      await supabase.from('leads').upsert(
        {
          id: updatedLead.id,
          student_name: updatedLead.student_name,
          student_email: updatedLead.student_email || null,
          whatsapp_number: updatedLead.whatsapp_number,
          grade: updatedLead.grade,
          target_exam: updatedLead.target_exam,
          school_name: updatedLead.school_name || null,
          city: updatedLead.city || null,
          parent_name: updatedLead.parent_name || null,
          parent_email: updatedLead.parent_email || null,
          parent_whatsapp: updatedLead.parent_whatsapp || null,
          selected_subjects: updatedLead.selected_subjects,
          daily_minutes: updatedLead.daily_minutes,
          trial_questions_attempted: updatedLead.trial_questions_attempted,
          trial_cycle_started_at: updatedLead.trial_cycle_started_at,
          trial_resets_at: updatedLead.trial_resets_at,
          referral_code: updatedLead.referral_code || null,
          referred_by: updatedLead.referred_by || null,
          bonus_questions: updatedLead.bonus_questions,
          updated_at: updatedLead.updated_at,
        },
        { onConflict: 'id' }
      );
    } catch (err) {
      console.error('[DB] Supabase lead sync note:', (err as any)?.message || err);
    }
  }

  return updatedLead;
}

export async function getLead(idOrPhone: string): Promise<StudentLead | null> {
  const db = loadDB();
  if (!db.leads) return null;

  if (db.leads[idOrPhone]) return db.leads[idOrPhone];
  const clean = idOrPhone.replace(/\D/g, '');
  const found = Object.values(db.leads).find((l) => l.whatsapp_number.replace(/\D/g, '') === clean);
  return found || null;
}

export async function getAllLeads(): Promise<StudentLead[]> {
  const db = loadDB();
  return Object.values(db.leads || {}).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function calculateTrialStatus(lead?: StudentLead | null): TrialStatus {
  const FREE_TRIAL_LIMIT = 10;
  const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
  const now = Date.now();

  if (!lead) {
    const defaultResetsAt = new Date(now + ONE_WEEK_MS).toISOString();
    return {
      trialActive: true,
      totalLimit: FREE_TRIAL_LIMIT,
      attempted: 0,
      remaining: FREE_TRIAL_LIMIT,
      cycleStartedAt: new Date(now).toISOString(),
      resetsAt: defaultResetsAt,
      daysUntilReset: 7,
      hoursUntilReset: 168,
      isLocked: false,
    };
  }

  let cycleStarted = new Date(lead.trial_cycle_started_at || now).getTime();
  let resetsAtTime = new Date(lead.trial_resets_at || (cycleStarted + ONE_WEEK_MS)).getTime();
  let attempted = lead.trial_questions_attempted || 0;
  const bonus = lead.bonus_questions || 0;
  const totalLimit = FREE_TRIAL_LIMIT + bonus;

  // Has 1 week passed? If so, auto-reset the trial!
  if (now >= resetsAtTime) {
    attempted = 0;
    cycleStarted = now;
    resetsAtTime = now + ONE_WEEK_MS;
    lead.trial_questions_attempted = 0;
    lead.trial_cycle_started_at = new Date(cycleStarted).toISOString();
    lead.trial_resets_at = new Date(resetsAtTime).toISOString();
    const db = loadDB();
    if (db.leads && db.leads[lead.id]) {
      db.leads[lead.id] = lead;
      saveDB(db);
    }
  }

  const msRemaining = Math.max(0, resetsAtTime - now);
  const hoursUntilReset = Math.floor(msRemaining / (1000 * 60 * 60));
  const daysUntilReset = Math.ceil(hoursUntilReset / 24);
  const remaining = Math.max(0, totalLimit - attempted);

  return {
    trialActive: true,
    totalLimit,
    attempted,
    remaining,
    cycleStartedAt: new Date(cycleStarted).toISOString(),
    resetsAt: new Date(resetsAtTime).toISOString(),
    daysUntilReset,
    hoursUntilReset,
    isLocked: attempted >= totalLimit,
  };
}

export async function incrementTrialAttempt(leadIdOrPhone: string): Promise<TrialStatus> {
  const db = loadDB();
  const lead = await getLead(leadIdOrPhone);
  if (!lead) return calculateTrialStatus(null);

  lead.trial_questions_attempted = (lead.trial_questions_attempted || 0) + 1;
  lead.updated_at = new Date().toISOString();
  if (db.leads) {
    db.leads[lead.id] = lead;
    saveDB(db);
  }

  if (isSupabaseConfigured) {
    try {
      const supabase = createServerSupabaseClient();
      await supabase
        .from('leads')
        .update({
          trial_questions_attempted: lead.trial_questions_attempted,
          updated_at: lead.updated_at,
        })
        .eq('id', lead.id);
    } catch (e) {
      // non-fatal
    }
  }

  return calculateTrialStatus(lead);
}

// ==========================================
// USER ACCOUNTS & CREDENTIALS
// ==========================================

export async function saveUserAccount(account: DBUserAccount): Promise<DBUserAccount> {
  const db = loadDB();
  if (!db.users) db.users = {};
  const emailKey = account.email.toLowerCase().trim();
  db.users[emailKey] = {
    ...account,
    email: emailKey,
    updated_at: new Date().toISOString(),
  };

  // Also register or update in leads so it syncs with Supabase
  if (account.name) {
    await registerOrUpdateLead({
      student_name: account.name,
      student_email: account.email,
      whatsapp_number: account.whatsapp_number || '9999999999',
      grade: account.grade || 'Class 10',
    });
  }

  saveDB(db);
  return db.users[emailKey];
}

export async function getUserAccountByEmail(email: string): Promise<DBUserAccount | null> {
  const db = loadDB();
  if (!db.users) return null;
  const emailKey = email.toLowerCase().trim();
  return db.users[emailKey] || null;
}

// ==========================================
// STUDENT ACTIONS & ACHIEVEMENTS TRACKING
// ==========================================

export async function recordStudentAction(action: Omit<StudentAction, 'id' | 'created_at'>): Promise<StudentAction> {
  const db = loadDB();
  if (!db.student_actions) db.student_actions = [];

  const fullAction: StudentAction = {
    ...action,
    id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    created_at: new Date().toISOString(),
  };

  db.student_actions.push(fullAction);

  // Sync with Supabase if configured (attempt lead trial increment or content report)
  if (isSupabaseConfigured && action.user_email) {
    try {
      const supabase = createServerSupabaseClient();
      // Record in leads or user_progress if available
      if (action.action_type === 'QUESTION_ATTEMPT' && action.question_id) {
        await supabase.from('leads').update({
          trial_questions_attempted: (db.student_actions.filter(a => a.user_email === action.user_email && a.action_type === 'QUESTION_ATTEMPT').length),
          updated_at: new Date().toISOString()
        }).eq('student_email', action.user_email.toLowerCase());
      }
    } catch (e) {
      // Non-fatal
    }
  }

  saveDB(db);
  return fullAction;
}

export async function getStudentActions(userIdOrEmail: string): Promise<StudentAction[]> {
  const db = loadDB();
  if (!db.student_actions) return [];
  const query = userIdOrEmail.toLowerCase();
  return db.student_actions
    .filter((a) => a.user_id === userIdOrEmail || a.user_email.toLowerCase() === query)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function getStudentAchievements(userId: string): Promise<StudentAchievement[]> {
  const db = loadDB();
  if (!db.student_achievements) return [];
  return db.student_achievements[userId] || [];
}

export async function awardAchievement(
  userId: string,
  achievement: Omit<StudentAchievement, 'id' | 'unlocked_at'>
): Promise<{ awarded: boolean; achievement: StudentAchievement }> {
  const db = loadDB();
  if (!db.student_achievements) db.student_achievements = {};
  if (!db.student_achievements[userId]) db.student_achievements[userId] = [];

  const existing = db.student_achievements[userId].find((a) => a.code === achievement.code);
  if (existing) {
    return { awarded: false, achievement: existing };
  }

  const newAchievement: StudentAchievement = {
    ...achievement,
    id: `ach_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    unlocked_at: new Date().toISOString(),
  };

  db.student_achievements[userId].push(newAchievement);
  saveDB(db);
  return { awarded: true, achievement: newAchievement };
}
