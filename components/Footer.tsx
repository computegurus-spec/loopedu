'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0066FF] text-white flex items-center justify-center font-bold text-sm shadow-2xs">
              L
            </div>
            <span className="font-extrabold text-xl text-slate-950 tracking-tight">
              LoopEdu
            </span>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} LoopEdu / Blocks and Loops Technologies Pvt Ltd.
          </div>
        </div>

        {/* Bottom Legal Disclaimer */}
        <div className="pt-8 border-t border-slate-200 text-[11px] text-slate-500 space-y-2">
          <p>
            LoopEdu is an independent educational technology platform developed by Blocks and Loops Technologies Pvt Ltd and is not officially affiliated to any educational board.
          </p>
          <p>
            LoopEdu is a product of <strong className="text-slate-900">Blocks and Loops technologies pvt ltd</strong> - Bangalore, Karnataka.
          </p>
        </div>
      </div>
    </footer>
  );
};
