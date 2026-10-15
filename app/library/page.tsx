import React from 'react';
import Link from 'next/link';
import { getSessionUser } from '@/lib/auth/session';
import { getUserEntitlements, getSubjects } from '@/lib/db/store';
import { DailyFiveChallenge } from '@/components/study/DailyFiveChallenge';
import { RevisionQueue } from '@/components/study/RevisionQueue';
import { SubjectRequestForm } from '@/components/SubjectRequestForm';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  User,
  Settings,
  Sparkles,
  Award,
  Layers,
} from 'lucide-react';

export const metadata = {
  title: 'My Study Library & Daily Practice | BoardEdge AI by itappens',
};

export default async function LibraryPage() {
  const user = await getSessionUser();
  const allSubjects = await getSubjects();
  const entitlements = user ? await getUserEntitlements(user.id) : [];

  const ownedSlugs = new Set(entitlements.map((e) => e.subject_slug));
  const enrolledSubjects = allSubjects.filter((s) => ownedSlugs.has(s.slug));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      {/* Account & Library Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-academic-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-700">
              Personal Study Space
            </span>
            <span className="text-xs text-forest-400">•</span>
            <span className="text-xs bg-limeaccent/30 text-forest-950 px-2 py-0.5 rounded font-bold">
              Class 10 CBSE 2027
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-forest-950 mt-1">
            Welcome back, {user?.name || 'Class 10 Student'}
          </h1>
          <p className="text-xs sm:text-sm text-academic-subtle mt-0.5">
            Know what to practise next, understand your mistakes, and see your progress.
          </p>
        </div>

        {/* Account Details / Status Pill */}
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-academic-border">
          <div className="w-8 h-8 rounded-lg bg-forest-900 text-limeaccent flex items-center justify-center font-bold text-xs">
            {user?.role === 'admin' ? 'A' : 'S'}
          </div>
          <div className="text-xs">
            <div className="font-semibold text-forest-950 truncate max-w-[150px]">
              {user?.email || 'student@itappens.ai'}
            </div>
            <div className="text-[10px] text-academic-subtle">
              {enrolledSubjects.length} of {allSubjects.length} Subjects Active
            </div>
          </div>
        </div>
      </div>

      {/* 1. Daily Five Practice Loop */}
      <section className="space-y-4">
        <DailyFiveChallenge />
      </section>

      {/* 2. Enrolled Subjects Grid & Resume Learning */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-academic-border pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-forest-700" />
            <h2 className="text-xl font-serif font-bold text-forest-950">
              My Purchased Question Banks ({enrolledSubjects.length})
            </h2>
          </div>

          <Link
            href="/catalogue"
            className="text-xs font-bold text-forest-900 hover:text-forest-700 underline"
          >
            Add More Subjects (₹999) →
          </Link>
        </div>

        {enrolledSubjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {enrolledSubjects.map((sub) => (
              <div
                key={sub.slug}
                className="rounded-2xl bg-white border border-academic-border p-6 flex flex-col justify-between space-y-4 shadow-sm hover:border-forest-700 transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-academic-subtle font-bold uppercase">
                      {sub.track}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-forest-100 text-forest-900 font-bold text-[10px]">
                      Access Active
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-xl text-forest-950">
                      {sub.name}
                    </h3>
                    <p className="text-xs text-academic-subtle mt-0.5">
                      200 AI-curated practice problems with model answers
                    </p>
                  </div>

                  {/* Progress Meter */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-[11px] font-semibold text-forest-800">
                      <span>Practice Completed</span>
                      <span>18 / 200 Questions</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-paper-200 overflow-hidden">
                      <div className="h-full bg-forest-900 rounded-full w-[9%]"></div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-academic-border/70 flex items-center justify-between">
                  <span className="text-[11px] text-academic-subtle font-mono">
                    Valid for CBSE 2027
                  </span>

                  <Link
                    href={`/study/${sub.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold text-xs transition shadow-sm"
                  >
                    <span>Open Reader</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl bg-paper-100 border border-academic-border p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-academic-border mx-auto flex items-center justify-center text-forest-800">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-lg font-serif font-bold text-forest-950">
                You have not enrolled in any question bank yet.
              </h3>
              <p className="text-xs text-academic-subtle leading-relaxed">
                Choose from Maths, Science, Social Science, English, or AI to start your curated CBSE 2027 revision.
              </p>
            </div>
            <div>
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-2 bg-forest-900 text-limeaccent font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl hover:bg-forest-800 transition"
              >
                <span>Browse Subjects Catalogue (₹999)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* 3. Mistake Comeback & Revision Queue */}
      <section className="space-y-4">
        <RevisionQueue />
      </section>

      {/* 4. Parent Progress Summary Card (With Permission Controls) */}
      <section className="rounded-2xl bg-white border border-academic-border p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-academic-border pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700">
              <User className="w-3.5 h-3.5" />
              <span>Parent Summary & Family Oversight</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-forest-950 mt-0.5">
              Weekly Practice Health Report
            </h3>
          </div>

          <div className="inline-flex items-center gap-2 text-xs text-forest-800 font-semibold bg-paper-100 px-3 py-1.5 rounded-lg border border-academic-border">
            <span>Status: Connected to Priya Sharma (Parent)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-paper-50 border border-academic-border space-y-1">
            <span className="text-academic-subtle font-semibold">Weekly Study Time</span>
            <div className="text-xl font-serif font-bold text-forest-950">2 hr 45 min</div>
            <span className="text-[11px] text-emerald-700">On track for daily goal</span>
          </div>

          <div className="p-4 rounded-xl bg-paper-50 border border-academic-border space-y-1">
            <span className="text-academic-subtle font-semibold">Questions Practiced</span>
            <div className="text-xl font-serif font-bold text-forest-950">35 Questions</div>
            <span className="text-[11px] text-forest-700">Across Maths, Science & AI</span>
          </div>

          <div className="p-4 rounded-xl bg-paper-50 border border-academic-border space-y-1">
            <span className="text-academic-subtle font-semibold">Concepts Re-tested</span>
            <div className="text-xl font-serif font-bold text-forest-950">8 Mistakes Resolved</div>
            <span className="text-[11px] text-amber-700">2 pending in revision queue</span>
          </div>
        </div>

        <p className="text-xs text-academic-subtle leading-relaxed">
          Parents receive an optional concise email summary every Sunday evening highlighting practice regularity
          and concepts strengthened. No invasive surveillance—focusing entirely on learning momentum.
        </p>
      </section>

      {/* 5. Subject Request Form Inside Library */}
      <section className="space-y-4">
        <SubjectRequestForm />
      </section>
    </div>
  );
}
