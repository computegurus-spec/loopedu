import React from 'react';
import Link from 'next/link';
import { ALL_SUBJECTS } from '@/lib/subjects';
import { CheckoutButton } from '@/components/CheckoutButton';
import { CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Layers } from 'lucide-react';

export const metadata = {
  title: 'All Subjects & Tracks | BoardEdge AI by itappens',
  description:
    'Choose from 8 Class 10 CBSE 2027 practice banks. ₹999 per subject. 200 questions with model answers and explanations.',
};

export default function CataloguePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-900 border border-forest-200 text-xs font-semibold uppercase tracking-wider">
          Class 10 CBSE 2027 Catalogue
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-forest-950 tracking-tight">
          Select your subjects. Start your practice.
        </h1>
        <p className="text-base sm:text-lg text-forest-800 leading-relaxed">
          Each subject question bank contains 200 AI-curated practice questions with model answers and
          step-by-step explanations, ranked by historical board-paper topic frequency.
        </p>
        <div className="pt-1 flex items-center gap-4 text-xs font-semibold text-forest-900">
          <span className="bg-white border border-academic-border px-3 py-1.5 rounded-lg">
            Fixed Price: ₹999 per subject
          </span>
          <span className="bg-white border border-academic-border px-3 py-1.5 rounded-lg">
            One-time purchase • No recurring fee
          </span>
        </div>
      </div>

      {/* Track Selection Advisory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border border-academic-border p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-forest-950 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-forest-700" />
            <span>Maths Basic vs. Standard Advisory</span>
          </div>
          <p className="text-xs sm:text-sm text-forest-800 leading-relaxed">
            CBSE offers two distinct Mathematics options. <strong>Maths Basic (Code 241)</strong> tests fundamental procedural concepts.
            <strong>Maths Standard (Code 041)</strong> includes complex proofs and algebraic modelling for students planning to take Senior Secondary Mathematics.
            <strong className="block mt-1 text-forest-950">You only need the version your school has registered you for. Do not buy both.</strong>
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-academic-border p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-forest-950 uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-forest-700" />
            <span>English Syllabus Track Advisory</span>
          </div>
          <p className="text-xs sm:text-sm text-forest-800 leading-relaxed">
            Most CBSE schools follow <strong>English Language & Literature (Code 184)</strong> using NCERT First Flight.
            Some schools offer <strong>English Communicative (Code 101)</strong> using the CBSE Literature Reader.
            <strong className="block mt-1 text-forest-950">Check your school booklist or board registration slip to select the exact English track.</strong>
          </p>
        </div>
      </div>

      {/* Grid of all 8 tracks */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-academic-border pb-3">
          <h2 className="text-xl font-serif font-bold text-forest-950">
            Available Practice Question Banks (8 Tracks)
          </h2>
          <span className="text-xs text-academic-subtle font-mono">
            {ALL_SUBJECTS.filter((s) => s.status === 'published').length} Published • {ALL_SUBJECTS.filter((s) => s.status !== 'published').length} In Review
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ALL_SUBJECTS.map((sub) => {
            const isPublished = sub.status === 'published';
            return (
              <div
                key={sub.slug}
                className="rounded-2xl bg-white border border-academic-border p-6 sm:p-7 flex flex-col justify-between hover:border-forest-700 transition space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-academic-subtle">
                      {sub.track}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        isPublished
                          ? 'bg-forest-100 text-forest-900 border border-forest-200'
                          : 'bg-amber-100 text-amber-900 border border-amber-200'
                      }`}
                    >
                      {isPublished ? 'Available for Enrolment' : 'Coverage Review Pending'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-serif font-bold text-forest-950">
                      <Link href={`/subject/${sub.slug}`} className="hover:underline">
                        {sub.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-academic-subtle mt-0.5">
                      Curriculum reference: {sub.curriculumRef}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-forest-800 leading-relaxed">
                    {sub.description}
                  </p>

                  {sub.trackComparisonNote && (
                    <div className="p-3 bg-paper-100 border border-academic-border rounded-xl text-xs text-forest-900">
                      <strong>Selection note:</strong> {sub.trackComparisonNote}
                    </div>
                  )}

                  {sub.availabilityNote && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950">
                      <div className="font-bold flex items-center gap-1.5 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                        <span>Availability Status</span>
                      </div>
                      <p>{sub.availabilityNote}</p>
                    </div>
                  )}

                  <div className="space-y-1.5 pt-1">
                    <div className="text-xs font-semibold text-forest-900">
                      Included in this question bank:
                    </div>
                    <ul className="grid grid-cols-2 gap-1 text-xs text-academic-subtle">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" />
                        <span>200 practice problems</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" />
                        <span>Step-by-step model answers</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" />
                        <span>Method explanations</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" />
                        <span>Heuristic topic ranking</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-academic-border/70 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-serif font-bold text-forest-950">
                        ₹{sub.priceInr}
                      </span>
                      <span className="text-xs text-academic-subtle ml-1.5 font-sans">
                        / subject
                      </span>
                    </div>

                    <Link
                      href={`/subject/${sub.slug}`}
                      className="text-xs font-bold text-forest-900 hover:text-forest-700 flex items-center gap-1"
                    >
                      <span>Explore topics & samples</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <CheckoutButton
                    subjectSlug={sub.slug}
                    subjectName={sub.name}
                    priceInr={sub.priceInr}
                    isPublished={isPublished}
                    buttonText={`Enrol in ${sub.shortName} (₹999)`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
