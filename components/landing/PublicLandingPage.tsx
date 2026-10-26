'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  BookOpen,
  Award,
  Bell,
  HeartHandshake,
  Users,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Check,
  Eye,
  HelpCircle,
  FileText,
  ChevronRight,
  Filter,
  AlertCircle,
  RefreshCw,
  Mail,
  Lock,
  Calendar,
  Layers,
  MapPin,
  Building2,
  Search,
  ExternalLink,
  X,
  GraduationCap,
  Sparkle,
} from 'lucide-react';

export type HelpGoal =
  | 'all'
  | 'class-10-subjects'
  | 'class-12-planning'
  | 'entrance-prep'
  | 'govt-exams'
  | 'parent-support';

export interface ToolItem {
  id: string;
  name: string;
  group: 'Choose your direction' | 'Find opportunities' | 'Prepare consistently' | 'Stay supported' | 'Stay informed' | 'Support your child';
  icon: React.ComponentType<{ className?: string }>;
  availability: 'Available' | 'Interactive Preview' | 'Planned';
  pricingBadge: '100% Free' | 'Free & Modular' | 'Included';
  route: string;
  whoIsItFor: string;
  problemSolved: string;
  whatYouProvide: string;
  whatYouReceive: string;
  sampleSummary: string;
  goals: HelpGoal[];
  sampleDetails: {
    title: string;
    inputs: { label: string; value: string }[];
    outputSummary: string;
    keyHighlights: string[];
    statutoryNote?: string;
  };
}

export const TOOLS_DATA: ToolItem[] = [
  // Group: Choose your direction
  {
    id: 'career-stream-planner',
    name: 'Career & Stream Planner',
    group: 'Choose your direction',
    icon: Compass,
    availability: 'Available',
    pricingBadge: '100% Free',
    route: '/paths',
    whoIsItFor: 'Students deciding streams after Class 10 or degree pathways after Class 12.',
    problemSolved: 'Replaces peer pressure and guesswork with official prerequisites, unbundled college costs, and backup routes.',
    whatYouProvide: 'Academic stage, subjects studied, interests (e.g. biology, design, computing), budget, and location preferences.',
    whatYouReceive: '3 grounded pathways with prerequisite checklists, total cost estimates, starter mini-projects, and backup options.',
    sampleSummary: 'Primary Path: PCM + Biomedical Devices • Requires Maths Standard 041 • ₹6.1L 4-yr unbundled cost estimate.',
    goals: ['class-10-subjects', 'class-12-planning'],
    sampleDetails: {
      title: 'Sample Career Pathway Evaluation: Class 10 Student',
      inputs: [
        { label: 'Current Stage', value: 'Class 10 CBSE' },
        { label: 'Mathematics Choice', value: 'Maths Standard (Code 041)' },
        { label: 'Demonstrated Interests', value: 'Biology, Device Prototyping, Design' },
        { label: 'Budget Preference', value: 'Affordable / Govt-Aided (Under ₹8L 4-Yr total)' },
        { label: 'Location Preference', value: 'Bengaluru / South India' },
      ],
      outputSummary: 'Recommended Pathway: Biomimetic & Medical Device Engineering (PCM + Biology dual track)',
      keyHighlights: [
        'Prerequisite Check: Verified. Mathematics Standard (041) satisfies AICTE/NTA engineering eligibility.',
        'Unbundled 4-Yr Total Cost: ₹6,10,000 (Tuition: ₹3,40,000 + Hostel/Living: ₹1,80,000 + Prep: ₹45,000 + Equipment: ₹45,000).',
        'Actionable Starter Project: Build a fingertip optical pulse sensor with an Arduino UNO (under ₹1,200).',
        'Direct Official Portals: JEE Main (NTA), KCET (KEA), BITSAT.',
        'Backup Pathway: B.Sc. Clinical Data Science with lateral transfer provisions.',
      ],
      statutoryNote: 'Cites official CBSE Circular No. Acad-03/2019 regarding Mathematics Standard vs Basic restrictions.',
    },
  },
  {
    id: 'college-cost-comparison',
    name: 'College & Cost Comparison',
    group: 'Choose your direction',
    icon: Building2,
    availability: 'Available',
    pricingBadge: '100% Free',
    route: '/paths',
    whoIsItFor: 'Students and parents evaluating colleges across India and abroad.',
    problemSolved: 'Bypasses advertised "highest international packages" to show realistic median salaries, living expenses, and accredited status.',
    whatYouProvide: 'Intended course, target states, budget range, and entrance score estimates.',
    whatYouReceive: 'Objective comparisons of tuition, mandatory hostel fees, NIRF benchmarks, and dated accreditation records.',
    sampleSummary: 'Side-by-side comparison of 3 institutions: tuition, living cost, median packages, and accepted exam cutoffs.',
    goals: ['class-12-planning'],
    sampleDetails: {
      title: 'Sample Higher Education Comparison: B.Tech / BE Programs',
      inputs: [
        { label: 'Discipline', value: 'Computer Science & Engineering' },
        { label: 'Target State Band', value: 'Karnataka / Tamil Nadu / All India' },
        { label: 'Preferred Entrance', value: 'BITSAT / JEE Main / State CET' },
      ],
      outputSummary: 'Transparent fee and placement breakdown across 3 accredited benchmarks',
      keyHighlights: [
        'BITS Pilani: ₹23.8L total 4-yr expense (Tuition ₹19.9L + Living ₹3.9L) • Median package ₹18.2 LPA • Direct BITSAT score.',
        'Manipal MAHE: ₹18.5L total 4-yr expense (Tuition ₹14.8L + Living ₹3.7L) • Median package ₹10.5 LPA • MET / JEE merit.',
        'Top State Govt University (VTU/UVCE): ₹3.2L total 4-yr expense • Median package ₹8.1 LPA • State CET rank required.',
        'Placement Ratio Transparency: Shows verifiable median CTC rather than single highest off-campus outlier.',
      ],
      statutoryNote: 'Fee components cross-checked against AICTE fee regulatory committee gazettes and published NIRF reports.',
    },
  },

  // Group: Find opportunities
  {
    id: 'exam-opportunity-finder',
    name: 'Exam & Opportunity Finder',
    group: 'Find opportunities',
    icon: Award,
    availability: 'Available',
    pricingBadge: '100% Free',
    route: '/exams',
    whoIsItFor: 'Students and aspirants exploring national exams, scholarships, and graduate recruitments.',
    problemSolved: 'Prevents missing application cycles or paying non-refundable fees for exams where you do not meet statutory eligibility.',
    whatYouProvide: 'Highest qualification, birth date, reservation category, and state domicile.',
    whatYouReceive: 'Deterministic eligibility status (Eligible, Ineligible, or Missing Inputs) with official notification links and key dates.',
    sampleSummary: 'AST Eligibility Checker: Instant verdict for JEE Main, NEET-UG, CUET-UG, IBPS PO, and RRB NTPC.',
    goals: ['class-12-planning', 'entrance-prep', 'govt-exams'],
    sampleDetails: {
      title: 'Sample Deterministic Eligibility Audit: JEE Main & IBPS PO',
      inputs: [
        { label: 'Candidate DOB', value: '15 August 2008' },
        { label: 'Qualifying Examination', value: 'Class 12 (Appearing in 2027)' },
        { label: 'Mandatory Subjects', value: 'Physics, Chemistry, Mathematics' },
        { label: 'Social Category', value: 'General (EWS)' },
      ],
      outputSummary: 'Status: 100% ELIGIBLE for JEE Main 2027 (Paper 1 BE/BTech)',
      keyHighlights: [
        'Age Limit Audit: Passed. No upper age limit for JEE Main under current NTA rules.',
        'Subject Prerequisite Audit: Passed. Physics + Mathematics studied in qualifying exam.',
        'Category Concession: Valid EWS certificate issued on or after April 1 of examination year required.',
        'Official Portal: jeemain.nta.nic.in (Direct link, zero intermediary fees).',
      ],
      statutoryNote: 'Evaluated strictly against NTA Information Bulletin 2026-2027 statutory criteria.',
    },
  },
  {
    id: 'deadline-watchlist',
    name: 'Deadline Watchlist',
    group: 'Find opportunities',
    icon: Clock,
    availability: 'Available',
    pricingBadge: '100% Free',
    route: '/exams',
    whoIsItFor: 'Candidates and parents tracking multiple examination timelines simultaneously.',
    problemSolved: 'Eliminates confusion when testing agencies quietly release corrigenda, shift schedules, or extend application dates.',
    whatYouProvide: 'The specific exams, scholarships, and admission portals you wish to monitor.',
    whatYouReceive: 'A dynamic calendar with verified gazette corrigendum alerts and instant recalculated deadlines.',
    sampleSummary: 'Real-time alert tracker: Flags application extensions, admit card release windows, and fee deadlines.',
    goals: ['entrance-prep', 'govt-exams'],
    sampleDetails: {
      title: 'Sample Corrigendum Alert: Application Deadline Extension',
      inputs: [
        { label: 'Tracked Examination', value: 'NTA JEE Main 2027 (Session 1)' },
        { label: 'Original Deadline', value: '30 November 2026, 11:50 PM IST' },
      ],
      outputSummary: 'Official Amendment Detected: Application Window Extended by 5 Days',
      keyHighlights: [
        'New Deadline: 05 December 2026, 11:50 PM IST.',
        'Fee Payment Window: Open until 06 December 2026, 11:50 PM IST.',
        'Official Source: Public Notice NTA/2026/JEE-ADM/04 dated 28 October 2026.',
        'Automatic Recalculation: Personal study plan and reminder schedule updated automatically.',
      ],
      statutoryNote: 'All amendments cross-verified against primary gazette circulars before publishing.',
    },
  },

  // Group: Prepare consistently
  {
    id: 'study-planner-daily-practice',
    name: 'Study Planner & Daily Practice',
    group: 'Prepare consistently',
    icon: BookOpen,
    availability: 'Available',
    pricingBadge: 'Free & Modular',
    route: '/prepare',
    whoIsItFor: 'Students who struggle with study consistency or feel overwhelmed by thick textbooks.',
    problemSolved: 'Replaces study fatigue with a manageable 15-minute daily focus loop (The Daily Five) and guilt-free rest days.',
    whatYouProvide: 'Daily available study minutes (15, 30, or 45), target board/exam, and current syllabus status.',
    whatYouReceive: '5 calibrated high-yield questions every morning, streak tracking, and an availability-aware weekly schedule.',
    sampleSummary: '15-minute daily loop: 5 calibrated Class 10 questions with step-by-step marking rubrics.',
    goals: ['class-10-subjects', 'entrance-prep', 'govt-exams'],
    sampleDetails: {
      title: 'Sample Daily Five Routine: Class 10 Science (Light - Reflection & Refraction)',
      inputs: [
        { label: 'Target Exam', value: 'CBSE Class 10 Board 2027' },
        { label: 'Daily Practice Time', value: '15 Minutes' },
        { label: 'Focus Chapter', value: 'Chapter 9: Light (Reflection & Refraction)' },
        { label: 'Rest Day', value: 'Sunday (Zero-Guilt Rest Day)' },
      ],
      outputSummary: 'Daily 5-Question Set with 3-Stage Progressive Socratic Hints',
      keyHighlights: [
        'Question 1: Numerical on concave mirror focal length using mirror formula (1/f = 1/v + 1/u).',
        'Hint Stage 1: Conceptual check on sign conventions (Cartesian coordinates).',
        'Hint Stage 2: Stepped equation setup without revealing intermediate arithmetic.',
        'Step-Marking Rubric: 1 mark for formula & sign, 1 mark for substitution, 1 mark for final units.',
        'Weekly Pacing: 5 days practice + 1 day error review + 1 day guilt-free rest.',
      ],
      statutoryNote: 'Questions aligned with NCERT 2026-2027 rationalized textbook syllabus.',
    },
  },
  {
    id: 'practice-mistake-review',
    name: 'Practice & Mistake Review',
    group: 'Prepare consistently',
    icon: RefreshCw,
    availability: 'Available',
    pricingBadge: 'Included',
    route: '/prepare',
    whoIsItFor: 'Students who repeat the same conceptual or calculation slips in mock tests.',
    problemSolved: 'Automatically captures missed questions and schedules them for active recall at 1d, 3d, and 7d intervals.',
    whatYouProvide: 'Your answers during diagnostic practice drills.',
    whatYouReceive: 'Detailed NCERT step-marking solutions, root-cause tags, and a personalized Spaced Error Notebook.',
    sampleSummary: 'Error Vault: Resurfaces missed items after 1, 3, and 7 days. Marked Mastered only after 2 unassisted correct answers.',
    goals: ['class-10-subjects', 'entrance-prep', 'govt-exams'],
    sampleDetails: {
      title: 'Sample Spaced Repetition Error Vault: Mistake Comeback',
      inputs: [
        { label: 'Missed Item', value: 'Focal length sign convention for convex lens' },
        { label: 'Initial Mistake Date', value: '22 October 2026' },
        { label: 'Diagnosed Root Cause', value: 'Sign Convention Slip (Treated focal length as negative)' },
      ],
      outputSummary: 'Scheduled Comeback Schedule: 1-Day → 3-Day → 7-Day Active Recall Queue',
      keyHighlights: [
        'Interval 1 (23 Oct): Solved correctly with hint → Moved to 3-day queue.',
        'Interval 2 (26 Oct): Solved correctly without hint (Streak 1/2).',
        'Interval 3 (02 Nov): Solved correctly without hint (Streak 2/2) → Marked MASTERED.',
        'Notebook Feature: Downloadable error summary for revision 48 hours before board exam.',
      ],
      statutoryNote: 'Prevents repeated mistakes by enforcing active retrieval rather than passive re-reading.',
    },
  },
  {
    id: 'concept-maps-flashcards',
    name: 'Concept Maps & Flashcards',
    group: 'Prepare consistently',
    icon: Layers,
    availability: 'Available',
    pricingBadge: '100% Free',
    route: '/mind-maps',
    whoIsItFor: 'Visual learners and students doing rapid revision before unit tests and board exams.',
    problemSolved: 'Replaces dense walls of text with clickable dependency trees and formula recall flashcards.',
    whatYouProvide: 'Subject and chapter topics you need to organize.',
    whatYouReceive: 'Interactive concept hierarchy trees and Leitner spaced repetition flashcards with LaTeX equations.',
    sampleSummary: 'Visual chapter maps: Inspect formula derivations and recurrence frequency at a glance.',
    goals: ['class-10-subjects', 'entrance-prep'],
    sampleDetails: {
      title: 'Sample Knowledge Hierarchy: Optics & Light',
      inputs: [
        { label: 'Subject', value: 'Science Class 10 (Physics)' },
        { label: 'Node Inspected', value: 'Refraction through Lenses' },
      ],
      outputSummary: 'Interactive Concept Tree with Formula Derivation Cards',
      keyHighlights: [
        'Dependency Tree: Light → Refraction → Snell’s Law → Spherical Lenses → Lens Formula → Power of Lens.',
        'Recurrence Index: Snell’s Law tested in 8 out of the last 10 board examination papers.',
        'Formula Flashcard: P = 1 / f(m). Convex lens power is positive; Concave lens power is negative.',
        'Click-to-Drill: Launch a 3-question diagnostic set directly from any node on the map.',
      ],
      statutoryNote: 'Diagrams rendered in standard SVG with full KaTeX mathematical notation.',
    },
  },

  // Group: Stay supported
  {
    id: 'mind-coach',
    name: 'Mind Coach',
    group: 'Stay supported',
    icon: HeartHandshake,
    availability: 'Interactive Preview',
    pricingBadge: '100% Free',
    route: '/coach',
    whoIsItFor: 'Any student dealing with exam stress, study fatigue, concentration struggles, or anxiety.',
    problemSolved: 'Provides a private, non-clinical space to reflect, run 25/5 focus intervals, and decompress without parental surveillance.',
    whatYouProvide: 'Daily study reflection, focus time goals, and habit check-in.',
    whatYouReceive: 'Calm habit routines, grounding reflections, and instant access to verified national tele-mental health helplines.',
    sampleSummary: '25-minute Pomodoro focus timer + encrypted private reflection journal + Tele-MANAS helpline access.',
    goals: ['class-10-subjects', 'class-12-planning', 'entrance-prep', 'govt-exams', 'parent-support'],
    sampleDetails: {
      title: 'Sample Bounded Companion: Focus Sprint & Habit Reflection',
      inputs: [
        { label: 'Session Type', value: '25-Minute Focus Sprint' },
        { label: 'Student State', value: 'Feeling overwhelmed by Physics mock test score' },
      ],
      outputSummary: 'Calm Reflection & Grounding Prompts (Strictly Private)',
      keyHighlights: [
        'Boundary Guarantee: Non-clinical habit companion. Does not diagnose or prescribe.',
        'Privacy Invariant: Student reflections are encrypted and strictly excluded from parent/teacher views.',
        'Deconstruction Prompt: "A mock test is a diagnostic compass, not a final judgement. Which single concept tripped you up today?"',
        'Statutory Safety Intercept: Immediate one-tap access to Tele-MANAS (14416) and KIRAN (1800-599-0019).',
      ],
      statutoryNote: 'Explicitly labeled as an educational habit companion, not a substitute for clinical psychiatric care.',
    },
  },

  // Group: Stay informed
  {
    id: 'education-updates-daily-briefing',
    name: 'Education Updates & Daily Briefing',
    group: 'Stay informed',
    icon: Bell,
    availability: 'Available',
    pricingBadge: '100% Free',
    route: '/updates',
    whoIsItFor: 'Students, parents, and educators who need accurate education policy news without clickbait.',
    problemSolved: 'Summarizes official gazettes, board circulars, and exam notifications into a concise 3-minute morning briefing.',
    whatYouProvide: 'Preferred edition (Student, Parent, or Adult Aspirant) and optional email for morning delivery.',
    whatYouReceive: '3 verified statutory notices daily with exact government links, dates, affected student cohorts, and an action step.',
    sampleSummary: '3-minute morning digest: Verified gazette updates from CBSE, NTA, UPSC, and UGC.',
    goals: ['class-10-subjects', 'class-12-planning', 'entrance-prep', 'govt-exams', 'parent-support'],
    sampleDetails: {
      title: 'Sample 3-Minute Daily Morning Briefing: Student Edition',
      inputs: [
        { label: 'Edition', value: 'Class 10 & 12 Board Candidate' },
        { label: 'Delivery Time', value: 'Every morning at 7:00 AM IST' },
      ],
      outputSummary: '3 Verified Notices + Key Deadlines + Feasible Today Action',
      keyHighlights: [
        'Item 1: CBSE implements twice-a-year board exam option (NEP 2020) with best-of-two scoring.',
        'Item 2: NTA issues shift normalization bulletin for JEE Main 2027.',
        'Item 3: KEA CET registration dates announced for engineering & pharmacy admissions.',
        'Today’s Feasible Action: Verify your school registration details against your Aadhaar/birth certificate.',
      ],
      statutoryNote: 'Every notice provides a direct clickable link to the primary government gazette or circular.',
    },
  },

  // Group: Support your child
  {
    id: 'parent-view',
    name: 'Parent View',
    group: 'Support your child',
    icon: Users,
    availability: 'Available',
    pricingBadge: '100% Free',
    route: '/parent',
    whoIsItFor: 'Parents who want to support their child without hovering, nagging, or creating family tension.',
    problemSolved: 'Replaces daily friction with calm observability into syllabus progress, showing verified consistency over screen time.',
    whatYouProvide: 'Student linking consent code (the student explicitly chooses what data to share).',
    whatYouReceive: 'Weekly completion summaries, Honesty Metre (questions attempted vs accuracy), and secure chapter milestones.',
    sampleSummary: 'Calm observability: Track completed units and step accuracy without micromanagement.',
    goals: ['parent-support'],
    sampleDetails: {
      title: 'Sample Calm Parent Observability Dashboard',
      inputs: [
        { label: 'Linked Student', value: 'Aarav S. (Class 10 CBSE)' },
        { label: 'Consent Scope', value: 'Syllabus milestones & habit streaks permitted by student' },
      ],
      outputSummary: 'Weekly Habit & Preparation Status (Anti-Micromanagement View)',
      keyHighlights: [
        'Weekly Habit Index: 5 of 6 planned daily sessions completed (Sunday rest observed).',
        'Honesty Metre: 85 questions attempted • 82% verified accuracy on step-marking rubrics.',
        'Syllabus Status: Mathematics: Real Numbers (Secure), Polynomials (In Review) • Science: Light (Active).',
        'Privacy Boundary: Mind Coach reflections are completely hidden to preserve trust and independence.',
      ],
      statutoryNote: 'Built around the principle that positive parent support requires respecting young adults’ boundaries.',
    },
  },
];

export const PublicLandingPage: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<HelpGoal>('all');
  const [activeModalTool, setActiveModalTool] = useState<ToolItem | null>(null);
  const [activeScreenTab, setActiveScreenTab] = useState<'career' | 'practice' | 'vault' | 'parent'>('career');
  const [briefingEdition, setBriefingEdition] = useState<'student' | 'parent' | 'adult'>('student');
  const [briefingEmail, setBriefingEmail] = useState('');
  const [briefingConsent, setBriefingConsent] = useState(false);
  const [briefingSubmitted, setBriefingSubmitted] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  // Filter tools based on selected starting point
  const filteredTools = TOOLS_DATA.filter((tool) => {
    if (selectedGoal === 'all') return true;
    return tool.goals.includes(selectedGoal);
  });

  const handleBriefingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!briefingEmail || !briefingConsent) return;
    setBriefingSubmitted(true);
  };

  const faqs = [
    {
      q: 'Is LoopEdu meant to replace my school classes or coaching institute?',
      a: 'No. LoopEdu is designed as a calm, 15-minute daily complement to your regular schooling. It helps you solidify what you learn through active retrieval, catches calculation slips before they become habits, and gives you unbundled guidance on streams and college entrance exams without sales pressure.',
    },
    {
      q: 'Can I use LoopEdu completely for free without paying?',
      a: 'Yes. The Career & Stream Planner, College & Cost Comparison, Exam & Opportunity Finder, Deadline Watchlist, Education Updates, and sample diagnostic drills are 100% free with no credit card required. If you want full access to our calibrated 200-question subject banks and chapter milestone question bank PDFs, you can subscribe modularly for ₹299/month per subject.',
    },
    {
      q: 'How does the Career & Stream Planner work differently from online personality quizzes?',
      a: 'Generic online tests ask vague questions and recommend generic job titles. LoopEdu checks official statutory rules (such as whether you took CBSE Mathematics Standard Code 041 or Basic Code 241), unbundles true 4-year degree costs (tuition, living, exam prep, and equipment), suggests feasible starter projects you can build this weekend, and always maps backup alternatives.',
    },
    {
      q: 'What is "The Daily Five" study routine?',
      a: 'Instead of exhausting 4-hour cramming marathons that leave students burned out, The Daily Five delivers exactly five calibrated high-yield questions every morning. It includes progressive Socratic hints (hints that teach first principles rather than spoiling the answer) and step-marking rubrics aligned with official board marking schemes.',
    },
    {
      q: 'How does the Spaced Mistake Review (Error Vault) work?',
      a: 'Whenever you get a question wrong during practice, it is not simply forgotten. It is automatically routed into your Error Vault and resurfaced at spaced intervals: 1 day later, 3 days later, and 7 days later. A concept is cleared from the vault only after you solve it correctly twice in a row without hints.',
    },
    {
      q: 'Can parents see private reflections written in the Mind Coach?',
      a: 'Strictly no. The Mind Coach is a private, bounded companion for student reflection, focus sprints, and habit grounding. Mind Coach entries are encrypted and completely quarantined from parent views, teachers, and counselors. Parents can only see the overall syllabus progress and consistency metrics that the student explicitly permits.',
    },
    {
      q: 'How are questions, answers, and exam notices verified?',
      a: 'Every piece of academic information is cross-referenced against primary official sources: NCERT textbooks, Ministry of Education notifications, CBSE and State Board circulars, and official NTA/UPSC gazettes. We review our directory continuously (verified October 2026) and maintain an open corrections channel at corrections@loopedu.in with a 48-hour response commitment.',
    },
    {
      q: 'Can I cancel or switch my modular subject subscription at any time?',
      a: 'Yes. There are no annual lock-ins. You can subscribe to one subject (e.g. Science for ₹299/mo) while preparing for a mid-term test, switch to another subject, or cancel anytime from your settings with zero cancellation fees.',
    },
  ];

  return (
    <div className="bg-[#F7F6F2] text-[#17324D] min-h-screen selection:bg-[#168C83] selection:text-white">
      {/* =========================================================================
          POSITION 1: CLEAR INTRODUCTION (Everyday Plain Language)
         ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-200/90 bg-gradient-to-b from-white via-[#F7F6F2] to-[#F7F6F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Everyday Plain Language Introduction */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-[#f0f8f7] text-[#168C83] border border-[#d9edea]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Clear, Information-First Guide to LoopEdu</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#17324D] tracking-tight leading-[1.12]">
                Explore careers, discover exams, and study{' '}
                <span className="text-[#168C83]">consistently.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#667085] max-w-2xl leading-relaxed">
                LoopEdu helps Indian students and families replace peer pressure and guesswork with official requirements, verified exam schedules, and steady 15-minute daily practice without burnout.
              </p>

              {/* CTAs: Explore the tools & See a sample plan */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a
                  href="#tools"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#168C83] hover:bg-[#12736b] text-white font-bold text-sm transition shadow-sm hover:shadow active:scale-95 text-center"
                >
                  <span>Explore the tools</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#17324D] border border-slate-200 hover:border-slate-300 font-bold text-sm transition shadow-2xs hover:shadow-xs text-center"
                >
                  <Eye className="w-4 h-4 text-[#168C83]" />
                  <span>See a sample plan</span>
                </a>
              </div>

              {/* Substantiated Trust Signals */}
              <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#667085] font-medium border-t border-slate-200/80">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#168C83] shrink-0" />
                  <span>NCERT &amp; Official Gazettes</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#168C83] shrink-0" />
                  <span>Unbundled College Costs</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#168C83] shrink-0" />
                  <span>Zero Biased Ads for Minors</span>
                </span>
              </div>
            </div>

            {/* Right Column: Real Product Visual Beside Intro */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl p-5 sm:p-6 space-y-4 relative">
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-[#17324D]">Product Preview • Career Evaluation</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#168C83] bg-[#f0f8f7] px-2 py-0.5 rounded-md">
                    Class 10 CBSE
                  </span>
                </div>

                {/* Candidate Attribute Summary */}
                <div className="p-3.5 rounded-2xl bg-[#F7F6F2] border border-slate-200/70 text-xs space-y-1.5">
                  <div className="text-[11px] uppercase font-bold text-[#667085] tracking-wider">
                    Student Profile Inputs
                  </div>
                  <div className="font-semibold text-[#17324D]">
                    Maths Standard (041) • Biology &amp; Prototyping • ₹8L Budget
                  </div>
                  <div className="text-[#667085] text-[11px]">
                    Goal: High-impact healthcare tech career with strong backups
                  </div>
                </div>

                {/* Evaluated Pathway Result Card */}
                <div className="p-4 rounded-2xl border border-[#d9edea] bg-[#f0f8f7]/50 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#168C83] uppercase tracking-wider">
                      Primary Recommendation
                    </span>
                    <span className="text-xs font-bold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      4-Year Unbundled Fee: ₹6.1L
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-950 text-sm">
                    Biomedical Device Engineering &amp; Design (PCM + Bio)
                  </h4>
                  <ul className="text-xs text-[#667085] space-y-1.5">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#168C83] shrink-0 mt-0.5" />
                      <span><strong>Prerequisite Audit:</strong> Meets AICTE &amp; NTA engineering requirements.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#168C83] shrink-0 mt-0.5" />
                      <span><strong>Feasible Mini-Project:</strong> Build an Arduino optical pulse monitor.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#168C83] shrink-0 mt-0.5" />
                      <span><strong>Backup Route:</strong> B.Sc. Clinical Microbiology with lateral transfer.</span>
                    </li>
                  </ul>
                </div>

                {/* Daily Habit Peek */}
                <div className="pt-1 flex items-center justify-between text-xs text-[#667085] border-t border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Daily Practice: 15 mins (5 questions)</span>
                  </span>
                  <Link
                    href="/paths"
                    className="font-bold text-[#168C83] hover:underline flex items-center gap-1"
                  >
                    <span>Try tool</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          POSITION 2: FIND YOUR STARTING POINT ("What do you need help with?")
         ========================================================================= */}
      <section id="starting-point" className="py-12 sm:py-16 bg-white border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#168C83] bg-[#f0f8f7] px-3 py-1 rounded-full border border-[#d9edea]">
              Step 1 • Find Your Starting Point
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17324D] tracking-tight">
              What do you need help with today?
            </h2>
            <p className="text-sm sm:text-base text-[#667085] leading-relaxed">
              Select your current situation below to highlight the tools built specifically for your task. No account registration needed.
            </p>
          </div>

          {/* 5 Starting Point Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              {
                id: 'class-10-subjects' as HelpGoal,
                label: 'Choosing subjects after Class 10',
                desc: 'Stream choices, Maths Standard vs Basic rules, and backups.',
                icon: Compass,
              },
              {
                id: 'class-12-planning' as HelpGoal,
                label: 'Planning after Class 12 / College',
                desc: 'Degree programs, unbundled fees, and entrance routes.',
                icon: GraduationCap,
              },
              {
                id: 'entrance-prep' as HelpGoal,
                label: 'Preparing for entrance exams',
                desc: 'JEE, NEET, CUET practice and 15-min daily consistency.',
                icon: BookOpen,
              },
              {
                id: 'govt-exams' as HelpGoal,
                label: 'Exploring government exams',
                desc: 'Banking, SSC, Railways eligibility and deadline alerts.',
                icon: Award,
              },
              {
                id: 'parent-support' as HelpGoal,
                label: 'Supporting my child (Parent View)',
                desc: 'Calm progress observability without micromanagement.',
                icon: Users,
              },
            ].map((choice) => {
              const isSelected = selectedGoal === choice.id;
              const Icon = choice.icon;
              return (
                <button
                  key={choice.id}
                  onClick={() => setSelectedGoal(choice.id)}
                  className={`p-4 rounded-2xl text-left transition flex flex-col justify-between space-y-3 border ${
                    isSelected
                      ? 'bg-[#f0f8f7] border-[#168C83] shadow-sm ring-1 ring-[#168C83]'
                      : 'bg-white border-slate-200/90 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-[#168C83] text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#168C83]" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs sm:text-sm text-[#17324D] leading-tight">
                      {choice.label}
                    </h3>
                    <p className="text-[11px] text-[#667085] mt-1 leading-normal font-normal">
                      {choice.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Reset filter pill if a specific goal is selected */}
          {selectedGoal !== 'all' && (
            <div className="flex items-center justify-between text-xs text-[#667085] pt-1">
              <span>
                Showing tools matched to your selection.
              </span>
              <button
                onClick={() => setSelectedGoal('all')}
                className="font-bold text-[#168C83] hover:underline"
              >
                Show all 10 tools →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          POSITION 3: EXPLORE THE TOOLS (Largest & Most Useful Part of Page)
         ========================================================================= */}
      <section id="tools" className="py-16 sm:py-24 bg-[#F7F6F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#168C83] bg-[#f0f8f7] px-3 py-1 rounded-full border border-[#d9edea]">
                Step 2 • The LoopEdu Tool Catalogue
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17324D] tracking-tight">
                Explore LoopEdu’s 10 Core Tools
              </h2>
              <p className="text-sm sm:text-base text-[#667085] leading-relaxed">
                Each tool answers five fundamental questions: who it is for, the problem it solves, what you provide, what you receive, and its actual availability.
              </p>
            </div>

            <div className="text-xs text-[#667085] font-semibold bg-white px-3.5 py-2 rounded-xl border border-slate-200 shrink-0">
              Showing {filteredTools.length} of 10 tools
            </div>
          </div>

          {/* Tool Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  className="rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-[#168C83]/50"
                >
                  {/* Card Header: Group, Name, Badges */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {tool.group}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            tool.availability === 'Available'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : tool.availability === 'Interactive Preview'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {tool.availability}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-50 text-[#17324D] border border-slate-200">
                          {tool.pricingBadge}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#f0f8f7] text-[#168C83] flex items-center justify-center shrink-0 border border-[#d9edea]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-[#17324D] leading-tight">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-[#667085] mt-1 leading-relaxed font-normal">
                          {tool.problemSolved}
                        </p>
                      </div>
                    </div>

                    {/* The 5 Key Questions Answered */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
                      <div>
                        <span className="font-bold text-[#17324D] block">Who is it for?</span>
                        <span className="text-[#667085]">{tool.whoIsItFor}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        <div className="p-2.5 rounded-xl bg-[#F7F6F2] border border-slate-200/60">
                          <span className="text-[10px] uppercase font-bold text-[#667085] block">
                            What you provide
                          </span>
                          <span className="text-[#17324D] font-medium text-[11px] leading-snug block mt-0.5">
                            {tool.whatYouProvide}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-[#f0f8f7] border border-[#d9edea]">
                          <span className="text-[10px] uppercase font-bold text-[#168C83] block">
                            What you receive
                          </span>
                          <span className="text-[#17324D] font-medium text-[11px] leading-snug block mt-0.5">
                            {tool.whatYouReceive}
                          </span>
                        </div>
                      </div>

                      {/* Small concrete sample output preview */}
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[#168C83] block">
                          Concrete Sample Output
                        </span>
                        <p className="text-[11px] text-[#17324D] font-mono leading-relaxed">
                          {tool.sampleSummary}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions: View example & Open tool */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveModalTool(tool)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#17324D] hover:text-[#168C83] transition px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#168C83]" />
                      <span>View example</span>
                    </button>

                    <Link
                      href={tool.route}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#168C83] hover:bg-[#12736b] transition px-4 py-2 rounded-xl shadow-2xs active:scale-95"
                    >
                      <span>Open tool</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          POSITION 4: SEE HOW IT WORKS (Actual Screens & Sample Outputs)
         ========================================================================= */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-white border-y border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#168C83] bg-[#f0f8f7] px-3 py-1 rounded-full border border-[#d9edea]">
              Step 3 • Live Demonstrations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17324D] tracking-tight">
              See How the Tools Work in Practice
            </h2>
            <p className="text-sm sm:text-base text-[#667085] leading-relaxed">
              LoopEdu does not hide behind generic marketing promises. Inspect our concrete inputs, unbundled calculators, step-by-step diagnostic hint systems, and calm parent views below.
            </p>
          </div>

          {/* Interactive Screen Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
            {[
              { id: 'career', label: '1. Career & Stream Comparison' },
              { id: 'practice', label: '2. 15-Minute Daily Practice' },
              { id: 'vault', label: '3. Spaced Mistake Vault' },
              { id: 'parent', label: '4. Calm Parent Observability' },
            ].map((tab) => {
              const isActive = activeScreenTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveScreenTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap border ${
                    isActive
                      ? 'bg-[#17324D] text-white border-[#17324D] shadow-xs'
                      : 'bg-white text-[#667085] hover:text-[#17324D] border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Screen Content */}
          <div className="rounded-3xl bg-[#F7F6F2] border border-slate-200 p-6 sm:p-10 shadow-sm">
            {activeScreenTab === 'career' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#168C83]">
                      SAMPLE EVALUATOR RUN: CANDIDATE ID #1049
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#17324D] mt-0.5">
                      3-Pathway Stream &amp; Degree Roadmap
                    </h3>
                  </div>
                  <Link
                    href="/paths"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#168C83] px-3.5 py-2 rounded-xl"
                  >
                    <span>Launch Planner</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Path 1 */}
                  <div className="p-5 rounded-2xl bg-white border border-[#168C83] shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#168C83] bg-[#f0f8f7] px-2 py-0.5 rounded">
                        Primary Match
                      </span>
                      <span className="text-xs font-bold text-[#17324D]">₹6.1L 4-Yr Total</span>
                    </div>
                    <h4 className="font-extrabold text-[#17324D] text-base">
                      Biomedical Device Engineering
                    </h4>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      Stream: Science PCM with Biology elective. Satisfies AICTE prerequisites for engineering while retaining medical technology focus.
                    </p>
                    <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
                      <div className="font-semibold text-slate-800">Unbundled 4-Year Cost:</div>
                      <div className="text-[11px] text-[#667085]">
                        Tuition: ₹3.4L • Hostel: ₹1.8L • Prep: ₹45k • Equipment: ₹45k
                      </div>
                    </div>
                  </div>

                  {/* Path 2 */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Alternative
                      </span>
                      <span className="text-xs font-bold text-[#17324D]">₹4.2L 4-Yr Total</span>
                    </div>
                    <h4 className="font-extrabold text-[#17324D] text-base">
                      Pure Biomedical Sciences (PCB)
                    </h4>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      Stream: PCB. Leads to clinical research, diagnostic genetics, and pharmacology. Zero reliance on higher engineering calculus.
                    </p>
                    <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
                      <div className="font-semibold text-slate-800">Unbundled 4-Year Cost:</div>
                      <div className="text-[11px] text-[#667085]">
                        Tuition: ₹2.2L • Hostel: ₹1.6L • Prep: ₹20k • Lab fees: ₹20k
                      </div>
                    </div>
                  </div>

                  {/* Path 3 */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Tech Track
                      </span>
                      <span className="text-xs font-bold text-[#17324D]">₹9.5L 4-Yr Total</span>
                    </div>
                    <h4 className="font-extrabold text-[#17324D] text-base">
                      Computer Science &amp; AI
                    </h4>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      Stream: PCM with Computer Science. Direct path to software engineering, algorithmic trading, and data platforms.
                    </p>
                    <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
                      <div className="font-semibold text-slate-800">Unbundled 4-Year Cost:</div>
                      <div className="text-[11px] text-[#667085]">
                        Tuition: ₹5.6L • Hostel: ₹2.4L • Prep: ₹80k • Hardware: ₹70k
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeScreenTab === 'practice' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#168C83]">
                      THE DAILY FIVE: QUESTION 2 OF 5
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#17324D] mt-0.5">
                      Class 10 Science: Spherical Mirror Calculations
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
                    Target Time: 3 mins
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
                  <div className="font-semibold text-slate-900 text-sm leading-relaxed">
                    A concave mirror produces three times magnified real image of an object placed at 10 cm in front of it. Where is the image located, and what is its focal length?
                  </div>

                  {/* 3-Stage Progressive Socratic Hints */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    <span className="font-bold text-[#17324D] block uppercase tracking-wider text-[11px]">
                      Progressive Socratic Guidance (No Spoiler Answers)
                    </span>
                    <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-slate-800 space-y-1">
                      <strong className="text-blue-900">Hint Stage 1 (Sign Convention):</strong>
                      <p>For a concave mirror forming a real image, is magnification positive or negative? Remember: real images are inverted (m = -v/u).</p>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 text-slate-800 space-y-1">
                      <strong className="text-amber-900">Hint Stage 2 (Image Distance):</strong>
                      <p>With m = -3 and u = -10 cm, substitute into m = -v/u to calculate v before setting up the mirror formula.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#f0f8f7] border border-[#d9edea] text-xs flex items-center justify-between">
                    <span className="font-bold text-[#168C83]">NCERT Marking Rubric:</span>
                    <span className="text-slate-600">1 mark formula &amp; sign • 1 mark substitution • 1 mark units (v = -30 cm, f = -7.5 cm)</span>
                  </div>
                </div>
              </div>
            )}

            {activeScreenTab === 'vault' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#168C83]">
                      SPACED REPETITION ENGINE (LEITNER INTERVALS)
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#17324D] mt-0.5">
                      The Mistake Comeback Notebook
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    Rule: 2 Consecutive Correct Solves Required to Clear
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-2xs space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                      Interval 1 • 24 Hours
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">Snell’s Law Optical Medium</h4>
                    <p className="text-xs text-[#667085]">
                      Candidate applied refractive index ratio in reverse order. Scheduled for re-drill tomorrow morning.
                    </p>
                    <div className="text-[11px] font-bold text-rose-600 pt-1">Streak: 0 / 2 Unassisted</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      Interval 2 • 72 Hours
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">Quadratic Discriminant Boundary</h4>
                    <p className="text-xs text-[#667085]">
                      Solved correctly on day 1. Resurfacing at 72h to test consolidated long-term memory.
                    </p>
                    <div className="text-[11px] font-bold text-amber-600 pt-1">Streak: 1 / 2 Unassisted</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Interval 3 • Mastered
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">Ohm’s Law Resistivity Calculation</h4>
                    <p className="text-xs text-[#667085]">
                      Solved correctly twice in a row without hints. Cleared from error queue and stored in archive.
                    </p>
                    <div className="text-[11px] font-bold text-emerald-600 pt-1">Status: Mastered (Archived)</div>
                  </div>
                </div>
              </div>
            )}

            {activeScreenTab === 'parent' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#168C83]">
                      PARENT OBSERVABILITY VIEW (SAMPLE TELEMETRY)
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#17324D] mt-0.5">
                      Calm Observability Without Nagging
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-[#168C83] bg-[#f0f8f7] border border-[#d9edea] px-3 py-1.5 rounded-xl">
                    Student Consent Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-[#667085] block">Weekly Consistency</span>
                    <div className="text-2xl font-extrabold text-[#17324D] mt-1">5 of 6 Days</div>
                    <span className="text-[11px] text-emerald-600 font-medium">Sunday rest day respected</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-[#667085] block">Honesty Metre (Step Accuracy)</span>
                    <div className="text-2xl font-extrabold text-[#17324D] mt-1">82.4%</div>
                    <span className="text-[11px] text-slate-500 font-medium">85 calibrated questions attempted</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-[#667085] block">Privacy Invariant</span>
                    <div className="text-2xl font-extrabold text-emerald-600 mt-1">Strictly Confined</div>
                    <span className="text-[11px] text-slate-500 font-medium">Mind Coach notes remain private</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          POSITION 5: COVERAGE AND AVAILABILITY
         ========================================================================= */}
      <section id="coverage" className="py-16 sm:py-24 bg-[#F7F6F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#168C83] bg-[#f0f8f7] px-3 py-1 rounded-full border border-[#d9edea]">
              Step 4 • Coverage &amp; Syllabus Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17324D] tracking-tight">
              Supported Classes, Exams, Subjects &amp; Languages
            </h2>
            <p className="text-sm sm:text-base text-[#667085] leading-relaxed">
              Transparent curriculum mapping. Every subject track references official statutory syllabi, gazetted exam codes, and standard LaTeX mathematical notation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Column 1: Classes */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-lg text-[#17324D]">Supported Cohorts</h3>
              <ul className="text-xs text-[#667085] space-y-2 leading-relaxed">
                <li className="flex items-center justify-between">
                  <span>Class 10 (CBSE &amp; State)</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Available</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Class 11 &amp; 12 Stream Guidance</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Available</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Class 9 Foundation Track</span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Preview</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>College Graduates &amp; Aspirants</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Available</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Exams */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-lg text-[#17324D]">Exams &amp; Boards</h3>
              <ul className="text-xs text-[#667085] space-y-2 leading-relaxed">
                <li className="flex items-center justify-between">
                  <span>CBSE Class 10 (Codes 041, 241, 086)</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Available</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>JEE Main &amp; NEET-UG Foundation</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Available</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>CUET-UG &amp; State Entrance (KCET)</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Available</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Banking &amp; SSC (IBPS, RRB, CGL)</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Available</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Subjects */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-lg text-[#17324D]">Subject Banks</h3>
              <ul className="text-xs text-[#667085] space-y-2 leading-relaxed">
                <li>• Mathematics Standard (Code 041)</li>
                <li>• Mathematics Basic (Code 241)</li>
                <li>• Science (Code 086 - Phys, Chem, Bio)</li>
                <li>• Social Science (Code 087)</li>
                <li>• English Language &amp; Literature</li>
                <li>• AI Skill Subject (Code 417)</li>
                <li>• German Language (Code 017)</li>
                <li>• Quantitative Aptitude &amp; Reasoning</li>
              </ul>
            </div>

            {/* Column 4: Mediums & Availability */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-lg text-[#17324D]">Delivery Standards</h3>
              <ul className="text-xs text-[#667085] space-y-2 leading-relaxed">
                <li>• English medium with bilingual glossary support</li>
                <li>• Full KaTeX rendering for mathematical formulas</li>
                <li>• Web, Android &amp; iOS responsive viewports</li>
                <li>• Official NCERT 2026-2027 curriculum alignment</li>
                <li>• Verified October 2026 statutory audit</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          POSITION 6: TRUST AND PRIVACY
         ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#168C83] bg-[#f0f8f7] px-3 py-1 rounded-full border border-[#d9edea]">
              Step 5 • Verification &amp; Privacy Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17324D] tracking-tight">
              How Information is Checked and Student Data Handled
            </h2>
            <p className="text-sm sm:text-base text-[#667085] leading-relaxed">
              We publish only processes we genuinely operate. No black-box AI scores, no commercial sales of student phone numbers, and zero third-party tracking for minors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1: Source Verification */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#F7F6F2] border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-[#168C83] flex items-center justify-center font-bold shadow-2xs border border-slate-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-[#17324D]">
                Primary Gazette Verification
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Exam eligibility, application fees, and deadlines are checked against primary statutory gazettes (Ministry of Education, NTA, CBSE, UPSC, KEA). Every article includes dated evidence and exact government URLs.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#168C83]">
                Last Verified: October 2026 Audit
              </div>
            </div>

            {/* Pillar 2: Student Privacy */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#F7F6F2] border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-[#168C83] flex items-center justify-center font-bold shadow-2xs border border-slate-200">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-[#17324D]">
                DPDP Act 2023 Student Safeguards
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Mind Coach reflections are encrypted and strictly quarantined from parents and educators. Student profiles cannot be sold to coaching syndicates. Accounts feature self-service sanitized CSV/JSON exports and 30-day statutory cooling deletion.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#168C83]">
                100% Ad-Free for Under-18 Students
              </div>
            </div>

            {/* Pillar 3: Correction Mechanism */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#F7F6F2] border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-[#168C83] flex items-center justify-center font-bold shadow-2xs border border-slate-200">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-[#17324D]">
                Public Editorial Corrections
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Education notices evolve rapidly. If an exam board amends an eligibility rule or date, our editorial desk updates the central repository within 48 hours. Report any discrepancy directly to our public desk.
              </p>
              <div className="pt-2 text-[11px] font-bold text-slate-800">
                Email: corrections@loopedu.in
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          POSITION 7: DAILY BRIEFING PREVIEW (Show Value Before Asking for Signup)
         ========================================================================= */}
      <section id="updates" className="py-16 sm:py-24 bg-[#F7F6F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#168C83] bg-[#f0f8f7] px-3 py-1 rounded-full border border-[#d9edea]">
              Step 6 • Verified News &amp; Updates
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17324D] tracking-tight">
              Daily Briefing Preview: Value First
            </h2>
            <p className="text-sm sm:text-base text-[#667085] leading-relaxed">
              Inspect three recent verified education notices below. Each notice states the exact publishing authority, date, and affected student cohort before asking for your email.
            </p>
          </div>

          {/* 3 Recent Verified Items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Item 1 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold text-[#667085]">
                  <span>CBSE &amp; Boards</span>
                  <span>October 2026</span>
                </div>
                <h3 className="font-extrabold text-base text-[#17324D] leading-snug">
                  CBSE Formally Implements Twice-a-Year Board Exams for Class 10 (NEP 2020)
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Phase 1 mandatory in Feb-March; Phase 2 improvement optional in May-June. The best score across both attempts is retained on the final official marksheet.
                </p>
                <div className="text-[11px] text-[#168C83] font-semibold">
                  Affected: Class 10 candidates (2026–2027 cycle)
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Source: Ministry of Education</span>
                <a
                  href="https://cbse.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#168C83] hover:underline flex items-center gap-1"
                >
                  <span>Official notice</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Item 2 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold text-[#667085]">
                  <span>JEE Main &amp; NEET</span>
                  <span>October 2026</span>
                </div>
                <h3 className="font-extrabold text-base text-[#17324D] leading-snug">
                  NTA Standardizes Shift Normalization &amp; Strict NCERT Rationalization
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Percentile normalization across multi-shift sessions updated. Paper design penalizes out-of-syllabus coaching memorization and rewards NCERT first principles.
                </p>
                <div className="text-[11px] text-[#168C83] font-semibold">
                  Affected: JEE Main 2027 engineering aspirants
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Source: National Testing Agency</span>
                <a
                  href="https://jeemain.nta.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#168C83] hover:underline flex items-center gap-1"
                >
                  <span>Official notice</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Item 3 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold text-[#667085]">
                  <span>University UG</span>
                  <span>October 2026</span>
                </div>
                <h3 className="font-extrabold text-base text-[#17324D] leading-snug">
                  CUET-UG Adopts Single-Shift Testing for High-Volume Subjects
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed">
                  To eliminate multi-day normalization score discrepancies, high-registration subjects are conducted in single-shift hybrid formats across India.
                </p>
                <div className="text-[11px] text-[#168C83] font-semibold">
                  Affected: 1.3 million central university applicants
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Source: UGC &amp; NTA Circular</span>
                <a
                  href="https://cuetug.ntaonline.in"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#168C83] hover:underline flex items-center gap-1"
                >
                  <span>Official notice</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Signup Form with Explicit Consent */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm max-w-3xl mx-auto space-y-5">
            <div className="space-y-1 text-center">
              <h3 className="text-xl font-extrabold text-[#17324D]">
                Get the 3-Minute Daily Morning Briefing
              </h3>
              <p className="text-xs text-[#667085]">
                Delivered every morning at 7:00 AM IST. Three verified updates + key deadlines + one feasible action.
              </p>
            </div>

            {briefingSubmitted ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1.5 animate-in fade-in">
                <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Subscription Confirmed</span>
                </div>
                <p className="text-xs text-emerald-700">
                  You are registered for the morning edition. You can unsubscribe anytime with one click.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBriefingSubmit} className="space-y-4">
                {/* Edition Selector */}
                <div className="flex items-center justify-center gap-2">
                  {[
                    { id: 'student', label: 'Student Edition' },
                    { id: 'parent', label: 'Parent Edition' },
                    { id: 'adult', label: 'Aspirant Edition' },
                  ].map((ed) => (
                    <button
                      key={ed.id}
                      type="button"
                      onClick={() => setBriefingEdition(ed.id as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                        briefingEdition === ed.id
                          ? 'bg-[#17324D] text-white border-[#17324D]'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {ed.label}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                  <input
                    type="email"
                    required
                    value={briefingEmail}
                    onChange={(e) => setBriefingEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#168C83] focus:border-transparent outline-none bg-white text-slate-900"
                  />
                  <button
                    type="submit"
                    disabled={!briefingConsent}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap shadow-xs ${
                      briefingConsent
                        ? 'bg-[#168C83] hover:bg-[#12736b] text-white cursor-pointer active:scale-95'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Subscribe Free
                  </button>
                </div>

                {/* Explicit Contact & Messaging Consent Checkbox */}
                <div className="max-w-lg mx-auto flex items-start gap-2 text-[11px] text-[#667085]">
                  <input
                    type="checkbox"
                    id="consent-checkbox"
                    checked={briefingConsent}
                    onChange={(e) => setBriefingConsent(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-[#168C83] focus:ring-[#168C83]"
                  />
                  <label htmlFor="consent-checkbox" className="leading-snug cursor-pointer">
                    I agree to receive the daily 3-minute morning email briefing. Zero spam, zero commercial sales of contact info. Unsubscribe anytime with 1 click.
                  </label>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          POSITION 8: PLANS AND FAQS (Explain Free Access & Paid Benefits)
         ========================================================================= */}
      <section id="pricing" className="py-16 sm:py-24 bg-white border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#168C83] bg-[#f0f8f7] px-3 py-1 rounded-full border border-[#d9edea]">
              Step 7 • Plans &amp; Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17324D] tracking-tight">
              Transparent Access: Free Guidance &amp; Modular Practice
            </h2>
            <p className="text-sm sm:text-base text-[#667085] leading-relaxed">
              We believe core orientation and exam eligibility should be free for every Indian family. Deep practice tracks are unbundled so you only subscribe to what you need.
            </p>
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1: Free Explorer */}
            <div className="p-7 rounded-3xl bg-[#F7F6F2] border border-slate-200 space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200 inline-block">
                  Always Free
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#17324D]">₹0</span>
                  <span className="text-xs text-[#667085]">/ forever</span>
                </div>
                <h3 className="font-extrabold text-base text-[#17324D]">
                  Guidance, Eligibility &amp; Updates
                </h3>
                <ul className="text-xs text-[#667085] space-y-2 pt-2 border-t border-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#168C83] shrink-0" />
                    <span>3-Pathway Career &amp; Stream Comparator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#168C83] shrink-0" />
                    <span>National Exam Directory &amp; AST Eligibility</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#168C83] shrink-0" />
                    <span>Daily 3-Minute Morning Gazette Digest</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#168C83] shrink-0" />
                    <span>Mind Coach Focus Timer &amp; Crisis Directory</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#168C83] shrink-0" />
                    <span>Sample diagnostic practice sets</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/paths"
                className="w-full text-center py-3 rounded-xl bg-white hover:bg-slate-50 text-[#17324D] font-bold text-xs border border-slate-200 transition"
              >
                Start Exploring Free
              </Link>
            </div>

            {/* Tier 2: Modular Subject Pass (Most Popular) */}
            <div className="p-7 rounded-3xl bg-[#17324D] text-white border-2 border-[#168C83] shadow-lg space-y-5 flex flex-col justify-between relative">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#168C83] px-2.5 py-1 rounded-md inline-block">
                    Recommended Modular Pass
                  </span>
                  <span className="text-[11px] text-teal-300 font-semibold">Zero forced bundles</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">₹299</span>
                  <span className="text-xs text-slate-300">/ month per subject</span>
                </div>
                <h3 className="font-extrabold text-base text-white">
                  Full 200-Question Subject Practice
                </h3>
                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Complete calibrated 200 questions for your chosen track</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Step-by-step NCERT marking solutions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Spaced Repetition Error Vault (1d/3d/7d intervals)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>10-Year Question Bank chapter milestone PDFs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Parent Observability Hub linking</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/catalogue"
                className="w-full text-center py-3 rounded-xl bg-[#168C83] hover:bg-[#12736b] text-white font-bold text-xs transition shadow-sm active:scale-95"
              >
                Choose Subject Track
              </Link>
            </div>

            {/* Tier 3: Annual Complete Pass */}
            <div className="p-7 rounded-3xl bg-[#F7F6F2] border border-slate-200 space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200 inline-block">
                  Annual Pass
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#17324D]">₹1,499 – ₹2,999</span>
                  <span className="text-xs text-[#667085]">/ year</span>
                </div>
                <h3 className="font-extrabold text-base text-[#17324D]">
                  All Subjects &amp; Full Year Support
                </h3>
                <ul className="text-xs text-[#667085] space-y-2 pt-2 border-t border-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#168C83] shrink-0" />
                    <span>All 8 published subject banks included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#168C83] shrink-0" />
                    <span>Complete question vault with 1,600 total questions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#168C83] shrink-0" />
                    <span>Unlimited diagnostic drills and review queues</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#168C83] shrink-0" />
                    <span>Priority human counselor review queue for stream plans</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/catalogue"
                className="w-full text-center py-3 rounded-xl bg-white hover:bg-slate-50 text-[#17324D] font-bold text-xs border border-slate-200 transition"
              >
                View Annual Plans
              </Link>
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="pt-8 border-t border-slate-200 space-y-6 max-w-4xl mx-auto">
            <h3 className="text-2xl font-extrabold text-[#17324D] text-center">
              Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = faqOpenIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#17324D] hover:bg-slate-50 transition"
                    >
                      <span>{faq.q}</span>
                      <ChevronRight
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                          isOpen ? 'rotate-90 text-[#168C83]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs text-[#667085] leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          POSITION 9: FINAL ACTION & FOOTER
         ========================================================================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-[#F7F6F2] border-b border-slate-200/90 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#f0f8f7] text-[#168C83] flex items-center justify-center mx-auto border border-[#d9edea]">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17324D] tracking-tight">
            Ready to replace exam stress with steady clarity?
          </h2>

          <p className="text-sm sm:text-base text-[#667085] max-w-2xl mx-auto leading-relaxed">
            Compare grounded pathways, verify your exam eligibility, or start with 15 minutes of calm daily practice today.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#tools"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#168C83] hover:bg-[#12736b] text-white font-bold text-sm transition shadow-sm active:scale-95"
            >
              <span>Explore all tools</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/paths"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#17324D] border border-slate-200 font-bold text-sm transition"
            >
              <Compass className="w-4 h-4 text-[#168C83]" />
              <span>Launch Career Planner</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SAMPLE OUTPUT MODAL / DRAWER
         ========================================================================= */}
      {activeModalTool && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#168C83] bg-[#f0f8f7] px-2.5 py-0.5 rounded-full border border-[#d9edea]">
                  {activeModalTool.group}
                </span>
                <h3 className="text-2xl font-extrabold text-[#17324D]">
                  {activeModalTool.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalTool(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                aria-label="Close sample preview modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#F7F6F2] border border-slate-200/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#667085]">Problem It Solves</span>
                <p className="text-slate-800 leading-relaxed font-medium">{activeModalTool.problemSolved}</p>
              </div>

              {/* Sample Details */}
              <div className="p-4 rounded-2xl border border-[#d9edea] bg-[#f0f8f7]/50 space-y-3">
                <span className="text-[11px] font-bold text-[#168C83] uppercase tracking-wider block">
                  {activeModalTool.sampleDetails.title}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalTool.sampleDetails.inputs.map((inp, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200/70">
                      <span className="text-[9px] uppercase font-bold text-[#667085] block">{inp.label}</span>
                      <span className="font-semibold text-slate-900 text-xs">{inp.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <div className="font-bold text-[#17324D] text-sm mb-2">
                    {activeModalTool.sampleDetails.outputSummary}
                  </div>
                  <ul className="space-y-2 text-slate-700">
                    {activeModalTool.sampleDetails.keyHighlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-[#168C83] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {activeModalTool.sampleDetails.statutoryNote && (
                  <div className="pt-2 border-t border-slate-200/60 text-[10px] text-[#667085] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#168C83] shrink-0" />
                    <span>{activeModalTool.sampleDetails.statutoryNote}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModalTool(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition"
              >
                Close preview
              </button>

              <Link
                href={activeModalTool.route}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#168C83] hover:bg-[#12736b] text-white font-bold text-xs transition shadow-sm active:scale-95"
              >
                <span>Open {activeModalTool.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
