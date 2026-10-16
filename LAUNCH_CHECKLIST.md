# LoopEdu (loopedu.in) — Production Launch Checklist

> **Company Entity:** Blocks and Loops technologies pvt ltd — Bangalore, Karnataka  
> **Brand & Domain:** LoopEdu • `https://loopedu.in`  
> **Product Architecture:** 15-Minute Daily Habit for School & Competitive Exams  
> **Pricing:** ₹299/mo modular subscription per track  
> **Owner:** Sadish

---

## 🔴 Phase 1: Must-Have for Day 1 Public Launch

- [ ] **1. Domain Acquisition & DNS Configuration**
  - **Provider:** GoDaddy / Hostinger / Cloudflare
  - **Domain:** `loopedu.in`
  - **Action Required:**
    1. Complete domain purchase for `loopedu.in`.
    2. Add DNS records pointing to your hosting provider (Vercel):
       - `CNAME` for `www` -> `cname.vercel-dns.com`
       - `A` Record for root `@` -> `76.76.21.21`

- [ ] **2. Cloud Hosting & Deployment (Vercel Recommended)**
  - **Provider:** [Vercel.com](https://vercel.com/)
  - **Action Required:**
    1. Push current project repository to your private GitHub organization (`blocks-and-loops`).
    2. Import repository into Vercel (framework auto-detected as Next.js 14).
    3. Add custom domain `loopedu.in` in Vercel Project Settings > Domains.
    4. Set production environment variable: `NEXT_PUBLIC_APP_URL=https://loopedu.in`.

- [ ] **3. Razorpay Live Payment Gateway**
  - **Dashboard:** [dashboard.razorpay.com](https://dashboard.razorpay.com/)
  - **Business Entity:** Blocks and Loops technologies pvt ltd
  - **Action Required:**
    1. Complete business KYC verification on Razorpay.
    2. Switch Razorpay Dashboard toggle from **Test Mode** to **Live Mode**.
    3. Generate and copy Live API Keys:
       - `NEXT_PUBLIC_RAZORPAY_KEY_ID`: `rzp_live_...`
       - `RAZORPAY_KEY_SECRET`: `...`
    4. Create Webhook under Razorpay Dashboard > Settings > Webhooks:
       - **Webhook URL:** `https://loopedu.in/api/webhooks/razorpay`
       - **Secret:** Generate a strong random string and add as `RAZORPAY_WEBHOOK_SECRET`.
       - **Active Events:** Check `order.paid`, `payment.captured`, `payment.failed`.

- [x] **4. Production Database Setup (Supabase PostgreSQL - Connected & Verified)**
  - **Status:** ✅ Project active (`oyesvbamjtlqvryaybtd.supabase.co`).
  - **Schema:** All 11 tables & RLS security policies created and verified live.
  - **Diagnostic:** Tested and passing via `scripts/test-supabase.js` and `/api/health/supabase`.

- [x] **5. AI Doubt Coach API Key (Configured & Live Tested)**
  - **Status:** ✅ Active and verified live (`live-openai-ncert-grounded` & Gemini configured).
  - **Environment Variables:** `OPENAI_API_KEY` & `GEMINI_API_KEY` loaded in `.env.local`.
  - **Endpoint Test:** Verified live response on `/api/ai/coach`.

---

## 🟡 Phase 2: User Onboarding & Identity (First 48 Hours)

- [ ] **6. Authentication & Social Sign-In (Auth0 / Google OAuth)**
  - **Option A (Supabase Auth - Recommended for fastest launch):**
    1. Go to Supabase > Authentication > Providers > Google.
    2. Enable Google provider using Google Cloud OAuth Client ID & Secret.
    3. Students & parents can 1-click sign in using their Gmail without passwords.
  - **Option B (Auth0):**
    1. Set up Auth0 Application (Regular Web App).
    2. Configure Allowed Callback URLs: `https://loopedu.in/api/auth/callback`.
    3. Add credentials: `AUTH0_SECRET`, `AUTH0_BASE_URL`, `AUTH0_ISSUER_BASE_URL`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`.

---

## 🟢 Phase 3: Parent Retention & Notifications (First 2 Weeks)

- [ ] **7. Automated Weekly WhatsApp Progress Reports**
  - **Status Now:** Fully functional **1-click manual WhatsApp generator** (`api.whatsapp.com`) inside `/parent` Hub.
  - **Automation Next Step:**
    1. Sign up for WhatsApp Business API via Interakt, Wati, or Gupshup.
    2. Approve HSM template for *Weekly Consistency & Honesty Metre Report*.
    3. Configure cron trigger (`/api/cron/weekly-reports`) to dispatch every Sunday at 8:00 PM IST.

- [ ] **8. Transactional Emails (Receipts & Milestone PDFs)**
  - **Provider:** [Resend.com](https://resend.com/) or SendGrid
  - **Action Required:**
    1. Add and verify DNS records for `loopedu.in` on Resend.
    2. Add `RESEND_API_KEY` to environment variables.
    3. Auto-delivers PDF chapter question bank unlocks directly to student/parent inbox.

- [ ] **9. Legal & Corporate Filings Finalization**
  - Verify registered corporate office address and legal grievance officer email in:
    - `app/terms/page.tsx`
    - `app/privacy/page.tsx`
    - `app/refund/page.tsx`

---

## 📋 Production Environment Variables Cheat Sheet

Copy these into your **Vercel Project Settings > Environment Variables**:

```env
# Platform URL
NEXT_PUBLIC_APP_URL=https://loopedu.in

# Product & Pricing
NEXT_PUBLIC_PRICE_PER_SUBJECT_INR=299
NEXT_PUBLIC_CURRENCY=INR
ACCESS_DURATION_DAYS=30
TAX_INCLUSIVE=true

# Razorpay (Live Keys)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_HERE
RAZORPAY_KEY_SECRET=YOUR_SECRET_HERE
RAZORPAY_WEBHOOK_SECRET=YOUR_WEBHOOK_SECRET_HERE

# Database (Supabase Production)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE

# AI Doubt Coach
GEMINI_API_KEY=AIzaSy_YOUR_GEMINI_KEY_HERE
# or OPENAI_API_KEY=sk-...

# Admin Authorizations
ADMIN_EMAILS=sadish@loopedu.in,founder@tinko.in,admin@itappens.ai
```

---

## 🚀 Built-in Developer / Owner Access (Pre-Configured)
The app is pre-configured with direct credentials for you:
* **Username:** `Sadish`
* **Password:** `Sadish`
* **Role:** System Administrator + Full PRO Member (all 8 subject tracks automatically unlocked)
