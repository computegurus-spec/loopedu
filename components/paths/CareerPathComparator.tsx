'use client';

import React, { useState, useEffect } from 'react';
import { EvaluatedPath, evaluateCareerPaths, StudentProfileInput } from '@/lib/paths/evaluator';
import { useDemo } from '@/lib/demo/DemoContext';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Calculator,
  Calendar,
  Layers,
  Award,
  BookOpen,
  DollarSign,
  ShieldCheck,
  Send,
  Check,
  RotateCcw,
} from 'lucide-react';

export const CareerPathComparator: React.FC = () => {
  const { activePersona } = useDemo();

  // Profile Form State
  const [stage, setStage] = useState<'Class 10' | 'Class 11-12' | 'Graduate'>(
    activePersona.role === 'adult' ? 'Graduate' : 'Class 10'
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    activePersona.role === 'adult' ? ['Banking', 'Public Sector'] : ['Biology', 'Design & Prototyping']
  );
  const [mathsType, setMathsType] = useState<'Standard' | 'Basic' | 'Not Applicable'>('Standard');
  const [budgetPref, setBudgetPref] = useState<'Affordable / Govt Aided' | 'Standard' | 'Flexible'>('Affordable / Govt Aided');
  const [locationPref, setLocationPref] = useState<'Bengaluru / Home State' | 'South India' | 'Anywhere in India'>('Bengaluru / Home State');

  // Evaluation & Customization State
  const [evaluation, setEvaluation] = useState<any>(null);
  const [activePathId, setActivePathId] = useState<string>('path-biotech-design');
  const [savedPrimaryId, setSavedPrimaryId] = useState<string>('path-biotech-design');
  const [savedBackupId, setSavedBackupId] = useState<string>('path-pure-pcb');

  // Editable Fee Assumptions State
  const [feeCustomizations, setFeeCustomizations] = useState<Record<string, { livingYearly: number; examPrep: number }>>({
    'path-biotech-design': { livingYearly: 85000, examPrep: 18000 },
    'path-pure-pcb': { livingYearly: 60000, examPrep: 8000 },
    'path-computer-science': { livingYearly: 75000, examPrep: 35000 },
    'path-commerce-fintech': { livingYearly: 65000, examPrep: 25000 },
    'path-public-sector-banking': { livingYearly: 0, examPrep: 12000 },
  });

  // Counselor Review Request Modal State
  const [counselorModalOpen, setCounselorModalOpen] = useState(false);
  const [shareScope, setShareScope] = useState<'profile_only' | 'full_academic_notes'>('profile_only');
  const [reviewNote, setReviewNote] = useState('');
  const [requestStatus, setRequestStatus] = useState<'idle' | 'submitted'>('idle');

  useEffect(() => {
    runEvaluation();
  }, [stage, selectedInterests, mathsType, budgetPref, locationPref, activePersona]);

  const runEvaluation = () => {
    const profile: StudentProfileInput = {
      stage,
      interests: selectedInterests,
      strongSubjects: ['Science', 'Mathematics'],
      mathsType,
      budgetPreference: budgetPref,
      preferredLocation: locationPref,
    };
    const res = evaluateCareerPaths(profile);
    setEvaluation(res);
    if (res.evaluatedPaths.length > 0) {
      setActivePathId(res.evaluatedPaths[0].path.id);
    }
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSavePrimary = (id: string) => {
    setSavedPrimaryId(id);
    localStorage.setItem('loopedu_primary_path', id);
  };

  const handleSaveBackup = (id: string) => {
    setSavedBackupId(id);
    localStorage.setItem('loopedu_backup_path', id);
  };

  const submitCounselorRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestStatus('submitted');
    const existing = JSON.parse(localStorage.getItem('loopedu_counselor_requests') || '[]');
    existing.push({
      id: `req-${Date.now()}`,
      studentName: activePersona.name,
      studentEmail: activePersona.email,
      targetPathId: activePathId,
      shareScope,
      note: reviewNote,
      submittedAt: new Date().toISOString(),
      status: 'Queued for Review (Staffing turnaround ~48h)',
    });
    localStorage.setItem('loopedu_counselor_requests', JSON.stringify(existing));
    setTimeout(() => {
      setCounselorModalOpen(false);
      setRequestStatus('idle');
      setReviewNote('');
    }, 2000);
  };

  const currentPathObj: EvaluatedPath | undefined = evaluation?.evaluatedPaths?.find(
    (p: EvaluatedPath) => p.path.id === activePathId
  ) || evaluation?.evaluatedPaths?.[0];

  return (
    <div className="space-y-8">
      {/* Interactive Profile Controls (Editable Assumptions) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                EXPLAINABLE CAREER ENGINE
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-500">DETERMINISTIC RULES</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Calibrate Career Inputs &amp; Prerequisites
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Zero black-box AI scores. Every path is grounded in statutory CBSE, UGC, and AICTE rules.
            </p>
          </div>

          <button
            onClick={runEvaluation}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Recalculate Rules</span>
          </button>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Stage & Maths Type */}
          <div className="space-y-3">
            <label className="font-bold text-slate-800 block">Current Academic Stage</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Class 10', 'Class 11-12', 'Graduate'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStage(s)}
                  className={`py-2 px-2.5 rounded-xl font-bold transition border text-center ${
                    stage === s
                      ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {stage === 'Class 10' && (
              <div className="pt-2">
                <label className="font-bold text-slate-800 block mb-1.5">Class 10 Mathematics Track</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Standard', 'Basic'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMathsType(m)}
                      className={`py-1.5 px-2 rounded-lg font-bold border transition text-center ${
                        mathsType === m
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {m} (Code {m === 'Standard' ? '041' : '241'})
                    </button>
                  ))}
                </div>
                {mathsType === 'Basic' && (
                  <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg mt-2 border border-amber-200">
                    Note: Maths Basic limits Class 11 PCM admission under official CBSE guidelines.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Core Areas of Curiosity */}
          <div className="space-y-3">
            <label className="font-bold text-slate-800 block">Areas of Curiosity &amp; Interest</label>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Biology',
                'Design & Prototyping',
                'Computer Science',
                'Finance & Markets',
                'Banking',
                'Healthcare',
                'Public Sector',
              ].map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                      isSelected
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget & Geography Constraints */}
          <div className="space-y-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1.5">Affordability Target</label>
              <select
                value={budgetPref}
                onChange={(e) => setBudgetPref(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
              >
                <option value="Affordable / Govt Aided">Affordable / Govt &amp; Aided Slabs</option>
                <option value="Standard">Standard Autonomous Fees</option>
                <option value="Flexible">Flexible / Open</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1.5">Geography Preference</label>
              <select
                value={locationPref}
                onChange={(e) => setLocationPref(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
              >
                <option value="Bengaluru / Home State">Bengaluru / Home State (Daily Commute)</option>
                <option value="South India">South India Regional Centers</option>
                <option value="Anywhere in India">All-India Institutes (Hostel Required)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pathway Selector Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-950 flex items-center gap-2">
            <Compass className="w-5 h-5 text-teal-600" />
            <span>3 Grounded Candidate Pathways</span>
          </h3>
          <span className="text-xs text-slate-500 font-semibold">
            Rule Version: {evaluation?.ruleEngineVersion || 'v1.4.2'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {evaluation?.evaluatedPaths?.map((item: EvaluatedPath, idx: number) => {
            const isSelected = item.path.id === activePathId;
            const isSavedP = savedPrimaryId === item.path.id;
            const isSavedB = savedBackupId === item.path.id;

            return (
              <div
                key={item.path.id}
                onClick={() => setActivePathId(item.path.id)}
                className={`cursor-pointer p-5 rounded-2xl border transition-all text-left flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'bg-teal-50/60 border-teal-500 shadow-sm ring-1 ring-teal-500'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded-md">
                      OPTION {idx + 1}: {item.path.category}
                    </span>
                    <div className="flex items-center gap-1">
                      {isSavedP && (
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-600 text-white">
                          PRIMARY
                        </span>
                      )}
                      {isSavedB && (
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-blue-600 text-white">
                          BACKUP
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="text-base font-extrabold text-slate-950 leading-snug">
                    {item.path.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{item.path.overview}</p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500">{item.path.durationYears} Years Duration</span>
                  <span className={item.prerequisitesMet ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                    {item.prerequisitesMet ? '✓ Prerequisites Met' : '⚠️ Prerequisite Gap'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Pathway Deep-Dive Card */}
      {currentPathObj && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
          {/* Header & Primary Actions */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-900 border border-teal-200">
                <span>{currentPathObj.path.category}</span>
                <span>•</span>
                <span>Requires {currentPathObj.path.streamRequired}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                {currentPathObj.path.title}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {currentPathObj.path.overview}
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-slate-950">Deterministic Rationale: </span>
                {currentPathObj.fitRationale}
              </div>
            </div>

            {/* Action Buttons: Save as Primary or Backup */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => handleSavePrimary(currentPathObj.path.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  savedPrimaryId === currentPathObj.path.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-teal-600 hover:bg-teal-700 text-white shadow-2xs'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>{savedPrimaryId === currentPathObj.path.id ? 'Saved as Primary' : 'Set as Primary Path'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleSaveBackup(currentPathObj.path.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                  savedBackupId === currentPathObj.path.id
                    ? 'bg-blue-50 text-blue-800 border-blue-300 font-extrabold'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <span>{savedBackupId === currentPathObj.path.id ? 'Saved as Backup' : 'Set as Backup Route'}</span>
              </button>

              <button
                type="button"
                onClick={() => setCounselorModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition text-center"
              >
                Request Counsellor Review →
              </button>
            </div>
          </div>

          {/* Section: Prerequisite Audit & Rules Evidence */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Prerequisite &amp; Statutory Eligibility Audit
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPathObj.prerequisiteDetails.map((rule) => (
                <div
                  key={rule.ruleId}
                  className={`p-4 rounded-2xl border ${
                    rule.status === 'PASSED'
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                      : rule.status === 'FAILED'
                      ? 'bg-rose-50 border-rose-200 text-slate-800'
                      : 'bg-amber-50 border-amber-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-slate-950">{rule.ruleTitle}</span>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                        rule.status === 'PASSED'
                          ? 'bg-emerald-600 text-white'
                          : rule.status === 'FAILED'
                          ? 'bg-rose-600 text-white'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      {rule.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{rule.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Modular Affordability & Cost Breakdown (Editable) */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-teal-600" />
                <span>Transparent Cost Simulator ({currentPathObj.path.durationYears} Years Total)</span>
              </h4>
              <span className="text-xs font-semibold text-slate-500">
                100% Unbundled components • No hidden admission donations
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Tuition / Year</span>
                <span className="text-sm font-bold text-slate-900">
                  ₹{currentPathObj.path.fees.tuitionYearly.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Mandatory Fees / Yr</span>
                <span className="text-sm font-bold text-slate-900">
                  ₹{currentPathObj.path.fees.mandatoryFeesYearly.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Hostel / Living (Yr)</span>
                <input
                  type="number"
                  value={feeCustomizations[currentPathObj.path.id]?.livingYearly ?? currentPathObj.path.fees.livingHostelYearly}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setFeeCustomizations({
                      ...feeCustomizations,
                      [currentPathObj.path.id]: {
                        ...feeCustomizations[currentPathObj.path.id],
                        livingYearly: val,
                        examPrep: feeCustomizations[currentPathObj.path.id]?.examPrep ?? currentPathObj.path.fees.examPrepEstimated,
                      },
                    });
                  }}
                  className="w-full font-bold text-slate-900 text-xs border border-slate-200 rounded px-1.5 py-0.5 mt-0.5"
                />
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Equipment (1-Time)</span>
                <span className="text-sm font-bold text-slate-900">
                  ₹{currentPathObj.path.fees.equipmentOneTime.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Prep &amp; Books</span>
                <input
                  type="number"
                  value={feeCustomizations[currentPathObj.path.id]?.examPrep ?? currentPathObj.path.fees.examPrepEstimated}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setFeeCustomizations({
                      ...feeCustomizations,
                      [currentPathObj.path.id]: {
                        ...feeCustomizations[currentPathObj.path.id],
                        livingYearly: feeCustomizations[currentPathObj.path.id]?.livingYearly ?? currentPathObj.path.fees.livingHostelYearly,
                        examPrep: val,
                      },
                    });
                  }}
                  className="w-full font-bold text-slate-900 text-xs border border-slate-200 rounded px-1.5 py-0.5 mt-0.5"
                />
              </div>

              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 font-extrabold">
                <span className="text-[10px] uppercase font-bold text-teal-700 block">Estimated Total</span>
                <span className="text-sm font-black">
                  ₹{(
                    currentPathObj.path.fees.tuitionYearly * currentPathObj.path.durationYears +
                    currentPathObj.path.fees.mandatoryFeesYearly * currentPathObj.path.durationYears +
                    (feeCustomizations[currentPathObj.path.id]?.livingYearly ?? currentPathObj.path.fees.livingHostelYearly) * currentPathObj.path.durationYears +
                    currentPathObj.path.fees.equipmentOneTime +
                    (feeCustomizations[currentPathObj.path.id]?.examPrep ?? currentPathObj.path.fees.examPrepEstimated)
                  ).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Scholarships & Aid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="font-bold text-emerald-700 block mb-1">
                  ✓ Confirmed Statutory Aid (Merit-cum-Means)
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                  {currentPathObj.path.scholarshipInfo.confirmedSchemes.map((s: string) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="font-bold text-blue-700 block mb-1">
                  ℹ️ Application-Only External Fellowships
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                  {currentPathObj.path.scholarshipInfo.applicationOnlySchemes.map((s: string) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section: Practical Exploration Starter Project */}
          <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Practical Career Exploration Project ({currentPathObj.path.practicalProject.estimatedHours} Hours)
              </h4>
            </div>
            <h5 className="text-sm font-bold text-slate-900">
              {currentPathObj.path.practicalProject.title}
            </h5>
            <p className="text-xs text-slate-700">
              {currentPathObj.path.practicalProject.description}
            </p>
            <div className="text-[11px] font-semibold text-amber-800 pt-1">
              Tangible Output: {currentPathObj.path.practicalProject.deliverable}
            </div>
          </div>

          {/* Section: Dated Action Items */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Immediate Useful Actions &amp; Timeline
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {currentPathObj.datedMilestones.map((m: any, i: number) => (
                <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-teal-700 font-bold text-[11px]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Target: {m.targetDate}</span>
                  </div>
                  <div className="font-bold text-slate-900">{m.title}</div>
                  <p className="text-slate-600 text-[11px]">{m.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Counselor Human Review Request Modal */}
      {counselorModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  HUMAN REVIEW QUEUE
                </span>
                <button
                  type="button"
                  onClick={() => setCounselorModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                >
                  ✕
                </button>
              </div>
              <h3 className="text-xl font-bold text-slate-950">
                Request Independent Academic Advisory Review
              </h3>
              <p className="text-xs text-slate-600">
                Have a certified education advisor inspect your candidate paths, prerequisites, and board marks.
              </p>
            </div>

            {requestStatus === 'submitted' ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Review request logged successfully in the counsellor review queue. Turnaround is typically 48-72h.
                </span>
              </div>
            ) : (
              <form onSubmit={submitCounselorRequest} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Select Explicit Sharing Scope</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                      <input
                        type="radio"
                        name="scope"
                        checked={shareScope === 'profile_only'}
                        onChange={() => setShareScope('profile_only')}
                        className="text-teal-600"
                      />
                      <div>
                        <div className="font-bold text-slate-900">Profile &amp; Career Choices Only</div>
                        <div className="text-[11px] text-slate-500">Excludes marks, practice scores, and mistake notebooks.</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                      <input
                        type="radio"
                        name="scope"
                        checked={shareScope === 'full_academic_notes'}
                        onChange={() => setShareScope('full_academic_notes')}
                        className="text-teal-600"
                      />
                      <div>
                        <div className="font-bold text-slate-900">Full Academic Diagnostic Context</div>
                        <div className="text-[11px] text-slate-500">Includes board mark estimates and subject difficulty patterns.</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Specific Question or Dilemma for Advisor</label>
                  <textarea
                    rows={3}
                    value={reviewNote}
                    onChange={(e) => setReviewNote(e.target.value)}
                    placeholder="e.g. In Class 10 I enjoy biology but also sketch every day. Can I realistically pursue medical device design without NEET?"
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500"
                    required
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                  <span className="font-bold text-slate-800">Operational Transparency Notice: </span>
                  Advisors review cases asynchronously based on staffing availability. We never simulate a fake live instant chat or fabricate advisor feedback.
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setCounselorModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold inline-flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit to Review Queue</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
