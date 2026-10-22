'use client';

import React from 'react';
import Link from 'next/link';
import {
  Activity,
  BookOpen,
  GitBranch,
  RotateCcw,
  Compass,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const FivePillarsSection: React.FC = () => {
  const pillars = [
    {
      id: 'coach',
      title: 'Student Study Coach',
      tagline: 'Socratic guidance, error analysis, and 15-minute daily focus loops.',
      icon: Activity,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      link: '/initialize',
      cta: 'Explore Study Coach',
      highlights: [
        'Socratic hints that guide without revealing full answers',
        'Automatic 24-hour retry scheduling for missed questions',
        'Strict 15-minute daily focus ceiling to prevent burnout',
      ],
    },
    {
      id: 'questions',
      title: 'Adaptive Question Bank',
      tagline: '1,600+ official board-calibrated questions across CBSE, ICSE & State Boards.',
      icon: BookOpen,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      link: '/initialize',
      cta: 'Explore Question Bank',
      highlights: [
        'Tagged with Bloom’s Taxonomy and NCERT page citations',
        '10-year board recurrence heatmaps (2017–2026)',
        'Step-by-step marking rubrics with distractor explanations',
      ],
    },
    {
      id: 'mindmaps',
      title: 'Interactive Mind Maps',
      tagline: 'Visual knowledge trees showing concept hierarchy and prerequisites.',
      icon: GitBranch,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
      link: '/initialize',
      cta: 'Explore Mind Maps',
      highlights: [
        'Expandable subtopic nodes color-coded by mastery level',
        'Embedded mathematical formulas and theorem definitions',
        '1-click jump from any node directly into targeted practice',
      ],
    },
    {
      id: 'flashcards',
      title: 'Active Recall Flashcards',
      tagline: 'Leitner 5-box spaced repetition decks for long-term memory consolidation.',
      icon: RotateCcw,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      link: '/initialize',
      cta: 'Explore Flashcards',
      highlights: [
        'Interactive card flip with keyboard shortcuts (Space / 1-4)',
        'Automated review intervals (10m, 1d, 3d, 7d)',
        'Exam trap warnings and sign convention reminders',
      ],
    },
    {
      id: 'advisory',
      title: 'Academic & Career Consultant',
      tagline: 'Data-driven stream selection after Class 10 and reverse career engineering.',
      icon: Compass,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      link: '/initialize',
      cta: 'Explore Advisory',
      highlights: [
        'Objective stream evaluations: Science PCM/PCB, Commerce, Humanities',
        'Reverse career roadmaps (Engineering, Medicine, Law, Finance)',
        'National board and entrance exam milestone radar',
      ],
    },
  ];

  return (
    <section className="py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            THE INTEGRATED SYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Five core capabilities. One seamless workspace.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Every tool is designed to work together. A mistake in the question bank automatically schedules a flashcard, highlights the concept on your mind map, and alerts your study coach.
          </p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between group shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-xl ${pillar.bgColor} ${pillar.borderColor} border flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 ${pillar.color}`} />
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">Core Module</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-slate-100 transition">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{pillar.tagline}</p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                    {pillar.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800">
                  <Link
                    href={pillar.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition"
                  >
                    <span>{pillar.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
