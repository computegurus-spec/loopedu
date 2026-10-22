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
  Sparkles,
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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md text-slate-900 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#0066FF] text-white flex items-center justify-center font-bold text-base tracking-tight shadow-sm group-hover:bg-blue-600 transition relative">
            <span>L</span>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-white" />
          </div>
          <span className="font-extrabold text-slate-900 text-xl leading-none tracking-tight">
            LoopEdu
          </span>
        </Link>

        {/* Navigation Links:
            When Logged In: Show Student Workspace Tools.
            When Logged Out: Clean & Minimalist.
        */}
        <nav className="hidden lg:flex items-center gap-6 text-xs text-slate-600 font-semibold">
          {user ? (
            /* Logged-In Student Workspace Links */
            <>
              <Link
                href="/learn"
                className={`transition hover:text-slate-900 flex items-center gap-1.5 py-1 ${
                  isCurrent('/learn') ? 'text-[#0066FF] font-bold border-b-2 border-[#0066FF]' : ''
                }`}
              >
                <Activity className="w-4 h-4 text-[#0066FF]" />
                <span>Mission Control</span>
              </Link>

              <Link
                href="/study/cbse-10-science"
                className={`transition hover:text-slate-900 flex items-center gap-1.5 py-1 ${
                  pathname.startsWith('/study') ? 'text-[#0066FF] font-bold border-b-2 border-[#0066FF]' : ''
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#0066FF]" />
                <span>Question Bank</span>
              </Link>

              <Link
                href="/mind-maps"
                className={`transition hover:text-slate-900 flex items-center gap-1.5 py-1 ${
                  isCurrent('/mind-maps') ? 'text-[#0066FF] font-bold border-b-2 border-[#0066FF]' : ''
                }`}
              >
                <GitBranch className="w-4 h-4 text-cyan-600" />
                <span>Mind Maps</span>
              </Link>

              <Link
                href="/flashcards"
                className={`transition hover:text-slate-900 flex items-center gap-1.5 py-1 ${
                  isCurrent('/flashcards') ? 'text-[#0066FF] font-bold border-b-2 border-[#0066FF]' : ''
                }`}
              >
                <RotateCcw className="w-4 h-4 text-amber-600" />
                <span>Flashcards</span>
              </Link>

              <Link
                href="/consultant"
                className={`transition hover:text-slate-900 flex items-center gap-1.5 py-1 ${
                  isCurrent('/consultant') ? 'text-[#0066FF] font-bold border-b-2 border-[#0066FF]' : ''
                }`}
              >
                <Compass className="w-4 h-4 text-indigo-600" />
                <span>Career Planner</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/consultant"
                className={`transition hover:text-slate-900 flex items-center gap-1.5 py-1 ${
                  isCurrent('/consultant') ? 'text-[#0066FF] font-bold border-b-2 border-[#0066FF]' : ''
                }`}
              >
                <Compass className="w-4 h-4 text-[#0066FF]" />
                <span>Career Planner</span>
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-blue-100 text-[#0066FF]">
                  AI
                </span>
              </Link>

              <Link
                href="#education-news"
                className="transition hover:text-slate-900 py-1 text-slate-600 hover:text-slate-900"
              >
                Global Education News
              </Link>

              <Link
                href="/study/cbse-10-science"
                className="transition hover:text-slate-900 py-1 text-slate-600 hover:text-slate-900"
              >
                Practice Question Bank
              </Link>
            </>
          )}
        </nav>

        {/* Right side: Auth Controls */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold hover:bg-slate-100 transition shadow-2xs"
                aria-label="User account dropdown"
              >
                <div className="w-6 h-6 rounded-lg bg-[#0066FF] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-slate-800 max-w-[120px] truncate font-semibold">
                  {user.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                    <div className="font-bold text-slate-900 text-sm">{user.name}</div>
                    <div className="text-slate-500 text-[11px] truncate">{user.email}</div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#0066FF] border border-blue-200">
                        STUDENT AGENT ACTIVE
                      </span>
                    </div>
                  </div>

                  <div className="p-1 space-y-1">
                    <Link
                      href="/learn"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-medium transition"
                    >
                      <Activity className="w-4 h-4 text-[#0066FF]" />
                      <span>Mission Control</span>
                    </Link>

                    <Link
                      href="/study/cbse-10-science"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-medium transition"
                    >
                      <BookOpen className="w-4 h-4 text-[#0066FF]" />
                      <span>Question Bank</span>
                    </Link>

                    <Link
                      href="/mind-maps"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-medium transition"
                    >
                      <GitBranch className="w-4 h-4 text-cyan-600" />
                      <span>Concept Mind Maps</span>
                    </Link>

                    <Link
                      href="/flashcards"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-medium transition"
                    >
                      <RotateCcw className="w-4 h-4 text-amber-600" />
                      <span>Spaced Flashcards</span>
                    </Link>

                    <Link
                      href="/consultant"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-medium transition"
                    >
                      <Compass className="w-4 h-4 text-[#0066FF]" />
                      <span>Career Planner</span>
                    </Link>

                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-amber-50 text-amber-800 font-semibold transition"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition border-t border-slate-100 mt-1 pt-2 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/consultant"
                className="lg:hidden text-xs text-slate-700 hover:text-slate-950 font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition flex items-center gap-1"
                title="AI Career & Stream Planner"
              >
                <Compass className="w-3.5 h-3.5 text-[#0066FF]" />
                <span className="hidden sm:inline">Planner</span>
              </Link>
              <Link
                href="/login"
                className="text-xs text-slate-700 hover:text-slate-950 font-semibold px-3 py-2 rounded-xl hover:bg-slate-100 transition"
              >
                Sign In
              </Link>
              <Link
                href="/initialize"
                className="inline-flex items-center gap-1.5 bg-[#0066FF] hover:bg-blue-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-sm active:scale-95"
              >
                <span>Get Started Free →</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
