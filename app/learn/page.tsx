'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Zap,
  Timer,
  Target,
  Flame,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Sparkles,
  ChevronRight,
  Calendar,
  CheckCircle2,
  Star,
  TrendingUp,
  AlertCircle,
  Clock,
  Compass,
} from 'lucide-react';

const SUBJECTS = [
  { slug: 'science', name: 'Science', shortName: 'Science', currentTopic: 'Chemical Reactions & Equations', color: 'text-emerald-700', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
  { slug: 'maths-standard', name: 'Mathematics (Standard)', shortName: 'Maths Std', currentTopic: 'Real Numbers & Polynomials', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  { slug: 'maths-basic', name: 'Mathematics (Basic)', shortName: 'Maths Basic', currentTopic: 'Quadratic Equations & Roots', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  { slug: 'social-science', name: 'Social Science', shortName: 'Social Sci', currentTopic: 'Rise of Nationalism in Europe', color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
  { slug: 'english-language-literature', name: 'English (L&L)', shortName: 'English', currentTopic: 'A Letter to God / First Flight', color: 'text-violet-700', bgColor: 'bg-violet-50', borderColor: 'border-violet-200' },
  { slug: 'artificial-intelligence', name: 'AI (Code 417)', shortName: 'AI', currentTopic: 'AI Project Cycle & NLP', color: 'text-pink-700', bgColor: 'bg-pink-50', borderColor: 'border-pink-200' },
  { slug: 'german', name: 'German (Code 017)', shortName: 'German', currentTopic: 'Grammatik & Nebensätze', color: 'text-slate-700', bgColor: 'bg-slate-50', borderColor: 'border-slate-200' },
  { slug: 'english-communicative', name: 'English Communicative', shortName: 'English Comm', currentTopic: 'Literature Reader & Drama', color: 'text-violet-700', bgColor: 'bg-violet-50', borderColor: 'border-violet-200' },
];

export default function LearnHomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isPro, setIsPro] = useState(false);
  const [selectedMode, setSelectedMode] = useState('15min');
  const [loading, setLoading] = useState(true);
  const [testDate, setTestDate] = useState('');
  const [showTestPlanner, setShowTestPlanner] = useState(false);
  const [streak, setStreak] = useState(0);
  const [smartScore, setSmartScore] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [lastQuestionIndex, setLastQuestionIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) {
          router.push('/login?redirect=/learn');
          return;
        }
        setUser(data.user);
        setIsPro(Boolean(data.isPaid || data.user.isPro || data.user.role === 'admin'));
        setLoading(false);
      })
      .catch(() => {
        router.push('/login?redirect=/learn');
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

    // Check if there is an unfinished session to resume
    try {
      const raw = localStorage.getItem('loopedu_reader_progress_science');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.lastQuestionIndex === 'number' && parsed.lastQuestionIndex > 0) {
          setLastQuestionIndex(parsed.lastQuestionIndex);
        }
      }
    } catch (e) {}
  }, [router]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const modeConfig: Record<string, { questions: number; label: string; desc: string }> = {
    '5min': { questions: 2, label: '5 Min', desc: '2 quick questions' },
    '10min': { questions: 3, label: '10 Min', desc: '3 conceptual questions' },
    '15min': { questions: 5, label: '15 Min', desc: '5 full questions' },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Loading your student home...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const firstName = (user.name || 'Learner').split(' ')[0];
  const modeData = modeConfig[selectedMode];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 1. FRIENDLY GREETING AND ONE PRIMARY ACTION */}
      <section className="bg-white border-b border-slate-200 pt-8 pb-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-sm text-slate-500 font-medium mb-1">
                {greeting}, {firstName} 👋
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 leading-tight">
                Ready for your next <span className="text-blue-700">15 minutes?</span>
              </h1>
              <p className="text-sm text-slate-500 mt-1.5">
                Pick a session and start practising. Progress is saved automatically.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {streak > 0 && (
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-bold text-amber-800">{streak} day streak</span>
                </div>
              )}
              {smartScore > 0 && (
                <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-3 py-2 rounded-xl">
                  <Star className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-bold text-blue-800">SmartScore {smartScore}</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            How much time do you have?
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { id: '5min', Icon: Zap, ac: 'bg-amber-500 text-white border-amber-600', ic: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100' },
              { id: '10min', Icon: Timer, ac: 'bg-blue-600 text-white border-blue-700', ic: 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100' },
              { id: '15min', Icon: Target, ac: 'bg-emerald-600 text-white border-emerald-700', ic: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100' },
            ].map(({ id, Icon, ac, ic }) => (
              <button
                key={id}
                onClick={() => setSelectedMode(id)}
                className={
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition ' +
                  (selectedMode === id ? ac : ic)
                }
              >
                <Icon className="w-4 h-4" />
                <span>{modeConfig[id].label}</span>
                <span className="text-xs font-normal opacity-75">— {modeConfig[id].desc}</span>
              </button>
            ))}
          </div>

          {/* Primary Action Button */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={'/study/science?mode=' + selectedMode}
              className="inline-flex items-center gap-3 bg-slate-950 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-2xl text-sm transition shadow-lg group"
            >
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>
                {lastQuestionIndex && lastQuestionIndex > 0
                  ? `Continue question ${lastQuestionIndex + 1} of 10 · Science`
                  : `Start today’s practice — ${modeData.questions} questions · Maths + Science`}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </Link>
            <button
              onClick={() => setShowTestPlanner(!showTestPlanner)}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-4 py-3.5 rounded-2xl border border-slate-300 text-sm transition"
            >
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>My test is on...</span>
            </button>
          </div>

          {/* Calm Upcoming Test Planner */}
          {showTestPlanner && (
            <div className="mt-4 p-5 bg-blue-50 border border-blue-200 rounded-2xl max-w-lg">
              <h3 className="font-bold text-blue-900 text-sm mb-3">📅 Upcoming Test Planner</h3>
              <p className="text-xs text-blue-800 mb-2">
                Choose your exam date. LoopEdu calculates a realistic daily session to keep you calm and on track.
              </p>
              <input
                type="date"
                value={testDate}
                onChange={(e) => setTestDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-blue-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {testDate && (
                <div className="mt-3 p-3 bg-white rounded-xl border border-blue-200 text-xs text-blue-900">
                  <p className="font-bold mb-1">Your Calm Daily Plan:</p>
                  <p>
                    {Math.max(0, Math.ceil((new Date(testDate).getTime() - Date.now()) / 86400000))}{' '}
                    days remaining — completing 5 questions per day covers your required syllabus comfortably without cramming.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Main Content Order */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* 2. MY SUBJECTS */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-700" /> My Subjects
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Current chapters and your active study access
              </p>
            </div>
            <Link
              href="/my-subjects"
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
            >
              View all 8 subjects <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Useful state for Free Access students instead of empty box */}
          {!isPro && (
            <div className="p-3.5 mb-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-blue-900">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  <strong>Your free practice is ready:</strong> 10 questions/subject active this week · Resets in 5 days
                </span>
              </div>
              <Link
                href="/catalogue#pricing"
                className="font-bold text-blue-700 hover:text-blue-900 underline shrink-0"
              >
                Upgrade to Pro →
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SUBJECTS.slice(0, 4).map((sub) => (
              <div
                key={sub.slug}
                className={
                  'rounded-2xl border bg-white p-4 flex items-start gap-3 hover:shadow-md transition ' +
                  sub.borderColor
                }
              >
                <div
                  className={
                    'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ' +
                    sub.bgColor +
                    ' ' +
                    sub.color
                  }
                >
                  {sub.shortName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-sm truncate">{sub.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{sub.currentTopic}</p>
                  <div className="mt-2">
                    {isPro ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Included in your plan
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                        Free practice · 10 questions/wk
                      </span>
                    )}
                  </div>
                </div>
                <Link
                  href={'/study/' + sub.slug}
                  className={
                    'shrink-0 self-center px-3.5 py-1.5 rounded-xl text-xs font-bold transition border ' +
                    (isPro
                      ? 'bg-blue-700 hover:bg-blue-800 text-white border-blue-700'
                      : sub.bgColor + ' ' + sub.color + ' ' + sub.borderColor)
                  }
                >
                  {isPro ? 'Continue' : 'Start'}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 3. YOUR NEXT SMALL WIN (Mistake Revision) */}
        {mistakeCount > 0 ? (
          <div className="p-5 bg-orange-50 border border-orange-200 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="font-bold text-orange-950 text-sm">Your Next Small Win</h2>
                <p className="text-xs text-orange-800 mt-0.5">
                  You’re ready to retry {mistakeCount} question{mistakeCount > 1 ? 's' : ''} you flagged for revision.
                </p>
              </div>
            </div>
            <Link
              href="/study/science?filter=revisit"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Practise again
            </Link>
          </div>
        ) : (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Your Next Small Win:</strong> All past mistakes have been reviewed! Complete your next session to strengthen new topics.
            </span>
          </div>
        )}

        {/* 4. AM I IMPROVING? */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" /> Am I Improving?
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real student progress metrics updated automatically
              </p>
            </div>
            <Link
              href="/progress"
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
            >
              Detailed breakdown <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center shadow-xs">
              <Star className="w-5 h-5 mx-auto mb-1.5 text-blue-700" />
              <p className="text-2xl font-bold text-blue-700">{smartScore > 0 ? smartScore : '—'}</p>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mt-0.5">SmartScore™</p>
              <p className="text-[10px] text-slate-400 mt-0.5">out of 100</p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center shadow-xs">
              <Flame className="w-5 h-5 mx-auto mb-1.5 text-amber-600" />
              <p className="text-2xl font-bold text-amber-700">{streak > 0 ? streak : 0}</p>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mt-0.5">Streak</p>
              <p className="text-[10px] text-slate-400 mt-0.5">consecutive days</p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center shadow-xs">
              <CheckCircle2 className="w-5 h-5 mx-auto mb-1.5 text-emerald-600" />
              <p className="text-2xl font-bold text-emerald-700">{totalAttempted}</p>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mt-0.5">Attempted</p>
              <p className="text-[10px] text-slate-400 mt-0.5">questions total</p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center shadow-xs">
              <AlertCircle className="w-5 h-5 mx-auto mb-1.5 text-orange-600" />
              <p className="text-2xl font-bold text-orange-700">{mistakeCount}</p>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mt-0.5">To Revisit</p>
              <p className="text-[10px] text-slate-400 mt-0.5">flagged questions</p>
            </div>
          </div>
        </section>

        {/* 5. EXPLORE MORE */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-600" /> Explore More
            </h2>
            <Link
              href="/catalogue"
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
            >
              See all subjects <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Everything LoopEdu offers: daily practice sessions, chapter questions, mock tests, and revision queues.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SUBJECTS.slice(4).map((sub) => (
              <Link
                key={sub.slug}
                href={'/study/' + sub.slug}
                className={
                  'rounded-2xl border bg-white p-4 flex flex-col justify-between gap-2 hover:shadow-md transition ' +
                  sub.borderColor
                }
              >
                <div>
                  <div
                    className={
                      'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs mb-2 ' +
                      sub.bgColor +
                      ' ' +
                      sub.color
                    }
                  >
                    {sub.shortName.charAt(0)}
                  </div>
                  <p className="font-bold text-slate-900 text-xs leading-snug">{sub.name}</p>
                </div>
                <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 self-start">
                  Free · 10 Qs/wk
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Subscription Plan Card */}
        {!isPro && (
          <section className="p-6 bg-slate-900 text-white rounded-2xl shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                  Full Board Access
                </span>
                <h2 className="font-bold text-lg mt-1">Unlock All 1,600 CBSE Questions</h2>
                <p className="text-slate-300 text-xs mt-1 leading-relaxed max-w-xl">
                  Get full 200 questions across all 8 subjects, step-by-step marking rubrics, printable 10-year question bank PDFs, and unlimited AI hints at ₹299/mo.
                </p>
              </div>
              <Link
                href="/catalogue#pricing"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs transition shrink-0"
              >
                View Plans <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
