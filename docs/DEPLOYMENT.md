# Lood-edu Deployment & Operational Runbook

**Prepared for:** Blocks and Loops Technologies Pvt Ltd  
**Version:** 1.0  

---

## 1. System Requirements

- **Runtime:** Node.js 18.17.0 or higher (LTS recommended)
- **Package Manager:** `npm` (v9+) or `pnpm`
- **Database:** PostgreSQL 15+ (Hosted via Supabase or local PostgreSQL instance)
- **Framework:** Next.js 14 App Router

---

## 2. Startup & Development Commands

### 2.1. Isolated Synthetic DEMO Mode (Zero Credentials Needed)
To run the application immediately with synthetic personas and zero third-party dependencies:

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The amber **DEMO MODE** banner will be active, and you can switch between Aarav (Class 10 Student), Priya (Adult Aspirant), Rajesh (Parent), Dr. Anita (Counsellor), Vikram (Editor), and Meera (Admin).

### 2.2. Automated Test Execution
Run the verification and acceptance test suites locally:

```bash
# Run 9 core invariant tests
node scripts/run-verification-tests.js

# Run 13 acceptance journey end-to-end integration tests
node scripts/run-acceptance-journeys.js

# Run static TypeScript type check
npx tsc --noEmit
```

### 2.3. Production Build & Start
```bash
# Compile optimized Next.js production build
npm run build

# Start production server
npm run start
```

---

## 3. Scheduled Job Runner

Lood-edu relies on scheduled background jobs for:
1. **Statutory Source Crawling:** Checks NTA, UPSC, SSC, IBPS, KEA portals every 6–24 hours.
2. **Daily Briefing Generation:** Generates 3-minute personalized dispatches at 06:00 IST.
3. **Spaced Repetition Review Triggers:** Updates mistake notebook revision queues at midnight.
4. **Subscription Period Reconciliation:** Marks expired subscriptions as expired.

### 3.1. Local Job Runner Command
To trigger background jobs locally:
```bash
# Trigger daily digest outbox compilation
node -e "require('./lib/newsletter/briefingEngine').generateDailyBriefing('student')"
```

### 3.2. Hosted Cron Configuration (Vercel / Cloud Scheduler)
Configure HTTP POST triggers with `CRON_SECRET` authorization header:
- `POST /api/cron/briefing` (Daily at 06:00 IST / 00:30 UTC)
- `POST /api/cron/source-check` (Every 6 hours)

---

## 4. Health & Monitoring Endpoints

- **Health Check:** `GET /api/health/supabase` (Returns DB connectivity status without exposing keys)
- **Session Check:** `GET /api/auth/session` (Returns authenticated user state)
- **Admin Overview:** `GET /api/admin/overview` (Restricted to verified administrators)
