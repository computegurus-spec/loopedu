'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GitBranch,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Maximize2,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Layers,
  Search,
  ExternalLink,
} from 'lucide-react';
import { OFFICIAL_MIND_MAPS, ChapterMindMap, MindMapNode } from '@/lib/data/mindmaps';

export const MindMapViewer: React.FC = () => {
  const [selectedMapId, setSelectedMapId] = useState<string>(OFFICIAL_MIND_MAPS[0].id);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'elec-root': true,
    'elec-charge-current': true,
    'elec-potential': true,
    'elec-ohms-law': true,
    'light-root': true,
    'trig-root': true,
    'quad-root': true,
  });
  const [activeNodeModal, setActiveNodeModal] = useState<MindMapNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const currentMap = OFFICIAL_MIND_MAPS.find((m) => m.id === selectedMapId) || OFFICIAL_MIND_MAPS[0];

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const renderNodeTree = (node: MindMapNode, depth: number = 0) => {
    const isExpanded = expandedNodes[node.id] ?? depth < 2;
    const hasChildren = node.children && node.children.length > 0;

    const matchesSearch =
      searchQuery.trim() === '' ||
      node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (node.description && node.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (node.formula && node.formula.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
      <div
        key={node.id}
        className={`relative transition-all duration-150 ${matchesSearch ? 'opacity-100' : 'opacity-40'}`}
        style={{ marginLeft: depth === 0 ? 0 : `${Math.min(depth * 28, 84)}px` }}
      >
        {/* Node Box */}
        <div
          className={`group flex items-start gap-3 p-3.5 my-2 rounded-xl border transition-all ${
            depth === 0
              ? 'bg-zinc-900 border-zinc-700 shadow-md'
              : depth === 1
              ? 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700'
              : 'bg-zinc-950/70 border-zinc-850/80 hover:border-zinc-700'
          }`}
        >
          {/* Expand/Collapse Toggle */}
          {hasChildren ? (
            <button
              onClick={() => toggleNode(node.id)}
              className="mt-0.5 p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition shrink-0"
              aria-label={isExpanded ? 'Collapse subtopics' : 'Expand subtopics'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          ) : (
            <div className="w-6 h-6 flex items-center justify-center shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
          )}

          {/* Node Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`font-semibold tracking-tight ${
                  depth === 0 ? 'text-white text-base' : depth === 1 ? 'text-zinc-100 text-sm' : 'text-zinc-200 text-xs'
                }`}
              >
                {node.label}
              </span>

              {node.importance === 'critical' && (
                <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  BOARD RECURRENCE: HIGH
                </span>
              )}

              {node.ncertRef && (
                <span className="text-[10px] font-mono text-zinc-500">
                  {node.ncertRef}
                </span>
              )}
            </div>

            {node.description && (
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                {node.description}
              </p>
            )}

            {node.formula && (
              <div className="mt-2 inline-block px-3 py-1 rounded-md bg-zinc-950 border border-zinc-800/90 font-mono text-xs text-cyan-300">
                {node.formula}
              </div>
            )}

            {node.examTips && node.examTips.length > 0 && (
              <div className="mt-2 text-[11px] text-amber-300/90 flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{node.examTips[0]}</span>
              </div>
            )}
          </div>

          {/* Quick Action Button */}
          <div className="shrink-0 flex items-center gap-1">
            <button
              onClick={() => setActiveNodeModal(node)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-zinc-400 hover:text-white hover:bg-zinc-800 transition flex items-center gap-1 border border-transparent hover:border-zinc-700"
            >
              <span>Inspect</span>
              <ExternalLink className="w-3 h-3" />
            </button>

            <Link
              href={`/study/cbse-10-${currentMap.subjectId === 'maths' ? 'maths' : 'science'}?focus=${encodeURIComponent(
                node.label
              )}`}
              className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition flex items-center gap-1 border border-zinc-700"
            >
              <span>Practice</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Children Subtrees */}
        {hasChildren && isExpanded && (
          <div className="border-l border-zinc-800/80 ml-4 pl-2 my-1">
            {node.children!.map((child) => renderNodeTree(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Chapter Selection Header Bar */}
      <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Chapter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {OFFICIAL_MIND_MAPS.map((map) => {
            const isActive = map.id === selectedMapId;
            return (
              <button
                key={map.id}
                onClick={() => setSelectedMapId(map.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono transition flex items-center gap-2 border ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-950 font-bold border-white shadow-sm'
                    : 'bg-zinc-950/70 text-zinc-400 hover:text-white border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>
                  {map.subjectName}: {map.chapterTitle}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                  {map.totalSubtopics} nodes
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search concepts or formulas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono"
          />
        </div>
      </div>

      {/* Main Mind Map Canvas View */}
      <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 min-h-[500px]">
        {/* Mind Map Meta Header */}
        <div className="pb-4 mb-6 border-b border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span>{currentMap.board}</span>
              <span>•</span>
              <span>{currentMap.grade}</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">{currentMap.subjectName}</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
              {currentMap.chapterTitle} — Concept Hierarchy
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Consolidated</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Review Due</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Formulas</span>
            </span>
          </div>
        </div>

        {/* Hierarchical Node Tree */}
        <div className="space-y-2">
          {renderNodeTree(currentMap.rootNode, 0)}
        </div>
      </div>

      {/* Detail Inspection Modal */}
      {activeNodeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-zinc-900 border border-zinc-700 max-w-lg w-full rounded-2xl p-6 text-zinc-100 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  Concept Inspector
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{activeNodeModal.label}</h3>
              </div>
              <button
                onClick={() => setActiveNodeModal(null)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800"
              >
                ✕
              </button>
            </div>

            {activeNodeModal.description && (
              <p className="text-sm text-zinc-300 leading-relaxed">
                {activeNodeModal.description}
              </p>
            )}

            {activeNodeModal.formula && (
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-[11px] font-mono text-zinc-400 block mb-1">Mathematical Formula:</span>
                <code className="text-sm text-cyan-300 font-mono font-bold">{activeNodeModal.formula}</code>
              </div>
            )}

            {activeNodeModal.ncertRef && (
              <div className="text-xs text-zinc-400 font-mono flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
                <span>Textbook Reference: {activeNodeModal.ncertRef}</span>
              </div>
            )}

            {activeNodeModal.examTips && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Exam Recurrence Note</span>
                </div>
                {activeNodeModal.examTips.map((tip, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {tip}
                  </p>
                ))}
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-zinc-800">
              <button
                onClick={() => setActiveNodeModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                Close
              </button>
              <Link
                href={`/study/cbse-10-${currentMap.subjectId === 'maths' ? 'maths' : 'science'}?focus=${encodeURIComponent(
                  activeNodeModal.label
                )}`}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-zinc-100 hover:bg-white text-zinc-950 transition flex items-center gap-1.5"
              >
                <span>Launch Question Bank</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
