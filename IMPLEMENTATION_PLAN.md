# Lood-edu (LoopEdu) Implementation Plan & Specification Contract

## 1. Executive Summary & Goals
This document translates the complete Antigravity overnight implementation specification into an executable engineering roadmap for **LoopEdu (stealth working title: Lood-edu)** by **Blocks and Loops Technologies Pvt Ltd**.

### Key Architecture Pillars
1. **Application Modes**:
   - `DEMO`: Zero-credential mode using synthetic personas (Class 10 Biology+Design student, Adult Banking/Railway aspirant, Guardian, Counsellor, Reviewer, Admin), browser-isolated demo storage, clear persistent "DEMO MODE" badge, disabled external calls.
   - `LIVE`: Full database persistence (Supabase / Postgres), Auth0 / email auth, Razorpay payments, real AI providers with fallback (OpenAI / NVIDIA NIM), transactional job runner.
2. **Unified Core Navigation**:
   - `/today` - Daily habit, personalized briefing, priority action, due tasks.
   - `/paths` (`/my-paths`) - Explainable 3-path career guidance, prerequisites, realistic duration & fee breakdown, backup paths, review request.
   - `/exams` - National & state competitive exams (JEE, NEET, CUET, UPSC, SSC, Banking IBPS, Railway RRB, Defence, State exams), declarative eligibility rules engine.
   - `/prepare` - Timed practice, diagnostics, worked solutions, mistake notebook, adaptive revision scheduler (Class 10 CBSE tracks + JEE/NEET topics + Adult Aptitude track).
   - `/updates` - Verified official education notices, amendment propagation, watchlist alert triggers, daily newsletter archive.
   - `/coach` - Private bounded Mind Coach (study habits, stress, reflection, focus timer, crisis distress routing), strictly isolated from parents/counsellors/advertisers.
   - `/settings` - Profile, age verification, consent ledger, guardian/counsellor linking, data export, account deletion.
   - `/admin` - Operational console (source registry, crawler/intake, multi-stage editorial review, amendment broadcaster, AI budgets, billing diagnostics).
3. **Data Integrity & Honesty**:
   - Strictly honest factual claims. No fake partnerships, fake rankings, or fake psychometric accuracy scores.
   - Deterministic rule engine for eligibility, dates, and money.
   - Strict RLS & server-side authorization across roles: Student, Adult, Parent, Counsellor, Reviewer, Admin.

---

## 2. Implementation Slices (A to G)

### Slice A: Foundations, Demo Engine, Authentication & Navigation Shell
- Create application mode config (`APP_MODE=demo|live`), feature flags, and Demo Mode Context / Provider.
- Implement session state & role authorization (Student, Adult Aspirant, Parent, Counsellor, Reviewer, Admin).
- Build the core responsive navigation shell: Today, My Paths, Exams & Opportunities, Prepare, Updates, Coach, and Admin Console.
- Ensure warm neutral, navy/ink text, teal accent (#0D9488 / #0F766E), high-contrast accessibility.

### Slice B: My Paths (Explainable 3-Pathway Career Guidance)
- Data model & store for career clusters, programs, prerequisite rules, duration, fee breakdowns, and backup routes.
- Profile matching engine with transparent explanations (rules cited, fit factors, prerequisites passed/failed/unknown).
- Career comparator, cost calculator (tuition, living, exam prep, hidden fees), and counselor review request queue.

### Slice C: Exams, Declarative Eligibility Engine & Editorial Pipeline
- National exam database: Engineering, Medical, Civil Services, Banking (IBPS), Railways (RRB), SSC, Defence, State CETs.
- Declarative rule engine: typed AST for age cutoffs, qualification, subject minimums, attempts, relaxations.
- Editorial ingestion pipeline: `discovered -> extracted draft -> evidence checked -> consistency checked -> application reviewed -> approved -> published`.
- Synthetic amendment broadcast: when notice changes, recalculate user watchlists and create actionable notifications.

### Slice D: Preparation, Diagnostics, Mistake Notebook & Bounded Mind Coach
- Practice tracks: Class 10 CBSE foundation, JEE/NEET physics/chem/bio starters, Adult Quantitative Aptitude & Logical Reasoning.
- Diagnostic quiz, timed practice, verified explanations with LaTeX rendering, mistake review notebook, and SM-2 spaced repetition revision scheduler.
- Private Mind Coach: check-in, focus timer, study routine advisor, stress defuser, and verified crisis distress directory.

### Slice E: Daily Briefing Newsletter, Subscriptions (Razorpay) & Controlled Sponsorships
- Daily 3-minute personalized briefing builder (affected notices, 1 study action, 1 exploration tip).
- Newsletter outbox with idempotent deduplication, preference suppression, and preview renderer.
- Razorpay subscription integration: Explore (Free), Guide (₹199/mo), Prepare (₹399/mo) + Modular ₹299/mo subject pass. HMAC verification, raw webhook ledger.
- Feature-flagged adult-only contextual sponsored cards (disabled by default, clearly marked "Sponsored", 0 ads for minors).

### Slice F: Privacy, Safeguarding, Cost Controls & Operational Console
- Minor consent workflow & revocable guardian/counsellor access permissions.
- Self-service data export (JSON/CSV) and idempotent account deletion with audit ledger.
- SSRF-safe URL/document intake validator (reject loopback, RFC1918, cloud metadata IPs).
- AI token usage & budget limiter (daily/monthly limits, provider rate fallback).
- Complete Admin Operational Console.

### Slice G: Comprehensive Verification, Acceptance Test Suite & Morning Handover
- Execute unit and integration test suite covering all 13 required journeys.
- Verify existing 9 verification checks continue to pass.
- Browser test all synthetic personas and flows.
- Generate `MORNING_HANDOVER.md` and complete documentation suite in `docs/`.
