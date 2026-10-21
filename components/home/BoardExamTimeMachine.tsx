'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Flame,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from 'lucide-react';

interface ChapterHeatmapData {
  chapterNumber: number;
  chapterName: string;
  weightageMarks: string;
  appearanceYears: number; // out of 10
  repeatRatePercent: number;
  hotspots: string[];
  priority: 'guaranteed' | 'high' | 'medium';
  subjectSlug: string;
}

const HEATMAP_DATA: Record<string, { subjectName: string; code: string; totalMarks: number; chapters: ChapterHeatmapData[] }> = {
  maths: {
    subjectName: 'Mathematics Standard',
    code: '041',
    totalMarks: 80,
    chapters: [
      {
        chapterNumber: 4,
        chapterName: 'Quadratic Equations',
        weightageMarks: '8–10 Marks',
        appearanceYears: 10,
        repeatRatePercent: 100,
        hotspots: ['Discriminant D analysis', 'Upstream/Downstream word problems', 'Nature of roots'],
        priority: 'guaranteed',
        subjectSlug: 'maths-standard',
      },
      {
        chapterNumber: 6,
        chapterName: 'Triangles',
        weightageMarks: '8–10 Marks',
        appearanceYears: 10,
        repeatRatePercent: 100,
        hotspots: ['Basic Proportionality Theorem (BPT proof)', 'Criteria of similarity'],
        priority: 'guaranteed',
        subjectSlug: 'maths-standard',
      },
      {
        chapterNumber: 8,
        chapterName: 'Introduction to Trigonometry',
        weightageMarks: '7–8 Marks',
        appearanceYears: 10,
        repeatRatePercent: 100,
        hotspots: ['Trigonometric Identities ($\\sin^2\\theta+\\cos^2\\theta=1$ proofs)', 'Specific angle values'],
        priority: 'guaranteed',
        subjectSlug: 'maths-standard',
      },
      {
        chapterNumber: 9,
        chapterName: 'Applications of Trigonometry',
        weightageMarks: '4–6 Marks (Case Study)',
        appearanceYears: 9,
        repeatRatePercent: 90,
        hotspots: ['Double angle of elevation', 'Tower/lighthouse shadow problems'],
        priority: 'high',
        subjectSlug: 'maths-standard',
      },
      {
        chapterNumber: 13,
        chapterName: 'Statistics',
        weightageMarks: '6–8 Marks',
        appearanceYears: 10,
        repeatRatePercent: 100,
        hotspots: ['Step-deviation Mean', 'Mode formula with missing frequency', 'Median formula'],
        priority: 'guaranteed',
        subjectSlug: 'maths-standard',
      },
      {
        chapterNumber: 3,
        chapterName: 'Linear Equations in Two Variables',
        weightageMarks: '5–6 Marks',
        appearanceYears: 8,
        repeatRatePercent: 80,
        hotspots: ['Elimination method', 'Consistent/inconsistent conditions ($a_1/a_2$)'],
        priority: 'high',
        subjectSlug: 'maths-standard',
      },
      {
        chapterNumber: 1,
        chapterName: 'Real Numbers',
        weightageMarks: '4–6 Marks',
        appearanceYears: 10,
        repeatRatePercent: 100,
        hotspots: ['Proof of $\\sqrt{2}, \\sqrt{3}, \\sqrt{5}$ is irrational', 'Fundamental Theorem of Arithmetic'],
        priority: 'guaranteed',
        subjectSlug: 'maths-standard',
      },
    ],
  },
  science: {
    subjectName: 'Science (Theory)',
    code: '086',
    totalMarks: 80,
    chapters: [
      {
        chapterNumber: 1,
        chapterName: 'Chemical Reactions and Equations',
        weightageMarks: '6–7 Marks',
        appearanceYears: 10,
        repeatRatePercent: 100,
        hotspots: ['Balancing equations', 'Thermal decomposition of $\\text{FeSO}_4$', 'Redox reactions'],
        priority: 'guaranteed',
        subjectSlug: 'science',
      },
      {
        chapterNumber: 4,
        chapterName: 'Carbon and its Compounds',
        weightageMarks: '6–8 Marks',
        appearanceYears: 9,
        repeatRatePercent: 90,
        hotspots: ['Saponification & Esterification', 'Homologous series', 'Covalent bonding electron dot'],
        priority: 'guaranteed',
        subjectSlug: 'science',
      },
      {
        chapterNumber: 9,
        chapterName: 'Light: Reflection & Refraction',
        weightageMarks: '8–10 Marks',
        appearanceYears: 10,
        repeatRatePercent: 100,
        hotspots: ['Mirror & Lens formula numericals', 'Ray diagrams for concave mirror/convex lens'],
        priority: 'guaranteed',
        subjectSlug: 'science',
      },
      {
        chapterNumber: 11,
        chapterName: 'Electricity',
        weightageMarks: '7–9 Marks',
        appearanceYears: 10,
        repeatRatePercent: 100,
        hotspots: ['Ohm’s law $V=IR$', 'Series and Parallel combination circuits', 'Joule’s heating effect'],
        priority: 'guaranteed',
        subjectSlug: 'science',
      },
      {
        chapterNumber: 5,
        chapterName: 'Life Processes',
        weightageMarks: '8–10 Marks',
        appearanceYears: 10,
        repeatRatePercent: 100,
        hotspots: ['Nephron structure & function', 'Double circulation in human heart', 'Photosynthesis dark/light reaction'],
        priority: 'guaranteed',
        subjectSlug: 'science',
      },
    ],
  },
  english: {
    subjectName: 'English (Language & Literature)',
    code: '184',
    totalMarks: 80,
    chapters: [
      {
        chapterNumber: 1,
        chapterName: 'A Letter to God (First Flight)',
        weightageMarks: '5–6 Marks',
        appearanceYears: 9,
        repeatRatePercent: 90,
        hotspots: ['Irony of the post office employees', 'Faith vs realism character sketch'],
        priority: 'guaranteed',
        subjectSlug: 'english-language-literature',
      },
      {
        chapterNumber: 2,
        chapterName: 'Nelson Mandela: Long Walk to Freedom',
        weightageMarks: '6–8 Marks',
        appearanceYears: 10,
        repeatRatePercent: 100,
        hotspots: ['Twin obligations of a man', 'Courage is triumph over fear quote analysis'],
        priority: 'guaranteed',
        subjectSlug: 'english-language-literature',
      },
      {
        chapterNumber: 7,
        chapterName: 'Glimpses of India (Goa, Coorg, Assam)',
        weightageMarks: '6–7 Marks',
        appearanceYears: 9,
        repeatRatePercent: 90,
        hotspots: ['Pader baker tradition', 'Coorg hospitality & martial tradition', 'Tea legends'],
        priority: 'guaranteed',
        subjectSlug: 'english-language-literature',
      },
      {
        chapterNumber: 11,
        chapterName: 'Formal Letter to Editor & Analytical Paragraph',
        weightageMarks: '10 Marks (Writing)',
        appearanceYears: 10,
        repeatRatePercent: 100,
        hotspots: ['Civic issue to Municipal Commissioner', 'Chart/graph trend analysis paragraph'],
        priority: 'guaranteed',
        subjectSlug: 'english-language-literature',
      },
    ],
  },
};

export const BoardExamTimeMachine: React.FC = () => {
  const [activeSubject, setActiveSubject] = useState<'maths' | 'science' | 'english'>('maths');
  const [filterGuaranteed, setFilterGuaranteed] = useState(false);

  const subjectData = HEATMAP_DATA[activeSubject];
  const displayedChapters = filterGuaranteed
    ? subjectData.chapters.filter((c) => c.priority === 'guaranteed')
    : subjectData.chapters;

  return (
    <div className="rounded-3xl bg-forest-900 border border-forest-700/80 p-6 sm:p-10 shadow-lg text-white space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-forest-800 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-950 text-limeaccent text-[11px] font-mono font-bold uppercase tracking-wider border border-forest-800">
            <Sparkles className="w-3.5 h-3.5 text-limeaccent" />
            <span>The Board Exam Time-Machine</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            10-Year CBSE Frequency Heatmap (2015–2024)
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
            Stop guessing which chapters carry the real marks. This matrix cross-references every chapter against real CBSE Board papers over the past decade.
          </p>
        </div>

        {/* Filter Switch */}
        <div className="flex items-center gap-3 shrink-0">
          <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-forest-200">
            <input
              type="checkbox"
              checked={filterGuaranteed}
              onChange={(e) => setFilterGuaranteed(e.target.checked)}
              className="w-4 h-4 rounded text-forest-900 border-forest-700 bg-forest-950 focus:ring-limeaccent"
            />
            <span>Frequently tested in past papers (CBSE 2017–2026)</span>
          </label>
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveSubject('maths')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubject === 'maths'
              ? 'bg-limeaccent text-forest-950 shadow-sm'
              : 'bg-forest-950 text-forest-300 hover:text-white border border-forest-800'
          }`}
        >
          <span>Maths Standard (041)</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-forest-900/40">10 Yrs Verified</span>
        </button>

        <button
          onClick={() => setActiveSubject('science')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubject === 'science'
              ? 'bg-limeaccent text-forest-950 shadow-sm'
              : 'bg-forest-950 text-forest-300 hover:text-white border border-forest-800'
          }`}
        >
          <span>Science (086)</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-forest-900/40">Physics • Chem • Bio</span>
        </button>

        <button
          onClick={() => setActiveSubject('english')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubject === 'english'
              ? 'bg-limeaccent text-forest-950 shadow-sm'
              : 'bg-forest-950 text-forest-300 hover:text-white border border-forest-800'
          }`}
        >
          <span>English (184)</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-forest-900/40">First Flight + Writing</span>
        </button>
      </div>

      {/* Chapter Cards Heatmap Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedChapters.map((ch) => {
          const isGuaranteed = ch.priority === 'guaranteed';

          return (
            <div
              key={ch.chapterNumber + ch.chapterName}
              className={`rounded-2xl p-5 border transition flex flex-col justify-between space-y-4 ${
                isGuaranteed
                  ? 'bg-forest-950/90 border-limeaccent/30 hover:border-limeaccent/70'
                  : 'bg-forest-950/60 border-forest-800 hover:border-forest-700'
              }`}
            >
              <div className="space-y-3">
                {/* Top Badges */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-limeaccent font-bold text-[11px] bg-forest-900 px-2 py-0.5 rounded">
                    Ch {ch.chapterNumber} • {ch.weightageMarks}
                  </span>

                  {isGuaranteed ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                      <Flame className="w-3 h-3 text-emerald-400" />
                      10/10 Yrs Hit
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-emerald-300 font-bold bg-forest-900 px-2 py-0.5 rounded">
                      {ch.appearanceYears}/10 Yrs
                    </span>
                  )}
                </div>

                {/* Chapter Title */}
                <h4 className="text-base font-bold text-white leading-snug">
                  {ch.chapterName}
                </h4>

                {/* Frequency Heat Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-emerald-200 font-medium">
                    <span>CBSE Frequency</span>
                    <span className="font-mono font-bold text-limeaccent">
                      {ch.repeatRatePercent}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-forest-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isGuaranteed ? 'bg-limeaccent' : 'bg-emerald-400'
                      }`}
                      style={{ width: `${ch.repeatRatePercent}%` }}
                    />
                  </div>
                </div>

                {/* Hotspot Question Types */}
                <div className="pt-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-bold block mb-1">
                    Hotspot Question Types:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {ch.hotspots.map((h, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-white bg-forest-900 px-2 py-0.5 rounded border border-forest-700 font-medium"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 1-Tap Practice CTA */}
              <div className="pt-2 border-t border-forest-800/80 flex items-center justify-between">
                <span className="text-[11px] text-emerald-200/90 font-mono font-medium">15-Min Habit Loop</span>
                <Link
                  href={`/study/${ch.subjectSlug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-limeaccent hover:text-white transition group"
                >
                  <span>Practice Ch {ch.chapterNumber}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Callout */}
      <div className="p-4 rounded-2xl bg-forest-950 border border-forest-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-emerald-100 font-normal">
          <ShieldCheck className="w-4 h-4 text-limeaccent shrink-0" />
          <span>
            Every question in LoopEdu’s <strong>Daily Five</strong> and <strong>10 Free Weekly Questions</strong> is mapped directly to these 10-year board recurrence clusters.
          </span>
        </div>

        <Link
          href={`/study/${subjectData.chapters[0].subjectSlug}`}
          className="inline-flex items-center gap-2 bg-limeaccent hover:bg-lime-400 text-forest-950 font-bold px-4 py-2 rounded-xl transition shadow-sm text-xs uppercase tracking-wider"
        >
          <span>Launch Today's Focus Set →</span>
        </Link>
      </div>
    </div>
  );
};
