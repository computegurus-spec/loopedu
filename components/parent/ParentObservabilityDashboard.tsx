'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  TrendingUp,
  Clock,
  Flame,
  Award,
  AlertTriangle,
  CheckCircle2,
  Share2,
  Calendar,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  HelpCircle,
  BarChart3,
  User,
} from 'lucide-react';

export const ParentObservabilityDashboard: React.FC = () => {
  const [copied, setCopied] = useState(false);

  // Student metrics state
  const student = {
    name: 'Aryan Sharma',
    grade: 'Class 10 CBSE (2026–2027)',
    school: 'Delhi Public School / CBSE Affiliated',
    boardReadinessScore: 78, // out of 100
    projectedRange: '85% – 92%',
    activeStreak: 7,
    daysThisWeek: 6,
    avgTimePerDay: '14.2 mins',
    totalQuestionsAttempted: 145,
    ncertStepAccuracy: 84,
  };

  const weeklySchedule = [
    { day: 'Mon', completed: true, mins: 15, subject: 'Maths' },
    { day: 'Tue', completed: true, mins: 14, subject: 'Maths' },
    { day: 'Wed', completed: true, mins: 16, subject: 'Science' },
    { day: 'Thu', completed: true, mins: 12, subject: 'Maths' },
    { day: 'Fri', completed: true, mins: 15, subject: 'Science' },
    { day: 'Sat', completed: true, mins: 14, subject: 'Maths' },
    { day: 'Sun', completed: false, mins: 0, subject: 'Revision' },
  ];

  const subjectProgress = [
    {
      name: 'Mathematics Standard (041)',
      status: 'active',
      plan: '₹299/month',
      accuracy: 82,
      masteredUnits: '1 of 6',
      unlockedPdf: 'Unit 1: Real Numbers & Polynomials (30 Questions)',
      recentTopic: 'Quadratic Equations (Discriminant D)',
      nextMilestone: 'Unit 2: Linear & Quadratics PDF (75% completed)',
    },
    {
      name: 'Science (086) - Phys, Chem, Bio',
      status: 'active',
      plan: '₹299/month',
      accuracy: 76,
      masteredUnits: '1 of 5',
      unlockedPdf: 'Unit 1: Chemical Reactions & Acids (25 Questions)',
      recentTopic: 'Light: Reflection & Ray Diagrams',
      nextMilestone: 'Unit 2: Light & Electricity PDF (60% completed)',
    },
    {
      name: 'Social Science (087)',
      status: 'not_subscribed',
      plan: '₹299/month',
      accuracy: 0,
      masteredUnits: '0 of 5',
      unlockedPdf: 'None',
      recentTopic: 'Not started',
      nextMilestone: 'Subscribe to activate daily 15-min habit',
    },
  ];

  const activeMistakeQueue = [
    {
      concept: 'Quadratic Factorisation Sign Error',
      subject: 'Maths Standard',
      observation: 'Wrote (x-3)(x-5)=0 but recorded roots as -3 and -5 instead of +3 and +5.',
      status: 'Auto-retesting tomorrow in 15-min loop',
      severity: 'medium',
    },
    {
      concept: 'Units Omission in Electric Power',
      subject: 'Science',
      observation: 'Calculated value correctly (484) but omitted the unit Ω (Ohms). Lost 0.5 step mark.',
      status: 'Scheduled for spaced repetition in 2 days',
      severity: 'high',
    },
    {
      concept: 'Pythagoras Similarity Theorem Citation',
      subject: 'Maths Standard',
      observation: 'Applied ratio correctly; verified NCERT Theorem 6.7 citation.',
      status: 'Cleared successfully on revision',
      severity: 'low',
    },
  ];

  const generateWhatsAppMessage = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://loopedu.in';
    const text = `*LoopEdu Weekly Progress Report for ${student.name}* (loopedu.in)
🎓 Grade: ${student.grade}
🔥 Consistency: ${student.daysThisWeek}/7 Days Practiced (${student.activeStreak}-day streak)
⏱️ Avg Time: ${student.avgTimePerDay} / day
🎯 Board Readiness: ${student.boardReadinessScore}/100 (Projected: ${student.projectedRange})
📐 NCERT Step Accuracy: ${student.ncertStepAccuracy}%
🏆 Earned Milestone: Unlocked Real Numbers 10-Year Question Bank PDF
💡 Key Focus: Quadratic root signs & formula units.

View full observability dashboard: ${origin}/parent`;
    return encodeURIComponent(text);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* 1. Student Profile & Parent Header */}
      <div className="bg-white rounded-3xl border border-academic-border p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-forest-900 text-limeaccent flex items-center justify-center font-bold text-xl shadow-sm flex-shrink-0">
            {student.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-forest-800 bg-forest-100 px-2 py-0.5 rounded">
                Parent Observability Hub
              </span>
              <span className="text-xs text-forest-400">•</span>
              <span className="text-xs text-forest-700 font-medium">Daily Habit Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950 mt-1">
              {student.name}
            </h1>
            <p className="text-xs sm:text-sm text-academic-subtle mt-0.5">
              {student.grade} • {student.school}
            </p>
          </div>
        </div>

        {/* WhatsApp Share Report Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <a
            href={`https://wa.me/?text=${generateWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-sm"
          >
            <Share2 className="w-4 h-4" />
            <span>Send Weekly WhatsApp Report</span>
          </a>

          <Link
            href="/learn"
            className="inline-flex items-center justify-center gap-1.5 bg-forest-900 hover:bg-forest-800 text-limeaccent font-semibold px-4 py-2.5 rounded-xl text-xs transition"
          >
            <span>Open Student Path</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 1.5. The Anti-Micro-Management View & Weekly Actionable Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Anti-Micro-Management Status Card */}
        <div className="bg-forest-950 text-paper-100 rounded-2xl p-5 shadow-sm space-y-3 border border-forest-800">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-limeaccent bg-forest-900 px-2 py-0.5 rounded">
              The Anti-Micro-Management View
            </span>
            <span className="text-xs text-forest-300">Live Status</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2.5 bg-forest-900/60 p-3 rounded-xl border border-forest-800">
              <CheckCircle2 className="w-4 h-4 text-limeaccent flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Did my child complete today's path?</span>
                <span className="text-limeaccent font-semibold">YES</span> • Completed The Daily Five at 7:42 AM (14 mins, 5/5 attempted)
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-forest-900/60 p-3 rounded-xl border border-forest-800">
              <ShieldCheck className="w-4 h-4 text-limeaccent flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">What chapters are fully secure?</span>
                <span className="text-paper-200">
                  <strong className="text-white">Real Numbers</strong> (100% secure • PDF unlocked) • <strong className="text-white">Chemical Reactions</strong> (92% secure)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Actionable Insights Banner */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Weekly Actionable Insights</span>
            </span>
            <span className="text-[11px] text-amber-800 font-medium">Sunday Parent Pulse</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 shadow-2xs space-y-1.5">
            <div className="text-xs font-bold text-forest-950 flex items-center gap-1.5">
              <span>🤖 Automated Notification for Parent:</span>
            </div>
            <p className="text-xs text-forest-800 leading-relaxed italic">
              "Aryan completed 5/5 tracks this week with consistent 14-min daily sessions, but needs a quick 10-minute revision on Quadratic Equations root sign conventions before upcoming school pre-boards."
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-amber-900 font-medium">
            <span>Next review cycle: In 3 days</span>
            <span className="text-forest-800 font-semibold">Zero stress • No lecturing needed</span>
          </div>
        </div>
      </div>

      {/* 2. The 4 Core Observability Anchors (Including The Honesty Metre) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Metric 1: Board Readiness Index */}
        <div className="bg-white rounded-2xl border border-academic-border p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-academic-subtle">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Board Readiness</span>
            <TrendingUp className="w-4 h-4 text-forest-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-forest-950">
              {student.boardReadinessScore}
            </span>
            <span className="text-xs text-academic-subtle">/ 100</span>
          </div>
          <div className="text-[11px] text-forest-800">
            Projected CBSE Range: <strong className="text-forest-950">{student.projectedRange}</strong>
          </div>
          <div className="w-full bg-paper-200 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-forest-800 h-full rounded-full transition-all duration-500"
              style={{ width: `${student.boardReadinessScore}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Practice Consistency */}
        <div className="bg-white rounded-2xl border border-academic-border p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-academic-subtle">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Daily Consistency</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-forest-950">
              {student.daysThisWeek}
            </span>
            <span className="text-xs text-academic-subtle">of 7 days</span>
          </div>
          <div className="text-[11px] text-forest-800">
            Active Streak: <strong className="text-amber-700">{student.activeStreak} Days in a Row</strong>
          </div>
          <div className="text-[10px] text-academic-subtle">
            Avg Time: <strong>{student.avgTimePerDay}</strong> per session
          </div>
        </div>

        {/* Metric 3: The Honesty Metre */}
        <div className="bg-white rounded-2xl border-2 border-forest-900 p-5 shadow-xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-academic-subtle">
            <span className="font-bold uppercase tracking-wider text-[11px] text-forest-950">The Honesty Metre</span>
            <CheckCircle2 className="w-4 h-4 text-forest-900" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-forest-950">
              {student.totalQuestionsAttempted}
            </span>
            <span className="text-xs text-academic-subtle font-medium">attempted ({student.ncertStepAccuracy}% accuracy)</span>
          </div>
          <div className="text-[11px] text-forest-800">
            <strong>Uninflated metric:</strong> Absolute questions solved without AI hints vs official step marking.
          </div>
        </div>

        {/* Metric 4: Unlocked Question Bank PDFs */}
        <div className="bg-white rounded-2xl border border-academic-border p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-academic-subtle">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Earned Question Banks</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-forest-950">
              2
            </span>
            <span className="text-xs text-academic-subtle">Unit PDFs</span>
          </div>
          <div className="text-[11px] text-forest-800">
            Unlocked 55 curated 10-year board questions for home study.
          </div>
        </div>
      </div>

      {/* 3. Weekly Practice Consistency Heatmap */}
      <section className="bg-white rounded-3xl border border-academic-border p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-academic-border pb-3">
          <div>
            <h3 className="font-serif font-bold text-base text-forest-950 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-forest-700" />
              <span>Weekly 15-Minute Practice Rhythm</span>
            </h3>
            <p className="text-xs text-academic-subtle">
              Consistency beats last-minute cramming. Monitored in real-time.
            </p>
          </div>
          <div className="text-xs text-forest-800 font-semibold bg-forest-50 px-3 py-1 rounded-full border border-forest-200 self-start sm:self-auto">
            Target: 15 mins daily (1h 45m / week)
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-4 pt-2">
          {weeklySchedule.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-3 sm:p-4 text-center border transition ${
                item.completed
                  ? 'bg-forest-50 border-forest-200 text-forest-950'
                  : 'bg-paper-100/50 border-dashed border-academic-border text-academic-subtle'
              }`}
            >
              <div className="text-xs font-bold uppercase">{item.day}</div>
              <div className="my-2 flex justify-center">
                {item.completed ? (
                  <div className="w-8 h-8 rounded-full bg-forest-900 text-limeaccent flex items-center justify-center font-bold text-xs shadow-xs">
                    ✓
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-paper-200 text-forest-400 flex items-center justify-center text-xs">
                    ⏳
                  </div>
                )}
              </div>
              <div className="text-[10px] font-mono">
                {item.completed ? `${item.mins}m • ${item.subject}` : 'Today 15m'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Subject-by-Subject Modular Observability */}
      <section className="bg-white rounded-3xl border border-academic-border p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-academic-border pb-3">
          <div>
            <h3 className="font-serif font-bold text-base text-forest-950 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-forest-700" />
              <span>Subject Breakdown & Subscription Status (₹299/mo)</span>
            </h3>
            <p className="text-xs text-academic-subtle">
              Choose and monitor subjects individually. Add or pause anytime.
            </p>
          </div>

          <Link
            href="/catalogue"
            className="inline-flex items-center gap-1 text-xs font-bold text-forest-900 hover:text-forest-700 underline"
          >
            <span>Add Another Subject (₹299/mo)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-4">
          {subjectProgress.map((sub, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-academic-border p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-paper-50/50 hover:bg-white transition"
            >
              <div className="space-y-1.5 max-w-md">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-forest-950 text-sm sm:text-base">
                    {sub.name}
                  </span>
                  {sub.status === 'active' ? (
                    <span className="bg-forest-100 text-forest-900 border border-forest-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Active Subscription ({sub.plan})
                    </span>
                  ) : (
                    <span className="bg-paper-200 text-forest-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
                      Not Enrolled
                    </span>
                  )}
                </div>

                <div className="text-xs text-academic-subtle">
                  Recent Focus: <strong className="text-forest-900">{sub.recentTopic}</strong>
                </div>

                <div className="text-[11px] text-forest-700">
                  🎯 Next Reward: <strong>{sub.nextMilestone}</strong>
                </div>
              </div>

              {/* Accuracy & Action */}
              <div className="flex items-center gap-4 self-end md:self-auto">
                {sub.status === 'active' ? (
                  <div className="text-right">
                    <div className="text-lg font-serif font-bold text-forest-950">
                      {sub.accuracy}%
                    </div>
                    <div className="text-[10px] text-academic-subtle">Accuracy Rate</div>
                  </div>
                ) : (
                  <Link
                    href={`/catalogue`}
                    className="inline-flex items-center gap-1 bg-limeaccent hover:bg-limeaccent-hover text-forest-950 font-bold px-3 py-1.5 rounded-lg text-xs transition shadow-xs"
                  >
                    <span>Enrol for ₹299/mo</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Active Mistake Queue (Spaced Repetition Observability) */}
      <section className="bg-white rounded-3xl border border-academic-border p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-academic-border pb-3">
          <div>
            <h3 className="font-serif font-bold text-base text-forest-950 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Real-Time Mistake Queue (Weak Concept Remediation)</span>
            </h3>
            <p className="text-xs text-academic-subtle">
              When Aryan misses a question, our AI re-tests the core concept 24 hours later until mastered.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {activeMistakeQueue.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-academic-border bg-paper-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-forest-950">{item.concept}</span>
                  <span className="text-[10px] font-mono text-academic-subtle">({item.subject})</span>
                </div>
                <p className="text-forest-800 text-[11px]">{item.observation}</p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="px-2 py-1 rounded text-[10px] font-medium bg-amber-50 text-amber-900 border border-amber-200">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
