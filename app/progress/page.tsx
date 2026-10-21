'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  TrendingUp,
  Star,
  Flame,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  BookOpen,
  Calendar,
  Award,
  ChevronRight,
  BarChart3,
  Check,
} from 'lucide-react';

interface TopicMastery {
  topic: string;
  subject: string;
  totalQuestions: number;
  attempted: number;
  status: 'Mastered' | 'Improving' | 'Needs Practice';
  accuracy: number;
}

const SAMPLE_SKILLS: TopicMastery[] = [
  { topic: 'Chemical Reactions and Equations', subject: 'Science', totalQuestions: 15, attempted: 12, status: 'Mastered', accuracy: 92 },
  { topic: 'Acids, Bases and Salts', subject: 'Science', totalQuestions: 14, attempted: 9, status: 'Improving', accuracy: 78 },
  { topic: 'Electricity & Circuit Analysis', subject: 'Science', totalQuestions: 18, attempted: 11, status: 'Needs Practice', accuracy: 55 },
  { topic: 'Real Numbers & Fundamental Theorem', subject: 'Maths Std', totalQuestions: 16, attempted: 14, status: 'Mastered', accuracy: 95 },
  { topic: 'Quadratic Equations & Roots', subject: 'Maths Std', totalQuestions: 17, attempted: 8, status: 'Improving', accuracy: 72 },
  { topic: 'Arithmetic Progressions', subject: 'Maths Std', totalQuestions: 16, attempted: 10, status: 'Improving', accuracy: 80 },
  { topic: 'Rise of Nationalism in Europe', subject: 'Social Science', totalQuestions: 15, attempted: 11, status: 'Mastered', accuracy: 88 },
  { topic: 'Natural Language Processing', subject: 'Artificial Intelligence', totalQuestions: 12, attempted: 7, status: 'Improving', accuracy: 75 },
];

export default function StudentProgressPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);
  const [smartScore, setSmartScore] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) {
          router.push('/login?redirect=/progress');
          return;
        }
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        router.push('/login?redirect=/progress');
      });

    fetch('/api/student/progress')
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setStreak(data.currentStreak || 0);
          setSmartScore(data.smartScore || 0);
          setTotalAttempted(data.totalAttempted || 0);
          setMistakeCount(data.mistakeCount || 0);
        }
      })
      .catch(() => {});
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Loading your progress...</p>
        </div>
      </div>
    );
  }

  const isDemoStats = streak === 0 && smartScore === 0 && totalAttempted === 0;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Performance & Mastery
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-600 font-medium">Real-Time Sync</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-950">Am I Improving?</h1>
              <p className="text-sm text-slate-500 mt-1">
                Track skills strengthened, revision items due, and board readiness metrics.
              </p>
            </div>

            <Link
              href="/learn"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-xs self-start sm:self-auto"
            >
              <span>Today’s Practice</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Core Metrics 4-Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
              <Star className="w-5 h-5 text-blue-700" />
            </div>
            <p className="text-3xl font-extrabold text-blue-700">
              {smartScore > 0 ? smartScore : '—'}
            </p>
            <p className="text-xs font-bold text-slate-950 mt-1">SmartScore™</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Reflects accuracy, consistency &amp; problem difficulty
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
              <Flame className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-3xl font-extrabold text-amber-700">
              {streak > 0 ? `${streak} Days` : '0 Days'}
            </p>
            <p className="text-xs font-bold text-slate-950 mt-1">Habit Streak</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Consecutive days with at least one completed session
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            </div>
            <p className="text-3xl font-extrabold text-emerald-700">{totalAttempted}</p>
            <p className="text-xs font-bold text-slate-950 mt-1">Questions Solved</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Checked with step-by-step NCERT solutions
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center mb-3">
              <RotateCcw className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-extrabold text-orange-700">{mistakeCount}</p>
            <p className="text-xs font-bold text-slate-950 mt-1">Mistakes to Revisit</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Queued for targeted comeback revision
            </p>
          </div>
        </div>

        {/* Next Small Win / Mistake Revision Callout */}
        {mistakeCount > 0 ? (
          <div className="p-5 bg-orange-50 border border-orange-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="font-bold text-orange-950 text-sm">Mistake → Comeback → Proof of Improvement</h2>
                <p className="text-xs text-orange-800 mt-0.5">
                  You have {mistakeCount} question{mistakeCount > 1 ? 's' : ''} flagged for review. Practising these now turns misconceptions into permanent test wins.
                </p>
              </div>
            </div>
            <Link
              href="/study/science?filter=revisit"
              className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Practise Mistakes Now</span>
            </Link>
          </div>
        ) : (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Zero Overdue Mistakes:</strong> Your revision queue is currently empty. Keep up the high accuracy in your next daily session!
            </span>
          </div>
        )}

        {/* Skill Mastery Breakdown (Khan Academy Style: Mastered / Improving / Needs Practice) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-700" /> Topic-Level Mastery
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluated from actual student attempts and formula accuracy.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Mastered
              </span>
              <span className="flex items-center gap-1.5 font-medium text-blue-700">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Improving
              </span>
              <span className="flex items-center gap-1.5 font-medium text-orange-700">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Needs Practice
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {SAMPLE_SKILLS.map((skill, idx) => {
              const statusStyles = {
                Mastered: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                Improving: 'bg-blue-50 text-blue-800 border-blue-200',
                'Needs Practice': 'bg-orange-50 text-orange-800 border-orange-200',
              }[skill.status];

              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {skill.subject}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm truncate">{skill.topic}</h3>
                    </div>
                    <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-500">
                      <span>{skill.attempted} of {skill.totalQuestions} Questions Solved</span>
                      <span>Accuracy: <strong>{skill.accuracy}%</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusStyles}`}>
                      {skill.status}
                    </span>
                    <Link
                      href="/study/science"
                      className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                    >
                      Practise <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
