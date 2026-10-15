'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Sparkles, BarChart3, BookOpen, RotateCcw } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Study Path',
      href: '/learn',
      icon: Compass,
      match: (p: string) => p.startsWith('/learn'),
    },
    {
      label: 'Today',
      href: '/today',
      icon: Sparkles,
      match: (p: string) => p === '/today' || p === '/challenge',
    },
    {
      label: 'Parent Hub',
      href: '/parent',
      icon: BarChart3,
      match: (p: string) => p.startsWith('/parent'),
    },
    {
      label: 'Subjects',
      href: '/catalogue',
      icon: BookOpen,
      match: (p: string) => p === '/catalogue' || p.startsWith('/subject'),
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-paper/95 backdrop-blur-lg border-t border-academic-border px-2 py-1.5 flex items-center justify-around shadow-lg"
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
                ? 'text-forest-950 font-bold'
                : 'text-forest-600 hover:text-forest-900 font-medium'
            }`}
          >
            <div
              className={`p-1 rounded-lg transition ${
                isActive ? 'bg-limeaccent text-forest-950 shadow-xs' : 'text-forest-600'
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
