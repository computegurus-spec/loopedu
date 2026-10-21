'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  School,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Flame,
  RotateCcw,
  BookOpen,
  FileText,
  BarChart3,
  Award,
  Clock,
} from 'lucide-react';
import { TeacherInquiryModal } from './TeacherInquiryModal';

export const AlbertAudienceSection: React.FC = () => {
  const [teacherModalOpen, setTeacherModalOpen] = useState(false);

  return (
    <section id="accessible-for-all" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <span>Accessible for all</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
            Built for students. Empowering teachers.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Designed specifically for the two pillars of academic success: students mastering the CBSE syllabus and teachers driving classroom excellence.
          </p>
        </div>

        {/* 2-Column Audience Grid (Strictly Students and Teachers) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pillar 1: For Students */}
          <div className="rounded-3xl bg-white border-2 border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col justify-between hover:border-blue-600 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />

            <div className="space-y-6">
              {/* Card Header & Icon */}
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold shadow-xs">
                  <GraduationCap className="w-8 h-8 text-blue-700" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-900 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                  For Students
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 leading-tight">
                  When the board score really matters, choose LoopEdu.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-2 font-normal">
                  Master high-stakes CBSE questions with 100% human-verified NCERT explanations. Build daily streak momentum with 15-minute bite-sized loops, diagnose weak areas with the Mistake Comeback, and access 10-year board recurrence heatmaps.
                </p>
              </div>

              {/* Feature Points */}
              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-800 leading-relaxed border-t border-slate-100">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>10 Free High-Yield Questions Every Week:</strong> Resets every 7 days across Science, Mathematics, and Social Science with zero credit card required.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Socratic AI Hint Coach:</strong> In-flow guided hints that activate recall without spoiling the final answer.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Automated Mistake Comeback Loop:</strong> Flagged errors resurface at 3-day, 7-day, and 14-day intervals until mastered.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>10-Year CBSE Heatmap:</strong> Know exactly which question patterns repeat most frequently before entering the exam hall.
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-8 mt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <Link
                href="/study/cbse-10-science"
                className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Start Free Practice Now →</span>
              </Link>
              <Link
                href="/explore/for-students"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs sm:text-sm transition"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Pillar 2: For Teachers */}
          <div className="rounded-3xl bg-white border-2 border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col justify-between hover:border-emerald-600 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 to-teal-600" />

            <div className="space-y-6">
              {/* Card Header & Icon */}
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold shadow-xs">
                  <School className="w-8 h-8 text-emerald-700" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                  For Teachers & Schools
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 leading-tight">
                  Save hours creating board-standard assessments and homework.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-2 font-normal">
                  Equip your classroom with rigorous, syllabus-calibrated question banks. Categorized by chapter, mark weightage (1M, 2M, 3M, 5M), and historical board frequency. Download printable unit tests or assign diagnostic practice sets effortlessly.
                </p>
              </div>

              {/* Feature Points */}
              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-800 leading-relaxed border-t border-slate-100">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Curated CBSE Unit Tests:</strong> Instantly access complete question banks with official step-by-step marking rubrics.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Printable Mock Exam Exports:</strong> Generate clean paper tests and solution keys for periodic classroom assessments.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Diagnostic Error Analytics:</strong> Identify exact concept gaps and common traps across your entire student batch.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>School & Coaching Licensing:</strong> All-inclusive volume discounts, roster integration, and professional academic support.
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-8 mt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setTeacherModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition shadow-sm"
              >
                <School className="w-4 h-4 text-emerald-200" />
                <span>Request Teacher Resources & Demo →</span>
              </button>
              <Link
                href="/explore/for-teachers"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs sm:text-sm transition"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Inquiry Modal */}
      <TeacherInquiryModal
        isOpen={teacherModalOpen}
        onClose={() => setTeacherModalOpen(false)}
      />
    </section>
  );
};
