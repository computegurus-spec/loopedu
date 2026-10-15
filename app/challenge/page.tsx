'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MathRenderer } from '@/components/MathRenderer';
import { AIHintCoach } from '@/components/study/AIHintCoach';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Award,
  ChevronRight,
  Check,
} from 'lucide-react';

interface ChallengeQuestion {
  id: string;
  subjectSlug: string;
  subjectName: string;
  topic: string;
  concept: string;
  marks: number;
  question: string;
  type: 'mcq' | 'written';
  options?: string[];
  correctOptionIndex?: number;
  answer: string;
  explanation: string;
  source: string;
}

const CHALLENGE_BANKS: Record<string, { name: string; questions: ChallengeQuestion[] }> = {
  science: {
    name: 'Science',
    questions: [
      {
        id: 'SC-C01',
        subjectSlug: 'science',
        subjectName: 'Science',
        topic: 'Chemical Reactions and Equations',
        concept: 'Exothermic Biological Reactions',
        marks: 2,
        type: 'written',
        question: 'Why is respiration considered an exothermic reaction? Write the balanced chemical equation.',
        answer: 'Respiration releases metabolic heat energy by breaking down glucose: $\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\rightarrow 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{Energy}$.',
        explanation: 'During cellular respiration, glucose reacts with inhaled oxygen in the mitochondria to produce carbon dioxide, water, and biochemical ATP energy. Because energy is liberated to the surroundings, it is categorized as exothermic.',
        source: 'NCERT Science Class X, Chapter 1',
      },
      {
        id: 'SC-C02',
        subjectSlug: 'science',
        subjectName: 'Science',
        topic: 'Electricity',
        concept: "Ohm's Law & Circuit Equivalent Resistance",
        marks: 1,
        type: 'mcq',
        question: 'Two resistors of $4\\,\\Omega$ and $12\\,\\Omega$ are connected in parallel. What is the equivalent resistance of the combination?',
        options: ['$16\\,\\Omega$', '$8\\,\\Omega$', '$3\\,\\Omega$', '$0.33\\,\\Omega$'],
        correctOptionIndex: 2,
        answer: '$3\\,\\Omega$',
        explanation: 'For parallel circuits: $\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} = \\frac{1}{4} + \\frac{1}{12} = \\frac{3 + 1}{12} = \\frac{4}{12} = \\frac{1}{3}$. Thus $R_p = 3\\,\\Omega$.',
        source: 'NCERT Science Class X, Chapter 11 (Electricity)',
      },
      {
        id: 'SC-C03',
        subjectSlug: 'science',
        subjectName: 'Science',
        topic: 'Acids, Bases and Salts',
        concept: 'Chlor-Alkali Process Byproducts',
        marks: 1,
        type: 'mcq',
        question: 'Which gas is liberated at the anode during the electrolysis of aqueous sodium chloride (brine)?',
        options: ['Hydrogen gas ($\\text{H}_2$)', 'Chlorine gas ($\\text{Cl}_2$)', 'Oxygen gas ($\\text{O}_2$)', 'Nitrogen gas ($\\text{N}_2$)'],
        correctOptionIndex: 1,
        answer: 'Chlorine gas ($\\text{Cl}_2$)',
        explanation: 'In the Chlor-Alkali process: Chlorine gas ($\\text{Cl}_2$) is liberated at the positively charged anode, while Hydrogen gas ($\\text{H}_2$) is collected at the cathode, leaving $\\text{NaOH}$ in solution.',
        source: 'NCERT Science Class X, Chapter 2',
      },
      {
        id: 'SC-C04',
        subjectSlug: 'science',
        subjectName: 'Science',
        topic: 'Light - Reflection and Refraction',
        concept: 'Concave Mirror Focal Properties',
        marks: 2,
        type: 'written',
        question: 'A concave mirror produces an inverted, real image three times larger than the object placed at $10\\,\\text{cm}$ in front of it. Find the image position.',
        answer: '$v = -30\\,\\text{cm}$ in front of the mirror.',
        explanation: 'Magnification for real inverted image $m = -3$. Since $m = -\\frac{v}{u}$, we have $-3 = -\\frac{v}{-10} \\implies -3 = \\frac{v}{10} \\implies v = -30\\,\\text{cm}$. The image forms $30\\,\\text{cm}$ in front of the reflecting surface.',
        source: 'NCERT Science Class X, Chapter 9',
      },
      {
        id: 'SC-C05',
        subjectSlug: 'science',
        subjectName: 'Science',
        topic: 'Life Processes',
        concept: 'Stomatal Regulation by Guard Cells',
        marks: 1,
        type: 'mcq',
        question: 'The opening and closing of the stomatal pore is primarily regulated by:',
        options: ['Atmospheric pressure', 'Turgidity of guard cells', 'Temperature of the leaf cuticle', 'Chlorophyll concentration'],
        correctOptionIndex: 1,
        answer: 'Turgidity of guard cells',
        explanation: 'Guard cells swell when water flows into them, causing the stomatal pore to open. When guard cells lose water and shrink, the pore closes to conserve moisture.',
        source: 'NCERT Science Class X, Chapter 5',
      },
    ],
  },
  'maths-standard': {
    name: 'Mathematics (Standard)',
    questions: [
      {
        id: 'MS-C01',
        subjectSlug: 'maths-standard',
        subjectName: 'Mathematics (Standard)',
        topic: 'Quadratic Equations',
        concept: 'Nature of Roots & Discriminant',
        marks: 2,
        type: 'written',
        question: 'Find the values of $k$ for which the quadratic equation $2x^2 + kx + 3 = 0$ has two equal real roots.',
        answer: '$k = \\pm 2\\sqrt{6}$.',
        explanation: 'For equal real roots, the discriminant $D = b^2 - 4ac = 0$. Here $a=2, b=k, c=3$. $D = k^2 - 4(2)(3) = k^2 - 24 = 0 \\implies k^2 = 24 \\implies k = \\pm \\sqrt{24} = \\pm 2\\sqrt{6}$.',
        source: 'NCERT Mathematics Class X, Chapter 4',
      },
      {
        id: 'MS-C02',
        subjectSlug: 'maths-standard',
        subjectName: 'Mathematics (Standard)',
        topic: 'Arithmetic Progressions',
        concept: 'Sum of First n Terms',
        marks: 1,
        type: 'mcq',
        question: 'If the $n$-th term of an AP is $a_n = 3 + 4n$, what is the common difference $d$?',
        options: ['$3$', '$4$', '$7$', '$12$'],
        correctOptionIndex: 1,
        answer: '$4$',
        explanation: '$a_1 = 3 + 4(1) = 7$. $a_2 = 3 + 4(2) = 11$. Common difference $d = a_2 - a_1 = 11 - 7 = 4$.',
        source: 'NCERT Mathematics Class X, Chapter 5',
      },
      {
        id: 'MS-C03',
        subjectSlug: 'maths-standard',
        subjectName: 'Mathematics (Standard)',
        topic: 'Trigonometry',
        concept: 'Trigonometric Identities',
        marks: 1,
        type: 'mcq',
        question: 'Evaluate: $\\frac{1 + \\tan^2 A}{1 + \\cot^2 A}$ is identically equal to:',
        options: ['$\\sec^2 A$', '$-1$', '$\\cot^2 A$', '$\\tan^2 A$'],
        correctOptionIndex: 3,
        answer: '$\\tan^2 A$',
        explanation: 'Using standard identities: $1 + \\tan^2 A = \\sec^2 A$ and $1 + \\cot^2 A = \\csc^2 A$. Then $\\frac{\\sec^2 A}{\\csc^2 A} = \\frac{1/\\cos^2 A}{1/\\sin^2 A} = \\frac{\\sin^2 A}{\\cos^2 A} = \\tan^2 A$.',
        source: 'NCERT Mathematics Class X, Chapter 8',
      },
      {
        id: 'MS-C04',
        subjectSlug: 'maths-standard',
        subjectName: 'Mathematics (Standard)',
        topic: 'Coordinate Geometry',
        concept: 'Section Formula',
        marks: 2,
        type: 'written',
        question: 'Find the coordinates of the midpoint of the line segment joining $A(-3, 8)$ and $B(7, -2)$.',
        answer: '$(2, 3)$.',
        explanation: 'Midpoint formula: $M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right) = \\left(\\frac{-3 + 7}{2}, \\frac{8 - 2}{2}\\right) = \\left(\\frac{4}{2}, \\frac{6}{2}\\right) = (2, 3)$.',
        source: 'NCERT Mathematics Class X, Chapter 7',
      },
      {
        id: 'MS-C05',
        subjectSlug: 'maths-standard',
        subjectName: 'Mathematics (Standard)',
        topic: 'Probability',
        concept: 'Complementary Events',
        marks: 1,
        type: 'mcq',
        question: 'If $P(E) = 0.07$, what is the probability of "not $E$"?',
        options: ['$0.93$', '$0.03$', '$0.70$', '$0.007$'],
        correctOptionIndex: 0,
        answer: '$0.93$',
        explanation: 'The sum of probabilities of complementary events is 1: $P(\\bar{E}) = 1 - P(E) = 1 - 0.07 = 0.93$.',
        source: 'NCERT Mathematics Class X, Chapter 14',
      },
    ],
  },
  ai: {
    name: 'Artificial Intelligence (Code 417)',
    questions: [
      {
        id: 'AI-C01',
        subjectSlug: 'artificial-intelligence',
        subjectName: 'Artificial Intelligence',
        topic: 'Natural Language Processing',
        concept: 'Inverse Document Frequency in TF-IDF',
        marks: 2,
        type: 'written',
        question: 'Explain why stop-words like "the", "is", and "in" receive low IDF scores in TF-IDF algorithms.',
        answer: 'Because their Document Frequency ($DF$) is very high across all documents, making the ratio $N/DF$ close to 1 and $\\log(N/DF) \\approx 0$.',
        explanation: 'Inverse Document Frequency penalizes common words: $\\text{IDF}(t) = \\log\\left(\\frac{N}{\\text{DF}(t)}\\right)$. Words appearing in almost every document convey minimal discriminatory value, yielding near-zero IDF.',
        source: 'CBSE Skill Subject 417, Unit 4',
      },
      {
        id: 'AI-C02',
        subjectSlug: 'artificial-intelligence',
        subjectName: 'Artificial Intelligence',
        topic: 'Computer Vision',
        concept: 'Grayscale Pixel Value Range',
        marks: 1,
        type: 'mcq',
        question: 'In standard digital image processing, what is the intensity range of an 8-bit grayscale pixel?',
        options: ['0 to 100', '0 to 255', '-128 to 127', '1 to 256'],
        correctOptionIndex: 1,
        answer: '0 to 255',
        explanation: 'An 8-bit binary representation accommodates $2^8 = 256$ discrete levels, indexed from 0 (pure black) to 255 (pure white).',
        source: 'CBSE Skill Subject 417, Unit 5',
      },
      {
        id: 'AI-C03',
        subjectSlug: 'artificial-intelligence',
        subjectName: 'Artificial Intelligence',
        topic: 'AI Project Cycle',
        concept: 'Evaluation Metrics (Precision vs Recall)',
        marks: 1,
        type: 'mcq',
        question: 'In an automated fire alarm system where failing to detect a fire has catastrophic consequences, which metric must be prioritized?',
        options: ['High Accuracy only', 'High Precision', 'High Recall', 'Minimum Training Epochs'],
        correctOptionIndex: 2,
        answer: 'High Recall',
        explanation: 'Recall measures $\\frac{\\text{TP}}{\\text{TP} + \\text{FN}}$. High recall minimizes False Negatives (missed fires), which is vital in life-safety systems.',
        source: 'CBSE Skill Subject 417, Unit 3',
      },
      {
        id: 'AI-C04',
        subjectSlug: 'artificial-intelligence',
        subjectName: 'Artificial Intelligence',
        topic: 'AI Ethics',
        concept: 'Algorithmic Data Bias',
        marks: 2,
        type: 'written',
        question: 'Give one concrete example of how training data bias can lead to discriminatory AI hiring recommendations.',
        answer: 'If historical hiring data predominantly favored one demographic, an AI model trained on that data will penalize qualified applicants from underrepresented groups.',
        explanation: 'Machine learning algorithms mirror patterns in historical datasets. Without data auditing and algorithmic fairness adjustments, societal prejudices become encoded as automated rules.',
        source: 'CBSE Skill Subject 417, Unit 1',
      },
      {
        id: 'AI-C05',
        subjectSlug: 'artificial-intelligence',
        subjectName: 'Artificial Intelligence',
        topic: 'Machine Learning Approaches',
        concept: 'Supervised vs Unsupervised Learning',
        marks: 1,
        type: 'mcq',
        question: 'Clustering unlabelled customer purchase data into distinct behavioral segments is an example of:',
        options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Rule-Based Expert System'],
        correctOptionIndex: 1,
        answer: 'Unsupervised Learning',
        explanation: 'Clustering discovers intrinsic grouping patterns in data without pre-assigned target labels, which defines unsupervised learning.',
        source: 'CBSE Skill Subject 417, Unit 2',
      },
    ],
  },
};

export default function FreeChallengePage() {
  const [selectedSubject, setSelectedSubject] = useState<string>('science');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [writtenRevealed, setWrittenRevealed] = useState(false);
  const [userAssessments, setUserAssessments] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const bank = CHALLENGE_BANKS[selectedSubject] || CHALLENGE_BANKS.science;
  const currentQ = bank.questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return; // locked once chosen
    setSelectedOption(idx);
    const isCorrect = idx === currentQ.correctOptionIndex;
    setUserAssessments((prev) => ({ ...prev, [currentIndex]: isCorrect }));
  };

  const handleSelfAssessWritten = (gotIt: boolean) => {
    setUserAssessments((prev) => ({ ...prev, [currentIndex]: gotIt }));
    handleNext();
  };

  const handleNext = () => {
    setSelectedOption(null);
    setWrittenRevealed(false);
    if (currentIndex + 1 < bank.questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = (newSubject?: string) => {
    if (newSubject) setSelectedSubject(newSubject);
    setCurrentIndex(0);
    setSelectedOption(null);
    setWrittenRevealed(false);
    setUserAssessments({});
    setIsCompleted(false);
  };

  const correctCount = Object.values(userAssessments).filter(Boolean).length;
  const totalQuestions = bank.questions.length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-900 border border-forest-200 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-forest-700" />
          <span>Interactive Free Challenge • 5 Questions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950 tracking-tight">
          Try a 5-question practice challenge.
        </h1>
        <p className="text-xs sm:text-sm text-forest-800 leading-relaxed">
          No credit card or registration required. Solve each problem, request hints if stuck, and review worked model answers.
        </p>
      </div>

      {/* Subject Selector Tabs */}
      {!isCompleted && (
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-academic-border pb-4">
          {Object.entries(CHALLENGE_BANKS).map(([slug, data]) => (
            <button
              key={slug}
              onClick={() => handleReset(slug)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                selectedSubject === slug
                  ? 'bg-forest-900 text-limeaccent shadow-sm'
                  : 'bg-white border border-academic-border text-forest-900 hover:bg-forest-50'
              }`}
            >
              {data.name}
            </button>
          ))}
        </div>
      )}

      {/* Challenge Card */}
      {!isCompleted ? (
        <div className="rounded-2xl bg-white border border-academic-border shadow-sm overflow-hidden">
          {/* Progress bar */}
          <div className="w-full bg-paper-200 h-1.5">
            <div
              className="bg-forest-900 h-1.5 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Meta info */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-academic-border pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold bg-forest-100 text-forest-900 px-2.5 py-0.5 rounded">
                  {currentQ.id}
                </span>
                <span className="font-semibold text-forest-950">{currentQ.topic}</span>
                <span className="text-forest-400">•</span>
                <span className="text-academic-subtle font-mono text-[11px]">{currentQ.concept}</span>
              </div>
              <div className="flex items-center gap-3 text-academic-subtle font-medium">
                <span>{currentQ.marks} {currentQ.marks === 1 ? 'Mark' : 'Marks'}</span>
                <span>•</span>
                <span>Question {currentIndex + 1} of {totalQuestions}</span>
              </div>
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-serif font-medium text-forest-950 leading-relaxed">
              <MathRenderer text={currentQ.question} />
            </div>

            {/* Answer Section */}
            {currentQ.type === 'mcq' ? (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-academic-subtle block">
                  Select your answer:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQ.options?.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQ.correctOptionIndex;
                    let style = 'bg-white border-academic-border text-forest-900 hover:border-forest-700 hover:bg-forest-50/50';

                    if (selectedOption !== null) {
                      if (isCorrect) {
                        style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-2 ring-emerald-500/20';
                      } else if (isSelected) {
                        style = 'bg-red-50 border-red-500 text-red-950 font-semibold ring-2 ring-red-500/20';
                      } else {
                        style = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={selectedOption !== null}
                        className={`text-left p-4 rounded-xl border text-sm transition flex items-center justify-between gap-3 ${style}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-md bg-paper-200 text-forest-900 text-xs font-bold flex items-center justify-center shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <MathRenderer text={opt} />
                        </div>
                        {selectedOption !== null && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {selectedOption !== null && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Written / Subjective recall */
              <div className="space-y-4 pt-2">
                {!writtenRevealed ? (
                  <div className="rounded-xl border border-academic-border bg-paper-50 p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-forest-950">
                      <BookOpen className="w-4 h-4 text-forest-700" />
                      <span>Subjective Practice Instructions</span>
                    </div>
                    <p className="text-xs sm:text-sm text-forest-800 leading-relaxed">
                      Work through the calculation or definition in your notebook first. When you are ready, reveal the model answer to compare step-by-step reasoning.
                    </p>
                    <button
                      onClick={() => setWrittenRevealed(true)}
                      className="inline-flex items-center gap-2 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
                    >
                      <span>Reveal Model Answer & Reasoning</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-xl bg-forest-50/70 border border-forest-200 p-5 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-forest-700">
                        Official Model Answer
                      </div>
                      <div className="text-sm font-semibold text-forest-950">
                        <MathRenderer text={currentQ.answer} />
                      </div>
                      <div className="border-t border-forest-200/60 pt-3 text-xs leading-relaxed text-forest-800">
                        <span className="font-bold text-forest-950 block mb-1">Step-by-Step Explanation:</span>
                        <MathRenderer text={currentQ.explanation} />
                      </div>
                    </div>

                    {/* Self assessment for written */}
                    <div className="p-4 rounded-xl bg-white border border-academic-border space-y-2">
                      <span className="text-xs font-bold text-forest-950 block">
                        How did your answer compare to the model solution?
                      </span>
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => handleSelfAssessWritten(true)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>I got it right</span>
                        </button>
                        <button
                          onClick={() => handleSelfAssessWritten(false)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-paper-200 hover:bg-paper-300 text-forest-900 text-xs font-bold transition border border-academic-border"
                        >
                          <XCircle className="w-3.5 h-3.5 text-amber-700" />
                          <span>Needs review</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Explanation box for MCQ after selection */}
            {currentQ.type === 'mcq' && selectedOption !== null && (
              <div className="rounded-xl bg-forest-50/70 border border-forest-200 p-4 space-y-2 text-xs">
                <div className="font-bold text-forest-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Model Explanation & Concept Verification</span>
                </div>
                <div className="text-forest-800 leading-relaxed">
                  <MathRenderer text={currentQ.explanation} />
                </div>
                <div className="text-[11px] text-academic-subtle font-mono pt-1">
                  Source: {currentQ.source}
                </div>
              </div>
            )}

            {/* In-Flow AI Coach */}
            <div className="pt-2">
              <AIHintCoach
                question={currentQ.question}
                topic={currentQ.topic}
                explanation={currentQ.explanation}
                source={currentQ.source}
              />
            </div>

            {/* Next Button for MCQ */}
            {currentQ.type === 'mcq' && selectedOption !== null && (
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
                >
                  <span>{currentIndex + 1 === totalQuestions ? 'Finish Challenge' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Results Card */
        <div className="rounded-2xl bg-white border border-academic-border p-8 sm:p-12 space-y-8 text-center max-w-2xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-forest-100 text-forest-900 flex items-center justify-center mx-auto border border-forest-200">
            <Award className="w-8 h-8 text-forest-800" />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-700">
              Challenge Complete
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950">
              You answered {correctCount} of {totalQuestions} correctly.
            </h2>
            <p className="text-xs sm:text-sm text-forest-800 leading-relaxed max-w-md mx-auto">
              {correctCount >= 4
                ? `Strong conceptual grasp of ${bank.name}! Keep the routine consistent with a daily 15-minute practice session.`
                : `Good effort! A short daily revision round on ${bank.questions[0].topic} will help reinforce these intermediate formulas.`}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-forest-50/50 border border-forest-100 text-xs text-forest-800 text-left space-y-2">
            <div className="font-bold text-forest-950 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-forest-700" />
              <span>Next Step: Build Your Habit</span>
            </div>
            <p className="text-[12px] text-academic-subtle leading-relaxed">
              Real board exam confidence comes from consistent daily recall rather than cramming. Create your personalized study plan to save your revision queue and receive tailored daily practice assignments.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-limeaccent hover:bg-limeaccent-hover text-forest-950 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
            >
              <span>Create Your Study Plan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => handleReset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-paper-50 text-forest-900 font-semibold px-6 py-3.5 rounded-xl text-xs border border-academic-border transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Another Challenge</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
