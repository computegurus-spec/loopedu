'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-950 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
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
