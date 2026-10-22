'use client';

import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Sparkles,
  Send,
  Loader2,
  X,
  ShieldCheck,
  Brain,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface FeynmanEvaluatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  topic: string;
  subjectName: string;
  referenceExplanation?: string;
}

export const FeynmanEvaluatorModal: React.FC<FeynmanEvaluatorModalProps> = ({
  isOpen,
  onClose,
  question,
  topic,
  subjectName,
  referenceExplanation = '',
}) => {
  const [explanation, setExplanation] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);
  const [error, setError] = useState('');

  // Speech Recognition hook
  useEffect(() => {
    let recognition: any = null;
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setExplanation((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    }

    if (isRecording && recognition) {
      try {
        recognition.start();
      } catch (e) {}
    } else if (!isRecording && recognition) {
      try {
        recognition.stop();
      } catch (e) {}
    }

    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch (e) {}
      }
    };
  }, [isRecording]);

  if (!isOpen) return null;

  const handleEvaluate = async () => {
    if (!explanation.trim()) {
      setError('Please explain the concept in your own words before submitting.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/ai/feynman', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          topic,
          subjectName,
          conceptExplanation: explanation,
          correctExplanation: referenceExplanation,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Evaluation failed');
      }

      setEvaluation(data.evaluation);
    } catch (err: any) {
      setError(err.message || 'Could not complete conceptual evaluation');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-900 font-sans">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0066FF] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
              Feynman Conceptual Defense
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-semibold">{topic}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
            Defend Your Solution (No Rote Answers)
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            Richard Feynman proved that if you cannot explain a concept in simple terms, you do not truly understand it. Speak or write your explanation of <em>why</em> the principle works.
          </p>
        </div>

        {/* Question Context Pill */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800">
          <strong className="text-[#0066FF] font-bold">Target Problem:</strong> {question.slice(0, 160)}
          {question.length > 160 ? '...' : ''}
        </div>

        {/* Input / Voice Area */}
        {!evaluation ? (
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Explain the underlying principle in your own words (e.g. 'The discriminant determines whether the parabola intersects the x-axis because the quadratic formula contains a square root of D...')"
                className="w-full h-36 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:bg-white focus:ring-2 focus:ring-blue-100 transition resize-none font-sans"
              />

              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                    isRecording
                      ? 'bg-rose-50 text-rose-600 border-rose-300 animate-pulse'
                      : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 shadow-2xs'
                  }`}
                  title={isRecording ? 'Stop Recording' : 'Dictate with Voice'}
                >
                  {isRecording ? <MicOff className="w-4 h-4 text-rose-600" /> : <Mic className="w-4 h-4 text-[#0066FF]" />}
                  <span className="hidden sm:inline">{isRecording ? 'Listening...' : 'Voice Defend'}</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400 font-medium">
                {explanation.trim().split(/\s+/).filter(Boolean).length} words recorded
              </span>

              <button
                type="button"
                onClick={handleEvaluate}
                disabled={submitting || !explanation.trim()}
                className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-2xl text-xs transition shadow-sm disabled:opacity-40"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Evaluating Conceptual Depth...</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4" />
                    <span>Run Feynman Telemetry Check →</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Evaluation Results View */
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Conceptual Intuition</span>
                <span className="text-3xl font-extrabold text-[#0066FF] tabular-nums">
                  {evaluation.score}
                  <span className="text-sm text-slate-400"> / 100</span>
                </span>
                <span className="text-xs text-slate-700 block mt-1 font-medium">
                  Grade: <strong className="text-emerald-700">{evaluation.masteryLevel}</strong>
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Core Strengths</span>
                <p className="text-xs text-slate-700 leading-snug">{evaluation.strengths}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                  Blind Spot &amp; Formula Dependency
                </span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed font-sans">{evaluation.blindSpot}</p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
              <span className="text-[11px] font-bold text-[#0066FF] uppercase tracking-wider">
                Socratic Next Action
              </span>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">{evaluation.socraticRecommendation}</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  setEvaluation(null);
                  setExplanation('');
                }}
                className="text-xs text-slate-500 hover:text-slate-900 transition font-semibold"
              >
                ← Retake Concept Defense
              </button>

              <button
                type="button"
                onClick={onClose}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-2xs"
              >
                Apply to Session &amp; Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
