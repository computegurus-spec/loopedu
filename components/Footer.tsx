import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                L
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                LoopEdu
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Authentic, rigorous CBSE practice platform. Built by educators for students and teachers.
            </p>
            <div className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} LoopEdu / Blocks and Loops Technologies Pvt Ltd.
            </div>
          </div>

          {/* Col 1: Get Started */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Get Started
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/study/cbse-10-science" className="hover:text-white transition">
                  Free 10-Q Sprint
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="hover:text-white transition">
                  Subject Library
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition">
                  Student & Teacher Login
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="hover:text-white transition">
                  Create Free Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: For Students */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              For Students
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/explore/for-students" className="hover:text-white transition">
                  Self-Paced Mastery
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-white transition">
                  15-Min Daily Five
                </Link>
              </li>
              <li>
                <Link href="/challenge" className="hover:text-white transition">
                  Mistake Comeback Loop
                </Link>
              </li>
              <li>
                <Link href="/#time-machine" className="hover:text-white transition">
                  10-Year Recurrence Heatmap
                </Link>
              </li>
              <li>
                <Link href="/parent" className="hover:text-white transition">
                  Parent Observability Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: For Teachers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
              For Teachers
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/explore/for-teachers" className="hover:text-white transition">
                  Educator Overview
                </Link>
              </li>
              <li>
                <Link href="/explore/for-teachers" className="hover:text-white transition">
                  Classroom Question Banks
                </Link>
              </li>
              <li>
                <Link href="/explore/for-teachers" className="hover:text-white transition">
                  Unit Test Generator
                </Link>
              </li>
              <li>
                <Link href="/explore/for-teachers" className="hover:text-white transition">
                  Step-by-Step Marking Rubrics
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Institutional Pilot Request
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policy */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  Editorial Methodology
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-white transition">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Disclaimer (Albert.io format) */}
        <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-500 space-y-2">
          <p>
            CBSE®, Central Board of Secondary Education, and NCERT® are registered trademarks and educational bodies in India. LoopEdu is an independent educational technology platform developed by Blocks and Loops Technologies Pvt Ltd and is not officially affiliated with or endorsed by the CBSE or NCERT.
          </p>
          <p>
            All questions and worked step-by-step model explanations are prepared independently in accordance with the official Class 10 curriculum and competency-based assessment guidelines. LoopEdu is a product of <strong className="text-forest-950">itappens.ai</strong> | <strong className="text-forest-950">Blocks and Loops technologies pvt ltd</strong> - Bangalore, Karnataka.
          </p>
        </div>
      </div>
    </footer>
  );
};
