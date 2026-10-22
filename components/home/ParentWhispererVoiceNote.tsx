'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Heart,
  UserCheck,
} from 'lucide-react';

interface VoiceSummaryProfile {
  studentName: string;
  grade: string;
  dateStr: string;
  accuracy: string;
  highlight: string;
  focusArea: string;
  counselorName: string;
  counselorTitle: string;
  script: string;
}

const VOICE_PROFILES: VoiceSummaryProfile[] = [
  {
    studentName: 'Ram',
    grade: 'CBSE Class 10 (Maths & Science)',
    dateStr: 'Today • 7:00 PM Daily Brief',
    accuracy: '80% (4/5 Correct)',
    highlight: 'Mastered Polynomials and Real Number proofs in under 12 minutes.',
    focusArea: 'Quadratic Word Problems (Speed-Distance)',
    counselorName: 'Ananya Sharma',
    counselorTitle: 'Senior Academic Counselor, Bangalore',
    script:
      'Namaste! This is your academic counselor Ananya with a quick 30-second progress briefing for Ram today. He completed his 5 CBSE questions with 80% accuracy in just 12 minutes! He showed strong conceptual clarity on Polynomials, and only had a small hesitation on a Quadratic speed-distance problem. I have already queued up a brief 3-minute review for him tomorrow morning. No need to worry or nag him—his 5-day study habit streak is active and he is right on track for his board exams!',
  },
  {
    studentName: 'Priya',
    grade: 'CBSE Class 10 (Science Focus)',
    dateStr: 'Today • 7:00 PM Daily Brief',
    accuracy: '100% (5/5 Correct)',
    highlight: 'Flawless balanced chemical equations & exothermic reactions.',
    focusArea: 'Carbon & Compounds electron dot structures',
    counselorName: 'Ananya Sharma',
    counselorTitle: 'Senior Academic Counselor, Bangalore',
    script:
      'Namaste! Wonderful news about Priya today. This is Ananya from LoopEdu. Priya scored a perfect 5 out of 5 on her Science Daily Five in just 11 minutes! Her balanced chemical equations and exothermic definitions were textbook perfect according to the official CBSE marking scheme. Her 7-day habit streak is active and her projected board score is currently in the 92 to 95 percent bracket. Excellent effort today!',
  },
];

export const ParentWhispererVoiceNote: React.FC = () => {
  const [profileIndex, setProfileIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  const profile = VOICE_PROFILES[profileIndex];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load and cache voices when SpeechSynthesis is ready
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        setVoicesLoaded(true);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Find natural Indian female voice
  const getIndianFemaleVoice = (): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // 1. Direct Indian female voice names
    const indianFemaleNames = ['neerja', 'heera', 'swara', 'kavya', 'aditi', 'veena', 'priya', 'ananya'];
    const indianVoices = voices.filter((v) => {
      const lang = v.lang.toLowerCase().replace('_', '-');
      return lang.startsWith('en-in') || lang.startsWith('hi-in');
    });

    for (const v of indianVoices) {
      const lowerName = v.name.toLowerCase();
      if (indianFemaleNames.some((name) => lowerName.includes(name)) || lowerName.includes('female')) {
        return v;
      }
    }

    // 2. Any en-IN voice that is not explicitly named male
    const maleNames = ['prabhat', 'ravi', 'hemant', 'male', 'david', 'mark'];
    const nonMaleIndian = indianVoices.find((v) => {
      const lowerName = v.name.toLowerCase();
      return !maleNames.some((m) => lowerName.includes(m));
    });
    if (nonMaleIndian) return nonMaleIndian;

    if (indianVoices.length > 0) return indianVoices[0];

    // 3. Fallback to any natural warm female voice
    const femaleNatural = voices.find(
      (v) =>
        (v.name.toLowerCase().includes('female') ||
          v.name.toLowerCase().includes('natural') ||
          v.name.toLowerCase().includes('jenny') ||
          v.name.toLowerCase().includes('aria') ||
          v.name.toLowerCase().includes('samantha')) &&
        v.lang.startsWith('en')
    );
    if (femaleNatural) return femaleNatural;

    return voices.find((v) => v.lang.startsWith('en')) || null;
  };

  const playSpeech = () => {
    if (typeof window === 'undefined') return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(profile.script);
      // Pacing for calm, natural, articulate Indian mentor voice
      utterance.rate = 0.92;
      utterance.pitch = 1.05;

      const voice = getIndianFemaleVoice();
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(100);
        if (timerRef.current) clearInterval(timerRef.current);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    }

    setIsPlaying(true);
    setProgress(0);

    const duration = 28000;
    const interval = 200;
    const step = (interval / duration) * 100;

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(timerRef.current!);
          return 98;
        }
        return prev + step;
      });
    }, interval);
  };

  const pauseSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseSpeech();
    } else {
      playSpeech();
    }
  };

  const handleSwitchProfile = (idx: number) => {
    pauseSpeech();
    setProfileIndex(idx);
    setProgress(0);
  };

  const shareText = encodeURIComponent(
    `📢 *Daily 30-Second Voice Brief from Counselor ${profile.counselorName}*\n` +
      `👤 *Student:* ${profile.studentName} (${profile.grade})\n` +
      `🎯 *Accuracy:* ${profile.accuracy}\n` +
      `✨ *Highlight:* ${profile.highlight}\n` +
      `🔍 *Focus Area:* ${profile.focusArea}\n` +
      `🔥 *Habit Streak:* Active (5 Days)\n\n` +
      `Check live progress: https://loopedu.vercel.app/parent`
  );

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-xl space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
            <Heart className="w-3.5 h-3.5" />
            <span>The Parent Hub • Daily 7:00 PM Voice Brief</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Zero Nagging. 100% Calm Observability.
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
            Instead of interrogating your child after work (*"Did you study today?"*), you receive a 30-second audio voice note from your dedicated academic counselor.
          </p>
        </div>

        {/* Student Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0">
          {VOICE_PROFILES.map((p, idx) => (
            <button
              key={p.studentName}
              onClick={() => handleSwitchProfile(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                profileIndex === idx
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {p.studentName}’s Briefing
            </button>
          ))}
        </div>
      </div>

      {/* Voice Note Player Box */}
      <div className="rounded-2xl bg-slate-950 text-white p-5 sm:p-7 space-y-5 border border-slate-800 shadow-md">
        {/* Top Info */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold text-[10px]">
              AS
            </div>
            <div>
              <span className="font-semibold text-slate-200">
                {profile.counselorName}
              </span>
              <span className="text-slate-500 ml-1.5 text-[11px]">
                ({profile.counselorTitle})
              </span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">
            {profile.dateStr}
          </span>
        </div>

        {/* Audio Waveform & Play Button */}
        <div className="flex items-center gap-4 sm:gap-6 bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <button
            onClick={togglePlay}
            className="w-13 h-13 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shrink-0 transition shadow-lg active:scale-95"
            aria-label={isPlaying ? 'Pause voice note' : 'Play voice note'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-white" />
            ) : (
              <Play className="w-5 h-5 fill-white translate-x-0.5" />
            )}
          </button>

          {/* Waveform Animation */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-blue-400">
                {isPlaying ? 'Playing Counselor Audio Note...' : 'Tap to Listen (Indian Female Voice • 28s)'}
              </span>
              <span className="text-slate-400">
                {isPlaying ? `${Math.round((progress / 100) * 28)}s / 28s` : '0:28'}
              </span>
            </div>

            {/* Sound Wave Bars */}
            <div className="h-6 flex items-center gap-1 overflow-hidden">
              {[20, 35, 60, 45, 80, 95, 65, 45, 75, 90, 50, 70, 85, 40, 60, 75, 90, 30, 45, 80, 95, 60, 40, 25, 70, 85, 40, 60].map(
                (height, i) => {
                  const isCurrent = (i / 28) * 100 <= progress;
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        isCurrent ? 'bg-blue-500' : 'bg-slate-800'
                      } ${isPlaying ? 'animate-pulse' : ''}`}
                      style={{
                        height: isPlaying ? `${Math.max(20, Math.sin(i + progress) * 100)}%` : `${height}%`,
                      }}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* Spoken Transcript Preview */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed">
          "{profile.script}"
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
              Today's Accuracy
            </span>
            <div className="text-base font-bold text-emerald-400">{profile.accuracy}</div>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
              Core Highlight
            </span>
            <div className="text-xs text-slate-200 line-clamp-2">{profile.highlight}</div>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
              Tomorrow's Priority
            </span>
            <div className="text-xs text-amber-300 line-clamp-2">{profile.focusArea}</div>
          </div>
        </div>

        {/* Share Button */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs text-slate-400">
          <span>Delivered automatically to parents daily at 7:00 PM IST</span>
          <a
            href={`https://api.whatsapp.com/send?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
