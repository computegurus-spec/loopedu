import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | LoopEdu',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950">
          Terms of Service
        </h1>
        <p className="text-xs text-academic-subtle">
          Last revised: October 2026 • Document Version 2.0 • LoopEdu by Blocks and Loops technologies pvt ltd
        </p>
      </div>

      <div className="prose prose-forest text-xs sm:text-sm text-forest-800 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-950">1. Acceptance of Terms</h2>
          <p>
            By accessing or subscribing to <strong>LoopEdu</strong>,
            provided by <strong>Blocks and Loops technologies pvt ltd</strong> (Bangalore, Karnataka),
            you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-950">2. Description of Educational Material</h2>
          <p>
            LoopEdu provides daily bite-sized practice routines (The Daily Five), spaced error revision (Mistake Comeback Vault), and curated chapter question banks.
          </p>
          <p className="p-3 bg-paper-100 rounded-lg text-forest-900 border border-academic-border">
            <strong>Independence Disclaimer:</strong> LoopEdu is an independent practice service. It is not affiliated
            with, authorized by, or endorsed by the Central Board of Secondary Education (CBSE) or NCERT. Priority rankings
            reflect historical board paper topic analysis and do not represent guaranteed exam forecasts.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-950">3. Pricing & Subscription Terms</h2>
          <p>
            LoopEdu is available via a modular subscription of <strong>₹299 / month (INR)</strong> per subject track (or all-inclusive access).
            Access grants non-exclusive, non-transferable personal online learning and practice access through our protected web app
            for the student designated under the account.
          </p>
          <p>
            Subscriptions renew monthly and can be paused or cancelled at any time through the student/parent settings dashboard.
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
            ranks, or exam results. In no event shall blocks and loops be liable for academic outcomes or indirect damages.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-950">6. Support & Inquiries</h2>
          <p>
            For inquiries regarding terms, contact: <code>support@blocks-and-loops.com</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
