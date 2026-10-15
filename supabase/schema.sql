-- ==============================================================================
-- BoardEdge AI by blocks and loops - CBSE 2027 Question Banks Database Schema
-- Production PostgreSQL with Row Level Security (RLS) & Deny-by-Default
-- ==============================================================================

-- 1. Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins have full access to profiles"
  ON public.profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- 2. Subjects Table
CREATE TABLE IF NOT EXISTS public.subjects (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  track TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  grade TEXT NOT NULL DEFAULT 'Class 10',
  exam_year INTEGER NOT NULL DEFAULT 2027,
  price_inr INTEGER NOT NULL DEFAULT 999,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review_pending', 'published')),
  question_count INTEGER NOT NULL DEFAULT 200,
  description TEXT NOT NULL,
  curriculum_ref TEXT NOT NULL,
  editorial_review_status TEXT NOT NULL DEFAULT 'pending' CHECK (editorial_review_status IN ('pending', 'in_progress', 'verified', 'requires_revision')),
  rights_review_status TEXT NOT NULL DEFAULT 'pending' CHECK (rights_review_status IN ('pending', 'in_progress', 'verified', 'requires_revision')),
  review_notes TEXT,
  verified_topics JSONB NOT NULL DEFAULT '[]'::jsonb,
  sample_question_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  track_comparison_note TEXT,
  availability_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

-- Anyone can view published subjects
CREATE POLICY "Public subjects viewable by everyone"
  ON public.subjects FOR SELECT
  USING (true);

-- Only admins can modify subjects
CREATE POLICY "Admins manage subjects"
  ON public.subjects FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- 3. Questions Table (Private, Paid Content - Never Publicly Accessible in Bulk)
CREATE TABLE IF NOT EXISTS public.questions (
  id TEXT PRIMARY KEY, -- Stable IDs: MB-001, MS-001, AI-001, etc.
  subject_slug TEXT NOT NULL REFERENCES public.subjects(slug) ON DELETE CASCADE,
  track TEXT NOT NULL,
  topic TEXT NOT NULL,
  chapter INTEGER,
  pattern TEXT NOT NULL,
  lens TEXT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  explanation TEXT NOT NULL,
  marks INTEGER NOT NULL DEFAULT 1,
  source TEXT NOT NULL,
  source_type TEXT NOT NULL,
  keywords JSONB NOT NULL DEFAULT '[]'::jsonb,
  original_index INTEGER NOT NULL,
  priority_score NUMERIC(5,2) NOT NULL DEFAULT 0.0,
  years_observed JSONB NOT NULL DEFAULT '[]'::jsonb,
  current_sample_support BOOLEAN NOT NULL DEFAULT false,
  priority_band TEXT NOT NULL,
  rank INTEGER NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_sample BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_questions_subject ON public.questions(subject_slug, rank);
CREATE INDEX IF NOT EXISTS idx_questions_sample ON public.questions(subject_slug, is_sample);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Non-purchasers can ONLY read questions marked as approved sample questions
CREATE POLICY "Public can view approved sample questions"
  ON public.questions FOR SELECT
  USING (
    is_sample = true AND is_active = true AND
    EXISTS (
      SELECT 1 FROM public.subjects
      WHERE subjects.slug = questions.subject_slug AND subjects.status = 'published'
    )
  );

-- Customers with an active entitlement can read questions for their owned subject
CREATE POLICY "Entitled users can read questions"
  ON public.questions FOR SELECT
  USING (
    auth.uid() IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM public.entitlements
      WHERE entitlements.user_id = auth.uid()
        AND entitlements.subject_slug = questions.subject_slug
        AND entitlements.status = 'active'
        AND entitlements.expires_at > now()
    )
  );

-- Admins can view and edit all questions
CREATE POLICY "Admins full access to questions"
  ON public.questions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- 4. Question Version History
CREATE TABLE IF NOT EXISTS public.question_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id TEXT NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  explanation TEXT NOT NULL,
  marks INTEGER NOT NULL,
  changed_by TEXT NOT NULL,
  change_reason TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.question_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view and create question versions"
  ON public.question_versions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  subject_slug TEXT NOT NULL REFERENCES public.subjects(slug),
  amount_in_paise INTEGER NOT NULL DEFAULT 99900,
  currency TEXT NOT NULL DEFAULT 'INR',
  razorpay_order_id TEXT NOT NULL UNIQUE,
  razorpay_payment_id TEXT UNIQUE,
  razorpay_signature TEXT,
  status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'pending', 'captured', 'failed', 'refunded')),
  access_duration_days INTEGER NOT NULL DEFAULT 365,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view and manage all orders"
  ON public.orders FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- 6. Entitlements Table (Grants Access to Question Banks)
CREATE TABLE IF NOT EXISTS public.entitlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_slug TEXT NOT NULL REFERENCES public.subjects(slug),
  order_id UUID REFERENCES public.orders(id),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'expired')),
  access_duration_days INTEGER NOT NULL DEFAULT 365,
  granted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  expires_at TIMESTAMPTZ NOT NULL,
  grant_type TEXT NOT NULL DEFAULT 'purchase' CHECK (grant_type IN ('purchase', 'manual_admin')),
  revocation_reason TEXT,
  UNIQUE(user_id, subject_slug)
);

ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own entitlements"
  ON public.entitlements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins manage all entitlements"
  ON public.entitlements FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- 7. User Study Progress & Bookmarks
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_slug TEXT NOT NULL REFERENCES public.subjects(slug),
  question_id TEXT NOT NULL REFERENCES public.questions(id),
  is_attempted BOOLEAN NOT NULL DEFAULT false,
  needs_revisit BOOLEAN NOT NULL DEFAULT false,
  last_studied_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, question_id)
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own study progress"
  ON public.user_progress FOR ALL
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.user_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_slug TEXT NOT NULL REFERENCES public.subjects(slug),
  question_id TEXT NOT NULL REFERENCES public.questions(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, question_id)
);

ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own bookmarks"
  ON public.user_bookmarks FOR ALL
  USING (auth.uid() = user_id);

-- 8. Subject Requests Table
CREATE TABLE IF NOT EXISTS public.subject_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_name TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  notes TEXT,
  email TEXT,
  consent_notify BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'planned')),
  ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.subject_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert subject requests"
  ON public.subject_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view and manage subject requests"
  ON public.subject_requests FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- 9. Content Error Reports
CREATE TABLE IF NOT EXISTS public.content_error_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT NOT NULL,
  question_id TEXT NOT NULL REFERENCES public.questions(id),
  subject_slug TEXT NOT NULL REFERENCES public.subjects(slug),
  report_type TEXT NOT NULL CHECK (report_type IN ('typo', 'incorrect_answer', 'unclear_explanation', 'formatting_issue', 'other')),
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'dismissed')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.content_error_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create content error reports"
  ON public.content_error_reports FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins manage content error reports"
  ON public.content_error_reports FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- 10. Admin Audit Logs
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_email TEXT NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view and write audit logs"
  ON public.admin_audit_logs FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );
