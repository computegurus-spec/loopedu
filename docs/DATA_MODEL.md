# Lood-edu Data Model & Schema Specification

**Prepared for:** Blocks and Loops Technologies Pvt Ltd  
**Version:** 1.0  

---

## 1. Entity-Relationship Overview

The Lood-edu persistence layer is structured as a relational schema enforcing Row-Level Security (RLS) on all private user tables, strict foreign-key integrity, and immutable versioning for public authoritative records.

---

## 2. Core Entities

### 2.1. User & Identity Tables
- **`users`**: Core user entity.
  - `id` (UUID, Primary Key)
  - `email` (TEXT, Unique)
  - `role` (ENUM: `student`, `adult_aspirant`, `parent`, `counsellor`, `editor`, `reviewer`, `administrator`)
  - `created_at` (TIMESTAMPTZ, default `NOW()`)
  - `updated_at` (TIMESTAMPTZ)
- **`profiles`**: User demographic and educational attributes.
  - `id` (UUID, Primary Key, Foreign Key -> `users.id`)
  - `full_name` (TEXT)
  - `age` (INTEGER)
  - `stage` (TEXT: `Class 10`, `Class 11`, `Class 12`, `Undergraduate`, `Graduate Aspirant`)
  - `target_exams` (TEXT[])
  - `subjects` (TEXT[])
  - `preferred_language` (TEXT, default `'en'`)
  - `budget_inr_annual` (INTEGER)
- **`consent_records`**: Statutory audit log of granted/withdrawn consents.
  - `id` (UUID, Primary Key)
  - `user_id` (UUID, Foreign Key -> `users.id`)
  - `consent_type` (`terms_of_service`, `privacy_policy`, `daily_briefing`, `guardian_consent_minor`)
  - `status` (`granted`, `withdrawn`)
  - `ip_address_hash` (TEXT, SHA-256 salted hash, raw IP not stored)
  - `version` (TEXT)
  - `created_at` (TIMESTAMPTZ)
- **`guardian_links`**: Permission-scoped delegation for minor accounts.
  - `id` (UUID, Primary Key)
  - `student_id` (UUID, Foreign Key -> `users.id`)
  - `guardian_id` (UUID, Foreign Key -> `users.id`)
  - `status` (`pending`, `verified`, `revoked`)
  - `can_view_study_plans` (BOOLEAN, default `TRUE`)
  - `can_view_practice_progress` (BOOLEAN, default `TRUE`)
  - `can_view_mind_coach` (BOOLEAN, **Invariant: ALWAYS FALSE**)

---

### 2.2. Career Pathways & Institution Catalogue
- **`career_paths`**: Approved multi-track pathways.
  - `id` (TEXT, Primary Key)
  - `title` (TEXT)
  - `category` (TEXT)
  - `typical_roles` (TEXT[])
  - `prerequisites` (JSONB)
  - `cost_breakdown` (JSONB: tuition, hostel, mess, travel, exam_prep)
  - `backup_path_ids` (TEXT[])
  - `practical_project` (JSONB)
- **`institutions`**: Accredited colleges and universities.
  - `id` (TEXT, Primary Key)
  - `name` (TEXT)
  - `state` (TEXT)
  - `statutory_approvals` (TEXT[]: UGC, AICTE, NMC, BCI, COA)
  - `unbundled_annual_fee_inr` (INTEGER)

---

### 2.3. Exams, Eligibility Rules & Notices
- **`exam_families`**: Top-level exam groupings (e.g., JEE, NEET, UPSC, IBPS, RRB).
  - `id` (TEXT, Primary Key)
  - `name` (TEXT)
  - `category` (TEXT)
  - `authority_name` (TEXT)
  - `authority_domain` (TEXT)
- **`exam_cycles`**: Cycle-specific occurrences (e.g., JEE Main 2027 Session 1).
  - `id` (TEXT, Primary Key)
  - `family_id` (TEXT, Foreign Key -> `exam_families.id`)
  - `year` (INTEGER)
  - `application_start` (DATE)
  - `application_close` (TIMESTAMPTZ: explicitly includes exact closing time)
  - `correction_window` (DATERANGE)
  - `admit_card_date` (DATE)
  - `exam_dates` (DATERANGE)
  - `status` (ENUM: `active`, `stale`, `withdrawn`, `superseded`)
- **`eligibility_rules`**: Declarative AST eligibility criteria.
  - `id` (TEXT, Primary Key)
  - `cycle_id` (TEXT, Foreign Key -> `exam_cycles.id`)
  - `rule_ast` (JSONB: conditions, subjects, age caps, category relaxations)
  - `version` (TEXT)
  - `gazette_citation` (TEXT)
- **`notices_and_amendments`**: Gazetted changes and corrections.
  - `id` (TEXT, Primary Key)
  - `exam_family_id` (TEXT)
  - `notice_number` (TEXT)
  - `title` (TEXT)
  - `summary` (TEXT)
  - `source_url` (TEXT)
  - `effective_date` (DATE)
  - `submitted_by` (UUID)
  - `approved_by` (UUID, must differ from `submitted_by`)
  - `state` (`draft`, `approved`, `published`, `withdrawn`)

---

### 2.4. Study Preparation & Mistake Vault
- **`question_banks`**: Original demonstration and approved items.
  - `id` (TEXT, Primary Key)
  - `subject_slug` (TEXT)
  - `question_text` (TEXT)
  - `correct_answer` (TEXT)
  - `explanation` (TEXT)
  - `progressive_hints` (TEXT[])
  - `concept_tags` (TEXT[])
  - `difficulty` (`beginner`, `intermediate`, `advanced`)
  - `status` (`draft`, `in_review`, `published`)
- **`student_attempts`**: Deterministic test attempts.
  - `id` (UUID, Primary Key)
  - `user_id` (UUID)
  - `question_id` (TEXT)
  - `chosen_answer` (TEXT)
  - `is_correct` (BOOLEAN)
  - `time_spent_seconds` (INTEGER)
  - `created_at` (TIMESTAMPTZ)
- **`mistake_vault`**: Spaced repetition mistake entries.
  - `id` (UUID, Primary Key)
  - `user_id` (UUID)
  - `question_id` (TEXT)
  - `consecutive_correct` (INTEGER, default `0`)
  - `next_review_date` (DATE: 1d -> 3d -> 7d)
  - `is_mastered` (BOOLEAN, default `FALSE`)

---

### 2.5. Mind Coach (Wellness Isolation)
- **`mind_coach_reflections`**: Private non-clinical reflections.
  - `id` (UUID, Primary Key)
  - `user_id` (UUID, Foreign Key -> `users.id`)
  - `mood_score` (INTEGER: 1 to 5)
  - `reflection_text_encrypted` (BYTEA, AES-256 encrypted)
  - `focus_minutes_logged` (INTEGER)
  - `created_at` (TIMESTAMPTZ)
  - *Row-Level Security: Only readable by the authenticated user; completely blocked from guardian, counsellor, and admin queries.*

---

### 2.6. Subscriptions, Payments & Outbox
- **`subscriptions`**: Active user entitlements.
  - `id` (TEXT, Primary Key)
  - `user_id` (UUID)
  - `plan_tier` (`explore`, `guide`, `prepare`, `subject_pass`)
  - `billing_cycle` (`monthly`, `annual`)
  - `status` (`pending`, `authorised`, `active`, `past_due`, `cancelled`, `expired`)
  - `amount_paise` (INTEGER)
  - `razorpay_subscription_id` (TEXT)
  - `current_period_end` (TIMESTAMPTZ)
- **`webhook_events`**: Idempotency ledger.
  - `event_id` (TEXT, Primary Key)
  - `event_type` (TEXT)
  - `payload_hash` (TEXT, SHA-256)
  - `received_at` (TIMESTAMPTZ)
  - `processed` (BOOLEAN)
- **`newsletter_outbox`**: Transactional email queue.
  - `id` (TEXT, Primary Key, format: `${edition}:${user_id}:${date}`)
  - `user_id` (UUID)
  - `email` (TEXT)
  - `edition` (`student`, `parent`, `adult`)
  - `status` (`pending`, `dry_run_preview`, `sent`, `suppressed`)
  - `rendered_html` (TEXT)
