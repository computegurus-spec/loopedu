'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Check,
  Clock,
  Mail,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Layers,
  HelpCircle,
  User,
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form State
  const [goal, setGoal] = useState('cbse_board_2027');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    'maths-standard',
    'science',
    'social-science',
    'english-language-literature',
  ]);
  const [mathTrack, setMathTrack] = useState<'standard' | 'basic'>('standard');
  const [englishTrack, setEnglishTrack] = useState<'ll' | 'comm'>('ll');
  const [dailyMinutes, setDailyMinutes] = useState(15);
  const [emailReminder, setEmailReminder] = useState(true);
  const [reminderTime, setReminderTime] = useState('18:00');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [city, setCity] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentWhatsapp, setParentWhatsapp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSubject = (slug: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleFinish = async () => {
    setErrorMsg('');
    if (!whatsappNumber.trim()) {
      setErrorMsg('Please enter your WhatsApp mobile number to activate your 10 free weekly questions.');
      return;
    }

    setIsSubmitting(true);
    try {
      const plan = {
        goal,
        mathTrack,
        englishTrack,
        selectedSubjects,
        dailyMinutes,
        emailReminder,
        reminderTime,
        studentName,
        studentEmail,
        whatsappNumber,
        schoolName,
        city,
        parentName,
        parentEmail,
        parentWhatsapp,
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('boardedge_study_plan', JSON.stringify(plan));
        localStorage.setItem('loopedu_student_phone', whatsappNumber);
        if (studentName) localStorage.setItem('loopedu_student_name', studentName);
      }

      // Sync lead record to Supabase & local store
      await fetch('/api/leads/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: studentName || 'Student',
          whatsappNumber,
          studentEmail: studentEmail || undefined,
          grade: 'Class 10',
          targetExam: goal === 'cbse_board_2027' ? 'CBSE Class 10 (2027)' : 'CBSE Board',
          schoolName: schoolName || undefined,
          city: city || undefined,
          parentName: parentName || undefined,
          parentEmail: parentEmail || undefined,
          parentWhatsapp: parentWhatsapp || undefined,
          selectedSubjects,
          dailyMinutes,
        }),
      });
    } catch (err) {
      console.error('Lead registration note:', err);
    } finally {
      setIsSubmitting(false);
      // Navigate to Today dashboard with 10 free questions unlocked
      router.push('/today?welcome_trial=true');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      {/* Top Banner with Skip link */}
      <div className="flex items-center justify-between text-xs text-academic-subtle border-b border-academic-border pb-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-forest-900 uppercase tracking-wider">Step {step} of 4</span>
          <span>•</span>
          <span>Personalize Your Study Routine</span>
        </div>
        <Link
          href="/today"
          className="text-forest-700 hover:text-forest-950 font-semibold underline"
        >
          Skip & begin practising →
        </Link>
      </div>

      {/* Progress Indicators */}
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              s <= step ? 'bg-forest-900' : 'bg-paper-200'
            }`}
          />
        ))}
      </div>

      {/* Step 1: Learning Goal & Board */}
      {step === 1 && (
        <div className="rounded-2xl bg-white border border-academic-border p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-700">
              Target Curriculum
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950">
              What is your primary academic goal?
            </h2>
            <p className="text-xs sm:text-sm text-forest-800 leading-relaxed">
              We currently offer comprehensive, verified practice banks specifically tailored for CBSE Class 10 (2027 Board Examination).
            </p>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 rounded-xl border border-forest-900 bg-forest-50/50 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-forest-900 text-limeaccent flex items-center justify-center text-xs">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-forest-950">
                    CBSE Class 10 Board Exams (2027)
                  </div>
                  <div className="text-xs text-forest-700">
                    Full NCERT-mapped syllabus, step-by-step model answers, and historical mark weightage.
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold bg-forest-100 text-forest-900 px-2.5 py-1 rounded">
                Active
              </span>
            </label>

            <div className="opacity-60 p-4 rounded-xl border border-dashed border-academic-border bg-paper-50 flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm text-forest-900">
                  Other Classes & Competitive Exams (Class 9, 11, 12, ICSE, JEE/NEET)
                </div>
                <div className="text-xs text-academic-subtle">
                  Coming soon in upcoming batches. You can request specific subjects in the catalogue.
                </div>
              </div>
              <span className="text-[11px] font-mono text-academic-subtle">Waitlist</span>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
            >
              <span>Next: Select Subjects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Track & Subject Selection */}
      {step === 2 && (
        <div className="rounded-2xl bg-white border border-academic-border p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-700">
              Subject Registration
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950">
              Select your specific subjects & tracks
            </h2>
            <p className="text-xs sm:text-sm text-forest-800 leading-relaxed">
              CBSE requires you to choose between Mathematics Standard or Basic, and specific English courses. Select the ones you are enrolled in.
            </p>
          </div>

          {/* Mathematics Course Distinction */}
          <div className="p-4 rounded-xl border border-academic-border bg-paper-50 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-forest-950">
              <Layers className="w-4 h-4 text-forest-700" />
              <span>Choose Your Mathematics Course:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMathTrack('standard')}
                className={`p-3.5 rounded-xl border text-left text-xs transition ${
                  mathTrack === 'standard'
                    ? 'border-forest-900 bg-white ring-2 ring-forest-900/10'
                    : 'border-academic-border bg-white hover:bg-forest-50/50'
                }`}
              >
                <div className="font-bold text-forest-950">Maths (Standard) • Code 041</div>
                <div className="text-academic-subtle text-[11px] mt-1">
                  For students pursuing senior secondary Mathematics. Includes proofs and algebraic modelling.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMathTrack('basic')}
                className={`p-3.5 rounded-xl border text-left text-xs transition ${
                  mathTrack === 'basic'
                    ? 'border-forest-900 bg-white ring-2 ring-forest-900/10'
                    : 'border-academic-border bg-white hover:bg-forest-50/50'
                }`}
              >
                <div className="font-bold text-forest-950">Maths (Basic) • Code 241</div>
                <div className="text-academic-subtle text-[11px] mt-1">
                  Focuses on foundational procedural mastery and standard NCERT applications.
                </div>
              </button>
            </div>
          </div>

          {/* English Course Distinction */}
          <div className="p-4 rounded-xl border border-academic-border bg-paper-50 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-forest-950">
              <BookOpen className="w-4 h-4 text-forest-700" />
              <span>Choose Your English Course:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setEnglishTrack('ll')}
                className={`p-3.5 rounded-xl border text-left text-xs transition ${
                  englishTrack === 'll'
                    ? 'border-forest-900 bg-white ring-2 ring-forest-900/10'
                    : 'border-academic-border bg-white hover:bg-forest-50/50'
                }`}
              >
                <div className="font-bold text-forest-950">English Lang & Lit • Code 184</div>
                <div className="text-academic-subtle text-[11px] mt-1">
                  NCERT First Flight & Footprints Without Feet.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setEnglishTrack('comm')}
                className={`p-3.5 rounded-xl border text-left text-xs transition ${
                  englishTrack === 'comm'
                    ? 'border-forest-900 bg-white ring-2 ring-forest-900/10'
                    : 'border-academic-border bg-white hover:bg-forest-50/50'
                }`}
              >
                <div className="font-bold text-forest-950">English Communicative • Code 101</div>
                <div className="text-academic-subtle text-[11px] mt-1">
                  CBSE Literature Reader & Interact in English.
                </div>
              </button>
            </div>
          </div>

          {/* Other Core Subjects */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-forest-950 block">Other Core Subjects:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { slug: 'science', name: 'Science (Code 086)' },
                { slug: 'social-science', name: 'Social Science (Code 087)' },
                { slug: 'artificial-intelligence', name: 'AI Skill (Code 417)' },
              ].map((sub) => {
                const isSelected = selectedSubjects.includes(sub.slug);
                return (
                  <button
                    key={sub.slug}
                    type="button"
                    onClick={() => toggleSubject(sub.slug)}
                    className={`p-3 rounded-xl border text-left text-xs transition flex items-center justify-between ${
                      isSelected
                        ? 'border-forest-900 bg-forest-50 text-forest-950 font-bold'
                        : 'border-academic-border bg-white text-forest-800'
                    }`}
                  >
                    <span>{sub.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-forest-900" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 text-xs text-forest-700 hover:text-forest-950 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
            >
              <span>Next: Daily Routine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Daily Practice Commitment & Reminders */}
      {step === 3 && (
        <div className="rounded-2xl bg-white border border-academic-border p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-700">
              Study Habit Design
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950">
              How much time can you commit daily?
            </h2>
            <p className="text-xs sm:text-sm text-forest-800 leading-relaxed">
              Consistency outperforms intensity. Even 15 minutes of active recall every day builds genuine board exam confidence.
            </p>
          </div>

          {/* Time Picker */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[10, 15, 20, 30].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => setDailyMinutes(mins)}
                className={`p-4 rounded-xl border text-center transition ${
                  dailyMinutes === mins
                    ? 'border-forest-900 bg-forest-50 ring-2 ring-forest-900/10'
                    : 'border-academic-border bg-white hover:bg-paper-50'
                }`}
              >
                <div className="text-2xl font-serif font-bold text-forest-950">{mins}m</div>
                <div className="text-[11px] text-academic-subtle mt-0.5">
                  {mins === 10
                    ? '3-4 questions'
                    : mins === 15
                    ? '5-6 questions (Recommended)'
                    : mins === 20
                    ? '7-8 questions'
                    : '10+ questions'}
                </div>
              </button>
            ))}
          </div>

          {/* Email Reminders */}
          <div className="p-4 rounded-xl border border-academic-border bg-paper-50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-forest-700" />
                <span className="text-xs font-bold text-forest-950">Daily Challenge Email:</span>
              </div>
              <input
                type="checkbox"
                checked={emailReminder}
                onChange={(e) => setEmailReminder(e.target.checked)}
                className="w-4 h-4 rounded text-forest-900 focus:ring-forest-900"
              />
            </div>
            <p className="text-xs text-academic-subtle leading-relaxed">
              Receive a bite-sized sample question in your inbox every day with a 1-click link to your daily assignment.
            </p>
            {emailReminder && (
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs text-forest-800 font-medium">Preferred Time:</span>
                <select
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="bg-white border border-academic-border rounded-lg px-3 py-1.5 text-xs text-forest-900 focus:outline-none focus:border-forest-700"
                >
                  <option value="06:30">6:30 AM (Morning focus)</option>
                  <option value="17:00">5:00 PM (After school)</option>
                  <option value="18:00">6:00 PM (Evening routine)</option>
                  <option value="20:00">8:00 PM (Night review)</option>
                </select>
              </div>
            )}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 text-xs text-forest-700 hover:text-forest-950 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(4)}
              className="inline-flex items-center gap-2 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
            >
              <span>Next: Learner Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Account & Parent Touchpoint */}
      {step === 4 && (
        <div className="rounded-2xl bg-white border border-academic-border p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-forest-800 bg-forest-100 px-2 py-0.5 rounded">
                🎁 100% Free Launch Access
              </span>
              <span className="text-xs text-forest-500">•</span>
              <span className="text-xs text-forest-700 font-semibold">10 Free Questions / Week</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950">
              Claim Your Free 10-Question Trial
            </h2>
            <p className="text-xs sm:text-sm text-forest-800 leading-relaxed">
              Start practicing immediately with full worked solutions, NCERT step hints, and a personalized diagnostic report.
              Your free trial resets every 7 days!
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 font-medium">
              {errorMsg}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-forest-900 block mb-1">
                  Student Full Name:
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full bg-white border border-academic-border rounded-xl px-4 py-2.5 text-xs text-forest-900 focus:outline-none focus:border-forest-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-forest-900 block mb-1">
                  WhatsApp Mobile Number <span className="text-red-500">*</span>:
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-bold text-academic-subtle">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="98765 43210"
                    required
                    className="w-full bg-white border border-academic-border rounded-xl pl-12 pr-4 py-2.5 text-xs font-medium text-forest-900 focus:outline-none focus:border-forest-700"
                  />
                </div>
                <span className="text-[10px] text-academic-subtle block mt-1">
                  Used for your weekly diagnostic score card & 7-day reset alerts.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-forest-900 block mb-1">
                  School Name (Optional):
                </label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="e.g. DPS Bangalore South"
                  className="w-full bg-white border border-academic-border rounded-xl px-4 py-2.5 text-xs text-forest-900 focus:outline-none focus:border-forest-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-forest-900 block mb-1">
                  City (Optional):
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Bangalore"
                  className="w-full bg-white border border-academic-border rounded-xl px-4 py-2.5 text-xs text-forest-900 focus:outline-none focus:border-forest-700"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-forest-900 block mb-1">
                Student Email (Optional):
              </label>
              <input
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full bg-white border border-academic-border rounded-xl px-4 py-2.5 text-xs text-forest-900 focus:outline-none focus:border-forest-700"
              />
            </div>

            <div className="pt-3 border-t border-academic-border space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800 block">
                Parent / Guardian Information (Optional)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-forest-900 block mb-1">
                    Parent Name:
                  </label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full bg-white border border-academic-border rounded-xl px-4 py-2.5 text-xs text-forest-900 focus:outline-none focus:border-forest-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-forest-900 block mb-1">
                    Parent WhatsApp Number:
                  </label>
                  <input
                    type="tel"
                    value={parentWhatsapp}
                    onChange={(e) => setParentWhatsapp(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white border border-academic-border rounded-xl px-4 py-2.5 text-xs text-forest-900 focus:outline-none focus:border-forest-700"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-forest-50/70 border border-forest-200/60 flex items-start gap-3 text-xs text-forest-800">
            <ShieldCheck className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-forest-950 block">100% Free Launch Policy:</span>
              <span>
                Your first 10 questions every week are completely free with zero lock-in or payment details needed.
                Full question bank dossiers and unlimited access are available for ₹299/mo per subject.
              </span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-1.5 text-xs text-forest-700 hover:text-forest-950 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleFinish}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold px-7 py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-sm disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Unlocking 10 Questions...' : 'Start 10 Free Questions →'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
