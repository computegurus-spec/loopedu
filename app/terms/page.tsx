import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | BoardEdge AI by itappens',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950">
          Terms of Service
        </h1>
        <p className="text-xs text-academic-subtle">
          Last revised: October 2026 • Document Version 1.0 (Draft for Platform Review)
        </p>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-950">
        <strong>Notice for Business Owner:</strong> This document outlines operational terms for BoardEdge AI.
        Missing corporate legal entity name, registered address, and jurisdiction details are marked with
        <code>[OWNER_SETUP_REQUIRED]</code> placeholders below for completion prior to public commercial launch.
      </div>

      <div className="prose prose-forest text-xs sm:text-sm text-forest-800 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-950">1. Acceptance of Terms</h2>
          <p>
            By accessing or purchasing question banks on <strong>BoardEdge AI</strong> (operating on <code>itappens.ai</code>),
            provided by <strong>itappens</strong> (<code>[OWNER_SETUP_REQUIRED: Registered Legal Entity Name]</code>),
            you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-950">2. Description of Educational Material</h2>
          <p>
            BoardEdge AI provides online study access to original practice question collections for Class 10 CBSE 2027
            candidates. The material comprises 200 questions per subject with model solutions and method explanations.
          </p>
          <p className="p-3 bg-paper-100 rounded-lg text-forest-900 border border-academic-border">
            <strong>Independence Disclaimer:</strong> BoardEdge AI is an independent practice service. It is not affiliated
            with, authorized by, or endorsed by the Central Board of Secondary Education (CBSE) or NCERT. Priority rankings
            reflect historical board paper topic analysis and do not represent guaranteed exam forecasts.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-950">3. Pricing & Entitlement Terms</h2>
          <p>
            Each subject practice bank is available for a one-time purchase fee of <strong>₹999 (INR)</strong>.
            Access grants non-exclusive, non-transferable personal online reading access through our protected web reader
            for the purchaser or the student designated under the account.
          </p>
          <p>
            The access period is valid through the conclusion of the CBSE 2027 Class 10 board examinations (or 365 days from date of purchase).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-950">4. Permitted Use & Content Deterrence</h2>
          <p>
            Purchased material is provided exclusively for private, personal revision. You may not:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Redistribute, resell, publish, or publicly broadcast any portion of the question banks or model answers.</li>
            <li>Use automated scrapers, bots, or extraction scripts against the protected reader endpoints.</li>
            <li>Circulate screenshots or unauthorized extracts bearing personalized license watermarks.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-950">5. Limitation of Liability</h2>
          <p>
            BoardEdge AI practice questions are designed to strengthen topic mastery. We do not promise specific marks,
            ranks, or exam results. In no event shall itappens be liable for academic outcomes or indirect damages.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-950">6. Support & Inquiries</h2>
          <p>
            For inquiries regarding terms, contact: <code>[OWNER_SETUP_REQUIRED: support@itappens.ai]</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
