import React from 'react';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { getSubject, getSampleQuestions } from '@/lib/db/store';
import { getSessionUser } from '@/lib/auth/session';
import { SubjectSlug } from '@/types';
import { CheckoutButton } from '@/components/CheckoutButton';
import { MathRenderer } from '@/components/MathRenderer';
import {
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Eye,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

interface SubjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: SubjectPageProps) {
  const subject = await getSubject(params.slug as SubjectSlug);
  if (!subject) return {};

  return {
    title: `${subject.name} Track | LoopEdu`,
    description: `Curated high-yield practice questions with model answers for ${subject.name}. Master the Daily Five routine and spaced active recall on LoopEdu.`,
  };
}

export default async function SubjectDetailPage({ params }: SubjectPageProps) {
  const user = await getSessionUser();
  const slug = params.slug as SubjectSlug;

  if (!user) {
    redirect(`/login?redirect=/subject/${slug}`);
  }

  const subject = await getSubject(slug);

  if (!subject) {
    notFound();
  }

  const sampleQuestions = await getSampleQuestions(slug);
  const isPublished = subject.status === 'published';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-academic-subtle">
        <Link href="/" className="hover:text-forest-900">
          Home
        </Link>
        <span>/</span>
        <Link href="/catalogue" className="hover:text-forest-900">
          Subjects
        </Link>
        <span>/</span>
        <span className="text-forest-950 font-semibold">{subject.shortName}</span>
      </nav>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs bg-forest-100 text-forest-900 px-2.5 py-1 rounded-md font-bold uppercase">
              {subject.track}
            </span>
            <span className="text-xs bg-paper-200 text-forest-800 px-2.5 py-1 rounded-md font-medium">
              Class 10 • CBSE 2027
            </span>
            <span
              className={`text-xs px-2.5 py-1 rounded-md font-bold ${
                isPublished
                  ? 'bg-forest-900 text-limeaccent'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}
            >
              {isPublished ? 'Published & Available' : 'Coverage Review Pending'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-forest-950 tracking-tight leading-tight">
            {subject.name}
          </h1>

          <p className="text-base sm:text-lg text-forest-800 leading-relaxed font-normal">
            {subject.description}
          </p>

          <div className="p-4 bg-white border border-academic-border rounded-xl space-y-2 text-xs text-forest-900">
            <div className="font-semibold text-forest-950 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-forest-700" />
              <span>Curriculum & Rights Status</span>
            </div>
            <p className="text-academic-subtle leading-relaxed">
              Curriculum reference: <span className="font-medium text-forest-900">{subject.curriculumRef}</span>.
              All {subject.questionCount} questions, passages, and explanations are original models prioritized by historical topic frequency.
            </p>
          </div>

          {subject.trackComparisonNote && (
            <div className="p-4 bg-forest-50 border border-forest-200 rounded-xl text-xs text-forest-900">
              <strong className="block text-forest-950 mb-1">Enrolment Guidance:</strong>
              {subject.trackComparisonNote}
            </div>
          )}

          {subject.availabilityNote && (
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>Notice on Availability:</span>
              </div>
              <p className="leading-relaxed">{subject.availabilityNote}</p>
            </div>
          )}
        </div>

        {/* Purchase / Enrolment Card */}
        <div className="rounded-2xl bg-white border-2 border-academic-borderStrong/40 p-6 sm:p-7 shadow-lg space-y-6 lg:sticky lg:top-24">
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-academic-subtle">
              Complete Question Bank
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-serif font-bold text-forest-950">
                ₹{subject.priceInr}
              </span>
              <span className="text-xs text-academic-subtle font-sans">
                / one-time payment
              </span>
            </div>
            <p className="text-xs text-forest-700 font-medium">
              Tax inclusive • No recurring charges
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t border-academic-border text-xs text-forest-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-forest-700 flex-shrink-0" />
              <span><strong>{subject.questionCount}</strong> verified practice questions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-forest-700 flex-shrink-0" />
              <span>Step-by-step model answers & explanations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-forest-700 flex-shrink-0" />
              <span>Personalized study reader with bookmarking</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-forest-700 flex-shrink-0" />
              <span>Modular monthly subscription (cancel anytime)</span>
            </div>
          </div>

          <CheckoutButton
            subjectSlug={subject.slug}
            subjectName={subject.name}
            priceInr={299}
            isPublished={isPublished}
            buttonText={`Start ${subject.shortName} (₹299/mo)`}
          />

          <div className="text-[11px] text-academic-subtle text-center space-y-1">
            <p>Razorpay secure encrypted payment • Instant access</p>
            <p>Independent practice material • Not official CBSE paper</p>
          </div>
        </div>
      </div>

      {/* Verified Topics Covered */}
      <div className="rounded-2xl bg-white border border-academic-border p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-forest-950">
          Verified Topics & Curriculum Syllabus
        </h2>
        <p className="text-xs sm:text-sm text-academic-subtle">
          Questions in this bank are categorized and balanced across the following prescribed units:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">
          {subject.verifiedTopics.map((topic, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-paper-50 border border-academic-border text-xs font-medium text-forest-900 flex items-center gap-2"
            >
              <div className="w-5 h-5 rounded-md bg-forest-100 text-forest-800 flex items-center justify-center font-bold text-[10px]">
                {idx + 1}
              </div>
              <span className="truncate">{topic}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Free Sample Questions (Interactive Reveal) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-academic-border pb-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-forest-700">
              Free Preview
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950 mt-0.5">
              Free Sample Questions & Model Answers
            </h2>
            <p className="text-xs text-academic-subtle mt-1">
              Sample questions with full answers and explanations. No email required to view.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {sampleQuestions.map((sq, idx) => (
            <div
              key={sq.id}
              className="rounded-2xl bg-white border border-academic-border p-6 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono bg-paper-200 px-2.5 py-0.5 rounded text-forest-900 font-semibold">
                  Sample {idx + 1} • ID: {sq.id}
                </span>
                <span className="font-semibold text-forest-800">
                  {sq.marks} {sq.marks === 1 ? 'Mark' : 'Marks'}
                </span>
              </div>

              <div>
                <div className="text-xs font-semibold text-academic-subtle mb-1">
                  Topic: {sq.topic} (Chapter {sq.chapter})
                </div>
                <div className="text-base text-forest-950 font-medium leading-relaxed bg-paper-50 p-4 rounded-xl border border-academic-border">
                  <MathRenderer content={sq.question} />
                </div>
              </div>

              <details className="group rounded-xl border border-forest-200 bg-forest-50/60 p-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="cursor-pointer font-bold text-xs uppercase tracking-wider text-forest-900 flex items-center justify-between">
                  <span>Reveal Model Answer & Method Explanation</span>
                  <span className="text-forest-700 group-open:rotate-180 transition">▼</span>
                </summary>
                <div className="pt-3 mt-3 border-t border-forest-200 space-y-3">
                  <div>
                    <div className="text-xs font-bold text-forest-900 uppercase tracking-wider">
                      Model Answer:
                    </div>
                    <div className="text-sm font-semibold text-forest-950 mt-1">
                      <MathRenderer content={sq.answer} />
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-forest-800 uppercase tracking-wider">
                      Explanation & Rationale:
                    </div>
                    <div className="text-xs sm:text-sm text-forest-800 leading-relaxed mt-1">
                      <MathRenderer content={sq.explanation} />
                    </div>
                  </div>

                  <div className="text-[11px] text-academic-subtle pt-1">
                    Source reference: {sq.source}
                  </div>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
