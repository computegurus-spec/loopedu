'use client';

import React from 'react';
import Link from 'next/link';

export function EnterprisePricingTable() {
  return (
    <section className="py-16 lg:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Unbundled Transparent Pricing
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Fair Monthly Plans. Zero Multi-Year Lock-Ins.
          </h2>
          <p className="text-sm text-slate-400">
            Traditional coaching forces you into ₹50,000 to ₹1,50,000 upfront debt with aggressive telecallers. LoopEdu offers unbundled, monthly modular passes you can cancel in one click.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Tier 1: Explore */}
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tier 1</span>
                <h3 className="text-xl font-bold text-white mt-1">Explore</h3>
                <p className="text-xs text-slate-400 mt-1">Foundational discovery & eligibility check.</p>
              </div>

              <div className="pt-2">
                <span className="text-4xl font-black text-white">₹0</span>
                <span className="text-xs text-slate-400 ml-1">/ forever</span>
              </div>

              <ul className="pt-4 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> 3-Pathway career comparison
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Declarative AST eligibility engine
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> 5 free diagnostic questions daily
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Official gazette notice feed
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Zero phone OTP requirement
                </li>
              </ul>
            </div>

            <Link
              href="/paths"
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs text-center border border-slate-700 transition"
            >
              Start Free Exploration
            </Link>
          </div>

          {/* Tier 2: Guide */}
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Tier 2</span>
                <h3 className="text-xl font-bold text-white mt-1">Guide</h3>
                <p className="text-xs text-slate-400 mt-1">Financial roadmaps & statutory alerts.</p>
              </div>

              <div className="pt-2">
                <span className="text-4xl font-black text-white">₹199</span>
                <span className="text-xs text-slate-400 ml-1">/ month</span>
                <div className="text-[10px] text-teal-400 mt-0.5">or ₹1,499/year (Save 37%)</div>
              </div>

              <ul className="pt-4 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Everything in Explore
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Unbundled 4-year cost calculator
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Guaranteed backup route mapping
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> 3-minute morning briefing digest
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Gazette amendment email alerts
                </li>
              </ul>
            </div>

            <Link
              href="/settings/billing"
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs text-center border border-slate-700 transition"
            >
              Select Guide Plan
            </Link>
          </div>

          {/* Tier 3: Modular Subject Pass */}
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Modular</span>
                <h3 className="text-xl font-bold text-white mt-1">Subject Pass</h3>
                <p className="text-xs text-slate-400 mt-1">Target just 1 weak subject without bundle waste.</p>
              </div>

              <div className="pt-2">
                <span className="text-4xl font-black text-white">₹299</span>
                <span className="text-xs text-slate-400 ml-1">/ month</span>
                <div className="text-[10px] text-cyan-400 mt-0.5">Per individual subject</div>
              </div>

              <ul className="pt-4 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Full question bank for 1 subject
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Progressive 3-tier Socratic hints
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Unlimited Spaced Repetition drills
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Official board marking trap warnings
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Switch subject at end of month
                </li>
              </ul>
            </div>

            <Link
              href="/settings/billing"
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs text-center border border-slate-700 transition"
            >
              Get Subject Pass
            </Link>
          </div>

          {/* Tier 4: Prepare Complete (Highlighted) */}
          <div className="rounded-3xl bg-slate-900 border-2 border-emerald-500 p-6 sm:p-8 flex flex-col justify-between space-y-6 relative shadow-2xl shadow-emerald-950/40">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider">
              Most Popular
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Complete Companion</span>
                <h3 className="text-xl font-bold text-white mt-1">Prepare</h3>
                <p className="text-xs text-slate-400 mt-1">All tracks, full diagnostic suite & Mind Coach.</p>
              </div>

              <div className="pt-2">
                <span className="text-4xl font-black text-white">₹399</span>
                <span className="text-xs text-slate-400 ml-1">/ month</span>
                <div className="text-[10px] text-emerald-400 mt-0.5">or ₹2,999/year (Save 37%)</div>
              </div>

              <ul className="pt-4 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> All 8 national tracks included
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> 10,000+ verified original questions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Full Socratic worked solutions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Spaced repetition Mistake Notebook
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Bounded Mind Coach & 25/5 timer
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Live AI statutory intelligence queries
                </li>
              </ul>
            </div>

            <Link
              href="/settings/billing"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center transition shadow-lg shadow-emerald-950/40"
            >
              Start Prepare Plan →
            </Link>
          </div>

        </div>

        {/* Traditional EdTech Comparison Strip */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-bold text-white text-sm">
              Our Non-Negotiable Consumer Bill of Rights
            </div>
            <div className="text-slate-400">
              No long-term financing contracts • No telemarketing calls • 100% ad-free for minors • One-click cancellation anytime.
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
              Razorpay HMAC Protected
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-bold border border-slate-700">
              DPDP Act 2023 Compliant
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
