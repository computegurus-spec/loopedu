'use client';

import React, { useState, useEffect } from 'react';
import { EXAM_CATALOG, ExamFamilyEntry, ExamCategory, CANONICAL_STATES_UTS } from '@/lib/data/examCatalog';
import { evaluateApplicantEligibility, ExamEligibilityReport, ApplicantProfileData } from '@/lib/exams/eligibilityEngine';
import { getExamAmendments, acknowledgeAmendment, publishSyntheticAmendment, ExamAmendmentRecord } from '@/lib/exams/amendments';
import { useDemo } from '@/lib/demo/DemoContext';
import {
  Award,
  Search,
  Filter,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  ShieldCheck,
  Star,
  Sparkles,
  Layers,
  ArrowRight,
  Bell,
  RefreshCw,
  Info,
} from 'lucide-react';

export const ExamDiscoveryAndEligibility: React.FC = () => {
  const { activePersona } = useDemo();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [selectedState, setSelectedState] = useState<string>('All India');

  // Watchlist State
  const [watchlist, setWatchlist] = useState<string[]>([]);

  // Amendments Log State
  const [amendments, setAmendments] = useState<ExamAmendmentRecord[]>([]);

  // Eligibility Modal State
  const [modalExam, setModalExam] = useState<ExamFamilyEntry | null>(null);
  const [eligibilityReport, setEligibilityReport] = useState<ExamEligibilityReport | null>(null);

  // Applicant Input Form for Eligibility Test
  const [applicantAge, setApplicantAge] = useState<number>(activePersona.role === 'adult' ? 24 : 16);
  const [applicantQual, setApplicantQual] = useState<'Class 10' | 'Class 12' | 'Graduate'>('Class 12');
  const [applicantCategory, setApplicantCategory] = useState<'General / UR' | 'OBC-NCL' | 'SC' | 'ST' | 'EWS' | 'PwD'>('General / UR');
  const [applicantDomicile, setApplicantDomicile] = useState<string>('Karnataka');
  const [applicantSubjects, setApplicantSubjects] = useState<string[]>(['Physics', 'Chemistry', 'Mathematics', 'Biology']);

  useEffect(() => {
    // Load persisted watchlist
    const saved = localStorage.getItem('loopedu_exam_watchlist');
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch (e) {}
    } else {
      setWatchlist(['exam-jee-main', 'exam-kcet-ug']);
    }

    // Load amendments
    setAmendments(getExamAmendments());

    const handleAmendmentEvent = () => {
      setAmendments(getExamAmendments());
    };
    window.addEventListener('loopedu_amendment_published', handleAmendmentEvent);
    return () => window.removeEventListener('loopedu_amendment_published', handleAmendmentEvent);
  }, []);

  const toggleWatchlist = (id: string) => {
    let updated: string[];
    if (watchlist.includes(id)) {
      updated = watchlist.filter((x) => x !== id);
    } else {
      updated = [...watchlist, id];
    }
    setWatchlist(updated);
    localStorage.setItem('loopedu_exam_watchlist', JSON.stringify(updated));
  };

  const openEligibilityCheck = (exam: ExamFamilyEntry) => {
    setModalExam(exam);
    runEligibilityEvaluation(exam);
  };

  const runEligibilityEvaluation = (exam: ExamFamilyEntry) => {
    const profile: ApplicantProfileData = {
      ageYears: applicantAge,
      qualification: applicantQual,
      category: applicantCategory,
      stateDomicile: applicantDomicile,
      completedSubjects: applicantSubjects,
    };
    const report = evaluateApplicantEligibility(exam.code, profile);
    setEligibilityReport(report);
  };

  const handleSimulateAmendment = () => {
    publishSyntheticAmendment({
      examCode: 'JEE-MAIN',
      fieldChanged: 'applicationClose',
      previousValue: '2026-12-04',
      newValue: '2026-12-10 (Extended 23:50 IST)',
      amendmentReason: 'Corrigendum issued by NTA for cyclone-impacted coastal exam centers',
      gazetteNoticeRef: 'NTA/JEE-Main/Gazette-Ext-03/2026',
      authorizedEditor: 'Vikram Rao (Editorial Desk)',
      reviewedBy: 'Dr. Anita Desai (Reviewing Authority)',
    });
  };

  const handleAcknowledge = (id: string) => {
    acknowledgeAmendment(id, activePersona.id);
    setAmendments(getExamAmendments());
  };

  // Filtered List
  const filteredExams = EXAM_CATALOG.filter((exam) => {
    const matchesQuery =
      exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.conductingAuthority.fullName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || exam.category === selectedCategory;
    const matchesStage = selectedStage === 'ALL' || exam.qualificationRequired.includes(selectedStage);
    const matchesState = selectedState === 'All India' || exam.geographyScope.includes(selectedState);

    return matchesQuery && matchesCategory && matchesStage && matchesState;
  });

  const unacknowledgedAmendments = amendments.filter(
    (a) => !a.acknowledgedByUserIds.includes(activePersona.id)
  );

  return (
    <div className="space-y-8">
      {/* Real-Time Amendment Notification Banner (Watchlist Propagation) */}
      {unacknowledgedAmendments.length > 0 && (
        <aside aria-label="Official Exam Amendments Notice" className="p-4 sm:p-5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-slate-900 space-y-3 shadow-xs">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-amber-500 text-slate-950 font-black text-[10px] uppercase">
                AMENDMENT ALERT
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-950">
                Official Gazette Corrigendum Detected on Monitored Exam
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-amber-900">
              {unacknowledgedAmendments.length} Pending Notice
            </span>
          </div>

          {unacknowledgedAmendments.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-white border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#0066FF]">{item.examCode}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-bold text-slate-900">{item.fieldChanged} modified</span>
                </div>
                <div className="text-slate-700">
                  <span className="line-through text-slate-400 mr-1.5">{item.previousValue}</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {item.newValue}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">{item.amendmentReason}</p>
                <div className="text-[10px] text-slate-400 font-mono">
                  Ref: {item.gazetteNoticeRef} • Reviewer: {item.reviewedBy}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleAcknowledge(item.id)}
                className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-[11px] self-start sm:self-auto shrink-0 transition"
              >
                Acknowledge Update
              </button>
            </div>
          ))}
        </aside>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by exam name (e.g. JEE, NEET, IBPS, KCET), authority or keywords..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <button
            type="button"
            onClick={handleSimulateAmendment}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-950 font-bold text-xs transition border border-slate-200 shrink-0"
            title="Demonstrate synthetic amendment event triggering watchlist notifications"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Simulate Official Amendment</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
            {['ALL', 'Engineering', 'Medical & Life Sciences', 'Civil Services & State PSC', 'Banking & Insurance', 'Railways (RRB)', 'Staff Selection (SSC)', 'Law & Design'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition border ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800"
            >
              <option value="ALL">All Stages</option>
              <option value="Class 10">10th Standard</option>
              <option value="Class 12">12th Standard</option>
              <option value="Graduate">Graduation</option>
            </select>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800"
            >
              {CANONICAL_STATES_UTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => {
          const isWatching = watchlist.includes(exam.id);

          return (
            <div
              key={exam.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-5 group hover:border-teal-300"
            >
              <div className="space-y-3">
                {/* Authority & Status */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                      {exam.conductingAuthority.code}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 truncate max-w-[150px]">
                      {exam.geographyScope}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleWatchlist(exam.id)}
                    className={`p-1.5 rounded-lg transition ${
                      isWatching
                        ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                        : 'text-slate-400 hover:text-amber-500 hover:bg-slate-50'
                    }`}
                    title={isWatching ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <h3 className="text-base font-extrabold text-slate-950 leading-snug group-hover:text-teal-700 transition-colors">
                  {exam.name}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {exam.overview}
                </p>

                {/* Date Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Apply Close</span>
                    <span className="text-slate-900 font-bold text-xs">{exam.dates.applicationClose}</span>
                    {exam.dates.closingTimeExplicit && (
                      <span className="text-[9px] text-slate-500 block">{exam.dates.closingTimeExplicit}</span>
                    )}
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Exam Date</span>
                    <span className="text-teal-700 font-bold text-xs">{exam.dates.examDate}</span>
                  </div>
                </div>

                {/* Preparation Overlap Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {exam.preparationOverlap.slice(0, 3).map((sub) => (
                    <span
                      key={sub}
                      className="text-[9px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={exam.conductingAuthority.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 transition"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  type="button"
                  onClick={() => openEligibilityCheck(exam)}
                  className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-2xs"
                >
                  <span>Check Eligibility</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Eligibility AST Checker Modal */}
      {modalExam && eligibilityReport && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                    DECLARATIVE RULE EVALUATOR
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-semibold text-slate-500">{eligibilityReport.ruleVersion}</span>
                </div>
                <h3 className="text-xl font-black text-slate-950">{modalExam.name}</h3>
              </div>

              <button
                type="button"
                onClick={() => setModalExam(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Overall Status Banner */}
            <div
              className={`p-4 rounded-2xl border flex items-start gap-3 ${
                eligibilityReport.overallStatus === 'ELIGIBLE'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : eligibilityReport.overallStatus === 'CONDITIONAL_RELAXATION'
                  ? 'bg-blue-50 border-blue-200 text-blue-950'
                  : eligibilityReport.overallStatus === 'INELIGIBLE'
                  ? 'bg-rose-50 border-rose-200 text-rose-950'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}
            >
              {eligibilityReport.overallStatus === 'ELIGIBLE' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : eligibilityReport.overallStatus === 'INELIGIBLE' ? (
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              ) : (
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5 text-xs">
                <div className="font-extrabold text-sm uppercase tracking-wide">
                  {eligibilityReport.overallStatus.replace('_', ' ')}
                </div>
                <p className="leading-relaxed font-medium">{eligibilityReport.summaryExplanation}</p>
              </div>
            </div>

            {/* Quick Profile Parameters Adjuster */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
                Test With Different Applicant Parameters
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Age (Years)</label>
                  <input
                    type="number"
                    value={applicantAge}
                    onChange={(e) => {
                      setApplicantAge(parseInt(e.target.value) || 0);
                      setTimeout(() => runEligibilityEvaluation(modalExam), 50);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Qualification</label>
                  <select
                    value={applicantQual}
                    onChange={(e) => {
                      setApplicantQual(e.target.value as any);
                      setTimeout(() => runEligibilityEvaluation(modalExam), 50);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-lg px-1.5 py-1 font-bold text-xs"
                  >
                    <option value="Class 10">Class 10</option>
                    <option value="Class 12">Class 12</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Social Category</label>
                  <select
                    value={applicantCategory}
                    onChange={(e) => {
                      setApplicantCategory(e.target.value as any);
                      setTimeout(() => runEligibilityEvaluation(modalExam), 50);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-lg px-1.5 py-1 font-bold text-xs"
                  >
                    <option value="General / UR">General / UR</option>
                    <option value="OBC-NCL">OBC-NCL (Relaxed)</option>
                    <option value="SC">SC (Relaxed)</option>
                    <option value="ST">ST (Relaxed)</option>
                    <option value="PwD">PwD (Relaxed)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">State Domicile</label>
                  <select
                    value={applicantDomicile}
                    onChange={(e) => {
                      setApplicantDomicile(e.target.value);
                      setTimeout(() => runEligibilityEvaluation(modalExam), 50);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-lg px-1.5 py-1 font-bold text-xs"
                  >
                    <option value="Karnataka">Karnataka</option>
                    <option value="Other State">Other State</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Individual Rule Conditions Audit */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Statutory Condition By Condition Evaluation
              </h4>
              <div className="space-y-2">
                {eligibilityReport.conditionResults.map((cond) => (
                  <div
                    key={cond.ruleId}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-900">{cond.description}</div>
                      <div className="text-[11px] text-slate-500">{cond.details}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Citation: {cond.evidenceCitation}
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded self-start sm:self-auto shrink-0 ${
                        cond.status === 'PASSED'
                          ? 'bg-emerald-600 text-white'
                          : cond.status === 'RELAXATION_APPLIED'
                          ? 'bg-blue-600 text-white'
                          : cond.status === 'FAILED'
                          ? 'bg-rose-600 text-white'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      {cond.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Disclaimer */}
            <div className="p-3 rounded-xl bg-slate-100 text-[10px] text-slate-500 leading-relaxed">
              {eligibilityReport.legalDisclaimer}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setModalExam(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
