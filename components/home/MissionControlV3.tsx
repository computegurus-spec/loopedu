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
  Database,
  Sliders,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Check,
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
      code: 'AGENT_DIAGNOSTIC_v4',
      badge: 'Cognitive Latency & Leakage Telemetry',
      role: 'Continuous Behavioral Observation',
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
      code: 'AGENT_SOCRATIC_v4',
      badge: 'First-Principles Guidance',
      role: 'Active Problem Deconstruction',
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
      code: 'AGENT_FEYNMAN_v4',
      badge: 'Voice Conceptual Verification',
      role: 'Verbal Mastery Audit',
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
      code: 'AGENT_CURRICULUM_v4',
      badge: 'Official Board & Recurrence Alignment',
      role: 'Deterministic Syllabus Mapping',
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
      code: 'AGENT_SENTINEL_v4',
      badge: 'Cognitive Load & Pacing Regulation',
      role: 'Fatigue Protection & Retention',
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
    <div className="bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. HERO SECTION: Enterprise Mission Control */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-800">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b14_1px,transparent_1px),linear-gradient(to_bottom,#1e293b14_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Top Status Capsule */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
              <span className="text-white font-semibold">WORLD’S FIRST AUTONOMOUS AGI STUDENT AGENT</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">MISSION-CONTROL ECOSYSTEM</span>
            </div>
          </div>

          {/* Headline & Manifesto */}
          <div className="text-center mt-7 max-w-4xl mx-auto space-y-5">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              The Autonomous Student Agent.
              <br />
              <span className="text-slate-400">Deterministic academic mastery.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              We reject superficial AI chat wrappers and static PDF guidebooks. LoopEdu operates as a continuous, telemetry-driven pedagogical partner that builds a persistent vector digital twin of your brain and manages your entire academic lifecycle.
            </p>

            {/* Smart Search & Autonomous Intake Launcher */}
            <div className="max-w-xl mx-auto pt-4">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  value={typedQuery}
                  onChange={(e) => setTypedQuery(e.target.value)}
                  placeholder="Enter your board, grade, or goal (e.g. CBSE Class 10, JEE Main, NEET-UG, Karnataka State)..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl pl-12 pr-40 py-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition shadow-xl"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-500 text-white font-semibold text-xs transition shadow-md"
                >
                  Initialize Agent →
                </button>
              </form>

              {/* Supported Fast Paths */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs text-slate-400">
                <span className="text-slate-500 text-[11px]">Instant Curriculums:</span>
                {[
                  { label: 'CBSE Class 10', q: 'CBSE Class 10' },
                  { label: 'Class 8 Foundation', q: '8th Standard CBSE' },
                  { label: 'JEE Main Foundation', q: 'JEE Main' },
                  { label: 'NEET-UG Medical', q: 'NEET' },
                  { label: 'Karnataka State (KTBS)', q: 'Karnataka State' },
                  { label: 'Maharashtra (Balbharati)', q: 'Maharashtra State' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => router.push(`/initialize?q=${encodeURIComponent(item.q)}`)}
                    className="px-2.5 py-0.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] transition"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. THE TELEMETRY HUD DASHBOARD (Live Interactive Simulation) */}
          <div className="mt-14 max-w-5xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden font-mono">
            {/* Top Terminal Status Header */}
            <div className="bg-slate-950 border-b border-slate-800 px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Cpu className="w-4 h-4 text-[#0066FF]" />
                <span className="font-bold text-white">STUDENT_AGENT_TELEMETRY_HUD</span>
                <span className="text-slate-600">|</span>
                <span className="text-emerald-400">STATUS: AGENT ONLINE</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span>CURRICULUM: CBSE GRADE 10 (CODE 086 & 041)</span>
                <span className="text-slate-600">•</span>
                <span className="text-white">PGVECTOR SYNCED</span>
              </div>
            </div>

            {/* HUD Interior */}
            <div className="p-6 sm:p-8 bg-slate-950 space-y-6">
              {/* Telemetry Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Syllabus Velocity</span>
                  <div className="text-lg font-bold text-emerald-400 tabular-nums">78.4%</div>
                  <span className="text-[10px] text-slate-400 block">Ahead of board schedule</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Error Leakage Index</span>
                  <div className="text-lg font-bold text-blue-400 tabular-nums">3.8%</div>
                  <span className="text-[10px] text-slate-400 block">Low conceptual debt</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">SRS Retention Health</span>
                  <div className="text-lg font-bold text-cyan-400 tabular-nums">94.2%</div>
                  <span className="text-[10px] text-slate-400 block">Optimal Ebbinghaus curve</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Daily Pacing Budget</span>
                  <div className="text-lg font-bold text-amber-400 tabular-nums">12m / 15m</div>
                  <span className="text-[10px] text-slate-400 block">Burnout Sentinel active</span>
                </div>
              </div>

              {/* Cognitive Digital Twin Graph Row */}
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-400" />
                    <span className="font-bold text-white">COGNITIVE DIGITAL TWIN (SUPABASE PGVECTOR)</span>
                  </div>
                  <span className="text-[11px] text-slate-400">VECTOR NAMESPACE: dt_vec_student_10</span>
                </div>

                {/* Concept Mastery Nodes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300">Polynomials & Real Proofs</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      CONSOLIDATED (96%)
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300">Electricity & Ohm’s Law</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
                      ACTIVE RECALL (88%)
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300">Quadratic Word Problems</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                      LEAKAGE DETECTED (64%)
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800">
                  <span>Diagnostic Action: Socratic remediation queued for tomorrow morning session.</span>
                  <Link href="/initialize" className="text-[#0066FF] hover:underline flex items-center gap-1 font-semibold">
                    <span>Deploy Your Digital Twin</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE MULTI-AGENT PEDAGOGICAL SWARM (Interactive Agent Deep Dive) */}
      <section className="py-20 sm:py-24 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0066FF] bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
              THE MULTI-AGENT ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              A specialized AI swarm continuously working for you.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Instead of a single chatbot that tries to do everything poorly, LoopEdu orchestrates five specialized autonomous agents working in parallel across your study cycle.
            </p>
          </div>

          {/* Agent Switcher Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 border-b border-slate-800 pb-4">
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
                  className={`p-3 rounded-xl text-xs transition text-left flex items-center gap-2 border ${
                    isActive
                      ? 'bg-slate-900 border-blue-500 text-white font-bold shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0066FF]' : 'text-slate-500'}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Agent Detail Card */}
          <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-[#0066FF] font-bold">{currentAgent.code}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">{currentAgent.badge}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mt-1">{currentAgent.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{currentAgent.role}</p>
              </div>

              <span className="text-xs font-mono px-3 py-1 rounded bg-slate-950 border border-slate-800 text-emerald-400 font-semibold self-start sm:self-auto">
                AUTONOMOUS ACTIVE
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {currentAgent.description}
            </p>

            {/* Agent Telemetry Output Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentAgent.metrics.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    {m.label}
                  </span>
                  <div className="text-sm font-bold text-white mt-0.5 font-mono">{m.val}</div>
                </div>
              ))}
            </div>

            {/* Simulated Live Output Stream */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex items-start gap-3">
              <span className="text-[#0066FF] font-bold shrink-0">AGENT_OUTPUT:</span>
              <span className="leading-relaxed">{currentAgent.output}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SMART AUTONOMOUS INTAKE (Dynamic Curriculum Resolution) */}
      <section className="py-20 sm:py-24 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                ZERO HARDCODED FORMS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Smart Autonomous Intake.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                When a student selects their grade and board (e.g. CBSE 8th/10th, ICSE, or State Boards), our Curriculum Architect Agent dynamically queries verified standards and pulls official course codes and textbooks directly from central portals.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Central Board (NCERT official codes & textbooks)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>State Boards: Karnataka KTBS, Maharashtra Balbharati, TN DGE</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Competitive Exam Foundation: JEE Main, NEET-UG, CUET</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/initialize"
                  className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-xs transition shadow-md"
                >
                  <span>Launch Intake Engine</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Interactive Mock Grid */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-slate-400">Live Intake Simulation:</span>
                <span className="text-emerald-400 font-bold">CBSE Class 10 (AISSE Verified)</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { name: 'Mathematics (Standard)', code: '041', book: 'NCERT Class X (ncert.nic.in)', core: true },
                  { name: 'Science (Physics, Chem, Bio)', code: '086', book: 'NCERT Science Class X', core: true },
                  { name: 'Social Science', code: '087', book: 'Our Pasts, Democratic Politics, Res & Dev', core: true },
                  { name: 'English Language & Literature', code: '184', book: 'First Flight & Footprints', core: true },
                  { name: 'Coding & AI Skills', code: '417', book: 'CBSE Skill Education Standard X', core: false },
                ].map((track, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded bg-[#0066FF] text-white flex items-center justify-center font-bold text-[10px]">
                        ✓
                      </div>
                      <div>
                        <span className="font-bold text-white">{track.name}</span>
                        <span className="text-[10px] text-slate-500 ml-2">Code {track.code}</span>
                        <div className="text-[10px] text-slate-400 font-sans mt-0.5">📖 {track.book}</div>
                      </div>
                    </div>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded ${
                        track.core
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-slate-800 text-slate-400'
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

      {/* 5. FINAL MISSION CONTROL INITIALIZATION CALL */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#0066FF] bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            START YOUR PERFORMANCE ENGINEERING
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Deploy your autonomous student agent in under 60 seconds.
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Zero setup fees. Zero fluff. Immediate access to your syllabus graph, 15-minute daily practice queue, and persistent cognitive digital twin.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/initialize"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0066FF] hover:bg-blue-500 text-white font-bold text-sm transition shadow-xl active:scale-95"
            >
              Initialize Your Student Agent →
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-sm font-semibold transition"
            >
              Sign In to Existing Agent
            </Link>
          </div>

          <div className="pt-6 text-xs font-mono text-slate-500 flex items-center justify-center gap-6">
            <span>✓ Verified CBSE, ICSE & State Standards</span>
            <span>✓ Non-Commercial Academic Access</span>
            <span>✓ Privacy-Protected Supabase pgvector</span>
          </div>
        </div>
      </section>
    </div>
  );
};
