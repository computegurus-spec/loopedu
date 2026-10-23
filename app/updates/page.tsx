'use client';

import React, { useState } from 'react';
import { useDemo } from '@/lib/demo/DemoContext';
import { SYNTHETIC_AMENDMENTS, StoredAmendment } from '@/lib/exams/amendments';
import {
  generateDailyBriefing,
  renderBriefingEmails,
  queueBriefingDelivery,
  unsubscribeEmail,
  BriefingEdition,
  OutboxEntry,
} from '@/lib/newsletter/briefingEngine';
import { ContextualSponsoredCard } from '@/lib/../components/ads/ContextualSponsoredCard';
import { ExternalLink, CheckCircle, Mail, AlertTriangle, Clock, RefreshCw, Send, ShieldCheck, Filter } from 'lucide-react';

export default function UpdatesPage() {
  const { currentPersona } = useDemo();
  const [activeTab, setActiveTab] = useState<'feed' | 'briefing' | 'outbox'>('feed');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Newsletter edition selector based on active persona
  const initialEdition: BriefingEdition =
    currentPersona.role === 'adult' ? 'adult' : currentPersona.role === 'parent' ? 'parent' : 'student';
  const [activeEdition, setActiveEdition] = useState<BriefingEdition>(initialEdition);
  const [isOptedIn, setIsOptedIn] = useState<boolean>(true);
  const [outboxHistory, setOutboxHistory] = useState<OutboxEntry[]>([]);
  const [dryRunNotice, setDryRunNotice] = useState<string | null>(null);

  // Filter updates
  const filteredAmendments = SYNTHETIC_AMENDMENTS.filter((amendment: StoredAmendment) => {
    const matchesTopic = selectedTopic === 'all' || amendment.examFamily.toLowerCase() === selectedTopic.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      amendment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      amendment.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      amendment.authority.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  const dailyBriefing = generateDailyBriefing(activeEdition);

  const handleTriggerDryRun = () => {
    const entry = queueBriefingDelivery(
      currentPersona.id,
      `${currentPersona.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      activeEdition,
      true
    );
    setOutboxHistory((prev) => [entry, ...prev.filter((p) => p.id !== entry.id)]);
    setDryRunNotice(`Dry-run simulation created! Rendered HTML/plain-text ready in outbox. (Idempotency Key: ${entry.id})`);
    setTimeout(() => setDryRunNotice(null), 6000);
  };

  const handleUnsubscribe = () => {
    unsubscribeEmail(`${currentPersona.name.toLowerCase().replace(/\s+/g, '.')}@example.com`);
    setIsOptedIn(false);
    setDryRunNotice('Unsubscribed successfully. Email added to suppression ledger.');
    setTimeout(() => setDryRunNotice(null), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800">
              Verified Primary Sourcing
            </span>
            <span className="text-xs text-slate-500">Updated: Today &bull; 07:00 IST</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Reviewed Education Updates & Daily Briefing
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-3xl">
            Zero rumors or coaching hearsay. Every bulletin references statutory gazette notices, official exam portals,
            and signed amendment records with exact effective dates.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 mb-6 space-x-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('feed')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'feed'
                ? 'border-teal-600 text-teal-700 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Notices & Amendments Feed ({filteredAmendments.length})
          </button>
          <button
            onClick={() => setActiveTab('briefing')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'briefing'
                ? 'border-teal-600 text-teal-700 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            3-Min Daily Briefing
          </button>
          <button
            onClick={() => setActiveTab('outbox')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'outbox'
                ? 'border-teal-600 text-teal-700 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Mail className="w-4 h-4" />
            Newsletter Outbox & Controls
          </button>
        </div>

        {dryRunNotice && (
          <div className="mb-6 rounded-lg bg-teal-50 border border-teal-200 p-4 text-xs font-medium text-teal-900 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
            <span>{dryRunNotice}</span>
          </div>
        )}

        {/* TAB 1: Searchable Notices Feed */}
        {activeTab === 'feed' && (
          <div>
            {/* Filter controls */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search updates, authorities, exams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Category:
                </span>
                {['all', 'JEE', 'NEET', 'UPSC', 'IBPS'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedTopic(cat)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                      selectedTopic === cat
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filteredAmendments.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-500">
                <p className="text-base font-medium text-slate-700">No verified changes affect this filter today</p>
                <p className="text-xs text-slate-500 mt-1">
                  We only publish confirmed primary updates. If an authority has not issued an official gazette or portal notice, we do not fabricate news.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAmendments.map((item: StoredAmendment) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide bg-slate-100 text-slate-700">
                          {item.authority}
                        </span>
                        <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                          {item.examFamily}
                        </span>
                        <span className="text-[11px] text-slate-500">Notice ID: {item.noticeNumber}</span>
                      </div>
                      <span className="text-xs text-slate-500">Effective: {item.effectiveDate}</span>
                    </div>

                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">{item.summary}</p>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-3 text-slate-500">
                        <span className="flex items-center gap-1 text-emerald-700">
                          <ShieldCheck className="w-3.5 h-3.5" /> Reviewed by: {item.verifiedBy}
                        </span>
                        <span>Scope: {item.scope}</span>
                      </div>

                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-teal-700 hover:text-teal-900 text-xs"
                      >
                        Official Gazette Source <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Contextual Sponsored Slot (Adult Only) */}
            <ContextualSponsoredCard contextCategory="general" />
          </div>
        )}

        {/* TAB 2: 3-Min Daily Briefing */}
        {activeTab === 'briefing' && (
          <div className="space-y-6">
            {/* Edition Selector */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Target Edition</span>
                <div className="flex gap-2 mt-1">
                  {(['student', 'parent', 'adult'] as BriefingEdition[]).map((ed) => (
                    <button
                      key={ed}
                      onClick={() => setActiveEdition(ed)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                        activeEdition === ed
                          ? 'bg-teal-700 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {ed === 'adult' ? 'Adult Aspirant' : ed}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleTriggerDryRun}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800"
                >
                  <Send className="w-3.5 h-3.5" /> Simulate Delivery to Outbox
                </button>
              </div>
            </div>

            {/* Briefing Paper Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="border-b border-teal-600 pb-4 mb-6">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-semibold text-teal-700 uppercase tracking-wider">
                    {dailyBriefing.edition} Edition &bull; 3-Minute Focused Morning Digest
                  </span>
                  <span>{dailyBriefing.dateStr}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{dailyBriefing.headline}</h2>
              </div>

              {/* 1. Verified Changes */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  1. High-Priority Verified Changes
                </h4>
                <div className="space-y-3">
                  {dailyBriefing.verifiedChanges.map((change, idx) => (
                    <div key={idx} className="rounded-lg bg-slate-50 border-l-4 border-teal-600 p-3 text-xs">
                      <div className="font-semibold text-slate-900">{change.title}</div>
                      <p className="mt-1 text-slate-600">{change.summary}</p>
                      <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
                        <span>Authority: {change.authority} &bull; Verified by {change.verifiedBy}</span>
                        <a
                          href={change.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-teal-700 hover:underline inline-flex items-center gap-1"
                        >
                          Source <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Deadlines */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  2. Upcoming Consequential Deadlines
                </h4>
                <div className="space-y-2">
                  {dailyBriefing.criticalDeadlines.map((dl, idx) => (
                    <div key={idx} className="flex items-start justify-between text-xs p-2.5 rounded-lg border border-slate-100 bg-slate-50">
                      <div>
                        <div className="font-semibold text-slate-900">{dl.title}</div>
                        <div className="text-slate-600 mt-0.5">{dl.actionRequired}</div>
                      </div>
                      <span className="shrink-0 font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[11px]">
                        {dl.daysRemaining} days left ({dl.date})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Practical Career & Learning */}
              <div className="mb-6 rounded-lg bg-teal-50 border border-teal-200 p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
                  3. Practical Career Exploration
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-1">{dailyBriefing.careerOrLearningItem.title}</h4>
                <p className="text-xs text-slate-700 mt-1">{dailyBriefing.careerOrLearningItem.description}</p>
                <div className="mt-2 text-xs font-semibold text-teal-900">
                  Today's micro-project: {dailyBriefing.careerOrLearningItem.practicalStep}
                </div>
              </div>

              {/* 4. Feasible Action */}
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-xs">
                <div className="font-bold text-emerald-900">
                  Today's Feasible Action ({dailyBriefing.feasibleTodayAction.estimatedMinutes} Mins)
                </div>
                <p className="text-emerald-800 mt-1">{dailyBriefing.feasibleTodayAction.action}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
                <span>{dailyBriefing.sourcesAndGovernance}</span>
                <button onClick={handleUnsubscribe} className="text-teal-700 hover:underline">
                  Unsubscribe Preferences
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Outbox & Delivery Controls */}
        {activeTab === 'outbox' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900 text-sm mb-1">Transactional Outbox & Subscription Ledger</h3>
              <p className="text-xs text-slate-600 mb-4">
                Durable outbox prevents duplicate sending. In DEMO mode, emails are stored locally as dry-run previews without triggering external network calls.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleTriggerDryRun}
                  className="px-3 py-1.5 rounded-lg bg-teal-700 text-white text-xs font-medium hover:bg-teal-800"
                >
                  Generate Dry-Run Outbox Entry
                </button>
                <button
                  onClick={handleUnsubscribe}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-50"
                >
                  Simulate Unsubscribe / Suppression
                </button>
              </div>
            </div>

            {outboxHistory.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500 text-xs">
                No outbound transmissions dispatched in this session yet. Click "Generate Dry-Run Outbox Entry" to inspect rendered HTML and headers.
              </div>
            ) : (
              <div className="space-y-4">
                {outboxHistory.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm text-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                      <div>
                        <span className="font-semibold text-slate-900">{item.email}</span> &bull;{' '}
                        <span className="capitalize text-slate-600">{item.edition} Edition</span>
                      </div>
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-100 text-slate-700 font-bold uppercase">
                        {item.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-500 font-mono text-[11px] mb-3">
                      <div>Idempotency Key: {item.id}</div>
                      <div>Scheduled For: {item.scheduledFor}</div>
                      <div>Attempts: {item.attempts}</div>
                      <div>Date: {item.dateStr}</div>
                    </div>

                    <details className="mt-2 text-xs">
                      <summary className="cursor-pointer text-teal-700 font-medium">Inspect Rendered HTML Payload</summary>
                      <pre className="mt-2 p-3 bg-slate-900 text-slate-200 rounded-lg overflow-x-auto text-[11px] max-h-48 font-mono">
                        {item.renderedHtml}
                      </pre>
                    </details>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
