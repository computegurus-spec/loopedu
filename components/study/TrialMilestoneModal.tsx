'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Share2,
  Clock,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  Send,
  Zap,
  Users,
  X,
  ExternalLink,
} from 'lucide-react';
import { CheckoutButton } from '../CheckoutButton';
import { SubjectSlug } from '@/types';

interface TrialMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectSlug: SubjectSlug;
  subjectName: string;
  score?: number; // e.g. 8 out of 10
  totalAttempted?: number; // 10
  daysUntilReset?: number;
  hoursUntilReset?: number;
  studentName?: string;
}

export function TrialMilestoneModal({
  isOpen,
  onClose,
  subjectSlug,
  subjectName,
  score = 8,
  totalAttempted = 10,
  daysUntilReset = 7,
  hoursUntilReset = 168,
  studentName = 'Learner',
}: TrialMilestoneModalProps) {
  const [copied, setCopied] = useState(false);
  const [referralLink, setReferralLink] = useState('https://loopedu.in');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      const storedPhone = localStorage.getItem('loopedu_student_phone') || '';
      const cleanPhone = storedPhone.replace(/\D/g, '').slice(-6);
      const code = cleanPhone ? `REF${cleanPhone}` : 'CBSE10';
      setReferralLink(`${origin}?ref=${code}`);
    }
  }, []);

  if (!isOpen) return null;

  const percentage = Math.round((score / totalAttempted) * 100);

  // WhatsApp share messages
  const friendShareText = encodeURIComponent(
    `🔥 I just completed my 10-Question CBSE Diagnostic in ${subjectName} on LoopEdu and scored ${score}/${totalAttempted} (${percentage}%)!\n\nCan you beat my score? Practice 10 high-yield board questions 100% free this week here:\n${referralLink}`
  );

  const parentShareText = encodeURIComponent(
    `📚 LoopEdu Weekly Progress Update\nStudent: ${studentName}\nSubject: ${subjectName}\nScore: ${score}/${totalAttempted} (${percentage}% Accuracy)\nStatus: Completed 10-minute active recall loop cleanly.\nNext 10 questions unlock in ${daysUntilReset} days.\nPlatform: https://loopedu.in`
  );

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-white border border-academic-border shadow-2xl p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-academic-subtle hover:text-forest-950 hover:bg-paper-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Trophy Banner */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-forest-100 text-forest-800 mx-auto shadow-sm">
            <Trophy className="w-8 h-8 text-forest-800" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-forest-700 bg-forest-100 px-2 py-0.5 rounded">
              Weekly Milestone Reached
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950">
            10-Question Sprint Conquered! 🎉
          </h2>
          <p className="text-xs sm:text-sm text-forest-800 max-w-md mx-auto">
            Great job! You have completed your 10 free high-yield board questions for <strong>{subjectName}</strong> this week.
          </p>
        </div>

        {/* Diagnostic Score Card */}
        <div className="p-5 rounded-2xl bg-paper-100 border border-academic-border space-y-3">
          <div className="flex items-center justify-between border-b border-academic-border pb-2.5">
            <div>
              <span className="text-[10px] uppercase font-bold text-academic-subtle block">
                Official CBSE Diagnostic Score
              </span>
              <span className="text-sm font-bold text-forest-950">{studentName}</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-serif font-bold text-forest-950">
                {score} / {totalAttempted}
              </span>
              <span className="text-[11px] text-forest-700 block font-semibold">{percentage}% Accuracy</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-2.5 rounded-xl bg-white border border-academic-border">
              <span className="text-[10px] uppercase font-bold text-forest-800 block mb-0.5">
                Strengths
              </span>
              <span className="font-semibold text-forest-950">Core Formulations & Direct NCERT Steps</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-academic-border">
              <span className="text-[10px] uppercase font-bold text-amber-800 block mb-0.5">
                Revision Target
              </span>
              <span className="font-semibold text-amber-950">Multi-step proof deductions</span>
            </div>
          </div>
        </div>

        {/* 7-Day Reset Timer Box */}
        <div className="p-4 rounded-2xl bg-forest-50/80 border border-forest-200/70 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-forest-200 flex items-center justify-center text-forest-800 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-forest-950 block">
                Next 10 Free Questions Unlock In:
              </span>
              <span className="text-[11px] text-forest-800">
                {daysUntilReset} days ({hoursUntilReset} hours remaining in weekly cycle)
              </span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-forest-900 bg-white border border-forest-200 px-3 py-1.5 rounded-lg shrink-0">
            Sunday 8 PM Reset
          </span>
        </div>

        {/* Viral WhatsApp Share Actions */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-950 block">
            Share & Unlock More Questions
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`https://api.whatsapp.com/send?text=${friendShareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>Challenge a Classmate</span>
            </a>

            <a
              href={`https://api.whatsapp.com/send?text=${parentShareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-paper-100 border border-academic-border text-forest-900 font-bold text-xs uppercase tracking-wider transition shadow-sm"
            >
              <Send className="w-4 h-4 text-forest-700" />
              <span>Send Score to Parent</span>
            </a>
          </div>

          <div className="p-3 rounded-xl bg-paper-50 border border-academic-border text-xs flex items-center justify-between gap-2">
            <span className="text-academic-subtle text-[11px] truncate">
              Share link: {referralLink}
            </span>
            <button
              onClick={handleCopyLink}
              className="shrink-0 text-forest-800 hover:text-forest-950 font-bold text-[11px] underline"
            >
              {copied ? 'Copied! ✓' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Full Pro Unlock Option */}
        <div className="pt-4 border-t border-academic-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-forest-800" />
              <span className="text-xs font-bold text-forest-950">Don't want to wait 7 days?</span>
            </div>
            <p className="text-[11px] text-forest-700 mt-0.5">
              Unlock all 200 questions + downloadable 10-year question dossiers for only ₹299/mo.
            </p>
          </div>

          <CheckoutButton
            subjectSlug={subjectSlug}
            subjectName={subjectName}
            priceInr={299}
            isPublished={true}
            buttonText="Unlock All 200 (₹299)"
            className="w-full sm:w-auto text-xs py-2.5 px-4"
          />
        </div>
      </div>
    </div>
  );
}
