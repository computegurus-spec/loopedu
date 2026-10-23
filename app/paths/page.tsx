import React from 'react';
import { Metadata } from 'next';
import { CareerPathComparator } from '@/components/paths/CareerPathComparator';
import { Compass, Sparkles, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Paths • Explainable Career Guidance | LoopEdu',
  description:
    'Grounded 3-pathway exploration for Classes 10, 12, and graduates. Prerequisite audits, unbundled college cost calculators, and verified statutory guidelines.',
};

export default function PathsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Page Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              MY PATHS &amp; OPPORTUNITIES
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">EXPLAINABLE ADVISORY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Scientific Stream Selection &amp; Career Trajectories
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Compare 3 grounded pathways after Class 10 or graduation. Every recommendation cites official statutory rules, unbundled realistic fee components, and actionable starter projects. Zero hype, zero peer pressure.
          </p>
        </div>

        {/* Career Path Comparator Component */}
        <CareerPathComparator />
      </div>
    </div>
  );
}
