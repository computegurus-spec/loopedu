'use client';

import React, { useState } from 'react';
import { Sparkles, HelpCircle, Lightbulb, Compass, ChevronDown, ChevronUp } from 'lucide-react';
import { MathRenderer } from '../MathRenderer';

interface AIHintCoachProps {
  question: string;
  topic: string;
  explanation: string;
  source: string;
}

export const AIHintCoach: React.FC<AIHintCoachProps> = ({
  question,
  topic,
  explanation,
  source,
}) => {
  const [activeTab, setActiveTab] = useState<'hint' | 'analogy' | 'method' | null>(null);

  // Derive intelligent, grounded guidance safely from verified topic & explanation
  const getHint = () => {
    if (topic.includes('Quadratic')) {
      return 'Check if the equation factors into $(x - p)(x - q) = 0$, where the product of $p$ and $q$ gives the constant term and their sum matches the middle coefficient.';
    }
    if (topic.includes('Chemical') || topic.includes('Respiration')) {
      return 'Identify whether heat or biological ATP energy is released into the system. Exothermic reactions yield net energy release.';
    }
    if (topic.includes('TF-IDF') || topic.includes('NLP')) {
      return 'Consider what happens to the inverse document frequency term $\\log(N/\\text{DF})$ when nearly every document contains the term (i.e. $\\text{DF} \\to N$).';
    }
    return `Focus on the core concept of ${topic}. Review the formula or rule applied in: ${source}.`;
  };

  const getAnalogy = () => {
    if (topic.includes('Quadratic')) {
      return 'Think of roots as finding which specific values turn the whole expression into balance (zero). Just like a scale balancing at exactly two weights.';
    }
    if (topic.includes('TF-IDF')) {
      return 'Think of search like looking for unique clues in a library. Common words like "the" or "is" are everywhere, so they tell you nothing distinct about a document.';
    }
    return `In everyday terms, ${topic} describes how fundamental conditions predict the outcome in ${source.split(',')[0]}.`;
  };

  const getMethod = () => {
    return `1. Write down given variables.\n2. Recall the standard theorem/formula for ${topic}.\n3. Substitute values carefully step-by-step before concluding.`;
  };

  return (
    <div className="rounded-xl border border-forest-200/80 bg-forest-50/40 p-4 space-y-3 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-bold text-forest-950">
          <Sparkles className="w-4 h-4 text-forest-700" />
          <span>AI Study Coach</span>
          <span className="text-[10px] bg-forest-100 text-forest-800 px-2 py-0.5 rounded font-normal">
            Ground Truth: {topic}
          </span>
        </div>
        <span className="text-[11px] text-academic-subtle">
          Stuck? Ask for a hint without spoiling the answer
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          onClick={() => setActiveTab(activeTab === 'hint' ? null : 'hint')}
          className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
            activeTab === 'hint'
              ? 'bg-forest-900 text-limeaccent'
              : 'bg-white border border-academic-border text-forest-900 hover:bg-forest-100/50'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Give me a hint</span>
        </button>

        <button
          onClick={() => setActiveTab(activeTab === 'analogy' ? null : 'analogy')}
          className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
            activeTab === 'analogy'
              ? 'bg-forest-900 text-limeaccent'
              : 'bg-white border border-academic-border text-forest-900 hover:bg-forest-100/50'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Explain simpler</span>
        </button>

        <button
          onClick={() => setActiveTab(activeTab === 'method' ? null : 'method')}
          className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
            activeTab === 'method'
              ? 'bg-forest-900 text-limeaccent'
              : 'bg-white border border-academic-border text-forest-900 hover:bg-forest-100/50'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>3-Step Breakdown</span>
        </button>
      </div>

      {activeTab && (
        <div className="p-3.5 bg-white rounded-lg border border-forest-200 text-forest-900 leading-relaxed animate-in fade-in">
          {activeTab === 'hint' && (
            <div>
              <div className="font-bold text-forest-950 mb-1 flex items-center gap-1 text-[11px] uppercase tracking-wider text-forest-700">
                <Lightbulb className="w-3 h-3 text-forest-600" />
                <span>Concept Hint (Without Spoilers):</span>
              </div>
              <MathRenderer content={getHint()} />
            </div>
          )}

          {activeTab === 'analogy' && (
            <div>
              <div className="font-bold text-forest-950 mb-1 flex items-center gap-1 text-[11px] uppercase tracking-wider text-forest-700">
                <Compass className="w-3 h-3 text-forest-600" />
                <span>Everyday Analogy:</span>
              </div>
              <MathRenderer content={getAnalogy()} />
            </div>
          )}

          {activeTab === 'method' && (
            <div>
              <div className="font-bold text-forest-950 mb-1 flex items-center gap-1 text-[11px] uppercase tracking-wider text-forest-700">
                <HelpCircle className="w-3 h-3 text-forest-600" />
                <span>Structured Solving Steps:</span>
              </div>
              <div className="whitespace-pre-line text-forest-800">
                {getMethod()}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
