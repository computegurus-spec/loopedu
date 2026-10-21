'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Lock,
  ChevronRight,
  ShieldCheck,
  Bookmark,
  RotateCcw,
  Star,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface SubjectCardData {
  slug: string;
  name: string;
  shortName: string;
  grade: string;
  description: string;
  questionCount: number;
  currentTopic: string;
  accessStatus: 'paid' | 'free' | 'unsubscribed' | 'coming-soon';
  remainingWeeklyQuestions?: number;
  color: string;
  bgColor: string;
  borderColor: string;
}

const ALL_SUBJECT_CARDS: SubjectCardData[] = [
  {
    slug: 'science',
    name: 'Science (Code 086)',
    shortName: 'Science',
    grade: 'CBSE Class 10',
    description: 'Balanced Physics, Chemistry, and Biology questions with NCERT marking schemes.',
    questionCount: 200,
    currentTopic: 'Chemical Reactions & Equations',
    accessStatus: 'free',
    remainingWeeklyQuestions: 10,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    slug: 'maths-standard',
    name: 'Mathematics Standard (Code 041)',
    shortName: 'Maths Std',
    grade: 'CBSE Class 10',
    description: 'Rigorous proof-based questions, polynomial zeros, trigonometry, and surface areas.',
    questionCount: 200,
    currentTopic: 'Real Numbers & Polynomials',
    accessStatus: 'free',
    remainingWeeklyQuestions: 10,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    slug: 'maths-basic',
    name: 'Mathematics Basic (Code 241)',
    shortName: 'Maths Basic',
    grade: 'CBSE Class 10',
    description: 'Core foundational problems, basic arithmetic progressions, and coordinate geometry.',
    questionCount: 200,
    currentTopic: 'Quadratic Equations',
    accessStatus: 'free',
    remainingWeeklyQuestions: 10,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    slug: 'social-science',
    name: 'Social Science (Code 087)',
    shortName: 'Social Science',
    grade: 'CBSE Class 10',
    description: 'History, Geography, Political Science, and Economics structured chapter practice.',
    questionCount: 200,
    currentTopic: 'Rise of Nationalism in Europe',
    accessStatus: 'free',
    remainingWeeklyQuestions: 10,
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  {
    slug: 'english-language-literature',
    name: 'English (Language & Literature 184)',
    shortName: 'English L&L',
    grade: 'CBSE Class 10',
    description: 'Literature extracts, poetic devices, analytical paragraphs, and grammar accuracy.',
    questionCount: 200,
    currentTopic: 'A Letter to God / First Flight',
    accessStatus: 'free',
    remainingWeeklyQuestions: 10,
    color: 'text-violet-700',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
  },
  {
    slug: 'artificial-intelligence',
    name: 'Artificial Intelligence (Code 417)',
    shortName: 'AI Skill Sub',
    grade: 'CBSE Class 10',
    description: 'AI Project Cycle, NLP, Computer Vision, and Python evaluation rubrics.',
    questionCount: 200,
    currentTopic: 'Introduction to AI & Project Cycle',
    accessStatus: 'free',
    remainingWeeklyQuestions: 10,
    color: 'text-pink-700',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
  },
  {
    slug: 'german',
    name: 'German (Code 017)',
    shortName: 'German',
    grade: 'CBSE Class 10',
    description: 'Grammar structures, reading comprehension, and written expression.',
    questionCount: 200,
    currentTopic: 'Passiv & Nebensätze',
    accessStatus: 'free',
    remainingWeeklyQuestions: 10,
    color: 'text-slate-700',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
  },
  {
    slug: 'english-communicative',
    name: 'English Communicative (Code 101)',
    shortName: 'English Comm',
    grade: 'CBSE Class 10',
    description: 'Literature reader, communicative grammar exercises, and writing skills.',
    questionCount: 200,
    currentTopic: 'Fiction & Poetry Reader',
    accessStatus: 'free',
    remainingWeeklyQuestions: 10,
    color: 'text-violet-700',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
  },
];

export default function MySubjectsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) {
          router.push('/login?redirect=/my-subjects');
          return;
        }
        setUser(data.user);
        setIsPro(Boolean(data.isPaid || data.user.isPro || data.user.role === 'admin'));
        setLoading(false);
      })
      .catch(() => {
        router.push('/login?redirect=/my-subjects');
      });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Loading your subjects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  CBSE Class 10 Study Space
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-600 font-medium">8 Subject Tracks</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-950">My Subjects</h1>
              <p className="text-sm text-slate-500 mt-1">
                Access your question banks, step-by-step solutions, and saved practice sets.
              </p>
            </div>

            {/* Plan status indicator */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3 rounded-2xl">
              <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase() || 'S'}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{user?.name}</p>
                <p className="text-[11px] text-slate-500">
                  {isPro ? (
                    <span className="text-emerald-700 font-semibold">Pro Plan · All Subjects Unlocked</span>
                  ) : (
                    <span className="text-blue-700 font-semibold">Free Weekly Practice Plan</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Unambiguous Access Status Banner */}
        {!isPro ? (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-blue-950">Your free weekly practice is ready</h2>
                <p className="text-xs text-blue-800 mt-0.5">
                  10 curated board questions per subject are available this week with step hints and model answers. Resets every 7 days.
                </p>
              </div>
            </div>
            <Link
              href="/catalogue#pricing"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shrink-0"
            >
              <span>Unlock All 200 Questions (₹299/mo)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-xs text-emerald-900 font-medium">
              <strong>All 8 Subject Question Banks Active:</strong> You have unlimited access to all 1,600 verified CBSE questions, model answers, and printable PDF downloads.
            </p>
          </div>
        )}

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ALL_SUBJECT_CARDS.map((sub) => {
            const hasFullAccess = isPro;
            return (
              <div
                key={sub.slug}
                className={`bg-white rounded-2xl border p-5 transition flex flex-col justify-between hover:shadow-md ${sub.borderColor}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm ${sub.bgColor} ${sub.color}`}
                      >
                        {sub.shortName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-950 text-base leading-snug">
                          {sub.name}
                        </h3>
                        <p className="text-xs text-slate-500">{sub.grade}</p>
                      </div>
                    </div>

                    {/* Unmistakable Status Pill */}
                    <div>
                      {hasFullAccess ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Included in your plan
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          <Clock className="w-3 h-3 text-slate-500" />
                          Free practice · 10 questions/wk
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {sub.description}
                  </p>

                  <div className="bg-slate-50 rounded-xl p-2.5 mb-4 border border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Current Chapter / Focus
                    </p>
                    <p className="text-xs font-semibold text-slate-900 mt-0.5 truncate">
                      {sub.currentTopic}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs font-medium text-slate-500">
                    {sub.questionCount} Questions in bank
                  </span>
                  <Link
                    href={`/study/${sub.slug}`}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
                      hasFullAccess
                        ? 'bg-blue-700 hover:bg-blue-800 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>{hasFullAccess ? 'Continue' : 'Start Practice'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
