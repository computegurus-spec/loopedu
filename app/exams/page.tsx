import React from 'react';
import { Metadata } from 'next';
import { ExamDiscoveryAndEligibility } from '@/components/exams/ExamDiscoveryAndEligibility';
import { Award, ShieldCheck, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Exams & Opportunities • National Eligibility & Watchlist | LoopEdu',
  description:
    'Comprehensive national & state competitive exam directory across engineering, medical, civil services, banking, railway, and SSC. Real-time gazette amendment alerts and deterministic eligibility testing.',
};

export default function ExamsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Page Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              NATIONAL &amp; STATE DISCOVERY
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">CANONICAL DIRECTORY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Exams, Eligibility &amp; Official Notifications
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Verified schedules for engineering, medical, banking, railway, and civil services. Run the deterministic AST eligibility checker to verify age, qualifications, and category relaxations before spending money on exam forms.
          </p>
        </div>

        {/* Discovery & Eligibility Component */}
        <ExamDiscoveryAndEligibility />
      </div>
    </div>
  );
}
