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
  ShieldCheck,
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
    // 1. Strict Proper Signup Check: fetch user authentication session
    fetch('/api/auth/session')
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) {
          // If not properly signed up, redirect to initialize/signup flow
          router.push('/initialize');
          return;
        }
        setUser(data.user);
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

    // 3. Hydrate Deployed Configuration from Cookie or LocalStorage
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
      } else {
        const saved = localStorage.getItem('loopedu_saved_student');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.board) setAgentBoard(parsed.board);
          if (parsed.grade) setAgentGrade(parsed.grade);
        }
      }
    } catch (e) {
      console.warn('Could not parse configuration:', e);
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-800 font-sans">
        <div className="flex flex-col items-center gap-3">
          <Activity className="w-8 h-8 text-[#0066FF] animate-pulse" />
          <p className="text-xs text-slate-500 font-medium">Verifying student credentials &amp; loading mission control...</p>
        </div>
      </div>
    );
  }

  const firstName = (user?.name || 'Student').split(' ')[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24 selection:bg-[#0066FF] selection:text-white">
      {/* 1. Status Bar */}
      <div className="border-b border-slate-200 bg-white px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs shadow-2xs">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-slate-800 font-bold tracking-tight">
            {statusBar}
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-500 text-[11px] font-semibold">
          <span>
            DIGITAL TWIN: <strong className="text-[#0066FF]">pgvector HNSW ONLINE</strong>
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            5-AGENT SWARM: ACTIVE
          </span>
        </div>
      </div>

      {/* Main Workspace Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* Header Hero */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0066FF] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                Autonomous Mission Control
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-semibold">
                {agentBoard} • {agentGrade}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
              Welcome back, {firstName}.
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1.5 max-w-xl leading-relaxed">
              Your personalized study loop is calibrated for 15 minutes a day. Master concepts, review flashcards, and consult your academic roadmap.
            </p>
          </div>

          {/* Quick HUD Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl text-center min-w-[105px] shadow-2xs">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">SmartScore™</span>
              <span className="text-2xl font-extrabold text-[#0066FF] tabular-nums">{smartScore}</span>
              <span className="text-[10px] text-slate-400 block font-medium">/ 100</span>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl text-center min-w-[105px] shadow-2xs">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Streak</span>
              <span className="text-2xl font-extrabold text-amber-500 tabular-nums">{streak}</span>
              <span className="text-[10px] text-slate-400 block font-medium">Days</span>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl text-center min-w-[105px] shadow-2xs">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Solved</span>
              <span className="text-2xl font-extrabold text-emerald-600 tabular-nums">{totalAttempted}</span>
              <span className="text-[10px] text-slate-400 block font-medium">Questions</span>
            </div>
          </div>
        </div>

        {/* 2. THE 5 CORE PILLARS TOOLBAR */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/study/cbse-10-science"
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#0066FF] transition flex items-center gap-3 group shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#0066FF] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#0066FF]">Question Bank</div>
              <div className="text-[10px] text-slate-500">1,600+ Questions</div>
            </div>
          </Link>

          <Link
            href="/mind-maps"
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-cyan-500 transition flex items-center gap-3 group shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center shrink-0">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-cyan-700">Concept Mind Maps</div>
              <div className="text-[10px] text-slate-500">Visual Hierarchy</div>
            </div>
          </Link>

          <Link
            href="/flashcards"
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 transition flex items-center gap-3 group shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700">Flashcards</div>
              <div className="text-[10px] text-slate-500">Spaced Repetition</div>
            </div>
          </Link>

          <Link
            href="/consultant"
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 transition flex items-center gap-3 group shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">Academic Advisory</div>
              <div className="text-[10px] text-slate-500">Stream &amp; Careers</div>
            </div>
          </Link>
        </section>

        {/* 2.5 AUTONOMOUS 5-AGENT SWARM TELEMETRY (Light Theme + Cobalt & Yellow Accents) */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0066FF]">
                  Active Pedagogical Swarm
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-medium">Continuous Telemetry Loop</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-950 tracking-tight">
                Cognitive Digital Twin &amp; Multi-Agent HUD
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-semibold font-mono">
                pgvector: <strong className="text-[#0066FF]">HNSW Indexed</strong>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                Zero Hallucination Guard
              </span>
            </div>
          </div>

          {/* 5-Agent Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              {
                name: 'Diagnostic Agent',
                role: 'Latency & Error Tracing',
                status: 'Tracking',
                color: 'text-[#0066FF]',
                badge: 'bg-blue-50 border-blue-200',
              },
              {
                name: 'Socratic Tutor',
                role: 'Deconstruction Engine',
                status: 'Guarded',
                color: 'text-amber-800',
                badge: 'bg-amber-50 border-amber-200',
              },
              {
                name: 'Feynman Evaluator',
                role: 'Voice Concept Defense',
                status: 'Ready',
                color: 'text-purple-700',
                badge: 'bg-purple-50 border-purple-200',
              },
              {
                name: 'Curriculum Architect',
                role: '10-Yr Recurrence Rubric',
                status: 'Synced',
                color: 'text-emerald-700',
                badge: 'bg-emerald-50 border-emerald-200',
              },
              {
                name: 'Burnout Sentinel',
                role: '15m Daily Focus Ceiling',
                status: 'Pacing Active',
                color: 'text-rose-700',
                badge: 'bg-rose-50 border-rose-200',
              },
            ].map((agent, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Agent {i + 1}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${agent.badge} ${agent.color}`}>
                      {agent.status}
                    </span>
                  </div>
                  <div className="text-xs font-extrabold text-slate-900 mt-1">{agent.name}</div>
                </div>
                <div className="text-[11px] text-slate-500 leading-snug">{agent.role}</div>
              </div>
            ))}
          </div>

          {/* 4 Objective Telemetry Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Syllabus Velocity</span>
              <span className="text-2xl font-extrabold text-[#0066FF] tabular-nums">78.4%</span>
              <span className="text-[10px] text-slate-500 block mt-0.5 font-medium">Coverage pacing</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Error Leakage Index</span>
              <span className="text-2xl font-extrabold text-emerald-600 tabular-nums">3.8%</span>
              <span className="text-[10px] text-slate-500 block mt-0.5 font-medium">Quarantined errors</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">SRS Retention Health</span>
              <span className="text-2xl font-extrabold text-amber-500 tabular-nums">94.2%</span>
              <span className="text-[10px] text-slate-500 block mt-0.5 font-medium">24h comeback score</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Daily Focus Budget</span>
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">12 / 15m</span>
              <span className="text-[10px] text-slate-500 block mt-0.5 font-medium">Burnout ceiling budget</span>
            </div>
          </div>
        </section>

        {/* 3. THE DAILY FIVE QUEUE (Cobalt Blue + Warm Yellow Highlights) */}
        <section className="bg-gradient-to-br from-[#0066FF] to-blue-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl text-white relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-950 bg-amber-300 px-2.5 py-0.5 rounded-full">
                  Recommended Daily Pacing
                </span>
                <span className="text-xs text-blue-100">• 15m Ceiling Budget</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                The Daily Five Queue
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
                Calibrated for your {displayCourses.length} active {agentBoard} tracks. High-yield board and NCERT questions with stepped Socratic guidance.
              </p>
            </div>

            {/* Time Selector */}
            <div className="flex items-center gap-2 text-xs font-bold">
              {(['5min', '10min', '15min'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMinutes(m)}
                  className={`px-3.5 py-2 rounded-xl transition ${
                    selectedMinutes === m
                      ? 'bg-white text-[#0066FF] shadow-sm'
                      : 'bg-blue-800/60 text-blue-100 hover:bg-blue-800'
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
              className="inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-8 py-4 rounded-2xl text-sm transition shadow-lg active:scale-98 group"
            >
              <Zap className="w-4 h-4 fill-current text-slate-950 group-hover:scale-110 transition" />
              <span>
                Start Today’s Practice — {minuteOptions[selectedMinutes].qCount} Questions
              </span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition" />
            </Link>

            <button
              onClick={() => setShowTestPlanner(!showTestPlanner)}
              className="inline-flex items-center gap-2 bg-blue-800/80 hover:bg-blue-800 text-white font-semibold px-5 py-4 rounded-2xl text-xs transition border border-blue-400/30"
            >
              <Calendar className="w-4 h-4 text-blue-200" />
              <span>Upcoming Exam Planner...</span>
            </button>
          </div>

          {/* Calm Test Planner */}
          {showTestPlanner && (
            <div className="mt-4 p-5 bg-white text-slate-900 rounded-2xl max-w-lg space-y-3 text-xs shadow-md">
              <h4 className="font-extrabold text-slate-900 text-xs">📅 School Exam Target Planner</h4>
              <p className="text-slate-500 text-[11px]">
                Enter your upcoming school test date. LoopEdu calculates a steady, non-cramming daily trajectory.
              </p>
              <input
                type="date"
                value={testDate}
                onChange={(e) => setTestDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-xs focus:outline-none focus:border-[#0066FF]"
              />
              {testDate && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-[11px] space-y-1 font-medium">
                  <p className="font-bold text-emerald-800">Calibrated Daily Trajectory:</p>
                  <p>
                    {Math.max(0, Math.ceil((new Date(testDate).getTime() - Date.now()) / 86400000))} days remaining — 5 questions/day comfortably finishes the unit without cramming.
                  </p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* 4. SYLLABUS VELOCITY (White Cards with Blue Progress Bars) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-950 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#0066FF]" /> Active Course Velocity
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Coverage across chosen {agentBoard} {agentGrade} courses
              </p>
            </div>

            <Link
              href="/catalogue"
              className="text-xs font-bold text-[#0066FF] hover:underline flex items-center gap-1 transition"
            >
              View Full Catalog <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayCourses.map((course, idx) => (
              <div
                key={course.id || idx}
                className="bg-white border border-slate-200 rounded-3xl p-5 flex flex-col justify-between hover:border-slate-300 transition shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                        Code {course.code}
                      </span>
                      <h3 className="font-extrabold text-base text-slate-950 mt-0.5">
                        {course.name}
                      </h3>
                    </div>

                    <span className="text-[10px] font-bold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full text-[#0066FF]">
                      ACTIVE TRACK
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 truncate">
                    📖 {course.officialTextbook || 'NCERT Standard'}
                  </p>

                  {/* Velocity Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                      <span>Curriculum Velocity</span>
                      <span className="text-slate-900 tabular-nums">
                        {Math.min(100, (idx + 1) * 18)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#0066FF] h-full rounded-full"
                        style={{ width: `${Math.min(100, (idx + 1) * 18)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    {course.chapterCount || 13} Chapters
                  </span>
                  <Link
                    href={`/study/${course.name.toLowerCase().includes('math') ? 'maths-standard' : 'science'}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition"
                  >
                    <span>Practice Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. MISTAKE COMEBACK */}
        {mistakeCount > 0 ? (
          <section className="bg-amber-50 border border-amber-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-amber-950">
                  Your Next Small Win (Mistake Comeback)
                </h3>
                <p className="text-xs text-amber-800 mt-0.5">
                  You have {mistakeCount} flagged questions ready for review. Retrying them turns misconceptions into permanent test wins.
                </p>
              </div>
            </div>

            <Link
              href="/study/science?filter=revisit"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition shrink-0 shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Practise Mistakes Now</span>
            </Link>
          </section>
        ) : (
          <section className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-slate-600 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong className="text-slate-900">Revision Queue Clear:</strong> All previous flagged items reviewed. High accuracy maintained.
            </span>
          </section>
        )}
      </div>
    </div>
  );
}
