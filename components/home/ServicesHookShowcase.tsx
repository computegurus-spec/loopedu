'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  BookOpen,
  GitBranch,
  RotateCcw,
  Activity,
  ShieldCheck,
  ArrowRight,
  Lock,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Brain,
  Zap,
} from 'lucide-react';

interface ServicesHookShowcaseProps {
  isLoggedIn?: boolean;
}

export const ServicesHookShowcase: React.FC<ServicesHookShowcaseProps> = ({ isLoggedIn }) => {
  const services = [
    {
      id: 'career_planner',
      title: 'AI Career & Stream Architect',
      badge: 'STREAM & ENTRANCE MATCHER',
      badgeColor: 'bg-blue-50 text-[#0066FF] border-blue-200',
      icon: Compass,
      painPoint: 'Torn between PCM, PCB, Commerce, or Humanities? Don’t rely on peer pressure.',
      hookText:
        'Backwards-engineers your ideal academic stream from your subject marks and passions. Delivers a custom 4-year roadmap with verified official portal links and eligibility requirements for JEE, NEET, CUET, CLAT, NDA, and top global colleges.',
      teaserSnippet: {
        label: 'SAMPLE VERDICT',
        content: '92% Maths + AI Passion → Science PCM + Computer Science (Direct Portals: JEE Main, JEE Adv, BITSAT)',
      },
      link: '/consultant',
      accentBorder: 'hover:border-blue-300',
    },
    {
      id: 'question_banks',
      title: '1,600 Verified Board Question Banks',
      badge: '10-YEAR RECURRENCE SYNC',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: BookOpen,
      painPoint: 'Stop solving random textbook questions. Practice what the examiners actually test.',
      hookText:
        '8 published tracks with exactly 200 questions each, mapped strictly to official NCERT rubrics and 10-year board recurrence maps. Complete with LaTeX formulas and 3-stage step-by-step diagnostic hints.',
      teaserSnippet: {
        label: 'HIGH-RECURRENCE TELEMETRY',
        content: 'CBSE tests proof of irrationality (√3, √5) in 10 out of 10 consecutive board examination years.',
      },
      link: '/study/cbse-10-science',
      accentBorder: 'hover:border-amber-300',
    },
    {
      id: 'mind_maps',
      title: 'Interactive Concept Mind Maps',
      badge: 'VISUAL KNOWLEDGE HIERARCHY',
      badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      icon: GitBranch,
      painPoint: 'Formulas and chapters feel like disconnected walls of text.',
      hookText:
        'Interactive visual concept trees showing how scientific laws and algebraic theorems connect. Click any node to inspect recurrence frequency, formula derivations, and launch targeted diagnostic drills.',
      teaserSnippet: {
        label: 'DEPENDENCY MAP PREVIEW',
        content: 'Optics → Reflection (Concave/Convex) → Refraction (Snell’s Law) → Lens Formula & Magnification',
      },
      link: '/mind-maps',
      accentBorder: 'hover:border-cyan-300',
    },
    {
      id: 'flashcards',
      title: 'Active Recall Spaced Flashcards',
      badge: 'LEITNER SRS ENGINE',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
      icon: RotateCcw,
      painPoint: 'Eliminate exam-hall blanking on formulas, laws, and definitions.',
      hookText:
        'Scientific spaced repetition system (SRS) scheduled across 24-hour, 72-hour, and 7-day intervals, systematically moving core formulas from fragile short-term memory to permanent recall.',
      teaserSnippet: {
        label: 'SPACED INTERVAL RETRIEVAL',
        content: 'Lens Power: P = 1/f(m) • Dioptres (D) • Convex lens power is positive; Concave is negative.',
      },
      link: '/flashcards',
      accentBorder: 'hover:border-purple-300',
    },
    {
      id: 'daily_five',
      title: 'The 15-Minute Daily Five Loop',
      badge: 'BURNOUT PROTECTION CEILING',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: Activity,
      painPoint: '4-hour cramming sessions lead to screen fatigue and zero next-day retention.',
      hookText:
        'Enforces a strict, non-negotiable 15-minute daily focus ceiling. Solves 5 calibrated high-yield questions every morning. Built for consistency and permanent memory consolidation over cramming.',
      teaserSnippet: {
        label: 'DAILY HABIT ARCHITECTURE',
        content: '5 High-Yield Questions • 13 Minutes Completed • Memory Consolidation Active • Zero Screen Strain',
      },
      link: '/learn',
      accentBorder: 'hover:border-emerald-300',
    },
    {
      id: 'parent_hub',
      title: 'Parent Observability Dashboard',
      badge: 'CALM COGNITIVE TELEMETRY',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
      icon: ShieldCheck,
      painPoint: 'Stop nagging your child about study hours. Observe real progress with calm telemetry.',
      hookText:
        'Delivers real-time board readiness metrics, hesitation latency breakdown, and weekly habit consistency reports without micromanaging or creating student test anxiety.',
      teaserSnippet: {
        label: 'CALM TELEMETRY SCORECARD',
        content: 'Weekly Board Readiness: 91.4% • Hesitation Latency: 1.8s avg • Fatigue Interlock: Normal',
      },
      link: '/parent',
      accentBorder: 'hover:border-rose-300',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 border border-blue-200 text-[#0066FF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PLATFORM CAPABILITIES &amp; SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Every tool you need to master your board &amp; entrance exams.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            A comprehensive academic operating system designed for Indian students. Explore the services below—create your free account or sign in to launch any tool instantly.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            const targetUrl = isLoggedIn ? svc.link : `/login?redirect=${encodeURIComponent(svc.link)}`;

            return (
              <div
                key={svc.id}
                className={`p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-5 group ${svc.accentBorder}`}
              >
                <div className="space-y-4">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${svc.badgeColor}`}
                    >
                      {svc.badge}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-[#0066FF] group-hover:text-white transition-colors shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-950 leading-snug group-hover:text-[#0066FF] transition-colors">
                    {svc.title}
                  </h3>

                  {/* Pain Point Hook */}
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed italic">
                    &ldquo;{svc.painPoint}&rdquo;
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {svc.hookText}
                  </p>

                  {/* Teaser Preview Card */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1">
                    <span className="text-[9px] uppercase font-bold text-[#0066FF] block tracking-wider">
                      {svc.teaserSnippet.label}
                    </span>
                    <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
                      {svc.teaserSnippet.content}
                    </p>
                  </div>
                </div>

                {/* Bottom CTA Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  {!isLoggedIn ? (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5 text-amber-600" />
                      <span>Free Account Required</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                      <span>Unlocked &amp; Active</span>
                    </span>
                  )}

                  <Link
                    href={targetUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066FF] group-hover:text-blue-700 hover:underline transition"
                  >
                    <span>{isLoggedIn ? 'Open Tool' : 'Unlock Free'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
