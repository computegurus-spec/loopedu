'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  GitBranch,
  RotateCcw,
  Compass,
  Activity,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Sparkles,
  Layers,
  ChevronRight,
  Shield,
  Zap,
} from 'lucide-react';

interface SaaSHeroProps {
  isLoggedIn?: boolean;
}

export const SaaSHero: React.FC<SaaSHeroProps> = ({ isLoggedIn }) => {
  const [activeTab, setActiveTab] = useState<'coach' | 'questions' | 'mindmaps' | 'flashcards' | 'advisory'>('coach');

  return (
    <section className="relative overflow-hidden bg-zinc-950 pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-zinc-800">
      {/* Background subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top telemetry signal badge */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-semibold">LoopEdu Study Suite 2.4</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">Class 8, 9 & 10 Board Standards</span>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="text-center mt-6 max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            One complete platform.
            <br />
            <span className="text-zinc-400">Built for student mastery.</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Replace scattered apps and unranked question banks. LoopEdu combines an adaptive question bank, interactive concept mind maps, active recall flashcards, personal study coaching, and academic career pathing into one seamless workflow.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={isLoggedIn ? '/learn' : '/initialize'}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-mono font-bold text-sm transition shadow-lg flex items-center justify-center gap-2"
            >
              <span>{isLoggedIn ? 'Go to Workspace' : 'Start Free Practice'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/mind-maps"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white border border-zinc-800 font-mono text-sm transition flex items-center justify-center gap-2"
            >
              <GitBranch className="w-4 h-4 text-cyan-400" />
              <span>Explore Concept Mind Maps</span>
            </Link>
          </div>

          {/* Micro-features pill line */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>1,600+ Calibrated Questions</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>15 Minutes Daily Ceiling</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>NCERT / Board Verified</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Spaced Repetition Decks</span>
            </span>
          </div>
        </div>

        {/* Interactive 5-Pillar Product Showcase Deck */}
        <div className="mt-12 max-w-5xl mx-auto rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-2xl overflow-hidden">
          {/* Tab Navigation Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 border-b border-zinc-800 bg-zinc-950/80">
            {[
              { id: 'coach', label: 'Student Coach', icon: Activity, color: 'text-emerald-400' },
              { id: 'questions', label: 'Question Bank', icon: BookOpen, color: 'text-blue-400' },
              { id: 'mindmaps', label: 'Mind Maps', icon: GitBranch, color: 'text-cyan-400' },
              { id: 'flashcards', label: 'Flashcards', icon: RotateCcw, color: 'text-amber-400' },
              { id: 'advisory', label: 'Academic Advisory', icon: Compass, color: 'text-indigo-400' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`p-3.5 text-xs font-mono flex items-center justify-center gap-2 transition border-b-2 ${
                    isActive
                      ? 'bg-zinc-900 text-white font-bold border-zinc-200'
                      : 'text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-zinc-900/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${tab.color}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Screen Preview */}
          <div className="p-6 sm:p-8 bg-zinc-950 text-zinc-100 min-h-[380px]">
            {activeTab === 'coach' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono font-bold text-white">PERSONAL STUDY COACH</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">15-Minute Daily Session Active</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                      Targeted Guidance
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Socratic hints that lead you toward step-by-step solutions without giving away answers upfront.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                      Mistake Comeback Loop
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Identifies error root causes (formula oversight vs conceptual gap) and schedules 24-hour retries.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                      Fatigue Guard
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Maintains a strict 15-minute daily focus limit to maximize retention and prevent cognitive burnout.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Today’s Calibrated Session: 3 New Questions + 2 Spaced Retries</span>
                  <Link href="/study/cbse-10-science" className="text-emerald-400 font-bold hover:underline flex items-center gap-1">
                    <span>Launch Study Mode</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'questions' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-mono font-bold text-white">CALIBRATED QUESTION BANK</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">1,600 Verified Questions</span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      CBSE CLASS 10 • SCIENCE (CODE 086)
                    </span>
                    <span className="text-xs font-mono text-zinc-400">Bloom’s Taxonomy: Application</span>
                  </div>

                  <p className="text-sm font-semibold text-white">
                    A copper wire has diameter 0.5 mm and resistivity of 1.6 × 10⁻⁸ Ω·m. What will be the length of this wire to make its resistance 10 Ω? How much does the resistance change if the diameter is doubled?
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
                    <span>NCERT Reference: Ch 12 Example 12.5</span>
                    <Link href="/study/cbse-10-science" className="text-cyan-400 hover:underline">
                      Solve in Question Bank →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mindmaps' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono font-bold text-white">INTERACTIVE CONCEPT MIND MAPS</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">Visual Knowledge Hierarchy</span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span>Electricity & Circuits</span>
                    <span className="text-zinc-500">→</span>
                    <span className="text-cyan-300">Ohm’s Law & Resistance</span>
                  </div>

                  <div className="pl-4 border-l-2 border-zinc-700 space-y-2 text-zinc-300">
                    <div>├── V = I · R (Voltage directly proportional to Current at constant temp)</div>
                    <div>├── Factors: R = ρ · (L / A) [Length ↑ = R ↑ | Area ↑ = R ↓]</div>
                    <div>└── Resistivity (ρ): Material property (Ω·m), independent of dimensions</div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-zinc-400">
                    <span>18 Connected Subtopics Available</span>
                    <Link href="/mind-maps" className="text-cyan-400 font-bold hover:underline">
                      Open Full Mind Map →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'flashcards' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono font-bold text-white">ACTIVE RECALL FLASHCARDS</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">Leitner 5-Box Spaced Repetition</span>
                </div>

                <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
                  <span className="text-[10px] font-mono uppercase text-amber-400 block font-bold">
                    PROMPT (CLICK TO REVEAL SOLUTION)
                  </span>
                  <div className="text-sm font-semibold text-white">
                    According to Cartesian sign convention, what are the signs of focal length (f) for a Concave mirror vs a Convex mirror?
                  </div>
                  <div className="pt-2 text-xs font-mono text-zinc-400 flex items-center justify-between">
                    <span>Box 2 (Review every 3 days)</span>
                    <Link href="/flashcards" className="text-amber-400 font-bold hover:underline">
                      Launch Flashcard Player →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'advisory' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-mono font-bold text-white">ACADEMIC & CAREER ADVISORY</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">Objective Stream Pathfinding</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
                    <span className="text-cyan-400 font-bold block">Class 10 Stream Selection</span>
                    <p className="text-zinc-300">
                      Scientific evaluation for Science (PCM/PCB), Commerce with Math, and Humanities.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
                    <span className="text-indigo-400 font-bold block">Reverse Career Trajectories</span>
                    <p className="text-zinc-300">
                      From dream career (Software, Medicine, Corporate Law) back to today’s study priorities.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Milestone Radar: CBSE, ICSE, JEE & NEET Alignment</span>
                  <Link href="/consultant" className="text-indigo-400 font-bold hover:underline">
                    Open Academic Advisory →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
