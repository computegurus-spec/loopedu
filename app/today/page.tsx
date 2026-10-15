'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  Clock,
  RotateCcw,
  ArrowRight,
  Flame,
  Calendar,
  Layers,
  Award,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  Play,
  Shuffle,
  ShieldCheck,
} from 'lucide-react';
import { ALL_SUBJECTS } from '@/lib/subjects';
import { DailyFiveChallenge } from '@/components/study/DailyFiveChallenge';
import { RevisionQueue } from '@/components/study/RevisionQueue';

export default function TodayDashboardPage() {
  const [activeTab, setActiveTab] = useState<'assignment' | 'daily5' | 'mistakes'>('assignment');
  const [studyPlan, setStudyPlan] = useState<any>(null);

  const router = typeof window !== 'undefined' ? require('next/navigation').useRouter() : null;

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (!data.user && router) {
          router.push('/login?redirect=/today');
        }
      })
      .catch(() => {});

    try {
      const stored = localStorage.getItem('boardedge_study_plan');
      if (stored) {
        setStudyPlan(JSON.parse(stored));
      }
    } catch (e) {
      // fallback
    }
  }, [router]);

  const studentName = studyPlan?.studentName || 'Student';
  const dailyMins = studyPlan?.dailyMinutes || 15;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* 1. Header & Daily Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-academic-border pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-700">
            <span>Daily Practice Routine</span>
            <span>•</span>
            <span className="bg-limeaccent/40 text-forest-950 px-2 py-0.5 rounded font-bold">
              The Daily Five
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-forest-950">
            Good afternoon, {studentName}
          </h1>
          <p className="text-xs sm:text-sm text-forest-800">
            Here is your daily assignment for today. 15 minutes of focused practice builds genuine mastery.
          </p>
        </div>

        {/* Habit & Streak Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-academic-border px-3.5 py-2 rounded-xl shadow-sm text-xs">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <div>
              <div className="font-bold text-forest-950">4-Day Habit</div>
              <div className="text-[10px] text-academic-subtle">Forgiving streak</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white border border-academic-border px-3.5 py-2 rounded-xl shadow-sm text-xs">
            <Clock className="w-4 h-4 text-forest-700" />
            <div>
              <div className="font-bold text-forest-950">{dailyMins} Mins Target</div>
              <div className="text-[10px] text-academic-subtle">6 questions ready</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Today's Practice Assignment Hero Card */}
      <div className="rounded-2xl bg-gradient-to-br from-forest-900 to-forest-950 text-white p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-limeaccent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-forest-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-limeaccent tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Today's Recommended Assignment</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Quadratic Equations & Electric Resistance
            </h2>
            <p className="text-xs text-forest-200">
              Target duration: 15 minutes • 6 questions total (3 current topic, 2 mistake revisit, 1 stretch)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/study/science?q=SC-C01"
              className="inline-flex items-center gap-2 bg-limeaccent hover:bg-limeaccent-hover text-forest-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-forest-950" />
              <span>Begin Assignment</span>
            </Link>
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-1.5 bg-forest-800/80 hover:bg-forest-800 text-forest-100 px-4 py-3 rounded-xl text-xs font-semibold border border-forest-700 transition"
              title="Change assignment or choose different topic"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Change Topic</span>
            </Link>
          </div>
        </div>

        {/* Breakdown of the 6 Questions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-forest-800/50 border border-forest-700/60 space-y-1">
            <div className="text-[11px] font-mono text-limeaccent uppercase font-bold">
              3 Questions • Current Topic
            </div>
            <div className="font-semibold text-white">Quadratic Relations (Standard 041)</div>
            <div className="text-[11px] text-forest-300">
              Nature of roots, discriminant tests, factorisation.
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-forest-800/50 border border-forest-700/60 space-y-1">
            <div className="text-[11px] font-mono text-amber-300 uppercase font-bold">
              2 Questions • Mistake Revisit
            </div>
            <div className="font-semibold text-white">Parallel Resistors & Exothermic ATP</div>
            <div className="text-[11px] text-forest-300">
              Revisiting concepts missed in your last session.
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-forest-800/50 border border-forest-700/60 space-y-1">
            <div className="text-[11px] font-mono text-blue-300 uppercase font-bold">
              1 Question • Stretch Challenge
            </div>
            <div className="font-semibold text-white">3-Mark Case Application</div>
            <div className="text-[11px] text-forest-300">
              Deep reasoning problem from 2024 board papers.
            </div>
          </div>
        </div>
      </div>

      {/* 3. Daily Habit & Revision Games */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-serif font-bold text-forest-950">
              Practice Modes & Retention Games
            </h3>
            <p className="text-xs text-academic-subtle">
              Fast, focused formats to build recall and strengthen weak areas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Daily Five */}
          <div className="rounded-2xl bg-white border border-academic-border p-5 space-y-3 shadow-sm hover:border-forest-900 transition flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-limeaccent/30 text-forest-950 flex items-center justify-center font-bold text-xs">
                5
              </div>
              <h4 className="font-serif font-bold text-base text-forest-950">Daily Five</h4>
              <p className="text-xs text-forest-800 leading-relaxed">
                5 rapid questions across your core subjects. Build a manageable 10-minute daily habit.
              </p>
            </div>
            <Link
              href="/challenge"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-900 hover:text-forest-950 underline pt-2"
            >
              <span>Play Today's Daily Five →</span>
            </Link>
          </div>

          {/* Beat Your Best */}
          <div className="rounded-2xl bg-white border border-academic-border p-5 space-y-3 shadow-sm hover:border-forest-900 transition flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-forest-100 text-forest-900 flex items-center justify-center font-bold text-xs">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-base text-forest-950">Beat Your Best</h4>
              <p className="text-xs text-forest-800 leading-relaxed">
                An optional timed fluency round. Improve your solving speed against your own previous record.
              </p>
            </div>
            <Link
              href="/study/science"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-900 hover:text-forest-950 underline pt-2"
            >
              <span>Start Timed Sprint →</span>
            </Link>
          </div>

          {/* Mistake Comeback */}
          <div className="rounded-2xl bg-white border border-academic-border p-5 space-y-3 shadow-sm hover:border-forest-900 transition flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs">
                <RotateCcw className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-base text-forest-950">Mistake Comeback</h4>
              <p className="text-xs text-forest-800 leading-relaxed">
                Re-attempt previously missed concepts. Turn stumbling blocks into confident exam points.
              </p>
            </div>
            <Link
              href="/study/maths-standard"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-900 hover:text-forest-950 underline pt-2"
            >
              <span>Clear 3 Pending Mistakes →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Revision Due & Spaced Repetition Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-bold text-forest-950">
              Revision Due (Spaced Recall)
            </h3>
            <span className="text-xs text-academic-subtle">
              Based on your self-assessments
            </span>
          </div>

          <div className="rounded-2xl bg-white border border-academic-border p-6 shadow-sm space-y-4">
            <div className="space-y-3">
              {[
                {
                  id: 'MB-001',
                  subject: 'Maths Basic',
                  topic: 'Quadratic Equations',
                  reason: 'Missed sign during factorisation (x - 3)(x - 5) = 0',
                  due: 'Today',
                  slug: 'maths-basic',
                },
                {
                  id: 'SC-C02',
                  subject: 'Science',
                  topic: 'Electricity',
                  reason: 'Formula check: 1/Rp = 1/R1 + 1/R2',
                  due: 'Today',
                  slug: 'science',
                },
                {
                  id: 'AI-C01',
                  subject: 'Artificial Intelligence',
                  topic: 'Natural Language Processing',
                  reason: 'IDF calculation log(N/DF) definition',
                  due: 'Tomorrow',
                  slug: 'artificial-intelligence',
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-academic-border bg-paper-50 hover:bg-paper-100 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-academic-border">
                        {item.id}
                      </span>
                      <span className="font-semibold text-forest-950">{item.subject}</span>
                      <span className="text-forest-400">•</span>
                      <span className="text-academic-subtle">{item.topic}</span>
                    </div>
                    <div className="text-xs text-forest-800">
                      {item.reason}
                    </div>
                  </div>

                  <Link
                    href={`/study/${item.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold bg-white border border-academic-border px-3 py-1.5 rounded-lg text-forest-900 hover:bg-forest-50 transition shrink-0"
                  >
                    <span>Re-attempt</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Weekly Progress & Actionable Recommendation */}
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-forest-950">
            Weekly Progress
          </h3>

          <div className="rounded-2xl bg-white border border-academic-border p-6 shadow-sm space-y-5">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold text-forest-950 mb-1">
                  <span>Questions Attempted</span>
                  <span>24 / 35 goal</span>
                </div>
                <div className="w-full bg-paper-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-forest-900 h-2 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-forest-950 mb-1">
                  <span>Topic Accuracy</span>
                  <span>82%</span>
                </div>
                <div className="w-full bg-paper-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '82%' }} />
                </div>
              </div>
            </div>

            {/* Honest, Actionable Coaching Note */}
            <div className="p-4 rounded-xl bg-forest-50 border border-forest-200 space-y-1.5 text-xs text-forest-900">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-forest-700" />
                <span>Study Coach Note:</span>
              </div>
              <p className="text-[12px] text-forest-800 leading-relaxed">
                “You missed two recent questions on quadratic factorisation. Add a short revision round tomorrow?”
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Enrolled Subject Banks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-serif font-bold text-forest-950">
              Curriculum Subject Tracks
            </h3>
            <p className="text-xs text-academic-subtle">
              Curated from past 10 years of board papers • Included with your LoopEdu Pro subscription or unlocked through daily streaks.
            </p>
          </div>
          <Link
            href="/catalogue"
            className="text-xs font-bold text-forest-900 hover:text-forest-950 underline"
          >
            Explore all 8 subjects →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ALL_SUBJECTS.slice(0, 4).map((sub) => (
            <div
              key={sub.slug}
              className="rounded-2xl bg-white border border-academic-border p-5 space-y-3 shadow-sm hover:border-academic-borderStrong transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-academic-subtle">
                  <span>{sub.track}</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-forest-950">
                  {sub.name}
                </h4>
                <p className="text-[11px] text-forest-800 line-clamp-2">
                  {sub.description}
                </p>
              </div>

              <div className="pt-3 border-t border-academic-border flex items-center justify-between">
                <span className="text-xs text-academic-subtle font-medium">
                  {sub.questionCount} Questions
                </span>
                <Link
                  href={`/study/${sub.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-forest-900 hover:underline"
                >
                  <span>Open Bank →</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
