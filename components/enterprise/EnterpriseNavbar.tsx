'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DEMO_PERSONAS, DemoPersona } from '@/lib/demo/personas';
import { LiveAIIntelligenceModal } from './LiveAIIntelligenceModal';

interface EnterpriseNavbarProps {
  onOpenAiSearch?: () => void;
}

export function EnterpriseNavbar({ onOpenAiSearch }: EnterpriseNavbarProps) {
  const pathname = usePathname();
  const [goalsOpen, setGoalsOpen] = useState(false);
  const [personaOpen, setPersonaOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePersona, setActivePersona] = useState<string>('aarav-student');
  const [aiModalOpen, setAiModalOpen] = useState(false);

  // Sync persona from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('loopedu_demo_persona');
      if (stored && DEMO_PERSONAS[stored]) {
        setActivePersona(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  function handleSelectPersona(id: string) {
    try {
      localStorage.setItem('loopedu_demo_persona', id);
      setActivePersona(id);
      window.dispatchEvent(new CustomEvent('persona-changed', { detail: { personaId: id } }));
      window.location.reload();
    } catch {
      // ignore
    }
  }

  // Keyboard shortcut Cmd/Ctrl + K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setAiModalOpen(true);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentPersona = DEMO_PERSONAS[activePersona] || DEMO_PERSONAS['aarav-student'];

  return (
    <>
      <LiveAIIntelligenceModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />

      {/* Top Notification / Trust Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-medium">Statutory Bulletin Tracker Active</span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-400">Zero Telemarketing Sales Calls • 100% Ad-Free for Minors • DPDP Act 2023 Certified</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden md:inline">Helplines: Tele-MANAS <strong className="text-slate-300">14416</strong></span>
            <Link href="/admin" className="hover:text-emerald-400 transition text-[11px]">
              Statutory Registry →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Enterprise Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand & Goal Selector */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-emerald-950/40 group-hover:scale-105 transition">
                L
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight text-white text-lg leading-tight flex items-center gap-1.5">
                  LoopEdu
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Enterprise
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-tight -mt-0.5">
                  Exam & Career Intelligence
                </span>
              </div>
            </Link>

            {/* Goal Mega-Dropdown Trigger */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setGoalsOpen(!goalsOpen)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition"
              >
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Select Target Goal</span>
                <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform ${goalsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mega Dropdown Menu */}
              {goalsOpen && (
                <div
                  className="absolute left-0 mt-2 w-96 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl p-4 grid grid-cols-2 gap-3 text-xs animate-in fade-in duration-150"
                  onMouseLeave={() => setGoalsOpen(false)}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 block">
                      Undergraduate Entrance
                    </span>
                    <Link
                      href="/exams#jee-main"
                      onClick={() => setGoalsOpen(false)}
                      className="block px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
                    >
                      <div className="font-semibold text-slate-200">IIT JEE (Main & Adv)</div>
                      <div className="text-[10px] text-slate-400">Engineering • 10,000+ Questions</div>
                    </Link>
                    <Link
                      href="/exams#neet-ug"
                      onClick={() => setGoalsOpen(false)}
                      className="block px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
                    >
                      <div className="font-semibold text-slate-200">NEET UG</div>
                      <div className="text-[10px] text-slate-400">Medical • Biology Drills</div>
                    </Link>
                    <Link
                      href="/exams#cuet-ug"
                      onClick={() => setGoalsOpen(false)}
                      className="block px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
                    >
                      <div className="font-semibold text-slate-200">CUET UG</div>
                      <div className="text-[10px] text-slate-400">Central Universities</div>
                    </Link>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 block">
                      Government Recruitment
                    </span>
                    <Link
                      href="/exams#upsc-cse"
                      onClick={() => setGoalsOpen(false)}
                      className="block px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
                    >
                      <div className="font-semibold text-slate-200">UPSC CSE (IAS/IPS)</div>
                      <div className="text-[10px] text-slate-400">Civil Services • GS & CSAT</div>
                    </Link>
                    <Link
                      href="/exams#ssc-cgl"
                      onClick={() => setGoalsOpen(false)}
                      className="block px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
                    >
                      <div className="font-semibold text-slate-200">SSC CGL & CHSL</div>
                      <div className="text-[10px] text-slate-400">Staff Selection Combined</div>
                    </Link>
                    <Link
                      href="/exams#banking-ibps"
                      onClick={() => setGoalsOpen(false)}
                      className="block px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
                    >
                      <div className="font-semibold text-slate-200">Banking (IBPS & SBI PO)</div>
                      <div className="text-[10px] text-slate-400">Quantitative & Reasoning</div>
                    </Link>
                    <Link
                      href="/exams#rrb-ntpc"
                      onClick={() => setGoalsOpen(false)}
                      className="block px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
                    >
                      <div className="font-semibold text-slate-200">Railways (RRB NTPC)</div>
                      <div className="text-[10px] text-slate-400">Technical & Non-Technical</div>
                    </Link>
                  </div>

                  <div className="col-span-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Need Class 9–12 Foundation?</span>
                    <Link
                      href="/paths"
                      onClick={() => setGoalsOpen(false)}
                      className="text-emerald-400 hover:text-emerald-300 font-semibold"
                    >
                      Explore Career Pathways →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center Search & AI Query Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <button
              onClick={() => {
                if (onOpenAiSearch) onOpenAiSearch();
                else setAiModalOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-400 text-xs transition group shadow-inner"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-slate-300">Ask AI: eligibility, cutoffs, syllabus, cost...</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-700">
                  Ctrl K
                </kbd>
              </div>
            </button>
          </div>

          {/* Right Navigation & Persona Switcher */}
          <div className="flex items-center gap-3">
            <nav className="hidden xl:flex items-center gap-1 text-xs font-medium text-slate-300">
              <Link
                href="/paths"
                className={`px-3 py-1.5 rounded-lg transition ${pathname === '/paths' ? 'text-white bg-slate-800 font-semibold' : 'hover:text-white hover:bg-slate-900'}`}
              >
                Pathways
              </Link>
              <Link
                href="/exams"
                className={`px-3 py-1.5 rounded-lg transition ${pathname === '/exams' ? 'text-white bg-slate-800 font-semibold' : 'hover:text-white hover:bg-slate-900'}`}
              >
                Exams & AST
              </Link>
              <Link
                href="/prepare"
                className={`px-3 py-1.5 rounded-lg transition ${pathname === '/prepare' ? 'text-white bg-slate-800 font-semibold' : 'hover:text-white hover:bg-slate-900'}`}
              >
                Practice Drills
              </Link>
              <Link
                href="/coach"
                className={`px-3 py-1.5 rounded-lg transition ${pathname === '/coach' ? 'text-white bg-slate-800 font-semibold' : 'hover:text-white hover:bg-slate-900'}`}
              >
                Mind Coach
              </Link>
              <Link
                href="/settings/billing"
                className={`px-3 py-1.5 rounded-lg transition ${pathname?.includes('/billing') ? 'text-white bg-slate-800 font-semibold' : 'hover:text-white hover:bg-slate-900'}`}
              >
                Pricing
              </Link>
            </nav>

            {/* Persona Switcher (Demo Zero-Phone-Trap Driver) */}
            <div className="relative">
              <button
                onClick={() => setPersonaOpen(!personaOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs text-slate-300 transition"
                title="Switch demo persona without phone verification"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-medium text-slate-200 hidden sm:inline">{currentPersona.name.split(' ')[0]}</span>
                <span className="text-[10px] text-slate-400 hidden md:inline">({currentPersona.role})</span>
                <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {personaOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 rounded-xl bg-slate-900 border border-slate-700 shadow-xl p-2 text-xs space-y-1 z-50 animate-in fade-in duration-150"
                  onMouseLeave={() => setPersonaOpen(false)}
                >
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Test Drive Personas (Zero Credentials)
                  </div>
                  {Object.values(DEMO_PERSONAS).map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        handleSelectPersona(p.id);
                        setPersonaOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between transition ${
                        p.id === activePersona
                          ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20'
                          : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-[10px] text-slate-400">{p.headline}</div>
                      </div>
                      {p.id === activePersona && (
                        <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <Link
              href="/prepare"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-950/40 flex items-center gap-1.5"
            >
              <span>Start Free Practice</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-3 text-sm">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setAiModalOpen(true);
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-slate-900 text-slate-300 text-xs border border-slate-800"
            >
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Ask AI Statutory Intelligence...</span>
            </button>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/paths"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-900 text-slate-200 hover:bg-slate-850"
              >
                🗺️ Career Pathways
              </Link>
              <Link
                href="/exams"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-900 text-slate-200 hover:bg-slate-850"
              >
                📜 Exams & AST
              </Link>
              <Link
                href="/prepare"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-900 text-slate-200 hover:bg-slate-850"
              >
                ✍️ Practice & Hints
              </Link>
              <Link
                href="/coach"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-900 text-slate-200 hover:bg-slate-850"
              >
                🧘 Mind Coach (25/5)
              </Link>
              <Link
                href="/settings/billing"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-900 text-slate-200 hover:bg-slate-850"
              >
                💳 Pricing Plans
              </Link>
              <Link
                href="/parent"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-900 text-slate-200 hover:bg-slate-850"
              >
                👨‍👩‍👦 Parent Hub
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
