import React from 'react';
import { getSessionUser } from '@/lib/auth/session';
import { SaaSHero } from '@/components/home/SaaSHero';
import { FivePillarsSection } from '@/components/home/FivePillarsSection';
import { LiveIntakeSimulator } from '@/components/home/LiveIntakeSimulator';
import { BoardExamTimeMachine } from '@/components/home/BoardExamTimeMachine';
import { ParentWhispererVoiceNote } from '@/components/home/ParentWhispererVoiceNote';

export default async function HomePage() {
  const user = await getSessionUser();

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen">
      {/* 1. International SaaS Hero with 5-Pillar Live Switcher */}
      <SaaSHero isLoggedIn={Boolean(user)} />

      {/* 2. The 5 Core Pillars Section (Coach, Questions, Mind Maps, Flashcards, Advisory) */}
      <FivePillarsSection />

      {/* 3. Dynamic Course & Curriculum Intake Engine */}
      <LiveIntakeSimulator />

      {/* 4. 10-Year Board Paper Topic Recurrence Heatmap (2017–2026 Analysis) */}
      <section className="py-20 sm:py-24 bg-zinc-950 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded">
              CURRICULUM ANALYSIS ENGINE
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

      {/* 5. Parent & Teacher Weekly Briefing Telemetry */}
      <section className="py-20 sm:py-24 bg-zinc-950 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ParentWhispererVoiceNote />
        </div>
      </section>
    </div>
  );
}
