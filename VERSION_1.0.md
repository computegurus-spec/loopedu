# LoopEdu — Version 1.0 Release Specification
**Official Release Baseline: October 2026**  
**Developer**: Blocks and Loops Technologies Pvt Ltd — Bangalore, Karnataka  
**Production URL**: [https://loopedu.vercel.app](https://loopedu.vercel.app)  
**Primary Domain**: [https://loopedu.in](https://loopedu.in)

---

## 1. Executive Overview
LoopEdu Version 1.0 is an autonomous academic mission control platform designed specifically for students, parents, and educators navigating the Indian school and competitive exam landscape (CBSE, ICSE, State Boards, JEE, NEET, CUET). 

Unlike passive video libraries or hallucinating generic AI chatbots, LoopEdu operates on **first-principles pedagogy**, enforcing a strict **15-minute daily focus ceiling** (The Daily Five), **multi-agent cognitive telemetry**, and **objective empirical career pathfinding**.

---

## 2. Core Features & Verified Systems in v1.0

### A. The Multi-Agent Pedagogical Swarm
LoopEdu coordinates 5 autonomous micro-agents working in unison across the student's study cycle:
1. **The Diagnostic Agent (`AGENT_DIAGNOSTIC`)**: Monitors cognitive latency (hesitation per question), distractor selection patterns, and error clusters in real-time, differentiating careless miscalculations from foundational prerequisite gaps.
2. **The Socratic Tutor (`AGENT_SOCRATIC`)**: Strictly rejects giving away direct answers; deconstructs complex multi-step problems down to first principles using 3 progressive hint stages.
3. **The Feynman Audio Evaluator (`AGENT_FEYNMAN`)**: Prompts students to verbally explain core scientific laws and theorems in their own words; assesses concept depth and rote memorization using audio NLP.
4. **The Curriculum Architect (`AGENT_CURRICULUM`)**: Maintains live synchronization with official board standards (NCERT, KTBS, Balbharati, Samacheer Kalvi) and cross-references questions with 10-year official board examination frequency maps.
5. **The Burnout Sentinel (`AGENT_SENTINEL`)**: Enforces a non-negotiable 15-minute daily focus ceiling (The Daily Five) and spaced retrieval intervals (SRS: 24h, 72h, 7d).

### B. Curriculum Standards & Question Bank Engine
- **1,600 Verified Questions**: 8 published academic tracks with exactly 200 questions each:
  - `Maths_Basic` (Code 241)
  - `Maths_Standard` (Code 041)
  - `Science` (Physics, Chemistry, Biology — Code 086)
  - `Social_Science` (History, Civics, Geography, Economics — Code 087)
  - `English_LL` (Language & Literature — Code 184)
  - `English_Communicative` (Code 101)
  - `German` (Foreign Language Standard — Code 020)
  - `AI` (Artificial Intelligence Skill Standards — Code 417)
- **Mathematical Rigor**: Full KaTeX/LaTeX math formula rendering (`MathRenderer.tsx`) supporting fractions, square roots, matrices, and chemical equations.
- **Independent Provenance**: All questions and worked step-by-step model explanations are prepared independently in accordance with official board competency guidelines.

### C. Personalized AI Career Architect (`/consultant`)
- **Input Dimensions**: Current Class (8-9, 10, 11, 12, Dropper), Subject Marks (Maths, Science, Social Science, English), 9 Core Passion Tags (AI/Robotics, Medicine, Law, Finance, Aviation/Defense, UI/UX Design, Civil Services, Pure Science, Global Business), and Destination (India Premier vs Global).
- **Automated Blueprint Generation**:
  - Primary Recommended Stream (e.g. PCM + Computer Science, PCB + Psychology, Commerce with Applied Maths, Humanities with Legal Studies) + viable backup stream and rationale.
  - 2-3 High-demand career trajectories with 2026–2035 market outlook and salary ranges in INR and USD.
  - **Live Verified Entrance Exam Directory**: Direct official links, eligibility requirements, exam patterns, and frequency for:
    - [JEE Main (NTA)](https://jeemain.nta.nic.in)
    - [JEE Advanced (IIT JAB)](https://jeeadv.ac.in)
    - [NEET-UG (NTA)](https://neet.nta.nic.in)
    - [CUET-UG (NTA)](https://cuetug.ntaonline.in)
    - [CLAT-UG (Consortium of NLUs)](https://consortiumofnlus.ac.in)
    - [BITSAT (BITS Pilani)](https://www.bitsadmission.com)
    - [IPMAT (IIM Indore)](https://www.iimidr.ac.in)
    - [CA Foundation (ICAI)](https://www.icai.org)
    - [NDA & NA (UPSC)](https://upsc.gov.in)
    - [UCEED (IIT Bombay)](https://uceed.iitb.ac.in) & [NATA (CoA)](https://www.nata.in)
    - [Digital SAT (College Board)](https://satsuite.collegeboard.org)
  - Year-by-year 4-year milestone action checklist.
  - 1-Click Print & PDF export.
  - Compliant AI disclaimer in small wording at the bottom.

### D. Global Indian Education News Wire (`#education-news`)
- Integrated daily reporting hub on the landing page for Indian students in India and worldwide.
- Filterable by categories: *CBSE & Boards*, *Competitive (JEE/NEET)*, *Study Abroad*, *Scholarships & Higher Ed*.
- Live keyword search.
- Verified stories covering CBSE twice-a-year 2026 board exams, Germany tuition-free study surge (59,000+ Indian students), NTA normalization guidelines, US F-1 36-month OPT protocols, NEET-UG security updates, UK Graduate Route stability, CUET single-shift testing, and IIT global campuses (Abu Dhabi & Zanzibar).
- Direct clickable external links to source publishers (The Hindu, Hindustan Times, Economic Times, LiveMint, NTA, UK Home Office).

### E. Student Learning & Observability Tools
- **The Daily Five (`/learn`)**: 15-minute calibrated daily problem-solving sprint.
- **Mistake Comeback Loop (`/challenge`)**: Targeted spaced recovery targeting past misconceptions.
- **Concept Mind Maps (`/mind-maps`)**: Visual hierarchy graph models for chapters and key concepts.
- **Spaced Flashcards (`/flashcards`)**: Leitner algorithm interactive review cards.
- **Parent Observability Hub (`/parent`)**: Cognitive telemetry, hesitation latency charts, and weekly board readiness indices.

### F. Intake & Onboarding Wizard (`/initialize`, `/onboarding`)
- Intuitive onboarding wizard.
- Smart target goal configuration: Selecting a competitive exam track (JEE Main, NEET-UG, CUET, Foundation Olympiad) intelligently locks and streamlines the target course track.

---

## 3. Technology Stack & Architecture
- **Framework**: Next.js 14.2 (App Router, Server Components & Route Handlers).
- **Language**: TypeScript (100% strict type safety, zero compile errors).
- **Styling**: Tailwind CSS with custom light-theme palette (Canvas `#F8FAFC`, Electric Cobalt `#0066FF`, Warm Amber `#F59E0B`, Crisp White `#FFFFFF`).
- **Icons**: Lucide React.
- **Database / Storage**: Supabase (PostgreSQL) + Local private JSON fallback database with 1,600 verified items.
- **Math Engine**: KaTeX & MathJax rendering via `MathRenderer.tsx`.
- **Payment Gateway**: Razorpay integration (`lib/payments/razorpay.ts`) with HMAC SHA256 cryptographic verification and automated sandbox simulation fallback.

---

## 4. Verification & Quality Assurance Suite
The platform is protected by a continuous verification test suite (`scripts/run-verification-tests.js`) covering 9 mission-critical checks:
1. `Security`: Paid source content and raw PDFs strictly absent from public assets.
2. `Pricing`: Server enforces modular ₹299/mo (29,900 paise) per subject.
3. `Payments`: Cryptographic HMAC SHA256 signature verification rejects tampered payloads.
4. `Security`: CSV exports escape dangerous spreadsheet formula injection prefixes (CWE-1236).
5. `Consent`: Availability notification requires a valid email.
6. `Data Integrity`: Database contains all 8 tracks with verified 200 questions each (1,600 total).
7. `Readiness`: All 8 question banks including German are published and open.
8. `Privacy`: Watermark engine masks customer email addresses (`s***7@domain`).
9. `AEO/GEO & Legal`: `llms.txt` and footer legally attribute:
   *`LoopEdu is an independent educational technology platform developed by Blocks and Loops Technologies Pvt Ltd and is not officially affiliated to any educational board.`*
   *`LoopEdu is a product of Blocks and Loops technologies pvt ltd - Bangalore, Karnataka.`*

---

## 5. Deployment Information
- **Repository**: `github.com:computegurus-spec/loopedu.git`
- **Branch**: `main`
- **Latest Commit**: `eb49f51`
- **Hosting**: Vercel Serverless Edge
- **Status**: 100% Passing Tests, 47 Static/Dynamic Pages Generated cleanly.
