'use client';

import React from 'react';

const TESTIMONIALS = [
  {
    quote:
      'Every coaching center told me to take a drop year when my JEE mock percentiles hovered at 88. LoopEdu mapped a parallel Biomedical Devices pathway at a state engineering college that cost ₹6.5 Lakhs less. I am now in my second year, thriving with zero regret.',
    author: 'Aarav Sharma',
    role: 'Student, Now B.Tech Biomedical Engineering',
    location: 'Bengaluru, Karnataka',
    badge: 'Verified Career Pathway',
  },
  {
    quote:
      'Working a 9-to-6 job in logistics, I had no time to watch 3-hour coaching videos. LoopEdu’s 15-minute diagnostic drills and spaced repetition mistake notebook kept my Quant and Reasoning sharp. Cleared IBPS PO Prelims with confidence.',
    author: 'Priya Nair',
    role: 'Adult Aspirant, Banking & Insurance',
    location: 'Kochi, Kerala',
    badge: 'Verified Practice Routine',
  },
  {
    quote:
      'As a parent, the biggest relief was not getting 20 telemarketing calls every week just because we looked at exam dates. The unbundled cost calculator showed us hostel, tuition, and living costs honestly. It gave our family real clarity.',
    author: 'Rajesh Sharma',
    role: 'Parent of Class 11 Aspirant',
    location: 'Jaipur, Rajasthan',
    badge: 'Parent Hub Verified',
  },
];

export function EnterpriseTestimonials() {
  return (
    <section className="py-16 lg:py-24 bg-slate-900/40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Real Student & Aspirant Impact
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Real Competence, Not Coaching Hype
          </h2>
          <p className="text-sm text-slate-400">
            Hear how Indian students, adult aspirants, and parents find peace of mind, financial transparency, and daily discipline with LoopEdu.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-slate-950 border border-slate-800 p-8 flex flex-col justify-between space-y-6 relative hover:border-slate-700 transition"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {t.badge}
                  </span>
                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="font-bold text-white text-sm">{t.author}</div>
                <div className="text-xs text-slate-400">{t.role}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{t.location}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
