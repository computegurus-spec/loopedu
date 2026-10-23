'use client';

import React, { useState, useEffect } from 'react';
import { SEEDED_PRACTICE_QUESTIONS, PracticeQuestion } from '@/lib/data/seededPracticeBank';
import {
  getMistakeNotebook,
  recordQuestionMistake,
  recordMistakeReviewSuccess,
  MistakeEntry,
  generateWeeklyPlan,
  DayPlan,
} from '@/lib/study/plannerEngine';
import {
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  RotateCcw,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  Award,
  ArrowRight,
  Send,
  Flag,
} from 'lucide-react';

export const PrepareWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'practice' | 'mistakes' | 'planner'>('practice');
  const [selectedTrack, setSelectedTrack] = useState<PracticeQuestion['trackCode']>('JEE_NEET_PHYSICS');

  // Practice state
  const questionsForTrack = SEEDED_PRACTICE_QUESTIONS.filter((q) => q.trackCode === selectedTrack);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showHintStep, setShowHintStep] = useState(0);
  const [scoreCount, setScoreCount] = useState(0);
  const [issueReported, setIssueReported] = useState(false);

  // Mistake Notebook state
  const [mistakes, setMistakes] = useState<MistakeEntry[]>([]);

  // Weekly Planner state
  const [dailyMinutes, setDailyMinutes] = useState(30);
  const [restDay, setRestDay] = useState('Sunday');
  const [weeklyPlan, setWeeklyPlan] = useState<DayPlan[]>([]);

  useEffect(() => {
    setMistakes(getMistakeNotebook());
    setWeeklyPlan(generateWeeklyPlan(dailyMinutes, restDay));
  }, [dailyMinutes, restDay, activeTab]);

  const currentQuestion = questionsForTrack[currentIndex] || questionsForTrack[0];

  const handleSelectOption = (label: string) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(label);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || !currentQuestion) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQuestion.correctOption;

    if (isCorrect) {
      setScoreCount((prev) => prev + 1);
      recordMistakeReviewSuccess(currentQuestion.id);
    } else {
      recordQuestionMistake({
        id: currentQuestion.id,
        trackCode: currentQuestion.trackCode,
        topic: currentQuestion.topic,
        question: currentQuestion.question,
        correctOption: currentQuestion.correctOption,
        detailedExplanation: currentQuestion.detailedExplanation,
      });
    }
    setMistakes(getMistakeNotebook());
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHintStep(0);
    setIssueReported(false);
    if (currentIndex < questionsForTrack.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // Loop back
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Workspace Tab Nav */}
      <div className="p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('practice')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'practice'
                ? 'bg-teal-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Interactive Diagnostic Practice</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mistakes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'mistakes'
                ? 'bg-teal-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mistake Vault</span>
            {mistakes.length > 0 && (
              <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded-full font-black">
                {mistakes.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('planner')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'planner'
                ? 'bg-teal-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Adaptive Weekly Planner</span>
          </button>
        </div>

        <div className="text-xs font-semibold text-slate-500 pr-3 hidden sm:block">
          Deterministic Scoring • Zero Hallucination
        </div>
      </div>

      {/* TAB 1: PRACTICE DRILL */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          {/* Track Selection Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="font-bold text-slate-500 text-xs shrink-0 mr-1">Syllabus Track:</span>
            {[
              { id: 'JEE_NEET_PHYSICS', label: 'JEE / NEET Physics Foundation' },
              { id: 'JEE_NEET_CHEM_BIO', label: 'JEE / NEET Chemistry & Biology' },
              { id: 'ADULT_APTITUDE_REASONING', label: 'Adult Banking / RRB Aptitude & Logic' },
            ].map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => {
                  setSelectedTrack(track.id as any);
                  setCurrentIndex(0);
                  setSelectedOption(null);
                  setIsAnswerSubmitted(false);
                  setShowHintStep(0);
                }}
                className={`px-3.5 py-2 rounded-xl font-bold transition whitespace-nowrap border ${
                  selectedTrack === track.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                {track.label}
              </button>
            ))}
          </div>

          {/* Question Card */}
          {currentQuestion && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
              {/* Meta bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200 text-[10px] uppercase">
                    Question {currentIndex + 1} of {questionsForTrack.length}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="font-bold text-slate-900">{currentQuestion.topic}</span>
                  <span className="text-slate-400">({currentQuestion.subtopic})</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      currentQuestion.difficulty === 'Easy'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : currentQuestion.difficulty === 'Moderate'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {currentQuestion.difficulty}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">ID: {currentQuestion.id}</span>
                </div>
              </div>

              {/* Question Text */}
              <div className="text-base sm:text-lg font-bold text-slate-950 leading-relaxed">
                {currentQuestion.question}
              </div>

              {/* Progressive Socratic Clue Toggle */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowHintStep((prev) => Math.min(prev + 1, currentQuestion.progressiveHints.length))}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {showHintStep === 0
                        ? 'Need a Progressive Hint? (Socratic Clue)'
                        : `Next Clue (${showHintStep}/${currentQuestion.progressiveHints.length})`}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIssueReported(true)}
                    className="text-[11px] font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1"
                  >
                    <Flag className="w-3 h-3" />
                    <span>{issueReported ? 'Report Received' : 'Report Issue'}</span>
                  </button>
                </div>

                {showHintStep > 0 && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-1.5">
                    <span className="font-extrabold text-amber-900 block text-[11px] uppercase">
                      Socratic Detective Clue (Step {showHintStep}):
                    </span>
                    <p className="text-slate-800">{currentQuestion.progressiveHints[showHintStep - 1]}</p>
                  </div>
                )}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedOption === opt.label;
                  let optionStyles = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

                  if (isAnswerSubmitted) {
                    if (opt.label === currentQuestion.correctOption) {
                      optionStyles = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500';
                    } else if (isSelected && opt.label !== currentQuestion.correctOption) {
                      optionStyles = 'bg-rose-50 border-rose-500 text-rose-950 ring-1 ring-rose-500';
                    } else {
                      optionStyles = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyles = 'bg-teal-50 border-teal-600 text-teal-950 ring-1 ring-teal-600';
                  }

                  return (
                    <button
                      key={opt.label}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectOption(opt.label)}
                      className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${optionStyles}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-xs font-black flex items-center justify-center shrink-0">
                        {opt.label}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold pt-0.5">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Submit / Next Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500">
                  Current Session Score: {scoreCount} Correct
                </span>

                {!isAnswerSubmitted ? (
                  <button
                    type="button"
                    disabled={!selectedOption}
                    onClick={handleSubmitAnswer}
                    className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-bold text-xs transition shadow-2xs"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Detailed Explanation Drawer (Appears after submission) */}
              {isAnswerSubmitted && (
                <div
                  className={`p-6 rounded-2xl border space-y-4 animate-in fade-in duration-200 ${
                    selectedOption === currentQuestion.correctOption
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                      : 'bg-rose-50/60 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {selectedOption === currentQuestion.correctOption ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span className="font-extrabold text-sm text-emerald-900">
                            Correct Solution! (+1 Mark)
                          </span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 text-rose-600" />
                          <span className="font-extrabold text-sm text-rose-900">
                            Incorrect • Added to Spaced Recall Mistake Vault
                          </span>
                        </>
                      )}
                    </div>

                    <span className="text-[11px] font-semibold text-slate-500">
                      Provenance: {currentQuestion.sourceProvenance}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                    {currentQuestion.detailedExplanation}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-200/60 text-xs">
                    <span className="font-bold text-slate-950 block">Step-by-Step Marking Derivation:</span>
                    <ol className="list-decimal list-inside space-y-1 text-slate-700 text-xs">
                      {currentQuestion.stepByStepSolution.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MISTAKE NOTEBOOK */}
      {activeTab === 'mistakes' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-2">
            <h3 className="text-xl font-bold text-slate-950 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-amber-600" />
              <span>Spaced Repetition Error Vault</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every concept missed in practice enters this review queue at 1-day, 3-day, and 7-day intervals. A question is marked "Mastered" only after being solved correctly twice consecutively.
            </p>
          </div>

          {mistakes.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Mistake Vault is Clear!</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No pending errors due for revision. When you attempt questions in the practice drill and make a mistake, they will automatically appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {mistakes.map((m) => (
                <div
                  key={m.questionId}
                  className={`p-5 rounded-2xl border bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    m.isMastered ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        {m.topic}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs font-bold text-slate-700">Next Review: {m.nextRevisionDueDate}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{m.questionText}</h4>
                    <p className="text-xs text-slate-600 line-clamp-1">{m.explanation}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                        m.isMastered
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {m.isMastered ? '✓ Mastered' : `Stage ${m.reviewStage} (${m.consecutiveCorrect}/2)`}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        recordMistakeReviewSuccess(m.questionId);
                        setMistakes(getMistakeNotebook());
                      }}
                      className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs"
                    >
                      Mark Solved
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ADAPTIVE WEEKLY PLANNER */}
      {activeTab === 'planner' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-950 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <span>Availability-Aware Weekly Schedule</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Calibrated to your daily hours. Missed tasks roll over gently without toxic streak penalties or guilt trips.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Daily Target</label>
                  <select
                    value={dailyMinutes}
                    onChange={(e) => setDailyMinutes(parseInt(e.target.value))}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 font-bold text-xs text-slate-800"
                  >
                    <option value={15}>15 Minutes</option>
                    <option value={30}>30 Minutes</option>
                    <option value={45}>45 Minutes</option>
                    <option value={60}>60 Minutes</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Rest Day</label>
                  <select
                    value={restDay}
                    onChange={(e) => setRestDay(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 font-bold text-xs text-slate-800"
                  >
                    {['Sunday', 'Saturday', 'Friday', 'Monday'].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 7 Days Schedule Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {weeklyPlan.map((day) => (
              <div
                key={day.dayName}
                className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
                  day.isRestDay
                    ? 'bg-amber-50/50 border-amber-200 text-slate-800'
                    : 'bg-white border-slate-200/90 text-slate-900 shadow-2xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-slate-950 text-sm">{day.dayName}</span>
                    <span className="font-semibold text-slate-400 text-[11px]">{day.dateString}</span>
                  </div>

                  <div className="space-y-2">
                    {day.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1"
                      >
                        <div className="font-bold text-slate-900 text-[11px]">{task.title}</div>
                        {task.estimatedMinutes > 0 && (
                          <div className="text-[10px] text-teal-700 font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{task.estimatedMinutes} Mins Allocated</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] font-bold uppercase text-slate-400 pt-2 border-t border-slate-100">
                  {day.isRestDay ? '🌱 REST & RECHARGE DAY' : `⚡ ${day.allocatedMinutes} MINS FOCUSED WORK`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
