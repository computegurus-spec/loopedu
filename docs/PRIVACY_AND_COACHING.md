# Lood-edu Privacy Architecture & Mind Coach Safeguards

**Prepared for:** Blocks and Loops Technologies Pvt Ltd  
**Version:** 1.0  
**Legal Basis:** Digital Personal Data Protection (DPDP) Act 2023 & Indian Statutory Norms  

---

## 1. Privacy Philosophy & Data Minimization

Lood-edu operates under strict data minimization:
1. **No Forced Disclosures:** Browsing national exams, career pathways, and curriculum guides never requires a phone number, Aadhaar number, or household income disclosure.
2. **No Inferred Sensitive Attributes:** The system never infers or algorithmically guesses caste, religion, physical disability, or socio-economic hardship. Sensitive attributes are collected solely when an explicit statutory reservation rule requires verification and the applicant voluntarily provides it.
3. **Zero Lead Generation or Selling:** Student contact data is never packaged, aggregated, or sold to coaching institutes, private universities, or education brokers.

---

## 2. Bounded Mind Coach & Safeguards

The Mind Coach is an opt-in reflective tool designed to support daily focus routines, study planning, setback recovery, and ordinary exam stress.

### 2.1. Non-Clinical Boundary Invariant
- **Express Disclaimer:** The Mind Coach is not a healthcare provider, does not perform psychological diagnosis, does not prescribe medication, and does not replace qualified psychiatrists, clinical psychologists, or licensed counsellors.
- **Language Boundaries:** Prompts avoid dependency-building phrases, clinical labels, or promises of therapeutic treatment.

### 2.2. Statutory Crisis Support Escalation
The engine continuously monitors incoming messages for crisis keywords (e.g., self-harm, suicidal ideation, severe hopelessness). When detected, the conversation is immediately intercepted with verified statutory Government of India helplines:

| Service Name | Official Number | Operating Hours | Ministry / Authority |
|---|---|---|---|
| **Tele-MANAS** | `14416` / `1800-891-4416` | 24x7 (Toll-Free, Multilingual) | Ministry of Health & Family Welfare |
| **KIRAN Helpline** | `1800-599-0019` | 24x7 (Toll-Free) | Ministry of Social Justice & Empowerment |
| **Childline India** | `1098` | 24x7 (Emergency Child Assistance) | Ministry of Women & Child Development |

*No fabricated, expired, or non-functional telephone numbers are ever presented.*

### 2.3. Strict Wellness Isolation Invariant
- **Parent / Counsellor Wall:** Linked parents, legal guardians, and school counsellors can review study plans, exam watchlists, and practice task completion. They are **strictly prohibited** from viewing or querying raw Mind Coach check-ins, journal reflections, or mood scores.
- **Database & RLS Enforcement:** Even if a parent or counsellor account is authenticated, database row-level security and server-side resolvers filter out wellness records at the query boundary.
- **Export Isolation:** Mind Coach entries are excluded from general account exports to prevent accidental disclosure when parents review academic archives.

---

## 3. Guardian Linking & Minor Consent Ledger

For applicants under 18:
1. **Explicit Guardian Linking:** A minor user can send a scoped invite to a parent/guardian.
2. **Permission Scoping:** Guardian permissions are granular (e.g., `viewStudyPlans`, `viewPracticeProgress`).
3. **Revocability:** Guardian links can be revoked by the student or guardian at any time from the settings portal.
4. **Consent Ledger:** Every grant and withdrawal is logged with a salted cryptographic hash of the client network context (preventing raw IP retention).

---

## 4. Self-Service Data Rights & Erasure

### 4.1. Formula-Sanitized Data Export (CWE-1236 Defense)
When exporting student task logs and question histories to CSV:
- Any cell value beginning with dangerous spreadsheet formula triggers (`=`, `+`, `-`, `@`, `\t`, `\r`) is neutralized by prepending a single quote (`'`).
- Prevents remote command execution or malicious CSV payload execution when opened in Microsoft Excel or Google Sheets.

### 4.2. Idempotent Account Deletion
- A user can trigger a self-service account deletion request.
- The request enters a 30-day statutory cooling period during which all active logins are revoked.
- An immutable cryptographic tombstone (`sha256(userId + timestamp)`) is recorded in the compliance audit ledger.
- Duplicate deletion requests return the existing scheduled tombstone rather than duplicating records.
