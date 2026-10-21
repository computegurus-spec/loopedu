'use client';

import React, { useState, useEffect, Suspense } from 'react';
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
  Mail,
  Phone,
  Sparkles,
  GraduationCap,
  ArrowLeft,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get('redirect') || searchParams.get('returnTo') || '/study/cbse-10-science';
  const urlErrorDesc = searchParams.get('error_description');
  const urlErrorParam = searchParams.get('error');
  const urlError =
    urlErrorDesc ||
    (urlErrorParam === 'auth_failed'
      ? 'Auth0 authentication could not be completed on this domain. Please sign in directly below.'
      : urlErrorParam
      ? `Authentication error: ${urlErrorParam}`
      : null);

  // Two-step flow state: 'email' -> 'login' (existing user) | 'signup' (first time user) | 'forgot'
  const [step, setStep] = useState<'email' | 'login' | 'signup' | 'forgot'>('email');

  // Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [grade, setGrade] = useState('CBSE Class 10');
  const [showPassword, setShowPassword] = useState(false);

  // Status states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Auto-fill from query parameters if provided
  useEffect(() => {
    const qEmail = searchParams.get('email');
    if (qEmail) {
      setEmail(qEmail);
    }
  }, [searchParams]);

  // Step 1: Check Email
  const handleCheckEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError('Please enter your email address to get started.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      // If user typed username 'Sadish', allow direct jump to login
      if (cleanEmail.toLowerCase() === 'sadish') {
        setFullName('Sadish');
        setStep('login');
        return;
      }
      setError('Please enter a valid email address (e.g. name@gmail.com).');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });
      const data = await res.json();

      if (data.exists) {
        // User exists -> Show password login
        setFullName(data.name || '');
        setStep('login');
      } else {
        // User is first time -> Automatically convert to signup!
        setStep('signup');
        // Extract default name from email
        const guessedName = cleanEmail.split('@')[0].replace(/[._-]/g, ' ');
        setFullName(guessedName.charAt(0).toUpperCase() + guessedName.slice(1));
      }
    } catch (err: any) {
      // Fallback to login
      setStep('login');
    } finally {
      setLoading(false);
    }
  };

  // Step 2A: Sign In Existing User
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

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
          identifier: email.trim(),
          password: password.trim(),
          redirect: redirectUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials. Please verify your password.');
      }

      setSuccessMsg('Signed in successfully! Restoring your study progress...');
      setTimeout(() => {
        router.push(data.redirectUrl || redirectUrl);
        router.refresh();
      }, 500);
    } catch (err: any) {
      setError(err.message || 'Unable to sign in. Please try again.');
      setLoading(false);
    }
  };

  // Step 2B: Register First-Time User
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Please choose a password with at least 6 characters.');
      return;
    }
    if (confirmPassword && password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
          full_name: fullName.trim(),
          whatsapp_number: whatsapp.trim() || '9876543210',
          grade,
          redirect: redirectUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed.');
      }

      setSuccessMsg('Account created! Your data is saved in Supabase. Loading free practice sprint...');
      setTimeout(() => {
        router.push(data.redirectUrl || redirectUrl);
        router.refresh();
      }, 700);
    } catch (err: any) {
      setError(err.message || 'Unable to create account. Please try again.');
      setLoading(false);
    }
  };

  // Step 2C: Send Password Reset Link
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email) {
      setError('Please enter your registered email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch reset link.');
      }

      setSuccessMsg(data.message || `Reset link sent to ${email}. Check your inbox!`);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  const displayError = error || urlError;

  return (
    <div className="min-h-[82vh] flex items-center justify-center px-4 py-12 bg-paper-50/40">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex flex-col items-center gap-1 group mb-1">
            <div className="w-12 h-12 rounded-2xl bg-forest-900 text-limeaccent flex items-center justify-center font-serif font-bold text-2xl shadow-sm group-hover:bg-forest-800 transition">
              L
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-forest-700 bg-limeaccent/30 px-2 py-0.5 rounded-full mt-1">
              CBSE Class 10 Practice
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950">
            {step === 'signup'
              ? 'Create Your Free Account'
              : step === 'login'
              ? `Welcome Back${fullName ? `, ${fullName}` : ''}!`
              : step === 'forgot'
              ? 'Reset Your Password'
              : 'Sign In to LoopEdu'}
          </h1>
          <p className="text-xs sm:text-sm text-academic-subtle max-w-sm mx-auto">
            {step === 'signup'
              ? 'Even for free practice, an account is required so all your attempts, bookmarks, and achievements are saved.'
              : step === 'login'
              ? 'Enter your password to resume your practice sprint and mistake vault.'
              : step === 'forgot'
              ? 'Enter your registered email and we will send you a secure password reset link.'
              : 'Login or create your free account to access CBSE practice sets, Loopie AI doubts, and progress tracking.'}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white border border-academic-border p-6 sm:p-8 shadow-sm space-y-5 transition-all">
          {displayError && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-950 text-xs space-y-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{displayError}</span>
              </div>
            </div>
          )}

          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="font-medium leading-relaxed">{successMsg}</span>
            </div>
          )}

          {/* STEP 1: ENTER EMAIL (Check User) */}
          {step === 'email' && (
            <form onSubmit={handleCheckEmail} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-forest-950 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-academic-subtle absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    id="email"
                    type="text"
                    autoComplete="email"
                    required
                    autoFocus
                    placeholder="e.g. aarav.sharma@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-academic-border bg-paper-50/50 pl-10 pr-3.5 py-3 text-xs text-forest-950 placeholder:text-academic-subtle focus:bg-white focus:border-forest-800 focus:outline-none focus:ring-1 focus:ring-forest-800 transition"
                  />
                </div>
                <p className="text-[11px] text-academic-subtle mt-1.5">
                  We check if you already have an account or set up a new free account automatically.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold py-3.5 px-4 rounded-xl text-xs tracking-wider uppercase transition shadow-sm disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Checking account...</span>
                  </>
                ) : (
                  <>
                    <span>Continue with Email</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Direct Dev/Owner Fast Sign-In */}
              <div className="rounded-2xl bg-paper-50 border border-academic-border/70 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-forest-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-forest-700" />
                    Direct Admin Sign-In
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('Sadish');
                      setPassword('Sadish');
                      setStep('login');
                      setError('');
                    }}
                    className="text-[10px] font-mono font-bold uppercase tracking-wider text-forest-900 bg-limeaccent hover:bg-lime-400 px-2.5 py-1 rounded-md transition shadow-2xs"
                  >
                    ⚡ Fill Sadish
                  </button>
                </div>
                <p className="text-[11px] text-academic-subtle">
                  Instant admin login for testing with username <span className="font-mono font-bold text-forest-950">Sadish</span>.
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
                href={`/api/auth/login?returnTo=${encodeURIComponent(redirectUrl)}`}
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
          )}

          {/* STEP 2A: EXISTING USER -> LOGIN */}
          {step === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-forest-50/60 border border-forest-100">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Mail className="w-4 h-4 text-forest-700 shrink-0" />
                  <span className="text-xs font-semibold text-forest-950 truncate">{email}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep('email');
                    setPassword('');
                    setError('');
                  }}
                  className="text-[11px] text-forest-700 font-bold hover:underline shrink-0 ml-2"
                >
                  Change
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-forest-950">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('forgot');
                      setError('');
                    }}
                    className="text-[11px] text-academic-subtle hover:text-forest-950 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-academic-subtle absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    autoFocus
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-academic-border bg-paper-50/50 pl-10 pr-10 py-3 text-xs text-forest-950 placeholder:text-academic-subtle focus:bg-white focus:border-forest-800 focus:outline-none focus:ring-1 focus:ring-forest-800 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-academic-subtle hover:text-forest-950"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold py-3.5 px-4 rounded-xl text-xs tracking-wider uppercase transition shadow-sm disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In &amp; Resume Practice</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep('signup');
                    setError('');
                  }}
                  className="text-xs text-academic-subtle hover:text-forest-950 hover:underline"
                >
                  Need a new account? <span className="font-semibold text-forest-900">Sign up instead</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 2B: FIRST-TIME USER -> AUTO-CONVERT TO SIGNUP */}
          {step === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-3.5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-limeaccent/20 border border-limeaccent/40">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Sparkles className="w-4 h-4 text-forest-900 shrink-0" />
                  <span className="text-xs font-semibold text-forest-950 truncate">First time? Let's get you set up!</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep('email');
                    setError('');
                  }}
                  className="text-[11px] text-forest-800 font-bold hover:underline shrink-0 ml-2"
                >
                  Change email
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-forest-950 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-academic-subtle absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="e.g. Aarav Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-academic-border bg-paper-50/50 pl-10 pr-3.5 py-2.5 text-xs text-forest-950 focus:bg-white focus:border-forest-800 focus:outline-none focus:ring-1 focus:ring-forest-800 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-forest-950 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-academic-subtle absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="email"
                    disabled
                    value={email}
                    className="w-full rounded-xl border border-academic-border bg-slate-100 pl-10 pr-3.5 py-2.5 text-xs text-forest-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-forest-950 mb-1">
                    Board / Target
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-academic-subtle absolute left-3 top-3 pointer-events-none" />
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full rounded-xl border border-academic-border bg-paper-50/50 pl-8 pr-2 py-2.5 text-xs text-forest-950 focus:bg-white focus:outline-none"
                    >
                      <option value="CBSE Class 10">CBSE Class 10</option>
                      <option value="Class 10 ICSE">Class 10 ICSE</option>
                      <option value="Class 9 Foundation">Class 9 Foundation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-forest-950 mb-1">
                    WhatsApp (Parent Report)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-academic-subtle absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full rounded-xl border border-academic-border bg-paper-50/50 pl-8 pr-2 py-2.5 text-xs text-forest-950 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-forest-950 mb-1">
                  Create Password (min 6 chars)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-academic-subtle absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-academic-border bg-paper-50/50 pl-10 pr-10 py-2.5 text-xs text-forest-950 focus:bg-white focus:border-forest-800 focus:outline-none focus:ring-1 focus:ring-forest-800 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-academic-subtle hover:text-forest-950"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold py-3.5 px-4 rounded-xl text-xs tracking-wider uppercase transition shadow-sm disabled:opacity-50 mt-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving to Supabase &amp; Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account &amp; Start Free Practice →</span>
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setStep('login');
                    setError('');
                  }}
                  className="text-xs text-academic-subtle hover:text-forest-950 hover:underline"
                >
                  Already have a password? <span className="font-semibold text-forest-900">Sign in here</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 2C: FORGOT PASSWORD -> DISPATCH RESET LINK */}
          {step === 'forgot' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep('login')}
                  className="p-1 rounded-lg hover:bg-paper-100 text-forest-900 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-forest-950">Back to Sign In</span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-forest-950 mb-1.5">
                  Your Registered Email ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-academic-subtle absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="Enter registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-academic-border bg-paper-50/50 pl-10 pr-3.5 py-3 text-xs text-forest-950 focus:bg-white focus:border-forest-800 focus:outline-none transition"
                  />
                </div>
                <p className="text-[11px] text-academic-subtle mt-1.5">
                  We will send a password reset verification link to this address.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold py-3.5 px-4 rounded-xl text-xs tracking-wider uppercase transition shadow-sm disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Send Password Reset Link</span>
                  </>
                )}
              </button>
            </form>
          )}

          <div className="border-t border-academic-border/70 pt-4 text-center text-xs text-academic-subtle">
            Looking for all 8 subjects &amp; full question bank?{' '}
            <Link href="/catalogue" className="text-forest-950 font-bold hover:underline">
              View Subjects (₹299/mo) →
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
