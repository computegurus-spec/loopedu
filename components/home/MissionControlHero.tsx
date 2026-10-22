'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Cpu,
  ArrowRight,
  Terminal,
  Activity,
  CheckCircle2,
  Database,
  Layers,
  Shield,
  Zap,
} from 'lucide-react';

interface MissionControlHeroProps {
  isLoggedIn?: boolean;
}

export const MissionControlHero: React.FC<MissionControlHeroProps> = ({ isLoggedIn }) => {
  const [activeBoard, setActiveBoard] = useState('CBSE');
  const [activeGrade, setActiveGrade] = useState('8th Standard');

  return (
    <div className="relative border-b border-zinc-800/80 bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Background Architectural Grid (Linear/Stripe Precision) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] select-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Real-Time Swarm Telemetry Ribbon */}
      <div className="border-b border-zinc-800/60 bg-zinc-950/70 px-4 sm:px-6 py-2 flex items-center justify-between text-[11px] font-mono text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            SWARM_STATUS: ONLINE
          </span>
          <span className="text-zinc-700 hidden sm:inline">•</span>
          <span className="hidden sm:inline text-zinc-400">
            ENGINE: <strong className="text-zinc-200">CURRICULUM_ARCHITECT_V4.2</strong>
          </span>
          <span className="text-zinc-700 hidden md:inline">•</span>
          <span className="hidden md:inline text-zinc-400">
            VECTOR_STORE: <strong className="text-zinc-200">SUPABASE_PGVECTOR</strong>
          </span>
        </div>

        <div className="flex items-center gap-4 text-zinc-400">
          <span className="tabular-nums">
            LATENCY: <strong className="text-zinc-200">12ms</strong>
          </span>
          <span className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-[10px] text-zinc-300">
            PROD_US_EAST
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Razor-Sharp Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Telemetry Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>AUTONOMOUS COGNITIVE AGENT SWARM</span>
              <span className="text-zinc-600">/</span>
              <span className="text-emerald-400 font-bold">CBSE • ICSE • STATE</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Continuous exam mastery without cramming.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl font-normal leading-relaxed">
              LoopEdu provisions an autonomous multi-agent swarm tailored to your exact board and grade. Continuous 15-minute daily practice, dynamic syllabus graphs, and cognitive digital twins.
            </p>

            {/* Primary Action Button (High-Contrast Enterprise Mission Control Action) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/initialize"
                className="inline-flex items-center justify-center gap-3 bg-zinc-100 hover:bg-white text-zinc-950 font-bold px-7 py-4 rounded-xl text-sm transition shadow-2xl active:scale-98 group"
              >
                <Cpu className="w-4 h-4 text-zinc-950 group-hover:rotate-12 transition" />
                <span>Initialize Your Student Agent</span>
                <ArrowRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-1 transition" />
              </Link>

              {isLoggedIn ? (
                <Link
                  href="/learn"
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-xs font-mono font-bold text-zinc-300 border border-zinc-800 hover:bg-zinc-900 transition"
                >
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Resume Mission Control →</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-xs font-mono font-medium text-zinc-400 hover:text-zinc-200 transition"
                >
                  <span>Returning Student Login</span>
                </Link>
              )}
            </div>

            {/* Telemetry Micro-Stats */}
            <div className="pt-6 border-t border-zinc-900 grid grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <p className="text-zinc-500 uppercase tracking-wider text-[10px]">Session Budget</p>
                <p className="font-bold text-white text-sm mt-0.5 tabular-nums">15 Mins / Day</p>
              </div>
              <div>
                <p className="text-zinc-500 uppercase tracking-wider text-[10px]">Active Tracks</p>
                <p className="font-bold text-white text-sm mt-0.5 tabular-nums">All 8 Core Codes</p>
              </div>
              <div>
                <p className="text-zinc-500 uppercase tracking-wider text-[10px]">Accuracy Target</p>
                <p className="font-bold text-white text-sm mt-0.5 tabular-nums">95%+ Board Rigor</p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Swarm Telemetry Terminal (Linear/Stripe Mission Control style) */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs">
              {/* Terminal Window Header */}
              <div className="bg-zinc-950 border-b border-zinc-800/80 px-4 py-3 flex items-center justify-between text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
                  <span className="text-[11px] text-zinc-400 font-bold ml-2">swarm_telemetry.log</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
                  LIVE_FEED
                </span>
              </div>

              {/* Dynamic Interactive Swarm Simulator */}
              <div className="p-5 space-y-4 text-zinc-300">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="text-[11px] text-zinc-400">
                    TESTING_TIER: <span className="text-white font-bold">{activeBoard} {activeGrade}</span>
                  </div>
                  <div className="flex gap-1.5 text-[10px]">
                    <button
                      onClick={() => { setActiveBoard('CBSE'); setActiveGrade('8th Standard'); }}
                      className={`px-2 py-0.5 rounded border transition ${
                        activeGrade === '8th Standard'
                          ? 'bg-zinc-100 text-zinc-950 border-zinc-100 font-bold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      CBSE 8th
                    </button>
                    <button
                      onClick={() => { setActiveBoard('CBSE'); setActiveGrade('Class 10'); }}
                      className={`px-2 py-0.5 rounded border transition ${
                        activeGrade === 'Class 10'
                          ? 'bg-zinc-100 text-zinc-950 border-zinc-100 font-bold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      CBSE 10th
                    </button>
                  </div>
                </div>

                {/* Agent Activity Log Feed */}
                <div className="space-y-2 text-[11px] leading-relaxed">
                  <div className="flex items-start gap-2 text-zinc-400">
                    <span className="text-emerald-400 shrink-0">→</span>
                    <span>
                      <strong className="text-zinc-200">Curriculum Architect:</strong> Verified active syllabus standards for {activeBoard} {activeGrade}.
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1.5 text-[10px]">
                    <div className="text-zinc-500 uppercase tracking-wider font-semibold">
                      Dynamically Fetched Tracks:
                    </div>
                    {activeGrade === '8th Standard' ? (
                      <div className="grid grid-cols-2 gap-1 text-zinc-300">
                        <span>[✓] Maths (041)</span>
                        <span>[✓] Science (086)</span>
                        <span>[✓] SST (087)</span>
                        <span>[✓] English (184)</span>
                        <span>[✓] Hindi (002)</span>
                        <span className="text-zinc-500">[ ] Sanskrit (122)</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-1 text-zinc-300">
                        <span>[✓] Maths Std (041)</span>
                        <span>[✓] Science (086)</span>
                        <span>[✓] SST (087)</span>
                        <span>[✓] English (184)</span>
                        <span>[✓] AI Skill (417)</span>
                        <span className="text-zinc-500">[ ] German (017)</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-start gap-2 text-zinc-400">
                    <span className="text-blue-400 shrink-0">→</span>
                    <span>
                      <strong className="text-zinc-200">Diagnostic Agent:</strong> Cognitive digital twin embeddings ready in Supabase pgvector.
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-zinc-400">
                    <span className="text-amber-400 shrink-0">→</span>
                    <span>
                      <strong className="text-zinc-200">Burnout Sentinel:</strong> Calibrated strict 15m session ceiling (5 questions max).
                    </span>
                  </div>
                </div>

                {/* Telemetry Status Bar */}
                <div className="pt-3 border-t border-zinc-800 text-[10px] flex items-center justify-between text-zinc-500">
                  <span className="truncate">
                    System Status: Agent Online • Curriculum Loaded: {activeBoard} {activeGrade}
                  </span>
                  <span className="text-emerald-400 font-bold shrink-0">READY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
