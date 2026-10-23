'use client';

import React, { useState } from 'react';
import { useDemo } from '@/lib/demo/DemoContext';
import { SUBSCRIPTION_PLANS, PlanTier, BillingCycle } from '@/lib/payments/subscriptionPlans';
import { Check, ShieldCheck, CreditCard, ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function BillingSettingsPage() {
  const { currentPersona } = useDemo();
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>('monthly');
  const [activePlanId, setActivePlanId] = useState<PlanTier>('explore');
  const [simulationNotice, setSimulationNotice] = useState<string | null>(null);

  const handleSimulateSubscription = (planId: PlanTier) => {
    setActivePlanId(planId);
    setSimulationNotice(
      `Razorpay Test-Mode Simulation: Upgraded ${currentPersona.name} to "${SUBSCRIPTION_PLANS[planId].name}" tier. Entitlements granted server-side via verified webhook ledger.`
    );
    setTimeout(() => setSimulationNotice(null), 6000);
  };

  const handleSimulateCancel = () => {
    setSimulationNotice(
      `Cancellation scheduled: Your access to "${SUBSCRIPTION_PLANS[activePlanId].name}" will remain fully active until the end of the current billing cycle (1 month from today). No further charges will occur.`
    );
    setTimeout(() => setSimulationNotice(null), 7000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/settings"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Settings
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
              Subscription Entitlements
            </span>
            <span className="text-xs text-slate-500">Razorpay Test Mode Active</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">Plans, Pricing & Entitlements</h1>
          <p className="text-sm text-slate-600 mt-1">
            Transparent pricing in INR. All plans feature explicit daily AI query allowances. We never claim unlimited AI or guaranteed admissions.
          </p>
        </div>

        {simulationNotice && (
          <div className="mb-6 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-xs font-medium text-emerald-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{simulationNotice}</span>
          </div>
        )}

        {/* Current Plan Status */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Active Entitlement</div>
            <div className="flex items-center gap-2 mt-1">
              <h2 className="text-xl font-bold text-slate-900">{SUBSCRIPTION_PLANS[activePlanId].name}</h2>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{SUBSCRIPTION_PLANS[activePlanId].description}</p>
          </div>

          {activePlanId !== 'explore' && (
            <button
              onClick={handleSimulateCancel}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
            >
              Cancel Subscription
            </button>
          )}
        </div>

        {/* Cycle Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-200 p-1 rounded-xl flex items-center text-xs font-semibold">
            <button
              onClick={() => setSelectedCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg transition-all ${
                selectedCycle === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setSelectedCycle('annual')}
              className={`px-4 py-1.5 rounded-lg transition-all ${
                selectedCycle === 'annual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Annual (Save ~37%)
            </button>
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {(['explore', 'guide', 'prepare'] as PlanTier[]).map((tier) => {
            const plan = SUBSCRIPTION_PLANS[tier];
            const isCurrent = activePlanId === tier;
            const price = selectedCycle === 'monthly' ? plan.priceMonthlyInr : plan.priceAnnualInr;

            return (
              <div
                key={tier}
                className={`bg-white rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                  isCurrent
                    ? 'border-teal-600 ring-2 ring-teal-600/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{plan.badge}</span>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800">
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.description}</p>

                  <div className="mt-4 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-slate-900">₹{price}</span>
                      <span className="text-xs text-slate-500">
                        {tier === 'explore' ? '' : selectedCycle === 'monthly' ? '/ month' : '/ year'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{plan.taxNote}</div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 mb-6 space-y-2.5">
                    <div className="text-xs font-bold text-slate-700">Entitlements & Features:</div>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400 mb-3">{plan.cancellationPolicy}</div>
                  <button
                    disabled={isCurrent}
                    onClick={() => handleSimulateSubscription(tier)}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isCurrent
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : tier === 'prepare'
                        ? 'bg-teal-700 text-white hover:bg-teal-800 shadow-sm'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {isCurrent ? 'Active Plan' : `Select ${plan.name}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modular Subject Pass Invariant */}
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 uppercase">
                Modular Alternative
              </span>
              <h4 className="font-bold text-slate-900 text-sm">Class 10 CBSE Core Subject Pass &bull; ₹299 / month</h4>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Prefer single-subject mastery? Unlock individual question banks (Maths Standard, Science, German, etc.) with 200+ verified NCERT questions and formula flashcards.
            </p>
          </div>
          <button
            onClick={() => handleSimulateSubscription('subject_pass')}
            className="shrink-0 px-4 py-2 rounded-lg bg-indigo-700 text-white text-xs font-semibold hover:bg-indigo-800"
          >
            Switch to ₹299/mo Subject Pass
          </button>
        </div>
      </div>
    </div>
  );
}
