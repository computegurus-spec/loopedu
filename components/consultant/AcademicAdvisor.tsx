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

  const selectedStream = STREAM_OPTIONS.find((s) => s.id === selectedStreamId) || STREAM_OPTIONS[0];
  const selectedCareer = CAREER_TRAJECTORIES.find((c) => c.id === selectedCareerId) || CAREER_TRAJECTORIES[0];

  return (
    <div className="space-y-6">
      {/* Top Advisory Nav Pills */}
      <div className="p-1.5 rounded-2xl bg-slate-100 border border-slate-200 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('stream_advisor')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
            activeTab === 'stream_advisor'
              ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-sm'
              : 'bg-white text-slate-700 hover:text-slate-900 border-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Stream Selection (Post-10th)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('career_trajectories')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
            activeTab === 'career_trajectories'
              ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-sm'
              : 'bg-white text-slate-700 hover:text-slate-900 border-slate-200'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Reverse Career Trajectories</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('exam_timeline')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
            activeTab === 'exam_timeline'
              ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-sm'
              : 'bg-white text-slate-700 hover:text-slate-900 border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Board &amp; Entrance Exam Calendar</span>
        </button>
      </div>

      {/* TAB 1: Stream Selection Advisor */}
      {activeTab === 'stream_advisor' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stream Options List */}
          <div className="lg:col-span-1 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 px-1">
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
                      ? 'bg-blue-50/80 border-[#0066FF] shadow-sm ring-1 ring-blue-100'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">{stream.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        stream.academicIntensity === 'Very High'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {stream.academicIntensity}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">{stream.badge}</div>
                </div>
              );
            })}
          </div>

          {/* Stream Detail Inspector */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0066FF] mb-1">
                <span>COMPREHENSIVE STREAM BREAKDOWN</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight">{selectedStream.name}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{selectedStream.suitedFor}</p>
            </div>

            {/* Core & Electives Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                  Mandatory Core Tier
                </span>
                <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
                  {selectedStream.coreSubjects.map((sub, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                  Recommended High-Yield Electives
                </span>
                <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
                  {selectedStream.popularElectives.map((ele, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>{ele}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Career Gateways */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                Direct Career Gateways Unlocked
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedStream.careerGateways.map((gate, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-800 shadow-2xs"
                  >
                    {gate}
                  </span>
                ))}
              </div>
            </div>

            {/* Critical Caveats / Warnings */}
            {selectedStream.riskWarnings.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Strategic Advisory Assessment</span>
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
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 px-1">
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
                      ? 'bg-blue-50/80 border-[#0066FF] shadow-sm ring-1 ring-blue-100'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">{career.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {career.category}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 line-clamp-1">{career.tagline}</div>
                </div>
              );
            })}
          </div>

          {/* Reverse Engineering Roadmap */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                REVERSE CAREER ENGINEERING
              </span>
              <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight mt-2.5">{selectedCareer.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{selectedCareer.tagline}</p>
            </div>

            {/* Step-by-Step Backwards Timeline */}
            <div className="space-y-4">
              {/* Step 1: 10th Foundation */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#0066FF]">
                    STEP 1: Class 10 Foundation Prerequisite
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                    Current Phase
                  </span>
                </div>
                <div className="text-xs text-slate-600 mb-2 font-medium">
                  Must build maximum conceptual mastery in:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.class10FocusAreas.map((f, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-800 shadow-2xs"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step 2: 11th & 12th Academic Path */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-emerald-700 block mb-2">
                  STEP 2: Class 11 &amp; 12 Academic Stream
                </span>
                <div className="text-xs text-slate-800 font-semibold mb-1">
                  <strong>Recommended Stream:</strong> {selectedCareer.recommendedStream}
                </div>
                <div className="text-xs text-slate-600">
                  <strong>Mandatory Subjects:</strong> {selectedCareer.mandatory12thSubjects.join(', ')}
                </div>
              </div>

              {/* Step 3: Key Entrance Gateways */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-indigo-700 block mb-2">
                  STEP 3: Primary Entrance Gateways
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.keyEntranceExams.map((exam, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-800 shadow-2xs"
                    >
                      {exam}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step 4: Premier Destinations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-700 block mb-1">
                    Top Indian Institutions
                  </span>
                  <div className="text-xs text-slate-800 font-medium">
                    {selectedCareer.topCollegesIndia.join(' • ')}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-700 block mb-1">
                    Global Benchmark Programs
                  </span>
                  <div className="text-xs text-slate-800 font-medium">
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
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">
              Academic &amp; Entrance Examination Milestone Radar
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Official national timelines for CBSE, ICSE, and foundational competitive Olympiads.
            </p>
          </div>

          <div className="space-y-3">
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
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-slate-300 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0066FF]">{milestone.period}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                      {milestone.target}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">{milestone.event}</div>
                  <div className="text-xs text-slate-600 leading-relaxed">{milestone.action}</div>
                </div>

                <span className="shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-800 shadow-2xs">
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
