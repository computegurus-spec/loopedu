'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Flame,
  Award,
  Zap,
  Lightbulb,
  Share2,
} from 'lucide-react';
import { MathRenderer } from '../MathRenderer';

interface QuizOption {
  id: string;
  label: string;
  text: string;
}

interface HeroQuestion {
  id: string;
  subject: string;
  subjectSlug: string;
  badge: string;
  topic: string;
  marks: string;
  question: string;
  options: QuizOption[];
  correctId: string;
  explanation: string;
  boardFact: string;
}

const HERO_QUESTIONS: HeroQuestion[] = [
  {
    id: 'hero-maths',
    subject: 'Maths Standard',
    subjectSlug: 'maths-standard',
    badge: 'CBSE 2024 High-Yield',
    topic: 'Polynomials (Chapter 2)',
    marks: '1 Mark MCQ',
    question: 'If one zero of the quadratic polynomial $x^2 + 3x + k$ is $2$, what is the value of $k$?',
    options: [
      { id: 'A', label: 'A', text: '$10$' },
      { id: 'B', label: 'B', text: '$-10$' },
      { id: 'C', label: 'C', text: '$-7$' },
      { id: 'D', label: 'D', text: '$-2$' },
    ],
    correctId: 'B',
    explanation: 'Since $2$ is a zero, substitute $x = 2$: $(2)^2 + 3(2) + k = 0 \\implies 4 + 6 + k = 0 \\implies k = -10$.',
    boardFact: 'Repeated in 6 of the last 8 CBSE Board Exam sets.',
  },
  {
    id: 'hero-science',
    subject: 'Science',
    subjectSlug: 'science',
    badge: 'CBSE 2024 Board Hit',
    topic: 'Carbon & its Compounds (Chapter 4)',
    marks: '1 Mark MCQ',
    question: 'Which of the following compounds turns blue litmus red and produces brisk effervescence with $\\text{NaHCO}_3$?',
    options: [
      { id: 'A', label: 'A', text: 'Ethanol ($\\text{C}_2\\text{H}_5\\text{OH}$)' },
      { id: 'B', label: 'B', text: 'Ethanoic Acid ($\\text{CH}_3\\text{COOH}$)' },
      { id: 'C', label: 'C', text: 'Sodium Hydroxide ($\\text{NaOH}$)' },
      { id: 'D', label: 'D', text: 'Acetone ($\\text{CH}_3\\text{COCH}_3$)' },
    ],
    correctId: 'B',
    explanation: 'Ethanoic acid is an organic acid that turns blue litmus red and reacts with $\\text{NaHCO}_3$ to release $\\text{CO}_2$ gas (brisk effervescence).',
    boardFact: 'Core question from NCERT Section 4.4 on chemical reactions of acids.',
  },
  {
    id: 'hero-english',
    subject: 'English (L&L)',
    subjectSlug: 'english-language-literature',
    badge: 'First Flight Mastery',
    topic: 'A Letter to God (Chapter 1)',
    marks: '1 Mark MCQ',
    question: 'In "A Letter to God", why did Lencho compare the raindrops to "new coins"?',
    options: [
      { id: 'A', label: 'A', text: 'They looked bright and shiny like silver coins' },
      { id: 'B', label: 'B', text: 'They promised a rich harvest that meant prosperity' },
      { id: 'C', label: 'C', text: 'The postmaster handed him coins in the rain' },
      { id: 'D', label: 'D', text: 'The frozen hail looked like white pennies' },
    ],
    correctId: 'B',
    explanation: 'Lencho saw the timely rain as wealth because it promised a bountiful crop of ripe corn, ensuring food and income for his family.',
    boardFact: 'Appeared in Class 10 Board English Literature section 4 times.',
  },
];

export const HeroInteractiveWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQ = HERO_QUESTIONS[activeTab];
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === currentQ.correctId;

  const handleSelectTab = (idx: number) => {
    setActiveTab(idx);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const handleOptionClick = (optionId: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionId);
    setShowExplanation(true);
  };

  return (
    <div className="w-full rounded-3xl bg-forest-950 text-white border border-forest-800 shadow-2xl overflow-hidden">
      {/* Top Header Bar */}
      <div className="px-5 py-4 bg-forest-900/90 border-b border-forest-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-limeaccent animate-ping" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-limeaccent">
            Live Interactive Micro-Test
          </span>
          <span className="text-[11px] text-forest-400 font-mono hidden sm:inline">• Zero sign-up required</span>
        </div>

        {/* Subject Switcher Tabs */}
        <div className="flex items-center gap-1 bg-forest-950/90 p-1 rounded-xl border border-forest-800">
          {HERO_QUESTIONS.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => handleSelectTab(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === idx
                  ? 'bg-limeaccent text-forest-950 shadow-sm'
                  : 'text-forest-300 hover:text-white'
              }`}
            >
              {q.subject}
            </button>
          ))}
        </div>
      </div>

      {/* Main Question Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Topic Badge & Board Fact */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-forest-800 text-limeaccent font-mono font-bold text-[11px]">
              {currentQ.topic}
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-semibold text-[11px]">
              {currentQ.badge}
            </span>
          </div>
          <span className="text-[11px] text-forest-400 font-mono">
            {currentQ.marks}
          </span>
        </div>

        {/* Question Text */}
        <div className="text-base sm:text-xl font-medium text-white leading-relaxed">
          <MathRenderer content={currentQ.question} />
        </div>

        {/* 4 Interactive Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {currentQ.options.map((opt) => {
            const isThisSelected = selectedOption === opt.id;
            const isThisCorrect = opt.id === currentQ.correctId;

            let btnClasses =
              'relative flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border text-left transition text-sm ';

            if (!isAnswered) {
              btnClasses +=
                'bg-forest-900/60 hover:bg-forest-800/80 border-forest-800 text-white hover:border-limeaccent/60 cursor-pointer hover:scale-[1.01] active:scale-[0.99]';
            } else if (isThisCorrect) {
              btnClasses +=
                'bg-emerald-950/80 border-emerald-400 text-emerald-100 ring-2 ring-emerald-500/50 shadow-md';
            } else if (isThisSelected && !isThisCorrect) {
              btnClasses +=
                'bg-red-950/80 border-red-500 text-red-100 ring-2 ring-red-500/40';
            } else {
              btnClasses += 'bg-forest-900/30 border-forest-800/50 text-forest-400 opacity-60';
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleOptionClick(opt.id)}
                disabled={isAnswered}
                className={btnClasses}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 transition ${
                    isAnswered && isThisCorrect
                      ? 'bg-emerald-500 text-forest-950'
                      : isAnswered && isThisSelected
                      ? 'bg-red-500 text-white'
                      : 'bg-forest-800 text-forest-200'
                  }`}
                >
                  {opt.label}
                </span>

                <div className="font-medium text-sm flex-1">
                  <MathRenderer content={opt.text} />
                </div>

                {isAnswered && isThisCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 animate-in zoom-in-50 duration-200" />
                )}
                {isAnswered && isThisSelected && !isThisCorrect && (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 animate-in zoom-in-50 duration-200" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Dopamine Win Card */}
        {isAnswered && (
          <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-3 duration-300">
            {isCorrect ? (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-forest-900 to-emerald-950/90 border border-emerald-500/50 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Sparkles className="w-5 h-5 text-limeaccent animate-bounce" />
                    <span>🔥 Boom! Correct Answer. Streak Started! (1/5 Done)</span>
                  </div>
                  <span className="text-[11px] font-mono text-limeaccent bg-forest-950 px-2 py-0.5 rounded border border-limeaccent/30 font-bold">
                    +50 XP
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  <MathRenderer content={currentQ.explanation} />
                </div>

                <div className="pt-2 border-t border-emerald-800/40 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] text-forest-300 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-limeaccent" />
                    {currentQ.boardFact}
                  </span>

                  <Link
                    href={`/study/${currentQ.subjectSlug}`}
                    className="inline-flex items-center gap-2 bg-limeaccent hover:bg-lime-400 text-forest-950 font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-xl transition shadow-md hover:scale-105"
                  >
                    <span>Claim Remaining 4 Questions (Free) →</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-4 sm:p-5 rounded-2xl bg-forest-900 border border-forest-700/80 space-y-3">
                <div className="flex items-center gap-2 text-limeaccent font-bold text-sm">
                  <Lightbulb className="w-4 h-4 text-limeaccent" />
                  <span>Nice effort! Here's the NCERT Step breakdown:</span>
                </div>

                <div className="text-xs sm:text-sm text-forest-100 leading-relaxed">
                  <MathRenderer content={currentQ.explanation} />
                </div>

                <div className="pt-2 border-t border-forest-800 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] text-forest-400">
                    Catching this mistake now secures your board marks!
                  </span>

                  <Link
                    href={`/study/${currentQ.subjectSlug}`}
                    className="inline-flex items-center gap-1.5 bg-forest-800 hover:bg-forest-700 text-limeaccent font-semibold text-xs px-3.5 py-1.5 rounded-xl transition"
                  >
                    <span>Continue Today's 15-Min Habit →</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Footer Note */}
      <div className="px-6 py-3 bg-forest-950/90 border-t border-forest-800/60 flex items-center justify-between text-[11px] text-forest-400">
        <span>⏱️ Average time: 45 seconds • 100% CBSE NCERT Aligned</span>
        <span className="font-mono text-limeaccent font-semibold">10 Free Questions Every Week</span>
      </div>
    </div>
  );
};
