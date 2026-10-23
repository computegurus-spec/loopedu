# Lood-edu Pre-Flight Release Checklist

**Prepared for:** Blocks and Loops Technologies Pvt Ltd  
**Version:** 1.0 (Overnight Implementation Complete)  
**Release Readiness:** **DEMO READY & PILOT READY (RESTRICTED)**  

---

## 1. Statutory Invariant & Gate Matrix

| Category | Invariant Check | Status | Verification Method |
|---|---|---|---|
| **Security** | Paid source content & raw PDFs absent from public web root | **PASS** | `run-verification-tests.js` (Test 1) |
| **Pricing** | Server enforces modular ₹299/mo (29,900 paise) per subject pass | **PASS** | `run-verification-tests.js` (Test 2) |
| **Payments** | Tampered or forged HMAC SHA-256 webhook signatures rejected | **PASS** | `run-verification-tests.js` (Test 3) |
| **Security** | Dangerous spreadsheet formula prefixes neutralized in CSV export (CWE-1236) | **PASS** | `run-verification-tests.js` (Test 4) |
| **Privacy** | Watermark masks customer email address on curriculum materials | **PASS** | `run-verification-tests.js` (Test 8) |
| **AEO / GEO** | `llms.txt` and legal footer attribution (Blocks and Loops) compliant | **PASS** | `run-verification-tests.js` (Test 9) |
| **Journeys** | All 13 core student, adult, parent, editor, and admin journeys verified | **PASS** | `run-acceptance-journeys.js` (13/13) |
| **Types** | TypeScript static compiler verification clean | **PASS** | `npx tsc --noEmit` (Exit Code 0) |

---

## 2. Feature Flag Operational State

| Feature Flag | Operational Value | Rationale / Prerequisite |
|---|---|---|
| `APP_MODE` | `demo` (Default) | Operates seamlessly without external database or gateway credentials. |
| `MINOR_ONBOARDING_ENABLED` | `false` | Public live flow restricted to adult aspirants until guardian consent legal review. |
| `MINOR_COACH_ENABLED` | `false` | Minor access to AI Mind Coach requires institutional advisory sign-off. Synthetic demo personas available. |
| `ADS_ENABLED` | `false` | Controlled contextual advertising remains disabled by default. |
| `LIVE_PAYMENTS_ENABLED` | `false` | Operates in Razorpay Test Mode with synthetic token orders until production KYC is finalized. |
| `EMAIL_SENDING_ENABLED` | `false` | Dispatches render to local deduplicated transactional outbox without external SMTP traffic. |

---

## 3. Human & Operational Prerequisites Before Public Launch

The following items are operational responsibilities and cannot be fulfilled solely by automated software builds:
1. **Razorpay Production Account KYC:** Activate live credentials (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`) and configure the webhook URL to `https://loopedu.in/api/webhooks/razorpay`.
2. **Domain DNS & Resend DKIM:** Configure DNS records for `loopedu.in` (SPF, DKIM, DMARC) with Resend for live daily briefing email delivery.
3. **Institutional Legal Sign-Off:** Review the DPDP Act 2023 minor consent workflows with legal counsel before enabling `MINOR_ONBOARDING_ENABLED=true`.
4. **Clinical Advisory Clearance:** Validate Mind Coach conversational prompt guardrails with licensed adolescent psychologists before offering live coaching to minors.
5. **Human Content Review:** Ensure all newly crawled exam notices and eligibility rules are reviewed by distinct authorized editors and reviewers.
