# LoopEdu • `loopedu.in`

<div align="center">

**The Autonomous Multi-Agent Student Operating System & Cognitive Habit Engine**

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-forest)](https://loopedu.in)

*a product of **itappens.ai** | **Blocks and Loops technologies pvt ltd** — Bangalore, Karnataka*

</div>

---

## 🌟 Executive Overview

**LoopEdu** transforms high-stakes school and competitive exam preparation from passive rote cramming into an active, intelligent **15-minute daily mastery loop**. 

Designed as a modern student mission control, LoopEdu pairs learners with an autonomous multi-agent cognitive architecture. Instead of generic AI wrappers or 500-page static PDFs, students interact with specialized reasoning agents that architect personalized curriculums, provide Socratic step-by-step guidance, evaluate conceptual defense via the Feynman technique, and automate spaced repetition.

Covering **CBSE Class 10**, **State Boards (Karnataka, Maharashtra, etc.)**, **Foundation & Olympiads**, and competitive entrance streams (**JEE Main & Advanced, NEET UG**).

---

## 🤖 Multi-Agent Cognitive Swarm

```
┌────────────────────────────────────────────────────────────────────────┐
│                      LOOPEDU AGENTIC ECOSYSTEM                         │
├────────────────────┬───────────────────────┬───────────────────────────┤
│ 1. CURRICULUM ARCH │ 2. SOCRATIC REASONER  │ 3. FEYNMAN DEFENSE AGENT  │
│    Dynamic Intake  │    Guided Inquiry     │    Conceptual Clarity     │
│  • Board/State sync│  • Zero spoonfed ans  │  • Layman explanation test│
│  • Official books  │  • First-principles   │  • Detects cognitive gap  │
│  • Custom search   │  • Calibrated hints   │  • Natural voice & text   │
├────────────────────┼───────────────────────┼───────────────────────────┤
│ 4. SPACED RECALL   │ 5. BURNOUT SENTINEL   │ 6. PARENT OBSERVABILITY   │
│    Memory Retention│    Fatigue Prevention │    Calm Honesty Metre     │
│  • Error vault     │  • 15-min daily budget│  • Zero-nag WhatsApp card │
│  • 24h/3d/7d cycle │  • 3 new + 2 retries  │  • Objective syllabus %   │
│  • 2x clear rule   │  • Streak preservation│  • Honest mastery metrics │
└────────────────────┴───────────────────────┴───────────────────────────┘
```

### 1. Curriculum Architect Agent
* **Dynamic Framework Adaptation:** Interactively constructs official course frameworks for any board (CBSE, State Boards, ICSE) and grade on demand.
* **Official Syllabus Ingestion:** Maps direct textbook chapters, paper codes, and official central resources instead of generic, outdated question dumps.
* **Personalized Goal Alignment:** Calibrates daily queues according to student targets (Board Exam 95%+, Olympiad rigor, or Conceptual Foundation).

### 2. Socratic Reasoning Partner
* **Anti-Spoonfeeding:** Rejects superficial answer generation. Questions are broken down through first-principles Socratic breadcrumbs.
* **Adaptive Inquiry:** When a student gets stuck, the agent asks probing counter-questions to help them deduce the correct formula or proof independently.

### 3. Feynman Conceptual Defense Agent
* **Explain-It-To-A-Child:** Students test their real mastery by explaining concepts aloud or in writing using simple, jargon-free analogies.
* **Cognitive Leakage Detection:** Pinpoints hand-waving and misapplied theorems in real time and routes remediations into the next morning's session.

### 4. Active Recall & Error Vault Engine
* **Automated Mistake Comeback:** Every incorrect answer is automatically captured and tagged in the student's personal error vault.
* **Calibrated Spaced Repetition:** Resurfaces tricky questions at spaced intervals (24 hours, 3 days, 7 days) to reinforce long-term memory.
* **Mastery Criterion:** Concepts are only cleared from the active queue after 2 consecutive unassisted correct solutions.

### 5. Burnout Sentinel & Focus Ceiling
* **15-Minute High-Yield Budget:** Enforces a focused daily limit (e.g., 3 new questions + 2 spaced retries) to prevent cognitive overload.
* **Streak Momentum:** Sustains continuous daily learning habits with forgiving freeze mechanisms and milestone unlocking.

---

## 🎨 Design System & Aesthetics

* **Palette:** Crisp, enterprise SaaS light mode with an ultra-clean `#F8FAFC` slate canvas and pure `#FFFFFF` layered cards.
* **Primary Accent:** Electric Cobalt (`#0066FF`) for high-contrast primary actions, focus indicators, and telemetry badges.
* **Status Badges:** Warm Amber (`#F59E0B` / `#FEF08A`) highlighting streaks, active recall states, and concept health.
* **Typography:** Inter, Outfit, and KaTeX mathematical notation for textbook-quality typesetting.
* **Zero Distractions:** No generic chatbot wrappers, cartoon mascots, or promotional clutter.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, Server Components, Route Handlers, Suspense boundaries) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict end-to-end schema & type safety) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) (Custom cobalt & warm amber design tokens) |
| **Math Typesetting** | [KaTeX](https://katex.org/) (`MathRenderer.tsx` for LaTeX equations & chemical balance) |
| **Database & Vector** | [Supabase](https://supabase.com/) / PostgreSQL with `pgvector` for digital twin concept tracking |
| **Authentication** | Session-backed student authentication with repeat credential hydration in `localStorage` |
| **Mobile Deployment** | [Capacitor](https://capacitorjs.com/) for Android & iOS packaging |

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

Populate your local keys:
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

### 5. Automated Verification Test Suite
Run the 9-point platform integrity suite:
```bash
npm run test
```

### 6. Production Build
```bash
npm run build
npm start
```

---

## 🔐 Administrative & Demo Access

Pre-configured credentials for administrative verification and curriculum inspection:
* **Username:** `Sadish`
* **Password:** `Sadish`
* **Access Level:** System Administrator + Full PRO Member (all verified tracks unlocked)

---

## 📄 Legal & Corporate Attribution

* **Operating Entity:** LoopEdu is an independent educational technology platform developed and operated by **Blocks and Loops technologies pvt ltd** (Bangalore, Karnataka) and powered by **itappens.ai**.
* **Independence Notice:** LoopEdu is independent and not affiliated with, authorized, or endorsed by CBSE, NCERT, NTA, or any state examination board.
* **Copyright:** © 2026–2027 LoopEdu (`loopedu.in`). All rights reserved.
