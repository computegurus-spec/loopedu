'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  evaluateApplicantEligibility,
  ApplicantProfileData,
  ExamEligibilityReport,
} from '@/lib/exams/eligibilityEngine';

export function LiveEligibilityWidget() {
  const [examCode, setExamCode] = useState('JEE-MAIN');
  const [dob, setDob] = useState('2007-05-15');
  const [category, setCategory] = useState<'General / UR' | 'OBC-NCL' | 'SC' | 'ST' | 'EWS'>('General / UR');
  const [qualification, setQualification] = useState<'Class 10' | 'Class 12' | 'Graduate'>('Class 12');
  const [mathsType, setMathsType] = useState<'Standard' | 'Basic'>('Standard');
  const [hasScienceStream, setHasScienceStream] = useState(true);

  const [result, setResult] = useState<ExamEligibilityReport | null>(null);

  function handleEvaluate() {
    // Calculate approximate age from DOB
    const birthYear = new Date(dob).getFullYear();
    const currentYear = new Date().getFullYear();
    const ageYears = currentYear - birthYear;

    const subjects = hasScienceStream
      ? ['Physics', 'Chemistry', mathsType === 'Standard' ? 'Mathematics' : 'Applied Mathematics']
      : ['History', 'Economics', 'Political Science'];

    const profile: ApplicantProfileData = {
      birthDate: dob,
      ageYears,
      qualification,
      completedSubjects: subjects,
      aggregateMarksPercent: 82,
      category,
      stateDomicile: 'Karnataka',
      previousAttemptsCount: 0,
    };

    const res = evaluateApplicantEligibility(examCode, profile);
    setResult(res);
  }

  return (
    <section className="py-16 lg:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Declarative AST Verification
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Instant Statutory Eligibility Evaluator
          </h2>
          <p className="text-sm text-slate-400">
            Never waste money on coaching for an exam you are legally ineligible to sit for. Our deterministic AST rule engine checks age cutoffs, subject prerequisites, and statutory reservation relaxations.
          </p>
        </div>

        {/* Interactive Evaluation Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-10 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Exam Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                1. Target National Exam
              </label>
              <select
                value={examCode}
                onChange={e => {
                  setExamCode(e.target.value);
                  setResult(null);
                }}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="JEE-MAIN">IIT JEE Main (Engineering)</option>
                <option value="NEET-UG">NEET UG (Medical / MBBS)</option>
                <option value="UPSC-CSE">UPSC CSE (Civil Services / IAS)</option>
                <option value="SSC-CGL">SSC CGL (Combined Graduate)</option>
                <option value="IBPS-PO">IBPS PO (Bank Probationary Officer)</option>
                <option value="RRB-NTPC">RRB NTPC (Railways Recruitment)</option>
                <option value="NDA-NA">NDA & NA (Armed Forces)</option>
                <option value="CLAT-UG">CLAT UG (National Law Universities)</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                2. Date of Birth (Statutory Cutoff Check)
              </label>
              <input
                type="date"
                value={dob}
                onChange={e => {
                  setDob(e.target.value);
                  setResult(null);
                }}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Statutory Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                3. Statutory Category (Reservation & Age Relaxation)
              </label>
              <select
                value={category}
                onChange={e => {
                  setCategory(e.target.value as any);
                  setResult(null);
                }}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="General / UR">General / Unreserved (UR)</option>
                <option value="OBC-NCL">OBC-NCL (Non-Creamy Layer, 3-Yr Relaxation)</option>
                <option value="SC">Scheduled Caste (SC, 5-Yr Relaxation)</option>
                <option value="ST">Scheduled Tribe (ST, 5-Yr Relaxation)</option>
                <option value="EWS">Economically Weaker Section (EWS)</option>
              </select>
            </div>

            {/* Current Stage / Qualification */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                4. Academic Qualification Stage
              </label>
              <select
                value={qualification}
                onChange={e => {
                  setQualification(e.target.value as any);
                  setResult(null);
                }}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="Class 10">Class 10 (Secondary School)</option>
                <option value="Class 12">Class 12 / Senior Secondary</option>
                <option value="Graduate">Recognized Bachelor's Degree</option>
              </select>
            </div>

          </div>

          {/* Subject Stream Prerequisite */}
          <div className="pt-2 border-t border-slate-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              5. High School Subject Stream
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setHasScienceStream(true);
                  setMathsType('Standard');
                  setResult(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                  hasScienceStream && mathsType === 'Standard'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                Science (Physics + Maths Standard)
              </button>
              <button
                type="button"
                onClick={() => {
                  setHasScienceStream(true);
                  setMathsType('Basic');
                  setResult(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                  hasScienceStream && mathsType === 'Basic'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                Science (Biology + Maths Basic)
              </button>
              <button
                type="button"
                onClick={() => {
                  setHasScienceStream(false);
                  setResult(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                  !hasScienceStream
                    ? 'bg-teal-500/10 text-teal-400 border-teal-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                Commerce / Humanities Stream
              </button>
            </div>
          </div>

          {/* Evaluate Button */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              onClick={handleEvaluate}
              className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Execute AST Rule Verification</span>
            </button>
            <span className="text-[11px] text-slate-500 text-center sm:text-right">
              Deterministic AST Engine • Zero AI Hallucination
            </span>
          </div>

          {/* Evaluation Result View */}
          {result && (
            <div className="mt-6 pt-6 border-t border-slate-800 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  AST Evaluation Result ({result.examCode})
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    result.overallStatus === 'ELIGIBLE'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : result.overallStatus === 'CONDITIONAL_RELAXATION'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}
                >
                  {result.overallStatus === 'ELIGIBLE'
                    ? '✓ STATUTORILY ELIGIBLE'
                    : result.overallStatus === 'CONDITIONAL_RELAXATION'
                    ? '⚠️ ELIGIBLE WITH RELAXATION'
                    : '✕ INELIGIBLE (STATUTORY DISQUALIFICATION)'}
                </span>
              </div>

              {/* Rationale & Rules Breakdown */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <p className="text-slate-200 leading-relaxed font-medium">
                  {result.summaryExplanation}
                </p>

                {/* Condition Results List */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <span className="font-bold text-slate-400 block uppercase tracking-wider text-[10px]">
                    Evaluated Statutory Clauses:
                  </span>
                  <div className="space-y-1.5">
                    {result.conditionResults.map((c, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-lg border flex items-start gap-2.5 text-xs ${
                          c.status === 'PASSED'
                            ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300'
                            : c.status === 'RELAXATION_APPLIED'
                            ? 'bg-amber-950/20 border-amber-500/20 text-amber-300'
                            : 'bg-rose-950/20 border-rose-500/20 text-rose-300'
                        }`}
                      >
                        <span className="font-bold">
                          {c.status === 'PASSED' ? '✓' : c.status === 'RELAXATION_APPLIED' ? '⚠️' : '✕'}
                        </span>
                        <div>
                          <div className="font-semibold">{c.description}</div>
                          <div className="text-[11px] opacity-80 mt-0.5">{c.details}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5 italic">Ref: {c.evidenceCitation}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Recommendation */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-2">
                <span className="text-slate-400">
                  {result.overallStatus === 'ELIGIBLE'
                    ? 'Recommended: Start daily 15-minute diagnostic practice for this track.'
                    : 'Recommended: Explore parallel backup pathways with similar career ROI.'}
                </span>
                <Link
                  href={result.overallStatus === 'ELIGIBLE' ? '/prepare' : '/paths'}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2"
                >
                  {result.overallStatus === 'ELIGIBLE' ? 'Open Practice Workspace →' : 'View Alternative Pathways →'}
                </Link>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
