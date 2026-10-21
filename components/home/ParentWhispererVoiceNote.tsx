'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Clock,
  Heart,
} from 'lucide-react';

interface VoiceSummaryProfile {
  studentName: string;
  grade: string;
  dateStr: string;
  accuracy: string;
  highlight: string;
  focusArea: string;
  script: string;
}

const VOICE_PROFILES: VoiceSummaryProfile[] = [
  {
    studentName: 'Ram',
    grade: 'CBSE Class 10 (Maths & Science)',
    dateStr: 'Today • 7:00 PM Update',
    accuracy: '80% (4/5 Correct)',
    highlight: 'Mastered Polynomials and Real Number proofs in under 12 minutes.',
    focusArea: 'Quadratic Word Problems (Speed-Distance)',
    script:
      'Hi there! Just a quick 30-second update on Ram today. He crushed his 5 CBSE questions with 80% accuracy in just 12 minutes! He showed strong mastery on Polynomials, but stumbled slightly on a Quadratic speed-distance word problem. I have already queued up a quick 3-minute refresher for him tomorrow morning. No need to worry or nag him—he has kept his 5-day habit streak alive, and everything is right on track for his board exams!',
  },
  {
    studentName: 'Priya',
    grade: 'CBSE Class 10 (Science Focus)',
    dateStr: 'Today • 7:00 PM Update',
    accuracy: '100% (5/5 Correct)',
    highlight: 'Flawless balanced chemical equations & exothermic reactions.',
    focusArea: 'Carbon & Compounds electron dot structures',
    script:
      'Namaste! Wonderful news about Priya today. She scored a perfect 5 out of 5 on her Science Daily Five in just 11 minutes! Her balanced chemical equations and exothermic definitions were textbook perfect according to the CBSE marking scheme. Her 7-day habit streak is active and her projected board score is currently in the 92 to 95 percent bracket. Excellent effort today!',
  },
];

export const ParentWhispererVoiceNote: React.FC = () => {
  const [profileIndex, setProfileIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const profile = VOICE_PROFILES[profileIndex];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Web Speech Synthesis for realistic live voice note playback
  const playSpeech = () => {
    if (typeof window === 'undefined') return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(profile.script);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;

      // Select natural English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(
        (v) =>
          v.lang.includes('en-IN') ||
          v.lang.includes('en-GB') ||
          v.name.includes('Natural') ||
          v.name.includes('Google')
      );
      if (preferred) {
        utterance.voice = preferred;
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

    // Simulate 30s progress bar
    const duration = 28000; // ~28 seconds
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

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const whatsappShareText = encodeURIComponent(
    `🎓 *LoopEdu Parent Observability Report for ${profile.studentName}*\n\n` +
      `📅 *Date:* Today\n` +
      `🎯 *Accuracy:* ${profile.accuracy}\n` +
      `✨ *Highlight:* ${profile.highlight}\n` +
      `🔍 *Focus Area:* ${profile.focusArea}\n` +
      `🔥 *Habit Streak:* Active (5 Days)\n\n` +
      `🎧 *"Did you study?"* No nagging required. Honesty Metre verified by LoopEdu (CBSE Class 10).\n` +
      `Check live board readiness: https://loopedu.in/parent`
  );

  return (
    <div className="rounded-3xl bg-gradient-to-br from-paper-50 via-white to-forest-50/50 border border-academic-border p-6 sm:p-10 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-academic-border/70 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-900 text-[11px] font-mono font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-forest-700" />
            <span>The Parent Whisperer • Daily 7:00 PM Voice Brief</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950">
            Zero Nagging. 100% Calm Observability.
          </h3>
          <p className="text-xs sm:text-sm text-academic-subtle max-w-xl">
            Instead of interrogating your child after work (*"Did you study today?"*), you receive a 30-second audio voice note sounding like a caring personal tutor.
          </p>
        </div>

        {/* Student Switcher */}
        <div className="flex items-center gap-1.5 bg-paper-100 p-1 rounded-2xl border border-academic-border shrink-0">
          {VOICE_PROFILES.map((p, idx) => (
            <button
              key={p.studentName}
              onClick={() => handleSwitchProfile(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                profileIndex === idx
                  ? 'bg-forest-900 text-limeaccent shadow-sm'
                  : 'text-forest-700 hover:text-forest-950'
              }`}
            >
              {p.studentName}’s Voice Note
            </button>
          ))}
        </div>
      </div>

      {/* Voice Note Player Box */}
      <div className="rounded-2xl bg-forest-950 text-white p-5 sm:p-7 space-y-5 border border-forest-800 shadow-lg">
        {/* Top Info */}
        <div className="flex items-center justify-between text-xs text-forest-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-limeaccent animate-pulse" />
            <span className="font-mono font-bold text-limeaccent">
              Daily Tutor Audio Summary for {profile.studentName}
            </span>
          </div>
          <span className="font-mono text-[11px] text-emerald-200 font-semibold">
            {profile.dateStr}
          </span>
        </div>

        {/* Audio Waveform & Play Button */}
        <div className="flex items-center gap-4 sm:gap-6 bg-forest-900/80 p-4 rounded-2xl border border-forest-800">
          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-2xl bg-limeaccent hover:bg-lime-400 text-forest-950 flex items-center justify-center shrink-0 transition shadow-md hover:scale-105 active:scale-95"
            aria-label={isPlaying ? 'Pause voice note' : 'Play voice note'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-forest-950" />
            ) : (
              <Play className="w-6 h-6 fill-forest-950 translate-x-0.5" />
            )}
          </button>

          {/* Waveform Animation */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-limeaccent font-bold">
                {isPlaying ? 'Playing AI Voice Brief...' : 'Tap to Listen (30 Seconds)'}
              </span>
              <span className="text-emerald-200 font-semibold">
                {isPlaying ? `${Math.round((progress / 100) * 28)}s / 28s` : '0:28'}
              </span>
            </div>

            {/* Sound Wave Bars */}
            <div className="h-6 flex items-center gap-1 overflow-hidden">
              {[18, 35, 60, 40, 80, 95, 65, 45, 75, 90, 50, 70, 85, 40, 60, 75, 90, 30, 45, 80, 95, 60, 40, 25, 70, 85, 40, 60].map(
                (height, i) => {
                  const isCurrent = (i / 28) * 100 <= progress;
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        isCurrent
                          ? 'bg-limeaccent'
                          : 'bg-forest-800'
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
        <div className="p-4 rounded-xl bg-forest-900/60 border border-forest-800/80 text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
          "{profile.script}"
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="p-3 rounded-xl bg-forest-900/60 border border-forest-800">
            <span className="text-[10px] uppercase font-mono text-emerald-300 font-bold block mb-0.5">
              Accuracy
            </span>
            <span className="font-bold text-limeaccent">{profile.accuracy}</span>
          </div>

          <div className="p-3 rounded-xl bg-forest-900/60 border border-forest-800">
            <span className="text-[10px] uppercase font-mono text-emerald-300 font-bold block mb-0.5">
              Today's Win
            </span>
            <span className="font-semibold text-white truncate block">{profile.highlight}</span>
          </div>

          <div className="p-3 rounded-xl bg-forest-900/60 border border-forest-800">
            <span className="text-[10px] uppercase font-mono text-emerald-300 font-bold block mb-0.5">
              Next Queued Fix
            </span>
            <span className="font-semibold text-emerald-200 truncate block">{profile.focusArea}</span>
          </div>
        </div>

        {/* 1-Click WhatsApp Broadcast Button */}
        <div className="pt-2 border-t border-forest-800 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] text-forest-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-limeaccent" />
            <span>Sends zero-stress honesty updates straight to parents' WhatsApp</span>
          </span>

          <a
            href={`https://api.whatsapp.com/send?text=${whatsappShareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-forest-950 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Voice Note & Report via WhatsApp →</span>
          </a>
        </div>
      </div>
    </div>
  );
};
