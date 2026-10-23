'use client';

import React from 'react';
import { useDemo } from '@/lib/demo/DemoContext';
import { User, Shield, CreditCard, Bell, LogOut, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function SettingsOverviewPage() {
  const { currentPersona, isDemoMode } = useDemo();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Account & Governance</span>
          <h1 className="text-3xl font-bold text-slate-900 mt-1">Account Settings & Transparency</h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage your profile, verified guardian links, privacy choices, data exports, and subscription entitlements.
          </p>
        </div>

        {/* User Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-900 flex items-center justify-center font-bold text-xl border border-teal-200">
              {currentPersona.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{currentPersona.name}</h2>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 capitalize">
                  {currentPersona.role.replace('_', ' ')}
                </span>
                {isDemoMode && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                    Synthetic Persona
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Stage: {currentPersona.context.stage} &bull; Age: {currentPersona.context.isMinor ? 'Minor (Under 18)' : 'Adult (18+)'} &bull; Focus:{' '}
                {currentPersona.context.targetGoals?.join(', ') || 'Exploratory'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              window.location.href = '/login';
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50"
          >
            <LogOut className="w-3.5 h-3.5" /> Switch Persona / Sign Out
          </button>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/settings/privacy"
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-teal-500 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
            </div>
            <h3 className="font-semibold text-slate-900 text-base">Privacy, Consents & Data Rights</h3>
            <p className="text-xs text-slate-600 mt-1">
              Export personal data (JSON/sanitized CSV), revoke guardian permissions, and request idempotent account deletion.
            </p>
          </Link>

          <Link
            href="/settings/billing"
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-teal-500 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </div>
            <h3 className="font-semibold text-slate-900 text-base">Plans & Subscription Entitlements</h3>
            <p className="text-xs text-slate-600 mt-1">
              Review current plan (Explore, Guide, Prepare), Razorpay test mode transactions, and cancellation terms.
            </p>
          </Link>

          <Link
            href="/updates"
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-teal-500 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
            </div>
            <h3 className="font-semibold text-slate-900 text-base">Daily Briefing & Notification Outbox</h3>
            <p className="text-xs text-slate-600 mt-1">
              Select 3-minute edition (Student, Parent, Adult), set send times in Asia/Kolkata, or simulate dry-run delivery.
            </p>
          </Link>

          <div className="bg-slate-100/70 rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Privacy Invariant Verification
            </div>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
              <li>Mind Coach reflections are never shared with parents or counselors.</li>
              <li>No phone numbers or income required to browse.</li>
              <li>Under-18 accounts are completely ad-free.</li>
              <li>We never sell student leads to third-party colleges or coaching centers.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
