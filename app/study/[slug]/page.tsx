'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useSearchParams } from 'next/navigation';
import { MathRenderer } from '@/components/MathRenderer';
import { AIHintCoach } from '@/components/study/AIHintCoach';
import { generateWatermark, maskEmail } from '@/lib/utils';
import { SubjectSlug, Question } from '@/types';
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
  Send,
  Loader2,
  Lock,
  ArrowLeft,
  Filter,
} from 'lucide-react';

interface ReaderProps {
  params: {
    slug: string;
  };
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

  // Study progress states
  const [attemptedMap, setAttemptedMap] = useState<Record<string, boolean>>({});
  const [revisitMap, setRevisitMap] = useState<Record<string, boolean>>({});
  const [bookmarkMap, setBookmarkMap] = useState<Record<string, boolean>>({});

  // Error Report Modal
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [reportType, setReportType] = useState('typo');
  const [reportDescription, setReportDescription] = useState('');
  const [reportStatus, setReportStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

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

        setSubjectInfo(qData.subject);
        setIsEntitled(qData.isEntitled || qData.isAdmin);
        setQuestions(qData.questions || []);

        // Fetch study progress
        if (sessData.user) {
          const progRes = await fetch(`/api/reader/${slug}/progress`);
          const progData = await progRes.json();
          if (progData.studyState) {
            setAttemptedMap(progData.studyState.attempted || {});
            setRevisitMap(progData.studyState.needsRevisit || {});
            setBookmarkMap(progData.studyState.bookmarks || {});

            if (initialQ) {
              const foundIdx = qData.questions.findIndex((q: Question) => q.id === initialQ);
              if (foundIdx !== -1) setActiveQuestionIndex(foundIdx);
            } else if (progData.studyState.lastQuestionId) {
              const lastIdx = qData.questions.findIndex(
                (q: Question) => q.id === progData.studyState.lastQuestionId
              );
              if (lastIdx !== -1) setActiveQuestionIndex(lastIdx);
            }
          }
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

  // Topic filter
  const topics = ['All', ...(subjectInfo?.verifiedTopics || [])];
  const filteredQuestions = questions.filter((q) => {
    const matchTopic = selectedTopic === 'All' || q.topic === selectedTopic;
    const matchSearch =
      !searchQuery ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTopic && matchSearch;
  });

  const handleToggleAttempt = async () => {
    if (!currentQ) return;
    const currentStatus = !!attemptedMap[currentQ.id];
    setAttemptedMap((prev) => ({ ...prev, [currentQ.id]: !currentStatus }));

    await fetch(`/api/reader/${slug}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'toggle_attempt', questionId: currentQ.id }),
    });
  };

  const handleToggleRevisit = async () => {
    if (!currentQ) return;
    const currentStatus = !!revisitMap[currentQ.id];
    setRevisitMap((prev) => ({ ...prev, [currentQ.id]: !currentStatus }));

    await fetch(`/api/reader/${slug}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'toggle_revisit', questionId: currentQ.id }),
    });
  };

  const handleToggleBookmark = async () => {
    if (!currentQ) return;
    const currentStatus = !!bookmarkMap[currentQ.id];
    setBookmarkMap((prev) => ({ ...prev, [currentQ.id]: !currentStatus }));

    await fetch(`/api/reader/${slug}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'toggle_bookmark', questionId: currentQ.id }),
    });
  };

  const handleSelectQuestion = async (idx: number) => {
    setActiveQuestionIndex(idx);
    setRevealed(false);

    if (questions[idx]) {
      await fetch(`/api/reader/${slug}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'set_last_studied',
          questionId: questions[idx].id,
        }),
      });
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-forest-700 animate-spin" />
        <p className="text-xs font-semibold text-academic-subtle uppercase tracking-wider">
          Opening protected question reader...
        </p>
      </div>
    );
  }

  const watermarkString = userSession
    ? generateWatermark(userSession.email, userSession.id, slug)
    : 'LoopEdu • Guest Reader License';

  return (
    <div className="relative min-h-screen bg-paper text-forest-900 pb-16">
      {/* Background Watermark Layer for Content-Sharing Deterrence */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.035] select-none flex flex-wrap gap-24 p-12 text-xs font-mono font-bold text-forest-950 -rotate-12"
        aria-hidden="true"
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap">
            {watermarkString}
          </div>
        ))}
      </div>

      {/* Reader Nav & Toolbar */}
      <div className="sticky top-16 z-30 border-b border-academic-border bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/library"
              className="p-1.5 rounded-lg border border-academic-border hover:bg-forest-50 text-forest-800 transition"
              title="Return to Study Library"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="text-[10px] uppercase font-bold text-academic-subtle">
                CBSE 2027 Reader
              </div>
              <h1 className="text-sm font-serif font-bold text-forest-950 truncate max-w-[200px] sm:max-w-md">
                {subjectInfo?.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="hidden sm:inline text-academic-subtle font-mono">
              Question {activeQuestionIndex + 1} of {questions.length}
            </span>

            {!isEntitled && (
              <span className="bg-amber-100 text-amber-950 border border-amber-300 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Sample Preview Mode</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar & Question Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Sidebar: Topics & Question Navigator */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl bg-white border border-academic-border p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-academic-border">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-950">
                Index & Progress
              </span>
              <span className="text-[11px] text-academic-subtle font-mono">
                {Object.keys(attemptedMap).length} Attempted
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-academic-subtle absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search question, keyword, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-academic-border bg-paper-50 focus:bg-white transition"
              />
            </div>

            {/* Topic Filter */}
            <div>
              <label className="block text-[11px] font-bold text-academic-subtle uppercase mb-1">
                Filter by Topic
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-academic-border bg-paper-50 focus:bg-white text-forest-950"
              >
                {topics.map((t, idx) => (
                  <option key={idx} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Questions List */}
            <div className="max-h-[500px] overflow-y-auto space-y-1.5 pr-1">
              {filteredQuestions.map((q) => {
                const globalIndex = questions.findIndex((item) => item.id === q.id);
                const isActive = globalIndex === activeQuestionIndex;
                const isAttempted = !!attemptedMap[q.id];
                const needsRevisit = !!revisitMap[q.id];
                const isBookmarked = !!bookmarkMap[q.id];

                return (
                  <button
                    key={q.id}
                    onClick={() => handleSelectQuestion(globalIndex)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition flex items-center justify-between gap-2 ${
                      isActive
                        ? 'bg-forest-900 text-limeaccent border-forest-900 font-bold'
                        : 'bg-paper-50/60 border-academic-border text-forest-900 hover:bg-forest-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[11px]">{q.id}</span>
                      <span className="truncate">{q.topic}</span>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      {isBookmarked && (
                        <Bookmark className="w-3 h-3 text-amber-500 fill-amber-500" />
                      )}
                      {needsRevisit && (
                        <RotateCcw className="w-3 h-3 text-orange-500" />
                      )}
                      {isAttempted && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Pane: Active Question & Solution Workspace */}
        <div className="lg:col-span-8 space-y-6">
          {currentQ ? (
            <div className="rounded-2xl bg-white border border-academic-border p-6 sm:p-8 shadow-sm space-y-6">
              {/* Question Metadata & Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-academic-border">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs bg-forest-100 text-forest-900 font-bold px-2.5 py-1 rounded-md">
                    {currentQ.id}
                  </span>
                  <span className="text-xs font-semibold text-forest-800">
                    {currentQ.marks} {currentQ.marks === 1 ? 'Mark' : 'Marks'}
                  </span>
                  <span className="text-xs text-academic-subtle">•</span>
                  <span className="text-xs text-academic-subtle font-medium">
                    {currentQ.topic} (Chapter {currentQ.chapter})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleBookmark}
                    className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
                      bookmarkMap[currentQ.id]
                        ? 'bg-amber-50 text-amber-900 border-amber-300'
                        : 'bg-paper-50 border-academic-border text-forest-800 hover:bg-forest-50'
                    }`}
                    title="Bookmark this problem"
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        bookmarkMap[currentQ.id] ? 'fill-amber-500 text-amber-500' : ''
                      }`}
                    />
                    <span className="hidden sm:inline">Bookmark</span>
                  </button>

                  <button
                    onClick={handleToggleRevisit}
                    className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
                      revisitMap[currentQ.id]
                        ? 'bg-orange-50 text-orange-900 border-orange-300'
                        : 'bg-paper-50 border-academic-border text-forest-800 hover:bg-forest-50'
                    }`}
                    title="Flag to revisit in Mistake Comeback"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Needs Revisit</span>
                  </button>

                  <button
                    onClick={handleToggleAttempt}
                    className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
                      attemptedMap[currentQ.id]
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                        : 'bg-paper-50 border-academic-border text-forest-800 hover:bg-forest-50'
                    }`}
                    title="Mark as attempted"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline">
                      {attemptedMap[currentQ.id] ? 'Attempted' : 'Mark Attempted'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-4">
                <div className="text-base sm:text-xl font-serif text-forest-950 leading-relaxed bg-paper-50/80 p-6 rounded-2xl border border-academic-border">
                  <MathRenderer content={currentQ.question} />
                </div>

                {/* AI Hint Coach (Intelligent hints without spoiling answer) */}
                <AIHintCoach
                  question={currentQ.question}
                  topic={currentQ.topic}
                  explanation={currentQ.explanation}
                  source={currentQ.source}
                />
              </div>

              {/* Answer & Explanation Reveal */}
              <div className="pt-2 space-y-4">
                <button
                  onClick={() => setRevealed(!revealed)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
                >
                  {revealed ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span>Hide Model Answer</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>Reveal Model Answer & Method Explanation</span>
                    </>
                  )}
                </button>

                {revealed && (
                  <div className="p-6 rounded-2xl bg-forest-950 text-white space-y-5 animate-in fade-in">
                    <div>
                      <div className="text-xs font-bold text-limeaccent uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Model Answer</span>
                      </div>
                      <div className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                        <MathRenderer content={currentQ.answer} />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-forest-800/80 space-y-1">
                      <div className="text-xs font-bold text-forest-300 uppercase tracking-wider">
                        Method & Rationale
                      </div>
                      <div className="text-xs sm:text-sm text-forest-200 leading-relaxed">
                        <MathRenderer content={currentQ.explanation} />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-forest-800/60 flex items-center justify-between text-[11px] text-forest-400">
                      <span>Curriculum alignment: {currentQ.source}</span>
                      <button
                        onClick={() => setErrorModalOpen(true)}
                        className="text-forest-400 hover:text-white underline flex items-center gap-1"
                      >
                        <AlertTriangle className="w-3 h-3" />
                        <span>Report typo or content issue</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Previous / Next Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-academic-border">
                <button
                  onClick={() => handleSelectQuestion(Math.max(0, activeQuestionIndex - 1))}
                  disabled={activeQuestionIndex === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-academic-border text-xs font-bold text-forest-900 hover:bg-paper-100 disabled:opacity-30 disabled:pointer-events-none transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="text-xs text-academic-subtle font-mono">
                  {currentQ.priority_band} • Priority Score: {currentQ.priority_score}
                </div>

                <button
                  onClick={() =>
                    handleSelectQuestion(
                      Math.min(questions.length - 1, activeQuestionIndex + 1)
                    )
                  }
                  disabled={activeQuestionIndex === questions.length - 1}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-900 text-limeaccent text-xs font-bold hover:bg-forest-800 disabled:opacity-30 disabled:pointer-events-none transition shadow-sm"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white rounded-2xl border border-academic-border text-center">
              No matching questions found for this topic filter.
            </div>
          )}
        </div>
      </div>

      {/* Content Error Report Modal */}
      {errorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white border border-academic-border p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-academic-border pb-3">
              <h3 className="font-serif font-bold text-forest-950 text-base">
                Report Content Issue ({currentQ?.id})
              </h3>
              <button
                onClick={() => setErrorModalOpen(false)}
                className="text-academic-subtle hover:text-forest-950 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitErrorReport} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-forest-900 mb-1">
                  Issue Classification
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-academic-border bg-paper-50"
                >
                  <option value="typo">Typographical error</option>
                  <option value="incorrect_answer">Question or answer inaccuracy</option>
                  <option value="unclear_explanation">Explanation unclear</option>
                  <option value="formatting_issue">Math formula formatting issue</option>
                  <option value="other">Other feedback</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-forest-900 mb-1">
                  Description of Issue
                </label>
                <textarea
                  rows={3}
                  required
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Explain what needs correction in this question or model explanation..."
                  className="w-full p-2.5 rounded-lg border border-academic-border bg-paper-50"
                />
              </div>

              {reportStatus === 'success' && (
                <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg text-xs">
                  Thank you. Your report has been dispatched to the editorial review team.
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setErrorModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-academic-border text-academic-subtle hover:text-forest-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={reportStatus === 'submitting'}
                  className="px-4 py-2 rounded-lg bg-forest-900 text-limeaccent font-bold hover:bg-forest-800 disabled:opacity-50"
                >
                  {reportStatus === 'submitting' ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
