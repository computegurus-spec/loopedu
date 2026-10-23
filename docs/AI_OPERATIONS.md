# Lood-edu AI Operations & Cost Governance

**Prepared for:** Blocks and Loops Technologies Pvt Ltd  
**Version:** 1.0  

---

## 1. Operating Philosophy

AI in Lood-edu serves strictly as an auxiliary educational accelerator, never as an unconstrained decision-maker.

### Non-Negotiable Invariants:
1. **Zero Probabilistic Hallucination for Factual Rights:** Eligibility determination, exam dates, fee breakdowns, statutory quotas, test scores, and subscription billing are computed strictly in deterministic TypeScript code.
2. **Hard Spend Caps:** Spending boundaries are enforced in application code. Provider dashboard alerts alone are not relied upon.
3. **No Raw Sensitive Logging:** User reflections, prompts, and personal identities are stripped or redacted from logs and provider transmissions.

---

## 2. Multi-Provider Architecture

```
                      +-----------------------------+
                      |   Lood-edu Client Request   |
                      +--------------+--------------+
                                     |
                                     v
                      +-----------------------------+
                      |   AI Request Sanitizer      |
                      |   - Strips PII              |
                      |   - Minimizes context       |
                      |   - Checks rate budget      |
                      +--------------+--------------+
                                     |
             +-----------------------+-----------------------+
             |                                               |
             v                                               v
+-------------------------+                     +-------------------------+
|     PRIMARY PROVIDER    |                     |    SECONDARY / FALLBACK |
|   OpenAI (gpt-4o-mini)  |                     |  NVIDIA NIM (Llama 3.1) |
+------------+------------+                     +------------+------------+
             |                                               |
             +-----------------------+-----------------------+
                                     |
                                     v
                      +-----------------------------+
                      |  Deterministic Fallback     |
                      |  (Zero Token / Zero Cost)   |
                      |  NCERT Aligned Answers      |
                      +-----------------------------+
```

### 2.1. Provider Matrix & Supported Models
- **Primary Provider:** OpenAI (`gpt-4o-mini` for hints and short reflections; `gpt-4o` for deep career exploratory synthesis).
- **Secondary Provider:** NVIDIA NIM (`meta/llama-3.1-70b-instruct`) hosted on enterprise endpoints.
- **Offline / Deterministic Fallback:** Built-in NCERT and CBSE-verified solution engine. Automatically engages if provider APIs are unreachable, keys are unconfigured, or daily spend caps are breached.

---

## 3. Rate Cards & Operator Cost Controls

### 3.1. Operator Rate Card (INR per 1,000 Tokens)
| Model Identifier | Prompt / 1K Tokens | Completion / 1K Tokens | Use Case |
|---|---|---|---|
| `gpt-4o-mini` | ₹0.013 | ₹0.052 | Practice hints, daily briefing synthesis |
| `gpt-4o` | ₹0.210 | ₹0.840 | In-depth career project reviews |
| `meta/llama-3.1-70b-instruct` | ₹0.075 | ₹0.075 | High-throughput practice explanations |
| `deterministic_fallback` | ₹0.000 | ₹0.000 | Core NCERT banks, AST rule eligibility |

### 3.2. Budget Caps & Circuit Breakers
- **Daily Spend Cap:** ₹500.00 / day (configurable via `AI_DAILY_BUDGET_INR`).
- **Monthly Spend Cap:** ₹12,000.00 / month (configurable via `AI_MONTHLY_BUDGET_INR`).
- **Enforcement Mechanism:** The `checkAiBudget()` utility intercepts every AI dispatch. If accumulated daily or monthly spend meets or exceeds the cap, the system gracefully delivers deterministic solutions with a clear notice: *"Live AI generation is paused under daily cost controls; delivering verified NCERT standard solution."*

---

## 4. Prompt Injection & SSRF Boundaries

All external documents, web pages, and user inputs are treated as untrusted:
1. **System Prompt Isolation:** System instructions are isolated from user-supplied texts.
2. **Evidence ID Validation:** LLM responses referencing source evidence must return valid registered Evidence IDs from the catalog; unregistered citations are stripped.
3. **No Dynamic Code / SQL Execution:** Model outputs are strictly rendered as sanitized Markdown; execution of generated SQL, shell scripts, or HTML tags is prohibited.
4. **SSRF Guard:** The crawler verifies all target URLs against loopback, private RFC 1918 subnets, and cloud instance metadata addresses (`169.254.169.254`).
