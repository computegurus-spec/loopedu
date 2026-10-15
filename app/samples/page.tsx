import React from 'react';
import Link from 'next/link';
import { ALL_SUBJECTS } from '@/lib/subjects';
import { getSampleQuestions } from '@/lib/db/store';
import { MathRenderer } from '@/components/MathRenderer';
import { BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Free Sample Questions & Model Answers | LoopEdu',
  description:
    'Explore free sample practice questions with step-by-step model answers and explanations across Maths, Science, Social Science, and AI. No sign-up required.',
};

export default async function SamplesPage() {
  const subjectsWithSamples = await Promise.all(
    ALL_SUBJECTS.map(async (sub) => {
      const samples = await getSampleQuestions(sub.slug);
      return {
        ...sub,
        samples,
      };
    })
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-900 border border-forest-200 text-xs font-semibold uppercase tracking-wider">
          Public Study Samples
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-forest-950 tracking-tight">
          Try free sample questions across all 8 tracks.
        </h1>
        <p className="text-base sm:text-lg text-forest-800 leading-relaxed">
          Evaluate the question phrasing, mathematical formatting, and model explanations.
          No email address or registration is required to study these samples.
        </p>
      </div>

      <div className="space-y-16">
        {subjectsWithSamples.map((sub) => {
          if (sub.samples.length === 0) return null;

          return (
            <section key={sub.slug} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-academic-border pb-4">
                <div>
                  <span className="font-mono text-xs text-academic-subtle font-bold uppercase">
                    {sub.track}
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-forest-950">
                    {sub.name}
                  </h2>
                </div>

                <Link
                  href={`/subject/${sub.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-900 hover:underline"
                >
                  <span>View full 200-question syllabus & bank →</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sub.samples.map((sq, idx) => (
                  <div
                    key={sq.id}
                    className="rounded-2xl bg-white border border-academic-border p-6 flex flex-col justify-between space-y-4 shadow-sm"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono bg-paper-100 text-forest-900 font-bold px-2 py-0.5 rounded">
                          {sq.id}
                        </span>
                        <span className="font-semibold text-forest-700">
                          {sq.marks} {sq.marks === 1 ? 'Mark' : 'Marks'}
                        </span>
                      </div>

                      <div className="text-xs font-semibold text-academic-subtle">
                        {sq.topic} (Chapter {sq.chapter})
                      </div>

                      <div className="text-sm font-medium text-forest-950 leading-relaxed bg-paper-50 p-3.5 rounded-xl border border-academic-border">
                        <MathRenderer content={sq.question} />
                      </div>
                    </div>

                    <details className="group rounded-xl border border-forest-200 bg-forest-50/50 p-3.5 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="cursor-pointer font-bold text-xs uppercase tracking-wider text-forest-900 flex items-center justify-between">
                        <span>Reveal Model Answer & Explanation</span>
                        <span className="text-forest-700 group-open:rotate-180 transition">▼</span>
                      </summary>
                      <div className="pt-3 mt-3 border-t border-forest-200 space-y-2 text-xs">
                        <div>
                          <strong className="text-forest-900 block text-[11px] uppercase">
                            Model Answer:
                          </strong>
                          <div className="font-medium text-forest-950 mt-0.5">
                            <MathRenderer content={sq.answer} />
                          </div>
                        </div>

                        <div>
                          <strong className="text-forest-800 block text-[11px] uppercase mt-1">
                            Explanation:
                          </strong>
                          <div className="text-forest-800 leading-relaxed mt-0.5">
                            <MathRenderer content={sq.explanation} />
                          </div>
                        </div>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
