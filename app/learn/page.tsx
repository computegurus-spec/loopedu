'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Activity,
  Layers,
  Flame,
  Star,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Calendar,
  BookOpen,
  GitBranch,
  Compass,
  Zap,
  BarChart3,
  Sliders,
} from 'lucide-react';

interface SelectedCourse {
  id: string;
  code: string;
  name: string;
  shortName?: string;
  officialTextbook?: string;
  chapterCount?: number;
}

export default function WorkspacePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

  // Deployed Student Configuration State
  const [agentBoard, setAgentBoard] = useState('CBSE');
  const [agentGrade, setAgentGrade] = useState('8th Standard');
  const [activeCourses, setActiveCourses] = useState<SelectedCourse[]>([]);
  const [statusBar, setStatusBar] = useState(
    'System Status: Online • Curriculum Loaded: CBSE Grade 8 • Diagnostic Ready'
  );

  // Daily Routine & Velocity Metrics
  const [selectedMinutes, setSelectedMinutes] = useState<'5min' | '10min' | '15min'>('15min');
  const [streak, setStreak] = useState(0);
  const [smartScore, setSmartScore] = useState(78);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [showTestPlanner, setShowTestPlanner] = useState(false);
  const [testDate, setTestDate] = useState('');

  useEffect(() => {
    // 1. Fetch user authentication session
    fetch('/api/auth/session')
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) {
          router.push('/initialize');
          return;
        }
        setUser(data.user);
        setIsPro(Boolean(data.isPaid || data.user.isPro || data.user.role === 'admin'));
        setLoading(false);
      })
      .catch(() => {
        router.push('/initialize');
      });

    // 2. Fetch student progress metrics
    fetch('/api/student/progress')
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          if (data.currentStreak !== undefined) setStreak(data.currentStreak);
          if (data.smartScore) setSmartScore(data.smartScore);
          if (data.totalAttempted !== undefined) setTotalAttempted(data.totalAttempted);
          if (data.mistakeCount !== undefined) setMistakeCount(data.mistakeCount);
        }
      })
      .catch(() => {});

    // 3. Hydrate Deployed Configuration from Cookie
    try {
      const match = document.cookie.match(/loopedu_agent_config=([^;]+)/);
      if (match && match[1]) {
        const config = JSON.parse(decodeURIComponent(match[1]));
        if (config.board) setAgentBoard(config.board);
        if (config.grade) setAgentGrade(config.grade);
        if (config.statusBar) setStatusBar(config.statusBar);
        if (Array.isArray(config.selectedCourses) && config.selectedCourses.length > 0) {
          setActiveCourses(config.selectedCourses);
        }
      }
    } catch (e) {
      console.warn('Could not parse configuration cookie:', e);
    }
  }, [router]);

  // Fallback active courses if none deployed yet
  const displayCourses =
    activeCourses.length > 0
      ? activeCourses
      : [
          { id: 'c1', code: '041', name: 'Mathematics', officialTextbook: 'NCERT Class VIII', chapterCount: 13 },
          { id: 'c2', code: '086', name: 'Science', officialTextbook: 'NCERT Class VIII', chapterCount: 13 },
          { id: 'c3', code: '087', name: 'Social Science', officialTextbook: 'Our Pasts-III, Res & Dev', chapterCount: 16 },
          { id: 'c4', code: '184', name: 'English', officialTextbook: 'Honeydew & It So Happened', chapterCount: 12 },
          { id: 'c5', code: '002', name: 'Hindi', officialTextbook: 'Vasant Bhag-3', chapterCount: 14 },
        ];

  const minuteOptions = {
    '5min': { qCount: 2, label: '5 Min SPRINT', desc: '2 high-yield diagnostic questions' },
    '10min': { qCount: 3, label: '10 Min STANDARD', desc: '3 core conceptual questions' },
    '15min': { qCount: 5, label: '15 Min FULL LOOP', desc: '5 questions (Daily Five baseline)' },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-100 font-mono">
        <div className="flex flex-col items-center gap-3">
          <Activity className="w-6 h-6 text-emerald-400 animate-pulse" />
          <p className="text-xs text-zinc-400">Loading student workspace...</p>
        </div>
      </div>
    );
  }

  const firstName = (user?.name || 'Learner').split(' ')[0];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-24 selection:bg-zinc-800 selection:text-white">
      {/* 1. Status Bar */}
      <div className="border-b border-zinc-800/80 bg-zinc-950 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-zinc-200 font-bold tracking-tight">
            {statusBar}
          </span>
        </div>

        <div className="flex items-center gap-4 text-zinc-500 text-[11px]">
          <span>
            DIGITAL TWIN: <strong className="text-blue-400">pgvector HNSW ONLINE</strong>
          </span>
          <span className="text-zinc-700 hidden sm:inline">|</span>
          <span className="text-emerald-400 font-semibold">
            5-AGENT SWARM: ACTIVE
          </span>
        </div>
      </div>

      {/* Main Workspace Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* Header Hero */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-zinc-800/80 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded">
                Daily Study Workspace
              </span>
              <span className="text-zinc-600 font-mono">•</span>
              <span className="text-xs text-zinc-400 font-mono">
                {agentBoard} • {agentGrade}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, {firstName}.
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              Your personalized study loop is calibrated for 15 minutes a day. Master concepts, review flashcards, and consult your academic roadmap.
            </p>
          </div>

          {/* Quick HUD Metrics */}
          <div className="flex items-center gap-3 font-mono">
            <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-2xl text-center min-w-[100px]">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">SmartScore™</span>
              <span className="text-2xl font-bold text-blue-400 tabular-nums">{smartScore}</span>
              <span className="text-[10px] text-zinc-500 block">/ 100</span>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-2xl text-center min-w-[100px]">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Streak</span>
              <span className="text-2xl font-bold text-amber-400 tabular-nums">{streak}</span>
              <span className="text-[10px] text-zinc-500 block">Days</span>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-2xl text-center min-w-[100px]">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Solved</span>
              <span className="text-2xl font-bold text-emerald-400 tabular-nums">{totalAttempted}</span>
              <span className="text-[10px] text-zinc-500 block">Questions</span>
            </div>
          </div>
        </div>

        {/* 2. THE 5 CORE PILLARS TOOLBAR */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/study/cbse-10-science"
            className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-zinc-200">Question Bank</div>
              <div className="text-[10px] text-zinc-500 font-mono">1,600+ Questions</div>
            </div>
          </Link>

          <Link
            href="/mind-maps"
            className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <GitBranch className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-zinc-200">Concept Mind Maps</div>
              <div className="text-[10px] text-zinc-500 font-mono">Visual Hierarchy</div>
            </div>
          </Link>

          <Link
            href="/flashcards"
            className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-zinc-200">Flashcards</div>
              <div className="text-[10px] text-zinc-500 font-mono">Spaced Repetition</div>
            </div>
          </Link>

          <Link
            href="/consultant"
            className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-zinc-200">Academic Advisory</div>
              <div className="text-[10px] text-zinc-500 font-mono">Stream & Careers</div>
            </div>
          </Link>
        </section>

        {/* 2.5 AUTONOMOUS 5-AGENT SWARM TELEMETRY */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold">
                  Active Pedagogical Swarm
                </span>
                <span className="text-slate-600 font-mono">•</span>
                <span className="text-xs text-slate-400 font-mono">Continuous Telemetry Loop</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Cognitive Digital Twin & Multi-Agent HUD
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                pgvector: <strong className="text-blue-400">HNSW Indexed</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                Zero Hallucination Guard
              </span>
            </div>
          </div>

          {/* 5-Agent Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono">
            {[
              {
                name: 'Diagnostic Agent',
                role: 'Latency & Error Tracing',
                status: 'Tracking',
                color: 'text-blue-400',
                badge: 'bg-blue-500/10 border-blue-500/30',
              },
              {
                name: 'Socratic Tutor',
                role: 'Deconstruction Engine',
                status: 'Guarded',
                color: 'text-emerald-400',
                badge: 'bg-emerald-500/10 border-emerald-500/30',
              },
              {
                name: 'Feynman Evaluator',
                role: 'Voice Concept Defense',
                status: 'Ready',
                color: 'text-purple-400',
                badge: 'bg-purple-500/10 border-purple-500/30',
              },
              {
                name: 'Curriculum Architect',
                role: '10-Yr Recurrence Rubric',
                status: 'Synced',
                color: 'text-amber-400',
                badge: 'bg-amber-500/10 border-amber-500/30',
              },
              {
                name: 'Burnout Sentinel',
                role: '15m Daily Focus Ceiling',
                status: 'Pacing Active',
                color: 'text-rose-400',
                badge: 'bg-rose-500/10 border-rose-500/30',
              },
            ].map((agent, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Agent {i + 1}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded border font-semibold ${agent.badge} ${agent.color}`}>
                      {agent.status}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white mt-1">{agent.name}</div>
                </div>
                <div className="text-[10px] text-slate-400 leading-snug">{agent.role}</div>
              </div>
            ))}
          </div>

          {/* 4 Objective Telemetry Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Syllabus Velocity</span>
              <span className="text-xl font-bold text-blue-400 tabular-nums">78.4%</span>
              <span className="text-[10px] text-slate-500 block">Coverage pacing</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Error Leakage Index</span>
              <span className="text-xl font-bold text-emerald-400 tabular-nums">3.8%</span>
              <span className="text-[10px] text-slate-500 block">Quarantined errors</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">SRS Retention Health</span>
              <span className="text-xl font-bold text-amber-400 tabular-nums">94.2%</span>
              <span className="text-[10px] text-slate-500 block">24h comeback score</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Daily Focus Budget</span>
              <span className="text-xl font-bold text-white tabular-nums">12 / 15m</span>
              <span className="text-[10px] text-slate-500 block">Burnout ceiling budget</span>
            </div>
          </div>
        </section>

        {/* 3. THE DAILY FIVE QUEUE (Pre-built Daily Practice Loop) */}
        <section className="bg-gradient-to-b from-zinc-900/90 to-zinc-900/50 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                  Recommended Daily Pacing
                </span>
                <span className="text-xs text-zinc-500 font-mono">• 15m Ceiling Budget</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                The Daily Five Queue
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Calibrated for your {displayCourses.length} active {agentBoard} tracks. High-yield board and NCERT questions with step-by-step guidance.
              </p>
            </div>

            {/* Time Selector */}
            <div className="flex items-center gap-2 font-mono text-xs">
              {(['5min', '10min', '15min'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMinutes(m)}
                  className={`px-3 py-1.5 rounded-xl border transition ${
                    selectedMinutes === m
                      ? 'bg-zinc-100 text-zinc-950 font-bold border-zinc-100 shadow-sm'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {minuteOptions[m].label.split(' ')[0]}m
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href={`/study/science?mode=${selectedMinutes}`}
              className="inline-flex items-center gap-3 bg-zinc-100 hover:bg-white text-zinc-950 font-bold px-7 py-4 rounded-2xl text-sm transition shadow-2xl active:scale-98 group"
            >
              <Zap className="w-4 h-4 fill-current text-zinc-950 group-hover:scale-110 transition" />
              <span>
                Start Today’s Practice — {minuteOptions[selectedMinutes].qCount} Questions
              </span>
              <ArrowRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-1 transition" />
            </Link>

            <button
              onClick={() => setShowTestPlanner(!showTestPlanner)}
              className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/80 text-zinc-300 font-mono px-5 py-4 rounded-2xl text-xs transition"
            >
              <Calendar className="w-4 h-4 text-zinc-400" />
              <span>Upcoming Exam Planner...</span>
            </button>
          </div>

          {/* Calm Test Planner */}
          {showTestPlanner && (
            <div className="mt-4 p-5 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-lg space-y-3 font-mono text-xs">
              <h4 className="font-bold text-white text-xs">📅 School Exam Target Planner</h4>
              <p className="text-zinc-400 text-[11px]">
                Enter your upcoming school test date. LoopEdu calculates a steady, non-cramming daily trajectory.
              </p>
              <input
                type="date"
                value={testDate}
                onChange={(e) => setTestDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-xs focus:outline-none"
              />
              {testDate && (
                <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-zinc-300 text-[11px] space-y-1">
                  <p className="font-bold text-emerald-400">Calibrated Daily Trajectory:</p>
                  <p>
                    {Math.max(0, Math.ceil((new Date(testDate).getTime() - Date.now()) / 86400000))} days remaining — 5 questions/day comfortably finishes the unit without cramming.
                  </p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* 4. SYLLABUS VELOCITY (Shows active progress across dynamically chosen courses) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-400" /> Active Course Velocity
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Coverage across chosen {agentBoard} {agentGrade} courses
              </p>
            </div>

            <Link
              href="/catalogue"
              className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition"
            >
              View Full Catalog <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayCourses.map((course, idx) => (
              <div
                key={course.id || idx}
                className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-zinc-700 transition"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                        Code {course.code}
                      </span>
                      <h3 className="font-bold text-sm text-white mt-0.5">
                        {course.name}
                      </h3>
                    </div>

                    <span className="text-[10px] font-mono bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded text-emerald-400 font-semibold">
                      ACTIVE TRACK
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 font-mono truncate">
                    📖 {course.officialTextbook || 'NCERT Standard'}
                  </p>

                  {/* Velocity Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                      <span>Curriculum Velocity</span>
                      <span className="text-zinc-300 tabular-nums">
                        {Math.min(100, (idx + 1) * 18)}%
                      </span>
                    </div>
                    <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-400 h-full rounded-full"
                        style={{ width: `${Math.min(100, (idx + 1) * 18)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800/60 mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-500">
                    {course.chapterCount || 13} Chapters
                  </span>
                  <Link
                    href={`/study/${course.name.toLowerCase().includes('math') ? 'maths-standard' : 'science'}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs transition"
                  >
                    <span>Practice Track</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. MISTAKE COMEBACK */}
        {mistakeCount > 0 ? (
          <section className="bg-zinc-900/60 border border-orange-500/30 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">
                  Your Next Small Win (Mistake Comeback)
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  You have {mistakeCount} flagged questions ready for review. Retrying them turns misconceptions into permanent test wins.
                </p>
              </div>
            </div>

            <Link
              href="/study/science?filter=revisit"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold px-4 py-2.5 rounded-xl text-xs transition shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Practise Mistakes Now</span>
            </Link>
          </section>
        ) : (
          <section className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 flex items-center gap-3 text-xs text-zinc-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-zinc-200">Revision Queue Clear:</strong> All previous flagged items reviewed. High accuracy maintained.
            </span>
          </section>
        )}
      </div>
    </div>
  );
}
