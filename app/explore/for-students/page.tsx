'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  Flame,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Brain,
} from 'lucide-react';

export default function ForStudentsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#0284C7] via-[#0369A1] to-[#075985] text-white py-16 sm:py-24 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]"
          aria-hidden="true"
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-bold">
            <GraduationCap className="w-4 h-4 text-emerald-300" />
            <span>Built Specifically For CBSE Class 10 Board Candidates</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            When your board score matters, <br className="hidden sm:inline" />
            <span className="text-emerald-300">practice with real exam rigor.</span>
          </h1>
          <p className="text-base sm:text-xl text-sky-100 max-w-2xl mx-auto leading-relaxed">
            Stop passive reading. Replace heavy 500-page guidebooks with 15 minutes of sharp daily recall, verified step-marking rubrics, and automated error comebacks.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/study/cbse-10-science"
              className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-bold px-7 py-4 rounded-xl text-sm sm:text-base transition shadow-xl hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>Start Free 10-Question Sprint</span>
            </Link>
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-4 rounded-xl text-sm sm:text-base border border-white/30 backdrop-blur-sm transition"
            >
              <span>Explore All 8 Subject Tracks →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Student Mastery */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 space-y-16">
        {/* Feature 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold font-mono">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Pillar 1 • The Daily Five</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-950">
              15 Minutes a Day. Zero Cramming Burnout.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Every day, you receive exactly five high-yield board questions mapped to your enrolled subjects. Solve them on paper, verify your steps, and earn streak momentum. Completing chapters unlocks downloadable 10-year question bank PDFs.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Prevents study fatigue and builds lifelong discipline</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Covers 200+ curated questions per subject track</span>
              </li>
            </ul>
          </div>
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <span className="font-bold text-slate-900">Today's Practice Target</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold font-mono text-[11px]">
                4-Day Streak 🔥
              </span>
            </div>
            <div className="space-y-3">
              {['Q1: SI Units & Resistivity', 'Q2: Ohm\'s Law Circuit Calculation', 'Q3: Light Ray Refractive Index', 'Q4: Chemical Redox Equations', 'Q5: Life Processes Nephron Structure'].map((q, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium">
                  <span>{q}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase text-orange-800 block">
                Flagged for Spaced Recall
              </span>
              <p className="text-xs text-slate-800 font-medium">
                "Prove that √5 is an irrational number using contradiction method."
              </p>
              <div className="flex items-center gap-2 pt-2 text-[10px] text-orange-700 font-mono font-bold">
                <span className="px-2 py-0.5 bg-white rounded border border-orange-200">Next Review: 3 Days</span>
                <span className="px-2 py-0.5 bg-white rounded border border-orange-200">Round 2: 7 Days</span>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold font-mono">
              <RotateCcw className="w-3.5 h-3.5 text-orange-600" />
              <span>Pillar 2 • The Mistake Comeback</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-950">
              Never Make the Same Mistake Twice.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              When you get a question wrong or mark it for revisit, it enters your private Error Vault. The system automatically schedules it for active re-testing at 3-day, 7-day, and 14-day intervals right when forgetting sets in.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transforms weaknesses into your highest-scoring chapters</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Requires 2 consecutive clean solves to achieve mastery</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold font-mono">
              <Brain className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pillar 3 • Socratic AI Hint Coach</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-950">
              Guided Clues. No Answer Spoilers.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Stuck on a tricky 3-mark derivation or calculation? The AI Hint Coach gives you Socratic nudges, NCERT formula reminders, and daily analogies without revealing the final solution, forcing your brain to do the actual thinking.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Strictly grounded in CBSE Class 10 marking criteria</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Reveals step-by-step marking rubrics after you submit</span>
              </li>
            </ul>
          </div>
          <div className="p-8 rounded-3xl bg-slate-950 text-white shadow-xl space-y-4 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span className="font-bold text-emerald-400">🔬 Socratic X-Ray Nudge</span>
              <span className="font-mono text-[10px] bg-slate-800 px-2 py-0.5 rounded text-white">Active Recall</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              "Look at the values given for focal length and object distance. Is the mirror concave or convex? What sign convention applies to 'u' under Cartesian rules?"
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 text-center">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm space-y-5">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-950">
            Ready to conquer your 2027 Board Exams?
          </h3>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Try 10 free high-yield board questions right now. No credit card required.
          </p>
          <div className="pt-2">
            <Link
              href="/login?redirect=/study/cbse-10-science"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-xl text-sm transition shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Start Free Practice Now →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
