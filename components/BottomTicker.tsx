'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, X, ChevronUp, CheckCircle, ShieldCheck, Zap } from 'lucide-react';

export const BottomTicker: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('boardedge_ticker_collapsed');
    if (saved === 'true') {
      setCollapsed(true);
    }
  }, []);

  const handleToggle = (state: boolean) => {
    setCollapsed(state);
    localStorage.setItem('boardedge_ticker_collapsed', state ? 'true' : 'false');
  };

  if (!mounted) return null;

  if (collapsed) {
    return (
      <div className="fixed bottom-3 left-4 z-30">
        <button
          onClick={() => handleToggle(false)}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/95 hover:bg-forest-900 text-paper-100 border border-forest-700 shadow-lg text-xs font-medium transition backdrop-blur-md"
          aria-label="Expand CBSE 2027 information banner"
        >
          <span className="w-2 h-2 rounded-full bg-limeaccent animate-ping" />
          <span className="font-semibold text-limeaccent">LoopEdu</span>
          <span className="text-paper-300 hidden sm:inline">• loopedu.in • The Daily Five • Parent Hub</span>
          <ChevronUp className="w-3.5 h-3.5 text-paper-400 group-hover:text-white transition" />
        </button>
      </div>
    );
  }

  const tickerItems = [
    { text: 'The Daily Five', highlight: '5 high-yield questions every morning to beat study fatigue' },
    { text: 'The Mistake Comeback', highlight: 'Active recall vault with 3d, 7d, 14d spaced repetition' },
    { text: 'The Parent Hub', highlight: 'Anti-micromanagement view with transparent Honesty Metre' },
    { text: 'LoopEdu (Beta)', highlight: '15-min daily habit for school & competitive exams' },
    { text: 'Milestone Rewards', highlight: 'Curated 10-Year Question Bank PDFs unlocked per chapter' },
    { text: 'Modular Pricing', highlight: '₹299/month per subject • A product of itappens.ai' },
  ];

  return (
    <aside
      aria-label="LoopEdu Daily Practice Announcement"
      className="fixed bottom-0 left-0 right-0 z-30 bg-forest-950/95 text-paper-100 border-t border-forest-800 shadow-2xl backdrop-blur-md transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 h-12 sm:h-11">
        {/* Left static badge */}
        <div className="hidden lg:flex items-center gap-1.5 pr-4 border-r border-forest-800/80 text-xs flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-limeaccent animate-pulse" />
          <span className="font-mono font-bold uppercase tracking-wider text-limeaccent text-[11px]">
            LoopEdu
          </span>
          <span className="text-[9px] font-mono font-bold uppercase text-forest-200 bg-forest-900 border border-forest-700 px-1 py-0.2 rounded">
            BETA
          </span>
        </div>

        {/* Scrolling Marquee Hook */}
        <div className="flex-1 overflow-hidden relative mx-2 sm:mx-4 mask-gradient">
          <div className="animate-marquee-infinite flex items-center gap-8 text-xs select-none">
            {/* First duplicate for seamless loop */}
            {tickerItems.map((item, idx) => (
              <div key={`ticker-1-${idx}`} className="flex items-center gap-2 whitespace-nowrap">
                <span className="font-semibold text-white">{item.text}</span>
                <span className="text-forest-400">•</span>
                <span className="text-paper-300 font-normal">{item.highlight}</span>
                <span className="text-forest-600 ml-4 font-mono">✦</span>
              </div>
            ))}
            {/* Second duplicate */}
            {tickerItems.map((item, idx) => (
              <div key={`ticker-2-${idx}`} className="flex items-center gap-2 whitespace-nowrap">
                <span className="font-semibold text-white">{item.text}</span>
                <span className="text-forest-400">•</span>
                <span className="text-paper-300 font-normal">{item.highlight}</span>
                <span className="text-forest-600 ml-4 font-mono">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right CTA cluster */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 pl-2">
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 bg-limeaccent hover:bg-limeaccent-hover text-forest-950 font-bold px-3 py-1.5 rounded-lg text-xs transition shadow-sm"
          >
            <Sparkles className="w-3 h-3" />
            <span className="hidden xs:inline">Start Path</span>
            <span className="xs:hidden">Path</span>
          </Link>

          <Link
            href="/parent"
            className="hidden sm:inline-flex items-center gap-1 bg-forest-800 hover:bg-forest-700 text-paper-100 font-medium px-2.5 py-1.5 rounded-lg text-xs border border-forest-700 transition"
          >
            <span>Parent Hub</span>
            <ArrowRight className="w-3 h-3 text-limeaccent" />
          </Link>

          <button
            onClick={() => handleToggle(true)}
            className="text-forest-400 hover:text-white p-1 rounded-md transition hover:bg-forest-800"
            title="Minimize bar"
            aria-label="Minimize bottom announcement bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
