'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  Lock,
  Sparkles,
  Flame,
  Heart,
  Award,
  Download,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Star,
  FileText,
  Printer,
  ChevronRight,
  Eye,
  RotateCcw,
} from 'lucide-react';
import { MathRenderer } from '../MathRenderer';

interface PathNode {
  id: string;
  title: string;
  subtitle: string;
  durationMins: number;
  questionCount: number;
  status: 'completed' | 'active' | 'locked';
  score?: string;
  stars?: number;
}

interface Unit {
  id: string;
  unitNumber: number;
  title: string;
  chapterCoverage: string;
  status: 'completed' | 'in_progress' | 'locked';
  nodes: PathNode[];
  rewardPdf: {
    title: string;
    questionCount: number;
    yearsAnalyzed: string;
    downloadUrl?: string;
  };
}

const SAMPLE_UNITS: Unit[] = [
  {
    id: 'unit-1',
    unitNumber: 1,
    title: 'Unit 1: Number Systems & Polynomials',
    chapterCoverage: 'NCERT Ch 1: Real Numbers • Ch 2: Polynomials',
    status: 'completed',
    rewardPdf: {
      title: 'Real Numbers & Polynomials 10-Year Board Dossier',
      questionCount: 28,
      yearsAnalyzed: '2015–2025',
    },
    nodes: [
      {
        id: 'u1-n1',
        title: 'Fundamental Theorem of Arithmetic',
        subtitle: 'Prime factorisation, HCF × LCM theorem',
        durationMins: 12,
        questionCount: 5,
        status: 'completed',
        score: '5/5',
        stars: 3,
      },
      {
        id: 'u1-n2',
        title: 'Irrationality Proofs (Step Marking)',
        subtitle: 'Contradiction proof of √5, 3+2√5 (CBSE 3-markers)',
        durationMins: 15,
        questionCount: 5,
        status: 'completed',
        score: '5/5',
        stars: 3,
      },
      {
        id: 'u1-n3',
        title: 'Zeros of Quadratic Polynomials',
        subtitle: 'Relationship between roots and coefficients α+β',
        durationMins: 14,
        questionCount: 5,
        status: 'completed',
        score: '4/5',
        stars: 3,
      },
      {
        id: 'u1-n4',
        title: 'Unit 1 Boss Challenge',
        subtitle: 'Real board exam questions with negative traps',
        durationMins: 15,
        questionCount: 5,
        status: 'completed',
        score: '5/5',
        stars: 3,
      },
    ],
  },
  {
    id: 'unit-2',
    unitNumber: 2,
    title: 'Unit 2: Linear & Quadratic Equations',
    chapterCoverage: 'NCERT Ch 3: Pair of Linear Equations • Ch 4: Quadratic Equations',
    status: 'in_progress',
    rewardPdf: {
      title: 'Algebra Mastery: Linear & Quadratics 10-Year Board Dossier',
      questionCount: 35,
      yearsAnalyzed: '2015–2025',
    },
    nodes: [
      {
        id: 'u2-n1',
        title: 'Consistency & Graphical Method',
        subtitle: 'Intersecting, coincident, and parallel lines criteria',
        durationMins: 12,
        questionCount: 5,
        status: 'completed',
        score: '5/5',
        stars: 3,
      },
      {
        id: 'u2-n2',
        title: 'Roots of Quadratics by Factorisation',
        subtitle: 'Avoiding sign loss errors on exam sheets',
        durationMins: 15,
        questionCount: 5,
        status: 'completed',
        score: '4/5',
        stars: 2,
      },
      {
        id: 'u2-n3',
        title: 'Discriminant D & Nature of Roots',
        subtitle: 'Finding unknown parameter k for real and equal roots',
        durationMins: 15,
        questionCount: 5,
        status: 'active',
      },
      {
        id: 'u2-n4',
        title: 'Unit 2 Boss Challenge: Upstream/Downstream Word Problems',
        subtitle: 'High-frequency 5-mark CBSE board case studies',
        durationMins: 18,
        questionCount: 5,
        status: 'locked',
      },
    ],
  },
  {
    id: 'unit-3',
    unitNumber: 3,
    title: 'Unit 3: Triangles & Coordinate Geometry',
    chapterCoverage: 'NCERT Ch 6: Triangles • Ch 7: Coordinate Geometry',
    status: 'locked',
    rewardPdf: {
      title: 'Geometry & Coordinates 10-Year Board Dossier',
      questionCount: 32,
      yearsAnalyzed: '2015–2025',
    },
    nodes: [
      {
        id: 'u3-n1',
        title: 'Basic Proportionality Theorem (Thales)',
        subtitle: 'CBSE mandatory statement, construction, and proof',
        durationMins: 15,
        questionCount: 5,
        status: 'locked',
      },
      {
        id: 'u3-n2',
        title: 'Criteria for Similarity of Triangles',
        subtitle: 'AAA, SAS, SSS deductions with proper angle naming',
        durationMins: 15,
        questionCount: 5,
        status: 'locked',
      },
      {
        id: 'u3-n3',
        title: 'Distance Formula & Collinearity',
        subtitle: 'Equidistant point coordinates on x-axis and y-axis',
        durationMins: 12,
        questionCount: 5,
        status: 'locked',
      },
      {
        id: 'u3-n4',
        title: 'Section Formula & Ratios (k:1)',
        subtitle: 'Internal division coordinates and midpoint applications',
        durationMins: 15,
        questionCount: 5,
        status: 'locked',
      },
    ],
  },
  {
    id: 'unit-4',
    unitNumber: 4,
    title: 'Unit 4: Trigonometry & Applications',
    chapterCoverage: 'NCERT Ch 8: Intro to Trigonometry • Ch 9: Heights & Distances',
    status: 'locked',
    rewardPdf: {
      title: 'Trigonometry & Heights 10-Year Board Dossier',
      questionCount: 30,
      yearsAnalyzed: '2015–2025',
    },
    nodes: [
      {
        id: 'u4-n1',
        title: 'Standard Angle Values (0°, 30°, 45°, 60°, 90°)',
        subtitle: 'Exact value substitutions and mental shortcuts',
        durationMins: 12,
        questionCount: 5,
        status: 'locked',
      },
      {
        id: 'u4-n2',
        title: 'Trigonometric Identities Proofs',
        subtitle: 'Proving LHS = RHS using sin²θ + cos²θ = 1',
        durationMins: 15,
        questionCount: 5,
        status: 'locked',
      },
      {
        id: 'u4-n3',
        title: 'Heights & Distances (Single Angle)',
        subtitle: 'Tower shadow and observer elevation diagrams',
        durationMins: 15,
        questionCount: 5,
        status: 'locked',
      },
      {
        id: 'u4-n4',
        title: 'Two-Angle Elevation & Depression Case Studies',
        subtitle: 'CBSE 5-mark structured word problems',
        durationMins: 18,
        questionCount: 5,
        status: 'locked',
      },
    ],
  },
];

export const DuolingoPath: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('maths-standard');
  const [activeDossierModal, setActiveDossierModal] = useState<Unit | null>(null);

  // Position offsets for the winding curve
  const getOffsetClass = (index: number) => {
    const cycle = index % 4;
    if (cycle === 0) return 'translate-x-0';
    if (cycle === 1) return 'translate-x-12 sm:translate-x-20';
    if (cycle === 2) return 'translate-x-0';
    return '-translate-x-12 sm:-translate-x-20';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* 1. Duolingo HUD: Stats Bar */}
      <div className="sticky top-16 z-20 bg-paper/95 backdrop-blur-md border border-academic-border rounded-2xl p-3 sm:p-4 shadow-sm flex items-center justify-between gap-2">
        {/* Subject Selector */}
        <div>
          <label htmlFor="subject-select" className="sr-only">
            Select Subject
          </label>
          <select
            id="subject-select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="text-xs sm:text-sm font-serif font-bold bg-white border border-academic-border rounded-xl px-3 py-1.5 text-forest-950 focus:ring-2 focus:ring-forest-800 shadow-xs"
          >
            <option value="maths-standard">Maths Standard (041)</option>
            <option value="maths-basic">Maths Basic (241)</option>
            <option value="science">Science (086)</option>
            <option value="social-science">Social Science (087)</option>
            <option value="hindi-a">Hindi Course A (002)</option>
            <option value="english">English Communicative (101)</option>
            <option value="ai-417">Artificial Intelligence (417)</option>
          </select>
        </div>

        {/* Gamified HUD counters */}
        <div className="flex items-center gap-3 sm:gap-5 text-xs font-bold text-forest-950">
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200/80 px-2.5 py-1 rounded-full">
            <Flame className="w-4 h-4 text-amber-600 fill-amber-500 animate-pulse" />
            <span>7 Days</span>
          </div>

          <div className="flex items-center gap-1.5 bg-red-50 text-red-900 border border-red-200/80 px-2.5 py-1 rounded-full">
            <Heart className="w-4 h-4 text-red-600 fill-red-500" />
            <span>5 / 5</span>
          </div>

          <div className="flex items-center gap-1.5 bg-limeaccent/30 text-forest-950 border border-limeaccent px-2.5 py-1 rounded-full">
            <Award className="w-4 h-4 text-forest-800" />
            <span className="hidden xs:inline">1 Unlocked</span>
            <span className="xs:hidden">1 PDF</span>
          </div>
        </div>
      </div>

      {/* The Daily Five & Mistake Comeback Banner */}
      <div className="bg-forest-900 text-paper-100 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-forest-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-limeaccent text-forest-950 px-2 py-0.5 rounded">
              The Daily Five
            </span>
            <span className="text-xs text-forest-300">Morning Bite-Sized Routine</span>
          </div>
          <p className="text-xs text-paper-200">
            5 high-yield questions daily • Active recall Mistake Comeback (3d, 7d, 14d) • Finish unit to unlock 10-Yr Question Bank PDF
          </p>
        </div>
        <Link
          href="/parent"
          className="self-start sm:self-auto text-xs font-bold text-limeaccent hover:underline flex items-center gap-1 flex-shrink-0"
        >
          <span>Parent Hub</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 2. Units & Winding Path */}
      <div className="space-y-12">
        {SAMPLE_UNITS.map((unit) => {
          const isUnitCompleted = unit.status === 'completed';
          const isUnitInProgress = unit.status === 'in_progress';

          return (
            <section
              key={unit.id}
              className={`rounded-3xl border transition-all ${
                isUnitCompleted
                  ? 'bg-white/80 border-forest-200'
                  : isUnitInProgress
                  ? 'bg-white border-forest-800 shadow-md ring-2 ring-forest-900/5'
                  : 'bg-paper-100/50 border-academic-border/70 opacity-70'
              } p-4 sm:p-8`}
            >
              {/* Unit Header Banner */}
              <div
                className={`rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isUnitCompleted
                    ? 'bg-forest-900 text-white'
                    : isUnitInProgress
                    ? 'bg-forest-950 text-white'
                    : 'bg-paper-200 text-forest-800'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isUnitCompleted
                          ? 'bg-forest-800 text-limeaccent'
                          : isUnitInProgress
                          ? 'bg-limeaccent text-forest-950'
                          : 'bg-paper-300 text-forest-700'
                      }`}
                    >
                      Unit {unit.unitNumber}
                    </span>
                    <span className="text-xs opacity-75">• CBSE Class 10</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-serif font-bold mt-1">
                    {unit.title}
                  </h2>
                  <p className="text-xs opacity-80 mt-0.5">{unit.chapterCoverage}</p>
                </div>

                {/* Status indicator */}
                <div className="text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto">
                  {isUnitCompleted && (
                    <span className="inline-flex items-center gap-1 bg-limeaccent text-forest-950 px-2.5 py-1 rounded-full font-bold text-[11px]">
                      <Check className="w-3.5 h-3.5" /> Unit Mastered
                    </span>
                  )}
                  {isUnitInProgress && (
                    <span className="inline-flex items-center gap-1 bg-amber-400 text-forest-950 px-2.5 py-1 rounded-full font-bold text-[11px]">
                      <Sparkles className="w-3.5 h-3.5" /> In Progress
                    </span>
                  )}
                  {unit.status === 'locked' && (
                    <span className="inline-flex items-center gap-1 text-forest-600 bg-paper-300 px-2.5 py-1 rounded-full text-[11px]">
                      <Lock className="w-3 h-3" /> Complete Unit 2 to Unlock
                    </span>
                  )}
                </div>
              </div>

              {/* Path of Stepping Stones */}
              <div className="relative py-4 flex flex-col items-center space-y-7">
                {/* Visual Dotted Central Guideline */}
                <div className="absolute top-0 bottom-16 w-0.5 border-r-2 border-dashed border-forest-300/80 -z-0" />

                {unit.nodes.map((node, nodeIdx) => {
                  const offsetClass = getOffsetClass(nodeIdx);

                  return (
                    <div
                      key={node.id}
                      className={`relative z-10 flex flex-col items-center transition-transform duration-200 ${offsetClass}`}
                    >
                      {/* Node Button */}
                      {node.status === 'completed' ? (
                        <div className="group relative flex flex-col items-center">
                          <button
                            className="w-16 h-16 rounded-full bg-forest-900 hover:bg-forest-800 text-limeaccent border-4 border-paper shadow-md flex items-center justify-center transition transform group-hover:scale-105"
                            aria-label={`${node.title} - Completed`}
                          >
                            <Check className="w-8 h-8 stroke-[3]" />
                          </button>
                          {/* Stars */}
                          <div className="flex items-center gap-0.5 -mt-2 bg-white border border-academic-border px-1.5 py-0.5 rounded-full shadow-xs">
                            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
                            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
                            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
                          </div>
                          {/* Title Tooltip */}
                          <div className="mt-1 text-center max-w-[150px]">
                            <div className="text-xs font-semibold text-forest-950 truncate">
                              {node.title}
                            </div>
                            <div className="text-[10px] text-academic-subtle font-mono">
                              Mastered ({node.score})
                            </div>
                          </div>
                        </div>
                      ) : node.status === 'active' ? (
                        <div className="group relative flex flex-col items-center">
                          {/* Pulsing Target Ring */}
                          <div className="absolute -inset-2 rounded-full bg-limeaccent/50 animate-ping opacity-75" />

                          <Link
                            href="/challenge"
                            className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-limeaccent hover:bg-limeaccent-hover text-forest-950 border-4 border-white shadow-xl flex flex-col items-center justify-center transition transform group-hover:scale-110"
                            aria-label={`${node.title} - Active. Click to start practice`}
                          >
                            <Sparkles className="w-7 h-7 text-forest-950 animate-bounce" />
                            <span className="text-[10px] font-extrabold uppercase tracking-tight mt-0.5">
                              START
                            </span>
                          </Link>

                          {/* Active Callout Balloon */}
                          <div className="mt-2 text-center bg-forest-950 text-white px-3 py-1.5 rounded-xl shadow-lg border border-forest-800 max-w-[180px] animate-in fade-in zoom-in-95">
                            <div className="text-[10px] uppercase font-bold text-limeaccent tracking-wider">
                              Today&apos;s 15-Min Step
                            </div>
                            <div className="text-xs font-bold leading-tight mt-0.5">
                              {node.title}
                            </div>
                            <div className="text-[10px] text-forest-300 mt-0.5">
                              {node.questionCount} Questions • 15 mins
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center opacity-60">
                          <div
                            className="w-14 h-14 rounded-full bg-paper-200 border-2 border-academic-border text-forest-500 flex items-center justify-center"
                            aria-label={`${node.title} - Locked`}
                          >
                            <Lock className="w-5 h-5" />
                          </div>
                          <div className="mt-1 text-center max-w-[130px]">
                            <div className="text-[11px] font-medium text-forest-700 truncate">
                              {node.title}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* 3. The Milestone Trophy: Unlocked Chapter Question Bank PDF */}
                <div className="relative z-10 pt-4 flex flex-col items-center w-full">
                  <div
                    className={`w-full max-w-md rounded-2xl p-4 sm:p-5 border transition-all ${
                      isUnitCompleted
                        ? 'bg-amber-50/90 border-amber-300 shadow-md ring-1 ring-amber-400'
                        : 'bg-paper-100/60 border-academic-border text-academic-subtle'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0 ${
                            isUnitCompleted
                              ? 'bg-amber-500 text-white shadow-sm'
                              : 'bg-paper-200 text-forest-400'
                          }`}
                        >
                          🎁
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                              Unit Milestone Reward
                            </span>
                            {isUnitCompleted && (
                              <span className="bg-amber-200 text-amber-900 text-[9px] font-bold px-1.5 py-0.2 rounded">
                                UNLOCKED
                              </span>
                            )}
                          </div>
                          <h3 className="text-xs sm:text-sm font-serif font-bold text-forest-950 mt-0.5">
                            {unit.rewardPdf.title}
                          </h3>
                          <p className="text-[11px] text-academic-subtle mt-0.5">
                            {unit.rewardPdf.questionCount} Curated 10-Year Board Questions ({unit.rewardPdf.yearsAnalyzed}) with Step-by-Step Marking
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-amber-200/60 flex items-center justify-between">
                      <span className="text-[11px] text-forest-800">
                        {isUnitCompleted
                          ? '✅ Unlocked! Save, study, or print for board exam revision.'
                          : '🔒 Master all 4 stepping stones in this unit to unlock.'}
                      </span>

                      {isUnitCompleted ? (
                        <button
                          onClick={() => setActiveDossierModal(unit)}
                          className="inline-flex items-center gap-1.5 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold px-3 py-1.5 rounded-lg text-xs transition shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Get Free PDF</span>
                        </button>
                      ) : (
                        <span className="text-xs text-academic-subtle font-medium">Locked</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 3. Milestone Dossier Modal (Printable/Downloadable Question Bank PDF View) */}
      {activeDossierModal && (
        <div className="fixed inset-0 z-50 bg-forest-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-academic-border animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="bg-forest-950 text-white p-4 sm:p-5 rounded-t-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-limeaccent uppercase tracking-wider">
                  Earned Milestone Reward • Unit Completed
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white mt-0.5">
                  {activeDossierModal.rewardPdf.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveDossierModal(null)}
                className="text-forest-400 hover:text-white p-1 rounded-md"
              >
                ✕
              </button>
            </div>

            {/* Modal Content / Preview */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs text-forest-900 leading-relaxed">
              <div className="rounded-xl bg-forest-50 border border-forest-200 p-3.5 space-y-1">
                <div className="font-bold text-forest-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-forest-700" />
                  <span>Personal Study License Watermark</span>
                </div>
                <p className="text-[11px] text-forest-800">
                  Licensed to: <strong>Class 10 CBSE Student (2026–2027)</strong> • LoopEdu (loopedu.in) • a product of itappens.ai | Blocks and Loops technologies pvt ltd.
                  Prepared with 10 years of CBSE board examination questions (2015–2025).
                </p>
              </div>

              <div className="border border-academic-border rounded-xl p-4 bg-paper-50 space-y-3 font-serif">
                <h4 className="text-sm font-bold text-forest-950 border-b border-academic-border pb-2">
                  Sample Content Preview (Page 1 of 8)
                </h4>

                <div className="space-y-2">
                  <div className="font-sans font-bold text-[11px] text-forest-800 uppercase">
                    Q1. (CBSE 2024, 2022, 2019 • 3 Marks • NCERT Exemplar)
                  </div>
                  <div className="text-sm text-forest-950 font-serif">
                    <MathRenderer content="Prove that $\sqrt{5}$ is an irrational number using the method of contradiction." />
                  </div>
                  <div className="font-sans text-[11px] bg-white p-2.5 rounded border border-academic-border/70 space-y-1">
                    <strong className="text-forest-900">Official CBSE Marking Rubric:</strong>
                    <ol className="list-decimal pl-4 space-y-1 text-forest-800">
                      <li>
                        <MathRenderer content="Let $\sqrt{5} = \frac{a}{b}$, where $a, b$ are co-prime integers ($b \neq 0$). [0.5 mark]" />
                      </li>
                      <li>
                        <MathRenderer content="Squaring both sides: $5b^2 = a^2 \implies 5 \mid a^2 \implies 5 \mid a$. [1 mark]" />
                      </li>
                      <li>
                        <MathRenderer content="Let $a = 5c$. Then $5b^2 = 25c^2 \implies b^2 = 5c^2 \implies 5 \mid b$. [1 mark]" />
                      </li>
                      <li>
                        <MathRenderer content="Hence $5$ is a common factor of both $a$ and $b$, contradicting co-prime assumption. [0.5 mark]" />
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-academic-border/60">
                  <div className="font-sans font-bold text-[11px] text-forest-800 uppercase">
                    Q2. (CBSE 2023, 2018 • 2 Marks)
                  </div>
                  <p className="text-sm text-forest-950">
                    Find the HCF and LCM of 72 and 120 using the Fundamental Theorem of Arithmetic.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-paper-100 rounded-b-2xl border-t border-academic-border flex items-center justify-between">
              <span className="text-[11px] text-academic-subtle">
                PDF Ready • {activeDossierModal.rewardPdf.questionCount} Questions with Step-Marking
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-academic-border bg-white text-forest-900 text-xs font-semibold hover:bg-forest-50"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => {
                    alert('Your customized chapter question bank dossier is generating and downloading!');
                    setActiveDossierModal(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-limeaccent text-xs font-bold shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Practice PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
