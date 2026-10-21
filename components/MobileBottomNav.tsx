'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Sparkles, BarChart3, BookOpen, RotateCcw } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  // Hide bottom navigation in study mode to avoid interface clutter and coach overlaps
  if (pathname.startsWith('/study/')) {
    return null;
  }

  const navItems = [
    {
      label: 'Home',
      href: '/learn',
      icon: Sparkles,
      match: (p: string) => p === '/learn' || p === '/today',
    },
    {
      label: 'My Subjects',
      href: '/my-subjects',
      icon: BookOpen,
      match: (p: string) => p.startsWith('/my-subjects') || p.startsWith('/library'),
    },
    {
      label: 'Explore',
      href: '/catalogue',
      icon: Compass,
      match: (p: string) => p === '/catalogue' || p.startsWith('/explore'),
    },
    {
      label: 'Progress',
      href: '/progress',
      icon: BarChart3,
      match: (p: string) => p.startsWith('/progress'),
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg"
    >
      {navItems.map((item) => {
        const isActive = item.match(pathname);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
              isActive
                ? 'text-blue-700 font-bold'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            <div
              className={`p-1 rounded-lg transition ${
                isActive ? 'bg-blue-50 text-blue-700 shadow-xs' : 'text-slate-500'
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
