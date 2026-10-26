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
  Compass,
  Sparkles,
  Calendar,
  HeartHandshake,
  Bell,
  Settings,
  CreditCard,
  UserCheck,
  Award,
  Users,
  Menu,
  X,
} from 'lucide-react';
import { useDemo } from '@/lib/demo/DemoContext';

interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  personaRole?: string;
  isPro?: boolean;
}

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isDemo, activePersona } = useDemo();
  const [liveUser, setLiveUser] = useState<SessionUser | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setLiveUser(data.user);
        } else {
          setLiveUser(null);
        }
      })
      .catch(() => {
        setLiveUser(null);
      });
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setLiveUser(null);
    setDropdownOpen(false);
    router.push('/');
    router.refresh();
  };

  const isCurrent = (path: string) => pathname === path || pathname.startsWith(path + '/');

  const isLandingPage = pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // In demo mode, activePersona provides the authenticated persona only for app routes
  const currentUser = isLandingPage
    ? null
    : isDemo
    ? {
        id: activePersona.id,
        name: activePersona.name,
        email: activePersona.email,
        role: activePersona.role === 'admin' || activePersona.role === 'reviewer' ? ('admin' as const) : ('customer' as const),
        personaRole: activePersona.role,
        isPro: true,
      }
    : liveUser;

  const isAdminOrReviewer =
    currentUser?.role === 'admin' ||
    currentUser?.personaRole === 'admin' ||
    currentUser?.personaRole === 'reviewer';

  const isParent = currentUser?.personaRole === 'parent';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md text-slate-900 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#168C83] text-white flex items-center justify-center font-bold text-base tracking-tight shadow-sm group-hover:bg-[#12736b] transition relative">
            <span>L</span>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-[#17324D] text-xl leading-none tracking-tight">
              LoopEdu
            </span>
            <span className="text-[10px] text-[#667085] font-medium">India Exam &amp; Career Companion</span>
          </div>
        </Link>

        {/* Public Navigation on Landing Page vs Application Navigation on App Pages */}
        {isLandingPage ? (
          <nav className="hidden md:flex items-center gap-7 text-xs text-[#667085] font-semibold">
            <a
              href="#tools"
              className="transition hover:text-[#17324D] py-1 text-slate-700 hover:font-bold"
            >
              Tools
            </a>
            <a
              href="#how-it-works"
              className="transition hover:text-[#17324D] py-1 text-slate-700 hover:font-bold"
            >
              How it works
            </a>
            <a
              href="#coverage"
              className="transition hover:text-[#17324D] py-1 text-slate-700 hover:font-bold"
            >
              Coverage
            </a>
            <a
              href="#updates"
              className="transition hover:text-[#17324D] py-1 text-slate-700 hover:font-bold"
            >
              Updates
            </a>
            <a
              href="#pricing"
              className="transition hover:text-[#17324D] py-1 text-slate-700 hover:font-bold"
            >
              Pricing
            </a>
          </nav>
        ) : (
          <nav className="hidden lg:flex items-center gap-5 text-xs text-slate-600 font-semibold">
            <Link
              href="/today"
              className={`transition hover:text-slate-950 flex items-center gap-1.5 py-1 ${
                isCurrent('/today') ? 'text-teal-700 font-bold border-b-2 border-teal-600' : ''
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Today</span>
            </Link>

            <Link
              href="/paths"
              className={`transition hover:text-slate-950 flex items-center gap-1.5 py-1 ${
                isCurrent('/paths') || isCurrent('/consultant') ? 'text-teal-700 font-bold border-b-2 border-teal-600' : ''
              }`}
            >
              <Compass className="w-4 h-4 text-teal-600" />
              <span>My Paths</span>
            </Link>

            <Link
              href="/exams"
              className={`transition hover:text-slate-950 flex items-center gap-1.5 py-1 ${
                isCurrent('/exams') ? 'text-teal-700 font-bold border-b-2 border-teal-600' : ''
              }`}
            >
              <Award className="w-4 h-4 text-blue-600" />
              <span>Exams &amp; Opportunities</span>
            </Link>

            <Link
              href="/prepare"
              className={`transition hover:text-slate-950 flex items-center gap-1.5 py-1 ${
                isCurrent('/prepare') || pathname.startsWith('/study') ? 'text-teal-700 font-bold border-b-2 border-teal-600' : ''
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Prepare</span>
            </Link>

            <Link
              href="/updates"
              className={`transition hover:text-slate-950 flex items-center gap-1.5 py-1 ${
                isCurrent('/updates') ? 'text-teal-700 font-bold border-b-2 border-teal-600' : ''
              }`}
            >
              <Bell className="w-4 h-4 text-indigo-600" />
              <span>Updates</span>
            </Link>

            <Link
              href="/coach"
              className={`transition hover:text-slate-950 flex items-center gap-1.5 py-1 ${
                isCurrent('/coach') ? 'text-teal-700 font-bold border-b-2 border-teal-600' : ''
              }`}
            >
              <HeartHandshake className="w-4 h-4 text-rose-500" />
              <span>Mind Coach</span>
            </Link>

            {isParent && (
              <Link
                href="/parent"
                className={`transition hover:text-slate-950 flex items-center gap-1.5 py-1 ${
                  isCurrent('/parent') ? 'text-teal-700 font-bold border-b-2 border-teal-600' : ''
                }`}
              >
                <Users className="w-4 h-4 text-cyan-600" />
                <span>Parent Hub</span>
              </Link>
            )}

            {isAdminOrReviewer && (
              <Link
                href="/admin"
                className={`transition hover:text-slate-950 flex items-center gap-1.5 py-1 ${
                  isCurrent('/admin') ? 'text-amber-800 font-bold border-b-2 border-amber-600' : ''
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Editorial Console</span>
              </Link>
            )}
          </nav>
        )}

        {/* Right side: Auth Controls & Actions */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold hover:bg-slate-100 transition shadow-2xs"
                aria-label="User account dropdown"
              >
                <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-slate-900 font-bold text-xs max-w-[120px] truncate leading-tight">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium leading-none">
                    {currentUser.personaRole ? currentUser.personaRole.toUpperCase() : 'STUDENT'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-1" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                    <div className="font-bold text-slate-900 text-sm">{currentUser.name}</div>
                    <div className="text-slate-500 text-[11px] truncate">{currentUser.email}</div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                        {isDemo ? 'SYNTHETIC DEMO PERSONA' : 'AUTHENTICATED USER'}
                      </span>
                    </div>
                  </div>

                  <div className="p-1 space-y-0.5">
                    <Link
                      href="/today"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-medium transition"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Today's Habit &amp; Briefing</span>
                    </Link>

                    <Link
                      href="/paths"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-medium transition"
                    >
                      <Compass className="w-4 h-4 text-teal-600" />
                      <span>My 3 Career Paths</span>
                    </Link>

                    <Link
                      href="/exams"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-medium transition"
                    >
                      <Award className="w-4 h-4 text-blue-600" />
                      <span>Exams Watchlist &amp; Rules</span>
                    </Link>

                    <Link
                      href="/prepare"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-medium transition"
                    >
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      <span>Practice &amp; Mistake Notebook</span>
                    </Link>

                    <Link
                      href="/coach"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-medium transition"
                    >
                      <HeartHandshake className="w-4 h-4 text-rose-500" />
                      <span>Private Mind Coach</span>
                    </Link>

                    <Link
                      href="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-medium transition border-t border-slate-100 mt-1 pt-2"
                    >
                      <Settings className="w-4 h-4 text-slate-600" />
                      <span>Account &amp; Consent Settings</span>
                    </Link>

                    <Link
                      href="/settings/billing"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-medium transition"
                    >
                      <CreditCard className="w-4 h-4 text-slate-600" />
                      <span>Subscriptions &amp; Plans</span>
                    </Link>

                    {isAdminOrReviewer && (
                      <Link
                        href="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-amber-50 text-amber-900 font-semibold transition"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        <span>Admin &amp; Editorial Console</span>
                      </Link>
                    )}

                    {!isDemo && (
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition border-t border-slate-100 mt-1 pt-2 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/login"
                className="text-xs text-[#17324D] hover:text-[#168C83] font-semibold px-3 py-2 rounded-xl hover:bg-slate-100 transition"
              >
                Sign in
              </Link>
              <Link
                href="/paths"
                className="inline-flex items-center gap-1.5 bg-[#168C83] hover:bg-[#12736b] text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow-2xs active:scale-95"
              >
                <span>Get started</span>
              </Link>
              {isLandingPage && (
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer on Landing Page */}
      {isLandingPage && mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg text-xs animate-in fade-in duration-150">
          <a
            href="#tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-semibold text-[#17324D] hover:text-[#168C83]"
          >
            Tools
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-semibold text-[#17324D] hover:text-[#168C83]"
          >
            How it works
          </a>
          <a
            href="#coverage"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-semibold text-[#17324D] hover:text-[#168C83]"
          >
            Coverage
          </a>
          <a
            href="#updates"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-semibold text-[#17324D] hover:text-[#168C83]"
          >
            Updates
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-semibold text-[#17324D] hover:text-[#168C83]"
          >
            Pricing
          </a>
        </div>
      )}
    </header>
  );
};
