import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Refund Policy & Access Revocation | BoardEdge AI by itappens',
};

export default function RefundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950">
          Refund Policy & Access Terms
        </h1>
        <p className="text-xs text-academic-subtle">
          BoardEdge AI by itappens • Class 10 CBSE 2027 Practice Question Banks
        </p>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-950">
        <strong>Notice for Business Owner:</strong> The operational refund window and payment reconciliation
        rules are outlined below. Specific statutory cooling-off periods and entity details are marked with
        <code>[OWNER_SETUP_REQUIRED]</code>.
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-forest-800 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-950">1. Digital Educational Content Policy</h2>
          <p>
            BoardEdge AI provides instant online access to proprietary practice questions, model answers, and worked explanations upon payment confirmation.
            Because digital access is granted immediately, we offer free public sample questions for every subject so that students and parents can evaluate the material before purchasing.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-950">2. Eligible Refund Circumstances</h2>
          <p>
            We consider refund requests under the following verified conditions:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Duplicate Purchases:</strong> Accidental double payment for the identical subject under the same account.</li>
            <li><strong>Technical Access Failure:</strong> Verified inability to open or view the question reader that our engineering support cannot resolve within 48 hours.</li>
            <li><strong>Wrong Subject Selection:</strong> If reported within <code>[OWNER_SETUP_REQUIRED: e.g. 48 hours]</code> of purchase with minimal question interaction, we can re-assign your entitlement to the correct subject track (e.g. switching from Maths Basic to Standard) at no additional charge.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-950">3. Entitlement Revocation Policy</h2>
          <p>
            When a refund is approved and processed via Razorpay:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The server automatically revokes the subject license associated with that order.</li>
            <li>The subject will no longer be available in My Library or the study reader.</li>
            <li>Your account history will record the refunded status for financial reconciliation.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-950">4. How to Request Assistance</h2>
          <p>
            To submit a payment inquiry or refund request, please email our support team at:
            <code> [OWNER_SETUP_REQUIRED: support@itappens.ai]</code>. Include your Razorpay Payment ID and the email address used at checkout.
          </p>
        </section>
      </div>
    </div>
  );
}
