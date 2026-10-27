'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface EnterpriseHeroProps {
  onTriggerAiQuery: (query: string) => void;
}

const FEATURED_GOALS = [
  { id: 'iit-jee', label: 'IIT JEE (Main & Adv)', category: 'Engineering', count: '10k+ Qs' },
  { id: 'neet-ug', label: 'NEET UG', category: 'Medical', count: 'Biology Drills' },
  { id: 'upsc-cse', label: 'UPSC CSE (IAS/IPS)', category: 'Civil Services', count: 'GS & CSAT' },
  { id: 'ssc-cgl', label: 'SSC CGL', category: 'Staff Selection', count: 'Tier 1 & 2' },
  { id: 'banking', label: 'Banking (IBPS/SBI)', category: 'Recruitment', count: 'Quant & Logic' },
  { id: 'rrb-ntpc', label: 'Railways (RRB NTPC)', category: 'Public Sector', count: 'CBT 1 & 2' },
  { id: 'cbse-10-12', label: 'CBSE Class 10 & 12', category: 'School Boards', count: 'NCERT Mapped' },
  { id: 'cuet-ug', label: 'CUET UG', category: 'University', count: 'Domain Tests' },
];

export function EnterpriseHero({ onTriggerAiQuery }: EnterpriseHeroProps) {
  const [heroSearch, setHeroSearch] = useState('');

  function handleSubmitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (heroSearch.trim()) {
      onTriggerAiQuery(heroSearch.trim());
    }
  }

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Top Authority Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs text-slate-300 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-emerald-400">Zero Coaching Hype. Total Statutory Clarity.</span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">Official Gazette Updates & Declarative AST Eligibility</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            India’s Intelligent Exam & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Career Companion Platform
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Verify real statutory eligibility with zero sales pressure, compare 3 unbundled college pathways and backup routes, and build consistent 15-minute daily diagnostic practice.
          </p>
        </div>

        {/* Live AI Search Engine Box */}
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmitSearch}
            className="p-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl flex flex-col sm:flex-row items-center gap-2 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2.5 flex-1 w-full pl-3 pr-2 py-2 text-slate-400">
              <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={heroSearch}
                onChange={e => setHeroSearch(e.target.value)}
                placeholder="Ask AI: 'NDA 2026 age limit', 'JEE 75% rule for OBC', 'Maths Basic in 11th'..."
                className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-xs transition shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Query Intelligence</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          {/* Quick Click Queries */}
          <div className="mt-3 flex items-center justify-center gap-2 flex-wrap text-[11px] text-slate-400">
            <span className="text-slate-500">Suggested:</span>
            <button
              onClick={() => onTriggerAiQuery('What is the age cutoff and relaxation for NDA 2 2026 for OBC?')}
              className="hover:text-emerald-400 underline decoration-slate-600 underline-offset-2"
            >
              NDA Age Limit
            </button>
            <span>•</span>
            <button
              onClick={() => onTriggerAiQuery('Is Maths Standard mandatory for Class 11 PCM in CBSE?')}
              className="hover:text-emerald-400 underline decoration-slate-600 underline-offset-2"
            >
              Maths Standard vs Basic
            </button>
            <span>•</span>
            <button
              onClick={() => onTriggerAiQuery('Does JEE Main require 75% in 12th board for SC/ST?')}
              className="hover:text-emerald-400 underline decoration-slate-600 underline-offset-2"
            >
              JEE 75% Board Rule
            </button>
            <span>•</span>
            <button
              onClick={() => onTriggerAiQuery('What are the backup degree paths if I miss the NEET UG cutoff?')}
              className="hover:text-emerald-400 underline decoration-slate-600 underline-offset-2"
            >
              NEET Alternate Backups
            </button>
          </div>
        </div>

        {/* Goal Quick Selector Pills */}
        <div className="pt-4 max-w-5xl mx-auto space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Popular Preparation & Career Goals
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {FEATURED_GOALS.map(goal => (
              <Link
                key={goal.id}
                href={`/exams#${goal.id}`}
                className="group px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 transition flex items-center gap-2 text-left shadow-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-125 transition" />
                <div>
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-white">
                    {goal.label}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {goal.category} • {goal.count}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Dual Primary Call-To-Action */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/prepare"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2"
          >
            <span>Try 15-Minute Diagnostic Drill (Free)</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <Link
            href="/paths"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 transition flex items-center justify-center gap-2"
          >
            <span>Compare 3 Career Pathways & Costs</span>
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Enterprise Proof & Invariants Grid */}
        <div className="pt-10 border-t border-slate-800/80 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-white">8+ Bodies</div>
            <div className="text-xs text-slate-400 mt-0.5">NTA, UPSC, SSC, IBPS, RRB, CBSE</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-emerald-400">10,000+ Qs</div>
            <div className="text-xs text-slate-400 mt-0.5">Progressive Socratic Hints</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-white">100% Ad-Free</div>
            <div className="text-xs text-slate-400 mt-0.5">Strict DPDP 2023 Minor Safety</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-teal-400">₹0 Phone Gate</div>
            <div className="text-xs text-slate-400 mt-0.5">Zero Spam Calls Guarantee</div>
          </div>
        </div>

      </div>
    </section>
  );
}
