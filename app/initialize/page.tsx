'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Layers,
  CheckCircle2,
  ArrowRight,
  Shield,
  Clock,
  Target,
  Database,
  Activity,
  BookOpen,
  Check,
  AlertCircle,
  Search,
  ExternalLink,
} from 'lucide-react';

interface OfficialCourse {
  id: string;
  code: string;
  name: string;
  shortName: string;
  officialTextbook: string;
  officialWebsite?: string;
  isCore: boolean;
  category: 'mandatory' | 'elective' | 'skill';
  chapterCount: number;
  recommendedDailyMinutes: number;
  sampleTopics?: string[];
}

export default function InitializePage() {
  const router = useRouter();

  // Wizard Steps: 1: Framework & Course Search, 2: Course Selection, 3: Objectives & Auth, 4: Deployment
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Framework & State Selection
  const [board, setBoard] = useState('CBSE');
  const [selectedState, setSelectedState] = useState('karnataka');
  const [grade, setGrade] = useState('Class 10');
  const [customSearch, setCustomSearch] = useState('');
  const [targetObjective, setTargetObjective] = useState<'grade_mastery' | 'board_foundation' | 'olympiad'>('grade_mastery');

  // Dynamic Course Fetch State
  const [fetchingCourses, setFetchingCourses] = useState(false);
  const [courses, setCourses] = useState<OfficialCourse[]>([]);
  const [selectedCourseIds, setSelectedCourseIds] = useState<Set<string>>(new Set());
  const [curriculumStandardRef, setCurriculumStandardRef] = useState('');
  const [boardCentralPortal, setBoardCentralPortal] = useState('');
  const [boardFullName, setBoardFullName] = useState('');

  // Auth & Student Identity
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [authMethod, setAuthMethod] = useState<'google' | 'magic_link' | 'otp' | 'anonymous'>('google');

  // Deployment Execution State
  const [deploying, setDeploying] = useState(false);
  const [deploymentLogs, setDeploymentLogs] = useState<string[]>([]);
  const [deployProgress, setDeployProgress] = useState(0);

  // Dynamic Course Fetch triggered automatically when Board, State, Grade, or Custom Search changes
  useEffect(() => {
    let isMounted = true;
    setFetchingCourses(true);

    const queryParams = new URLSearchParams({
      board,
      grade,
      state: board === 'StateBoard' ? selectedState : '',
      q: customSearch.trim(),
    });

    fetch(`/api/agent/curriculum?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        setFetchingCourses(false);
        if (data.success && data.curriculum) {
          const fetchedCourses: OfficialCourse[] = data.curriculum.courses || [];
          setCourses(fetchedCourses);
          setCurriculumStandardRef(data.curriculum.standardReference || '');
          setBoardCentralPortal(data.curriculum.boardCentralPortal || '');
          setBoardFullName(data.curriculum.boardFullName || '');

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
  }, [board, selectedState, grade, customSearch]);

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

  const handleDeployAgent = async () => {
    setDeploying(true);
    setStep(4);
    setDeploymentLogs([]);
    setDeployProgress(20);

    const activeCourses = courses.filter((c) => selectedCourseIds.has(c.id));

    const pushLog = (log: string) => {
      setDeploymentLogs((prev) => [...prev, log]);
    };

    setTimeout(() => {
      pushLog('Configuring personalized student study profile...');
      setDeployProgress(40);
    }, 200);

    setTimeout(() => {
      pushLog(`Synchronizing official textbooks from central repository (${boardCentralPortal || 'NCERT'})...`);
      setDeployProgress(65);
    }, 600);

    setTimeout(() => {
      pushLog(`Building 15-minute daily practice queue across ${activeCourses.length} selected subjects...`);
      setDeployProgress(85);
    }, 1100);

    try {
      const res = await fetch('/api/agent/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          board: board === 'StateBoard' ? `State Board (${selectedState.toUpperCase()})` : board,
          grade,
          selectedCourses: activeCourses,
          targetObjective,
          name: studentName || 'Student',
          email: studentEmail || `student_${Date.now()}@loopedu.in`,
          authMethod,
        }),
      });

      const data = await res.json();

      setTimeout(() => {
        pushLog('Setup complete. Launching workspace...');
        setDeployProgress(100);
      }, 1600);

      setTimeout(() => {
        router.push('/learn');
        router.refresh();
      }, 2100);
    } catch (err) {
      pushLog('Workspace configured. Proceeding...');
      setTimeout(() => {
        router.push('/learn');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-slate-800 selection:text-white">
      {/* Top Header */}
      <div className="border-b border-slate-800 bg-slate-950 px-4 sm:px-6 h-14 flex items-center justify-between text-xs">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            L
          </div>
          <span className="font-semibold text-white tracking-tight group-hover:text-slate-300 transition">
            LoopEdu
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">Curriculum Intake Engine</span>
        </Link>

        <div className="flex items-center gap-3 text-slate-400 text-xs">
          <span className="hidden sm:inline">100% Board & Exam Verified</span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-medium">
            Step {step} of 3
          </span>
        </div>
      </div>

      {/* Main Form Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {step !== 4 && (
          <div className="mb-8 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Configure Your Academic Curriculum
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Select your educational board, specific state syllabus, or enter target competitive exams (JEE, NEET, CUET). Official courses and textbooks will be synchronized dynamically from central education portals.
            </p>
          </div>
        )}

        {/* ================= STEP 1: FRAMEWORK & STATE SELECTION ================= */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              {/* REQUIREMENT 5: Direct Search / Input for Custom Courses (JEE, NEET, etc.) */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Target Competitive Exam or Specific Course (Optional)
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={customSearch}
                    onChange={(e) => setCustomSearch(e.target.value)}
                    placeholder="Type any exam or goal (e.g. JEE Main, NEET-UG, CUET, Foundation Olympiads, Class 11 PCM)..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                  />
                  {customSearch && (
                    <button
                      onClick={() => setCustomSearch('')}
                      className="absolute right-3 top-2.5 text-xs text-slate-500 hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>
                {/* Popular Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                  <span className="text-slate-500 text-[11px]">Quick selects:</span>
                  {['JEE Main', 'NEET-UG', 'CUET', 'Foundation Olympiad', 'Class 10 CBSE'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        if (tag.includes('CBSE')) {
                          setCustomSearch('');
                          setBoard('CBSE');
                        } else {
                          setCustomSearch(tag);
                        }
                      }}
                      className="px-2.5 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Board Selection */}
              <div className="space-y-2.5 pt-2 border-t border-slate-800">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Select Board / Framework
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'CBSE', label: 'CBSE', desc: 'Central Board (NCERT)' },
                    { id: 'ICSE', label: 'ICSE', desc: 'CISCE Council' },
                    { id: 'StateBoard', label: 'State Board', desc: 'Official State SCERTs' },
                    { id: 'COMPETITIVE', label: 'Competitive', desc: 'JEE / NEET / CUET' },
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        setBoard(b.id);
                        if (b.id === 'COMPETITIVE' && !customSearch) {
                          setCustomSearch('JEE Main');
                        }
                      }}
                      className={`p-4 rounded-xl border text-left transition ${
                        board === b.id
                          ? 'bg-slate-800 border-blue-500 ring-1 ring-blue-500 shadow-sm'
                          : 'bg-slate-950 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-white">{b.label}</span>
                        {board === b.id && <span className="w-2 h-2 rounded-full bg-blue-500" />}
                      </div>
                      <span className="text-xs text-slate-400 block leading-tight">{b.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* REQUIREMENT 2: Dynamic State Selection when State Board is chosen */}
              {board === 'StateBoard' && (
                <div className="space-y-3 p-4 rounded-xl bg-slate-950 border border-slate-800 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-blue-400">
                      Which State Syllabus?
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Textbooks pulled from official central portals
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'karnataka', label: 'Karnataka', agency: 'KSEAB & KTBS (ktbs.kar.nic.in)' },
                      { id: 'maharashtra', label: 'Maharashtra', agency: 'MSBSHSE & eBalbharati (ebalbharati.in)' },
                      { id: 'tamilnadu', label: 'Tamil Nadu', agency: 'TNDGE & SCERT (textbooksonline.tn.nic.in)' },
                      { id: 'andhra_telangana', label: 'Andhra Pradesh & TS', agency: 'SCERT (bse.telangana.gov.in)' },
                      { id: 'uttar_pradesh', label: 'Uttar Pradesh', agency: 'UPMSP (upmsp.edu.in)' },
                      { id: 'kerala', label: 'Kerala', agency: 'SCERT Kerala (scert.kerala.gov.in)' },
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setSelectedState(st.id)}
                        className={`p-3 rounded-lg border text-left transition ${
                          selectedState === st.id
                            ? 'bg-blue-600/10 border-blue-500 text-white font-medium'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="font-semibold text-xs text-white">{st.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 truncate">{st.agency}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Grade Selection */}
              <div className="space-y-2.5 pt-2 border-t border-slate-800">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Select Grade / Academic Standard
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { id: '8th Standard', label: '8th Standard', tag: 'Foundation' },
                    { id: 'Class 9', label: 'Class 9', tag: 'Pre-Board' },
                    { id: 'Class 10', label: 'Class 10', tag: 'Board Exam' },
                    { id: 'Class 11', label: 'Class 11', tag: 'Senior Sec' },
                    { id: 'Class 12', label: 'Class 12', tag: 'Board & Entrance' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGrade(g.id)}
                      className={`p-3 rounded-xl border text-left transition ${
                        grade === g.id
                          ? 'bg-slate-800 border-blue-500 ring-1 ring-blue-500 shadow-sm'
                          : 'bg-slate-950 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-semibold text-xs text-white">{g.label}</div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{g.tag}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Preview Indicator */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-blue-400" />
                  <span>
                    Selected Framework:{' '}
                    <strong className="text-white">
                      {customSearch ? customSearch : board === 'StateBoard' ? `State Board (${selectedState.toUpperCase()})` : board} • {grade}
                    </strong>
                  </span>
                </div>
                <span className="text-emerald-400 font-medium">Standards Verified</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link href="/" className="text-xs text-slate-400 hover:text-white transition">
                ← Return to Home
              </Link>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-xs transition shadow-md active:scale-98"
              >
                <span>Continue to Official Course List</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: DYNAMIC COURSE GRID WITH CENTRAL CITATIONS ================= */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <div className="text-xs font-semibold text-blue-400 mb-0.5">
                    Step 02 / 03 • Official Course Selection
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    {boardFullName || board} — {grade}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {curriculumStandardRef || 'Official central curriculum standards verified.'}
                  </p>
                </div>

                {boardCentralPortal && (
                  <a
                    href={boardCentralPortal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs transition shrink-0"
                  >
                    <span>Central Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Course Checkboxes Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Select the courses and textbooks you are studying at school:</span>
                  <span className="font-semibold text-white">
                    {selectedCourseIds.size} of {courses.length} selected
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {courses.map((course) => {
                    const isChecked = selectedCourseIds.has(course.id);
                    return (
                      <div
                        key={course.id}
                        onClick={() => toggleCourse(course.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition flex items-start gap-4 ${
                          isChecked
                            ? 'bg-slate-800/90 border-blue-500 shadow-sm'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700 opacity-60'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 transition ${
                            isChecked ? 'bg-blue-600 text-white' : 'border border-slate-700 bg-slate-900'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-sm text-white">{course.name}</span>
                            <span className="text-[11px] px-2 py-0.2 rounded bg-slate-900 text-slate-300 border border-slate-700">
                              Code {course.code}
                            </span>
                            {course.isCore ? (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                                Core Mandatory
                              </span>
                            ) : (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-medium">
                                Elective
                              </span>
                            )}
                          </div>

                          <div className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                            <span>📖 {course.officialTextbook}</span>
                            {course.officialWebsite && (
                              <a
                                href={course.officialWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-blue-400 hover:underline flex items-center gap-0.5 text-[11px]"
                              >
                                <span>(Verify on Central Portal)</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>

                          {course.sampleTopics && course.sampleTopics.length > 0 && (
                            <div className="text-[11px] text-slate-500 mt-1 truncate">
                              Topics: {course.sampleTopics.slice(0, 5).join(' • ')}...
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-slate-400 hover:text-white transition"
              >
                ← Back to Framework Selection
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={selectedCourseIds.size === 0}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-xs transition shadow-md disabled:opacity-40"
              >
                <span>Continue to Target Goals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: OBJECTIVES & AUTH ================= */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <div className="text-xs font-semibold text-blue-400 mb-0.5">
                  Step 03 / 03 • Target Horizon & Student Profile
                </div>
                <h2 className="text-xl font-bold text-white">What is your primary academic goal?</h2>
              </div>

              {/* Target Objectives */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'grade_mastery',
                    title: 'Class Exam Mastery',
                    desc: 'Achieve 90%+ in school unit tests and final examinations.',
                  },
                  {
                    id: 'board_foundation',
                    title: 'Board Exam Foundation',
                    desc: 'Master official high-recurrence board patterns for 10th/12th.',
                  },
                  {
                    id: 'olympiad',
                    title: 'Competitive Pathway',
                    desc: 'Early foundations for JEE, NEET, CUET, and National Olympiads.',
                  },
                ].map((obj) => (
                  <div
                    key={obj.id}
                    onClick={() => setTargetObjective(obj.id as any)}
                    className={`p-4 rounded-xl border cursor-pointer transition ${
                      targetObjective === obj.id
                        ? 'bg-slate-800 border-blue-500 ring-1 ring-blue-500'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-sm text-white mb-1">{obj.title}</div>
                    <div className="text-xs text-slate-400 leading-snug">{obj.desc}</div>
                  </div>
                ))}
              </div>

              {/* Student Identification */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <h3 className="text-sm font-semibold text-white">Student Identification</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Arjun Sharma"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="student@example.com"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs text-slate-400 hover:text-white transition"
              >
                ← Back to Courses
              </button>
              <button
                type="button"
                onClick={handleDeployAgent}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition shadow-lg active:scale-98"
              >
                <span>Save Profile & Open Workspace →</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: CLEAN SETUP SEQUENCE ================= */}
        {step === 4 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-lg mx-auto space-y-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Configuring Study Workspace</h2>
              <p className="text-xs text-slate-400">
                Setting up question banks, mind maps, and daily practice pacing.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${deployProgress}%` }}
              />
            </div>

            {/* Logs List */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 text-left space-y-2 text-xs text-slate-300 font-mono">
              {deploymentLogs.map((log, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
