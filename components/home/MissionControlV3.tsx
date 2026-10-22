'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Activity,
  Cpu,
  Layers,
  Search,
  ArrowRight,
  CheckCircle2,
  Brain,
  Mic,
  Clock,
  Shield,
  Zap,
  BookOpen,
  Sparkles,
  ChevronRight,
  Target,
  GraduationCap,
} from 'lucide-react';

interface MissionControlProps {
  isLoggedIn?: boolean;
}

export const MissionControlV3: React.FC<MissionControlProps> = ({ isLoggedIn }) => {
  const router = useRouter();
  const [typedQuery, setTypedQuery] = useState('');
  const [activeAgentTab, setActiveAgentTab] = useState<'diagnostic' | 'socratic' | 'feynman' | 'curriculum' | 'sentinel'>('diagnostic');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedQuery.trim()) {
      router.push(`/initialize?q=${encodeURIComponent(typedQuery.trim())}`);
    } else {
      router.push('/initialize');
    }
  };

  const agents = {
    diagnostic: {
      name: 'The Diagnostic Agent',
      code: 'AGENT_DIAGNOSTIC',
      badge: 'Cognitive Latency & Leakage Telemetry',
      role: 'Continuous Behavioral Observation',
      accentColor: 'text-[#0066FF] bg-blue-50 border-blue-200',
      description:
        'Monitors student hesitation timing (latency per question), distractor selection patterns, and error clusters in real-time. Automatically differentiates between careless miscalculations and deep prerequisite knowledge debt.',
      metrics: [
        { label: 'Hesitation Latency', val: '1.8s avg' },
        { label: 'Error Leakage Index', val: '4.2%' },
        { label: 'Knowledge Boundary', val: '94.6% confidence' },
      ],
      output: 'Flagged: Student hesitates >45s on quadratic speed-distance word problems. Root cause: Fractional equation reduction.',
    },
    socratic: {
      name: 'The Socratic Tutor',
      code: 'AGENT_SOCRATIC',
      badge: 'First-Principles Stepped Reasoning',
      role: 'Active Problem Deconstruction',
      accentColor: 'text-amber-800 bg-amber-50 border-amber-200',
      description:
        'Strictly rejects giving away direct answers or canned solutions. Deconstructs complex multi-step questions down to first principles with targeted diagnostic hints, training students to construct their own analytical breakthroughs.',
      metrics: [
        { label: 'Direct Answer Suppression', val: '100% Strict' },
        { label: 'Hint Progression', val: '3 Conceptual Stages' },
        { label: 'Self-Discovery Rate', val: '88.4%' },
      ],
      output: '"Look at Ohm’s Law again. If temperature stays constant and voltage doubles, what must happen to the current through the resistor?"',
    },
    feynman: {
      name: 'The Feynman Audio Evaluator',
      code: 'AGENT_FEYNMAN',
      badge: 'Voice Conceptual Verification',
      role: 'Verbal Mastery Audit',
      accentColor: 'text-purple-700 bg-purple-50 border-purple-200',
      description:
        'Prompts the student to turn on their microphone and explain the core scientific law or mathematical theorem in their own plain words. Analyzes conceptual fidelity, detects rote memorization, and awards a verified Feynman Mastery Score.',
      metrics: [
        { label: 'Acoustic Processing', val: 'Speech-to-Concept NLP' },
        { label: 'Rote Detection', val: 'Semantic Analysis' },
        { label: 'Feynman Depth Score', val: '92 / 100' },
      ],
      output: 'Verified: Student explained Snell’s law using optical medium speed differentials rather than memorized textbook lines.',
    },
    curriculum: {
      name: 'The Curriculum Architect',
      code: 'AGENT_CURRICULUM',
      badge: 'Official Board & Recurrence Alignment',
      role: 'Deterministic Syllabus Mapping',
      accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      description:
        'Maintains live synchronization with official CBSE, ICSE, and State Board standards (NCERT, KTBS, Balbharati, Samacheer Kalvi). Cross-references every practice item against 10-year official board examination frequency maps and marking rubrics.',
      metrics: [
        { label: 'Board Paper Index', val: '2017–2026 Verified' },
        { label: 'Marking Rubric Sync', val: 'Official NCERT' },
        { label: 'Recurrence Accuracy', val: '99.8%' },
      ],
      output: 'High-Recurrence Alert: CBSE tests proof of irrationality (√3, √5) in 10 out of 10 consecutive board examination years.',
    },
    sentinel: {
      name: 'The Burnout Sentinel',
      code: 'AGENT_SENTINEL',
      badge: 'Cognitive Load & Pacing Regulation',
      role: 'Fatigue Protection & Retention',
      accentColor: 'text-rose-700 bg-rose-50 border-rose-200',
      description:
        'Enforces a strict, non-negotiable 15-minute daily focus ceiling (The Daily Five). Manages spaced retrieval intervals (SRS) across 24 hours, 72 hours, and 7 days to guarantee permanent memory consolidation without cramming.',
      metrics: [
        { label: 'Daily Session Cap', val: '15 Minutes Strict' },
        { label: 'SRS Schedule', val: '24h / 72h / 7d' },
        { label: 'Fatigue Interlock', val: 'Active' },
      ],
      output: 'Session Locked: 5 high-yield questions completed in 13 minutes. Memory consolidation active. Next practice unlocks tomorrow 7:00 AM.',
    },
  };

  const currentAgent = agents[activeAgentTab];

  return (
    <div className="bg-slate-50 text-slate-900 font-sans selection:bg-[#0066FF] selection:text-white min-h-screen">
      {/* 1. HERO SECTION: Light Luminous & High-Contrast (EduVetra Inspired) */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-24 border-b border-slate-200/80 bg-gradient-to-b from-white via-blue-50/20 to-slate-50">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* Top Status Capsule */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
              <span className="text-slate-900 font-bold">Autonomous Student Agent</span>
              <span className="text-slate-300">•</span>
              <span className="text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                15-Min Calibrated Loop
              </span>
            </div>
          </div>

          {/* Headline & Subhead */}
          <div className="text-center mt-8 max-w-3xl mx-auto space-y-5">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
              Deterministic Academic Mastery{' '}
              <span className="text-[#0066FF]">for Every Student.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              An active pedagogical operating system that builds a persistent cognitive digital twin of your brain, eliminates guess-work, and turns academic weaknesses into permanent board examination wins.
            </p>

            {/* Smart Search & Autonomous Intake Launcher */}
            <div className="max-w-xl mx-auto pt-4">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-lg rounded-2xl bg-white border border-slate-200 focus-within:border-[#0066FF] focus-within:ring-2 focus-within:ring-blue-100 transition p-1.5">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0 pointer-events-none" />
                <input
                  type="text"
                  value={typedQuery}
                  onChange={(e) => setTypedQuery(e.target.value)}
                  placeholder="Enter your board, grade, or goal (e.g. CBSE Class 10, JEE, NEET)..."
                  className="w-full bg-transparent border-0 pl-3 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white font-bold text-xs transition shadow-sm shrink-0 flex items-center gap-1.5"
                >
                  <span>Initialize</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-center gap-6 pt-4 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>CBSE & State SCERT Portals</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <span>10-Year Recurrence Rubrics</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
                  <span>Zero Rote Guesswork</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE MULTI-AGENT PEDAGOGICAL SWARM (Light Background + Cobalt & Yellow Accents) */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-10 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              THE MULTI-AGENT ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              A specialized AI swarm continuously working for you.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Instead of a single chatbot that gives away answers, LoopEdu orchestrates five specialized autonomous agents working in parallel across your study cycle.
            </p>
          </div>

          {/* Agent Switcher Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 border-b border-slate-200 pb-4">
            {[
              { id: 'diagnostic', label: '1. Diagnostic Agent', icon: Activity },
              { id: 'socratic', label: '2. Socratic Tutor', icon: BookOpen },
              { id: 'feynman', label: '3. Feynman Evaluator', icon: Mic },
              { id: 'curriculum', label: '4. Curriculum Architect', icon: Layers },
              { id: 'sentinel', label: '5. Burnout Sentinel', icon: Clock },
            ].map((tab) => {
              const isActive = activeAgentTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveAgentTab(tab.id as any)}
                  className={`p-3.5 rounded-2xl text-xs transition text-left flex items-center gap-2.5 border ${
                    isActive
                      ? 'bg-blue-50/70 border-[#0066FF] text-[#0066FF] font-bold shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0066FF]' : 'text-slate-400'}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Agent Detail Card */}
          <div className="mt-6 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-[#0066FF]">{currentAgent.code}</span>
                  <span className="text-slate-300">•</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${currentAgent.accentColor}`}>
                    {currentAgent.badge}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-950 mt-1">{currentAgent.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{currentAgent.role}</p>
              </div>

              <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold self-start sm:self-auto flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>ONLINE & ACTIVE</span>
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {currentAgent.description}
            </p>

            {/* Agent Telemetry Output Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
              {currentAgent.metrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                    {m.label}
                  </span>
                  <div className="text-base font-bold text-slate-900 mt-0.5">{m.val}</div>
                </div>
              ))}
            </div>

            {/* Simulated Live Output Stream */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 flex items-start gap-3 shadow-2xs">
              <span className="font-mono text-[#0066FF] font-bold shrink-0">TELEMETRY_SAMPLE:</span>
              <span className="leading-relaxed font-medium">{currentAgent.output}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SMART AUTONOMOUS INTAKE (Dynamic Curriculum Resolution) */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                ZERO HARDCODED DROPDOWNS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Smart Autonomous Curriculum Intake.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                When a student selects their grade and board (e.g. CBSE 8th/10th, ICSE, or State Boards), our Curriculum Architect Agent dynamically queries verified central standards and synchronizes official course codes and textbooks directly from education portals.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 pt-2 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Central Board (NCERT official codes &amp; textbooks)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>State Boards: Karnataka KTBS, Maharashtra Balbharati, TN DGE</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Competitive Exam Foundation: JEE Main, NEET-UG, CUET</span>
                </li>
              </ul>
            </div>

            {/* Right Interactive Mock Grid */}
            <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-slate-500 font-medium">Live Curriculum Standards Ingestion:</span>
                <span className="text-[#0066FF] font-bold">CBSE Class 10 (AISSE Verified)</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { name: 'Mathematics (Standard)', code: '041', book: 'NCERT Class X (ncert.nic.in)', core: true },
                  { name: 'Science (Physics, Chem, Bio)', code: '086', book: 'NCERT Science Class X', core: true },
                  { name: 'Social Science', code: '087', book: 'Our Pasts, Democratic Politics, Res & Dev', core: true },
                  { name: 'English Language & Literature', code: '184', book: 'First Flight & Footprints', core: true },
                  { name: 'Information Technology / AI Skills', code: '402', book: 'CBSE Skill Standards Standard X', core: false },
                ].map((track, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:border-slate-300 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-lg bg-[#0066FF] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        ✓
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{track.name}</span>
                          <span className="text-[10px] font-mono text-slate-500">Code {track.code}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">📖 {track.book}</div>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        track.core
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {track.core ? 'MANDATORY' : 'ELECTIVE'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
