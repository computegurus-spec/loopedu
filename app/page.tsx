import React from 'react';
import { getSessionUser } from '@/lib/auth/session';
import { MissionControlHero } from '@/components/home/MissionControlHero';
import { LiveIntakeSimulator } from '@/components/home/LiveIntakeSimulator';
import { SwarmTopologySection } from '@/components/home/SwarmTopologySection';
import { BoardExamTimeMachine } from '@/components/home/BoardExamTimeMachine';
import { ParentWhispererVoiceNote } from '@/components/home/ParentWhispererVoiceNote';

export default async function HomePage() {
  const user = await getSessionUser();

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen">
      {/* 1. Phase 1: Enterprise Mission Control Hero */}
      <MissionControlHero isLoggedIn={Boolean(user)} />

      {/* 2. Interactive Smart Intake Engine Simulator */}
      <LiveIntakeSimulator />

      {/* 3. Multi-Agent Swarm Topology & Specialization */}
      <SwarmTopologySection />

      {/* 4. Board Exam High-Yield Recurrence Engine (CBSE 2017–2026 Analysis) */}
      <section className="py-20 sm:py-24 bg-zinc-950 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded">
              CURRICULUM ARCHITECT KNOWLEDGE GRAPH
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              10-Year Board Paper Topic Recurrence Heatmap
            </h2>
            <p className="text-sm text-zinc-400">
              Exam recurrence patterns analyzed from 2017 to 2026 board papers. Zero guesswork.
            </p>
          </div>

          <BoardExamTimeMachine />
        </div>
      </section>

      {/* 5. Parent & Teacher Observability Telemetry */}
      <section className="py-20 sm:py-24 bg-zinc-950 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ParentWhispererVoiceNote />
        </div>
      </section>
    </div>
  );
}
