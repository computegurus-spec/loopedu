'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  RotateCcw,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Layers,
  ArrowRight,
  Sliders,
  Check,
} from 'lucide-react';
import { OFFICIAL_FLASHCARD_DECKS, Flashcard } from '@/lib/data/flashcards';

export const FlashcardDeck: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [activeDeck, setActiveDeck] = useState<Flashcard[]>(OFFICIAL_FLASHCARD_DECKS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionReviewed, setSessionReviewed] = useState(0);
  const [masteredCount, setMasteredCount] = useState(0);
  const [cardBoxes, setCardBoxes] = useState<Record<string, number>>({});

  useEffect(() => {
    if (selectedSubject === 'all') {
      setActiveDeck(OFFICIAL_FLASHCARD_DECKS);
    } else {
      setActiveDeck(OFFICIAL_FLASHCARD_DECKS.filter((c) => c.subjectId === selectedSubject));
    }
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedSubject]);

  const currentCard: Flashcard | undefined = activeDeck[currentIndex];

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleRate = (ease: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentCard) return;

    setSessionReviewed((prev) => prev + 1);
    if (ease === 'easy' || ease === 'good') {
      setMasteredCount((prev) => prev + 1);
      setCardBoxes((prev) => ({
        ...prev,
        [currentCard.id]: Math.min((prev[currentCard.id] || 1) + 1, 5),
      }));
    } else {
      setCardBoxes((prev) => ({
        ...prev,
        [currentCard.id]: 1,
      }));
    }

    // Advance to next card
    if (currentIndex < activeDeck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      // Loop or finish
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  const nextCard = () => {
    if (currentIndex < activeDeck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  if (!currentCard) {
    return (
      <div className="p-8 text-center text-zinc-400 font-mono">
        No flashcards found for this category.
      </div>
    );
  }

  const currentBox = cardBoxes[currentCard.id] || currentCard.leitnerBox || 1;

  return (
    <div className="space-y-6">
      {/* Subject Filter & Deck Stats */}
      <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Subjects' },
            { id: 'science', label: 'Science' },
            { id: 'maths', label: 'Mathematics' },
            { id: 'social_science', label: 'Social Science' },
          ].map((sub) => {
            const isActive = selectedSubject === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubject(sub.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition border ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-950 font-bold border-white'
                    : 'bg-zinc-950/70 text-zinc-400 hover:text-white border-zinc-800'
                }`}
              >
                {sub.label}
              </button>
            );
          })}
        </div>

        {/* Telemetry Counter */}
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
          <div>
            Card <span className="text-white font-bold">{currentIndex + 1}</span> of{' '}
            <span className="text-white font-bold">{activeDeck.length}</span>
          </div>
          <div className="text-zinc-600">|</div>
          <div>
            Reviewed Today: <span className="text-emerald-400 font-bold">{sessionReviewed}</span>
          </div>
          <div className="text-zinc-600">|</div>
          <div>
            Mastered: <span className="text-cyan-400 font-bold">{masteredCount}</span>
          </div>
        </div>
      </div>

      {/* Main Flashcard Viewport */}
      <div className="max-w-3xl mx-auto">
        {/* Leitner Box Level Indicator */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2 px-1">
          <div className="flex items-center gap-2">
            <span>Leitner Memory Box:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((boxNum) => (
                <div
                  key={boxNum}
                  className={`w-4 h-4 rounded text-[9px] flex items-center justify-center font-bold ${
                    boxNum <= currentBox
                      ? 'bg-emerald-500 text-zinc-950 font-mono'
                      : 'bg-zinc-800 text-zinc-500'
                  }`}
                >
                  {boxNum}
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-zinc-400">
            {currentCard.chapterTitle} • {currentCard.topic}
          </div>
        </div>

        {/* 3D Flip Card */}
        <div
          onClick={handleFlip}
          className="relative min-h-[360px] rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer p-8 flex flex-col justify-between shadow-2xl group select-none"
        >
          {/* Card Top Meta */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                {currentCard.cardType.toUpperCase()}
              </span>
              <span className="text-xs font-mono text-zinc-400">{currentCard.subjectName}</span>
            </div>

            <div className="text-xs font-mono text-zinc-400 group-hover:text-zinc-300 transition flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Click card or press Space to {isFlipped ? 'view prompt' : 'reveal solution'}</span>
            </div>
          </div>

          {/* Front / Back Card Body */}
          <div className="my-8">
            {!isFlipped ? (
              /* FRONT: Prompt */
              <div className="space-y-4 animate-in fade-in duration-150">
                <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase block">
                  Active Recall Prompt
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {currentCard.frontPrompt}
                </h3>
              </div>
            ) : (
              /* BACK: Solution & NCERT Guidance */
              <div className="space-y-4 animate-in fade-in duration-150">
                <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase block">
                  Standard Solution & Verification
                </span>
                <div className="text-sm sm:text-base text-zinc-200 leading-relaxed whitespace-pre-line font-normal">
                  {currentCard.backSolution}
                </div>

                {currentCard.keyFormula && (
                  <div className="mt-4 p-3 rounded-xl bg-zinc-950 border border-zinc-800/90 font-mono text-sm text-cyan-300">
                    <span className="text-[10px] text-zinc-500 block mb-0.5">Key Formula:</span>
                    {currentCard.keyFormula}
                  </div>
                )}

                {currentCard.commonTrapWarning && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Exam Trap Warning:</strong>
                      {currentCard.commonTrapWarning}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Card Footer: Reference */}
          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>{currentCard.ncertReference}</span>
            <span className="text-[10px] uppercase text-zinc-400">
              Difficulty: {currentCard.difficulty}
            </span>
          </div>
        </div>

        {/* Rating Controls (Shown after flip) */}
        {isFlipped ? (
          <div className="mt-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="text-xs font-mono text-center text-zinc-400 mb-3">
              How easily did you recall this concept?
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleRate('again')}
                className="py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-mono transition flex flex-col items-center"
              >
                <span className="font-bold">Again</span>
                <span className="text-[10px] text-zinc-500 mt-0.5">&lt; 10 mins</span>
              </button>

              <button
                onClick={() => handleRate('hard')}
                className="py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono transition flex flex-col items-center"
              >
                <span className="font-bold">Hard</span>
                <span className="text-[10px] text-zinc-500 mt-0.5">1 day</span>
              </button>

              <button
                onClick={() => handleRate('good')}
                className="py-2.5 px-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-mono transition flex flex-col items-center"
              >
                <span className="font-bold">Good</span>
                <span className="text-[10px] text-zinc-500 mt-0.5">3 days</span>
              </button>

              <button
                onClick={() => handleRate('easy')}
                className="py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono transition flex flex-col items-center"
              >
                <span className="font-bold">Easy</span>
                <span className="text-[10px] text-zinc-500 mt-0.5">7 days</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={prevCard}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleFlip}
              className="px-6 py-2 rounded-xl text-xs font-mono font-bold bg-zinc-100 hover:bg-white text-zinc-950 transition shadow-sm"
            >
              Reveal Answer
            </button>

            <button
              onClick={nextCard}
              disabled={currentIndex === activeDeck.length - 1}
              className="px-4 py-2 rounded-xl text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1.5"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
