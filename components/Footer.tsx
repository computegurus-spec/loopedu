import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-academic-border bg-paper-200/50 text-forest-900 mt-20 pb-16 sm:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-forest-900 text-limeaccent flex items-center justify-center font-bold text-sm">
                L
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg text-forest-950 leading-none">
                  LoopEdu <span className="text-xs font-sans text-forest-700 font-semibold">• loopedu.in</span>
                </span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-forest-600 mt-1">
                  BETA
                </span>
              </div>
            </div>
            <p className="text-xs text-academic-subtle max-w-md leading-relaxed">
              The 15-minute daily habit platform. The Daily Five questions, active recall Mistake Comeback, and real-time Parent Observability.
            </p>
            <div className="pt-2">
              <div className="inline-block bg-white/80 border border-academic-border rounded-lg px-3 py-2 text-xs text-forest-800">
                <strong>Pricing:</strong> ₹299/month per subject • Earn 10-year question bank milestone PDFs
              </div>
            </div>
          </div>

          {/* Practice Tracks */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-forest-950 mb-3">
              Practice Tracks
            </h4>
            <ul className="space-y-2 text-xs text-forest-800">
              <li>
                <Link href="/subject/maths-basic" className="hover:text-forest-950 hover:underline">
                  Mathematics (Basic)
                </Link>
              </li>
              <li>
                <Link href="/subject/maths-standard" className="hover:text-forest-950 hover:underline">
                  Mathematics (Standard)
                </Link>
              </li>
              <li>
                <Link href="/subject/science" className="hover:text-forest-950 hover:underline">
                  Science (Physics, Chem, Bio)
                </Link>
              </li>
              <li>
                <Link href="/subject/social-science" className="hover:text-forest-950 hover:underline">
                  Social Science
                </Link>
              </li>
              <li>
                <Link href="/subject/english-language-literature" className="hover:text-forest-950 hover:underline">
                  English (Language & Lit)
                </Link>
              </li>
              <li>
                <Link href="/subject/german" className="hover:text-forest-950 hover:underline">
                  German (Code 017)
                </Link>
              </li>
              <li>
                <Link href="/subject/artificial-intelligence" className="hover:text-forest-950 hover:underline">
                  Artificial Intelligence (417)
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="font-semibold text-forest-900 hover:underline">
                  View All 8 Tracks →
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-forest-950 mb-3">
              Information & Terms
            </h4>
            <ul className="space-y-2 text-xs text-forest-800">
              <li>
                <Link href="/about" className="hover:text-forest-950 hover:underline">
                  About Methodology
                </Link>
              </li>
              <li>
                <Link href="/samples" className="hover:text-forest-950 hover:underline">
                  Free Sample Questions
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-forest-950 hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-forest-950 hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-forest-950 hover:underline">
                  Refund & Access Terms
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-forest-950 hover:underline">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-academic-subtle hover:text-forest-950">
                  Staff / Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Independence Disclaimer Banner */}
        <div className="border-t border-academic-border/70 pt-6 mt-6">
          <div className="bg-white/60 border border-academic-border rounded-xl p-4 text-xs text-forest-800 leading-relaxed">
            <p className="font-bold text-forest-950 mb-1">Important Independence Statement:</p>
            <p>
              LoopEdu is an independent educational practice platform created by <strong>Blocks and Loops technologies pvt ltd</strong>. It is{' '}
              <strong>not affiliated with, authorized, or endorsed by the Central Board of Secondary Education (CBSE)</strong>{' '}
              or the National Council of Educational Research and Training (NCERT). Actual board exam questions, formats,
              and marking schemes may differ.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 text-xs text-academic-subtle">
            <div>
              © 2026–2027 LoopEdu. All rights reserved. • loopedu.in
            </div>
            <div className="font-medium text-forest-800 text-center sm:text-right">
              a product of <strong className="text-forest-950">itappens.ai</strong> | <strong className="text-forest-950">Blocks and Loops technologies pvt ltd</strong> - Bangalore, Karnataka
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
