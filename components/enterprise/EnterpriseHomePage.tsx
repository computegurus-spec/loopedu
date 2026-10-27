'use client';

import React, { useState } from 'react';
import { EnterpriseNavbar } from './EnterpriseNavbar';
import { EnterpriseHero } from './EnterpriseHero';
import { GoalExplorerGrid } from './GoalExplorerGrid';
import { LiveEligibilityWidget } from './LiveEligibilityWidget';
import { PathwayCostCalculatorWidget } from './PathwayCostCalculatorWidget';
import { ActivePracticeShowcase } from './ActivePracticeShowcase';
import { MindCoachShowcase } from './MindCoachShowcase';
import { EnterprisePricingTable } from './EnterprisePricingTable';
import { EnterpriseTestimonials } from './EnterpriseTestimonials';
import { EnterpriseFooter } from './EnterpriseFooter';
import { LiveAIIntelligenceModal } from './LiveAIIntelligenceModal';

export function EnterpriseHomePage() {
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [activeQuery, setActiveQuery] = useState('');

  function handleTriggerAiQuery(query: string) {
    setActiveQuery(query);
    setAiModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Global AI Statutory Intelligence Modal */}
      <LiveAIIntelligenceModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        initialQuery={activeQuery}
      />

      {/* Enterprise Navigation */}
      <EnterpriseNavbar onOpenAiSearch={() => handleTriggerAiQuery('')} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Live AI Search & Goal Pills */}
        <EnterpriseHero onTriggerAiQuery={handleTriggerAiQuery} />

        {/* 2. Live Goal & Category Explorer (All 200+ National Exam Tracks) */}
        <GoalExplorerGrid />

        {/* 3. Interactive Declarative AST Eligibility Evaluator */}
        <LiveEligibilityWidget />

        {/* 4. 3-Pathway Career Comparison & Unbundled 4-Year Cost Calculator */}
        <PathwayCostCalculatorWidget />

        {/* 5. Active Practice Showcase: Socratic Hints & Spaced Repetition */}
        <ActivePracticeShowcase />

        {/* 6. Bounded Mind Coach & Statutory Crisis Helplines */}
        <MindCoachShowcase />

        {/* 7. Unbundled Fair Pricing Grid vs Traditional EdTech */}
        <EnterprisePricingTable />

        {/* 8. Verified Student, Aspirant & Parent Testimonials */}
        <EnterpriseTestimonials />
      </main>

      {/* Enterprise Footer */}
      <EnterpriseFooter />

    </div>
  );
}
