import React from 'react';
import Link from 'next/link';
import { ShieldCheck, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Methodology & Independence | LoopEdu',
  description:
    'Understand how LoopEdu transforms board preparation with 15-minute daily bite-sized loops, spaced active recall, and curated 10-year question banks.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-900 border border-forest-200 text-xs font-semibold uppercase tracking-wider">
          About LoopEdu
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-forest-950 tracking-tight">
          A 15-Minute Daily Habit.<br />Peak Board Confidence.
        </h1>
        <p className="text-base sm:text-lg text-forest-800 leading-relaxed">
          LoopEdu is an independent study companion built by <strong>Blocks and Loops technologies pvt ltd</strong> to make exam preparation effortless through daily gamified consistency, automated error recovery, and parent observability.
        </p>
      </div>

      <div className="p-6 bg-white border border-academic-border rounded-2xl space-y-3">
        <h2 className="text-lg font-serif font-bold text-forest-950">
          Core Product Positioning
        </h2>
        <blockquote className="p-4 bg-paper-100 border-l-4 border-forest-800 rounded-r-xl text-forest-900 font-medium italic text-sm">
          “200 AI-curated practice questions per subject, with model answers and explanations,
          prioritized using historical board-paper topic analysis.”
        </blockquote>
      </div>

      <div className="space-y-6 text-sm text-forest-800 leading-relaxed">
        <h2 className="text-2xl font-serif font-bold text-forest-950">
          How our curation and priority scoring works
        </h2>
        <p>
          Preparing for board exams often overwhelms students with hundreds of generic questions.
          BoardEdge AI focuses revision by analyzing topic recurrence across <strong>985 historical CBSE board-paper files</strong> from 2017 to 2026.
        </p>

        <div className="space-y-4 pt-2">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <strong className="text-forest-950 block">Document-level keyword analysis:</strong>
              We examine the frequency and weight of syllabus topics in past board exam series to identify concepts that routinely demand student mastery.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <strong className="text-forest-950 block">Heuristic revision priority index:</strong>
              Each question is assigned a priority score (0–100) and priority band (e.g. Core Revision, High Priority). This is an internal study sequence heuristic—<strong>not a percentage probability or exam prediction</strong>.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <strong className="text-forest-950 block">Original models & worked explanations:</strong>
              All questions, practice passages, and model answers are original creations grounded in prescribed curriculum frameworks. They are not official marking-scheme responses or direct textbook quotations.
            </div>
          </div>
        </div>
      </div>

      {/* Independence Statement Box */}
      <div className="p-6 sm:p-8 bg-forest-950 text-white rounded-2xl border border-forest-800 space-y-4">
        <div className="flex items-center gap-2 text-limeaccent text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Independence & Disclaimer</span>
        </div>
        <h3 className="text-xl font-serif font-bold text-white">
          Independent Practice Material
        </h3>
        <p className="text-xs sm:text-sm text-forest-200 leading-relaxed">
          BoardEdge AI is completely independent, created by <strong>blocks and loops</strong>. It is <strong>not affiliated with, endorsed by, or authorized by the Central Board of Secondary Education (CBSE)</strong> or the National Council of Educational Research and Training (NCERT). Actual board exam questions, structures, and marking criteria may differ.
        </p>
      </div>

      <div className="pt-4 flex items-center gap-4">
        <Link
          href="/catalogue"
          className="inline-flex items-center gap-2 bg-forest-900 text-limeaccent px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-forest-800 transition"
        >
          <span>Explore 8 Question Banks</span>
        </Link>
        <Link
          href="/samples"
          className="inline-flex items-center gap-2 bg-white text-forest-900 border border-academic-border px-5 py-3 rounded-xl font-semibold text-xs hover:bg-paper-50 transition"
        >
          <span>Try Free Samples</span>
        </Link>
      </div>
    </div>
  );
}
