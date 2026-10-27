'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export function MindCoachShowcase() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'FOCUS' | 'BREAK'>('FOCUS');

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
      if (timerMode === 'FOCUS') {
        setTimerMode('BREAK');
        setSecondsLeft(5 * 60);
      } else {
        setTimerMode('FOCUS');
        setSecondsLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, timerMode]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  function handleReset() {
    setIsRunning(false);
    setTimerMode('FOCUS');
    setSecondsLeft(25 * 60);
  }

  return (
    <section className="py-16 lg:py-24 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            Student Mental Wellness & Focus
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bounded Mind Coach & Statutory Crisis Safeguard
          </h2>
          <p className="text-sm text-slate-400">
            Exam preparation should build competence, not burnout. LoopEdu integrates an autonomous, non-clinical reflective companion with zero-guilt rest planning and certified national crisis support.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left: Interactive 25/5 Pomodoro Demo */}
          <div className="rounded-3xl bg-slate-950 border border-slate-800 p-8 text-center space-y-6 shadow-2xl">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Cognitive Focus Cycle</span>
              <span className={`px-2.5 py-0.5 rounded font-bold ${timerMode === 'FOCUS' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                {timerMode === 'FOCUS' ? '25-Min Deep Focus' : '5-Min Rest Cycle'}
              </span>
            </div>

            {/* Timer Display */}
            <div className="py-6">
              <div className="text-6xl sm:text-7xl font-mono font-black text-white tracking-tight">
                {timeFormatted}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {timerMode === 'FOCUS' ? 'No distractions. Work through one diagnostic problem set.' : 'Step away from screen. Hydrate and stretch.'}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition shadow ${
                  isRunning
                    ? 'bg-amber-600 hover:bg-amber-500 text-white'
                    : 'bg-purple-600 hover:bg-purple-500 text-white'
                }`}
              >
                {isRunning ? 'Pause Focus Cycle' : 'Start 25-Min Focus'}
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
              >
                Reset
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400">
              Built into every student session with zero guilt for rest days.
            </div>
          </div>

          {/* Right: Privacy & Statutory Helplines */}
          <div className="space-y-6">
            
            {/* Privacy Invariant Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Absolute Student Privacy Guarantee</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mind Coach reflections, daily stress check-ins, and personal journal notes are encrypted and <strong>strictly isolated</strong> from parents, educators, and recruiters. Your vulnerability is never monetized or exposed.
              </p>
            </div>

            {/* Statutory Helplines Directory */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Government of India Statutory Helplines
                </span>
                <span className="text-[10px] font-mono text-emerald-400">24x7 Toll-Free</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-white">Tele-MANAS (MoHFW)</div>
                  <div className="text-emerald-400 font-mono font-bold text-sm">14416 / 1800-891-4416</div>
                  <div className="text-[10px] text-slate-400">Statutory Mental Health Assistance</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-white">KIRAN Helpline</div>
                  <div className="text-emerald-400 font-mono font-bold text-sm">1800-599-0019</div>
                  <div className="text-[10px] text-slate-400">Ministry of Social Justice 24/7</div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed">
                *LoopEdu Mind Coach provides bounded, non-clinical supportive structure. Any detection of crisis keywords triggers immediate escalation to certified statutory numbers.
              </div>
            </div>

            {/* Launch Coach Link */}
            <div>
              <Link
                href="/coach"
                className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300 transition"
              >
                <span>Open Mind Coach & Reflection Hub →</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
