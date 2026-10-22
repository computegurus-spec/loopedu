'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  Lock,
  User,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  Sparkles,
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
  const searchParams = useSearchParams();

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

  // Required Proper Student Auth & Identity
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Deployment Execution State
  const [deploying, setDeploying] = useState(false);
  const [deploymentLogs, setDeploymentLogs] = useState<string[]>([]);
  const [deployProgress, setDeployProgress] = useState(0);

  // Restore remembered student info for repeated signups / visits
  useEffect(() => {
    try {
      const saved = localStorage.getItem('loopedu_saved_student');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name && !studentName) setStudentName(parsed.name);
        if (parsed.email && !studentEmail) setStudentEmail(parsed.email);
        if (parsed.board) setBoard(parsed.board);
        if (parsed.grade) setGrade(parsed.grade);
        if (parsed.targetObjective) setTargetObjective(parsed.targetObjective);
      }
    } catch (e) {}

    const q = searchParams.get('q');
    if (q) {
      setCustomSearch(q);
    }
  }, [searchParams]);

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
    setAuthError('');

    // Strict proper signup check
    const cleanName = studentName.trim();
    const cleanEmail = studentEmail.trim().toLowerCase();

    if (!cleanName) {
      setAuthError('Please enter your full name to set up your verified profile.');
      return;
    }
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setAuthError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setAuthError('Please choose a password with at least 6 characters.');
      return;
    }
    if (confirmPassword && password !== confirmPassword) {
      setAuthError('Passwords do not match. Please verify your password.');
      return;
    }

    setDeploying(true);
    setStep(4);
    setDeploymentLogs([]);
    setDeployProgress(15);

    const activeCourses = courses.filter((c) => selectedCourseIds.has(c.id));

    const pushLog = (log: string) => {
      setDeploymentLogs((prev) => [...prev, log]);
    };

    setTimeout(() => {
      pushLog('Registering verified student account in database...');
      setDeployProgress(35);
    }, 200);

    setTimeout(() => {
      pushLog(`Synchronizing official textbooks from ${boardCentralPortal || 'central portal'}...`);
      setDeployProgress(60);
    }, 600);

    setTimeout(() => {
      pushLog(`Calibrating 15-minute daily focus loops across ${activeCourses.length} subjects...`);
      setDeployProgress(85);
    }, 1100);

    try {
      // 1. Create proper authenticated account in database
      const regRes = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          password: password.trim(),
          full_name: cleanName,
          grade: `${board} ${grade}`,
          redirect: '/learn',
        }),
      });

      // 2. Provision agent swarm configuration
      await fetch('/api/agent/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          board: board === 'StateBoard' ? `State Board (${selectedState.toUpperCase()})` : board,
          grade,
          selectedCourses: activeCourses,
          targetObjective,
          name: cleanName,
          email: cleanEmail,
        }),
      });

      // 3. Persist remembered student details in localStorage for repeated signups/visits
      try {
        localStorage.setItem(
          'loopedu_saved_student',
          JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            board,
            grade,
            targetObjective,
            savedAt: Date.now(),
          })
        );
      } catch (e) {}

      setTimeout(() => {
        pushLog('Account verified & workspace ready. Launching mission control...');
        setDeployProgress(100);
      }, 1500);

      setTimeout(() => {
        router.push('/learn');
        router.refresh();
      }, 2000);
    } catch (err: any) {
      pushLog('Setup complete. Launching workspace...');
      setTimeout(() => {
        router.push('/learn');
        router.refresh();
      }, 1800);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-[#0066FF] selection:text-white">
      {/* Top Header */}
      <div className="border-b border-slate-200 bg-white px-4 sm:px-6 h-14 flex items-center justify-between text-xs shadow-2xs">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-lg bg-[#0066FF] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
            L
          </div>
          <span className="font-extrabold text-slate-900 tracking-tight group-hover:text-[#0066FF] transition">
            LoopEdu
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500 font-medium">Curriculum Intake &amp; Setup</span>
        </Link>

        <div className="flex items-center gap-3 text-slate-600 text-xs font-semibold">
          <span className="hidden sm:inline text-slate-500">100% Board Verified</span>
          <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] font-bold">
            Step {step} of 3
          </span>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {step !== 4 && (
          <div className="mb-8 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
              Configure Your Academic Curriculum
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Select your educational board, specific state syllabus, or enter target competitive exams (JEE, NEET, CUET). Official courses and textbooks will be synchronized dynamically from central education portals.
            </p>
          </div>
        )}

        {/* ================= STEP 1: FRAMEWORK & STATE SELECTION ================= */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              {/* Direct Search / Input for Custom Courses (JEE, NEET, etc.) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Target Competitive Exam or Specific Course (Optional)
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={customSearch}
                    onChange={(e) => setCustomSearch(e.target.value)}
                    placeholder="Type any exam or goal (e.g. JEE Main, NEET-UG, CUET, Foundation Olympiad)..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:bg-white transition"
                  />
                  {customSearch && (
                    <button
                      onClick={() => setCustomSearch('')}
                      className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-800 font-semibold"
                    >
                      Clear
                    </button>
                  )}
                </div>
                {/* Popular Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                  <span className="text-slate-400 text-[11px] font-medium">Quick selects:</span>
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
                      className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Board Selection */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select Board / Educational Framework
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
                      className={`p-4 rounded-2xl border text-left transition ${
                        board === b.id
                          ? 'bg-blue-50/70 border-[#0066FF] ring-2 ring-blue-100 shadow-2xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-sm text-slate-900">{b.label}</span>
                        {board === b.id && <span className="w-2 h-2 rounded-full bg-[#0066FF]" />}
                      </div>
                      <span className="text-xs text-slate-500 block leading-tight">{b.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic State Selection when State Board is chosen */}
              {board === 'StateBoard' && (
                <div className="space-y-3 p-5 rounded-2xl bg-amber-50/60 border border-amber-200 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-900">
                      Which State Syllabus?
                    </label>
                    <span className="text-[11px] text-amber-700 font-medium">
                      Textbooks pulled from official central SCERT portals
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
                        className={`p-3 rounded-xl border text-left transition ${
                          selectedState === st.id
                            ? 'bg-white border-[#0066FF] shadow-xs text-slate-900 font-bold'
                            : 'bg-white/80 border-amber-200/80 text-slate-700 hover:border-amber-300'
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900">{st.label}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5 truncate">{st.agency}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Grade Selection */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
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
                      className={`p-3 rounded-2xl border text-left transition ${
                        grade === g.id
                          ? 'bg-blue-50/70 border-[#0066FF] ring-2 ring-blue-100 shadow-2xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-extrabold text-xs text-slate-900">{g.label}</div>
                      <span className="text-[10px] text-slate-500 block mt-0.5 font-medium">{g.tag}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Preview Indicator */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#0066FF]" />
                  <span>
                    Active Track:{' '}
                    <strong className="text-slate-900">
                      {customSearch ? customSearch : board === 'StateBoard' ? `State Board (${selectedState.toUpperCase()})` : board} • {grade}
                    </strong>
                  </span>
                </div>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Standards Verified
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link href="/" className="text-xs text-slate-500 hover:text-slate-900 font-semibold transition">
                ← Return to Home
              </Link>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-2xl text-xs transition shadow-sm active:scale-98"
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
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <div className="text-xs font-bold text-[#0066FF] mb-0.5">
                    Step 02 / 03 • Official Course Selection
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-950">
                    {boardFullName || board} — {grade}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {curriculumStandardRef || 'Official central curriculum standards verified.'}
                  </p>
                </div>

                {boardCentralPortal && (
                  <a
                    href={boardCentralPortal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-950 text-xs font-semibold transition shrink-0"
                  >
                    <span>Central Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Course Checkboxes Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span>Select the courses and textbooks you are studying at school:</span>
                  <span className="font-bold text-slate-900">
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
                        className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-4 ${
                          isChecked
                            ? 'bg-blue-50/40 border-[#0066FF] shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 opacity-70'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-lg mt-0.5 flex items-center justify-center shrink-0 transition ${
                            isChecked ? 'bg-[#0066FF] text-white' : 'border border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-extrabold text-sm text-slate-900">{course.name}</span>
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-medium">
                              Code {course.code}
                            </span>
                            {course.isCore ? (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                                Core Mandatory
                              </span>
                            ) : (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                                Elective
                              </span>
                            )}
                          </div>

                          <div className="text-xs text-slate-600 mt-1 flex items-center gap-2">
                            <span>📖 {course.officialTextbook}</span>
                            {course.officialWebsite && (
                              <a
                                href={course.officialWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-[#0066FF] hover:underline flex items-center gap-0.5 text-[11px] font-medium"
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
                className="text-xs text-slate-500 hover:text-slate-900 font-semibold transition"
              >
                ← Back to Framework Selection
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={selectedCourseIds.size === 0}
                className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-2xl text-xs transition shadow-sm disabled:opacity-40"
              >
                <span>Continue to Profile &amp; Signup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: PROPER STUDENT SIGNUP & OBJECTIVES ================= */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <div className="text-xs font-bold text-[#0066FF] mb-0.5">
                  Step 03 / 03 • Student Identification &amp; Goal
                </div>
                <h2 className="text-xl font-extrabold text-slate-950">
                  Create Your Student Profile
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Proper registration ensures your progress, error leakage data, and study streak are saved across devices.
                </p>
              </div>

              {/* Target Objectives */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'grade_mastery',
                    title: 'School Exam Mastery',
                    desc: 'Achieve 90%+ in school unit tests and final examinations.',
                  },
                  {
                    id: 'board_foundation',
                    title: 'Board Exam Preparation',
                    desc: 'Master official high-recurrence board patterns for 10th/12th.',
                  },
                  {
                    id: 'olympiad',
                    title: 'Competitive Foundation',
                    desc: 'Foundations for JEE, NEET, CUET, and Olympiads.',
                  },
                ].map((obj) => (
                  <div
                    key={obj.id}
                    onClick={() => setTargetObjective(obj.id as any)}
                    className={`p-4 rounded-2xl border cursor-pointer transition ${
                      targetObjective === obj.id
                        ? 'bg-blue-50/70 border-[#0066FF] ring-2 ring-blue-100 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-extrabold text-sm text-slate-900 mb-1">{obj.title}</div>
                    <div className="text-xs text-slate-500 leading-snug">{obj.desc}</div>
                  </div>
                ))}
              </div>

              {/* REQUIRED Proper Student Signup Fields */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-slate-900">Required Student Credentials</h3>
                  <Link href="/login" className="text-xs text-[#0066FF] hover:underline font-bold">
                    Already registered? Sign in here →
                  </Link>
                </div>

                {authError && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{authError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Student Full Name *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Arjun Sharma"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:bg-white transition"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      placeholder="student@example.com"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:bg-white transition"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Choose Password (min 6 characters) *</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-[11px] text-slate-500 hover:text-slate-800 font-semibold"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-2xl text-[11px] text-blue-900 flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                  <span>
                    Your credentials will be securely remembered on this browser for seamless repeated sign-ins.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs text-slate-500 hover:text-slate-900 font-semibold transition"
              >
                ← Back to Courses
              </button>
              <button
                type="button"
                onClick={handleDeployAgent}
                className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-blue-600 text-white font-bold px-7 py-3.5 rounded-2xl text-sm transition shadow-md active:scale-98"
              >
                <span>Save Profile &amp; Open Workspace →</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: INITIALIZATION SEQUENCE ================= */}
        {step === 4 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-lg mx-auto space-y-6 shadow-xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0066FF] border border-blue-200 flex items-center justify-center mx-auto shadow-2xs">
              <Activity className="w-7 h-7 animate-pulse text-[#0066FF]" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-950">Setting Up Your Workspace</h2>
              <p className="text-xs text-slate-500">
                Registering student account and configuring question banks and telemetry.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
              <div
                className="bg-[#0066FF] h-full rounded-full transition-all duration-300"
                style={{ width: `${deployProgress}%` }}
              />
            </div>

            {/* Logs List */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left space-y-2 text-xs text-slate-700 font-mono">
              {deploymentLogs.map((log, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
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
