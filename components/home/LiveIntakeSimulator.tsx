'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Terminal,
  Database,
  ArrowRight,
  Check,
  Loader2,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import { OfficialCourse } from '@/lib/agent/curriculum';

export const LiveIntakeSimulator: React.FC = () => {
  const [board, setBoard] = useState('CBSE');
  const [grade, setGrade] = useState('8th Standard');
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<OfficialCourse[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [standardRef, setStandardRef] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetch(`/api/agent/curriculum?board=${encodeURIComponent(board)}&grade=${encodeURIComponent(grade)}`)
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        setLoading(false);
        if (d.success && d.curriculum) {
          const list: OfficialCourse[] = d.curriculum.courses || [];
          setCourses(list);
          setStandardRef(d.curriculum.standardReference || '');
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
  }, [board, grade]);

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="py-20 sm:py-28 bg-zinc-950 border-b border-zinc-800/80 text-zinc-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>INTERACTIVE SMART INTAKE ENGINE SIMULATOR</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Dynamic course fetching. Zero hardcoded dropdowns.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            Test the Curriculum Architect in real time below. Switch between boards and standards to watch the agent automatically query and assemble official verified courses.
          </p>
        </div>

        {/* Live Simulator Console */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-zinc-950 border-b border-zinc-800/80 px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2.5 text-zinc-400">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white">agent_curriculum_fetcher.sh</span>
              <span className="text-zinc-600">|</span>
              <span className="text-[11px] text-zinc-400">STATUS: READY</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400">
                QUERY_LATENCY: 12ms
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Parameters Control Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-zinc-800/80">
              {/* Board Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  Select Educational Framework
                </label>
                <div className="flex flex-wrap gap-2">
                  {['CBSE', 'ICSE', 'IGCSE', 'StateBoard'].map((b) => (
                    <button
                      key={b}
                      onClick={() => setBoard(b)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition ${
                        board === b
                          ? 'bg-zinc-100 text-zinc-950 border-zinc-100 font-bold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grade Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  Select Academic Tier
                </label>
                <div className="flex flex-wrap gap-2">
                  {['8th Standard', 'Class 9', 'Class 10'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGrade(g)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition ${
                        grade === g
                          ? 'bg-zinc-100 text-zinc-950 border-zinc-100 font-bold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Result Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">
                  CURRICULUM RESOLUTION:{' '}
                  <strong className="text-white">
                    {board} {grade}
                  </strong>
                </span>
                <span className="text-emerald-400">
                  {selectedIds.size} Tracks Active
                </span>
              </div>

              {loading ? (
                <div className="py-12 flex flex-col items-center justify-center gap-2 font-mono text-xs text-zinc-500">
                  <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
                  <span>Curriculum Architect querying live standards...</span>
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
                            ? 'bg-zinc-800/80 border-zinc-600 shadow-xs'
                            : 'bg-zinc-950/70 border-zinc-800/90 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border transition ${
                            isSelected
                              ? 'bg-emerald-500 border-emerald-400 text-zinc-950 font-bold'
                              : 'border-zinc-700 bg-zinc-900'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="font-bold text-xs text-white truncate">
                              {course.name}
                            </h4>
                            <span className="text-[9px] font-mono bg-zinc-900 px-1 py-0.2 rounded text-zinc-400 border border-zinc-800">
                              {course.code}
                            </span>
                          </div>

                          <p className="text-[11px] text-zinc-400 mt-0.5 truncate">
                            {course.officialTextbook}
                          </p>

                          <div className="flex items-center gap-2 mt-1.5 text-[10px] font-mono text-zinc-500">
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
            <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-zinc-500 font-mono">
                {standardRef || 'Official verified academic syllabus.'}
              </span>

              <Link
                href="/initialize"
                className="inline-flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-md active:scale-98"
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
