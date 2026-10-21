'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Atom,
  Globe2,
  BookA,
  Cpu,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

interface SubjectItem {
  id: string;
  name: string;
  slug: string;
  category: 'math' | 'science' | 'social-studies' | 'languages-electives';
  code: string;
  questionCount: number;
  topics: number;
  badge?: string;
  isFreeTrial?: boolean;
  accentColor: string;
  icon: React.ReactNode;
  description: string;
}

const SUBJECT_LIST: SubjectItem[] = [
  {
    id: 'maths-standard',
    name: 'Mathematics (Standard)',
    slug: 'maths-standard',
    category: 'math',
    code: 'Code 041',
    questionCount: 200,
    topics: 14,
    badge: 'High Rigor',
    isFreeTrial: true,
    accentColor: 'from-blue-600 to-indigo-700',
    icon: <Calculator className="w-5 h-5 text-blue-600" />,
    description: 'Proofs, trigonometric deductions, quadratic relations, and 10-year recurring theorem problems.',
  },
  {
    id: 'maths-basic',
    name: 'Mathematics (Basic)',
    slug: 'maths-basic',
    category: 'math',
    code: 'Code 241',
    questionCount: 200,
    topics: 14,
    badge: 'Foundation',
    isFreeTrial: true,
    accentColor: 'from-sky-500 to-blue-600',
    icon: <Calculator className="w-5 h-5 text-sky-600" />,
    description: 'Core arithmetic, linear relations, coordinate geometry, and direct NCERT worked models.',
  },
  {
    id: 'science',
    name: 'Science (Theory)',
    slug: 'science',
    category: 'science',
    code: 'Code 086',
    questionCount: 200,
    topics: 16,
    badge: 'Free 10-Q Sprint',
    isFreeTrial: true,
    accentColor: 'from-emerald-600 to-teal-700',
    icon: <Atom className="w-5 h-5 text-emerald-600" />,
    description: 'Balanced chemical equations, ray optics formulas, circuit analysis, and life process diagrams.',
  },
  {
    id: 'social-science',
    name: 'Social Science',
    slug: 'social-science',
    category: 'social-studies',
    code: 'Code 087',
    questionCount: 200,
    topics: 22,
    badge: '10-Yr Heatmap',
    isFreeTrial: true,
    accentColor: 'from-amber-600 to-orange-700',
    icon: <Globe2 className="w-5 h-5 text-amber-600" />,
    description: 'Nationalism in India, resource mapping, democratic politics, and macroeconomic development.',
  },
  {
    id: 'english',
    name: 'English (Language & Literature)',
    slug: 'english-language-literature',
    category: 'languages-electives',
    code: 'Code 184',
    questionCount: 200,
    topics: 18,
    badge: 'NCERT Rubric',
    isFreeTrial: true,
    accentColor: 'from-purple-600 to-violet-700',
    icon: <BookA className="w-5 h-5 text-purple-600" />,
    description: 'Discursive unseen passages, formal writing rubrics, and First Flight character sketches.',
  },
  {
    id: 'hindi-course-a',
    name: 'Hindi (Course A)',
    slug: 'hindi-course-a',
    category: 'languages-electives',
    code: 'Code 002',
    questionCount: 200,
    topics: 16,
    badge: 'CBSE 2027',
    isFreeTrial: true,
    accentColor: 'from-rose-600 to-pink-700',
    icon: <BookOpen className="w-5 h-5 text-rose-600" />,
    description: 'Vyakaran sandhi-samasa analysis, Kshitij kavita bhavarth, and Nibandh formats.',
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    category: 'languages-electives',
    code: 'Code 417',
    questionCount: 200,
    topics: 8,
    badge: 'Skill Elective',
    isFreeTrial: true,
    accentColor: 'from-cyan-600 to-blue-700',
    icon: <Cpu className="w-5 h-5 text-cyan-600" />,
    description: 'AI Project Cycle, Computer Vision, Natural Language Processing, and Python data ethics.',
  },
  {
    id: 'german',
    name: 'German Language',
    slug: 'german',
    category: 'languages-electives',
    code: 'Code 017',
    questionCount: 200,
    topics: 12,
    badge: 'Language Track',
    isFreeTrial: true,
    accentColor: 'from-slate-700 to-slate-900',
    icon: <Globe2 className="w-5 h-5 text-slate-700" />,
    description: 'Leseverstehen, Wortschatz, Grammatik Konjunktiv II, and E-Mail writing templates.',
  },
];

export const AlbertSubjectGroup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabs = [
    { id: 'all', label: 'All Subjects' },
    { id: 'math', label: 'Math' },
    { id: 'science', label: 'Science' },
    { id: 'social-studies', label: 'Social Studies' },
    { id: 'languages-electives', label: 'Languages & Electives' },
  ];

  const displayedSubjects =
    activeTab === 'all'
      ? SUBJECT_LIST
      : SUBJECT_LIST.filter((s) => s.category === activeTab);

  return (
    <section id="subjects" className="py-16 sm:py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Every subject, one platform
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            With LoopEdu, teachers and students leverage cutting-edge practice and rigorous question banks across all CBSE Class 10 subjects in a unified experience.
          </p>
        </div>

        {/* Tab Bar Filter */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-950 font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedSubjects.map((sub) => (
            <div
              key={sub.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between hover:border-slate-400 hover:shadow-lg transition-all duration-200"
            >
              <div className="space-y-4">
                {/* Card Top: Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                    {sub.icon}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {sub.badge && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {sub.badge}
                      </span>
                    )}
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      {sub.code}
                    </span>
                  </div>
                </div>

                {/* Subject Title */}
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-950 group-hover:text-blue-700 transition">
                    <Link href={`/study/${sub.slug}`} className="hover:underline">
                      {sub.name}
                    </Link>
                  </h3>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    {sub.questionCount} Questions • {sub.topics} Key Units
                  </div>
                </div>

                {/* Description Snippet */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {sub.description}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/study/${sub.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 group-hover:translate-x-0.5 transition"
                >
                  <span>Practice Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/subject/${sub.slug}`}
                  className="text-[11px] text-slate-500 hover:text-slate-900 underline font-medium"
                >
                  Syllabus Info
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Explorer Link */}
        <div className="mt-12 text-center">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-blue-700 underline"
          >
            <span>View complete catalogue & syllabus breakdown for all 8 tracks →</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
