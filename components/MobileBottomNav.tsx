'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Compass, Award, BookOpen, HeartHandshake } from 'lucide-react';
import { useDemo } from '@/lib/demo/DemoContext';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { isDemo } = useDemo();

  // Hide on public landing page and focused study question views
  if (pathname === '/' || pathname.startsWith('/study/')) {
    return null;
  }

  const navItems = [
    {
      label: 'Today',
      href: '/today',
      icon: Sparkles,
      match: (p: string) => p === '/today' || p === '/learn',
    },
    {
      label: 'My Paths',
      href: '/paths',
      icon: Compass,
      match: (p: string) => p.startsWith('/paths') || p.startsWith('/consultant'),
    },
    {
      label: 'Exams',
      href: '/exams',
      icon: Award,
      match: (p: string) => p.startsWith('/exams'),
    },
    {
      label: 'Prepare',
      href: '/prepare',
      icon: BookOpen,
      match: (p: string) => p.startsWith('/prepare') || p.startsWith('/study'),
    },
    {
      label: 'Coach',
      href: '/coach',
      icon: HeartHandshake,
      match: (p: string) => p.startsWith('/coach'),
    },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-2 py-1.5 flex items-center justify-around"
    >
      {navItems.map((item) => {
        const isActive = item.match(pathname);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-semibold transition ${
              isActive
                ? 'text-teal-700 font-bold bg-teal-50'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-teal-700' : 'text-slate-400'}`} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
