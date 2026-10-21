import React from 'react';
import Link from 'next/link';
import { getSessionUser } from '@/lib/auth/session';
import { AlbertHero } from '@/components/home/AlbertHero';
import { AlbertSubjectGroup } from '@/components/home/AlbertSubjectGroup';
import { AlbertAudienceSection } from '@/components/home/AlbertAudienceSection';
import { AlbertComparisonSection } from '@/components/home/AlbertComparisonSection';
import { BoardExamTimeMachine } from '@/components/home/BoardExamTimeMachine';
import { ParentWhispererVoiceNote } from '@/components/home/ParentWhispererVoiceNote';
import {
  Flame,
  RotateCcw,
  BarChart3,
  ArrowRight,
  Sparkles,
  Award,
  CheckCircle2,
} from 'lucide-react';

export default async function HomePage() {
  const user = await getSessionUser();

  return (
    <div className="space-y-0">
      {/* 1. Albert.io Format: Vibrant Hero Grid with Live Problem Rigor Showcase */}
      <AlbertHero isLoggedIn={Boolean(user)} />

      {/* 2. Albert.io Format: "Every subject, one platform" with Interactive Filter Tabs */}
      <AlbertSubjectGroup />

      {/* 3. Albert.io Format: "Accessible for all" — Strictly for Students & Teachers */}
      <AlbertAudienceSection />

      {/* 4. The 3 Method Pillars: Daily Five, Mistake Comeback, Observability */}
      <section id="pillars" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              The LoopEdu Habit Method
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-950">
              Engineered for board exam mastery without burnout.
            </h2>
            <p className="text-sm text-slate-600 font-normal">
              Three interconnected loops that replace endless cramming with 15 minutes of sharp daily focus.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pillar 1: The Daily Five */}
            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-7 shadow-xs flex flex-col justify-between hover:border-blue-400 hover:bg-white transition-all duration-200 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold text-lg">
                    <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-full">
                    Pillar 1 • Student Habit
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-xl text-slate-950 group-hover:text-blue-700 transition">
                    The Daily Five
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Bite-sized routine • Psychological streak momentum
                  </p>
                </div>

                <div className="space-y-3 pt-2 text-xs text-slate-700 leading-relaxed border-t border-slate-200/60 font-normal">
                  <div className="space-y-1">
                    <strong className="text-slate-950 font-bold block">1. Five Curated Questions:</strong>
                    Every morning, receive exactly five high-yield questions tailored to your enrolled CBSE tracks.
                  </div>
                  <div className="space-y-1">
                    <strong className="text-slate-950 font-bold block">2. Streak Multiplier:</strong>
                    Completing the daily set maintains your streak counter and builds momentum with zero fatigue.
                  </div>
                  <div className="space-y-1">
                    <strong className="text-slate-950 font-bold block">3. PDF Milestone Unlocks:</strong>
                    Finishing full chapter sets grants download access to curated 10-year question bank PDFs.
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 mt-6 flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  12–15 Mins / Day
                </span>
                <Link
                  href="/study/cbse-10-science"
                  className="text-xs font-bold text-slate-900 group-hover:text-blue-700 inline-flex items-center gap-1"
                >
                  <span>Try Daily Five</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 2: The Mistake Comeback */}
            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-7 shadow-xs flex flex-col justify-between hover:border-orange-400 hover:bg-white transition-all duration-200 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-orange-700 flex items-center justify-center font-bold text-lg">
                    <RotateCcw className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-orange-800 bg-orange-100 px-2.5 py-1 rounded-full">
                    Pillar 2 • Active Recall
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-xl text-slate-950 group-hover:text-orange-700 transition">
                    The Mistake Comeback
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Spaced revision loops • Elimination of concept gaps
                  </p>
                </div>

                <div className="space-y-3 pt-2 text-xs text-slate-700 leading-relaxed border-t border-slate-200/60 font-normal">
                  <div className="space-y-1">
                    <strong className="text-slate-950 font-bold block">1. Automated Error Vault:</strong>
                    Every wrong answer is automatically filed into your private revision queue.
                  </div>
                  <div className="space-y-1">
                    <strong className="text-slate-950 font-bold block">2. Spaced Revision Sessions:</strong>
                    Resurfaces flagged problems at 3-day, 7-day, and 14-day intervals right when recall drops.
                  </div>
                  <div className="space-y-1">
                    <strong className="text-slate-950 font-bold block">3. Two Clean Solves:</strong>
                    Marked as "Mastered" only after you solve the problem twice in a row without hints.
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 mt-6 flex items-center justify-between">
                <span className="text-[11px] font-bold text-orange-800 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200">
                  3d • 7d • 14d Spaced Loops
                </span>
                <Link
                  href="/challenge"
                  className="text-xs font-bold text-slate-900 group-hover:text-orange-700 inline-flex items-center gap-1"
                >
                  <span>View Error Vault</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 3: Observability Hub */}
            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-7 shadow-xs flex flex-col justify-between hover:border-emerald-400 hover:bg-white transition-all duration-200 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-lg">
                    <BarChart3 className="w-6 h-6 text-emerald-700" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-full">
                    Pillar 3 • Observability
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-xl text-slate-950 group-hover:text-emerald-700 transition">
                    Observability Hub
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Honest metrics • Instant WhatsApp summaries
                  </p>
                </div>

                <div className="space-y-3 pt-2 text-xs text-slate-700 leading-relaxed border-t border-slate-200/60 font-normal">
                  <div className="space-y-1">
                    <strong className="text-slate-950 font-bold block">1. Anti-Micromanagement View:</strong>
                    See exact chapter coverage and syllabus health without hovering over the screen.
                  </div>
                  <div className="space-y-1">
                    <strong className="text-slate-950 font-bold block">2. Real Accuracy Metre:</strong>
                    Highlights absolute questions solved vs true accuracy — zero inflated percentages.
                  </div>
                  <div className="space-y-1">
                    <strong className="text-slate-950 font-bold block">3. 1-Click WhatsApp Summaries:</strong>
                    30-second AI audio voice note summarizing wins and next focus areas for parents.
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 mt-6 flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  1-Click WhatsApp Voice Brief
                </span>
                <Link
                  href="/parent"
                  className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 inline-flex items-center gap-1"
                >
                  <span>Open Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Albert.io Format: Rigor Advantage Comparison Section */}
      <AlbertComparisonSection />

      {/* 6. CBSE 10-Year Recurrence Heatmap (Time Machine) */}
      <section id="time-machine" className="py-16 sm:py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <BoardExamTimeMachine />
        </div>
      </section>

      {/* 7. Parent Whisperer Audio Voice Note */}
      <section id="parent-whisperer" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ParentWhispererVoiceNote />
        </div>
      </section>

      {/* 8. Curriculum Roadmap (Expansion for Classes 11, 12, JEE & NEET) */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 relative overflow-hidden border border-slate-800">
            <div className="max-w-2xl space-y-3 mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
                Curriculum Expansion Roadmap
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Expanding to Senior Secondary & Entrance Exams
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Currently live for CBSE Class 10. We are actively expanding the 15-minute daily habit loop and question banks to senior secondary classes and competitive exams.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-slate-800 px-2 py-0.5 rounded">
                    Active Mapping
                  </span>
                  <h3 className="text-base font-bold text-white mt-2">Competitive: JEE & NEET</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    High-yield numerical practice, NCERT line-by-line active recall for Biology, and multi-concept problem loops.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                  Entrance Exam Expansion
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-slate-800 px-2 py-0.5 rounded">
                    Editorial Review
                  </span>
                  <h3 className="text-base font-bold text-white mt-2">Classes 11 & 12 (CBSE)</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    Physics, Chemistry, Maths, Biology, Accountancy & Economics with official step-marking criteria.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                  Senior Secondary Tracks
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300 bg-slate-800 px-2 py-0.5 rounded">
                    Concept Building
                  </span>
                  <h3 className="text-base font-bold text-white mt-2">Foundation & Olympiads</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    Classes 8 & 9 pre-board foundation, mental arithmetic, and science inquiry challenge sets.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                  Junior High Foundation
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300 bg-slate-800 px-2 py-0.5 rounded">
                    Board Expansion
                  </span>
                  <h3 className="text-base font-bold text-white mt-2">ICSE & State Boards</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    Curriculum-aligned question banks and daily five loops mapped to ICSE Class 10 and State syllabi.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                  National & State Boards
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
