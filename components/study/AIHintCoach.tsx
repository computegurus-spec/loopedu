'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  HelpCircle,
  Lightbulb,
  Compass,
  Layers,
  HelpCircle as QuestionIcon,
  RotateCw,
  AlertCircle,
  Send,
  Loader2,
  Check,
} from 'lucide-react';
import { MathRenderer } from '../MathRenderer';

interface AIHintCoachProps {
  question: string;
  topic: string;
  explanation: string;
  source: string;
  onReportIssue?: () => void;
}

export const AIHintCoach: React.FC<AIHintCoachProps> = ({
  question,
  topic,
  explanation,
  source,
  onReportIssue,
}) => {
  const [activeTab, setActiveTab] = useState<
    'xray' | 'hint' | 'simple' | 'steps' | 'why_wrong' | 'another_way' | 'custom' | null
  >('xray');
  const [customQuery, setCustomQuery] = useState('');
  const [customResponse, setCustomResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState<Record<string, string>>({});

  const fetchCoachAction = async (action: 'xray' | 'hint' | 'simple' | 'steps' | 'why_wrong' | 'another_way' | 'ask', qText?: string) => {
    const cacheKey = action === 'ask' ? `ask_${qText}` : action;
    if (cache[cacheKey]) return;

    setLoading(true);
    try {
      const res = await fetch('/api/ai/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          topic,
          source,
          explanation,
          action,
          userQuery: qText,
        }),
      });
      const data = await res.json();
      if (data.text) {
        setCache((prev) => ({ ...prev, [cacheKey]: data.text }));
        if (action === 'ask') {
          setCustomResponse(data.text);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTab = (tab: 'xray' | 'hint' | 'simple' | 'steps' | 'why_wrong' | 'another_way') => {
    if (activeTab === tab) {
      setActiveTab(null);
    } else {
      setActiveTab(tab);
      fetchCoachAction(tab);
    }
  };

  const handleAskCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim() || loading) return;
    setActiveTab('custom');
    fetchCoachAction('ask', customQuery);
  };

  return (
    <div className="rounded-2xl border border-forest-200/90 bg-forest-50/50 p-4 sm:p-5 space-y-3.5 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-forest-100 pb-3">
        <div className="flex items-center gap-2 font-bold text-forest-950">
          <div className="w-6 h-6 rounded-md bg-forest-900 text-limeaccent flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-serif">NCERT-Grounded AI Study Coach</span>
          <span className="text-[10px] bg-forest-200 text-forest-900 px-2 py-0.5 rounded font-mono font-semibold">
            Strict NCERT Class 10 Syllabus
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-academic-subtle">
            Answers constrained to NCERT marking scheme
          </span>
          {onReportIssue && (
            <button
              onClick={onReportIssue}
              className="text-[11px] text-forest-700 hover:text-forest-950 underline flex items-center gap-1 font-medium"
            >
              <AlertCircle className="w-3 h-3 text-amber-600" />
              <span>Report issue</span>
            </button>
          )}
        </div>
      </div>

      {/* In-Flow Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => handleToggleTab('xray')}
          className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
            activeTab === 'xray'
              ? 'bg-forest-900 text-limeaccent shadow-sm ring-2 ring-limeaccent/40'
              : 'bg-limeaccent/25 border border-limeaccent text-forest-950 hover:bg-limeaccent/40'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-forest-800" />
          <span>🔬 Socratic X-Ray Hint</span>
        </button>

        <button
          onClick={() => handleToggleTab('hint')}
          className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
            activeTab === 'hint'
              ? 'bg-forest-900 text-limeaccent shadow-sm'
              : 'bg-white border border-academic-border text-forest-900 hover:bg-forest-100/60'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Give me a hint</span>
        </button>

        <button
          onClick={() => handleToggleTab('simple')}
          className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
            activeTab === 'simple'
              ? 'bg-forest-900 text-limeaccent shadow-sm'
              : 'bg-white border border-academic-border text-forest-900 hover:bg-forest-100/60'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Explain this more simply</span>
        </button>

        <button
          onClick={() => handleToggleTab('steps')}
          className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
            activeTab === 'steps'
              ? 'bg-forest-900 text-limeaccent shadow-sm'
              : 'bg-white border border-academic-border text-forest-900 hover:bg-forest-100/60'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Show the steps</span>
        </button>

        <button
          onClick={() => handleToggleTab('why_wrong')}
          className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
            activeTab === 'why_wrong'
              ? 'bg-forest-900 text-limeaccent shadow-sm'
              : 'bg-white border border-academic-border text-forest-900 hover:bg-forest-100/60'
          }`}
        >
          <QuestionIcon className="w-3.5 h-3.5" />
          <span>Why is my answer wrong?</span>
        </button>

        <button
          onClick={() => handleToggleTab('another_way')}
          className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
            activeTab === 'another_way'
              ? 'bg-forest-900 text-limeaccent shadow-sm'
              : 'bg-white border border-academic-border text-forest-900 hover:bg-forest-100/60'
          }`}
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Explain another way</span>
        </button>
      </div>

      {/* Expanded Guidance Drawer */}
      {activeTab && (
        <div className="mt-3 p-4 rounded-xl bg-white border border-academic-border space-y-2.5 animate-fadeIn text-forest-900">
          {loading && !cache[activeTab === 'custom' ? `ask_${customQuery}` : activeTab] ? (
            <div className="flex items-center gap-2 text-forest-700 py-3">
              <Loader2 className="w-4 h-4 animate-spin text-forest-900" />
              <span>Consulting NCERT Class 10 Marking Scheme...</span>
            </div>
          ) : (
            <>
              {activeTab === 'xray' && (
                <div className="space-y-2 p-3.5 rounded-xl bg-limeaccent/15 border border-limeaccent/40">
                  <div className="font-bold text-forest-950 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-forest-900 font-mono">
                      <Sparkles className="w-4 h-4 text-forest-800" />
                      Socratic X-Ray Nudge (No Answers Given Away)
                    </span>
                    <span className="text-[10px] bg-forest-900 text-limeaccent px-2 py-0.5 rounded font-mono font-bold">
                      Active Recall
                    </span>
                  </div>
                  <div className="text-sm leading-relaxed text-forest-950 font-medium">
                    <MathRenderer text={cache['xray'] || '🔬 Look at the given values: what standard NCERT identity or definition governs this exact relationship?'} />
                  </div>
                </div>
              )}

              {activeTab === 'hint' && (
                <div className="space-y-1.5">
                  <div className="font-bold text-forest-950 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>NCERT Conceptual Clue</span>
                  </div>
                  <div className="text-sm leading-relaxed text-forest-800">
                    <MathRenderer text={cache['hint'] || 'Review the core formula in the chapter.'} />
                  </div>
                </div>
              )}

              {activeTab === 'simple' && (
                <div className="space-y-1.5">
                  <div className="font-bold text-forest-950 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-forest-700" />
                    <span>Plain-English NCERT Analogy</span>
                  </div>
                  <div className="text-sm leading-relaxed text-forest-800">
                    <MathRenderer text={cache['simple'] || 'Think of this in simple daily terms.'} />
                  </div>
                </div>
              )}

              {activeTab === 'steps' && (
                <div className="space-y-2">
                  <div className="font-bold text-forest-950 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-forest-700" />
                    <span>Step-by-Step Marking Scheme Procedure</span>
                  </div>
                  <div className="text-sm leading-relaxed text-forest-800">
                    <MathRenderer text={cache['steps'] || '1. Identify given values.\n2. Apply formula.\n3. Verify units.'} />
                  </div>
                </div>
              )}

              {activeTab === 'why_wrong' && (
                <div className="space-y-1.5">
                  <div className="font-bold text-forest-950 flex items-center gap-1.5">
                    <QuestionIcon className="w-3.5 h-3.5 text-red-600" />
                    <span>Common CBSE Mistakes & Traps</span>
                  </div>
                  <div className="text-sm leading-relaxed text-forest-800">
                    <MathRenderer text={cache['why_wrong'] || 'Watch out for sign and unit errors.'} />
                  </div>
                </div>
              )}

              {activeTab === 'another_way' && (
                <div className="space-y-1.5">
                  <div className="font-bold text-forest-950 flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5 text-blue-600" />
                    <span>Alternative Valid Method</span>
                  </div>
                  <div className="text-sm leading-relaxed text-forest-800">
                    <MathRenderer text={cache['another_way'] || 'You can also solve by direct algebraic substitution.'} />
                  </div>
                </div>
              )}

              {activeTab === 'custom' && (
                <div className="space-y-1.5">
                  <div className="font-bold text-forest-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-forest-700" />
                    <span>NCERT Answer to Your Question</span>
                  </div>
                  <div className="text-sm leading-relaxed text-forest-800">
                    <MathRenderer text={customResponse || 'Analyzing your question against NCERT guidelines...'} />
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-academic-border flex items-center justify-between text-[11px] text-academic-subtle">
                <span className="flex items-center gap-1 text-forest-800 font-medium">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Strictly grounded in NCERT Class 10 ({source})</span>
                </span>
                <button
                  onClick={() => setActiveTab(null)}
                  className="text-forest-700 hover:text-forest-950 font-semibold"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Ask NCERT AI Query Input */}
      <form onSubmit={handleAskCustom} className="pt-1 flex items-center gap-2">
        <input
          type="text"
          value={customQuery}
          onChange={(e) => setCustomQuery(e.target.value)}
          placeholder="Ask a specific NCERT question about this problem (e.g. 'Can I use quadratic formula here?')..."
          className="flex-grow px-3 py-2 rounded-xl border border-academic-border bg-white text-forest-900 text-xs focus:outline-none focus:border-forest-700"
        />
        <button
          type="submit"
          disabled={loading || !customQuery.trim()}
          className="inline-flex items-center gap-1.5 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold px-3.5 py-2 rounded-xl text-xs transition disabled:opacity-50 shrink-0"
        >
          {loading && activeTab === 'custom' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          <span>Ask</span>
        </button>
      </form>
    </div>
  );
};
