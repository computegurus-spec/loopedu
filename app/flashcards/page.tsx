import React from 'react';
import { Metadata } from 'next';
import { FlashcardDeck } from '@/components/flashcards/FlashcardDeck';
import { RotateCcw, Clock, CheckCircle2, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Active Recall Flashcards & Spaced Repetition | LoopEdu',
  description:
    'Master formulas, laws, and definitions with Leitner spaced repetition flashcards for CBSE and ICSE exams.',
};

export default function FlashcardsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
              LEITNER SPACED REPETITION SYSTEM
            </span>
            <span className="text-[10px] font-mono text-zinc-500">•</span>
            <span className="text-[10px] font-mono text-zinc-400">ACTIVE RECALL ENGINE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Active Recall Flashcard Decks
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
            Eliminate exam-hall blanking. Review key formulas, definitions, and high-frequency exam traps with automated spaced repetition intervals.
          </p>
        </div>

        {/* Flashcard Deck Component */}
        <FlashcardDeck />
      </div>
    </div>
  );
}
