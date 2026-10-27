'use client';

import React from 'react';
import Link from 'next/link';

export function EnterpriseFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Statutory Emergency Helpline Ribbon */}
      <div className="bg-slate-900 border-b border-slate-800/80 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-300 font-bold">Government of India Statutory Helplines (24x7 Toll-Free):</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <span>Tele-MANAS (Mental Health): <strong className="text-emerald-400">14416</strong></span>
            <span>KIRAN (Psychological Support): <strong className="text-emerald-400">1800-599-0019</strong></span>
            <span>Childline: <strong className="text-emerald-400">1098</strong></span>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Col 1: Corporate Identity & Trust */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-extrabold text-base shadow-lg">
              L
            </div>
            <span className="font-black text-lg text-white tracking-tight">
              LoopEdu Enterprise
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            India’s intelligent, autonomous exam and career intelligence platform. Built on statutory gazette clarity, declarative AST eligibility, active diagnostic habits, and transparent unbundled pricing.
          </p>

          <div className="pt-2 space-y-1.5 text-[11px] text-slate-500">
            <div>Operated by <strong>Blocks and Loops Technologies Pvt Ltd</strong></div>
            <div>Bangalore • New Delhi • Hyderabad, India</div>
            <div className="text-emerald-400 font-medium">✓ 100% Ad-Free for Minors • DPDP Act 2023 Certified</div>
          </div>
        </div>

        {/* Col 2: Exam & Career Tracks */}
        <div className="space-y-3">
          <div className="font-bold uppercase tracking-wider text-slate-200 text-[11px]">
            National Exam Tracks
          </div>
          <ul className="space-y-2 text-slate-400">
            <li>
              <Link href="/exams#jee-main" className="hover:text-emerald-400 transition">
                IIT JEE Main & Advanced
              </Link>
            </li>
            <li>
              <Link href="/exams#neet-ug" className="hover:text-emerald-400 transition">
                NEET UG (Medical)
              </Link>
            </li>
            <li>
              <Link href="/exams#upsc-cse" className="hover:text-emerald-400 transition">
                UPSC Civil Services (IAS)
              </Link>
            </li>
            <li>
              <Link href="/exams#ssc-cgl" className="hover:text-emerald-400 transition">
                SSC CGL & Combined
              </Link>
            </li>
            <li>
              <Link href="/exams#banking-ibps" className="hover:text-emerald-400 transition">
                Banking (IBPS & SBI PO)
              </Link>
            </li>
            <li>
              <Link href="/exams#rrb-ntpc" className="hover:text-emerald-400 transition">
                Railways (RRB NTPC)
              </Link>
            </li>
            <li>
              <Link href="/exams#cuet-ug" className="hover:text-emerald-400 transition">
                CUET UG & PG
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Platform Tools */}
        <div className="space-y-3">
          <div className="font-bold uppercase tracking-wider text-slate-200 text-[11px]">
            Intelligence Tools
          </div>
          <ul className="space-y-2 text-slate-400">
            <li>
              <Link href="/paths" className="hover:text-emerald-400 transition">
                3-Pathway Career Comparison
              </Link>
            </li>
            <li>
              <Link href="/exams" className="hover:text-emerald-400 transition">
                Declarative AST Eligibility Checker
              </Link>
            </li>
            <li>
              <Link href="/prepare" className="hover:text-emerald-400 transition">
                Progressive Socratic Practice
              </Link>
            </li>
            <li>
              <Link href="/coach" className="hover:text-emerald-400 transition">
                Mind Coach (25/5 Pomodoro)
              </Link>
            </li>
            <li>
              <Link href="/updates" className="hover:text-emerald-400 transition">
                Statutory Daily Digest
              </Link>
            </li>
            <li>
              <Link href="/parent" className="hover:text-emerald-400 transition">
                Parent Hub & Milestone Tracker
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-emerald-400 transition">
                Official Gazette Registry
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Compliance, Legal & Data Rights */}
        <div className="space-y-3">
          <div className="font-bold uppercase tracking-wider text-slate-200 text-[11px]">
            Data Rights & DPDP 2023
          </div>
          <ul className="space-y-2 text-slate-400">
            <li>
              <Link href="/settings/privacy" className="hover:text-emerald-400 transition">
                DPDP 2023 Privacy Rights
              </Link>
            </li>
            <li>
              <Link href="/settings/privacy" className="hover:text-emerald-400 transition">
                Sanitized Personal Data Export (CSV)
              </Link>
            </li>
            <li>
              <Link href="/settings/privacy" className="hover:text-emerald-400 transition">
                Idempotent 30-Day Account Erasure
              </Link>
            </li>
            <li>
              <Link href="/settings/billing" className="hover:text-emerald-400 transition">
                Transparent Pricing & Cancellation
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-emerald-400 transition">
                Statutory Grievance Redressal
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-emerald-400 transition">
                AI Budget & Telemetry Controls
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal Attribution & Trademark Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 text-center md:text-left">
          <div>
            © {new Date().getFullYear()} Blocks and Loops Technologies Pvt Ltd. All rights reserved.
          </div>
          <div className="max-w-xl text-[10px] leading-relaxed">
            Statutory Disclaimer: LoopEdu is an independent educational technology and career companion platform. All exam names, logos, and conducting body acronyms (NTA, UPSC, SSC, IBPS, RRB, CBSE, KEA) are property of their respective regulatory bodies. LoopEdu Mind Coach is a non-clinical wellness companion.
          </div>
        </div>
      </div>
    </footer>
  );
}
