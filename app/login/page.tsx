'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlErrorDesc = searchParams.get('error_description');
  const urlErrorParam = searchParams.get('error');
  const urlError =
    urlErrorDesc ||
    (urlErrorParam === 'auth_failed'
      ? 'Auth0 authentication could not be completed on this domain. Please sign in directly below (username: Sadish, password: Sadish).'
      : urlErrorParam
      ? `Authentication error: ${urlErrorParam}`
      : null);

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const displayError = error || urlError;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier) {
      setError('Please enter your username or email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: identifier.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials. Please try again.');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(data.redirectUrl || '/learn');
        router.refresh();
      }, 500);
    } catch (err: any) {
      setError(err.message || 'Unable to sign in.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[78vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex flex-col items-center gap-1 group mb-1">
            <div className="w-11 h-11 rounded-2xl bg-forest-900 text-limeaccent flex items-center justify-center font-serif font-bold text-xl shadow-sm group-hover:bg-forest-800 transition">
              L
            </div>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-forest-600">
              BETA
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950">
            Welcome back to LoopEdu
          </h1>
          <p className="text-xs sm:text-sm text-academic-subtle max-w-xs mx-auto">
            Sign in to continue your Daily Five streak, review your mistake vault, and access study dossiers.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white border border-academic-border p-6 sm:p-8 shadow-sm space-y-5">
          {displayError && (
            <div className="p-4 rounded-2xl bg-red-50/90 border border-red-200 text-red-950 text-xs space-y-2.5">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{displayError}</span>
              </div>
              <div className="pt-2 border-t border-red-200/60 flex items-center justify-between">
                <span className="text-[11px] text-red-900 font-semibold">Sign in directly without Auth0:</span>
                <button
                  type="button"
                  onClick={() => {
                    setIdentifier('Sadish');
                    setPassword('Sadish');
                    setError('');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-forest-900 text-limeaccent text-[10px] font-mono font-bold tracking-wider uppercase hover:bg-forest-800 transition shadow-2xs"
                >
                  ⚡ Fill Sadish
                </button>
              </div>
            </div>
          )}

          {success && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Signed in successfully! Loading your study path...</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="identifier"
                className="block text-xs font-semibold uppercase tracking-wider text-forest-950 mb-1.5"
              >
                Username or Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-academic-subtle absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  id="identifier"
                  type="text"
                  autoComplete="username"
                  required
                  placeholder="e.g. Sadish or you@example.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full rounded-xl border border-academic-border bg-paper-50/50 pl-10 pr-3.5 py-2.5 text-xs text-forest-950 placeholder:text-academic-subtle focus:bg-white focus:border-forest-800 focus:outline-none focus:ring-1 focus:ring-forest-800 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-forest-950"
                >
                  Password
                </label>
                <Link
                  href="/contact"
                  className="text-[11px] text-academic-subtle hover:text-forest-950 hover:underline"
                >
                  Need help?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-academic-subtle absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-academic-border bg-paper-50/50 pl-10 pr-3.5 py-2.5 text-xs text-forest-950 placeholder:text-academic-subtle focus:bg-white focus:border-forest-800 focus:outline-none focus:ring-1 focus:ring-forest-800 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full inline-flex items-center justify-center gap-2 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold py-3 px-4 rounded-xl text-xs tracking-wider uppercase transition shadow-sm disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Direct Sign-in Helper Box */}
            <div className="rounded-2xl bg-paper-50 border border-academic-border/80 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-forest-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-forest-700" />
                  Direct Sign-In (No Auth0 Required)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIdentifier('Sadish');
                    setPassword('Sadish');
                    setError('');
                  }}
                  className="text-[10px] font-mono font-bold uppercase tracking-wider text-forest-900 bg-limeaccent hover:bg-lime-400 px-2 py-1 rounded-md transition shadow-2xs"
                >
                  ⚡ Fill Sadish
                </button>
              </div>
              <p className="text-[11px] text-academic-subtle leading-relaxed">
                Enter username <span className="font-mono font-semibold text-forest-950">Sadish</span> &amp; password <span className="font-mono font-semibold text-forest-950">Sadish</span> for immediate Super Admin &amp; Pro access.
              </p>
            </div>

            {/* Social / Auth0 Login Option */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-academic-border" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-wider">
                <span className="bg-white px-2 text-academic-subtle">Or continue with</span>
              </div>
            </div>

            <a
              href="/api/auth/login"
              className="w-full inline-flex items-center justify-center gap-2.5 bg-paper-50 hover:bg-paper-100 border border-academic-border text-forest-950 font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-2xs group"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google / Auth0</span>
            </a>
          </form>

          <div className="border-t border-academic-border/70 pt-4 text-center text-xs text-academic-subtle">
            Don't have an active subscription?{' '}
            <Link href="/catalogue" className="text-forest-950 font-bold hover:underline">
              Choose your subject (₹299/mo) →
            </Link>
          </div>
        </div>

        <div className="text-center text-xs text-academic-subtle">
          <Link href="/" className="hover:text-forest-950 hover:underline">
            ← Back to LoopEdu Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[78vh] flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-forest-800" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
