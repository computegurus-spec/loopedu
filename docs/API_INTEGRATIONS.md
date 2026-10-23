# Lood-edu External API Integrations Specification

**Prepared for:** Blocks and Loops Technologies Pvt Ltd  
**Version:** 1.0  
**Audit Date:** October 2026  

---

## 1. Consulted Official Documentation & Specifications

| Provider | Service Scope | Official Reference | Verification Date |
|---|---|---|---|
| **Razorpay** | Orders, Subscriptions, Webhooks (HMAC SHA-256) | [Razorpay Official API Docs](https://razorpay.com/docs/api/) | October 2026 |
| **OpenAI** | Chat Completions & Structured Outputs (`gpt-4o-mini`, `gpt-4o`) | [OpenAI API Reference](https://platform.openai.com/docs) | October 2026 |
| **NVIDIA NIM** | Llama 3.1 70B Instruct microservice | [NVIDIA API Catalog](https://build.nvidia.com) | October 2026 |
| **Supabase** | PostgreSQL 15, Row-Level Security, Auth session cookies | [Supabase JavaScript Reference](https://supabase.com/docs) | October 2026 |
| **Resend** | Transactional email dispatches & Webhook events | [Resend Documentation](https://resend.com/docs) | October 2026 |

---

## 2. Integration Capabilities & Dual-Mode Behavior

### 2.1. Razorpay Payment Gateway
- **Implemented Capabilities:**
  - Standard order creation: ₹299 (29,900 paise) modular subject pass.
  - Subscription creation: Guide (₹199/mo or ₹1,499/yr) and Prepare (₹399/mo or ₹2,999/yr).
  - Raw webhook verification with HMAC SHA-256.
  - Deduplicated idempotency ledger preventing replay attacks.
  - Automatic entitlement revocation upon `refund.processed`.
- **DEMO Mode Behavior:** Simulated order IDs (`order_sim_...`), test signatures (`sim_sig_...`), zero cardholder transactions.
- **LIVE Mode Behavior:** Initializes official Razorpay SDK client with `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`. Rejects missing secrets with an actionable configuration error.

### 2.2. AI Providers (OpenAI & NVIDIA NIM)
- **Implemented Capabilities:**
  - Socratic progressive hints for diagnostic practice problems.
  - Non-clinical reflection support in Mind Coach.
  - Exploratory interdisciplinary career pathway brainstorming.
  - Hard daily spend cap (₹500/day) and monthly cap (₹12,000/month).
- **DEMO Mode Behavior:** Delivers verified NCERT standard explanations and deterministic career fit algorithms without incurring API token costs.
- **LIVE Mode Behavior:** Dispatches requests to configured OpenAI API or NVIDIA NIM endpoints with token telemetry and spending tracked in `lib/ai/budgetTracker.ts`.

### 2.3. Transactional Email & Daily Briefing (Resend Adapter)
- **Implemented Capabilities:**
  - 3-minute Daily Briefing HTML and Plain-Text rendering.
  - Outbox queue with unique idempotency keys (`edition:userId:date`).
  - RFC-compliant one-click unsubscribe token generator and suppression list.
- **DEMO Mode Behavior:** Saves dispatches to in-app transactional outbox (`/updates`) for instant inspection without external network calls.
- **LIVE Mode Behavior:** Calls Resend transactional API when `EMAIL_SENDING_ENABLED=true` and `EMAIL_API_KEY` is present.
