'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Database,
  ArrowRight,
  Check,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { OfficialCourse } from '@/lib/agent/curriculum';

export const LiveIntakeSimulator: React.FC = () => {
  const [board, setBoard] = useState('CBSE');
  const [selectedState, setSelectedState] = useState('karnataka');
  const [grade, setGrade] = useState('Class 10');
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<OfficialCourse[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [standardRef, setStandardRef] = useState('');
  const [portalUrl, setPortalUrl] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);

    const queryParams = new URLSearchParams({
      board,
      grade,
      state: board === 'StateBoard' ? selectedState : '',
    });

    fetch(`/api/agent/curriculum?${queryParams.toString()}`)
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        setLoading(false);
        if (d.success && d.curriculum) {
          const list: OfficialCourse[] = d.curriculum.courses || [];
          setCourses(list);
          setStandardRef(d.curriculum.standardReference || '');
          setPortalUrl(d.curriculum.boardCentralPortal || '');
          const cores = new Set<string>();
          list.forEach((c) => {
            if (c.isCore || c.category === 'mandatory') cores.add(c.id);
          });
          setSelectedIds(cores);
        }
      })
      .catch(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [board, selectedState, grade]);

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="courses" className="py-20 sm:py-24 bg-slate-950 border-b border-slate-800 text-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-medium">
            <span>LIVE CURRICULUM QUERY ENGINE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Dynamic course fetching. Zero hardcoded dropdowns.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Test the live curriculum engine in real time below. Switch between boards, specific state syllabi, and standards to watch courses and official textbooks populate directly from central education portals.
          </p>
        </div>

        {/* Live Simulator Console */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-slate-950 border-b border-slate-800 px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2.5 text-slate-300 font-medium">
              <Database className="w-4 h-4 text-blue-400" />
              <span>Official Syllabus Standards Repository</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-emerald-400 font-medium">
                Live Repository Sync
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Parameters Control Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-slate-800">
              {/* Board Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Select Educational Framework
                </label>
                <div className="flex flex-wrap gap-2">
                  {['CBSE', 'ICSE', 'StateBoard', 'JEE', 'NEET'].map((b) => (
                    <button
                      key={b}
                      onClick={() => setBoard(b)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
                        board === b
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {b === 'StateBoard' ? 'State Board' : b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grade Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Select Grade Tier
                </label>
                <div className="flex flex-wrap gap-2">
                  {['8th Standard', 'Class 9', 'Class 10'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGrade(g)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
                        grade === g
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* REQUIREMENT 2: State Selector if State Board selected */}
            {board === 'StateBoard' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-blue-400">Select Specific State Syllabus:</span>
                  <span className="text-[11px] text-slate-500">Official SCERT portals</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'karnataka', label: 'Karnataka (KTBS)' },
                    { id: 'maharashtra', label: 'Maharashtra (Balbharati)' },
                    { id: 'tamilnadu', label: 'Tamil Nadu (SCERT)' },
                    { id: 'andhra_telangana', label: 'Andhra & Telangana' },
                    { id: 'uttar_pradesh', label: 'Uttar Pradesh (UPMSP)' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedState(s.id)}
                      className={`px-3 py-1 rounded-lg border text-xs transition ${
                        selectedState === s.id
                          ? 'bg-blue-600/10 border-blue-500 text-blue-400 font-medium'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Live Result Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Curriculum Resolved:{' '}
                  <strong className="text-white">
                    {board === 'StateBoard' ? `State Board (${selectedState.toUpperCase()})` : board} {grade}
                  </strong>
                </span>
                <span className="text-emerald-400 font-medium">
                  {selectedIds.size} Courses Active
                </span>
              </div>

              {loading ? (
                <div className="py-12 flex flex-col items-center justify-center gap-2 text-xs text-slate-400">
                  <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                  <span>Loading curriculum standards...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {courses.map((course) => {
                    const isSelected = selectedIds.has(course.id);
                    return (
                      <div
                        key={course.id}
                        onClick={() => toggle(course.id)}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition select-none flex items-start gap-3 ${
                          isSelected
                            ? 'bg-slate-800 border-blue-500/80 shadow-sm'
                            : 'bg-slate-950 border-slate-800 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border transition ${
                            isSelected
                              ? 'bg-blue-600 border-blue-600 text-white font-bold'
                              : 'border-slate-700 bg-slate-900'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="font-semibold text-xs text-white truncate">
                              {course.name}
                            </h4>
                            <span className="text-[10px] bg-slate-900 px-1 py-0.2 rounded text-slate-400 border border-slate-800">
                              {course.code}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                            📖 {course.officialTextbook}
                          </p>

                          <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-500">
                            <span>{course.chapterCount} Chapters</span>
                            {course.category === 'elective' && (
                              <span className="text-amber-400 font-semibold">• Elective</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Launch CTA */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span>{standardRef || 'Official verified academic syllabus.'}</span>
                {portalUrl && (
                  <a
                    href={portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>Central Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <Link
                href="/initialize"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition shadow-md active:scale-98"
              >
                <span>Launch Intake with These Tracks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
