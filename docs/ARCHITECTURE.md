# Lood-edu (LoopEdu) System Architecture

**Prepared for:** Blocks and Loops Technologies Pvt Ltd  
**Version:** 1.0 (Overnight Implementation Complete)  
**Target Domain:** [loopedu.in](https://loopedu.in) / [itappens.ai](https://itappens.ai)  

---

## 1. Executive Overview

Lood-edu is an India-focused career exploration, competitive examination, and education companion designed specifically for:
1. **Students in Classes 10–12 and their Parents** (Academic stream selection, entrance examinations, college affordability, backup pathways).
2. **Adult Recruitment Aspirants** (Banking, Railway Recruitment Boards, Staff Selection Commission, Civil Services).

### Core Architectural Principles
- **Evidence-First Guidance:** Every deadline, eligibility rule, and syllabus claim references authoritative gazette notifications or official primary portals (`.gov.in`, `.nic.in`, `.ac.in`).
- **Deterministic Non-AI Core:** Eligibility rules, cutoff dates, fee totals, test grading, and entitlement logic run strictly in deterministic TypeScript code, never in probabilistic LLM outputs.
- **Strict Privacy Invariants:** Wellness reflections (Mind Coach) are strictly isolated from parents, counsellors, and advertisers. Under-18 accounts are 100% ad-free. No student lead generation or behavioural tracking.
- **Dual Execution Modes:** Isolated synthetic DEMO mode requiring zero credentials vs. LIVE production mode.

---

## 2. High-Level System Topology

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT SURFACES                                   |
|   +-----------------------+   +------------------------+   +-------------------+  |
|   |   Student & Parent    |   |  Adult Aspirant Hub    |   | Editorial Console |  |
|   |  (/today, /paths,     |   | (/exams, /prepare,     |   |     (/admin)      |  |
|   |   /coach, /parent)    |   |  /updates, /settings)  |   |                   |  |
|   +-----------+-----------+   +-----------+------------+   +---------+---------+  |
|               |                           |                          |            |
+---------------+---------------------------+--------------------------+------------+
                                            | HTTPS
+-------------------------------------------v---------------------------------------+
|                        NEXT.JS 14 MODULAR MONOLITH (APP ROUTER)                   |
|                                                                                   |
|  [Demo Context & Persona Switcher]  [SSRF Guard]  [HMAC Signature Verifier]       |
|                                                                                   |
|  +--------------------+  +---------------------+  +----------------------------+  |
|  | Eligibility Engine |  | 3-Path Evaluator    |  | Availability-Aware Planner |  |
|  | - AST Declarative  |  | - Prereq Matching   |  | - Spaced Repetition Vault  |  |
|  | - Category Relax.  |  | - Cost Unbundling   |  | - Zero-Guilt Rest Days     |  |
|  +--------------------+  +---------------------+  +----------------------------+  |
|                                                                                   |
|  +--------------------+  +---------------------+  +----------------------------+  |
|  | Mind Coach Engine  |  | Daily Briefing Hub  |  | Subscription & Entitlements|  |
|  | - Statutory MANAS  |  | - 3-min digest      |  | - Explore / Guide / Prepare|  |
|  | - Crisis Triggers  |  | - Outbox Ledger     |  | - Webhook Idempotency      |  |
|  +--------------------+  +---------------------+  +----------------------------+  |
|                                                                                   |
|  [AI Provider Abstraction: OpenAI (Primary) | NVIDIA NIM (Secondary) | Fallback]  |
+-------------------------------------------+---------------------------------------+
                                            |
         +----------------------------------+----------------------------------+
         |                                                                     |
+--------v------------------------------+             +------------------------v----+
|     PERSISTENCE & AUTH LAYER          |             |    EXTERNAL INTEGRATIONS    |
|  - Supabase / Postgres 15 (RLS)       |             |  - Razorpay Subscriptions   |
|  - Deterministic In-Memory Store      |             |  - Resend Email Outbox      |
|  - Webhook Idempotency Ledger         |             |  - Primary Statutory Portals|
+---------------------------------------+             +-----------------------------+
```

---

## 3. Subsystem Architecture

### 3.1. Unified Navigation Model
The application provides a unified, mobile-first navigation structure responsive at 360px:
- **Today (`/today`)**: Daily focused action, task checklist, and next revision priority.
- **My Paths (`/paths`)**: 3-pathway generator, unbundled fee comparison, backup routes, and counsellor review queue.
- **Exams & Opportunities (`/exams`)**: Canonical catalog, AST declarative eligibility engine, and live amendment simulator.
- **Prepare (`/prepare`)**: Diagnostic testing drills, progressive Socratic hints, and spaced repetition mistake notebook.
- **Updates (`/updates`)**: Primary gazetted notice feed, 3-minute Daily Briefing, and outbox delivery manager.
- **Mind Coach (`/coach`)**: Bounded non-clinical check-in, 25/5 Pomodoro focus timer, private reflection journal, and statutory crisis directory.
- **Parent Hub (`/parent`)**: Scoped overview of study progress with complete wellness isolation.
- **Settings (`/settings`)**: Profile, privacy consent ledger, formula-sanitized exports, and billing entitlements.
- **Editorial Console (`/admin`)**: Subject banks, question editor, source registry, AI budget telemetry, and feature flags.

### 3.2. Declarative Eligibility Engine
The eligibility engine evaluates candidate profiles against published rules using a typed Abstract Syntax Tree (AST):
- **Deterministic Evaluation:** Evaluates subject prerequisites (e.g. Maths Standard vs Basic), maximum age, educational qualifications, and statutory category relaxations (SC/ST/OBC/EWS).
- **Three-State Logic:** Every evaluation returns `eligible`, `ineligible`, or `unknown_missing_inputs` (preventing assumptions when evidence is incomplete).
- **Audit Trace:** Every evaluation includes the exact rule version, cycle ID, and statutory gazette citation.

### 3.3. Multi-Stage Editorial Pipeline
Content moves through a 7-stage state machine:
```
[Discovered] -> [Extracted Draft] -> [Evidence Checked] -> [Consistency Checked] -> [Application Reviewed] -> [Approved] -> [Published]
```
- **Dual Authorization Invariant:** Author and Reviewer must be distinct cryptographic identities. An editor cannot self-approve.
- **AI Summary Isolation:** Model-generated summaries remain strictly labeled "Draft" until verified by human reviewers.

### 3.4. Bounded Mind Coach & Crisis Guardrails
- **Non-Clinical Boundary:** Expressly does not provide medical diagnosis or therapy. Focuses on focus routines, study stress, and setbacks.
- **Statutory Crisis Support:** Keyword triggers automatically present official Government of India helplines:
  - **Tele-MANAS:** `14416` / `1800-891-4416` (24x7 toll-free)
  - **KIRAN:** `1800-599-0019`
  - **Childline:** `1098`
- **Wellness Privacy Invariant:** Reflections are encrypted and strictly prohibited from parent or counsellor retrieval.

### 3.5. Subscriptions & Webhook Idempotency
- **Tiers:** Explore (Free), Guide (₹199/mo or ₹1,499/yr), Prepare (₹399/mo or ₹2,999/yr), and Modular Subject Pass (₹299/mo).
- **HMAC SHA256 Signature Verification:** Rejects unauthenticated or tampered payloads.
- **Idempotency Ledger:** Rejects duplicate replay attacks or out-of-order events.
- **Graceful Cancellation:** Access continues until period expiration without retroactive charges.

---

## 4. Security & Compliance Controls
1. **SSRF Defense:** External URL crawler strictly blocks loopback (`127.0.0.1`), RFC 1918 private subnets (`10.x`, `172.16-31.x`, `192.168.x`), and cloud instance metadata endpoints (`169.254.169.254`). Payloads bounded at 2MB with 5s timeout.
2. **Formula Injection Sanitization (CWE-1236):** All CSV personal data exports neutralize dangerous spreadsheet formula prefixes (`=`, `+`, `-`, `@`, `\t`, `\r`) by prepending a single quote.
3. **AI Cost Controls:** Daily spend cap (₹500/day) and monthly budget cap (₹12,000/month) enforced at the application layer with zero-cost deterministic fallback.
4. **Child Safety:** Under-18 accounts are completely ad-free. No behavioral tracking SDKs.
