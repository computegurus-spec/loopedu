'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, BookOpen, GitBranch, RotateCcw, Compass } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  // Hide bottom navigation in study mode to avoid interface clutter
  if (pathname.startsWith('/study/')) {
    return null;
  }

  const navItems = [
    {
      label: 'Workspace',
      href: '/learn',
      icon: Activity,
      match: (p: string) => p === '/learn' || p === '/today',
    },
    {
      label: 'Questions',
      href: '/study/cbse-10-science',
      icon: BookOpen,
      match: (p: string) => p.startsWith('/study') || p.startsWith('/catalogue'),
    },
    {
      label: 'Mind Maps',
      href: '/mind-maps',
      icon: GitBranch,
      match: (p: string) => p.startsWith('/mind-maps'),
    },
    {
      label: 'Flashcards',
      href: '/flashcards',
      icon: RotateCcw,
      match: (p: string) => p.startsWith('/flashcards'),
    },
    {
      label: 'Advisory',
      href: '/consultant',
      icon: Compass,
      match: (p: string) => p.startsWith('/consultant'),
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-800 px-2 py-1 flex items-center justify-around shadow-2xl"
    >
      {navItems.map((item) => {
        const isActive = item.match(pathname);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg font-mono transition ${
              isActive
                ? 'text-zinc-100 font-bold'
                : 'text-zinc-500 hover:text-zinc-300 font-medium'
            }`}
          >
            <div
              className={`p-1 rounded-md transition ${
                isActive ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500'
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
