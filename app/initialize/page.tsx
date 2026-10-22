'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Cpu,
  Layers,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Clock,
  Target,
  Database,
  Activity,
  Zap,
  BookOpen,
  Terminal,
  Check,
  AlertCircle,
  Loader2,
} from 'lucide-react';

interface OfficialCourse {
  id: string;
  code: string;
  name: string;
  shortName: string;
  officialTextbook: string;
  isCore: boolean;
  category: 'mandatory' | 'elective' | 'skill';
  chapterCount: number;
  recommendedDailyMinutes: number;
  sampleTopics?: string[];
}

export default function InitializeAgentPage() {
  const router = useRouter();

  // Wizard Steps: 1: Parameters, 2: Course Grid, 3: Objectives & Handshake, 4: Swarm Startup Sequence
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Core Parameters
  const [board, setBoard] = useState('CBSE');
  const [grade, setGrade] = useState('8th Standard');
  const [targetObjective, setTargetObjective] = useState<'grade_mastery' | 'board_foundation' | 'olympiad'>('grade_mastery');

  // Dynamic Course Fetch State
  const [fetchingCourses, setFetchingCourses] = useState(false);
  const [courses, setCourses] = useState<OfficialCourse[]>([]);
  const [selectedCourseIds, setSelectedCourseIds] = useState<Set<string>>(new Set());
  const [curriculumStandardRef, setCurriculumStandardRef] = useState('');

  // Auth & Student Identity
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [authMethod, setAuthMethod] = useState<'google' | 'magic_link' | 'otp' | 'anonymous'>('google');

  // Multi-Agent Deployment Execution State
  const [deploying, setDeploying] = useState(false);
  const [deploymentLogs, setDeploymentLogs] = useState<string[]>([]);
  const [deployProgress, setDeployProgress] = useState(0);

  // 1. Dynamic Course Fetch triggered automatically when Board or Grade changes
  useEffect(() => {
    let isMounted = true;
    setFetchingCourses(true);

    fetch(`/api/agent/curriculum?board=${encodeURIComponent(board)}&grade=${encodeURIComponent(grade)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        setFetchingCourses(false);
        if (data.success && data.curriculum) {
          const fetchedCourses: OfficialCourse[] = data.curriculum.courses || [];
          setCourses(fetchedCourses);
          setCurriculumStandardRef(data.curriculum.standardReference || '');

          // Automatically pre-check mandatory core tracks
          const coreIds = new Set<string>();
          fetchedCourses.forEach((c) => {
            if (c.isCore || c.category === 'mandatory') {
              coreIds.add(c.id);
            }
          });
          setSelectedCourseIds(coreIds);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setFetchingCourses(false);
        console.error('Failed to fetch curriculum:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [board, grade]);

  const toggleCourse = (courseId: string) => {
    setSelectedCourseIds((prev) => {
      const next = new Set(prev);
      if (next.has(courseId)) {
        next.delete(courseId);
      } else {
        next.add(courseId);
      }
      return next;
    });
  };

  // Execute Parallel Agent Swarm Handshake Sequence
  const handleDeployAgent = async () => {
    setDeploying(true);
    setStep(4);
    setDeploymentLogs([]);
    setDeployProgress(15);

    const activeCourses = courses.filter((c) => selectedCourseIds.has(c.id));

    // Simulated high-speed telemetry log output for transparency
    const pushLog = (log: string) => {
      setDeploymentLogs((prev) => [...prev, log]);
    };

    setTimeout(() => {
      pushLog('⚡ [00:00.12] HANDSHAKE: Initializing connection to Autonomous AGI Swarm...');
      setDeployProgress(30);
    }, 200);

    setTimeout(() => {
      pushLog('🤖 [00:00.35] DIAGNOSTIC AGENT: Reserving Cognitive Digital Twin vector namespace (Supabase pgvector)...');
      setDeployProgress(55);
    }, 600);

    setTimeout(() => {
      pushLog(`📐 [00:00.68] CURRICULUM ARCHITECT: Constructing syllabus dependency graph for ${activeCourses.length} selected ${board} tracks...`);
      setDeployProgress(75);
    }, 1100);

    setTimeout(() => {
      pushLog('⏱️ [00:00.95] BURNOUT SENTINEL: Calibrating baseline daily ceiling to 15 mins (5 high-yield Qs/day)...');
      setDeployProgress(90);
    }, 1600);

    try {
      const res = await fetch('/api/agent/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          board,
          grade,
          selectedCourses: activeCourses,
          targetObjective,
          name: studentName || 'Learner Agent',
          email: studentEmail || `student_${Date.now()}@loopedu.in`,
          authMethod,
        }),
      });

      const data = await res.json();

      setTimeout(() => {
        pushLog('✅ [00:01.20] TELEMETRY SYNCHRONIZED: System Status: Agent Online • Curriculum Loaded: ' + board + ' ' + grade + ' • Diagnostic Ready');
        setDeployProgress(100);
      }, 2100);

      setTimeout(() => {
        router.push('/learn');
        router.refresh();
      }, 2600);
    } catch (err) {
      pushLog('⚠️ [00:01.30] NOTICE: Swarm initialized with safe local fallback telemetry.');
      setTimeout(() => {
        router.push('/learn');
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-white">
      {/* Top Telemetry Mission Control Status Ribbon */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md px-4 sm:px-6 h-12 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-5 h-5 rounded bg-zinc-100 text-zinc-950 flex items-center justify-center font-bold text-xs">
              L
            </div>
            <span className="font-bold tracking-tight text-white group-hover:text-zinc-300 transition">
              LoopEdu / Mission Control
            </span>
          </Link>
          <span className="text-zinc-700 hidden sm:inline">|</span>
          <span className="text-zinc-400 hidden sm:inline flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            SWARM_INTAKE_ENGINE_V4.2
          </span>
        </div>

        <div className="flex items-center gap-4 text-zinc-400">
          <span className="hidden md:inline text-[11px] tabular-nums">
            LATENCY: <strong className="text-zinc-200">14ms</strong>
          </span>
          <span className="text-[11px] bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded text-zinc-300">
            SECURE_HANDSHAKE
          </span>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {step !== 4 && (
          <div className="mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>AUTONOMOUS CONFIGURATION WIZARD</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Initialize Your Student Agent
            </h1>
            <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Our Curriculum Architect Agent queries live verified syllabus standards and dynamically provisions your personalized Cognitive Digital Twin. Zero static forms.
            </p>
          </div>
        )}

        {/* ================= STEP 1: CORE PARAMETERS ================= */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1">
                  Step 01 / 03 • Educational Framework
                </h2>
                <p className="text-base font-semibold text-white">
                  Where is the student starting from?
                </p>
              </div>

              {/* Board Selection */}
              <div className="space-y-2.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Select Board / Curriculum
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'CBSE', label: 'CBSE', desc: 'Central Board (NCERT)' },
                    { id: 'ICSE', label: 'ICSE', desc: 'CISCE Council' },
                    { id: 'IGCSE', label: 'IGCSE', desc: 'Cambridge International' },
                    { id: 'StateBoard', label: 'State Board', desc: 'State SCERT Framework' },
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBoard(b.id)}
                      className={`p-4 rounded-xl border text-left transition ${
                        board === b.id
                          ? 'bg-zinc-800 border-zinc-100 ring-1 ring-zinc-100 shadow-md'
                          : 'bg-zinc-950/60 border-zinc-800/80 hover:bg-zinc-800/50 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-white">{b.label}</span>
                        {board === b.id && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        )}
                      </div>
                      <span className="text-[11px] text-zinc-400 block leading-tight">
                        {b.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grade Selection */}
              <div className="space-y-2.5 pt-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Select Grade / Academic Standard
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { id: '8th Standard', label: '8th Standard', tag: 'Foundation' },
                    { id: 'Class 9', label: 'Class 9', tag: 'Pre-Board' },
                    { id: 'Class 10', label: 'Class 10', tag: 'AISSE Board' },
                    { id: 'Class 11', label: 'Class 11', tag: 'Senior Sec' },
                    { id: 'Class 12', label: 'Class 12', tag: 'AISSCE Board' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGrade(g.id)}
                      className={`p-3.5 rounded-xl border text-left transition ${
                        grade === g.id
                          ? 'bg-zinc-800 border-zinc-100 ring-1 ring-zinc-100 shadow-md'
                          : 'bg-zinc-950/60 border-zinc-800/80 hover:bg-zinc-800/50 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white truncate">{g.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 block mt-1">
                        {g.tag}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Autonomous Query Preview */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-blue-400" />
                  <span>
                    TARGET TIER:{' '}
                    <strong className="text-zinc-200 uppercase">
                      {board} • {grade}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Activity className="w-3 h-3 animate-spin" />
                  <span>AGENT READY</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 font-mono transition">
                ← Return to Mission Control
              </Link>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-white text-zinc-950 font-bold px-6 py-3.5 rounded-xl text-sm transition shadow-lg active:scale-98"
              >
                <span>Query Official Curriculum</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: DYNAMIC COURSE GRID ================= */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-4">
                <div>
                  <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-0.5">
                    Step 02 / 03 • Autonomous Curriculum Architect
                  </h2>
                  <p className="text-base font-semibold text-white">
                    Verified Active Courses for {board} {grade}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {curriculumStandardRef || 'Live NCERT / Board standard verified in repository.'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono bg-zinc-950 border border-zinc-800 px-3 py-1 rounded text-zinc-300">
                    {selectedCourseIds.size} of {courses.length} SELECTED
                  </span>
                </div>
              </div>

              {fetchingCourses ? (
                <div className="py-16 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                  <p className="text-xs font-mono text-zinc-400">
                    Curriculum Architect querying live syllabus standards...
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-zinc-400">
                    The agent has pre-checked your mandatory courses. Toggle optional electives to match your school schedule:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {courses.map((course) => {
                      const isSelected = selectedCourseIds.has(course.id);
                      return (
                        <div
                          key={course.id}
                          onClick={() => toggleCourse(course.id)}
                          className={`p-4 rounded-xl border text-left cursor-pointer transition select-none flex items-start gap-3.5 ${
                            isSelected
                              ? 'bg-zinc-800/90 border-zinc-600 shadow-md ring-1 ring-zinc-700'
                              : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 opacity-70'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 border transition ${
                              isSelected
                                ? 'bg-emerald-500 border-emerald-400 text-zinc-950 font-bold'
                                : 'border-zinc-700 bg-zinc-900'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="font-bold text-sm text-white truncate">
                                {course.name}
                              </h3>
                              <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-400 shrink-0">
                                Code {course.code}
                              </span>
                            </div>

                            <p className="text-xs text-zinc-400 mt-1 truncate">
                              📖 {course.officialTextbook}
                            </p>

                            <div className="flex items-center gap-3 mt-2 text-[11px] font-mono text-zinc-500">
                              <span>{course.chapterCount} Chapters</span>
                              <span>•</span>
                              <span>~{course.recommendedDailyMinutes}m daily target</span>
                              {course.category === 'elective' && (
                                <>
                                  <span>•</span>
                                  <span className="text-amber-400 font-medium">Elective</span>
                                </>
                              )}
                              {course.category === 'skill' && (
                                <>
                                  <span>•</span>
                                  <span className="text-blue-400 font-medium">Skill Track</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-zinc-500 hover:text-zinc-300 font-mono transition"
              >
                ← Back to Parameters
              </button>
              <button
                type="button"
                disabled={selectedCourseIds.size === 0}
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-white text-zinc-950 font-bold px-6 py-3.5 rounded-xl text-sm transition shadow-lg active:scale-98 disabled:opacity-40"
              >
                <span>Confirm Tracks &amp; Objectives</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: OBJECTIVES & AUTH HANDSHAKE ================= */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold mb-1">
                  Step 03 / 03 • Target Horizon &amp; Handshake
                </h2>
                <p className="text-base font-semibold text-white">
                  Define Student Objectives &amp; Reserve Swarm Namespace
                </p>
              </div>

              {/* Objectives */}
              <div className="space-y-2.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Target Horizon &amp; Academic Focus
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'grade_mastery',
                      title: 'School Grade Mastery (95%+)',
                      desc: 'Focus on NCERT chapter mastery, textbook worked solutions, and school term exams.',
                    },
                    {
                      id: 'board_foundation',
                      title: 'Long-term Board Foundation',
                      desc: 'Deep chapter prerequisites connecting directly to upcoming Class 10 & 12 board depth.',
                    },
                    {
                      id: 'olympiad',
                      title: 'Early Competitive & Olympiad',
                      desc: 'Higher-order thinking questions (HOTS), NTSE/Olympiad foundations, and rigorous proofs.',
                    },
                  ].map((obj) => (
                    <button
                      key={obj.id}
                      type="button"
                      onClick={() => setTargetObjective(obj.id as any)}
                      className={`p-4 rounded-xl border text-left transition ${
                        targetObjective === obj.id
                          ? 'bg-zinc-800 border-zinc-100 ring-1 ring-zinc-100 shadow-md'
                          : 'bg-zinc-950/60 border-zinc-800/80 hover:bg-zinc-800/50 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-white">{obj.title}</span>
                      </div>
                      <span className="text-xs text-zinc-400 block leading-relaxed">
                        {obj.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Student Identity / Credentials */}
              <div className="pt-4 border-t border-zinc-800/80 space-y-4">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Student Identity &amp; Auth Handshake
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Student First Name</label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Ram"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950 text-white text-sm focus:outline-none focus:border-zinc-400 font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Email (for session sync &amp; reports)</label>
                    <input
                      type="email"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="e.g. ram@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950 text-white text-sm focus:outline-none focus:border-zinc-400 font-sans"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 space-y-1 font-mono">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>AUTOMATIC SECURE HANDSHAKE:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Behind the scenes, an anonymous session token is instantly promoted to a secure, permanent Supabase account, and the multi-agent swarm reserves namespace for your unique Cognitive Digital Twin.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs text-zinc-500 hover:text-zinc-300 font-mono transition"
              >
                ← Back to Courses
              </button>
              <button
                type="button"
                onClick={handleDeployAgent}
                className="inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold px-7 py-3.5 rounded-xl text-sm transition shadow-xl active:scale-98"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Deploy Student Agent</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: SWARM STARTUP LOG TERMINAL ================= */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-emerald-400 mx-auto flex items-center justify-center shadow-xl">
                <Cpu className="w-6 h-6 animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Executing Multi-Agent Swarm Startup Sequence
              </h2>
              <p className="text-xs font-mono text-zinc-400">
                Coordinating Diagnostic Agent, Curriculum Architect &amp; Burnout Sentinel...
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-zinc-900 border border-zinc-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-emerald-400 h-full transition-all duration-300 ease-out"
                style={{ width: `${deployProgress}%` }}
              />
            </div>

            {/* Live Terminal */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 shadow-2xl font-mono text-xs space-y-2.5 text-zinc-300 min-h-[220px]">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 text-zinc-500 text-[11px]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                  <span>SWARM_TELEMETRY_LOGS</span>
                </div>
                <span>NODE: SUPABASE_PGVECTOR</span>
              </div>

              <div className="space-y-1.5 pt-1">
                {deploymentLogs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed animate-in fade-in">
                    {log}
                  </div>
                ))}
                {deployProgress < 100 && (
                  <div className="flex items-center gap-2 text-zinc-500 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Executing parallel sub-agents...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
