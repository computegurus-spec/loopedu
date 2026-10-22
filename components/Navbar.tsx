'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShieldCheck,
  ChevronDown,
  LogOut,
  Terminal,
  Activity,
  Layers,
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
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md text-zinc-100">
      {/* Telemetry micro-ribbon */}
      {!pathname.startsWith('/study/') && (
        <div className="bg-zinc-900/90 text-zinc-400 px-4 py-1 text-[11px] font-mono border-b border-zinc-800/80 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-300">SWARM_TELEMETRY: ONLINE</span>
              <span className="hidden sm:inline text-zinc-600">|</span>
              <span className="hidden sm:inline text-zinc-400">AGI ARCHITECT ENGINE ACTIVE</span>
            </div>
            <div className="flex items-center gap-3 tabular-nums">
              <span className="text-zinc-500 hidden md:inline">LATENCY: 12ms</span>
              <span className="text-emerald-400 font-semibold">NCERT / BOARD VERIFIED</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-950 flex items-center justify-center font-bold text-sm tracking-wider font-mono group-hover:bg-white transition">
            LP
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-zinc-100 text-base leading-none tracking-tight">
                LoopEdu
              </span>
              <span className="px-1.5 py-0.2 rounded border border-zinc-800 bg-zinc-900 text-[10px] font-mono text-zinc-400">
                AGI_v2.4
              </span>
            </div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 mt-1">
              Mission Control
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-zinc-400">
          {user ? (
            <>
              <Link
                href="/learn"
                className={`transition hover:text-zinc-100 flex items-center gap-1.5 ${
                  isCurrent('/learn') ? 'text-zinc-100 font-bold border-b border-zinc-200 pb-0.5' : ''
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Command Center</span>
              </Link>
              <Link
                href="/my-subjects"
                className={`transition hover:text-zinc-100 flex items-center gap-1.5 ${
                  isCurrent('/my-subjects') || isCurrent('/library') ? 'text-zinc-100 font-bold border-b border-zinc-200 pb-0.5' : ''
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Active Tracks</span>
              </Link>
              <Link
                href="/progress"
                className={`transition hover:text-zinc-100 flex items-center gap-1.5 ${
                  isCurrent('/progress') ? 'text-zinc-100 font-bold border-b border-zinc-200 pb-0.5' : ''
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span>Telemetry HUD</span>
              </Link>
              <Link
                href="/catalogue"
                className={`transition hover:text-zinc-100 ${
                  isCurrent('/catalogue') ? 'text-zinc-100 font-bold border-b border-zinc-200 pb-0.5' : ''
                }`}
              >
                Curriculums
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/#architecture"
                className="transition hover:text-zinc-100 flex items-center gap-1"
              >
                <Cpu className="w-3.5 h-3.5 text-zinc-500" />
                <span>Agent Architecture</span>
              </Link>

              <Link
                href="/#intake"
                className="transition hover:text-zinc-100 flex items-center gap-1"
              >
                <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                <span>Dynamic Intake</span>
              </Link>

              <Link
                href="/catalogue"
                className={`transition hover:text-zinc-100 ${
                  isCurrent('/catalogue') ? 'text-zinc-100 font-bold' : ''
                }`}
              >
                Official Standards
              </Link>

              <Link
                href="/catalogue#pricing"
                className="transition hover:text-zinc-100"
              >
                Compute Access
              </Link>
            </>
          )}
        </nav>

        {/* Right side: Auth & Telemetry Controls */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-zinc-800 bg-zinc-900/90 text-zinc-200 text-xs font-mono hover:bg-zinc-800 transition"
                aria-label="User account dropdown"
              >
                <div className="w-5 h-5 rounded bg-zinc-200 text-zinc-950 flex items-center justify-center font-bold text-[10px]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-zinc-200 max-w-[120px] truncate">
                  {user.name}
                </span>
                {isPro && (
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold text-[9px] px-1 py-0.2 rounded font-mono">
                    PRO
                  </span>
                )}
                <ChevronDown className="w-3 h-3 text-zinc-500" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl p-2 z-50 text-xs font-mono animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2.5 border-b border-zinc-800 mb-1">
                    <div className="font-bold text-zinc-100 text-sm">{user.name}</div>
                    <div className="text-zinc-400 text-[11px] truncate">{user.email}</div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="inline-block px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-zinc-800 text-zinc-300 border border-zinc-700">
                        {user.role === 'admin' ? 'SYSTEM_ROOT' : isPro ? 'COMPUTE_PRO' : 'STUDENT_AGENT'}
                      </span>
                    </div>
                  </div>

                  <div className="p-1 space-y-1">
                    <Link
                      href="/learn"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-800 text-zinc-200 transition"
                    >
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Mission Control</span>
                    </Link>

                    <Link
                      href="/my-subjects"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-800 text-zinc-200 transition"
                    >
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Active Tracks</span>
                    </Link>

                    <Link
                      href="/progress"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-800 text-zinc-200 transition"
                    >
                      <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Telemetry HUD</span>
                    </Link>

                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-800 text-amber-400 transition"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Root Admin Console</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition border-t border-zinc-800 mt-1 pt-2"
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
                className="text-xs font-mono text-zinc-400 hover:text-zinc-100 px-3 py-1.5 rounded-lg hover:bg-zinc-900 transition"
              >
                Log In
              </Link>
              <Link
                href="/initialize"
                className="inline-flex items-center gap-1.5 bg-zinc-100 hover:bg-white text-zinc-950 font-mono font-bold px-3.5 py-1.5 rounded-lg text-xs transition shadow-sm"
              >
                <Terminal className="w-3.5 h-3.5 text-zinc-950" />
                <span>Initialize Agent →</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
