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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
              ACADEMIC ADVISORY & HORIZON ARCHITECTURE
            </span>
            <span className="text-[10px] font-mono text-zinc-500">•</span>
            <span className="text-[10px] font-mono text-zinc-400">OBJECTIVE PATHFINDING</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Academic Advisory & Career Consultant
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
            Scientific stream selection for Class 10, backwards-engineered career trajectories, and national board/entrance exam milestone tracking. Zero peer-pressure guesswork.
          </p>
        </div>

        {/* Academic Advisor Component */}
        <AcademicAdvisor />
      </div>
    </div>
  );
}
