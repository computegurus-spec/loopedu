# LoopEdu (Beta) • `loopedu.in`

<div align="center">

**The 15-Minute Daily Habit Platform for School & Competitive Exams**

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-forest)](https://loopedu.in)

*a product of **itappens.ai** | **Blocks and Loops technologies pvt ltd** — Bangalore, Karnataka*

</div>

---

## 🌟 Executive Overview

**LoopEdu** transforms high-stakes exam preparation from painful, last-minute cramming into an effortless, daily **15-minute habit loop**. Inspired by Duolingo's behavioral psychology and active recall cognitive science, LoopEdu replaces 500-page bulky question books with bite-sized daily sets, spaced error revision, and real-time parent observability.

Starting with **CBSE Class 10**, the platform is expanding across senior secondary school boards and premier competitive entrance examinations (**JEE Main & Advanced, NEET UG, CUET, Foundation & Olympiads**).

---

## 🏛️ The 3 Core Product Pillars

```
┌────────────────────────────────────────────────────────────────────────┐
│                        THE LOOPEDU ECOSYSTEM                           │
├──────────────────┬───────────────────────┬─────────────────────────────┤
│ 1. THE DAILY FIVE│ 2. MISTAKE COMEBACK   │ 3. PARENT OBSERVABILITY     │
│  Bite-Sized Loop │   Active Recall Vault │    Anti-Micromanagement     │
│  • 5 high-yield  │  • Automated error log│   • Calm honesty metre      │
│    questions/day │  • 3d, 7d, 14d spaced │   • 1-click WhatsApp report │
│  • Streak XP     │    repetition         │   • Curriculum coverage     │
│  • Unlock PDFs   │  • Solved 2x to master│     readiness index         │
└──────────────────┴───────────────────────┴─────────────────────────────┘
```

### 1. The Daily Five (Student Gamification)
* **Bite-Sized Routine:** Every morning, students receive exactly 5 high-yield questions tailored to their enrolled track to beat study fatigue in under 15 minutes.
* **Streak Momentum:** Completing daily loops maintains consecutive-day streaks with forgiving streak-freeze mechanics.
* **Unlockable Milestones:** Finishing a chapter loop grants students direct access to download curated, high-value **10-Year Question Bank Dossiers** as trophy rewards.

### 2. The Mistake Comeback (Spaced Active Recall)
* **Automated Error Vault:** Every question answered incorrectly is automatically flagged and routed to a personalized error vault instead of being lost.
* **Spaced Repetition Schedule:** Flagged problems dynamically resurface **3 days, 7 days, and 14 days** later to cement concepts before exams.
* **Redemption Clearance:** A concept is only cleared from the active loop once the student successfully solves it twice consecutively without hints.

### 3. The Parent Observability Hub (Calm Oversight)
* **Anti-Micromanagement:** Eliminates daily nagging by providing parents a clean, high-level digest answering two core questions: *"Did my child complete today's path?"* and *"What chapters are fully secure?"*
* **The Honesty Metre:** Transparent, uninflated accuracy and question counts rather than artificial score percentages.
* **1-Click WhatsApp Progress Reports:** Pre-formats crisp text summaries ready to share with family or tutors with one tap.

---

## 📚 Curriculum Roadmap & Tracks

### Currently Live (CBSE Class 10 — 8 Verified Tracks)
* **Mathematics (Standard — Code 041):** 200 high-yield proofs, algebraic formulations & coordinate geometry.
* **Mathematics (Basic — Code 241):** 200 questions focused on NCERT core foundations and arithmetic progressions.
* **Science (Code 086):** Balanced physics calculations, balanced chemistry equations & biology step diagrams.
* **Social Science (Code 087):** History, Geography, Democratic Politics, and Economics analytical questions.
* **English Language & Literature (Code 184):** Prose, poetry, analytical paragraphs & integrated grammar.
* **English Communicative (Code 101):** Literature reader drama/fiction and advanced editing.
* **German (Code 017):** Reading comprehension, grammar & structured written expression (B1.1 level).
* **Artificial Intelligence (Code 417):** Employability skills, computer vision, NLP (TF-IDF/BoW) & evaluation metrics.

### Expanding Curriculum (In Active Development)
* 🎯 **Competitive Entrance:** JEE Main & Advanced (Physics, Chemistry, Maths), NEET UG (NCERT line-by-line Biology, Chem, Physics).
* 🎯 **Senior Secondary (CBSE 11 & 12):** Science, Commerce, and Humanities.
* 🎯 **Junior Foundation & Olympiads (Classes 8 & 9):** Mental arithmetic, NTSE & Olympiad inquiry challenges.
* 🎯 **Multi-Board Expansion:** ICSE Class 10 and major State Board tracks.

---

## 💳 Pricing & Commercial Model

* **Modular Subscription:** **₹299 / month** per subject track (or all-inclusive bundles).
* **Zero Hidden Lock-ins:** Monthly recurring billing with freedom to pause or cancel anytime.
* **Milestone Rewards:** Unlocks downloadable 10-year question bank PDFs for offline revision as chapters are conquered.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, React Server Components, Route Handlers) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict typing across schema & store) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) (Custom academic palette: Forest, Paper, Lime Accent) |
| **Math & Formulae** | [KaTeX](https://katex.org/) (`MathRenderer.tsx` for LaTeX mathematical notation) |
| **Database** | [Supabase](https://supabase.com/) / PostgreSQL (`supabase/schema.sql`) |
| **Payments** | [Razorpay](https://razorpay.com/) (UPI, NetBanking, Cards, Webhooks with HMAC SHA256 validation) |
| **Mobile Ready** | [Capacitor](https://capacitorjs.com/) (`capacitor.config.json` for Android & iOS packaging) |

---

## 🚀 Getting Started (Local Development)

### 1. Prerequisites
* Node.js 18.17+ or 20.x
* npm or pnpm

### 2. Clone & Install
```bash
git clone git@github.com:computegurus-spec/loopedu.git
cd loopedu
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your local secrets in `.env.local`:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_PRICE_PER_SUBJECT_INR=299
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_placeholder
RAZORPAY_KEY_SECRET=dev_secret_simulation
RAZORPAY_WEBHOOK_SECRET=dev_webhook_simulation
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Automated Verification Suite
Run the 9-point verification test suite:
```bash
npm run test:verify
```

### 6. Production Build
```bash
npm run build
npm start
```

---

## 🔑 Pre-Configured Owner / Administrator Login

For administrative and demonstration access, the app includes pre-configured owner credentials:
* **Username:** `Sadish`
* **Password:** `Sadish`
* **Access Level:** System Administrator + Full PRO Member (all 8 subject tracks automatically unlocked)

---

## 📋 Production Deployment Guide

For full production deployment instructions, cloud database setup, live Razorpay keys, and DNS configuration:
👉 Please refer to [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md).

---

## 📄 Legal & Corporate Disclaimer

* **Corporate Entity:** LoopEdu is an independent educational platform created and operated by **Blocks and Loops technologies pvt ltd** (Bangalore, Karnataka) and powered by **itappens.ai**.
* **Independence Notice:** LoopEdu is completely independent and is not affiliated with, endorsed by, or authorized by the Central Board of Secondary Education (CBSE), NCERT, NTA, or any government body.
* **Copyright:** © 2026–2027 LoopEdu (`loopedu.in`). All rights reserved.
