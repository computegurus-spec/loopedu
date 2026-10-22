'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  GitBranch,
  RotateCcw,
  Compass,
  Activity,
  ArrowRight,
  CheckCircle2,
  Search,
  ExternalLink,
} from 'lucide-react';

interface SaaSHeroProps {
  isLoggedIn?: boolean;
}

export const SaaSHero: React.FC<SaaSHeroProps> = ({ isLoggedIn }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'coach' | 'questions' | 'mindmaps' | 'flashcards' | 'advisory'>('coach');
  const [typedCourse, setTypedCourse] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedCourse.trim()) {
      router.push(`/initialize?q=${encodeURIComponent(typedCourse.trim())}`);
    } else {
      router.push('/initialize');
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-12 pb-16 sm:pt-18 sm:pb-24 border-b border-slate-800">
      {/* Background quiet grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Institutional Badge */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-white">LoopEdu Study Suite</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">CBSE, ICSE, State Boards & Competitive Entrance</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center mt-6 max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
            One complete study suite.
            <br />
            <span className="text-slate-400">Built for student mastery.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Eliminate fragmented apps and unranked question banks. LoopEdu brings together an adaptive question bank, interactive concept mind maps, active recall flashcards, personalized study coaching, and academic career pathing into one focused platform.
          </p>

          {/* REQUIREMENT 5: Direct search for any course or competitive exam right on the hero! */}
          <div className="max-w-xl mx-auto pt-2">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={typedCourse}
                onChange={(e) => setTypedCourse(e.target.value)}
                placeholder="Type any course or exam: JEE Main, NEET, CUET, Class 10 CBSE, Karnataka State..."
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl pl-12 pr-32 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-sm"
              >
                Start Practice →
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2.5 text-xs text-slate-400">
              <span className="text-slate-500 text-[11px]">Popular tracks:</span>
              {[
                { label: 'CBSE Class 10', q: 'CBSE Class 10' },
                { label: 'JEE Main Foundation', q: 'JEE Main' },
                { label: 'NEET-UG Biology', q: 'NEET' },
                { label: 'Karnataka State (KTBS)', q: 'Karnataka State' },
                { label: 'Maharashtra (Balbharati)', q: 'Maharashtra State' },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => router.push(`/initialize?q=${encodeURIComponent(item.q)}`)}
                  className="px-2.5 py-0.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] transition"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Micro-features pill line */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>1,600+ Calibrated Questions</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>15 Minutes Daily Ceiling</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Official Central Textbooks</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Leitner Spaced Repetition</span>
            </span>
          </div>
        </div>

        {/* Interactive 5-Pillar Product Showcase Deck (International SaaS Palette) */}
        <div id="features" className="mt-14 max-w-5xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
          {/* Tab Navigation Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 border-b border-slate-800 bg-slate-950/90">
            {[
              { id: 'coach', label: 'Study Coach', icon: Activity, color: 'text-emerald-400' },
              { id: 'questions', label: 'Question Bank', icon: BookOpen, color: 'text-blue-400' },
              { id: 'mindmaps', label: 'Concept Mind Maps', icon: GitBranch, color: 'text-cyan-400' },
              { id: 'flashcards', label: 'Active Recall', icon: RotateCcw, color: 'text-amber-400' },
              { id: 'advisory', label: 'Academic Advisory', icon: Compass, color: 'text-indigo-400' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`p-3.5 text-xs flex items-center justify-center gap-2 transition font-medium border-b-2 ${
                    isActive
                      ? 'bg-slate-900 text-white border-blue-500'
                      : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${tab.color}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Screen Preview */}
          <div className="p-6 sm:p-8 bg-slate-950 text-slate-100 min-h-[360px]">
            {activeTab === 'coach' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      Study Coach & Pacing Engine
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">15-Minute Daily Focus Ceiling</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <span className="text-xs font-semibold text-slate-200 block">Socratic Guidance</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Hints lead you through the problem step-by-step rather than giving away answers upfront.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <span className="text-xs font-semibold text-slate-200 block">Mistake Comeback</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Automatically schedules 24-hour retries for missed questions to turn weaknesses into strengths.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <span className="text-xs font-semibold text-slate-200 block">Burnout Prevention</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Enforces a strict 15-minute daily ceiling so you study with high focus without fatigue.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-300">Today’s Calibrated Session: 3 New Questions + 2 Spaced Retries</span>
                  <Link href="/initialize" className="text-blue-400 font-semibold hover:underline flex items-center gap-1">
                    <span>Try a Practice Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'questions' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      Calibrated Question Bank
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">1,600+ Official Board & Exam Questions</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 font-medium">
                      CBSE CLASS 10 • SCIENCE (CODE 086)
                    </span>
                    <span className="text-xs text-slate-400">Bloom’s Taxonomy: Application</span>
                  </div>

                  <p className="text-sm font-medium text-white leading-relaxed">
                    A copper wire has diameter 0.5 mm and resistivity of 1.6 × 10⁻⁸ Ω·m. What will be the length of this wire to make its resistance 10 Ω? How much does the resistance change if the diameter is doubled?
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                    <span>NCERT Reference: Ch 12 Example 12.5 (High Board Recurrence)</span>
                    <Link href="/initialize" className="text-blue-400 hover:underline font-medium">
                      Solve in Question Bank →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mindmaps' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      Interactive Concept Mind Maps
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">Visual Knowledge Hierarchy</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <span>Electricity & Circuits</span>
                    <span className="text-slate-500">→</span>
                    <span className="text-cyan-400">Ohm’s Law & Resistance</span>
                  </div>

                  <div className="pl-4 border-l-2 border-slate-700 space-y-2 text-slate-300">
                    <div>├── V = I · R (Voltage directly proportional to Current at constant temperature)</div>
                    <div>├── Factors: R = ρ · (L / A) [Length ↑ = Resistance ↑ | Area ↑ = Resistance ↓]</div>
                    <div>└── Resistivity (ρ): Material property (Ω·m), independent of physical dimensions</div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-slate-400">
                    <span>18 Connected Subtopics for Class 10 Science</span>
                    <Link href="/initialize" className="text-cyan-400 font-semibold hover:underline">
                      Explore Mind Maps →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'flashcards' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      Active Recall Flashcards
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">Leitner 5-Box Spaced Repetition</span>
                </div>

                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <span className="text-[11px] uppercase tracking-wider text-amber-400 block font-semibold">
                    Active Recall Prompt
                  </span>
                  <div className="text-sm font-medium text-white">
                    According to Cartesian sign convention, what are the signs of focal length (f) for a Concave mirror vs a Convex mirror?
                  </div>
                  <div className="pt-2 text-xs text-slate-400 flex items-center justify-between">
                    <span>Box 2 (Review scheduled in 3 days)</span>
                    <Link href="/initialize" className="text-amber-400 font-semibold hover:underline">
                      Launch Flashcard Player →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'advisory' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      Academic & Career Advisory
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">Objective Stream Selection</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <span className="text-blue-400 font-semibold block">Post-10th Stream Selection</span>
                    <p className="text-slate-300">
                      Scientific evaluation for Science (PCM/PCB), Commerce with Math, and Humanities based on your actual problem-solving speed and accuracy.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <span className="text-emerald-400 font-semibold block">Reverse Career Trajectories</span>
                    <p className="text-slate-300">
                      From dream career (Software, Medicine, Corporate Law, Quant Finance) mapped backward to today’s study priorities.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>Milestone Radar: CBSE, ICSE, JEE & NEET Alignment</span>
                  <Link href="/initialize" className="text-indigo-400 font-semibold hover:underline">
                    Access Academic Advisory →
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
