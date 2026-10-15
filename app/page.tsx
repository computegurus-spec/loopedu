import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle, ShieldAlert, Sparkles, HelpCircle, Layers } from 'lucide-react';
import { ALL_SUBJECTS } from '@/lib/subjects';
import { InteractiveSampleCard } from '@/components/InteractiveSampleCard';
import { SubjectRequestForm } from '@/components/SubjectRequestForm';

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-16">
      {/* 1. Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-900 border border-forest-200 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-forest-700"></span>
            <span>Class 10 • CBSE 2027 Board Exam Preparation</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-forest-950 leading-[1.08]">
            A little more focus.<br />
            A lot more practice.
          </h1>

          <p className="text-lg sm:text-xl text-forest-800 leading-relaxed font-normal max-w-2xl">
            200 AI-curated practice questions per subject, with model answers and explanations.
            Prioritized using historical board-paper topic analysis.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#sample"
              className="inline-flex items-center justify-center gap-2 bg-limeaccent hover:bg-limeaccent-hover text-forest-950 font-bold px-6 py-3.5 rounded-xl text-sm transition shadow-sm"
            >
              <span>Try a sample question</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/catalogue"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-paper-50 text-forest-900 font-semibold px-6 py-3.5 rounded-xl text-sm border border-academic-border transition shadow-sm"
            >
              <span>Explore all 8 subjects</span>
            </Link>
          </div>

          <div className="pt-2 flex items-center gap-6 text-xs text-academic-subtle">
            <span className="font-semibold text-forest-900">₹999 per subject</span>
            <span>•</span>
            <span>One-time purchase</span>
            <span>•</span>
            <span>Independent practice material</span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Sample Question Section */}
      <section id="sample" className="max-w-6xl mx-auto px-4 sm:px-6">
        <InteractiveSampleCard />
      </section>

      {/* 3. The Study Experience: Attempt. Understand. Try again. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-widest text-forest-700">
            Study Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950 mt-1">
            Attempt. Understand. Try again.
          </h2>
          <p className="text-xs sm:text-sm text-academic-subtle mt-2">
            A purposeful, calm practice environment built for serious Class 10 board preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white border border-academic-border p-6 sm:p-8 space-y-4 shadow-sm hover:border-academic-borderStrong transition">
            <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-900 flex items-center justify-center font-bold text-base border border-forest-200">
              1
            </div>
            <h3 className="text-xl font-serif font-bold text-forest-950">
              Start with the problem
            </h3>
            <p className="text-xs sm:text-sm text-forest-800 leading-relaxed">
              Work through each question on paper before revealing the answer. Practice active recall instead of passive reading.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-academic-border p-6 sm:p-8 space-y-4 shadow-sm hover:border-academic-borderStrong transition">
            <div className="w-10 h-10 rounded-xl bg-limeaccent/30 text-forest-950 flex items-center justify-center font-bold text-base border border-limeaccent">
              2
            </div>
            <h3 className="text-xl font-serif font-bold text-forest-950">
              Understand the method
            </h3>
            <p className="text-xs sm:text-sm text-forest-800 leading-relaxed">
              Reveal the model answer and comprehensive step-by-step reasoning. Check every formula, definition, and intermediate step.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-academic-border p-6 sm:p-8 space-y-4 shadow-sm hover:border-academic-borderStrong transition">
            <div className="w-10 h-10 rounded-xl bg-forest-900 text-limeaccent flex items-center justify-center font-bold text-base">
              3
            </div>
            <h3 className="text-xl font-serif font-bold text-forest-950">
              Track revision & revisit
            </h3>
            <p className="text-xs sm:text-sm text-forest-800 leading-relaxed">
              Bookmark tough problems, flag items to revisit before pre-boards, and seamlessly resume where you left off on phone or laptop.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Subject Catalogue Preview */}
      <section id="subjects" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-forest-700">
              Build your revision library
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950 mt-1">
              Your subjects. Your next step.
            </h2>
            <p className="text-xs sm:text-sm text-academic-subtle mt-1 max-w-xl">
              Choose the Maths and English tracks you study. Each bank includes 200 curated questions, model answers, and explanations.
            </p>
          </div>

          <Link
            href="/catalogue"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-900 hover:text-forest-700 underline"
          >
            <span>View complete catalogue & syllabus details →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ALL_SUBJECTS.map((sub) => {
            const isAvailable = sub.status === 'published';
            return (
              <article
                key={sub.slug}
                className="rounded-2xl bg-white border border-academic-border p-5 flex flex-col justify-between hover:border-forest-700/60 hover:shadow-md transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-academic-subtle uppercase">{sub.track}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                        isAvailable
                          ? 'bg-forest-100 text-forest-900'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {isAvailable ? 'Available' : 'Review Pending'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-lg text-forest-950 leading-snug">
                      <Link href={`/subject/${sub.slug}`} className="hover:underline">
                        {sub.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-academic-subtle mt-1">
                      {sub.questionCount} questions • Answers + explanations
                    </p>
                  </div>

                  <p className="text-xs text-forest-800 line-clamp-2 leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-academic-border/70 flex items-center justify-between">
                  <div className="text-lg font-serif font-bold text-forest-950">
                    ₹{sub.priceInr}
                  </div>

                  <Link
                    href={`/subject/${sub.slug}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      isAvailable
                        ? 'bg-forest-900 text-limeaccent hover:bg-forest-800'
                        : 'bg-paper-200 text-forest-700 hover:bg-paper-300'
                    }`}
                  >
                    {isAvailable ? 'View Bank →' : 'Coverage Info'}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 5. Subject Request Form */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <SubjectRequestForm />
      </section>

      {/* 6. A few things to know (FAQs) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-forest-700">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950 mt-1">
            A few things to know
          </h2>
        </div>

        <div className="space-y-4">
          <details className="group rounded-2xl bg-white border border-academic-border p-5 text-sm [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-bold text-forest-950">
              <span>Are these guaranteed exam predictions?</span>
              <span className="transition group-open:rotate-180 text-forest-600">▼</span>
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-forest-800 leading-relaxed border-t border-academic-border/60 pt-3">
              No. These are original practice questions prioritized using historical board-paper topic analysis.
              Actual exam questions, patterns, and marking distributions may differ. Priority scores represent internal
              revision-urgency heuristics, not statistical probabilities or question forecasts.
            </p>
          </details>

          <details className="group rounded-2xl bg-white border border-academic-border p-5 text-sm [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-bold text-forest-950">
              <span>What is the difference between Maths Basic and Maths Standard?</span>
              <span className="transition group-open:rotate-180 text-forest-600">▼</span>
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-forest-800 leading-relaxed border-t border-academic-border/60 pt-3">
              CBSE offers two options: Mathematics Basic (Subject Code 241) and Mathematics Standard (Subject Code 041).
              Basic tests foundational textbook knowledge and procedural arithmetic. Standard includes deeper algebraic
              proofs and trigonometry deductions. Choose the track your school registered you for. You do not need both.
            </p>
          </details>

          <details className="group rounded-2xl bg-white border border-academic-border p-5 text-sm [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-bold text-forest-950">
              <span>Can I download full PDFs or print the question books?</span>
              <span className="transition group-open:rotate-180 text-forest-600">▼</span>
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-forest-800 leading-relaxed border-t border-academic-border/60 pt-3">
              The product provides secure online reading access in our distraction-free digital HTML reader.
              This allows instant bookmarking, attempt tracking, mathematical notation rendering, and continuous
              errata corrections. Offline full-book downloads are not part of the initial version.
            </p>
          </details>

          <details className="group rounded-2xl bg-white border border-academic-border p-5 text-sm [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-bold text-forest-950">
              <span>Is BoardEdge AI affiliated with CBSE or NCERT?</span>
              <span className="transition group-open:rotate-180 text-forest-600">▼</span>
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-forest-800 leading-relaxed border-t border-academic-border/60 pt-3">
              No. BoardEdge AI by itappens is completely independent. It is not affiliated with, endorsed by, or authorized
              by the Central Board of Secondary Education (CBSE) or NCERT. All explanations and model solutions are original.
            </p>
          </details>

          <details className="group rounded-2xl bg-white border border-academic-border p-5 text-sm [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-bold text-forest-950">
              <span>Why is German not available for purchase right now?</span>
              <span className="transition group-open:rotate-180 text-forest-600">▼</span>
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-forest-800 leading-relaxed border-t border-academic-border/60 pt-3">
              Prescribed textbook verification for German (Beste Freunde B1.1 Indian edition Lessons 6–9) is currently incomplete.
              In accordance with our strict editorial publication standards, German remains closed for purchase until verified
              by certified language educators. Free sample questions are available for preview.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
