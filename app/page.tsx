import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  ShieldAlert,
  Sparkles,
  HelpCircle,
  Layers,
  Flame,
  Check,
  Target,
  Clock,
  RotateCcw,
  TrendingUp,
  ShieldCheck,
  Award,
  Zap,
  BarChart3,
  Brain,
  Share2,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { getSessionUser } from '@/lib/auth/session';
import { ALL_SUBJECTS } from '@/lib/subjects';
import { InteractiveSampleCard } from '@/components/InteractiveSampleCard';
import { SubjectRequestForm } from '@/components/SubjectRequestForm';

export default async function HomePage() {
  const user = await getSessionUser();

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-16">
      {/* 1. Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>🎁 Launch Special: 10 High-Yield Questions 100% Free Every Week • Resets Sunday</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-forest-950 leading-[1.08]">
            A little more focus.<br />
            A lot more practice.
          </h1>

          <p className="text-lg sm:text-xl text-forest-800 leading-relaxed font-normal max-w-2xl">
            <strong>LoopEdu</strong> is the 15-minute daily habit platform for academic excellence and competitive exams. Starting with CBSE Class 10. Claim your <strong>10 free high-yield questions every week</strong> with real-time AI step hints, active recall error revision, and instant NCERT diagnostic scorecards for parents.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            {user ? (
              <Link
                href="/learn"
                className="inline-flex items-center justify-center gap-2 bg-limeaccent hover:bg-limeaccent-hover text-forest-950 font-bold px-7 py-3.5 rounded-xl text-sm transition shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Continue Study Path (15 Mins)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/onboarding"
                className="inline-flex items-center justify-center gap-2 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold px-7 py-3.5 rounded-xl text-sm transition shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Claim 10 Free Questions / Week →</span>
              </Link>
            )}

            <Link
              href="#pillars"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-paper-50 text-forest-900 font-semibold px-6 py-3.5 rounded-xl text-sm border border-academic-border transition shadow-sm"
            >
              <span>Explore The 3 Pillars</span>
            </Link>

            <Link
              href="/parent"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-paper-50 text-forest-900 font-semibold px-5 py-3.5 rounded-xl text-sm border border-academic-border transition shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-forest-700" />
              <span>Parent Hub</span>
            </Link>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-academic-subtle">
            <span className="font-bold text-forest-950 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              ✓ 10 Free Questions / Week
            </span>
            <span className="text-forest-400">•</span>
            <span className="font-semibold text-forest-950">
              7-Day Rolling Reset
            </span>
            <span className="text-forest-400">•</span>
            <span>Optional ₹299/mo for Unlimited</span>
            <span className="text-forest-400">•</span>
            <span>Instant Parent WhatsApp Report</span>
          </div>
        </div>
      </section>

      {/* 2. The 3 Core Pillars of LoopEdu */}
      <section id="pillars" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-forest-700 bg-forest-100 px-3 py-1 rounded-full">
            The LoopEdu Method
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950">
            Engineered for high-stakes exam mastery without burnout.
          </h2>
          <p className="text-xs sm:text-sm text-academic-subtle">
            Three interconnected loops that replace endless cramming with 15 minutes of sharp, daily focus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pillar 1: The Daily Five */}
          <div className="rounded-3xl bg-white border border-academic-border p-6 sm:p-7 shadow-sm flex flex-col justify-between hover:border-forest-400 transition group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold text-lg">
                  <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-full">
                  Pillar 1 • Student Gamification
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-xl text-forest-950 group-hover:text-forest-800 transition">
                  The Daily Five
                </h3>
                <p className="text-xs text-academic-subtle mt-1 font-medium">
                  Bite-sized routine • Psychological streak momentum
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs text-forest-800 leading-relaxed border-t border-academic-border/60">
                <div className="space-y-1">
                  <strong className="text-forest-950 font-bold block">1. The Bite-Sized Routine:</strong>
                  Every morning, the student receives exactly five high-yield questions tailored to their selected subject tracks (like Mathematics Standard or German) to prevent study fatigue.
                </div>
                <div className="space-y-1">
                  <strong className="text-forest-950 font-bold block">2. The Streak Multiplier:</strong>
                  Completing the daily set unlocks a small batch of XP and maintains a consecutive-day streak counter, using psychological momentum to build a consistent daily habit.
                </div>
                <div className="space-y-1">
                  <strong className="text-forest-950 font-bold block">3. The Unlockable Reward:</strong>
                  Finishing a full chapter's "Daily Five" loop grants direct access to download the curated, high-value 10-Year Board Paper Question Bank PDFs for that unit.
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-academic-border/60 mt-6 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                12–15 Mins / Day
              </span>
              <Link href="/learn" className="text-xs font-bold text-forest-900 group-hover:underline inline-flex items-center gap-1">
                <span>Try Daily Five</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Pillar 2: The Mistake Comeback */}
          <div className="rounded-3xl bg-white border border-academic-border p-6 sm:p-7 shadow-sm flex flex-col justify-between hover:border-forest-400 transition group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-forest-50 border border-forest-200 text-forest-800 flex items-center justify-center font-bold text-lg">
                  <RotateCcw className="w-6 h-6 text-forest-700" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-forest-800 bg-forest-100 px-2.5 py-1 rounded-full">
                  Pillar 2 • Active Recall
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-xl text-forest-950 group-hover:text-forest-800 transition">
                  The Mistake Comeback
                </h3>
                <p className="text-xs text-academic-subtle mt-1 font-medium">
                  Spaced revision loops • Redemption mastery
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs text-forest-800 leading-relaxed border-t border-academic-border/60">
                <div className="space-y-1">
                  <strong className="text-forest-950 font-bold block">1. The Automated Error Vault:</strong>
                  Every single question a student gets wrong is quietly tagged and routed into a personalized, hidden digital storage bank instead of disappearing.
                </div>
                <div className="space-y-1">
                  <strong className="text-forest-950 font-bold block">2. Spaced Revision Sessions:</strong>
                  The platform dynamically resurfaces these flagged problems 3 days, 7 days, and 14 days later, forcing active recall right when the concept is about to be forgotten.
                </div>
                <div className="space-y-1">
                  <strong className="text-forest-950 font-bold block">3. The Redemption Clearance:</strong>
                  A concept is only marked as "Mastered" and removed from the active loop once the student successfully solves the problem twice in a row without using AI hints.
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-academic-border/60 mt-6 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-forest-800 bg-forest-100 px-2.5 py-1 rounded-md">
                3d • 7d • 14d Spaced Loops
              </span>
              <Link href="/learn" className="text-xs font-bold text-forest-900 group-hover:underline inline-flex items-center gap-1">
                <span>View Error Vault</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Pillar 3: The Parent Hub */}
          <div className="rounded-3xl bg-white border border-academic-border p-6 sm:p-7 shadow-sm flex flex-col justify-between hover:border-forest-400 transition group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-limeaccent/20 border border-limeaccent/40 text-forest-950 flex items-center justify-center font-bold text-lg">
                  <BarChart3 className="w-6 h-6 text-forest-900" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-forest-900 bg-limeaccent/30 px-2.5 py-1 rounded-full">
                  Pillar 3 • Observability
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-xl text-forest-950 group-hover:text-forest-800 transition">
                  The Parent Hub
                </h3>
                <p className="text-xs text-academic-subtle mt-1 font-medium">
                  Anti-micromanagement • Transparent Honesty Metre
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs text-forest-800 leading-relaxed border-t border-academic-border/60">
                <div className="space-y-1">
                  <strong className="text-forest-950 font-bold block">1. The Anti-Micro-Management View:</strong>
                  Parents receive a clean, high-level summary that answers two critical questions at a glance: <em>"Did my child complete today's path?"</em> and <em>"What chapters are fully secure?"</em>
                </div>
                <div className="space-y-1">
                  <strong className="text-forest-950 font-bold block">2. The Honesty Metre:</strong>
                  Instead of vague percentages, the dashboard highlights the absolute number of curated questions attempted versus the actual accuracy rate, providing an uninflated view of exam readiness.
                </div>
                <div className="space-y-1">
                  <strong className="text-forest-950 font-bold block">3. Weekly Actionable Insights:</strong>
                  The system automatically generates a simple text notification for the parent (e.g., <em>"Amit completed 5/5 tracks this week but needs a quick revision on Quadratic Equations before pre-boards"</em>).
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-academic-border/60 mt-6 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-forest-950 bg-limeaccent/30 px-2.5 py-1 rounded-md">
                1-Click WhatsApp Reports
              </span>
              <Link href="/parent" className="text-xs font-bold text-forest-900 group-hover:underline inline-flex items-center gap-1">
                <span>Open Parent Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The 6-Step Daily Practice Cycle */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-forest-700">
            The Daily Learning Cycle
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950 mt-1">
            How serious students build exam confidence.
          </h2>
          <p className="text-xs sm:text-sm text-academic-subtle mt-2">
            No endless scrolling. A quiet, purposeful routine designed around active recall and spaced revision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            {
              step: '1',
              title: 'Choose your goal',
              desc: 'Select CBSE Class 10, your specific tracks (Basic vs Standard), and daily time.',
            },
            {
              step: '2',
              title: 'Get daily assignment',
              desc: 'Receive a manageable 15-minute set tailored to current topics and past errors.',
            },
            {
              step: '3',
              title: 'Attempt questions',
              desc: 'Work through problems on paper or MCQs. Active recall over passive reading.',
            },
            {
              step: '4',
              title: 'Understand mistakes',
              desc: 'In-flow AI hints, plain analogies, and verified step-by-step model solutions.',
            },
            {
              step: '5',
              title: 'Revise with games',
              desc: 'Daily Five and Mistake Comeback reinforce concepts before pre-boards.',
            },
            {
              step: '6',
              title: 'See honest progress',
              desc: 'Track chapter coverage, accuracy, and clear actionable next steps.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl bg-white border border-academic-border p-5 space-y-2 shadow-sm hover:border-academic-borderStrong transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="w-7 h-7 rounded-lg bg-forest-100 text-forest-900 flex items-center justify-center font-serif font-bold text-xs border border-forest-200">
                  {item.step}
                </span>
                <h3 className="font-serif font-bold text-sm text-forest-950 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-forest-800 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive Sample Question Section */}
      <section id="sample" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-forest-700">
              Interactive Preview
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950 mt-1">
              Test a question right now.
            </h2>
            <p className="text-xs text-academic-subtle mt-0.5">
              Experience the mathematical formatting and step-by-step model explanations.
            </p>
          </div>
          <Link
            href="/challenge"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-900 hover:text-forest-950 underline"
          >
            <span>Take full 5-question challenge →</span>
          </Link>
        </div>
        <InteractiveSampleCard />
      </section>

      {/* 4. Subject Catalogue Preview */}
      <section id="subjects" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-forest-700">
              Build your revision library
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950 mt-1">
              Your subjects. Your next step.
            </h2>
            <p className="text-xs sm:text-sm text-academic-subtle mt-1 max-w-xl">
              Choose the exact Maths and English tracks you study. Each bank includes 200 curated questions, model answers, and step-by-step explanations.
            </p>
          </div>

          <Link
            href="/catalogue"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-900 hover:text-forest-700 underline"
          >
            <span>View complete catalogue & syllabus details →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ALL_SUBJECTS.map((sub) => {
            const isAvailable = sub.status === 'published';
            return (
              <article
                key={sub.slug}
                className="rounded-2xl bg-white border border-academic-border p-5 flex flex-col justify-between hover:border-forest-700/60 hover:shadow-md transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-academic-subtle uppercase">{sub.track}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                        isAvailable
                          ? 'bg-forest-100 text-forest-900'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {isAvailable ? 'Available' : 'Review Pending'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-lg text-forest-950 leading-snug">
                      <Link href={`/subject/${sub.slug}`} className="hover:underline">
                        {sub.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-academic-subtle mt-1">
                      {sub.questionCount} questions • Answers + explanations
                    </p>
                  </div>

                  <p className="text-xs text-forest-800 line-clamp-2 leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-academic-border/70 flex items-center justify-between">
                  <div className="text-sm font-serif font-bold text-forest-950">
                    <span className="text-lg">₹{sub.priceInr}</span>
                    <span className="text-xs text-academic-subtle font-sans font-normal"> / mo</span>
                  </div>

                  <Link
                    href={`/subject/${sub.slug}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      isAvailable
                        ? 'bg-forest-900 text-limeaccent hover:bg-forest-800'
                        : 'bg-paper-200 text-forest-700 hover:bg-paper-300'
                    }`}
                  >
                    {isAvailable ? 'Start Track →' : 'Coverage Info'}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 5. Subject Request Form */}
      <section id="request" className="max-w-6xl mx-auto px-4 sm:px-6">
        <SubjectRequestForm />
      </section>

      {/* 6. Coming Soon for Classes 12, 11, 9, and 8 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-forest-950 text-white p-8 sm:p-12 relative overflow-hidden border border-forest-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-limeaccent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl space-y-3 mb-10">
            <span className="text-[11px] font-bold uppercase tracking-widest text-limeaccent">
              Curriculum Roadmap
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Expanding to All School & Competitive Exams
            </h2>
            <p className="text-xs sm:text-sm text-forest-200 leading-relaxed">
              Currently live for CBSE Class 10. We are actively expanding the 15-minute daily study habit loop to competitive entrance exams, senior secondary classes, and other state/national boards on our modular ₹299/mo plan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-forest-900/80 border border-forest-800 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-limeaccent bg-forest-800 px-2 py-0.5 rounded">
                  In Active Mapping
                </span>
                <h3 className="text-lg font-serif font-bold text-white mt-2">Competitive: JEE & NEET</h3>
                <p className="text-xs text-forest-300 leading-relaxed mt-1">
                  High-yield numerical practice, NCERT line-by-line active recall for Biology, and multi-concept problem loops for Physics & Chemistry.
                </p>
              </div>
              <div className="pt-3 border-t border-forest-800/80 text-[11px] text-forest-400 font-mono">
                Entrance Exam Expansion
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-forest-900/80 border border-forest-800 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-forest-800 px-2 py-0.5 rounded">
                  In Editorial Review
                </span>
                <h3 className="text-lg font-serif font-bold text-white mt-2">Classes 11 & 12 (CBSE)</h3>
                <p className="text-xs text-forest-300 leading-relaxed mt-1">
                  Physics, Chemistry, Maths, Biology, Accountancy & Economics. 10 years of past board exam patterns with official step-marking criteria.
                </p>
              </div>
              <div className="pt-3 border-t border-forest-800/80 text-[11px] text-forest-400 font-mono">
                Senior Secondary Tracks
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-forest-900/80 border border-forest-800 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300 bg-forest-800 px-2 py-0.5 rounded">
                  Concept Building
                </span>
                <h3 className="text-lg font-serif font-bold text-white mt-2">Foundation & Olympiads</h3>
                <p className="text-xs text-forest-300 leading-relaxed mt-1">
                  Classes 8 & 9 pre-board foundation, mental arithmetic, and science inquiry challenge sets aligned with NTSE & Olympiad formats.
                </p>
              </div>
              <div className="pt-3 border-t border-forest-800/80 text-[11px] text-forest-400 font-mono">
                Junior High Foundation
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-forest-900/80 border border-forest-800 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300 bg-forest-800 px-2 py-0.5 rounded">
                  Board Expansion
                </span>
                <h3 className="text-lg font-serif font-bold text-white mt-2">ICSE & State Boards</h3>
                <p className="text-xs text-forest-300 leading-relaxed mt-1">
                  Curriculum-aligned question banks and daily five loops mapped to ICSE Class 10 and major State Board syllabi.
                </p>
              </div>
              <div className="pt-3 border-t border-forest-800/80 text-[11px] text-forest-400 font-mono">
                National & State Boards
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
