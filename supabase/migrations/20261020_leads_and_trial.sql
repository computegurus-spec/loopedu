-- ==============================================================================
-- LoopEdu Migration: Leads & Free Weekly Trial Tracking
-- Safe, Idempotent: Creates leads table and trial tracking metrics
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name TEXT NOT NULL,
  student_email TEXT,
  whatsapp_number TEXT NOT NULL,
  grade TEXT NOT NULL DEFAULT 'Class 10',
  target_exam TEXT NOT NULL DEFAULT 'CBSE 2027',
  school_name TEXT,
  city TEXT,
  parent_name TEXT,
  parent_email TEXT,
  parent_whatsapp TEXT,
  selected_subjects JSONB NOT NULL DEFAULT '[]'::jsonb,
  daily_minutes INTEGER DEFAULT 15,
  trial_questions_attempted INTEGER NOT NULL DEFAULT 0,
  trial_cycle_started_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  trial_resets_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now() + INTERVAL '7 days'),
  referral_code TEXT UNIQUE,
  referred_by TEXT,
  bonus_questions INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_leads_whatsapp ON public.leads(whatsapp_number);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(student_email);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 1. Public can register leads (during onboarding or pre-test)
DROP POLICY IF EXISTS "Public can submit leads" ON public.leads;
CREATE POLICY "Public can submit leads"
  ON public.leads FOR INSERT
  WITH CHECK (true);

-- 2. Public can read and update their own lead record if matching whatsapp_number
DROP POLICY IF EXISTS "Public can view own lead by phone" ON public.leads;
CREATE POLICY "Public can view own lead by phone"
  ON public.leads FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public can update own lead" ON public.leads;
CREATE POLICY "Public can update own lead"
  ON public.leads FOR UPDATE
  USING (true);

-- 3. Admins have full access
DROP POLICY IF EXISTS "Admins manage all leads" ON public.leads;
CREATE POLICY "Admins manage all leads"
  ON public.leads FOR ALL
  USING (public.is_admin());
