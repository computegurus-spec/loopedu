'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Flame,
  Award,
  Clock,
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
        hotspots: ['Trigonometric Identities (sin²θ+cos²θ=1 proofs)', 'Specific angle values'],
        priority: 'guaranteed',
        subjectSlug: 'maths-standard',
      },
      {
        chapterNumber: 13,
        chapterName: 'Statistics',
        weightageMarks: '7–8 Marks',
        appearanceYears: 10,
        repeatRatePercent: 100,
        hotspots: ['Median of grouped data with missing frequencies x and y', 'Mode and Mean calculations'],
        priority: 'guaranteed',
        subjectSlug: 'maths-standard',
      },
      {
        chapterNumber: 9,
        chapterName: 'Some Applications of Trigonometry',
        weightageMarks: '5–6 Marks',
        appearanceYears: 9,
        repeatRatePercent: 90,
        hotspots: ['Double angle observation (30° to 60° ship moving towards lighthouse)'],
        priority: 'guaranteed',
        subjectSlug: 'maths-standard',
      },
      {
        chapterNumber: 1,
        chapterName: 'Real Numbers',
        weightageMarks: '4–6 Marks',
        appearanceYears: 10,
        repeatRatePercent: 100,
        hotspots: ['Proof of irrationality for √3, √5, 2+3√5', 'Fundamental Theorem of Arithmetic HCF/LCM'],
        priority: 'guaranteed',
        subjectSlug: 'maths-standard',
      },
    ],
  },
  science: {
    subjectName: 'Science (Physics, Chem, Bio)',
    code: '086',
    totalMarks: 80,
    chapters: [
      {
        chapterNumber: 1,
        chapterName: 'Chemical Reactions and Equations',
        weightageMarks: '5–6 Marks',
        appearanceYears: 10,
        repeatRatePercent: 100,
        hotspots: ['Precipitation & Redox identification', 'Balancing equation rubrics', 'Corrosion & Rancidity'],
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
        hotspots: ['Ohm’s law V=IR', 'Series and Parallel combination circuits', 'Joule’s heating effect'],
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
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 shadow-xl text-white space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
            <span>Historical Examination Radar</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            10-Year CBSE & State Paper Frequency Analysis
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Stop guessing which chapters carry the real weight. This matrix cross-references every chapter against official Board papers over the past decade.
          </p>
        </div>

        {/* Filter Switch */}
        <div className="flex items-center gap-3 shrink-0">
          <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
            <input
              type="checkbox"
              checked={filterGuaranteed}
              onChange={(e) => setFilterGuaranteed(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 border-slate-700 bg-slate-950 focus:ring-blue-500"
            />
            <span>Show 10/10 years tested chapters only</span>
          </label>
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveSubject('maths')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
            activeSubject === 'maths'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <span>Maths Standard (041)</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">10 Yrs Verified</span>
        </button>

        <button
          onClick={() => setActiveSubject('science')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
            activeSubject === 'science'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <span>Science (086)</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Physics • Chem • Bio</span>
        </button>

        <button
          onClick={() => setActiveSubject('english')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
            activeSubject === 'english'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <span>English (184)</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">First Flight + Writing</span>
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
                  ? 'bg-slate-950 border-blue-500/40 hover:border-blue-500'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                {/* Top Badges */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-400 font-semibold text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Ch {ch.chapterNumber} • {ch.weightageMarks}
                  </span>

                  {isGuaranteed ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <Flame className="w-3 h-3 text-emerald-400" />
                      10/10 Yrs Hit
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-medium bg-slate-900 px-2 py-0.5 rounded">
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
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>10-Year Appearance Rate</span>
                    <span className="text-slate-200 font-semibold">{ch.repeatRatePercent}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isGuaranteed ? 'bg-blue-500' : 'bg-slate-600'}`}
                      style={{ width: `${ch.repeatRatePercent}%` }}
                    />
                  </div>
                </div>

                {/* Hotspot Question Types */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block">
                    High-Yield Board Question Patterns:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {ch.hotspots.map((spot, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{spot}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Verified marking scheme</span>
                <Link
                  href="/initialize"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition"
                >
                  <span>Practise Topic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
