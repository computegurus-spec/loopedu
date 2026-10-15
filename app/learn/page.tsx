import React from 'react';
import { DuolingoPath } from '@/components/study/DuolingoPath';
import { getSessionUser } from '@/lib/auth/session';
import Link from 'next/link';
import { Sparkles, BarChart3, BookOpen, ShieldCheck } from 'lucide-react';

import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Daily Study Path & Units | LoopEdu',
  description: '15-minute daily practice path. Master units step-by-step and unlock chapter question bank PDFs.',
};

export default async function LearnPathPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect('/login?redirect=/learn');
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6">
      {/* Top Banner / Breadcrumb */}
      <div className="max-w-3xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-academic-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-forest-700 bg-forest-100 px-2 py-0.5 rounded">
              Daily Study Path
            </span>
            <span className="text-xs text-forest-400">•</span>
            <span className="text-xs text-forest-800">15-Min Daily Bite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950 mt-1">
            Your Exam Prep Path
          </h1>
          <p className="text-xs sm:text-sm text-academic-subtle mt-0.5">
            Step by step. 15 minutes a day. Unlock milestone question bank dossiers as you conquer each unit.
          </p>
        </div>

        {/* Quick Link to Parent Observability Hub */}
        <Link
          href="/parent"
          className="inline-flex items-center gap-1.5 self-start sm:self-auto bg-white hover:bg-forest-50 border border-academic-border text-forest-900 text-xs font-semibold px-3 py-2 rounded-xl transition shadow-xs"
        >
          <BarChart3 className="w-3.5 h-3.5 text-forest-700" />
          <span>Parent Observability Hub</span>
        </Link>
      </div>

      {/* Main Study Path */}
      <DuolingoPath />
    </div>
  );
}
