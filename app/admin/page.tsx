'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  BookOpen,
  FileText,
  Users,
  CreditCard,
  AlertTriangle,
  Download,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Edit,
  History,
  RotateCcw,
} from 'lucide-react';
import { MathRenderer } from '@/components/MathRenderer';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'subjects' | 'questions' | 'orders' | 'requests' | 'reports' | 'audit'>('subjects');

  // Question Editor state
  const [searchQuestionId, setSearchQuestionId] = useState('MB-001');
  const [questionDetail, setQuestionDetail] = useState<any>(null);
  const [editQuestionText, setEditQuestionText] = useState('');
  const [editAnswerText, setEditAnswerText] = useState('');
  const [editExplanationText, setEditExplanationText] = useState('');
  const [changeReason, setChangeReason] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  // Manual Grant State
  const [manualUserEmail, setManualUserEmail] = useState('');
  const [manualSubject, setManualSubject] = useState('maths-basic');
  const [manualReason, setManualReason] = useState('');
  const [manualStatus, setManualStatus] = useState('');

  useEffect(() => {
    loadOverview();
  }, []);

  const loadOverview = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/overview');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubjectStatus = async (slug: string, newStatus: string) => {
    await fetch('/api/admin/subjects', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, status: newStatus }),
    });
    loadOverview();
  };

  const loadQuestionForEdit = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/questions?id=${id.trim()}`);
      const json = await res.json();
      if (json.question) {
        setQuestionDetail(json);
        setEditQuestionText(json.question.question);
        setEditAnswerText(json.question.answer);
        setEditExplanationText(json.question.explanation);
        setChangeReason('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveQuestion = async () => {
    if (!changeReason.trim()) {
      alert('Please provide a change reason for the audit history log.');
      return;
    }

    setSaveStatus('Saving version...');
    try {
      const res = await fetch('/api/admin/questions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: questionDetail.question.id,
          updates: {
            question: editQuestionText,
            answer: editAnswerText,
            explanation: editExplanationText,
          },
          changeReason,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSaveStatus('Question updated and version recorded.');
        loadQuestionForEdit(questionDetail.question.id);
      }
    } catch (e: any) {
      setSaveStatus('Failed to update question: ' + e.message);
    }
  };

  const handleToggleSample = async (id: string, currentSample: boolean) => {
    await fetch('/api/admin/questions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        toggleSample: true,
        isSample: !currentSample,
      }),
    });
    loadQuestionForEdit(id);
  };

  const handleManualGrant = async (e: React.FormEvent) => {
    e.preventDefault();
    setManualStatus('Granting access...');
    try {
      const res = await fetch('/api/admin/entitlements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'grant',
          userId: `usr_manual_${Date.now()}`,
          userEmail: manualUserEmail,
          subjectSlug: manualSubject,
          reason: manualReason,
          durationDays: 365,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setManualStatus('Entitlement granted successfully.');
        setManualUserEmail('');
        setManualReason('');
        loadOverview();
      }
    } catch (e: any) {
      setManualStatus('Failed: ' + e.message);
    }
  };

  const handleExportCsv = () => {
    window.location.href = '/api/admin/requests?format=csv';
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-xs text-academic-subtle font-semibold">
        Loading administrative console...
      </div>
    );
  }

  const summary = data?.summary || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-academic-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-700">
              Staff Portal
            </span>
            <span className="text-xs text-forest-400">•</span>
            <span className="text-xs font-mono font-bold bg-forest-900 text-limeaccent px-2 py-0.5 rounded">
              Role: System Administrator
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950 mt-1">
            BoardEdge AI Platform Operations
          </h1>
          <p className="text-xs text-academic-subtle mt-0.5">
            Publication gates, version control, manual access audit, and curriculum demand analysis.
          </p>
        </div>

        <button
          onClick={loadOverview}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-academic-border text-xs font-semibold text-forest-900 hover:bg-forest-50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Top Operations KPI Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
        <div className="p-4 rounded-xl bg-white border border-academic-border space-y-1">
          <span className="text-[11px] text-academic-subtle font-bold uppercase">Published Banks</span>
          <div className="text-xl font-serif font-bold text-forest-950">
            {summary.publishedSubjects} / {summary.totalSubjects}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-academic-border space-y-1">
          <span className="text-[11px] text-academic-subtle font-bold uppercase">Active Entitlements</span>
          <div className="text-xl font-serif font-bold text-forest-950">
            {summary.activeEntitlements}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-academic-border space-y-1">
          <span className="text-[11px] text-academic-subtle font-bold uppercase">Paid Orders</span>
          <div className="text-xl font-serif font-bold text-forest-950">
            {summary.capturedOrders}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-academic-border space-y-1">
          <span className="text-[11px] text-academic-subtle font-bold uppercase">Gross Revenue</span>
          <div className="text-xl font-serif font-bold text-forest-950">
            ₹{Math.round(summary.totalRevenuePaise / 100)}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-academic-border space-y-1">
          <span className="text-[11px] text-academic-subtle font-bold uppercase">Subject Requests</span>
          <div className="text-xl font-serif font-bold text-forest-950">
            {summary.totalSubjectRequests}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-academic-border space-y-1">
          <span className="text-[11px] text-academic-subtle font-bold uppercase">Open Errata</span>
          <div className="text-xl font-serif font-bold text-amber-700">
            {summary.openErrorReports}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-academic-border gap-2 text-xs font-bold text-forest-800">
        {[
          { key: 'subjects', label: 'Subjects & Publication' },
          { key: 'questions', label: 'Question Editor & History' },
          { key: 'orders', label: 'Orders & Entitlements' },
          { key: 'requests', label: 'Subject Requests (CSV)' },
          { key: 'reports', label: 'Content Errata Reports' },
          { key: 'audit', label: 'Audit Trail' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`pb-3 px-3 transition ${
              activeTab === tab.key
                ? 'border-b-2 border-forest-900 text-forest-950 font-bold'
                : 'text-academic-subtle hover:text-forest-950'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Subjects & Publication Controls */}
      {activeTab === 'subjects' && (
        <div className="rounded-2xl bg-white border border-academic-border p-6 space-y-6">
          <div>
            <h2 className="text-lg font-serif font-bold text-forest-950">
              Publication Gates & Editorial Verification
            </h2>
            <p className="text-xs text-academic-subtle">
              Controls whether a subject is open for purchase or blocked with review pending.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-forest-900">
              <thead className="bg-paper-100 text-academic-subtle uppercase text-[10px] border-b border-academic-border">
                <tr>
                  <th className="p-3">Track / Name</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Editorial Review</th>
                  <th className="p-3">Rights Review</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-academic-border">
                {data.subjects?.map((s: any) => (
                  <tr key={s.slug} className="hover:bg-paper-50/50">
                    <td className="p-3 font-semibold">
                      <div>{s.name}</div>
                      <div className="text-[10px] text-academic-subtle font-mono">{s.curriculumRef}</div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          s.status === 'published'
                            ? 'bg-forest-100 text-forest-900'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono">{s.questionCount}</td>
                    <td className="p-3">{s.editorialReviewStatus}</td>
                    <td className="p-3">{s.rightsReviewStatus}</td>
                    <td className="p-3">
                      {s.slug === 'german' ? (
                        <span className="text-[10px] text-amber-800 font-bold bg-amber-50 px-2 py-1 rounded border border-amber-200">
                          Textbook verification pending
                        </span>
                      ) : (
                        <button
                          onClick={() =>
                            handleUpdateSubjectStatus(
                              s.slug,
                              s.status === 'published' ? 'review_pending' : 'published'
                            )
                          }
                          className="px-2.5 py-1 rounded bg-forest-900 text-limeaccent font-bold hover:bg-forest-800"
                        >
                          {s.status === 'published' ? 'Set In Review' : 'Publish'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Question Editor & Version History */}
      {activeTab === 'questions' && (
        <div className="rounded-2xl bg-white border border-academic-border p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-serif font-bold text-forest-950">
                Question Editor & Version History
              </h2>
              <p className="text-xs text-academic-subtle">
                Audit trail is recorded automatically for all edits. Previous versions are preserved.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchQuestionId}
                onChange={(e) => setSearchQuestionId(e.target.value)}
                placeholder="Question ID (e.g. MB-001)"
                className="px-3 py-1.5 text-xs rounded-lg border border-academic-border"
              />
              <button
                onClick={() => loadQuestionForEdit(searchQuestionId)}
                className="px-3 py-1.5 rounded-lg bg-forest-900 text-limeaccent font-bold text-xs"
              >
                Load Question
              </button>
            </div>
          </div>

          {questionDetail && (
            <div className="space-y-4 pt-4 border-t border-academic-border text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-forest-900">
                  Editing: {questionDetail.question.id} (v{questionDetail.question.version}) • {questionDetail.question.track}
                </span>

                <button
                  onClick={() =>
                    handleToggleSample(
                      questionDetail.question.id,
                      questionDetail.question.is_sample
                    )
                  }
                  className={`px-3 py-1 rounded-lg font-bold text-xs ${
                    questionDetail.question.is_sample
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-paper-200 text-forest-800'
                  }`}
                >
                  {questionDetail.question.is_sample ? '★ Public Free Sample (Active)' : 'Mark as Public Sample'}
                </button>
              </div>

              <div>
                <label className="block font-semibold mb-1">Question Text (KaTeX math supported):</label>
                <textarea
                  rows={3}
                  value={editQuestionText}
                  onChange={(e) => setEditQuestionText(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-academic-border font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Model Answer:</label>
                <textarea
                  rows={2}
                  value={editAnswerText}
                  onChange={(e) => setEditAnswerText(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-academic-border font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Method Explanation & Rationale:</label>
                <textarea
                  rows={3}
                  value={editExplanationText}
                  onChange={(e) => setEditExplanationText(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-academic-border font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-amber-900 mb-1">
                  Reason for Modification (Required for Audit Trail):
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Corrected sign in step 2 of quadratic factorisation"
                  value={changeReason}
                  onChange={(e) => setChangeReason(e.target.value)}
                  className="w-full p-2 rounded-lg border border-amber-300 bg-amber-50/50"
                />
              </div>

              {saveStatus && <p className="text-emerald-700 font-semibold">{saveStatus}</p>}

              <div className="pt-2">
                <button
                  onClick={handleSaveQuestion}
                  className="px-5 py-2.5 rounded-xl bg-forest-900 text-limeaccent font-bold text-xs uppercase"
                >
                  Save Question & Bump Version
                </button>
              </div>

              {/* Version History List */}
              {questionDetail.versions?.length > 0 && (
                <div className="mt-6 pt-4 border-t border-academic-border space-y-2">
                  <h4 className="font-bold text-forest-950">Recorded Revision History:</h4>
                  {questionDetail.versions.map((ver: any) => (
                    <div key={ver.id} className="p-3 bg-paper-50 rounded-lg border border-academic-border space-y-1">
                      <div className="flex justify-between font-mono text-[10px] text-academic-subtle">
                        <span>Version {ver.version_number} by {ver.changed_by}</span>
                        <span>{ver.created_at}</span>
                      </div>
                      <p className="font-semibold text-forest-900">Reason: {ver.change_reason}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Orders & Entitlements */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Manual Access Grant Form */}
          <div className="rounded-2xl bg-white border border-academic-border p-6 space-y-4">
            <h3 className="text-base font-serif font-bold text-forest-950">
              Grant Manual Customer Entitlement (Administrative Override)
            </h3>
            <form onSubmit={handleManualGrant} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <input
                type="email"
                required
                placeholder="Customer Email Address"
                value={manualUserEmail}
                onChange={(e) => setManualUserEmail(e.target.value)}
                className="p-2.5 rounded-lg border border-academic-border"
              />
              <select
                value={manualSubject}
                onChange={(e) => setManualSubject(e.target.value)}
                className="p-2.5 rounded-lg border border-academic-border"
              >
                {data.subjects?.map((s: any) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                required
                placeholder="Audit Reason (e.g. Tutor Evaluation)"
                value={manualReason}
                onChange={(e) => setManualReason(e.target.value)}
                className="p-2.5 rounded-lg border border-academic-border"
              />
              <button
                type="submit"
                className="p-2.5 rounded-lg bg-forest-900 text-limeaccent font-bold uppercase"
              >
                Grant Entitlement
              </button>
            </form>
            {manualStatus && <p className="text-xs text-forest-800 font-semibold">{manualStatus}</p>}
          </div>

          {/* Orders Table */}
          <div className="rounded-2xl bg-white border border-academic-border p-6 space-y-4">
            <h3 className="text-base font-serif font-bold text-forest-950">
              Recent Orders & Payment Captures
            </h3>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead className="bg-paper-100 text-academic-subtle uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Order ID</th>
                    <th className="p-2.5">User</th>
                    <th className="p-2.5">Subject</th>
                    <th className="p-2.5">Amount</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-academic-border">
                  {data.orders?.map((ord: any) => (
                    <tr key={ord.id}>
                      <td className="p-2.5 font-mono text-[10px]">{ord.razorpay_order_id}</td>
                      <td className="p-2.5">{ord.user_email}</td>
                      <td className="p-2.5">{ord.subject_slug}</td>
                      <td className="p-2.5 font-bold">₹{ord.amount_in_paise / 100}</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-forest-100 text-forest-900">
                          {ord.status}
                        </span>
                      </td>
                      <td className="p-2.5 text-academic-subtle">{ord.created_at?.slice(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Subject Requests & Safe CSV Export */}
      {activeTab === 'requests' && (
        <div className="rounded-2xl bg-white border border-academic-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-serif font-bold text-forest-950">
                Customer Subject Requests
              </h2>
              <p className="text-xs text-academic-subtle">
                Exported CSV contains formula injection neutralization (prefixed single quotes).
              </p>
            </div>

            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-900 text-limeaccent text-xs font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-paper-100 text-academic-subtle uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">Class</th>
                  <th className="p-2.5">Subject</th>
                  <th className="p-2.5">Notes</th>
                  <th className="p-2.5">Notify Email</th>
                  <th className="p-2.5">Consent</th>
                  <th className="p-2.5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-academic-border">
                {data.requests?.map((req: any) => (
                  <tr key={req.id}>
                    <td className="p-2.5 font-bold">{req.class_name}</td>
                    <td className="p-2.5">{req.subject_name}</td>
                    <td className="p-2.5 text-academic-subtle max-w-xs truncate">{req.notes || '—'}</td>
                    <td className="p-2.5 font-mono">{req.email || '—'}</td>
                    <td className="p-2.5">{req.consent_notify ? '✓ Yes' : 'No'}</td>
                    <td className="p-2.5 text-academic-subtle">{req.created_at?.slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Content Errata Reports */}
      {activeTab === 'reports' && (
        <div className="rounded-2xl bg-white border border-academic-border p-6 space-y-4">
          <h2 className="text-lg font-serif font-bold text-forest-950">
            Reader Content Error Reports
          </h2>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-paper-100 text-academic-subtle uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">Question ID</th>
                  <th className="p-2.5">Report Type</th>
                  <th className="p-2.5">Description</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-academic-border">
                {data.errorReports?.map((rep: any) => (
                  <tr key={rep.id}>
                    <td className="p-2.5 font-mono font-bold">{rep.question_id}</td>
                    <td className="p-2.5 uppercase font-semibold text-[10px]">{rep.report_type}</td>
                    <td className="p-2.5">{rep.description}</td>
                    <td className="p-2.5 font-bold text-amber-700">{rep.status}</td>
                    <td className="p-2.5 text-academic-subtle">{rep.created_at?.slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6: Audit Trail */}
      {activeTab === 'audit' && (
        <div className="rounded-2xl bg-white border border-academic-border p-6 space-y-4">
          <h2 className="text-lg font-serif font-bold text-forest-950">
            Administrative Audit Trail (Last 50 Events)
          </h2>
          <div className="space-y-2 text-xs">
            {data.auditLogs?.map((log: any) => (
              <div key={log.id} className="p-3 bg-paper-50 rounded-xl border border-academic-border flex justify-between items-center">
                <div>
                  <span className="font-mono text-forest-900 font-bold mr-2">[{log.action}]</span>
                  <span className="text-academic-subtle">{log.target_type} • {log.target_id}</span>
                  <div className="text-[10px] text-forest-700 font-mono mt-0.5">
                    {JSON.stringify(log.details)}
                  </div>
                </div>
                <div className="text-right text-[10px] text-academic-subtle font-mono">
                  <div>{log.admin_email}</div>
                  <div>{log.created_at?.slice(0, 19).replace('T', ' ')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
