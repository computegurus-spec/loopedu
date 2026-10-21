'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BookOpen,
  ShieldCheck,
  User,
  Sparkles,
  ChevronDown,
  LogOut,
  ArrowRight,
  Flame,
  GraduationCap,
  School,
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
  const [isPro, setIsPro] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setIsPro(Boolean(data.isPaid || data.isAdmin || data.user.isPro));
        } else {
          setUser(null);
          setIsPro(false);
        }
      })
      .catch(() => {
        setUser(null);
        setIsPro(false);
      });
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setIsPro(false);
    setDropdownOpen(false);
    router.push('/');
    router.refresh();
  };

  const isCurrent = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Albert-style top announcement banner */}
      <div className="bg-slate-900 text-white px-4 py-1.5 text-xs text-center font-medium border-b border-slate-800 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>
          🎁 <strong>Launch Special:</strong> 10 High-Yield Board Questions 100% Free Every Week • Resets Every 7 Days
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-blue-800 transition">
            L
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-slate-950 text-lg leading-none tracking-tight">
              LoopEdu
            </div>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-700 mt-1">
              CBSE Class 10
            </span>
          </div>
        </Link>

        {/* Navigation Links (Albert.io format: Explore with dropdown for Students & Teachers, Subjects, Pricing) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
          {/* Explore Dropdown */}
          <div className="relative">
            <button
              onClick={() => setExploreOpen(!exploreOpen)}
              onMouseEnter={() => setExploreOpen(true)}
              className="flex items-center gap-1 hover:text-slate-950 py-2 transition"
            >
              <span>Explore</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {exploreOpen && (
              <div
                onMouseLeave={() => setExploreOpen(false)}
                className="absolute left-0 mt-1 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 text-xs animate-in fade-in"
              >
                <Link
                  href="/explore/for-students"
                  onClick={() => setExploreOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4 text-blue-700" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-950 text-sm">For Students</div>
                    <div className="text-slate-500 text-[11px] font-normal leading-snug">
                      Self-paced Daily Five, Mistake Comeback, and AI Hints.
                    </div>
                  </div>
                </Link>

                <Link
                  href="/explore/for-teachers"
                  onClick={() => setExploreOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <School className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-950 text-sm">For Teachers & Schools</div>
                    <div className="text-slate-500 text-[11px] font-normal leading-snug">
                      Classroom question banks, unit test tools, and marking rubrics.
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/catalogue"
            className={`transition hover:text-slate-950 ${
              isCurrent('/catalogue') ? 'text-blue-700 font-bold' : ''
            }`}
          >
            Subjects
          </Link>

          <Link
            href="/catalogue#pricing"
            className="transition hover:text-slate-950"
          >
            Pricing
          </Link>

          {user && (
            <>
              <Link
                href="/learn"
                className={`flex items-center gap-1.5 transition hover:text-slate-950 ${
                  isCurrent('/learn') ? 'text-blue-700 font-bold' : ''
                }`}
              >
                <span>Study Path</span>
              </Link>
              <Link
                href="/library"
                className={`flex items-center gap-1.5 transition hover:text-slate-950 ${
                  isCurrent('/library') ? 'text-blue-700 font-bold' : ''
                }`}
              >
                <BookOpen className="w-4 h-4 text-slate-500" />
                <span>My Library</span>
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
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-medium hover:bg-slate-50 transition shadow-xs"
                aria-label="User account dropdown"
              >
                <div className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline font-semibold text-slate-950 max-w-[110px] truncate">
                  {user.name}
                </span>
                {isPro && (
                  <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-[10px] px-1.5 py-0.5 rounded">
                    PRO
                  </span>
                )}
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                    <div className="font-bold text-slate-950 text-sm">{user.name}</div>
                    <div className="text-slate-500 text-[11px] truncate">{user.email}</div>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                        {user.role === 'admin' ? 'Administrator' : isPro ? 'Pro Member' : 'Student'}
                      </span>
                    </div>
                  </div>

                  <div className="p-1 space-y-1">
                    <Link
                      href="/learn"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-900 font-medium transition"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Study Path</span>
                    </Link>

                    <Link
                      href="/library"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-900 font-medium transition"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      <span>My Question Banks</span>
                    </Link>

                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-900 font-medium transition"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium transition border-t border-slate-100 mt-1 pt-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/login"
                className="text-xs font-bold text-slate-700 hover:text-slate-950 px-3 py-2 rounded-lg hover:bg-slate-100 transition"
              >
                Log In
              </Link>
              <Link
                href="/study/cbse-10-science"
                className="inline-flex items-center gap-1.5 bg-slate-950 hover:bg-slate-900 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Start Free</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
