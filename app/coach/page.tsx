import React from 'react';
import { Metadata } from 'next';
import { MindCoachInterface } from '@/components/coach/MindCoachInterface';
import { HeartHandshake, ShieldCheck, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mind Coach • Private Study Habit & Wellness Companion | LoopEdu',
  description:
    'Private non-diagnostic space for study reflection, exam stress management, concentration routines, and verified Government of India mental health helplines.',
};

export default function CoachPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Page Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              WELLNESS &amp; HABIT COMPANION
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">BOUNDED PRIVATE SPACE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Mind Coach: Steady Focus, Rest &amp; Reflection
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Exam preparation is a marathon. Use this private, non-clinical space to check in with yourself, sprint with gentle focus intervals, and dismantle exam panic. Excluded from parent dashboards and analytics.
          </p>
        </div>

        {/* Mind Coach Component */}
        <MindCoachInterface />
      </div>
    </div>
  );
}
