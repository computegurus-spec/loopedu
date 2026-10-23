'use client';

import React, { useState } from 'react';
import { useDemo } from '@/lib/demo/DemoContext';
import {
  getUserConsents,
  recordConsent,
  inviteGuardian,
  revokeGuardianAccess,
  generateUserDataExport,
  requestAccountDeletion,
  ConsentRecord,
  GuardianLink,
} from '@/lib/privacy/consentManager';
import { Shield, Download, Trash2, UserPlus, Lock, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacySettingsPage() {
  const { currentPersona } = useDemo();
  const [guardianEmail, setGuardianEmail] = useState('');
  const [guardianLinks, setGuardianLinks] = useState<GuardianLink[]>([]);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [deletionStatus, setDeletionStatus] = useState<string | null>(null);

  const handleInviteGuardian = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guardianEmail || !guardianEmail.includes('@')) {
      setActionNotice('Please provide a valid guardian email address.');
      return;
    }

    const newLink = inviteGuardian(currentPersona.id, guardianEmail);
    setGuardianLinks((prev) => [...prev, newLink]);
    setGuardianEmail('');
    setActionNotice(`Guardian invitation sent to ${guardianEmail}. Permission scoped: Academic plans only; Mind Coach strictly isolated.`);
    setTimeout(() => setActionNotice(null), 5000);
  };

  const handleRevokeGuardian = (linkId: string) => {
    revokeGuardianAccess(currentPersona.id, linkId);
    setGuardianLinks((prev) =>
      prev.map((l) => (l.id === linkId ? { ...l, status: 'revoked' as const } : l))
    );
    setActionNotice('Guardian access successfully revoked.');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleDownloadExport = (format: 'json' | 'csv') => {
    const dummyTasks = [
      { id: 'task_1', title: 'Solve 10 Physics Mechanics MCQs', completed: true, date: '2026-10-24' },
      { id: 'task_2', title: 'Review NCERT Optics formulas', completed: false, date: '2026-10-25' },
    ];
    const dummyMistakes = [
      { questionId: 'q_phy_1', topic: 'Rotational Dynamics', nextReview: '2026-10-26' },
    ];

    const { json, csv } = generateUserDataExport(currentPersona.id, currentPersona, dummyTasks, dummyMistakes);

    const blob = new Blob([format === 'json' ? json : csv], {
      type: format === 'json' ? 'application/json' : 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `lood_edu_export_${currentPersona.id}.${format}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setActionNotice(`Exported personal data archive in .${format.toUpperCase()} (sanitized against formula injection).`);
    setTimeout(() => setActionNotice(null), 5000);
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to request account deletion? All personal plans, test history, and preferences will be permanently purged after a 30-day statutory cooling period.'
    );
    if (confirmDelete) {
      const req = requestAccountDeletion(currentPersona.id);
      setDeletionStatus(
        `Account deletion request queued (ID: ${req.id}). Scheduled purge date: ${req.scheduledPurgeDate.split('T')[0]}. Tombstone cryptographic hash preserved for audit compliance.`
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/settings"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Settings
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800">
              Student Privacy Rights
            </span>
            <span className="text-xs text-slate-500">GDPR & DPDP Act 2023 Aligned</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">Privacy, Consents & Guardian Controls</h1>
          <p className="text-sm text-slate-600 mt-1">
            We operate with strict data minimization. We do not infer caste, religion, or medical details, and we never sell student leads.
          </p>
        </div>

        {actionNotice && (
          <div className="mb-6 rounded-lg bg-teal-50 border border-teal-200 p-4 text-xs font-medium text-teal-900 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {deletionStatus && (
          <div className="mb-6 rounded-lg bg-rose-50 border border-rose-200 p-4 text-xs font-medium text-rose-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{deletionStatus}</span>
          </div>
        )}

        {/* SECTION 1: Wellness Isolation Invariant */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-2">
            <Lock className="w-4 h-4 text-teal-700" />
            Non-Negotiable Wellness Privacy Boundary
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your Mind Coach reflections, mood check-ins, and focus logs are strictly private to you. They are encrypted at rest, excluded from exports, and are <strong>never accessible</strong> to parents, school counsellors, teachers, or advertisers under any circumstances.
          </p>
        </div>

        {/* SECTION 2: Minor & Guardian Linking */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-1">Guardian Linking & Consent Verification</h3>
          <p className="text-xs text-slate-600 mb-4">
            If you are under 18, link a verified parent/guardian. Guardians can review study progress and help manage subscriptions, but cannot see private journal reflections.
          </p>

          <form onSubmit={handleInviteGuardian} className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="email"
              placeholder="Enter parent / guardian email address"
              value={guardianEmail}
              onChange={(e) => setGuardianEmail(e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800"
            >
              <UserPlus className="w-4 h-4" /> Send Scoped Invitation
            </button>
          </form>

          {guardianLinks.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Linked Guardians</h4>
              {guardianLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50 text-xs"
                >
                  <div>
                    <span className="font-semibold text-slate-900">{link.guardianEmail}</span> &bull;{' '}
                    <span
                      className={`capitalize font-medium ${
                        link.status === 'verified'
                          ? 'text-emerald-700'
                          : link.status === 'revoked'
                          ? 'text-slate-400'
                          : 'text-amber-700'
                      }`}
                    >
                      {link.status}
                    </span>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Permissions: Academic plans & billing only &bull; Coach: Hidden
                    </div>
                  </div>
                  {link.status !== 'revoked' && (
                    <button
                      onClick={() => handleRevokeGuardian(link.id)}
                      className="px-2.5 py-1 rounded text-xs text-rose-700 hover:bg-rose-50 border border-rose-200"
                    >
                      Revoke Access
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 3: Self-Service Data Export */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-slate-900">Download Personal Data Archive</h3>
            <span className="text-[11px] font-mono text-slate-500">CWE-1236 Sanitized</span>
          </div>
          <p className="text-xs text-slate-600 mb-4">
            Download a portable copy of your profile, study tasks, question history, and mistake notebook. Dangerous spreadsheet formula characters (=, +, -, @) are strictly neutralized.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => handleDownloadExport('json')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50"
            >
              <Download className="w-3.5 h-3.5" /> Export JSON Format
            </button>
            <button
              onClick={() => handleDownloadExport('csv')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50"
            >
              <Download className="w-3.5 h-3.5" /> Export Sanitized CSV
            </button>
          </div>
        </div>

        {/* SECTION 4: Account Deletion */}
        <div className="bg-white rounded-xl border border-rose-200 p-6 shadow-sm">
          <h3 className="text-base font-bold text-rose-900 mb-1">Idempotent Account Deletion Request</h3>
          <p className="text-xs text-slate-600 mb-4">
            Request permanent erasure of your account. In accordance with statutory norms, data is queued for complete purge after a 30-day grace period. Duplicate deletion requests return the existing scheduled tombstone.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700"
          >
            <Trash2 className="w-3.5 h-3.5" /> Request Full Account Erasure
          </button>
        </div>
      </div>
    </div>
  );
}
