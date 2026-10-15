import React from 'react';
import Link from 'next/link';
import { ALL_SUBJECTS } from '@/lib/subjects';
import { CheckoutButton } from '@/components/CheckoutButton';
import { CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Layers } from 'lucide-react';

export const metadata = {
  title: 'Curriculum & Subject Tracks | LoopEdu',
  description:
    'Choose your subject tracks on LoopEdu. Practice daily 15-minute bite-sized routines, recover mistakes with active recall, and unlock complete 10-year question banks.',
};

export default function CataloguePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-900 border border-forest-200 text-xs font-semibold uppercase tracking-wider">
          Curriculum Subject Tracks
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-forest-950 tracking-tight">
          Select your subjects. Start your practice.
        </h1>
        <p className="text-base sm:text-lg text-forest-800 leading-relaxed">
          Built for students who want to prepare independently on their own. Each subject bank contains 200 questions prepared by AI with the help of <strong>past 10 years of CBSE board exam papers</strong>, complete with step-by-step model answers and marking-scheme explanations.
        </p>
        <div className="pt-1 flex flex-wrap items-center gap-3 text-xs font-semibold text-forest-900">
          <span className="bg-limeaccent text-forest-950 border border-forest-900/20 px-3 py-1.5 rounded-lg shadow-sm font-bold">
            Modular Subscription: ₹299 / month per subject
          </span>
          <span className="bg-white border border-academic-border px-3 py-1.5 rounded-lg shadow-sm">
            Choose Subjects One-by-One
          </span>
          <span className="bg-white border border-academic-border px-3 py-1.5 rounded-lg shadow-sm">
            Earn 10-Yr Question Bank PDFs Per Unit
          </span>
        </div>
      </div>

      {/* Modular Subscription Pricing Tier Banner */}
      <div className="rounded-3xl bg-forest-950 text-white p-6 sm:p-8 shadow-xl border border-forest-800 space-y-6">
        <div className="max-w-2xl">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-limeaccent bg-forest-900 px-2 py-0.5 rounded">
            Modular Pricing Options
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-2">
            Subscribe only to what your child needs.
          </h2>
          <p className="text-xs sm:text-sm text-forest-300 mt-1 leading-relaxed">
            No forced packages. Choose 1 subject for a weak area, bundle 2, or unlock all subjects. Includes Duolingo-style 15-min daily path, NCERT AI Coach, and Parent Observability Hub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Plan 1 */}
          <div className="rounded-2xl bg-forest-900 border border-forest-800 p-5 space-y-3 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-forest-300">
                Single Subject Focus
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-serif font-bold text-white">₹299</span>
                <span className="text-xs text-forest-400">/ month</span>
              </div>
              <p className="text-xs text-forest-300 mt-2">
                Ideal to fix one specific weak subject (e.g. Maths Standard or Science).
              </p>
            </div>
            <ul className="text-xs text-forest-200 space-y-1.5 pt-3 border-t border-forest-800">
              <li>✓ Daily 15-min Duolingo path</li>
              <li>✓ Earn Topic Question Bank PDFs</li>
              <li>✓ Parent Observability Hub</li>
              <li>✓ NCERT AI Coach included</li>
            </ul>
          </div>

          {/* Plan 2 */}
          <div className="rounded-2xl bg-forest-900 border-2 border-limeaccent p-5 space-y-3 flex flex-col justify-between relative shadow-md">
            <span className="absolute -top-3 right-4 bg-limeaccent text-forest-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
              Most Popular
            </span>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-limeaccent">
                Core Duo Pack
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-serif font-bold text-white">₹499</span>
                <span className="text-xs text-forest-400">/ month</span>
              </div>
              <p className="text-xs text-forest-300 mt-2">
                Pick any 2 subjects (e.g. Maths + Science). Save ₹99 every month.
              </p>
            </div>
            <ul className="text-xs text-forest-200 space-y-1.5 pt-3 border-t border-forest-800">
              <li>✓ Any 2 CBSE subjects</li>
              <li>✓ 2× Daily 15-min habit loops</li>
              <li>✓ Weekly WhatsApp Parent Reports</li>
              <li>✓ Priority NCERT AI doubt solving</li>
            </ul>
          </div>

          {/* Plan 3 */}
          <div className="rounded-2xl bg-forest-900 border border-forest-800 p-5 space-y-3 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                All-Subject Board Pass
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-serif font-bold text-white">₹799</span>
                <span className="text-xs text-forest-400">/ month</span>
              </div>
              <p className="text-xs text-forest-300 mt-2">
                Full access to all 8 CBSE subjects. Complete board exam preparation.
              </p>
            </div>
            <ul className="text-xs text-forest-200 space-y-1.5 pt-3 border-t border-forest-800">
              <li>✓ All 8 CBSE Class 10 subjects</li>
              <li>✓ Complete question bank PDF unlock series</li>
              <li>✓ Comprehensive Board Readiness Index</li>
              <li>✓ Unlimited NCERT AI Coach</li>
            </ul>
          </div>
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
          <span className="text-xs text-forest-800 font-mono font-semibold bg-forest-100 px-2.5 py-1 rounded-md">
            All 8 Question Banks Published & Available
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
                        ₹299
                      </span>
                      <span className="text-xs text-academic-subtle ml-1.5 font-sans">
                        / month
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
                    priceInr={299}
                    isPublished={isPublished}
                    buttonText={`Subscribe to ${sub.shortName} (₹299/mo)`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Coming Soon for Classes 12, 11, 9, and 8 */}
      <div className="rounded-3xl bg-forest-950 text-white p-8 sm:p-12 relative overflow-hidden border border-forest-800">
        <div className="max-w-2xl space-y-3 mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-limeaccent">
            Future Curriculum Roadmaps
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Expanding Classes & Boards: Classes 12, 11, 9 & 8
          </h2>
          <p className="text-xs sm:text-sm text-forest-200 leading-relaxed">
            Expanding our bite-sized daily habit routine and mistake-recall loop across CBSE higher secondary, foundation classes, ICSE, and State Boards on our modular ₹299/mo subscription.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-forest-900/80 border border-forest-800 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-limeaccent bg-forest-800 px-2 py-0.5 rounded">
              In Review
            </span>
            <h3 className="text-base font-serif font-bold text-white mt-1">Class 12 CBSE</h3>
            <p className="text-xs text-forest-300">Physics, Chemistry, Maths, Biology, Accountancy, Economics.</p>
          </div>
          <div className="p-5 rounded-2xl bg-forest-900/80 border border-forest-800 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-300 bg-forest-800 px-2 py-0.5 rounded">
              Mapping
            </span>
            <h3 className="text-base font-serif font-bold text-white mt-1">Class 11 CBSE</h3>
            <p className="text-xs text-forest-300">Senior Secondary bridge question banks for Science & Commerce.</p>
          </div>
          <div className="p-5 rounded-2xl bg-forest-900/80 border border-forest-800 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-blue-300 bg-forest-800 px-2 py-0.5 rounded">
              Drafting
            </span>
            <h3 className="text-base font-serif font-bold text-white mt-1">Class 9 CBSE</h3>
            <p className="text-xs text-forest-300">Pre-board foundational problem sets in Maths, Science & Social Science.</p>
          </div>
          <div className="p-5 rounded-2xl bg-forest-900/80 border border-forest-800 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-purple-300 bg-forest-800 px-2 py-0.5 rounded">
              Drafting
            </span>
            <h3 className="text-base font-serif font-bold text-white mt-1">Class 8 CBSE</h3>
            <p className="text-xs text-forest-300">Junior high conceptual clarity and active recall practice modules.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
