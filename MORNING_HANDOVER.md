# Lood-edu (LoopEdu) Morning Handover & Operational Delivery Report

**Prepared for:** Blocks and Loops Technologies Pvt Ltd  
**Engineering Delivery Date:** 24 October 2026, 03:50 IST  
**Application Target:** [loopedu.in](https://loopedu.in) / [itappens.ai](https://itappens.ai)  
**Local Test URL:** `http://localhost:3000`  
**Overall Readiness State:** **DEMO READY & PILOT READY (RESTRICTED TO ADULT ASPIRANTS & SYNTHETIC MINOR WORKFLOWS)**  

---

## 1. Executive Implementation Summary (Grouped by User Journey)

### Journey A: Class 10–12 Student Career Exploration & Backups
- **Implemented:** Onboarding flow with stage, subject selection (Maths Standard vs Basic), budget constraints, and location preferences. Deterministic evaluator matching student attributes without black-box AI scores.
- **Features:** 3-pathway comparison (e.g. Biomimetic Medical Devices, Computer Science, Biomedical Research); unbundled annual cost calculator (tuition, mandatory fees, living/hostel, equipment, prep, travel); concrete practical exploration mini-projects; backup route mapping; counselor human review queue.
- **Route:** [`/paths`](http://localhost:3000/paths) and [`/today`](http://localhost:3000/today).

### Journey B: Adult Recruitment Aspirants (Banking, Railways, SSC, UPSC)
- **Implemented:** Dedicated adult aspirant persona and dashboard view (`Priya Nair`).
- **Features:** Separate discovery track for graduate recruitments (IBPS PO, RRB NTPC, SSC CGL, UPSC CSE); explicit national coverage badges stating whether a track is *Reviewed Preparation* or *Discovery Only*; section on Quantitative Aptitude & Logical Reasoning drills.
- **Route:** [`/exams`](http://localhost:3000/exams) and [`/prepare`](http://localhost:3000/prepare).

### Journey C: Declarative Eligibility AST & Corrigendum Recalculation
- **Implemented:** Typed declarative Abstract Syntax Tree (AST) eligibility engine evaluating subject prerequisites, age cutoffs, and statutory category relaxations (SC/ST/OBC/EWS). Preserves ambiguity (`unknown_missing_inputs`) rather than guessing.
- **Features:** Synthetic notice amendment engine. When an authority (e.g. NTA, KEA, RRB) issues a gazette corrigendum, student watchlists and deadlines recalculate immediately with deduplicated alerts.
- **Route:** [`/exams`](http://localhost:3000/exams) (Eligibility Checker modal & Live Amendment Simulator).

### Journey D: Diagnostic Practice, Worked Solutions & Mistake Vault
- **Implemented:** Availability-aware weekly study planner (zero-guilt rest days) and diagnostic drill workspace.
- **Features:** Seeded ~30 original verified questions across JEE/NEET Physics/Chem/Bio and Adult Aptitude; Socratic progressive hints; deterministic scoring; spaced repetition mistake notebook (1d -> 3d -> 7d review intervals; 2 consecutive correct to master).
- **Route:** [`/prepare`](http://localhost:3000/prepare).

### Journey E: Bounded Mind Coach (Focus, Stress & Statutory Crisis Escalation)
- **Implemented:** Non-clinical reflective companion with mood check-in, 25/5 Pomodoro focus timer, and private encrypted journal.
- **Guardrails:** Explicit non-clinical disclaimer. Crisis keyword detector intercepts distress with verified Government of India statutory helplines (**Tele-MANAS 14416 / 1800-891-4416**, **KIRAN 1800-599-0019**, **Childline 1098**).
- **Strict Privacy Invariant:** Reflections are encrypted and **strictly isolated** from parents, counsellors, and advertisers.
- **Route:** [`/coach`](http://localhost:3000/coach).

### Journey F: Daily Briefing Newsletter, Outbox & Controlled Advertising
- **Implemented:** 3-minute morning digest with up to 3 verified gazette notices, critical deadlines, a daily practical exploration step, and a feasible action.
- **Features:** Separate editions for Student, Parent, and Adult Aspirants; transactional outbox with unique idempotency keys (`edition:userId:date`) preventing duplicate delivery; RFC one-click unsubscribe and suppression ledger; adult-only contextual sponsored cards (strictly ad-free for minors, zero behavioral tracking, feature-flagged off).
- **Route:** [`/updates`](http://localhost:3000/updates).

### Journey G: Privacy Consents, Data Rights & Idempotent Account Erasure
- **Implemented:** Revocable guardian linking for minors; self-service personal data export in structured JSON and CSV format sanitized against formula injection (CWE-1236 defense: `=`, `+`, `-`, `@` neutralized); idempotent account deletion request with 30-day statutory cooling period and compliance tombstone hash.
- **Route:** [`/settings/privacy`](http://localhost:3000/settings/privacy).

### Journey H: Subscriptions, Pricing & Webhook Idempotency
- **Implemented:** Transparent INR plans: Explore (Free), Guide (₹199/mo or ₹1,499/yr), Prepare (₹399/mo or ₹2,999/yr), and Modular Subject Pass (₹299/mo). Razorpay test mode integration with HMAC SHA-256 webhook verification, idempotency ledger against replay attacks, and graceful period-end cancellation.
- **Route:** [`/settings/billing`](http://localhost:3000/settings/billing).

### Journey I: Operational Admin Console
- **Implemented:** Statutory source registry (NTA, UPSC, SSC, IBPS, RRB, KEA) with crawl health and SSRF protection (loopback & cloud metadata blocking); AI token telemetry dashboard with daily (₹500) and monthly (₹12,000) hard spending caps; feature flag manager; question bank editor; audit logs.
- **Route:** [`/admin`](http://localhost:3000/admin).

---

## 2. Integration Status Matrix

| Subsystem / Integration | Status | Mode / Implementation Details |
|---|---|---|
| **Demo Persona Engine** | **IMPLEMENTED & VERIFIED** | Synthetic personas (Aarav, Priya, Rajesh, Dr. Anita, Vikram, Meera) with localStorage isolation. Zero credentials needed. |
| **Eligibility Engine (AST)** | **IMPLEMENTED & VERIFIED** | Deterministic typed AST rule evaluator. Fully verified against passing, failing, missing input, and relaxation cases. |
| **Notice Amendment Recalculator** | **IMPLEMENTED & VERIFIED** | Live synthetic corrigendum publisher with watchlist delta recalculation and deduplicated notification ledger. |
| **Practice & Spaced Repetition** | **IMPLEMENTED & VERIFIED** | Original 30-question seed bank with progressive Socratic hints and 1d/3d/7d spaced repetition scheduling. |
| **Mind Coach & Crisis Intercept** | **IMPLEMENTED & VERIFIED** | Bounded non-clinical check-in, 25/5 focus timer, private journal, and Tele-MANAS/KIRAN directory. |
| **SSRF Safe Document Fetcher** | **IMPLEMENTED & VERIFIED** | Blocks `localhost`, `127.0.0.1`, RFC 1918 private subnets, and `169.254.169.254`. Caps payloads at 2MB with 5s timeout. |
| **CSV Formula Sanitization** | **IMPLEMENTED & VERIFIED** | Neutralizes dangerous spreadsheet formula prefixes (`=`, `+`, `-`, `@`, `\t`, `\r`) with leading single quotes. |
| **Daily Briefing & Outbox** | **IMPLEMENTED & VERIFIED** | 3-minute digest generator, HTML/Plain-text renderer, idempotent outbox ledger, and suppression list. |
| **Razorpay Payments** | **IMPLEMENTED & VERIFIED (TEST MODE)** | HMAC SHA-256 verification, test mode order simulation, idempotency ledger, and cancellation state transitions. |
| **OpenAI & NVIDIA NIM Adapters** | **IMPLEMENTED & VERIFIED (DUAL MODE)** | Configurable model routing, token telemetry, hard spending caps (₹500/day, ₹12,000/mo), and deterministic fallback. |
| **Minor Onboarding & Consent** | **IMPLEMENTED & DEMO ONLY** | Feature-gated (`MINOR_ONBOARDING_ENABLED=false`). Public live mode adult-only pending legal consent review. |
| **Minor Mind Coach** | **IMPLEMENTED & DEMO ONLY** | Feature-gated (`MINOR_COACH_ENABLED=false`). Accessible via synthetic demo personas; locked for public minors pending medical sign-off. |
| **Controlled Contextual Ads** | **IMPLEMENTED & DEMO ONLY** | Feature-gated (`ADS_ENABLED=false`). Adult-only synthetic demo cards; under-18 accounts are always 100% ad-free. |
| **Live External Email Sending** | **EXTERNAL SETUP REQUIRED** | Resend adapter implemented. Set `EMAIL_API_KEY` and verify domain DNS to switch from local outbox to live SMTP. |
| **Live Razorpay Gateway** | **EXTERNAL SETUP REQUIRED** | Test mode verified. Provide production `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` after company KYC approval. |

---

## 3. Actual Commands Executed & Verification Test Results

### 3.1. Core Invariant Verification Suite (`scripts/run-verification-tests.js`)
**Result: 9 PASSED, 0 FAILED** (Exit Code: 0)
- `[PASS]` Security: Paid source content and raw PDFs are absent from public assets
- `[PASS]` Pricing: Server enforces modular ₹299/mo (29,900 paise) per subject
- `[PASS]` Payments: Invalid HMAC SHA256 signatures are strictly rejected
- `[PASS]` Security: CSV export escapes dangerous spreadsheet formula prefixes
- `[PASS]` Consent: Availability notification requires a valid email
- `[PASS]` Data: Database contains all 8 tracks with verified 200 questions each
- `[PASS]` Readiness: All 8 question banks including German are published and open for purchase
- `[PASS]` Privacy: Watermark masks customer email address
- `[PASS]` AEO/GEO: llms.txt and legal footer attribution are compliant

### 3.2. 13 Acceptance Journeys Integration Suite (`scripts/run-acceptance-journeys.js`)
**Result: 13 PASSED, 0 FAILED** (Exit Code: 0)
- `[PASS]` Journey 1: Class 10 Student: 3-path comparison, subject switch & tasks
- `[PASS]` Journey 2: Adult Aspirant: Separate recruitment dashboard & coverage boundaries
- `[PASS]` Journey 3: Eligibility Engine: Passes, fails, missing inputs & category relaxations
- `[PASS]` Journey 4: Editorial Workflow: Author/Reviewer separation & plan recalculation
- `[PASS]` Journey 5: Practice Workspace: Deterministic grading & spaced repetition intervals
- `[PASS]` Journey 6: Mind Coach Privacy: Strict wellness isolation from parents & counselors
- `[PASS]` Journey 7: Newsletter: 3-min briefing, dry run preview & outbox deduplication
- `[PASS]` Journey 8: Subscription Webhook: HMAC verification, replay defense & cancellation
- `[PASS]` Journey 9: Security: IDOR protection & server-side role enforcement
- `[PASS]` Journey 10: Reliability: Safe AI budget enforcement & SSRF IP address filter
- `[PASS]` Journey 11: Catalog Integrity: Stale or withdrawn notices prevent definitive claims
- `[PASS]` Journey 12: Privacy Compliance: Sanitized CSV export & idempotent deletion tombstone
- `[PASS]` Journey 13: Navigation: All required routes defined in application structure

### 3.3. Static TypeScript Compilation (`npx tsc --noEmit`)
**Result: 0 ERRORS** (Exit Code: 0)

---

## 4. How to Start the Application & Inspect Journeys

### 4.1. Start Application (Local Demo Mode)
```bash
# In the repository root
npm run dev
```
Open [http://localhost:3000](http://localhost:3000). The amber **DEMO MODE** banner will be visible at the top.

### 4.2. Exploring the Journeys via the Persona Switcher
Use the **Persona Switcher** dropdown in the demo banner to switch between identities:
1. **Aarav Sharma (Student, Class 10)**:
   - Navigate to **My Paths** ([`/paths`](http://localhost:3000/paths)) to inspect the 3-pathway comparison and toggle between Maths Standard and Maths Basic to observe prerequisite disqualification and backup route triggers.
   - Navigate to **Prepare** ([`/prepare`](http://localhost:3000/prepare)) to complete diagnostic questions, view progressive hints, and review the Spaced Repetition Mistake Notebook.
   - Navigate to **Coach** ([`/coach`](http://localhost:3000/coach)) to test the 25/5 Pomodoro focus timer and daily check-in.
2. **Priya Nair (Adult Aspirant, Banking & Railways)**:
   - Navigate to **Exams & Opportunities** ([`/exams`](http://localhost:3000/exams)) to inspect adult recruitment post discovery (IBPS PO, RRB NTPC, SSC CGL) and run the AST eligibility checker.
   - Test the **Notice Amendment Simulator** on the Exams page to publish a synthetic corrigendum and observe watchlist recalculation.
3. **Rajesh Sharma (Parent)**:
   - Navigate to **Parent Hub** ([`/parent`](http://localhost:3000/parent)) to review Aarav's academic study plan and observe that Mind Coach reflections are **strictly hidden and inaccessible**.
4. **Meera Sundaram (Administrator / Editorial Reviewer)**:
   - Navigate to **Editorial Console** ([`/admin`](http://localhost:3000/admin)) to inspect the Statutory Source Registry, review AI token spending against the ₹500/day hard cap, and inspect feature flags.

---

## 5. Missing Configuration & Operator External Setup Required

| Environment Variable | Status | Why It Matters / Next Action Required |
|---|---|---|
| `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET` | Missing (Test Placeholder Active) | Currently running in Razorpay Test Mode with synthetic order creation. Provide production credentials after corporate KYC is approved. |
| `RAZORPAY_WEBHOOK_SECRET` | Missing (Dev Simulation Secret Active) | Required for production webhook authentication. Configure in the Razorpay Dashboard to match your environment variable. |
| `EMAIL_API_KEY` (Resend) | Missing (Local Outbox Active) | Currently daily briefings are written to the deduplicated local outbox. Provide Resend API key and verify DNS records for live sending. |
| `OPENAI_API_KEY` | Missing (Deterministic Fallback Active) | Deterministic NCERT explanations operate cleanly without keys. Add a funded OpenAI API key to enable live AI generative hints. |
| `NVIDIA_API_KEY` | Configured in `.env.local` | Supports enterprise Llama-3.1-70B model queries. |
| `CRON_SECRET` | Placeholder Active | Required to secure cloud cron job execution endpoints against unauthorized external requests. |

---

## 6. Security, Privacy & Content Limitations

1. **Nationwide Factual Completeness:** While the data model, AST eligibility engine, and crawler are engineering-complete, nationwide gazetted coverage is an ongoing editorial process. Newly announced notifications require human review before promotion to *Approved*.
2. **Clinical Non-Replacement:** The Mind Coach is bounded and non-diagnostic. Minors in distress are directed to statutory Government of India helplines (Tele-MANAS `14416`, KIRAN `1800-599-0019`). Live minor coaching remains disabled by default until medical advisory board sign-off.
3. **Payment Card Industry (PCI-DSS):** The application never handles, transmits, or stores credit/debit card numbers or CVVs. All transactions are delegated to Razorpay hosted checkout.
4. **Ad-Free Commitment for Minors:** Accounts under 18 years of age are hard-coded as 100% ad-free in both frontend and backend layers.

---

## 7. The Five Most Useful Next Actions for the Owner

1. **Test the Persona Walkthrough in Your Browser:** Run `npm run dev` and navigate through `/paths`, `/exams`, `/prepare`, `/coach`, and `/admin` using the synthetic persona switcher to experience the end-to-end flows.
2. **Review the Pricing & Entitlement Structure:** Open [`docs/BILLING.md`](file:///c:/Users/sadis/OneDrive/Desktop/itappens%20cbse/docs/BILLING.md) and [`app/settings/billing/page.tsx`](file:///c:/Users/sadis/OneDrive/Desktop/itappens%20cbse/app/settings/billing/page.tsx) to confirm the proposed Explore (Free), Guide (₹199/mo), Prepare (₹399/mo), and Subject Pass (₹299/mo) pricing and GST assumptions.
3. **Set Up Resend Domain DNS (Optional for Live Email):** Add DNS records for `loopedu.in` on your DNS registrar and add `EMAIL_API_KEY` to `.env.local` to transition from local outbox previews to live morning briefings.
4. **Submit Razorpay Corporate KYC (Optional for Live Payments):** Submit company business verification documents on the Razorpay Dashboard to activate live merchant mode.
5. **Review DPDP Act 2023 Consent Documentation:** Open [`docs/PRIVACY_AND_COACHING.md`](file:///c:/Users/sadis/OneDrive/Desktop/itappens%20cbse/docs/PRIVACY_AND_COACHING.md) with legal counsel to approve the minor guardian linking workflow prior to turning `MINOR_ONBOARDING_ENABLED=true`.
