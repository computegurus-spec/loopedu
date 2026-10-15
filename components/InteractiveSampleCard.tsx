'use client';

import React, { useState } from 'react';
import { MathRenderer } from './MathRenderer';
import { Eye, EyeOff, Sparkles, CheckCircle2, BookOpen } from 'lucide-react';

interface SampleQuestionItem {
  id: string;
  track: string;
  subjectName: string;
  topic: string;
  marks: number;
  question: string;
  answer: string;
  explanation: string;
  source: string;
}

const FEATURED_SAMPLES: SampleQuestionItem[] = [
  {
    id: 'MB-001',
    track: 'Maths Basic',
    subjectName: 'Mathematics (Basic)',
    topic: 'Quadratic Equations (Chapter 4)',
    marks: 3,
    question: 'Solve $x^2 - 8x + 15 = 0$.',
    answer: '$x = 3$ or $x = 5$.',
    explanation:
      'Write $(x - 3)(x - 5) = 0$. A product is zero when at least one factor is zero. Both $x = 3$ and $x = 5$ satisfy the equation.',
    source: 'NCERT Mathematics, Chapter 4: Quadratic Equations',
  },
  {
    id: 'SC-001',
    track: 'Science',
    subjectName: 'Science',
    topic: 'Chemical Reactions and Equations (Chapter 1)',
    marks: 2,
    question:
      'Why is respiration considered an exothermic reaction? Write the balanced chemical equation.',
    answer:
      'Respiration breaks down glucose with oxygen to release metabolic energy, making it exothermic. Equation: $\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\rightarrow 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{Energy}$.',
    explanation:
      'During digestion, carbohydrates break down into glucose. In cellular respiration, glucose combines with oxygen in cells and releases energy needed for vital activities.',
    source: 'NCERT Science, Chapter 1: Chemical Reactions and Equations',
  },
  {
    id: 'AI-001',
    track: 'Artificial Intelligence',
    subjectName: 'Artificial Intelligence (417)',
    topic: 'Natural Language Processing (Chapter 6)',
    marks: 2,
    question:
      'Why can TF-IDF reduce the relative importance of words that appear in almost every document?',
    answer:
      'Because inverse document frequency (IDF) decreases as the document frequency (DF) of a word increases across the corpus.',
    explanation:
      'Under standard formula $\\text{IDF} = \\log(N/\\text{DF})$, words appearing in nearly every document yield $\\text{DF} \\approx N$, making $\\log(1) \\approx 0$. This dampens universal words and elevates domain-distinctive keywords.',
    source: 'CBSE Class X AI Facilitators Handbook, Chapter 6: NLP',
  },
];

export const InteractiveSampleCard: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const current = FEATURED_SAMPLES[selectedIndex];

  const handleSelectTrack = (idx: number) => {
    setSelectedIndex(idx);
    setRevealed(false);
  };

  return (
    <div className="rounded-2xl bg-forest-900 text-white p-6 sm:p-8 shadow-xl border border-forest-800">
      {/* Top track tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-forest-800/80">
        <div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-limeaccent">
            Try it first • Interactive Question
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
            {current.subjectName}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 bg-forest-950 p-1 rounded-xl border border-forest-800">
          {FEATURED_SAMPLES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => handleSelectTrack(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedIndex === idx
                  ? 'bg-limeaccent text-forest-950 shadow-sm'
                  : 'text-forest-300 hover:text-white'
              }`}
            >
              {s.track}
            </button>
          ))}
        </div>
      </div>

      {/* Question metadata & content */}
      <div className="py-6 space-y-4">
        <div className="flex items-center justify-between text-xs text-forest-300">
          <span className="font-mono bg-forest-800/60 px-2.5 py-1 rounded-md text-limeaccent">
            ID: {current.id} • {current.topic}
          </span>
          <span className="font-semibold text-white/90">
            {current.marks} {current.marks === 1 ? 'Mark' : 'Marks'}
          </span>
        </div>

        <div className="text-base sm:text-lg text-white font-medium leading-relaxed bg-forest-950/60 p-5 rounded-xl border border-forest-800/50">
          <MathRenderer content={current.question} />
        </div>
      </div>

      {/* Answer reveal trigger */}
      <div className="pt-2">
        <button
          onClick={() => setRevealed(!revealed)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-limeaccent hover:bg-limeaccent-hover text-forest-950 font-bold px-5 py-2.5 rounded-xl text-sm transition shadow"
          aria-expanded={revealed}
        >
          {revealed ? (
            <>
              <EyeOff className="w-4 h-4" />
              <span>Hide Model Answer & Explanation</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              <span>Reveal Model Answer & Explanation</span>
            </>
          )}
        </button>

        {revealed && (
          <div className="mt-4 p-5 rounded-xl bg-forest-950 border border-limeaccent/30 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div>
              <div className="text-xs font-bold text-limeaccent uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Model Answer</span>
              </div>
              <div className="text-sm font-semibold text-white leading-relaxed">
                <MathRenderer content={current.answer} />
              </div>
            </div>

            <div className="pt-3 border-t border-forest-800/80">
              <div className="text-xs font-bold text-forest-300 uppercase tracking-wider mb-1.5">
                Explanation & Method
              </div>
              <div className="text-xs sm:text-sm text-forest-200 leading-relaxed">
                <MathRenderer content={current.explanation} />
              </div>
            </div>

            <div className="pt-2 text-[11px] text-forest-400 flex items-center gap-1.5">
              <BookOpen className="w-3 h-3 text-forest-500" />
              <span>Source alignment: {current.source}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
