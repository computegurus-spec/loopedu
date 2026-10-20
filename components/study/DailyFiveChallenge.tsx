'use client';

import React, { useState, useEffect } from 'react';
import { MathRenderer } from '../MathRenderer';
import { AIHintCoach } from './AIHintCoach';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Trophy,
  Flame,
  BookOpen,
  Share2,
} from 'lucide-react';

interface DailyQuestion {
  id: string;
  subjectName: string;
  subjectSlug: string;
  topic: string;
  marks: number;
  question: string;
  answer: string;
  explanation: string;
  source: string;
}

const SAMPLE_DAILY_FIVE: DailyQuestion[] = [
  {
    id: 'MB-001',
    subjectName: 'Maths Basic',
    subjectSlug: 'maths-basic',
    topic: 'Quadratic Equations',
    marks: 3,
    question: 'Solve $x^2 - 8x + 15 = 0$.',
    answer: '$x = 3$ or $x = 5$.',
    explanation: 'Write $(x - 3)(x - 5) = 0$. A product is zero when at least one factor is zero.',
    source: 'NCERT Mathematics Class X, Chapter 4',
  },
  {
    id: 'SC-001',
    subjectName: 'Science',
    subjectSlug: 'science',
    topic: 'Chemical Reactions and Equations',
    marks: 2,
    question: 'Why is respiration considered an exothermic reaction? Write the balanced chemical equation.',
    answer: 'Respiration releases metabolic energy by breaking down glucose: $\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\rightarrow 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{Energy}$.',
    explanation: 'Glucose oxidizes within cells to release biological energy required for vital activities.',
    source: 'NCERT Science Class X, Chapter 1',
  },
  {
    id: 'SS-001',
    subjectName: 'Social Science',
    subjectSlug: 'social-science',
    topic: 'Nationalism in Europe',
    marks: 3,
    question: 'Briefly explain the significance of the Frankfurt Parliament of 1848.',
    answer: 'It was an all-German National Assembly convened in St. Paul’s Church to draft a constitution for a unified Germany under a constitutional monarchy.',
    explanation: 'The assembly reflected middle-class liberal aspirations but collapsed when Friedrich Wilhelm IV rejected the crown under parliamentary conditions.',
    source: 'NCERT History Class X, Chapter 1',
  },
  {
    id: 'EL-001',
    subjectName: 'English (L&L)',
    subjectSlug: 'english-language-literature',
    topic: 'Glimpses of India',
    marks: 2,
    question: 'How do the three sections of Glimpses of India connect everyday livelihood with regional identity?',
    answer: 'Baking in Goa, Coorg’s coffee/martial traditions, and Assam’s tea culture establish distinct regional heritage.',
    explanation: 'The author develops distinct cultural geography through concrete trade and community customs.',
    source: 'NCERT First Flight Class X, Chapter 5',
  },
  {
    id: 'AI-001',
    subjectName: 'Artificial Intelligence',
    subjectSlug: 'artificial-intelligence',
    topic: 'Natural Language Processing',
    marks: 2,
    question: 'Why can TF-IDF reduce the relative importance of words that appear in almost every document?',
    answer: 'Because inverse document frequency (IDF) decreases as the document frequency (DF) of a word increases across the corpus.',
    explanation: 'Common corpus words have $\\text{DF} \\approx N$, making $\\text{IDF} = \\log(N/\\text{DF}) \\approx 0$.',
    source: 'CBSE AI Facilitators Handbook, Chapter 6',
  },
];

export const DailyFiveChallenge: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [evaluations, setEvaluations] = useState<Record<number, 'correct' | 'mistake' | 'stuck'>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && !isCompleted) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isCompleted]);

  const currentQ = SAMPLE_DAILY_FIVE[currentIndex];

  const handleEvaluate = (result: 'correct' | 'mistake' | 'stuck') => {
    const updated = { ...evaluations, [currentIndex]: result };
    setEvaluations(updated);

    if (currentIndex < SAMPLE_DAILY_FIVE.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setRevealed(false);
    } else {
      setIsCompleted(true);
      setTimerActive(false);
    }
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const correctCount = Object.values(evaluations).filter((v) => v === 'correct').length;
  const reviewCount = Object.values(evaluations).filter((v) => v !== 'correct').length;

  return (
    <div className="rounded-2xl bg-white border border-academic-border p-6 sm:p-8 shadow-sm space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-academic-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-limeaccent-dark animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-forest-700">
              Daily Practice Habit • Daily Five
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-forest-950 mt-0.5">
            Today’s 5-Question Challenge
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-paper-100 text-forest-900 text-xs font-mono font-semibold">
            <Clock className="w-3.5 h-3.5 text-forest-600" />
            <span>{formatTimer(seconds)}</span>
          </div>

          <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-50 text-orange-950 border border-orange-200 text-xs font-semibold">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>3 Day Streak</span>
          </div>
        </div>
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Progress Bar (1 to 5) */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-academic-subtle">
              <span>Question {currentIndex + 1} of {SAMPLE_DAILY_FIVE.length}</span>
              <span>{currentQ.subjectName} • {currentQ.topic}</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {SAMPLE_DAILY_FIVE.map((_, idx) => {
                const evalResult = evaluations[idx];
                let bg = 'bg-paper-200';
                if (idx === currentIndex) bg = 'bg-forest-900';
                else if (evalResult === 'correct') bg = 'bg-emerald-500';
                else if (evalResult === 'mistake' || evalResult === 'stuck') bg = 'bg-amber-500';

                return <div key={idx} className={`h-2 rounded-full transition ${bg}`} />;
              })}
            </div>
          </div>

          {/* Question Card */}
          <div className="p-6 rounded-2xl bg-paper-50 border border-academic-border space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-forest-700 font-bold bg-white px-2.5 py-1 rounded border border-academic-border">
                {currentQ.id} • {currentQ.marks} {currentQ.marks === 1 ? 'Mark' : 'Marks'}
              </span>
              <span className="text-academic-subtle">{currentQ.source}</span>
            </div>

            <div className="text-base sm:text-lg font-medium text-forest-950 leading-relaxed">
              <MathRenderer content={currentQ.question} />
            </div>

            {/* AI Hint Coach */}
            <div className="pt-2">
              <AIHintCoach
                question={currentQ.question}
                topic={currentQ.topic}
                explanation={currentQ.explanation}
                source={currentQ.source}
              />
            </div>
          </div>

          {/* Answer Reveal & Self-Evaluation Controls */}
          <div className="space-y-4">
            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-forest-900 hover:bg-forest-800 text-limeaccent transition shadow flex items-center justify-center gap-2"
              >
                <span>I have attempted this on paper — Reveal Model Answer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="p-5 rounded-2xl bg-forest-950 text-white space-y-4 animate-in fade-in">
                <div>
                  <div className="text-xs font-bold text-limeaccent uppercase tracking-wider mb-1">
                    Verified Model Answer
                  </div>
                  <div className="text-sm font-semibold text-white">
                    <MathRenderer content={currentQ.answer} />
                  </div>
                </div>

                <div className="pt-3 border-t border-forest-800 text-xs text-forest-200 leading-relaxed">
                  <div className="font-bold text-forest-300 uppercase tracking-wider mb-1">
                    Method & Key Reasoning
                  </div>
                  <MathRenderer content={currentQ.explanation} />
                </div>

                {/* Self-Reflection & Pedagogical Recording */}
                <div className="pt-4 border-t border-forest-800 space-y-2">
                  <div className="text-xs font-semibold text-white">
                    How did your paper attempt go?
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-bold">
                    <button
                      onClick={() => handleEvaluate('correct')}
                      className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 transition"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Got it right</span>
                    </button>

                    <button
                      onClick={() => handleEvaluate('mistake')}
                      className="py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center gap-1.5 transition"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Made a mistake (Queue)</span>
                    </button>

                    <button
                      onClick={() => handleEvaluate('stuck')}
                      className="py-2.5 px-3 rounded-xl bg-forest-800 hover:bg-forest-700 text-forest-200 flex items-center justify-center gap-1.5 transition"
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>Was stuck / Unsure</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Round Completion Diagnostics */
        <div className="text-center py-6 space-y-6 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-2xl bg-forest-100 text-forest-900 mx-auto flex items-center justify-center">
            <Trophy className="w-8 h-8 text-forest-800" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-2xl font-serif font-bold text-forest-950">
              Daily Practice Completed!
            </h3>
            <p className="text-xs sm:text-sm text-forest-800 leading-relaxed">
              You practiced 5 core board questions across your subjects in <strong>{formatTimer(seconds)}</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto text-left">
            <div className="p-4 rounded-xl bg-paper-100 border border-academic-border space-y-1">
              <span className="text-[11px] text-academic-subtle uppercase font-bold">Solved Cleanly</span>
              <div className="text-2xl font-serif font-bold text-forest-950">{correctCount} / 5</div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
              <span className="text-[11px] text-amber-900 uppercase font-bold">Mistake Queue</span>
              <div className="text-2xl font-serif font-bold text-amber-950">+{reviewCount}</div>
            </div>

            <div className="p-4 rounded-xl bg-forest-50 border border-forest-200 space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[11px] text-forest-900 uppercase font-bold">Daily Streak</span>
              <div className="text-2xl font-serif font-bold text-forest-950">4 Days 🔥</div>
            </div>
          </div>

          <div className="p-4 max-w-lg mx-auto bg-paper-50 rounded-xl border border-academic-border text-xs text-forest-800 text-left space-y-2">
            <div className="font-bold text-forest-950 flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-forest-700" />
              <span>What happens next:</span>
            </div>
            <p>
              The {reviewCount} questions where you encountered hesitation have been placed into your personal <strong>Mistake Comeback</strong> queue.
              You will revisit them in your next adaptive revision round.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `🔥 I solved ${correctCount}/5 CBSE board questions cleanly on LoopEdu in ${formatTimer(seconds)}! Practice 10 free questions this week: https://loopedu.in`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 transition shadow-xs"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Score on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setIsCompleted(false);
                setCurrentIndex(0);
                setEvaluations({});
                setRevealed(false);
                setSeconds(0);
                setTimerActive(true);
              }}
              className="py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-forest-900 text-limeaccent hover:bg-forest-800 transition"
            >
              Practice Another Set (Up to 10 Free)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
