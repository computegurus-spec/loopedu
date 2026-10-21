'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, BookOpen, CheckCircle2, ShieldCheck, Users } from 'lucide-react';
import { HeroInteractiveWidget } from './HeroInteractiveWidget';

interface AlbertHeroProps {
  isLoggedIn?: boolean;
}

export const AlbertHero: React.FC<AlbertHeroProps> = ({ isLoggedIn = false }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0284C7] via-[#0369A1] to-[#075985] text-white pt-10 pb-16 sm:py-20">
      {/* Albert-style background grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-bold text-white shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>🎁 100% Free Weekly Sprint • 10 High-Yield CBSE Questions Every Week</span>
          </div>
        </div>

        {/* Center Hero Copy */}
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
            Rigorous, syllabus-aligned practice...
            <br className="hidden sm:inline" />
            <span className="text-emerald-300"> made for students and teachers</span>
          </h1>

          <p className="text-base sm:text-xl text-sky-100 max-w-2xl mx-auto leading-relaxed font-normal">
            CBSE Class 10 adaptive skills practice + premium question banks with official step-by-step NCERT marking schemes. Built by master educators.
          </p>

          {/* Action Button Group */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            {isLoggedIn ? (
              <Link
                href="/learn"
                className="inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-bold px-7 py-4 rounded-xl text-sm sm:text-base transition shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>Continue Daily Habit Loop →</span>
              </Link>
            ) : (
              <Link
                href="/onboarding"
                className="inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-bold px-7 py-4 rounded-xl text-sm sm:text-base transition shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>Start Free Practice (10 Free Questions)</span>
              </Link>
            )}

            <Link
              href="#subjects"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-4 rounded-xl text-sm sm:text-base border border-white/30 backdrop-blur-sm transition"
            >
              <span>Explore subjects →</span>
            </Link>
          </div>

          {/* Key Value Prop Badges */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-6 text-xs text-sky-100 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Zero sign-up required for Q1</span>
            </span>
            <span className="hidden sm:inline text-sky-300">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>100% NCERT marking scheme</span>
            </span>
            <span className="hidden sm:inline text-sky-300">•</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-300" />
              <span>For Self-Study & Classroom Testing</span>
            </span>
          </div>
        </div>

        {/* Live Interactive Problem Walkthrough Box (Albert Rigor Showcase) */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
          <div className="bg-slate-950/80 backdrop-blur-md rounded-3xl p-2 sm:p-3 border border-white/20 shadow-2xl">
            <div className="px-4 py-2 flex items-center justify-between text-xs text-sky-200 border-b border-white/10 mb-2">
              <span className="font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Live Interactive Sample Problem (Instant Active Recall)</span>
              </span>
              <span className="font-mono text-emerald-300 font-semibold">CBSE 2027 Pattern</span>
            </div>
            <HeroInteractiveWidget />
          </div>
        </div>
      </div>
    </section>
  );
};
