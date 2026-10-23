'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckInMood,
  CoachReflectionEntry,
  getMindCoachReflections,
  saveMindCoachReflection,
  deleteCoachReflections,
  detectCrisisIntent,
  VERIFIED_CRISIS_DIRECTORY,
} from '@/lib/coach/mindCoachEngine';
import { useDemo } from '@/lib/demo/DemoContext';
import {
  HeartHandshake,
  Clock,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  ShieldCheck,
  Lock,
  Trash2,
  PhoneCall,
  AlertTriangle,
  ExternalLink,
  Smile,
  Frown,
  Meh,
  Send,
  Zap,
} from 'lucide-react';

export const MindCoachInterface: React.FC = () => {
  const { activePersona } = useDemo();

  // Mood Check-in State
  const [selectedMood, setSelectedMood] = useState<CheckInMood>('STEADY');
  const [energyScore, setEnergyScore] = useState<number>(3);
  const [reflectionText, setReflectionText] = useState('');
  const [intentionText, setIntentionText] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Past Private Reflections
  const [reflections, setReflections] = useState<CoachReflectionEntry[]>([]);

  // Pomodoro Focus & Rest Timer State
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'FOCUS' | 'REST'>('FOCUS');

  // Crisis Distress Intercept State
  const [crisisAlertOpen, setCrisisAlertOpen] = useState(false);

  useEffect(() => {
    setReflections(getMindCoachReflections());
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      if (timerMode === 'FOCUS') {
        alert('Focus sprint complete! Take a gentle 5-minute break.');
        setTimerMode('REST');
        setTimerSeconds(5 * 60);
      } else {
        alert('Rest session finished. Ready to return to study?');
        setTimerMode('FOCUS');
        setTimerSeconds(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, timerMode]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setReflectionText(val);

    // Crisis distress safeguard detection
    if (detectCrisisIntent(val)) {
      setCrisisAlertOpen(true);
    }
  };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;

    saveMindCoachReflection({
      mood: selectedMood,
      energyLevel: energyScore,
      journalText: reflectionText,
      practiceIntention: intentionText || 'Complete one focused practice session today.',
    });

    setReflections(getMindCoachReflections());
    setReflectionText('');
    setIntentionText('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDeleteAllReflections = () => {
    if (confirm('Permanently delete all your private reflection logs? This cannot be undone.')) {
      deleteCoachReflections();
      setReflections([]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Privacy & Scope Disclaimer Notice */}
      <div className="p-4 sm:p-5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-teal-600 text-white shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-teal-900 block">
              Strictly Private Student Space • 0% Parental / Counsellor / Sponsor Visibility
            </span>
            <span className="text-teal-800 text-[11px]">
              The Mind Coach is a non-clinical companion for study habits and everyday exam stress. It does not diagnose, treat illness, or replace a qualified healthcare professional.
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCrisisAlertOpen(true)}
          className="text-teal-900 font-bold underline shrink-0 text-left sm:text-right"
        >
          View Verified Support Helplines →
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Daily Check-in & Private Journal (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <form
            onSubmit={handleSaveReflection}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                DAILY NON-DIAGNOSTIC CHECK-IN
              </span>
              <h3 className="text-xl font-bold text-slate-950">How is your mind feeling today?</h3>
              <p className="text-xs text-slate-600">
                Acknowledge pressure without judgment. Taking 60 seconds to name your state eases cognitive load.
              </p>
            </div>

            {/* Mood Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              {[
                { id: 'STEADY', label: 'Steady & Calm', icon: Smile },
                { id: 'EXAM_ANXIOUS', label: 'Exam Anxious', icon: Zap },
                { id: 'TIRED_DRAINED', label: 'Tired / Drained', icon: Meh },
                { id: 'OVERWHELMED', label: 'Overwhelmed', icon: Frown },
                { id: 'RESTLESS', label: 'Restless Focus', icon: RotateCcw },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = selectedMood === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMood(m.id as any)}
                    className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition ${
                      isSelected
                        ? 'bg-teal-600 text-white border-teal-600 shadow-2xs font-bold'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[11px]">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Energy Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Self-Perceived Energy Level</span>
                <span className="text-teal-700">{energyScore} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={energyScore}
                onChange={(e) => setEnergyScore(parseInt(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                <span>1 - Completely Depleted</span>
                <span>3 - Moderate / Steady</span>
                <span>5 - High Vitality</span>
              </div>
            </div>

            {/* Private Thought Reflection Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block">
                Private Reflection Note (Encrypted locally in your browser)
              </label>
              <textarea
                rows={4}
                value={reflectionText}
                onChange={handleTextChange}
                placeholder="What is weighing on your mind today? (e.g. Worried about physics derivation timing, or feeling distracted by mock test cutoff discussions...)"
                className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-500 leading-relaxed"
                required
              />
            </div>

            {/* Today's Single Gentle Action Intention */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block">
                One Feasible Action for Today (Keep it tiny and concrete)
              </label>
              <input
                type="text"
                value={intentionText}
                onChange={(e) => setIntentionText(e.target.value)}
                placeholder="e.g. Review 3 wrong questions in electricity and stop studying by 10 PM."
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {saveSuccess ? (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  ✓ Reflection saved to your private journal
                </span>
              ) : (
                <span className="text-[11px] text-slate-400">
                  Visible only to you • Excluded from all reports
                </span>
              )}

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition shadow-2xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Save Private Check-In</span>
              </button>
            </div>
          </form>

          {/* Past Reflection History List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Your Recent Reflections ({reflections.length})</span>
              </h4>

              {reflections.length > 0 && (
                <button
                  type="button"
                  onClick={handleDeleteAllReflections}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete History</span>
                </button>
              )}
            </div>

            {reflections.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">
                No past reflections recorded yet. Your entries will be stored privately on this device.
              </p>
            ) : (
              <div className="space-y-3">
                {reflections.slice(0, 5).map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-teal-800 bg-teal-100/60 px-2 py-0.5 rounded text-[10px]">
                          {entry.mood}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500 text-[11px]">
                          {new Date(entry.createdAt).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">
                        Energy: {entry.energyLevel}/5
                      </span>
                    </div>

                    <p className="text-slate-800 leading-relaxed font-normal">{entry.journalText}</p>

                    {entry.practiceIntention && (
                      <div className="text-[11px] font-semibold text-teal-900 bg-teal-50/50 p-2 rounded-lg border border-teal-100">
                        🎯 Intention: {entry.practiceIntention}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pomodoro Focus Timer & Bounded De-stress Routine */}
        <div className="space-y-6">
          {/* Focus & Rest Timer */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6 text-center">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                GENTLE PACING
              </span>
              <h3 className="text-lg font-bold text-slate-950">
                {timerMode === 'FOCUS' ? 'Focused Study Sprint' : 'Rest & Reset Break'}
              </h3>
            </div>

            {/* Big Countdown Clock */}
            <div className="py-6 rounded-3xl bg-slate-950 text-white font-mono text-5xl font-black tracking-wider shadow-inner">
              {formatTimer(timerSeconds)}
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 shadow-2xs ${
                  isTimerRunning
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                    : 'bg-teal-600 hover:bg-teal-700 text-white'
                }`}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isTimerRunning ? 'Pause Sprint' : 'Start 25m Focus'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(timerMode === 'FOCUS' ? 25 * 60 : 5 * 60);
                }}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal">
              25 minutes focused practice followed by 5 minutes eyes-off-screen relaxation. Prevents evening study fatigue.
            </p>
          </div>

          {/* Quick Grounding Exercises Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span className="uppercase tracking-wider">60-Second Reset Routine</span>
            </div>

            <h4 className="text-base font-extrabold text-white">The 4-4-4 Box Breath</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                1. Inhale slowly through your nose for 4 counts.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                2. Hold your breath gently for 4 counts.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                3. Exhale smoothly through your mouth for 4 counts.
              </div>
            </div>

            <p className="text-[11px] text-slate-400 pt-1">
              Repeated 3 times, box breathing directly lowers acute sympathetic nervous system overdrive before timed test sessions.
            </p>
          </div>
        </div>
      </div>

      {/* Verified Statutory Crisis Helpline Modal (Always Accessible & Intercept-Triggered) */}
      {crisisAlertOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-rose-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-rose-100 pb-3">
              <div className="flex items-center gap-2 text-rose-600">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <h3 className="text-base sm:text-lg font-black text-slate-950">
                  Immediate Professional &amp; Human Support
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCrisisAlertOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If you or someone you know is feeling overwhelmed, hopeless, or in acute distress, please know that you do not have to carry this alone. Confidential, free human support from certified counsellors is available 24/7 across India.
            </p>

            <div className="space-y-3">
              {VERIFIED_CRISIS_DIRECTORY.map((helpline) => (
                <div
                  key={helpline.name}
                  className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-950">{helpline.name}</span>
                    <span className="text-[10px] font-black uppercase text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                      24x7 FREE
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={`tel:${helpline.tollFreeNumber}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 text-white font-black text-sm hover:bg-rose-700 transition"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{helpline.tollFreeNumber}</span>
                    </a>
                    {helpline.alternativeNumber && (
                      <span className="text-xs font-bold text-slate-700">
                        Alt: {helpline.alternativeNumber}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-600">{helpline.ministryAuthority}</p>
                  <div className="text-[10px] text-slate-500 font-medium">
                    Languages: {helpline.supportedLanguages}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-slate-100 text-[10px] text-slate-600 leading-normal">
              Statutory verification notice: All helplines above are certified Government of India emergency response programs. LoopEdu does not charge fees or provide clinical medical treatment.
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setCrisisAlertOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close Support Directory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
