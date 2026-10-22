'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { notFound, useSearchParams } from 'next/navigation';
import { MathRenderer } from '@/components/MathRenderer';
import { AIHintCoach } from '@/components/study/AIHintCoach';
import { SocraticTutorWidget } from '@/components/study/SocraticTutorWidget';
import { FeynmanEvaluatorModal } from '@/components/study/FeynmanEvaluatorModal';
import { generateWatermark } from '@/lib/utils';
import { SubjectSlug, Question, StudentAchievement } from '@/types';
import { TrialMilestoneModal } from '@/components/study/TrialMilestoneModal';
import {
  BookOpen,
  Bookmark,
  CheckCircle2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Search,
  AlertTriangle,
  Loader2,
  ArrowLeft,
  Filter,
  Sparkles,
  Check,
  Clock,
  ListOrdered,
  Mic,
} from 'lucide-react';

interface ReaderProps {
  params: {
    slug: string;
  };
}

interface LocalStudyProgress {
  attempted?: Record<string, boolean>;
  needsRevisit?: Record<string, boolean>;
  bookmarks?: Record<string, boolean>;
  lastQuestionIndex?: number;
  lastQuestionId?: string;
  updatedAt?: number;
}

const STORAGE_PREFIX = 'loopedu_reader_progress_';

function getStoredProgress(slug: string): LocalStudyProgress {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${slug}`);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    return {};
  }
}

function updateStoredProgress(slug: string, patch: Partial<LocalStudyProgress>) {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredProgress(slug);
    const updated: LocalStudyProgress = {
      ...current,
      ...patch,
      attempted: { ...(current.attempted || {}), ...(patch.attempted || {}) },
      needsRevisit: { ...(current.needsRevisit || {}), ...(patch.needsRevisit || {}) },
      bookmarks: { ...(current.bookmarks || {}), ...(patch.bookmarks || {}) },
      updatedAt: Date.now(),
    };
    localStorage.setItem(`${STORAGE_PREFIX}${slug}`, JSON.stringify(updated));
  } catch (err) {
    console.warn('[LocalStorage] Study progress sync warning:', err);
  }
}

function cleanQuestionSnippet(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/\$\$[\s\S]*?\$\$/g, ' [Formula] ')
    .replace(/\$[^\$]+?\$/g, ' [Math] ')
    .replace(/\\(frac|sqrt|pm|alpha|beta|theta)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function StudyReaderPage({ params }: ReaderProps) {
  const slug = params.slug as SubjectSlug;
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q');

  const [loading, setLoading] = useState(true);
  const [subjectInfo, setSubjectInfo] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [isEntitled, setIsEntitled] = useState(false);
  const [userSession, setUserSession] = useState<any>(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'attempted' | 'revisit' | 'bookmarked'>('all');

  // Study progress states (instant localStorage fallback + server sync)
  const [attemptedMap, setAttemptedMap] = useState<Record<string, boolean>>({});
  const [revisitMap, setRevisitMap] = useState<Record<string, boolean>>({});
  const [bookmarkMap, setBookmarkMap] = useState<Record<string, boolean>>({});

  // Error Report Modal
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [reportType, setReportType] = useState('typo');
  const [reportDescription, setReportDescription] = useState('');
  const [reportStatus, setReportStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Trial Milestone Modal
  const [trialModalOpen, setTrialModalOpen] = useState(false);

  // Feynman Concept Defense Modal
  const [feynmanOpen, setFeynmanOpen] = useState(false);

  // IXL HUD Live States
  const [timeElapsedSeconds, setTimeElapsedSeconds] = useState(0);
  const [latestAchievement, setLatestAchievement] = useState<StudentAchievement | null>(null);

  // Active session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsedSeconds((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 1. Initial immediate restoration from localStorage (instant 0-ms UI feedback)
  useEffect(() => {
    const cached = getStoredProgress(slug);
    if (cached.attempted) setAttemptedMap(cached.attempted);
    if (cached.needsRevisit) setRevisitMap(cached.needsRevisit);
    if (cached.bookmarks) setBookmarkMap(cached.bookmarks);
    if (typeof cached.lastQuestionIndex === 'number' && !initialQ) {
      setActiveQuestionIndex(cached.lastQuestionIndex);
    }
  }, [slug, initialQ]);

  // 2. Fetch full question bank & reconcile with server study state
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Fetch session
        const sessRes = await fetch('/api/auth/session');
        const sessData = await sessRes.json();
        setUserSession(sessData.user);

        // Fetch questions
        const qRes = await fetch(`/api/reader/${slug}/questions?limit=200`);
        const qData = await qRes.json();

        if (qRes.status === 404) {
          notFound();
        }

        const loadedQuestions: Question[] = qData.questions || [];
        setSubjectInfo(qData.subject);
        setIsEntitled(qData.isEntitled || qData.isAdmin);
        setQuestions(loadedQuestions);

        // Fetch study progress (Both authenticated AND guest/trial users)
        const progRes = await fetch(`/api/reader/${slug}/progress`);
        const progData = await progRes.json();
        const serverState = progData?.studyState;

        // Merge local storage with server state to guarantee zero data loss
        const cached = getStoredProgress(slug);
        const mergedAttempted = { ...(cached.attempted || {}), ...(serverState?.attempted || {}) };
        const mergedRevisit = { ...(cached.needsRevisit || {}), ...(serverState?.needsRevisit || {}) };
        const mergedBookmarks = { ...(cached.bookmarks || {}), ...(serverState?.bookmarks || {}) };

        setAttemptedMap(mergedAttempted);
        setRevisitMap(mergedRevisit);
        setBookmarkMap(mergedBookmarks);

        // Update localStorage with reconciled state
        updateStoredProgress(slug, {
          attempted: mergedAttempted,
          needsRevisit: mergedRevisit,
          bookmarks: mergedBookmarks,
        });

        // Determine starting active question
        if (initialQ) {
          const foundIdx = loadedQuestions.findIndex((q: Question) => q.id === initialQ);
          if (foundIdx !== -1) setActiveQuestionIndex(foundIdx);
        } else if (cached.lastQuestionIndex !== undefined && cached.lastQuestionIndex < loadedQuestions.length) {
          setActiveQuestionIndex(cached.lastQuestionIndex);
        } else if (serverState?.lastQuestionId) {
          const lastIdx = loadedQuestions.findIndex(
            (q: Question) => q.id === serverState.lastQuestionId
          );
          if (lastIdx !== -1) setActiveQuestionIndex(lastIdx);
        }
      } catch (err) {
        console.error('Failed to load reader questions:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [slug, initialQ]);

  const currentQ = questions[activeQuestionIndex];

  // Topics available in loaded questions
  const availableTopics = useMemo(() => {
    const list = Array.from(new Set(questions.map((q) => q.topic))).filter(Boolean);
    return ['All', ...list];
  }, [questions]);

  // Filtered Questions with Search, Topic, and Status Filters
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchTopic = selectedTopic === 'All' || q.topic === selectedTopic;
      const matchSearch =
        !searchQuery ||
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.topic.toLowerCase().includes(searchQuery.toLowerCase());

      const isAttempted = !!attemptedMap[q.id];
      const needsRevisit = !!revisitMap[q.id];
      const isBookmarked = !!bookmarkMap[q.id];

      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'attempted' && isAttempted) ||
        (statusFilter === 'revisit' && needsRevisit) ||
        (statusFilter === 'bookmarked' && isBookmarked);

      return matchTopic && matchSearch && matchStatus;
    });
  }, [questions, selectedTopic, searchQuery, statusFilter, attemptedMap, revisitMap, bookmarkMap]);

  // Aggregate stats for progress calculation
  const stats = useMemo(() => {
    const attemptedCount = questions.filter((q) => attemptedMap[q.id]).length;
    const revisitCount = questions.filter((q) => revisitMap[q.id]).length;
    const bookmarkCount = questions.filter((q) => bookmarkMap[q.id]).length;
    const total = questions.length || 1;
    const percent = Math.min(100, Math.round((attemptedCount / total) * 100));

    return {
      attemptedCount,
      revisitCount,
      bookmarkCount,
      total,
      percent,
    };
  }, [questions, attemptedMap, revisitMap, bookmarkMap]);

  // Dynamic IXL-style SmartScore (0 - 100)
  const smartScore = useMemo(() => {
    const attempted = questions.filter((q) => attemptedMap[q.id]).length;
    const revisit = questions.filter((q) => revisitMap[q.id]).length;
    if (attempted === 0) return 0;
    const raw = attempted * 12 - revisit * 4;
    return Math.max(0, Math.min(100, raw));
  }, [questions, attemptedMap, revisitMap]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  // Action: Toggle Attempted
  const handleToggleAttempt = async () => {
    if (!currentQ) return;
    const nextVal = !attemptedMap[currentQ.id];
    const updated = { ...attemptedMap, [currentQ.id]: nextVal };
    setAttemptedMap(updated);
    updateStoredProgress(slug, { attempted: updated });

    try {
      await fetch(`/api/reader/${slug}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_attempt', questionId: currentQ.id }),
      });

      // Record student action for achievements & persistent Supabase stats
      if (nextVal) {
        fetch('/api/student/action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action_type: 'QUESTION_ATTEMPT',
            subject_slug: slug,
            question_id: currentQ.id,
            smart_score: smartScore,
            time_spent_seconds: timeElapsedSeconds,
            metadata: { is_revisit: !!revisitMap[currentQ.id] },
          }),
        })
          .then((r) => r.json())
          .then((data) => {
            if (data.newAchievements?.length > 0) {
              setLatestAchievement(data.newAchievements[0]);
              setTimeout(() => setLatestAchievement(null), 5000);
            }
          })
          .catch(() => {});
      }
    } catch (e) {
      console.warn('Background sync failed; saved locally');
    }
  };

  // Action: Toggle Needs Revisit
  const handleToggleRevisit = async () => {
    if (!currentQ) return;
    const nextVal = !revisitMap[currentQ.id];
    const updated = { ...revisitMap, [currentQ.id]: nextVal };
    setRevisitMap(updated);
    updateStoredProgress(slug, { needsRevisit: updated });

    try {
      await fetch(`/api/reader/${slug}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_revisit', questionId: currentQ.id }),
      });
    } catch (e) {
      console.warn('Background sync failed; saved locally');
    }
  };

  // Action: Toggle Bookmark
  const handleToggleBookmark = async () => {
    if (!currentQ) return;
    const nextVal = !bookmarkMap[currentQ.id];
    const updated = { ...bookmarkMap, [currentQ.id]: nextVal };
    setBookmarkMap(updated);
    updateStoredProgress(slug, { bookmarks: updated });

    try {
      await fetch(`/api/reader/${slug}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_bookmark', questionId: currentQ.id }),
      });
    } catch (e) {
      console.warn('Background sync failed; saved locally');
    }
  };

  // Action: Select Question
  const handleSelectQuestion = (idx: number) => {
    if (idx < 0 || idx >= questions.length) return;
    setActiveQuestionIndex(idx);
    setRevealed(false);

    const targetQ = questions[idx];
    updateStoredProgress(slug, { lastQuestionIndex: idx, lastQuestionId: targetQ?.id });

    if (targetQ) {
      fetch(`/api/reader/${slug}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'set_last_studied',
          questionId: targetQ.id,
        }),
      }).catch(() => {});
    }
  };

  const handleSubmitErrorReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportDescription.trim()) return;

    setReportStatus('submitting');
    try {
      await fetch('/api/reader/report-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentQ?.id,
          subjectSlug: slug,
          reportType,
          description: reportDescription,
        }),
      });
      setReportStatus('success');
      setTimeout(() => {
        setErrorModalOpen(false);
        setReportStatus('idle');
        setReportDescription('');
      }, 1500);
    } catch (err) {
      setReportStatus('idle');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 bg-slate-50">
        <Loader2 className="w-9 h-9 text-forest-700 animate-spin" />
        <p className="text-xs font-bold text-slate-700 uppercase tracking-widest">
          Loading High-Yield Question Bank...
        </p>
      </div>
    );
  }

  // Mandatory Login Gate (Even for free practice, an account is required so data is stored in Supabase)
  if (!userSession) {
    return (
      <div className="min-h-[82vh] flex items-center justify-center px-4 py-12 bg-paper-50/50">
        <div className="w-full max-w-lg bg-white rounded-3xl border border-academic-border p-8 sm:p-10 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-forest-900 text-limeaccent flex items-center justify-center font-serif font-bold text-3xl mx-auto shadow-sm">
            L
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-forest-700 bg-limeaccent/30 px-3 py-1 rounded-full">
              Student Login Required
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950">
              Sign In to Practice {subjectInfo?.name || 'CBSE Class 10'}
            </h2>
            <p className="text-xs sm:text-sm text-academic-subtle max-w-md mx-auto leading-relaxed">
              Logging in ensures your cognitive telemetry, mistake comeback queue, SmartScore™, and Socratic inquiry logs are saved to your account.
            </p>
          </div>

          <div className="rounded-2xl bg-paper-50 border border-academic-border p-4 text-left space-y-2.5 text-xs">
            <div className="flex items-center gap-2.5 font-bold text-forest-950">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Free Practice Sprint Unlocked</span>
            </div>
            <div className="flex items-center gap-2.5 font-bold text-forest-950">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero Data Loss — All Scores &amp; Mistake Queues Saved to Your Account</span>
            </div>
            <div className="flex items-center gap-2.5 font-bold text-forest-950">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Autonomous Socratic Pedagogical Inquiries Included Daily</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href={`/login?redirect=/study/${slug}`}
              className="w-full inline-flex items-center justify-center gap-2 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
            >
              <span>Sign In or Create Free Account →</span>
            </Link>
            <p className="text-[11px] text-academic-subtle">
              Already registered? Enter your password. First time? Automatically converts to sign up!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const watermarkString = userSession
    ? generateWatermark(userSession.email, userSession.id, slug)
    : 'LoopEdu • Official CBSE 2027 Practice License';

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Achievement Unlock Toast Notification */}
      {latestAchievement && (
        <div className="fixed top-20 right-6 z-50 animate-bounce">
          <div className="bg-forest-900 text-white rounded-2xl p-4 shadow-xl border border-limeaccent flex items-center gap-3.5 max-w-sm">
            <div className="text-3xl shrink-0">{latestAchievement.icon}</div>
            <div>
              <div className="text-[10px] font-mono uppercase font-bold text-limeaccent tracking-wider">
                Achievement Unlocked!
              </div>
              <div className="text-xs font-bold text-white">{latestAchievement.title}</div>
              <div className="text-[11px] text-academic-subtle mt-0.5 leading-snug">
                {latestAchievement.description}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discreet Security Watermark */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.012] select-none flex flex-wrap gap-28 p-12 text-xs font-mono font-bold text-slate-950 -rotate-12"
        aria-hidden="true"
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap">
            {watermarkString}
          </div>
        ))}
      </div>

      {/* Reader Nav & Toolbar */}
      <div className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/library"
              className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 transition"
              title="Return to Study Library"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                CBSE 2027 Question Reader
              </div>
              <h1 className="text-sm sm:text-base font-bold text-slate-950 truncate max-w-[200px] sm:max-w-md">
                {subjectInfo?.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="hidden sm:inline text-slate-600 font-mono font-semibold">
              Question {activeQuestionIndex + 1} of {questions.length}
            </span>

            {!isEntitled && (
              <button
                onClick={() => setTrialModalOpen(true)}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-2xs"
                title="Click to view your free weekly sprint milestone"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>
                  Free Practice · {questions.length > 0 ? `Q ${activeQuestionIndex + 1} of ${Math.min(10, questions.length)}` : '10 Qs'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* IXL-Inspired Real-Time Study HUD */}
      <div className="sticky top-[7.5rem] z-20 bg-paper-100/95 backdrop-blur-sm border-b border-academic-border px-4 py-2 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Questions Answered */}
            <div className="flex items-center gap-1.5 font-bold text-forest-950">
              <span className="text-academic-subtle font-medium uppercase tracking-wider text-[10px]">Questions:</span>
              <span className="font-mono text-xs font-bold bg-white px-2 py-0.5 rounded-md border border-academic-border shadow-2xs">
                {stats.attemptedCount} / {isEntitled ? questions.length : Math.min(10, questions.length)}
              </span>
            </div>

            {/* Time Elapsed */}
            <div className="flex items-center gap-1.5 font-bold text-forest-950">
              <Clock className="w-3.5 h-3.5 text-forest-700" />
              <span className="text-academic-subtle font-medium uppercase tracking-wider text-[10px]">Time:</span>
              <span className="font-mono text-xs font-bold bg-white px-2 py-0.5 rounded-md border border-academic-border shadow-2xs">
                {formatTimer(timeElapsedSeconds)}
              </span>
            </div>
          </div>

          {/* SmartScore (0 to 100) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-forest-900 text-limeaccent px-3 py-1 rounded-xl shadow-xs font-mono font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-limeaccent" />
              <span>SmartScore™</span>
              <span className="text-xs bg-forest-800 px-1.5 py-0.2 rounded border border-forest-700">
                {smartScore}
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border bg-white text-forest-900 border-academic-border hidden sm:inline">
              {smartScore >= 90
                ? '🏆 Board Mastery'
                : smartScore >= 70
                ? '🌟 Proficient'
                : smartScore >= 50
                ? '⚡ Progressing'
                : '🎯 Exploring'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar & Question Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Sidebar: Index & Progress Navigator */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm space-y-4">
            {/* Header & Visual Progress Bar */}
            <div className="space-y-2.5 pb-3 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Index & Progress
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  {stats.attemptedCount} / {stats.total} Attempted ({stats.percent}%)
                </span>
              </div>

              {/* Visual Progress Bar */}
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                  style={{ width: `${Math.max(stats.percent, stats.attemptedCount > 0 ? 5 : 0)}%` }}
                />
              </div>
            </div>

            {/* Status Filter Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-[11px] font-bold">
              <button
                onClick={() => setStatusFilter('all')}
                className={`py-1.5 rounded-lg transition text-center ${
                  statusFilter === 'all'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({questions.length})
              </button>
              <button
                onClick={() => setStatusFilter('attempted')}
                className={`py-1.5 rounded-lg transition text-center flex items-center justify-center gap-1 ${
                  statusFilter === 'attempted'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                <Check className="w-3 h-3" />
                <span>({stats.attemptedCount})</span>
              </button>
              <button
                onClick={() => setStatusFilter('revisit')}
                className={`py-1.5 rounded-lg transition text-center flex items-center justify-center gap-1 ${
                  statusFilter === 'revisit'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-orange-700'
                }`}
              >
                <RotateCcw className="w-3 h-3" />
                <span>({stats.revisitCount})</span>
              </button>
              <button
                onClick={() => setStatusFilter('bookmarked')}
                className={`py-1.5 rounded-lg transition text-center flex items-center justify-center gap-1 ${
                  statusFilter === 'bookmarked'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-amber-700'
                }`}
              >
                <Bookmark className="w-3 h-3" />
                <span>({stats.bookmarkCount})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search question keywords or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
              />
            </div>

            {/* Topic Filter */}
            {availableTopics.length > 2 && (
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Filter by Topic
                </label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {availableTopics.map((t, idx) => (
                    <option key={idx} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Questions List */}
            <div className="max-h-[500px] overflow-y-auto space-y-2 pr-1">
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500 font-medium">
                  No questions match your current filter.
                </div>
              ) : (
                filteredQuestions.map((q) => {
                  const globalIndex = questions.findIndex((item) => item.id === q.id);
                  const isActive = globalIndex === activeQuestionIndex;
                  const isAttempted = !!attemptedMap[q.id];
                  const needsRevisit = !!revisitMap[q.id];
                  const isBookmarked = !!bookmarkMap[q.id];
                  const snippet = cleanQuestionSnippet(q.question);

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleSelectQuestion(globalIndex)}
                      className={`w-full text-left p-3 rounded-xl border transition flex flex-col gap-1.5 ${
                        isActive
                          ? 'bg-slate-950 text-white border-2 border-emerald-500 shadow-md ring-1 ring-emerald-500/20'
                          : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 truncate">
                          <span
                            className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                              isActive
                                ? 'bg-emerald-500 text-slate-950'
                                : 'bg-slate-100 text-slate-800 border border-slate-200'
                            }`}
                          >
                            Q{globalIndex + 1}
                          </span>
                          <span
                            className={`text-xs font-bold truncate ${
                              isActive ? 'text-emerald-300' : 'text-slate-900'
                            }`}
                          >
                            {q.topic}
                          </span>
                          <span
                            className={`text-[10px] font-semibold ${
                              isActive ? 'text-slate-300' : 'text-slate-500'
                            }`}
                          >
                            • {q.marks}M
                          </span>
                        </div>

                        {/* Status Badges */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {isBookmarked && (
                            <span
                              title="Bookmarked"
                              className="p-0.5 rounded bg-amber-100 text-amber-700 border border-amber-300"
                            >
                              <Bookmark className="w-3 h-3 fill-amber-500 text-amber-600" />
                            </span>
                          )}
                          {needsRevisit && (
                            <span
                              title="Flagged to Revisit"
                              className="p-0.5 rounded bg-orange-100 text-orange-700 border border-orange-300"
                            >
                              <RotateCcw className="w-3 h-3 text-orange-600" />
                            </span>
                          )}
                          {isAttempted && (
                            <span
                              title="Completed / Solved"
                              className="p-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300"
                            >
                              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Text Snippet for Quick Identification */}
                      <p
                        className={`text-[11px] line-clamp-2 leading-relaxed ${
                          isActive ? 'text-slate-200 font-normal' : 'text-slate-600 font-normal'
                        }`}
                      >
                        {snippet.length > 70 ? snippet.slice(0, 70) + '...' : snippet}
                      </p>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </aside>

        {/* Right Pane: Active Question & Solution Workspace */}
        <div className="lg:col-span-8 space-y-6">
          {currentQ ? (
            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              {/* Question Metadata & Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs bg-slate-900 text-white font-bold px-2.5 py-1 rounded-md">
                    {currentQ.id}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    {currentQ.marks} {currentQ.marks === 1 ? 'Mark' : 'Marks'}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-700 font-semibold">
                    {currentQ.topic} (Chapter {currentQ.chapter})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Bookmark Toggle */}
                  <button
                    onClick={handleToggleBookmark}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
                      bookmarkMap[currentQ.id]
                        ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                    title="Bookmark this problem"
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        bookmarkMap[currentQ.id] ? 'fill-white text-white' : 'text-amber-500'
                      }`}
                    />
                    <span className="hidden sm:inline">Bookmark</span>
                  </button>

                  {/* Needs Revisit Toggle */}
                  <button
                    onClick={handleToggleRevisit}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
                      revisitMap[currentQ.id]
                        ? 'bg-orange-600 text-white border-orange-700 shadow-xs'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                    title="Flag to revisit in Mistake Comeback"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Needs Revisit</span>
                  </button>

                  {/* Attempted Toggle */}
                  <button
                    onClick={handleToggleAttempt}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition ${
                      attemptedMap[currentQ.id]
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                    title="Mark as attempted"
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${
                        attemptedMap[currentQ.id] ? 'text-white' : 'text-emerald-600'
                      }`}
                    />
                    <span>{attemptedMap[currentQ.id] ? 'Attempted' : 'Mark Attempted'}</span>
                  </button>
                </div>
              </div>

              {/* Question Text Box (Crystal-Clear High Contrast) */}
              <div className="space-y-4">
                <div className="text-lg sm:text-xl font-medium text-slate-950 leading-relaxed bg-slate-50/80 p-6 sm:p-7 rounded-2xl border-2 border-slate-200 shadow-2xs">
                  <MathRenderer content={currentQ.question} />
                </div>

                {/* AI Hint Coach (Socratic guidance without spoiling answer) */}
                <AIHintCoach
                  question={currentQ.question}
                  topic={currentQ.topic}
                  explanation={currentQ.explanation}
                  source={currentQ.source}
                />
              </div>

              {/* Answer & Explanation Reveal */}
              <div className="pt-2 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setRevealed(!revealed)}
                    className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
                  >
                    {revealed ? (
                      <>
                        <EyeOff className="w-4 h-4 text-emerald-400" />
                        <span>Hide Model Answer</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 text-emerald-400" />
                        <span>Reveal Model Answer & Rubric</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setFeynmanOpen(true)}
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
                    title="Defend this concept aloud or in writing to test true understanding"
                  >
                    <Mic className="w-4 h-4 text-white" />
                    <span>Feynman Concept Defense →</span>
                  </button>
                </div>

                {revealed && (
                  <div className="p-6 sm:p-7 rounded-2xl bg-[#0F172A] border border-slate-800 text-white space-y-6 shadow-xl animate-in fade-in">
                    {/* Model Answer */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Official Model Answer</span>
                      </div>
                      <div className="text-base sm:text-lg font-semibold text-white leading-relaxed pl-1">
                        <MathRenderer content={currentQ.answer} />
                      </div>
                    </div>

                    {/* Method & Rationale */}
                    <div className="pt-4 border-t border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-emerald-300" />
                        <span>CBSE Marking Scheme & Method Rationale</span>
                      </div>
                      <div className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal pl-1">
                        <MathRenderer content={currentQ.explanation} />
                      </div>
                    </div>

                    {/* Curriculum alignment & Error report button */}
                    <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                      <span>Curriculum alignment: {currentQ.source}</span>
                      <button
                        onClick={() => setErrorModalOpen(true)}
                        className="text-slate-400 hover:text-white underline flex items-center gap-1 transition"
                      >
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Report typo or content issue</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Previous / Next Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <button
                  onClick={() => handleSelectQuestion(Math.max(0, activeQuestionIndex - 1))}
                  disabled={activeQuestionIndex === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="text-xs text-slate-500 font-mono font-semibold">
                  {currentQ.priority_band} • Score: {currentQ.priority_score}
                </div>

                {!isEntitled && activeQuestionIndex === questions.length - 1 ? (
                  <button
                    onClick={() => setTrialModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition shadow-md animate-pulse"
                  >
                    <span>Complete Sprint</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleSelectQuestion(
                        Math.min(questions.length - 1, activeQuestionIndex + 1)
                      )
                    }
                    disabled={activeQuestionIndex === questions.length - 1}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition shadow-sm"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">No Questions Available</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {selectedTopic !== 'All' || statusFilter !== 'all' || searchQuery
                    ? 'No questions matched your current filters. Clear your filters to continue.'
                    : 'We could not load the question bank for this subject right now. Please try again or return home.'}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {(selectedTopic !== 'All' || statusFilter !== 'all' || searchQuery) ? (
                  <button
                    onClick={() => {
                      setSelectedTopic('All');
                      setStatusFilter('all');
                      setSearchQuery('');
                    }}
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                ) : (
                  <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retry Loading</span>
                  </button>
                )}
                <Link
                  href="/learn"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-xl border border-slate-300 text-xs transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Student Home</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Error Report Modal */}
      {errorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-950 text-base">
                Report Content Issue ({currentQ?.id})
              </h3>
              <button
                onClick={() => setErrorModalOpen(false)}
                className="text-slate-400 hover:text-slate-900 text-xs font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitErrorReport} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Issue Classification
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900"
                >
                  <option value="typo">Typographical error</option>
                  <option value="incorrect_answer">Question or answer inaccuracy</option>
                  <option value="unclear_explanation">Explanation unclear</option>
                  <option value="formatting_issue">Math formula formatting issue</option>
                  <option value="other">Other feedback</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Description of Issue
                </label>
                <textarea
                  rows={3}
                  required
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Explain what needs correction in this question or model explanation..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900"
                />
              </div>

              {reportStatus === 'success' && (
                <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg text-xs font-semibold">
                  Thank you. Your report has been dispatched to the editorial review team.
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setErrorModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={reportStatus === 'submitting'}
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white font-bold hover:bg-slate-800 disabled:opacity-50"
                >
                  {reportStatus === 'submitting' ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 10-Question Trial Milestone Modal */}
      <TrialMilestoneModal
        isOpen={trialModalOpen}
        onClose={() => setTrialModalOpen(false)}
        subjectSlug={slug}
        subjectName={subjectInfo?.name || 'Subject Track'}
        score={Math.max(1, stats.attemptedCount)}
        totalAttempted={Math.min(10, questions.length || 10)}
        studentName={userSession?.name || 'Class 10 Learner'}
      />

      {/* Socratic Reasoning Partner Widget */}
      <SocraticTutorWidget
        topic={currentQ?.topic || 'General Practice'}
        subjectName={subjectInfo?.name || 'Academic Standard'}
        subjectSlug={slug}
        questionContext={currentQ?.question || ''}
      />

      {/* Feynman Conceptual Defense Modal */}
      <FeynmanEvaluatorModal
        isOpen={feynmanOpen}
        onClose={() => setFeynmanOpen(false)}
        question={currentQ?.question || ''}
        topic={currentQ?.topic || 'General Practice'}
        subjectName={subjectInfo?.name || 'Academic Standard'}
        referenceExplanation={currentQ?.explanation || ''}
      />
    </div>
  );
}
