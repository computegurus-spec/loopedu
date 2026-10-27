'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface LiveAIIntelligenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const SAMPLE_QUESTIONS = [
  'Is Maths Standard mandatory for Class 11 PCM in CBSE?',
  'What is the age cutoff and relaxation for NDA 2 2026 for OBC candidates?',
  'Does JEE Main require 75% in 12th board for SC/ST aspirants?',
  'What is the minimum qualification and age limit for IBPS PO 2026?',
  'What are the alternative degree paths if I miss the NEET UG cutoff?',
];

export function LiveAIIntelligenceModal({ isOpen, onClose, initialQuery = '' }: LiveAIIntelligenceModalProps) {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ answer: string; source: string; query: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleSearch(qToRun?: string) {
    const q = (qToRun ?? query).trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/ai/live-intel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to retrieve statutory intelligence.');
      }
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Error connecting to intelligence service.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
              AI
            </div>
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                Live Statutory & Exam Intelligence
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Grounded • Gazette Verified
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Connected to official Information Bulletins, NTA, UPSC, SSC, and CBSE gazette records.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-6 border-b border-slate-800/80 bg-slate-950/40">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSearch();
            }}
            className="relative flex items-center"
          >
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ask any statutory question (e.g. eligibility cutoffs, relaxations, subject rules)..."
              className="w-full bg-slate-800/90 text-white placeholder-slate-400 text-sm pl-4 pr-24 py-3.5 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-2 top-1.5 bottom-1.5 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Querying...</span>
                </>
              ) : (
                <>
                  <span>Verify</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Quick Prompts */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto py-1 scrollbar-none text-xs">
            <span className="text-slate-500 text-[11px] font-medium shrink-0">Popular queries:</span>
            {SAMPLE_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(q);
                  handleSearch(q);
                }}
                className="shrink-0 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition text-[11px]"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-10 h-10 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
              <p className="text-sm font-medium text-slate-300">Retrieving official gazette and curriculum standards...</p>
              <p className="text-xs text-slate-500 max-w-md">
                Cross-checking NTA Information Bulletins, statutory age formulas, and verified reservation circulars.
              </p>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
              <p className="font-semibold mb-1">Query Warning</p>
              <p>{error}</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Grounded Intelligence Response
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Source: {result.source}
                </span>
              </div>

              <div className="prose prose-invert prose-sm max-w-none text-slate-200 leading-relaxed space-y-3">
                {result.answer.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('**') || paragraph.startsWith('#')) {
                    return (
                      <div key={i} className="text-slate-100 font-medium whitespace-pre-line">
                        {paragraph}
                      </div>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <ul key={i} className="list-disc pl-5 space-y-1 text-slate-300">
                        {paragraph.split('\n').map((li, liIdx) => (
                          <li key={liIdx}>{li.replace(/^- /, '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={i} className="text-slate-300 whitespace-pre-line">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Verified against official bulletins. No marketing telecalls.</span>
                <div className="flex items-center gap-3">
                  <Link
                    href="/exams"
                    onClick={onClose}
                    className="text-emerald-400 hover:text-emerald-300 font-medium underline"
                  >
                    Open Full AST Eligibility Checker →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {!result && !loading && !error && (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-slate-200">Search 200+ Indian Exams & Curriculum Frameworks</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Ask about mandatory Class 10/12 subject prerequisites, statutory age cutoffs, reservation relaxations, or unbundled college costs.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
