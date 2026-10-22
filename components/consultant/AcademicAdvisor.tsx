'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Briefcase,
  GraduationCap,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  Target,
  ChevronRight,
  Sliders,
  ExternalLink,
} from 'lucide-react';
import { STREAM_OPTIONS, CAREER_TRAJECTORIES, StreamOption, CareerTrajectory } from '@/lib/data/consultant';

export const AcademicAdvisor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stream_advisor' | 'career_trajectories' | 'exam_timeline'>('stream_advisor');
  const [selectedStreamId, setSelectedStreamId] = useState<string>(STREAM_OPTIONS[0].id);
  const [selectedCareerId, setSelectedCareerId] = useState<string>(CAREER_TRAJECTORIES[0].id);

  // Stream Quiz State
  const [mathAptitude, setMathAptitude] = useState<'high' | 'moderate' | 'low'>('high');
  const [bioInterest, setBioInterest] = useState<'yes' | 'no'>('no');
  const [businessInterest, setBusinessInterest] = useState<'yes' | 'no'>('no');
  const [writingInterest, setWritingInterest] = useState<'yes' | 'no'>('no');

  const selectedStream = STREAM_OPTIONS.find((s) => s.id === selectedStreamId) || STREAM_OPTIONS[0];
  const selectedCareer = CAREER_TRAJECTORIES.find((c) => c.id === selectedCareerId) || CAREER_TRAJECTORIES[0];

  return (
    <div className="space-y-6">
      {/* Top Advisory Nav Pills */}
      <div className="p-2 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveTab('stream_advisor')}
          className={`px-4 py-2 rounded-xl text-xs font-mono transition flex items-center gap-2 border ${
            activeTab === 'stream_advisor'
              ? 'bg-zinc-100 text-zinc-950 font-bold border-white'
              : 'bg-zinc-950/70 text-zinc-400 hover:text-white border-zinc-800'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Stream Selection (Post-10th)</span>
        </button>

        <button
          onClick={() => setActiveTab('career_trajectories')}
          className={`px-4 py-2 rounded-xl text-xs font-mono transition flex items-center gap-2 border ${
            activeTab === 'career_trajectories'
              ? 'bg-zinc-100 text-zinc-950 font-bold border-white'
              : 'bg-zinc-950/70 text-zinc-400 hover:text-white border-zinc-800'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>Reverse Career Trajectories</span>
        </button>

        <button
          onClick={() => setActiveTab('exam_timeline')}
          className={`px-4 py-2 rounded-xl text-xs font-mono transition flex items-center gap-2 border ${
            activeTab === 'exam_timeline'
              ? 'bg-zinc-100 text-zinc-950 font-bold border-white'
              : 'bg-zinc-950/70 text-zinc-400 hover:text-white border-zinc-800'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Board & Entrance Exam Calendar</span>
        </button>
      </div>

      {/* TAB 1: Stream Selection Advisor */}
      {activeTab === 'stream_advisor' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stream Options List */}
          <div className="lg:col-span-1 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1 px-1">
              Official Academic Streams
            </div>
            {STREAM_OPTIONS.map((stream) => {
              const isSelected = stream.id === selectedStreamId;
              return (
                <div
                  key={stream.id}
                  onClick={() => setSelectedStreamId(stream.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-zinc-900 border-zinc-500 shadow-lg ring-1 ring-zinc-500'
                      : 'bg-zinc-950 border-zinc-850 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{stream.name}</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                        stream.academicIntensity === 'Very High'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {stream.academicIntensity} Intensity
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-1">{stream.badge}</div>
                </div>
              );
            })}
          </div>

          {/* Stream Detail Inspector */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <span>COMPREHENSIVE STREAM BREAKDOWN</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">{selectedStream.name}</h3>
              <p className="text-sm text-zinc-300 mt-2 leading-relaxed">{selectedStream.suitedFor}</p>
            </div>

            {/* Core & Electives Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2 font-bold">
                  Mandatory Core Tier
                </span>
                <ul className="space-y-1.5 text-xs text-zinc-200 font-mono">
                  {selectedStream.coreSubjects.map((sub, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2 font-bold">
                  Recommended High-Yield Electives
                </span>
                <ul className="space-y-1.5 text-xs text-zinc-200 font-mono">
                  {selectedStream.popularElectives.map((ele, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{ele}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Career Gateways */}
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-2 font-bold">
                Direct Career Gateways
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedStream.careerGateways.map((gate, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-950 border border-zinc-800 text-zinc-200"
                  >
                    {gate}
                  </span>
                ))}
              </div>
            </div>

            {/* Critical Caveats / Warnings */}
            {selectedStream.riskWarnings.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Strategic Advisory Warning</span>
                </div>
                {selectedStream.riskWarnings.map((warn, i) => (
                  <p key={i} className="leading-relaxed">
                    {warn}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Reverse Career Trajectories */}
      {activeTab === 'career_trajectories' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Career Target List */}
          <div className="lg:col-span-1 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1 px-1">
              High-Growth Global Careers
            </div>
            {CAREER_TRAJECTORIES.map((career) => {
              const isSelected = career.id === selectedCareerId;
              return (
                <div
                  key={career.id}
                  onClick={() => setSelectedCareerId(career.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-zinc-900 border-zinc-500 shadow-lg ring-1 ring-zinc-500'
                      : 'bg-zinc-950 border-zinc-850 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{career.title}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {career.category}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1 line-clamp-1">{career.tagline}</div>
                </div>
              );
            })}
          </div>

          {/* Reverse Engineering Roadmap */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                REVERSE CAREER ARCHITECTURE
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight mt-2">{selectedCareer.title}</h3>
              <p className="text-sm text-zinc-300 mt-1">{selectedCareer.tagline}</p>
            </div>

            {/* Step-by-Step Backwards Timeline */}
            <div className="space-y-4">
              {/* Step 1: 10th Foundation */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    STEP 1: Class 10 Foundation Prerequisite
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">Current Phase</span>
                </div>
                <div className="text-xs text-zinc-300 mb-2">
                  Must build maximum conceptual velocity in:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.class10FocusAreas.map((f, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-950 border border-zinc-800 text-zinc-200"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step 2: 11th & 12th Academic Path */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-xs font-mono font-bold text-emerald-400 block mb-2">
                  STEP 2: Class 11 & 12 Academic Stream
                </span>
                <div className="text-xs text-zinc-200 font-mono mb-1">
                  <strong>Recommended Stream:</strong> {selectedCareer.recommendedStream}
                </div>
                <div className="text-xs text-zinc-400 font-mono">
                  <strong>Mandatory Subjects:</strong> {selectedCareer.mandatory12thSubjects.join(', ')}
                </div>
              </div>

              {/* Step 3: Key Entrance Gateways */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-xs font-mono font-bold text-indigo-400 block mb-2">
                  STEP 3: Primary Entrance Gateways
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.keyEntranceExams.map((exam, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-950 border border-zinc-800 text-zinc-200"
                    >
                      {exam}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step 4: Premier Destinations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span className="text-[11px] font-mono font-bold text-zinc-400 block mb-1">
                    Top Indian Institutions
                  </span>
                  <div className="text-xs text-zinc-200 font-mono">
                    {selectedCareer.topCollegesIndia.join(' • ')}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span className="text-[11px] font-mono font-bold text-zinc-400 block mb-1">
                    Global Benchmark Programs
                  </span>
                  <div className="text-xs text-zinc-200 font-mono">
                    {selectedCareer.globalPathways.join(' • ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Board & Entrance Exam Calendar */}
      {activeTab === 'exam_timeline' && (
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Academic & Entrance Examination Milestone Radar
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Official national timelines for CBSE, ICSE, and foundational competitive Olympiads.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                period: 'Mid-October 2026',
                event: 'Pre-Board 1 & Syllabus Completion Milestone',
                target: 'Class 10 CBSE & ICSE',
                action: '100% textbook syllabus coverage complete. Initiate 10-year PYQ chapter tests.',
                badge: 'MILESTONE',
              },
              {
                period: 'November 2026',
                event: 'National Olympiads (SOF NSO, IMO, PRMO/IOQM)',
                target: 'Foundation Class 8–10',
                action: 'High-yield problem-solving across Mathematics & Science.',
                badge: 'COMPETITIVE',
              },
              {
                period: 'December 2026',
                event: 'Pre-Board 2 & Full-Length Sample Papers (3 Hours Strict)',
                target: 'Class 10 Board Candidates',
                action: 'Calibrate time allocation: Section A (MCQs) in 25 mins, Section E (Case study) in 30 mins.',
                badge: 'CRITICAL',
              },
              {
                period: 'Mid-February – March 2027',
                event: 'Official CBSE & ICSE Class 10 Board Examinations',
                target: 'National Examinations',
                action: 'High-confidence recall phase. Strict 15-minute daily formula checkups.',
                badge: 'EXAM_WINDOW',
              },
              {
                period: 'April – May 2027',
                event: 'Class 11 Stream Locking & Early Foundation Start',
                target: 'Post-10th Transition',
                action: 'Lock in PCM, PCB, Commerce, or Humanities based on empirical diagnostic readiness.',
                badge: 'DECISION',
              },
            ].map((milestone, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">{milestone.period}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                      {milestone.target}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-white">{milestone.event}</div>
                  <div className="text-xs text-zinc-400 leading-relaxed">{milestone.action}</div>
                </div>

                <span className="shrink-0 text-[10px] font-mono px-2 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
                  {milestone.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
