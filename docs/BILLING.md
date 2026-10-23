# Lood-edu Billing, Subscriptions & Entitlements

**Prepared for:** Blocks and Loops Technologies Pvt Ltd  
**Version:** 1.0  
**Currency:** Indian Rupee (INR) & Minor Units (Paise)  

---

## 1. Subscription Tiers & Pricing Model

All pricing is presented transparently in Indian Rupees (INR) with explicit daily AI query allowances and no unbounded claims.

### 1.1. Plan Matrix
| Tier | Monthly (INR) | Annual (INR) | Monthly Paise | Key Entitlements | Target Audience |
|---|---|---|---|---|---|
| **Explore** | **₹0** | **₹0** | `0` | 3 watchlist exams, national discovery, deterministic eligibility, general briefing | Public discovery |
| **Guide** | **₹199** / mo | **₹1,499** / yr | `19900` | 10 watchlist exams, 3-pathway generator, unbundled fee calculator, personalized briefing, 25 AI queries/day | Class 10–12 decision makers |
| **Prepare** | **₹399** / mo | **₹2,999** / yr | `39900` | 25 watchlist exams, diagnostic drills, spaced repetition mistake notebook, weekly planner, 60 AI queries/day | Intensive entrance aspirants |
| **Subject Pass** | **₹299** / mo | **₹999** / yr | `29900` | 200+ NCERT questions for chosen CBSE subject, flashcards, solution breakdowns | Single-subject mastery |

*Tax Treatment:* Operator configurable. Default display: Net price + 18% GST (e.g. ₹199 monthly breaks down to ₹168.64 net + ₹30.36 GST).

---

## 2. Payment Gateway Integration (Razorpay Test Mode)

Lood-edu integrates Razorpay via standard server-side APIs:
- **Test Mode Operation:** When running without production keys (`RAZORPAY_KEY_ID` set to test credentials or placeholder), payments operate in synthetic test mode with zero cardholder risk.
- **Adult Payer Requirement:** Minors (< 18) are prohibited from submitting card/UPI details directly; payment flows must be completed by a verified parent or adult guardian.

### 2.1. Webhook Signature Verification
Every incoming Razorpay webhook payload is cryptographically validated using HMAC SHA-256 before processing:

```typescript
const expectedSignature = crypto
  .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
  .update(rawBody)
  .digest('hex');

if (expectedSignature !== signature) {
  return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
}
```

### 2.2. Webhook Idempotency Ledger
To prevent replay attacks and duplicate subscription activations:
1. Every event ID (`event.id`) and payload hash are recorded in the `webhook_events` ledger.
2. If an event ID has already been recorded as processed, the endpoint returns HTTP 200 immediately with `{ duplicate: true }` without re-granting entitlements or double-charging.
3. Out-of-order event sequences (e.g. `payment.captured` received after `subscription.cancelled`) are reconciled against the current period timestamp.

---

## 3. Subscription State Machine & Cancellation

```
[pending] ───(auth success)───► [authorised] ───(captured)───► [active]
                                                                  │
                                   ┌──────────────────────────────┤
                                   ▼                              ▼
                           [cancelled]                       [past_due]
                      (Access remains active                      │
                     until period end expires)                    ▼
                                   │                          [expired]
                                   ▼
                               [expired]
```

### 3.1. Cancellation Policy
- Users can cancel recurring subscriptions at any time via Account Settings (`/settings/billing`).
- Cancellation takes effect **at the end of the paid billing period**. The student retains full access to paid features until the expiration date.
- No retroactive fees or penalty charges are assessed.

### 3.2. Refund Policy
- When a refund is processed via the Razorpay dashboard, the `refund.processed` webhook event triggers entitlement revocation and logs an entry in the administrative audit log.
