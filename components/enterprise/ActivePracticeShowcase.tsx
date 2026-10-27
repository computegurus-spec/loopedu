'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function ActivePracticeShowcase() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hintTier, setHintTier] = useState<number>(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  // Sample original question from our practice bank
  const sampleQuestion = {
    subject: 'Physics (JEE Main & Advanced)',
    topic: 'Electromagnetic Induction & Lenz’s Law',
    text: 'A circular conducting loop of radius r is placed in a uniform magnetic field B perpendicular to the plane of the loop. If the radius shrinks at a constant rate dr/dt = -k, what is the magnitude and direction of the induced electromotive force (EMF)?',
    options: [
      { id: 'A', text: 'EMF = 2πrkB, direction such that it opposes the reduction in magnetic flux' },
      { id: 'B', text: 'EMF = πr²kB, direction reinforcing the external magnetic field' },
      { id: 'C', text: 'EMF = 2πrB/k, direction clock-wise independent of B' },
      { id: 'D', text: 'EMF = 0, because the magnetic field B is static' },
    ],
    correctOption: 'A',
    hints: [
      {
        tier: 1,
        title: 'Tier 1: Socratic Conceptual Nudge',
        content: 'Recall Faraday’s law of induction: $\\mathcal{E} = -\\frac{d\\Phi_B}{dt}$. Magnetic flux is $\\Phi_B = B \\cdot A$. Here, $B$ is constant, but the loop area $A = \\pi r^2$ is shrinking with time. What is $\\frac{dA}{dt}$ via the chain rule?',
      },
      {
        tier: 2,
        title: 'Tier 2: Governing Formula & Chain Rule',
        content: 'Differentiate area with respect to time: $\\frac{dA}{dt} = 2\\pi r \\frac{dr}{dt} = -2\\pi r k$. Thus $\\mathcal{E} = -B \\left(-2\\pi r k\\right) = 2\\pi r k B$. Lenz’s law states the induced current creates an induced field to oppose the decrease in flux.',
      },
      {
        tier: 3,
        title: 'Tier 3: Worked Solution & Board Trap',
        content: 'Final EMF magnitude is $2\\pi r k B$. Common Exam Trap: Forgetting the chain rule factor of 2, or mistaking the negative rate of radius reduction. The induced current must circulate to maintain flux inside the shrinking loop.',
      },
    ],
  };

  function handleSelectOption(id: string) {
    setSelectedOption(id);
    setIsAnswerSubmitted(true);
  }

  function handleReset() {
    setSelectedOption(null);
    setHintTier(0);
    setIsAnswerSubmitted(false);
  }

  return (
    <section className="py-16 lg:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Active Diagnostic Practice vs Passive Video
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Progressive Socratic Hints & Mistake Vault
          </h2>
          <p className="text-sm text-slate-400">
            Endless video streaming creates the illusion of learning. LoopEdu builds real problem-solving instincts through diagnostic drills, progressive hints, and spaced repetition (1d → 3d → 7d).
          </p>
        </div>

        {/* Live Interactive Drill Box */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-10 space-y-8">
          
          {/* Question Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                {sampleQuestion.subject}
              </span>
              <span className="text-xs text-slate-400">• {sampleQuestion.topic}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white transition"
              >
                Reset Drill
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Interactive Diagnostic Problem:
            </span>
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
              {sampleQuestion.text}
            </p>
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-3">
            {sampleQuestion.options.map(opt => {
              const isSelected = selectedOption === opt.id;
              const isCorrect = opt.id === sampleQuestion.correctOption;

              let btnStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300';
              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500/10 border-emerald-500 text-emerald-300 font-semibold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-500/10 border-rose-500 text-rose-300';
                }
              } else if (isSelected) {
                btnStyle = 'bg-slate-800 border-slate-600 text-white';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-4 rounded-xl text-left border text-xs sm:text-sm transition flex items-center justify-between ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center font-bold text-xs shrink-0">
                      {opt.id}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {isAnswerSubmitted && isCorrect && (
                    <span className="text-xs font-bold text-emerald-400 shrink-0 ml-2">✓ Correct</span>
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <span className="text-xs font-bold text-rose-400 shrink-0 ml-2">✕ Common Trap</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Progressive Hint Progression Drawer */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Stuck on a Step? Reveal Progressive Socratic Hints:
              </span>
              <div className="flex items-center gap-2">
                {[1, 2, 3].map(t => (
                  <button
                    key={t}
                    onClick={() => setHintTier(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      hintTier >= t
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    Hint Tier {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Display Active Hints */}
            {hintTier > 0 && (
              <div className="space-y-3 pt-2 animate-in fade-in duration-150">
                {sampleQuestion.hints.slice(0, hintTier).map(h => (
                  <div key={h.tier} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <div className="font-bold text-emerald-400">{h.title}</div>
                    <div className="text-slate-300 leading-relaxed">{h.content}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Spaced Repetition Mistake Vault Explanation */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <div className="font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Interval 1: 24 Hours
              </div>
              <p className="text-slate-400">
                Incorrectly answered problems are automatically flagged and served 1 day later with fresh numerical variations.
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                Interval 2: 72 Hours
              </div>
              <p className="text-slate-400">
                Reinforces memory consolidation just before the cognitive forgetting curve causes concept decay.
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Interval 3: 7 Days (Mastery)
              </div>
              <p className="text-slate-400">
                Two consecutive correct answers archive the problem into your permanent Mastery Vault.
              </p>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              10,000+ verified original questions across JEE, NEET, UPSC, SSC, and Banking.
            </span>
            <Link
              href="/prepare"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-950/40"
            >
              Start Free 15-Minute Diagnostic Habit →
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
