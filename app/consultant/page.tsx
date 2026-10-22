import React from 'react';
import { Metadata } from 'next';
import { AcademicAdvisor } from '@/components/consultant/AcademicAdvisor';
import { Compass, Briefcase, GraduationCap, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Academic Advisory & Career Consultant | LoopEdu',
  description:
    'Data-backed stream selection after Class 10, reverse career path engineering, and board/entrance exam roadmap.',
};

export default function ConsultantPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Page Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              CAREER ARCHITECT AGENT
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">OBJECTIVE PATHFINDING</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Career Planner &amp; Academic Advisory
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Scientific stream selection for Class 10, backwards-engineered career trajectories, and national board/entrance exam milestone tracking. Zero peer-pressure guesswork.
          </p>
        </div>

        {/* Academic Advisor Component */}
        <AcademicAdvisor />
      </div>
    </div>
  );
}
