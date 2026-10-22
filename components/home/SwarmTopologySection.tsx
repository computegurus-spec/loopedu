'use client';

import React from 'react';
import Link from 'next/link';
import {
  Cpu,
  Layers,
  Shield,
  Activity,
  Zap,
  ArrowRight,
  Database,
  Clock,
  Sparkles,
  GitBranch,
} from 'lucide-react';

export const SwarmTopologySection: React.FC = () => {
  const agents = [
    {
      code: 'AGENT_01',
      name: 'Curriculum & Compliance Architect',
      role: 'Autonomous Syllabus Standards Engine',
      description:
        'Continuously queries verified repository standards for any Board and Grade. Dynamically resolves course codes, official textbook chapters, and builds non-linear prerequisite graphs.',
      telemetry: 'Coverage: 100% NCERT/CISCE • Dependency Tree: Active',
      accent: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
      icon: Layers,
    },
    {
      code: 'AGENT_02',
      name: 'Diagnostic Agent (Cognitive Twin)',
      role: 'Vector Embeddings & Knowledge Frontiers',
      description:
        'Maintains the student’s Cognitive Digital Twin vector space in Supabase (pgvector). Maps precise conceptual boundaries and identifies root-cause misconceptions instead of surface mistakes.',
      telemetry: 'Vector Space: pgvector HNSW • Dimension: 1536-dim',
      accent: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      icon: Cpu,
    },
    {
      code: 'AGENT_03',
      name: 'Burnout Sentinel',
      role: 'Baseline Budget & Fatigue Interlock',
      description:
        'Calibrates the baseline daily time budget (15 minutes / 5 questions). Strictly prevents cramming and study fatigue through spaced revision cadences (24h, 72h, 7d).',
      telemetry: 'Budget: 15m/Day • Interlock: Enforced • Streak: Active',
      accent: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      icon: Clock,
    },
    {
      code: 'AGENT_04',
      name: 'Telemetry & Observability Agent',
      role: 'Live Performance Telemetry & Reports',
      description:
        'Monitors student exam readiness and diagnostic velocity in real time. Generates transparent, anti-micromanagement parent updates and teacher marking rubrics.',
      telemetry: 'Sync: Real-time WebSocket • Signal: High Precision',
      accent: 'border-violet-500/30 text-violet-400 bg-violet-500/10',
      icon: Activity,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-zinc-950 border-b border-zinc-800/80 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
            <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
            <span>SWARM TOPOLOGY &amp; AGENT SPECIALIZATION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Four autonomous agents coordinating in parallel.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            Unlike monolithic chatbots or static question apps, LoopEdu runs a specialized multi-agent swarm where each agent is engineered for a single high-stakes learning objective.
          </p>
        </div>

        {/* 4 Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.code}
                className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-6 sm:p-7 flex flex-col justify-between hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-200 group shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${agent.accent}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-500 block">
                          {agent.code}
                        </span>
                        <h3 className="font-bold text-base text-white group-hover:text-zinc-100 transition">
                          {agent.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs font-mono text-zinc-300 font-medium">
                    {agent.role}
                  </p>

                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {agent.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-zinc-800/70 mt-6 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-500 truncate max-w-[280px]">
                    {agent.telemetry}
                  </span>
                  <span className="text-emerald-400 font-bold shrink-0">
                    ONLINE
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Deploy Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-bold text-white text-base">
              Ready to deploy your student agent?
            </h3>
            <p className="text-xs text-zinc-400">
              Takes 30 seconds to lock curriculum parameters and initialize vector space.
            </p>
          </div>

          <Link
            href="/initialize"
            className="inline-flex items-center justify-center gap-2 bg-zinc-100 hover:bg-white text-zinc-950 font-bold px-6 py-3.5 rounded-xl text-xs transition shadow-lg shrink-0 active:scale-98"
          >
            <span>Initialize Student Agent</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
