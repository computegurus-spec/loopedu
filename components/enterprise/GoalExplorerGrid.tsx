'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { EXAM_CATALOG, ExamFamilyEntry } from '@/lib/data/examCatalog';

type FilterTab = 'ALL' | 'UG_ENTRANCE' | 'GOVT_RECRUITMENT' | 'SCHOOL' | 'DEFENCE_LAW';

export function GoalExplorerGrid() {
  const [activeTab, setActiveTab] = useState<FilterTab>('ALL');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredExams = EXAM_CATALOG.filter(exam => {
    // Tab filter
    if (activeTab === 'UG_ENTRANCE' && exam.category !== 'Engineering' && exam.category !== 'Medical & Life Sciences') {
      return false;
    }
    if (activeTab === 'GOVT_RECRUITMENT' && !['Civil Services & State PSC', 'Banking & Insurance', 'Railways (RRB)', 'Staff Selection (SSC)'].includes(exam.category)) {
      return false;
    }
    if (activeTab === 'DEFENCE_LAW' && !['Defence & Armed Forces', 'Law & Design'].includes(exam.category)) {
      return false;
    }

    // Search filter
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        exam.name.toLowerCase().includes(q) ||
        exam.code.toLowerCase().includes(q) ||
        exam.conductingAuthority.fullName.toLowerCase().includes(q) ||
        exam.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <section className="py-16 lg:py-24 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              Statutory Exam & Recruitment Catalog
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explore 200+ National & State Tracks
            </h2>
            <p className="text-sm text-slate-400">
              Direct official conducting authority feeds, verified key dates, and curriculum-mapped diagnostic question banks.
            </p>
          </div>

          {/* Quick Search inside catalog */}
          <div className="w-full md:w-72">
            <div className="relative">
              <input
                type="text"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                placeholder="Search tracks, NTA, UPSC..."
                className="w-full px-3.5 py-2 pl-9 bg-slate-850 rounded-xl border border-slate-700 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-emerald-500"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition ${
              activeTab === 'ALL'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            All Tracks ({EXAM_CATALOG.length})
          </button>
          <button
            onClick={() => setActiveTab('UG_ENTRANCE')}
            className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition ${
              activeTab === 'UG_ENTRANCE'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Undergrad Entrance (JEE / NEET / CUET)
          </button>
          <button
            onClick={() => setActiveTab('GOVT_RECRUITMENT')}
            className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition ${
              activeTab === 'GOVT_RECRUITMENT'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Government Jobs (UPSC / SSC / RRB / Bank)
          </button>
          <button
            onClick={() => setActiveTab('DEFENCE_LAW')}
            className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition ${
              activeTab === 'DEFENCE_LAW'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Defence & Law (NDA / CLAT)
          </button>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map(exam => (
            <div
              key={exam.id}
              className="rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition p-6 flex flex-col justify-between space-y-5 group hover:shadow-xl hover:shadow-emerald-950/20"
            >
              <div className="space-y-4">
                {/* Authority & Category Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-slate-850 text-slate-300 font-mono text-[11px] font-medium border border-slate-700">
                    {exam.conductingAuthority.code} Official
                  </span>
                  <span className="text-[11px] font-medium text-emerald-400">
                    {exam.category}
                  </span>
                </div>

                {/* Title & Target */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition">
                    {exam.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {exam.targetRecruitmentOrCourse}
                  </p>
                </div>

                {/* Key Metadata Table */}
                <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Qualification:</span>
                    <span className="text-slate-200 font-medium">{exam.qualificationRequired}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Next Exam Date:</span>
                    <span className="text-slate-200 font-medium">{exam.dates.examDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Status:</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {exam.dates.isConfirmedByGazette ? 'Gazette Confirmed' : 'Cycle Monitored'}
                    </span>
                  </div>
                </div>

                {/* Topics / Preparation Overlap Preview */}
                <div className="pt-1 flex flex-wrap gap-1.5">
                  {exam.preparationOverlap.slice(0, 3).map((topic, sIdx) => (
                    <span key={sIdx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] border border-slate-800">
                      {topic}
                    </span>
                  ))}
                  {exam.preparationOverlap.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-500 text-[10px]">
                      +{exam.preparationOverlap.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2">
                <Link
                  href="/exams"
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold text-center border border-slate-700 transition"
                >
                  Check Eligibility
                </Link>
                <Link
                  href="/prepare"
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold text-center transition shadow-sm"
                >
                  Diagnostic Drills
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-white">Can't find your specific regional or state CET?</h4>
            <p className="text-xs text-slate-400">
              Our statutory crawler continuously ingests gazette notifications from KEA, MHT-CET, WBJEE, and State PSCs.
            </p>
          </div>
          <Link
            href="/exams"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition shrink-0"
          >
            Open Full Statutory Portal →
          </Link>
        </div>

      </div>
    </section>
  );
}
