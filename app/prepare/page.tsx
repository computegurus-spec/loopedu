import React from 'react';
import { Metadata } from 'next';
import { PrepareWorkspace } from '@/components/study/PrepareWorkspace';
import { BookOpen, Sparkles, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Prepare & Diagnostic Practice • Spaced Mistake Vault | LoopEdu',
  description:
    'Timed diagnostic drills, verified NCERT solutions, error recall notebook, and availability-aware weekly study planner for school and competitive exams.',
};

export default function PreparePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Page Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              ACADEMIC PREPARATION
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">DIAGNOSTIC &amp; PRACTICE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Focused Practice, Diagnostics &amp; Mistake Mastery
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Practice calibrated high-yield questions across JEE/NEET Foundation and Adult Aptitude tracks. Missed questions automatically enter the Spaced Repetition Error Vault to ensure zero recurring mistakes.
          </p>
        </div>

        {/* Prepare Workspace Component */}
        <PrepareWorkspace />
      </div>
    </div>
  );
}
