import React from 'react';
import { Metadata } from 'next';
import { MindMapViewer } from '@/components/mindmaps/MindMapViewer';
import { GitBranch, Layers, BookOpen, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Interactive Mind Maps & Visual Knowledge Hierarchy | LoopEdu',
  description:
    'Visual concept maps for CBSE & ICSE subjects. Master dependencies, key formulas, and chapter trees at a glance.',
};

export default function MindMapsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
              KNOWLEDGE VISUALIZATION ENGINE
            </span>
            <span className="text-[10px] font-mono text-zinc-500">•</span>
            <span className="text-[10px] font-mono text-zinc-400">NCERT 2026-2027 STANDARDS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive Concept Mind Maps
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
            Understand how chapters link together. Inspect formulas, view high-yield board recurrence notes, and launch focused practice on any subtopic node.
          </p>
        </div>

        {/* Mind Map Viewer Component */}
        <MindMapViewer />
      </div>
    </div>
  );
}
