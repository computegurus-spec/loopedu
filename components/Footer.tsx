import React from 'react';
import Link from 'next/link';
import { Mail, ShieldCheck, HeartHandshake, ExternalLink, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-200">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#168C83] text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                L
              </div>
              <span className="font-extrabold text-xl text-[#17324D] tracking-tight">
                LoopEdu
              </span>
            </Link>
            <p className="text-xs text-[#667085] leading-relaxed">
              A grounded guide to India&apos;s career pathways, competitive exam schedules, and consistent daily study habits for students and families.
            </p>
            <div className="text-xs text-[#667085] space-y-1 pt-1">
              <div className="font-semibold text-[#17324D]">Blocks and Loops technologies pvt ltd</div>
              <div>Bangalore, Karnataka, India</div>
              <div>Support: support@loopedu.in</div>
            </div>
          </div>

          {/* Tools & Planning */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#17324D]">
              Explore Tools
            </h4>
            <ul className="space-y-2 text-xs text-[#667085]">
              <li>
                <Link href="/paths" className="hover:text-[#168C83] transition">
                  Career &amp; Stream Planner
                </Link>
              </li>
              <li>
                <Link href="/paths" className="hover:text-[#168C83] transition">
                  College &amp; Cost Comparison
                </Link>
              </li>
              <li>
                <Link href="/exams" className="hover:text-[#168C83] transition">
                  Exam &amp; Opportunity Finder
                </Link>
              </li>
              <li>
                <Link href="/exams" className="hover:text-[#168C83] transition">
                  Deadline Watchlist &amp; Corrigenda
                </Link>
              </li>
              <li>
                <Link href="/prepare" className="hover:text-[#168C83] transition">
                  Study Planner &amp; Daily Practice
                </Link>
              </li>
              <li>
                <Link href="/prepare" className="hover:text-[#168C83] transition">
                  Practice &amp; Mistake Review
                </Link>
              </li>
              <li>
                <Link href="/coach" className="hover:text-[#168C83] transition">
                  Mind Coach (Habits &amp; Wellness)
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Coverage */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#17324D]">
              Coverage &amp; Updates
            </h4>
            <ul className="space-y-2 text-xs text-[#667085]">
              <li>
                <Link href="/updates" className="hover:text-[#168C83] transition">
                  Daily Education Briefing
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="hover:text-[#168C83] transition">
                  Subject Tracks &amp; Question Banks
                </Link>
              </li>
              <li>
                <Link href="/flashcards" className="hover:text-[#168C83] transition">
                  Formula Flashcard Decks
                </Link>
              </li>
              <li>
                <Link href="/mind-maps" className="hover:text-[#168C83] transition">
                  Interactive Concept Mind Maps
                </Link>
              </li>
              <li>
                <Link href="/parent" className="hover:text-[#168C83] transition">
                  Parent Observability Hub
                </Link>
              </li>
              <li>
                <a href="#coverage" className="hover:text-[#168C83] transition">
                  Classes 9–12 &amp; Graduate Tracks
                </a>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#17324D]">
              Trust &amp; Governance
            </h4>
            <ul className="space-y-2 text-xs text-[#667085]">
              <li>
                <Link href="/privacy" className="hover:text-[#168C83] transition">
                  Student Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#168C83] transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-[#168C83] transition">
                  Refund &amp; Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/settings/privacy" className="hover:text-[#168C83] transition">
                  Data Rights &amp; Self-Export
                </Link>
              </li>
              <li>
                <a href="mailto:corrections@loopedu.in" className="hover:text-[#168C83] transition">
                  Report a Factual Correction
                </a>
              </li>
              <li>
                <span className="text-[11px] text-slate-400">
                  Crisis Helplines: Tele-MANAS 14416 • KIRAN 1800-599-0019
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Disclaimer */}
        <div className="pt-8 text-[11px] text-[#667085] space-y-2 leading-relaxed">
          <p>
            LoopEdu is an independent educational guidance and practice platform developed by Blocks and Loops Technologies Pvt Ltd and is not officially affiliated with or endorsed by CBSE, NTA, NCERT, UPSC, or any state educational board. All examination names, syllabi titles, and official acronyms remain the intellectual property of their statutory administering bodies.
          </p>
          <p>
            LoopEdu is a product of <strong className="text-[#17324D]">Blocks and Loops technologies pvt ltd</strong> - Bangalore, Karnataka.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-slate-400">
            <div>© {new Date().getFullYear()} LoopEdu / Blocks and Loops Technologies Pvt Ltd. All rights reserved.</div>
            <div>Information-first guidance • Zero sponsored ranking bias • DPDP Act 2023 aligned</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
