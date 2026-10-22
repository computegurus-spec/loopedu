'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShieldCheck,
  ChevronDown,
  LogOut,
  Layers,
  BookOpen,
  GitBranch,
  RotateCcw,
  Compass,
  ArrowRight,
  Activity,
  Cpu,
} from 'lucide-react';

interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  isPro?: boolean;
}

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => {
        setUser(null);
      });
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setDropdownOpen(false);
    router.push('/');
    router.refresh();
  };

  const isCurrent = (path: string) => pathname === path || pathname.startsWith(path + '/');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-md text-slate-100">
      {/* Telemetry Micro Status Ribbon */}
      {!pathname.startsWith('/study/') && (
        <div className="bg-slate-900/90 text-slate-400 px-4 py-1 text-[11px] border-b border-slate-800/60 flex items-center justify-between font-mono">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-semibold tracking-tight">AUTONOMOUS_STUDENT_AGENT: ACTIVE</span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="hidden sm:inline text-slate-400">COGNITIVE DIGITAL TWIN ENGINE (PGVECTOR)</span>
            </div>
            <div className="flex items-center gap-3 tabular-nums">
              <span className="text-slate-500 hidden md:inline">SWARM LATENCY: 12ms</span>
              <span className="text-emerald-400 font-medium">OFFICIAL STANDARDS VERIFIED</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#0066FF] text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-md group-hover:bg-blue-500 transition">
            L
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base leading-none tracking-tight">
                LoopEdu
              </span>
              <span className="px-1.5 py-0.2 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400">
                AGI_v2.4
              </span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 font-normal tracking-wide">
              Autonomous Student Agent
            </span>
          </div>
        </Link>

        {/* Navigation Links:
            When Logged In: Show Student Workspace Tools.
            When Logged Out: Keep cleanly minimal (Zero clutter).
        */}
        <nav className="hidden lg:flex items-center gap-6 text-xs text-slate-300 font-medium">
          {user ? (
            /* Logged-In Student Workspace Links */
            <>
              <Link
                href="/learn"
                className={`transition hover:text-white flex items-center gap-1.5 py-1 ${
                  isCurrent('/learn') ? 'text-white font-semibold border-b-2 border-[#0066FF]' : ''
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                <span>Mission Control</span>
              </Link>

              <Link
                href="/study/cbse-10-science"
                className={`transition hover:text-white flex items-center gap-1.5 py-1 ${
                  pathname.startsWith('/study') ? 'text-white font-semibold border-b-2 border-[#0066FF]' : ''
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>Question Bank</span>
              </Link>

              <Link
                href="/mind-maps"
                className={`transition hover:text-white flex items-center gap-1.5 py-1 ${
                  isCurrent('/mind-maps') ? 'text-white font-semibold border-b-2 border-[#0066FF]' : ''
                }`}
              >
                <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                <span>Mind Maps</span>
              </Link>

              <Link
                href="/flashcards"
                className={`transition hover:text-white flex items-center gap-1.5 py-1 ${
                  isCurrent('/flashcards') ? 'text-white font-semibold border-b-2 border-[#0066FF]' : ''
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Flashcards</span>
              </Link>

              <Link
                href="/consultant"
                className={`transition hover:text-white flex items-center gap-1.5 py-1 ${
                  isCurrent('/consultant') ? 'text-white font-semibold border-b-2 border-[#0066FF]' : ''
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                <span>Academic Advisory</span>
              </Link>

              <Link
                href="/catalogue"
                className={`transition hover:text-white py-1 ${
                  isCurrent('/catalogue') ? 'text-white font-semibold border-b-2 border-[#0066FF]' : ''
                }`}
              >
                Curriculum Catalog
              </Link>
            </>
          ) : (
            /* Logged-Out Public Visitors: Clean Minimalist Header */
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Multi-Agent Pedagogical Swarm Active</span>
            </div>
          )}
        </nav>

        {/* Right side: Auth Controls */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 text-xs font-medium hover:bg-slate-800 transition"
                aria-label="User account dropdown"
              >
                <div className="w-5 h-5 rounded-full bg-[#0066FF] text-white flex items-center justify-center font-bold text-[10px]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-slate-200 max-w-[120px] truncate font-medium">
                  {user.name}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2.5 border-b border-slate-800 mb-1">
                    <div className="font-bold text-slate-100 text-sm">{user.name}</div>
                    <div className="text-slate-400 text-[11px] truncate">{user.email}</div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                        {user.role === 'admin' ? 'SYSTEM_ADMIN' : 'STUDENT_AGENT_PROVISIONED'}
                      </span>
                    </div>
                  </div>

                  <div className="p-1 space-y-1">
                    <Link
                      href="/learn"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 transition"
                    >
                      <Activity className="w-3.5 h-3.5 text-blue-400" />
                      <span>Mission Control</span>
                    </Link>

                    <Link
                      href="/study/cbse-10-science"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 transition"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                      <span>Question Bank</span>
                    </Link>

                    <Link
                      href="/mind-maps"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 transition"
                    >
                      <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Concept Mind Maps</span>
                    </Link>

                    <Link
                      href="/flashcards"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      <span>Active Recall Flashcards</span>
                    </Link>

                    <Link
                      href="/consultant"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200 transition"
                    >
                      <Compass className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Academic Advisory</span>
                    </Link>

                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-amber-400 transition"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition border-t border-slate-800 mt-1 pt-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Disconnect Session</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/login"
                className="text-xs text-slate-300 hover:text-white font-medium px-3 py-1.5 rounded-lg hover:bg-slate-900 transition"
              >
                Student Login
              </Link>
              <Link
                href="/initialize"
                className="inline-flex items-center gap-1.5 bg-[#0066FF] hover:bg-blue-500 text-white font-semibold px-3.5 py-1.5 rounded-lg text-xs transition shadow-sm active:scale-95"
              >
                <span>Initialize Student Agent →</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
