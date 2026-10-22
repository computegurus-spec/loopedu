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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded font-bold">
              Feynman Conceptual Defense
            </span>
            <span className="text-slate-600 font-mono">•</span>
            <span className="text-xs text-slate-400 font-mono">{topic}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Defend Your Solution (No Rote Answers)
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Richard Feynman proved that if you cannot explain a concept in simple terms, you do not truly understand it. Speak or write your explanation of <em>why</em> the principle works.
          </p>
        </div>

        {/* Question Context Pill */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
          <strong className="text-blue-400">Target Problem:</strong> {question.slice(0, 160)}
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
                className="w-full h-36 bg-slate-950 border border-slate-700 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition resize-none font-mono"
              />

              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                    isRecording
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500 animate-pulse'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                  title={isRecording ? 'Stop Recording' : 'Dictate with Voice'}
                >
                  {isRecording ? <MicOff className="w-4 h-4 text-rose-400" /> : <Mic className="w-4 h-4 text-blue-400" />}
                  <span className="hidden sm:inline">{isRecording ? 'Listening...' : 'Voice Defend'}</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500 font-mono">
                {explanation.trim().split(/\s+/).filter(Boolean).length} words recorded
              </span>

              <button
                type="button"
                onClick={handleEvaluate}
                disabled={submitting || !explanation.trim()}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-xs transition shadow-lg disabled:opacity-40"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Conceptual Intuition</span>
                <span className="text-3xl font-extrabold text-blue-400 tabular-nums">
                  {evaluation.score}
                  <span className="text-sm text-slate-500"> / 100</span>
                </span>
                <span className="text-xs text-slate-300 block mt-1">
                  Grade: <strong className="text-emerald-400">{evaluation.masteryLevel}</strong>
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Core Strengths</span>
                <p className="text-xs text-slate-300 leading-snug">{evaluation.strengths}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Blind Spot & Formula Dependency
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{evaluation.blindSpot}</p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-1">
              <span className="text-[11px] font-bold text-blue-400 font-mono uppercase tracking-wider">
                Socratic Next Action
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">{evaluation.socraticRecommendation}</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  setEvaluation(null);
                  setExplanation('');
                }}
                className="text-xs text-slate-400 hover:text-white transition font-mono"
              >
                ← Retake Concept Defense
              </button>

              <button
                type="button"
                onClick={onClose}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition"
              >
                Apply to Session & Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
