'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, ShieldCheck, User, Sparkles, ChevronDown, Check } from 'lucide-react';

interface SessionInfo {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
}

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch session info
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setSession(data.user);
      })
      .catch(() => {});
  }, [pathname]);

  const switchRole = async (role: string) => {
    await fetch('/api/auth/switch-demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });
    window.location.reload();
  };

  const isCurrent = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-academic-border bg-paper/95 backdrop-blur-md">
      {/* Editorial review notice / launch banner */}
      <div className="bg-amber-100/90 text-amber-950 px-4 py-1.5 text-xs text-center font-medium border-b border-amber-200 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
        <span>
          Class 10 CBSE 2027 Question Banks • <strong>₹999 per subject</strong> • Independent practice material
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-forest-900 text-limeaccent flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-forest-800 transition">
            B
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-forest-700 font-semibold tracking-wider uppercase">itappens</span>
              <span className="text-xs text-forest-400">/</span>
              <span className="text-xs font-bold text-forest-900 bg-limeaccent/30 px-1.5 py-0.5 rounded text-[10px]">
                CBSE 2027
              </span>
            </div>
            <div className="font-serif font-bold text-forest-950 text-base leading-tight tracking-tight">
              BoardEdge AI
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-forest-800">
          <Link
            href="/catalogue"
            className={`transition hover:text-forest-950 ${
              isCurrent('/catalogue') ? 'text-forest-950 font-bold border-b-2 border-forest-900 pb-0.5' : ''
            }`}
          >
            Subjects & Pricing
          </Link>
          <Link
            href="/samples"
            className={`transition hover:text-forest-950 ${
              isCurrent('/samples') ? 'text-forest-950 font-bold border-b-2 border-forest-900 pb-0.5' : ''
            }`}
          >
            Free Samples
          </Link>
          <Link
            href="/#request"
            className="transition hover:text-forest-950"
          >
            Request Subject
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
        </nav>

        {/* Right side: Auth / Account / Demo Switcher */}
        <div className="flex items-center gap-3">
          <Link
            href="/catalogue"
            className="hidden sm:inline-flex items-center justify-center bg-limeaccent hover:bg-limeaccent-hover text-forest-950 font-bold px-4 py-2 rounded-lg text-xs tracking-wide transition shadow-sm"
          >
            Explore Subjects (₹999)
          </Link>

          {/* User & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-academic-border bg-white text-forest-900 text-xs font-medium hover:bg-forest-50 transition"
              aria-label="User account and demo switcher"
            >
              <div className="w-5 h-5 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center font-bold text-[10px]">
                {session?.role === 'admin' ? 'A' : 'S'}
              </div>
              <span className="hidden sm:inline max-w-[100px] truncate">
                {session ? session.name : 'Sign In'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-forest-500" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white border border-academic-border shadow-xl p-2 z-50 text-xs">
                <div className="px-3 py-2 border-b border-academic-border/60 mb-1">
                  <div className="font-semibold text-forest-950">{session?.name || 'Guest User'}</div>
                  <div className="text-academic-subtle truncate">{session?.email || 'Not signed in'}</div>
                  <div className="mt-1 inline-block px-1.5 py-0.5 rounded text-[10px] bg-forest-100 text-forest-800 font-semibold uppercase">
                    {session?.role === 'admin' ? 'Administrator' : 'Customer Account'}
                  </div>
                </div>

                <div className="p-1 space-y-1">
                  <Link
                    href="/library"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-forest-50 text-forest-900 transition"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-forest-700" />
                    <span>My Study Library</span>
                  </Link>

                  <Link
                    href="/admin"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-forest-50 text-forest-900 transition"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-forest-700" />
                    <span>Admin Dashboard</span>
                  </Link>
                </div>

                {/* Local Dev Role Switcher */}
                <div className="mt-2 pt-2 border-t border-academic-border/60 px-3 pb-1">
                  <div className="text-[10px] text-academic-subtle font-semibold uppercase tracking-wider mb-1.5">
                    Switch Test Account
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        switchRole('student');
                      }}
                      className="w-full text-left px-2 py-1.5 rounded hover:bg-forest-50 flex items-center justify-between text-forest-900"
                    >
                      <span>Student (Student Account)</span>
                      {session?.id?.includes('student') && <Check className="w-3 h-3 text-forest-700" />}
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        switchRole('parent');
                      }}
                      className="w-full text-left px-2 py-1.5 rounded hover:bg-forest-50 flex items-center justify-between text-forest-900"
                    >
                      <span>Parent (Parent Account)</span>
                      {session?.id?.includes('parent') && <Check className="w-3 h-3 text-forest-700" />}
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        switchRole('admin');
                      }}
                      className="w-full text-left px-2 py-1.5 rounded hover:bg-forest-50 flex items-center justify-between text-forest-900"
                    >
                      <span>Admin (Full Access)</span>
                      {session?.role === 'admin' && <Check className="w-3 h-3 text-forest-700" />}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
