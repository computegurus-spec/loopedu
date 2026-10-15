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
    <header className="sticky top-0 z-40 w-full border-b border-academic-border bg-paper/95 backdrop-blur-md">
      {/* Editorial notice / launch banner */}
      <div className="bg-forest-900 text-paper-100 px-4 py-1.5 text-xs text-center font-medium border-b border-forest-800 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-limeaccent animate-pulse"></span>
        <span>
          LoopEdu (Beta) • <strong>The 15-Minute Daily Habit for School & Competitive Exams</strong> • The Daily Five & Mistake Recall
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-forest-900 text-limeaccent flex items-center justify-center font-serif font-bold text-lg shadow-sm group-hover:bg-forest-800 transition">
            L
          </div>
          <div className="flex flex-col">
            <div className="font-serif font-bold text-forest-950 text-lg leading-none tracking-tight">
              LoopEdu
            </div>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-forest-600 mt-1">
              BETA
            </span>
          </div>
        </Link>

        {/* Navigation Links: Depends on Logged In status */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-forest-800">
          {user ? (
            <>
              <Link
                href="/learn"
                className={`flex items-center gap-1.5 transition hover:text-forest-950 ${
                  isCurrent('/learn') ? 'text-forest-950 font-bold border-b-2 border-forest-900 pb-0.5' : ''
                }`}
              >
                <span className="text-limeaccent bg-forest-950 px-1 rounded text-xs">⚡</span>
                <span>Study Path</span>
              </Link>
              <Link
                href="/today"
                className={`flex items-center gap-1.5 transition hover:text-forest-950 ${
                  isCurrent('/today') ? 'text-forest-950 font-bold border-b-2 border-forest-900 pb-0.5' : ''
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-forest-700" />
                <span>The Daily Five</span>
              </Link>
              <Link
                href="/parent"
                className={`flex items-center gap-1.5 transition hover:text-forest-950 ${
                  isCurrent('/parent') ? 'text-forest-950 font-bold border-b-2 border-forest-900 pb-0.5' : ''
                }`}
              >
                <span>Parent Hub</span>
              </Link>
              <Link
                href="/catalogue"
                className={`transition hover:text-forest-950 ${
                  isCurrent('/catalogue') ? 'text-forest-950 font-bold border-b-2 border-forest-900 pb-0.5' : ''
                }`}
              >
                Subjects
              </Link>
              <Link
                href="/library"
                className={`flex items-center gap-1.5 transition hover:text-forest-950 ${
                  isCurrent('/library') ? 'text-forest-950 font-bold' : ''
                }`}
              >
                <BookOpen className="w-4 h-4 text-forest-600" />
                <span>My Library</span>
              </Link>
            </>
          ) : (
            <>
              <Link href="/#how-it-works" className="transition hover:text-forest-950">
                How It Works
              </Link>
              <Link href="/#pillars" className="transition hover:text-forest-950">
                The 3 Pillars
              </Link>
              <Link
                href="/parent"
                className={`transition hover:text-forest-950 ${
                  isCurrent('/parent') ? 'text-forest-950 font-bold' : ''
                }`}
              >
                Parent Hub
              </Link>
              <Link
                href="/catalogue"
                className={`transition hover:text-forest-950 ${
                  isCurrent('/catalogue') ? 'text-forest-950 font-bold' : ''
                }`}
              >
                Pricing (₹299/mo)
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
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-academic-border bg-white text-forest-900 text-xs font-medium hover:bg-forest-50 transition shadow-xs"
                aria-label="User account dropdown"
              >
                <div className="w-6 h-6 rounded-lg bg-forest-900 text-limeaccent flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline font-semibold text-forest-950 max-w-[110px] truncate">
                  {user.name}
                </span>
                {isPro && (
                  <span className="bg-limeaccent text-forest-950 font-bold text-[10px] px-1.5 py-0.5 rounded">
                    PRO
                  </span>
                )}
                <ChevronDown className="w-3.5 h-3.5 text-forest-500" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white border border-academic-border shadow-xl p-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2.5 border-b border-academic-border/60 mb-1">
                    <div className="font-bold text-forest-950 text-sm">{user.name}</div>
                    <div className="text-academic-subtle text-[11px] truncate">{user.email}</div>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-forest-100 text-forest-900">
                        {user.role === 'admin' ? 'Administrator' : isPro ? 'Pro Member' : 'Student'}
                      </span>
                    </div>
                  </div>

                  <div className="p-1 space-y-1">
                    <Link
                      href="/learn"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-forest-50 text-forest-900 font-medium transition"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-forest-700" />
                      <span>Study Path</span>
                    </Link>

                    <Link
                      href="/library"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-forest-50 text-forest-900 font-medium transition"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-forest-700" />
                      <span>My Question Banks</span>
                    </Link>

                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-forest-50 text-forest-900 font-medium transition"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-forest-700" />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-red-700 hover:bg-red-50 font-medium transition border-t border-academic-border/60 mt-1 pt-2"
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
                className="text-xs font-semibold text-forest-900 hover:text-forest-950 px-3 py-2 rounded-lg hover:bg-paper-100 transition"
              >
                Log In
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold px-4 py-2 rounded-xl text-xs transition shadow-sm"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
