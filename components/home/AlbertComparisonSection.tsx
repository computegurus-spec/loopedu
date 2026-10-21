'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, Sparkles, ArrowRight } from 'lucide-react';

export const AlbertComparisonSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            The Rigor Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Why serious students and master teachers choose LoopEdu
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            See how board-calibrated active practice compares to conventional textbook guidebooks and generic test banks.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-sm bg-white">
          <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-100/80 border-b border-slate-200 p-4 sm:p-5 text-xs sm:text-sm font-bold text-slate-700">
            <div className="md:col-span-5 text-slate-900">Practice Capability</div>
            <div className="md:col-span-3 text-slate-500 hidden md:block">Generic Guidebooks / Rote Books</div>
            <div className="md:col-span-4 text-blue-900 flex items-center gap-1.5 font-bold">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>LoopEdu Platform</span>
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {[
              {
                feature: 'Step-by-Step CBSE Marking Scheme',
                desc: 'Explicit breakdown showing where individual 1/2 marks and 1 marks are awarded.',
                bad: 'Flat final answers only with skipped intermediate steps.',
                good: 'Every question includes official NCERT marking criteria and deduction rubrics.',
              },
              {
                feature: 'In-Flow Socratic AI Hints',
                desc: 'Help when a student gets stuck without giving away the final numerical value.',
                bad: 'Zero hints — forces student to peek at answer key and lose learning value.',
                good: 'Socratic X-Ray prompts nudging the student toward formulas and sign rules.',
              },
              {
                feature: 'Spaced Mistake Comeback Loop',
                desc: 'Active retrieval practice to eliminate persistent concept gaps before pre-boards.',
                bad: 'Mistakes disappear into notebooks; errors repeat on exam day.',
                good: 'Automated 3-day, 7-day, and 14-day spaced recall until solved cleanly twice.',
              },
              {
                feature: '10-Year Board Recurrence Heatmap',
                desc: 'Frequency score showing how often each concept has appeared in past papers.',
                bad: 'No historical recurrence data; students spend hours on low-yield minutiae.',
                good: 'Instant recurrence tags showing verified 10-year board frequency.',
              },
              {
                feature: 'Teacher Unit Test & Classroom Tools',
                desc: 'Ability to generate balanced classroom assessments and printable mock worksheets.',
                bad: 'Teachers must manually re-type formulas from paper question papers.',
                good: 'Pre-formatted LaTeX formulas, balanced 25M/50M unit tests, and answer keys.',
              },
              {
                feature: 'Daily Habit Momentum',
                desc: 'Time-capped daily loop that prevents student burnout.',
                bad: 'Overwhelming 500-page book fatigue leading to procrastination.',
                good: '15-Minute Daily Five routine with streak tracking and parental transparency.',
              },
            ].map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 gap-3 sm:gap-4 items-center hover:bg-slate-50/80 transition"
              >
                <div className="md:col-span-5 space-y-0.5">
                  <div className="font-bold text-slate-950 text-sm">{row.feature}</div>
                  <div className="text-xs text-slate-500 font-normal">{row.desc}</div>
                </div>

                <div className="md:col-span-3 flex items-start gap-2 text-slate-500 text-xs sm:text-sm">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{row.bad}</span>
                </div>

                <div className="md:col-span-4 flex items-start gap-2 text-slate-900 font-semibold text-xs sm:text-sm bg-blue-50/60 p-2.5 rounded-xl border border-blue-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{row.good}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
          <Link
            href="/study/cbse-10-science"
            className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-bold px-7 py-3.5 rounded-xl text-xs sm:text-sm transition shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Experience the Difference Free (10 Questions) →</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
