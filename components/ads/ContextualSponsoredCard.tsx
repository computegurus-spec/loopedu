'use client';

import React from 'react';
import { useDemo } from '@/lib/demo/DemoContext';
import { featureFlags } from '@/lib/config/flags';

interface ContextualSponsoredCardProps {
  contextCategory?: 'engineering' | 'management' | 'banking' | 'upsc' | 'general';
  location?: string;
}

export function ContextualSponsoredCard({ contextCategory = 'general', location = 'Karnataka' }: ContextualSponsoredCardProps) {
  const { currentPersona } = useDemo();

  // Guard 1: Must be explicitly enabled in feature flags
  if (!featureFlags.contextualAds) {
    return null;
  }

  // Guard 2: Strictly ad-free for minors (< 18)
  if (currentPersona.context.isMinor) {
    return null;
  }

  // Guard 3: Context-based synthetic sponsor copy
  const sponsorData = {
    title: 'Karnataka State Higher Education Innovation Grant 2027',
    advertiser: 'Dept of Higher Education (Synthetic Demo Sponsor)',
    body: 'Merit-cum-means assistance details for accredited state degree programmes. Direct application via statutory portal.',
    targetUrl: 'https://dhte.karnataka.gov.in',
  };

  return (
    <div className="my-6 rounded-xl border border-dashed border-slate-300 bg-amber-50/50 p-4 transition-all">
      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
        <div className="flex items-center gap-2">
          <span className="rounded bg-slate-200 px-2 py-0.5 font-bold uppercase tracking-wider text-[10px] text-slate-700">
            Sponsored
          </span>
          <span className="text-[11px] font-medium text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">
            Synthetic Demo Sponsor &bull; Non-Targeted
          </span>
        </div>
        <span className="text-[11px]">Context: {contextCategory}</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-semibold text-slate-900 text-sm">{sponsorData.title}</h4>
          <p className="text-xs text-slate-600 mt-0.5 max-w-xl">{sponsorData.body}</p>
          <div className="text-[11px] text-slate-400 mt-1">Publisher: {sponsorData.advertiser}</div>
        </div>
        <a
          href={sponsorData.targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start sm:self-center shrink-0 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
        >
          View Portal
        </a>
      </div>

      <div className="mt-3 border-t border-slate-200/80 pt-2 text-[10px] text-slate-400 flex items-center justify-between">
        <span>No student tracking &bull; Zero behavioural profiling &bull; Never shown to minors</span>
        <a href="/settings/privacy" className="hover:underline text-teal-700">
          Ad Preferences
        </a>
      </div>
    </div>
  );
}
