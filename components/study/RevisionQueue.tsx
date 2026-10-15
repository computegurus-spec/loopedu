'use client';

import React from 'react';
import Link from 'next/link';
import { RotateCcw, AlertCircle, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { MathRenderer } from '../MathRenderer';

interface QueueItem {
  id: string;
  subjectSlug: string;
  subjectName: string;
  topic: string;
  question: string;
  reason: 'missed' | 'revisit_flagged' | 'spaced_review';
  daysOverdue: number;
}

const SAMPLE_REVISION_QUEUE: QueueItem[] = [
  {
    id: 'MB-004',
    subjectSlug: 'maths-basic',
    subjectName: 'Maths Basic',
    topic: 'Quadratic Equations (Discriminant)',
    question: 'Find the discriminant of $2x^2 - 4x + 3 = 0$ and describe the nature of roots.',
    reason: 'missed',
    daysOverdue: 1,
  },
  {
    id: 'SC-012',
    subjectSlug: 'science',
    subjectName: 'Science',
    topic: 'Acids, Bases & Salts',
    question: 'Explain why pure water does not conduct electricity, whereas acidified water does.',
    reason: 'revisit_flagged',
    daysOverdue: 2,
  },
  {
    id: 'AI-005',
    subjectSlug: 'artificial-intelligence',
    subjectName: 'Artificial Intelligence',
    topic: 'Confusion Matrix & F1 Score',
    question: 'Under what specific test distribution condition is F1 Score preferred over simple Accuracy?',
    reason: 'spaced_review',
    daysOverdue: 3,
  },
];

export const RevisionQueue: React.FC = () => {
  return (
    <div className="rounded-2xl bg-white border border-academic-border p-6 sm:p-7 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-academic-border pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mistake Comeback Engine</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-forest-950 mt-0.5">
            Concepts Due for Practice ({SAMPLE_REVISION_QUEUE.length})
          </h3>
        </div>

        <span className="text-[11px] text-academic-subtle font-mono">
          Spaced Repetition Active
        </span>
      </div>

      <div className="bg-forest-50 border border-forest-200 rounded-xl p-3.5 text-xs text-forest-800 leading-relaxed space-y-1.5">
        <div className="font-bold text-forest-950 flex items-center gap-1.5">
          <RotateCcw className="w-3.5 h-3.5 text-forest-800" />
          <span>The Mistake Comeback (Active Recall)</span>
        </div>
        <p className="text-[11px] text-forest-800">
          <strong>1. Automated Error Vault:</strong> Every question missed is silently routed into your private vault. • 
          <strong> 2. Spaced Revision:</strong> Resurfaces at 3-day, 7-day, and 14-day intervals right before concepts are forgotten. • 
          <strong> 3. Redemption Clearance:</strong> Only removed and marked "Mastered" once you solve it correctly twice in a row without AI hints.
        </p>
      </div>

      <div className="space-y-3">
        {SAMPLE_REVISION_QUEUE.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-paper-50 border border-academic-border hover:border-forest-700/60 transition space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2 text-[11px]">
                <span className="font-mono font-bold text-forest-900 bg-white px-2 py-0.5 rounded border border-academic-border">
                  {item.id}
                </span>
                <span className="text-forest-700 font-semibold">{item.subjectName}</span>
                <span className="text-academic-subtle">•</span>
                <span className="text-academic-subtle">{item.topic}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.reason === 'missed'
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-forest-100 text-forest-900'
                  }`}
                >
                  {item.reason === 'missed' ? 'Missed in Round' : 'Flagged for Review'}
                </span>
              </div>

              <div className="text-xs sm:text-sm font-medium text-forest-950">
                <MathRenderer content={item.question} />
              </div>
            </div>

            <Link
              href={`/study/${item.subjectSlug}?q=${item.id}`}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-forest-900 text-limeaccent font-bold text-xs hover:bg-forest-800 transition flex-shrink-0"
            >
              <span>Solve Again</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
