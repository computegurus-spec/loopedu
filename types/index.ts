export type Curriculum = 'CBSE' | 'ICSE' | 'StateBoard' | 'Competitive';

export type SubjectTrack =
  | 'Maths_Basic'
  | 'Maths_Standard'
  | 'Science'
  | 'Social_Science'
  | 'English_LL'
  | 'English_Communicative'
  | 'German'
  | 'AI';

export type SubjectSlug =
  | 'maths-basic'
  | 'maths-standard'
  | 'science'
  | 'social-science'
  | 'english-language-literature'
  | 'english-communicative'
  | 'german'
  | 'artificial-intelligence';

export type PublicationStatus = 'draft' | 'review_pending' | 'published';

export type ReviewStatus = 'pending' | 'in_progress' | 'verified' | 'requires_revision';

export type QuestionFormat = 'subjective_short' | 'subjective_long' | 'mcq' | 'case_based';

export interface Subject {
  id: string;
  slug: SubjectSlug;
  track: SubjectTrack;
  curriculum: Curriculum;
  grade: string; // e.g. "Class 10"
  name: string;
  shortName: string;
  examYear: number;
  priceInr: number;
  status: PublicationStatus;
  questionCount: number;
  description: string;
  curriculumRef: string;
  editorialReviewStatus: ReviewStatus;
  rightsReviewStatus: ReviewStatus;
  reviewNotes: string;
  verifiedTopics: string[];
  sampleQuestionIds: string[];
  trackComparisonNote?: string;
  availabilityNote?: string;
}

export interface Question {
  id: string; // e.g. "MB-001", "MS-001", "AI-001"
  track: SubjectTrack;
  subjectSlug: SubjectSlug;
  topic: string;
  chapter: number | string;
  pattern: string;
  lens?: string;
  format?: QuestionFormat;
  question: string;
  answer: string;
  explanation: string;
  marks: number;
  source: string;
  source_type: string;
  keywords: string[];
  original_index: number;
  priority_score: number; // Revision priority heuristic (0-100)
  years_observed: number[];
  current_sample_support: boolean;
  priority_band: string;
  rank: number;
  version: number;
  is_active: boolean;
  is_sample: boolean;
  hints?: string[];
  simple_analogy?: string;
  updated_at?: string;
}

export interface QuestionVersion {
  id: string;
  question_id: string;
  version_number: number;
  question: string;
  answer: string;
  explanation: string;
  marks: number;
  changed_by: string;
  change_reason: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  role: 'customer' | 'admin';
  created_at: string;
  study_plan?: StudyPlan;
}

export interface StudyPlan {
  curriculum: Curriculum;
  grade: string;
  targetExamYear: number;
  dailyTargetMinutes: number; // e.g. 20, 30, 45 minutes
  selectedSubjects: SubjectSlug[];
  emailReminderEnabled: boolean;
  reminderTimeUtc?: string; // e.g. "17:30"
}

export interface Order {
  id: string;
  user_id: string;
  user_email: string;
  subject_slug: SubjectSlug;
  amount_in_paise: number; // 99900 for ₹999
  currency: string; // 'INR'
  razorpay_order_id: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  status: 'created' | 'pending' | 'captured' | 'failed' | 'refunded';
  access_duration_days: number;
  created_at: string;
  updated_at: string;
}

export interface Entitlement {
  id: string;
  user_id: string;
  subject_slug: SubjectSlug;
  order_id?: string;
  status: 'active' | 'revoked' | 'expired';
  granted_at: string;
  expires_at: string;
  grant_type: 'purchase' | 'manual_admin';
  revocation_reason?: string;
  access_duration_days: number;
}

export interface UserProgressItem {
  id: string;
  user_id: string;
  subject_slug: SubjectSlug;
  question_id: string;
  is_attempted: boolean;
  needs_revisit: boolean;
  times_attempted: number;
  self_eval_status?: 'correct' | 'mistake' | 'unclear';
  last_studied_at: string;
}

export interface RevisionQueueItem {
  questionId: string;
  subjectSlug: SubjectSlug;
  topic: string;
  reason: 'missed' | 'revisit_flagged' | 'spaced_review';
  dueScore: number;
  lastStudiedAt: string;
}

export interface DailyFiveSession {
  date: string;
  completed: boolean;
  subjectSlugs: SubjectSlug[];
  totalQuestions: number;
  solvedCorrectly: number;
  needsReviewCount: number;
}

export interface UserStreak {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  totalQuestionsAttempted: number;
}

export interface SubjectRequestRecord {
  id: string;
  class_name: string;
  subject_name: string;
  notes?: string;
  email?: string;
  consent_notify: boolean;
  created_at: string;
  status: 'new' | 'reviewed' | 'planned';
}

export interface ContentErrorReport {
  id: string;
  user_id: string;
  user_email: string;
  question_id: string;
  subject_slug: SubjectSlug;
  report_type: 'typo' | 'incorrect_answer' | 'unclear_explanation' | 'formatting_issue' | 'other';
  description: string;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
  admin_notes?: string;
  created_at: string;
}

export interface AdminAuditLog {
  id: string;
  admin_email: string;
  action: string;
  target_type: string;
  target_id: string;
  details: Record<string, unknown>;
  created_at: string;
}
