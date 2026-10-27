'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useDemo } from '@/lib/demo/DemoContext';
import { DEMO_PERSONAS } from '@/lib/demo/personas';
import { ShieldAlert, User, ChevronDown, RotateCcw, Sparkles, Check, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const DemoModeBanner: React.FC = () => {
  const pathname = usePathname();
  const { isDemo, activePersona, setPersonaById, toggleAppMode, resetDemoData } = useDemo();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (pathname === '/') {
    return null;
  }

  if (!isDemo) {
    return (
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-white">LIVE MODE ACTIVATED</span>
          <span className="text-slate-400">| Connecting to live services</span>
        </div>
        <button
          onClick={toggleAppMode}
          className="text-amber-400 hover:text-amber-300 font-bold underline transition"
        >
          Switch to Synthetic Demo Mode
        </button>
      </div>
    );
  }

  return (
    <aside aria-label="Demonstration Mode Notice" className="bg-amber-500 text-slate-950 text-xs font-medium py-1 px-3 sm:px-6 shadow-sm border-b border-amber-600/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-slate-950 text-amber-400 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
            <ShieldAlert className="w-3 h-3" />
            DEMO MODE
          </span>
          <span className="text-slate-900 text-xs font-semibold hidden md:inline">
            Zero-credential isolated sandbox • Real payments &amp; external dispatches disabled.
          </span>
        </div>

        {/* Persona Switcher Dropdown */}
        <div className="flex items-center gap-2 relative">
          <span className="text-[11px] text-slate-900 font-bold hidden sm:inline">Active Persona:</span>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-slate-950 text-white hover:bg-slate-900 px-3 py-1 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition shadow-xs"
            >
              <User className="w-3 h-3 text-amber-400" />
              <span>{activePersona.name}</span>
              <span className="text-[10px] text-amber-300/80 font-normal">({activePersona.role})</span>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-slate-900">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Synthetic Persona
                </div>
                {Object.entries(DEMO_PERSONAS).map(([key, persona]) => {
                  const isSelected = activePersona.id === persona.id;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setPersonaById(key);
                        setDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center justify-between transition ${
                        isSelected ? 'bg-amber-50/60 font-bold' : ''
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{persona.name}</span>
                          <span className="text-[9px] uppercase px-1.5 py-0.2 rounded font-extrabold bg-slate-100 text-slate-600 border border-slate-200">
                            {persona.role}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[200px]">
                          {persona.headline}
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-600" />}
                    </button>
                  );
                })}

                <div className="mt-1 pt-1 border-t border-slate-100 px-2 flex items-center justify-between text-[11px]">
                  <button
                    onClick={() => {
                      resetDemoData();
                      setDropdownOpen(false);
                    }}
                    className="text-slate-500 hover:text-red-600 py-1 px-2 flex items-center gap-1 text-[10px] font-medium"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset Demo State
                  </button>
                  <button
                    onClick={() => {
                      toggleAppMode();
                      setDropdownOpen(false);
                    }}
                    className="text-blue-600 hover:underline py-1 px-2 font-bold text-[10px]"
                  >
                    Live Mode →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
