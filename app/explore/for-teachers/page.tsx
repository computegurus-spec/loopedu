'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  School,
  Sparkles,
  BookOpen,
  CheckCircle2,
  FileText,
  BarChart3,
  ShieldCheck,
  Download,
  Users,
  Send,
} from 'lucide-react';
import { TeacherInquiryModal } from '@/components/home/TeacherInquiryModal';

export default function ForTeachersPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#0F766E] via-[#115E59] to-[#134E4A] text-white py-16 sm:py-24 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]"
          aria-hidden="true"
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-bold">
            <School className="w-4 h-4 text-emerald-300" />
            <span>Built For CBSE Educators, Schools, and Coaching Institutes</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Board-standard question banks <br className="hidden sm:inline" />
            <span className="text-emerald-300">and assessment tools for teachers.</span>
          </h1>
          <p className="text-base sm:text-xl text-teal-100 max-w-2xl mx-auto leading-relaxed">
            Save hours creating board-standard weekly tests and homework. Access 100% NCERT-verified questions tagged by chapter, mark weightage (1M, 2M, 3M, 5M), and 10-year board recurrence frequency.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-bold px-7 py-4 rounded-xl text-sm sm:text-base transition shadow-xl hover:scale-105 active:scale-95"
            >
              <School className="w-5 h-5 text-emerald-400" />
              <span>Request Teacher Resources & School Demo</span>
            </button>
            <Link
              href="#teacher-features"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-4 rounded-xl text-sm sm:text-base border border-white/30 backdrop-blur-sm transition"
            >
              <span>Explore Teacher Features ↓</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Teacher Tool Pillars */}
      <section id="teacher-features" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 space-y-16">
        {/* Pillar 1: Ready-Made Unit Tests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold font-mono">
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tool 1 • Instant Test Creation</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-950">
              Cut Assessment Creation Time by 80%.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              No more re-typing textbook questions or copy-pasting blurry equations. Every question in LoopEdu is pre-formatted with clean LaTeX formulas, verified marks weightage, and official step-by-step marking rubrics.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Filter by mark weightage: 1M (MCQ), 2M (Short), 3M (Analytical), 5M (Long)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Competency-based questions matching CBSE 2026-2027 mandates</span>
              </li>
            </ul>
          </div>
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <span className="font-bold text-slate-900">Unit Test Generator Preview</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold font-mono text-[11px]">
                Ready to Export
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between font-mono text-[11px] text-slate-500">
                <span>Subject: Science (086)</span>
                <span>Total: 25 Marks • 45 Mins</span>
              </div>
              <div className="font-bold text-slate-900 text-sm">
                Chapter 12: Electricity & Circuit Calculations
              </div>
              <div className="pt-2 flex items-center justify-between text-slate-600">
                <span>1M MCQs: 5 | 2M Short: 3 | 3M Derivations: 3 | 5M Case Study: 1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 2: Step-by-Step Marking Rubrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 p-8 rounded-3xl bg-slate-950 text-white shadow-xl space-y-4 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span className="font-bold text-emerald-400">CBSE Official Step Rubric</span>
              <span className="font-mono text-[10px] bg-slate-800 px-2 py-0.5 rounded text-white">3 Marks</span>
            </div>
            <div className="space-y-2 text-xs leading-relaxed text-slate-200">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                <span>Step 1: Stating formula (V = IR) and defining variables</span>
                <span className="font-bold text-emerald-400 font-mono">1 Mark</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                <span>Step 2: Correct substitution of given resistance & voltage</span>
                <span className="font-bold text-emerald-400 font-mono">1 Mark</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                <span>Step 3: Final numerical quotient with correct SI unit (Amperes)</span>
                <span className="font-bold text-emerald-400 font-mono">1 Mark</span>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tool 2 • Step Marking Rubrics</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-950">
              Train Students on Exactly Where Marks are Won & Lost.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Most students lose marks on board exams not because they don't know the answer, but because they skip mandatory NCERT steps. Every question in our bank includes explicit step-wise mark distribution to help you coach board perfection.
            </p>
          </div>
        </div>

        {/* Pillar 3: Misconception Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold font-mono">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tool 3 • Misconception Analytics</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-950">
              Know Exactly Where Your Batch Struggles.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Get diagnostic reports on which specific topics your students struggle with most. See if 60% of your class is stumbling on sign conventions in optics or factoring quadratic roots, and target your revision lectures with surgical precision.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="text-xs font-bold text-slate-900 border-b pb-2">Class-Wide Diagnostic Insights</div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex justify-between">
                <span className="font-semibold text-emerald-900">Chemical Reactions & Equations</span>
                <span className="font-bold text-emerald-700">88% Mastery</span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 flex justify-between">
                <span className="font-semibold text-amber-900">Electricity (Parallel vs Series)</span>
                <span className="font-bold text-amber-700">62% Needs Review</span>
              </div>
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 flex justify-between">
                <span className="font-semibold text-red-900">Light (Mirror Sign Conventions)</span>
                <span className="font-bold text-red-700">41% High Error Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 text-center">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm space-y-5">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-950">
            Bring LoopEdu to Your School or Coaching Institute
          </h3>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Schedule a personalized demo, get sample unit test PDFs, and explore institutional volume licensing for your classrooms.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-8 py-4 rounded-xl text-sm transition shadow-sm"
            >
              <School className="w-4 h-4 text-emerald-200" />
              <span>Contact Teacher Support & Pilot Demo →</span>
            </button>
          </div>
        </div>
      </section>

      <TeacherInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
