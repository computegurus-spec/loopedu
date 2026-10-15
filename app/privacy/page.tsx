import React from 'react';

export const metadata = {
  title: 'Privacy Policy | LoopEdu',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950">
          Privacy Policy
        </h1>
        <p className="text-xs text-academic-subtle">
          Last updated: October 2026 • LoopEdu by Blocks and Loops technologies pvt ltd
        </p>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-950">
        <strong>Notice for Business Owner:</strong> Data controller entity, formal grievance officer contact,
        and statutory registration details are marked with <code>[OWNER_SETUP_REQUIRED]</code> for legal review.
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-forest-800 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-950">1. Our Privacy Philosophy</h2>
          <p>
            BoardEdge AI is an academic revision platform. We believe in strict data minimization.
            We do not collect student birthdates, school affiliations, or mobile phone numbers unless specifically
            required for customer-requested transaction support.
          </p>
          <p className="font-semibold text-forest-900">
            We never construct behavioral advertising profiles or sell data of minors to third-party ad networks.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-950">2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Account & Order Data:</strong> Email address, purchaser name, and transaction identifiers generated via Razorpay. We do not store credit or debit card numbers on our servers.</li>
            <li><strong>Study Progress & Bookmarks:</strong> Your question completion marks, bookmark selections, and last-studied position to enable continuous cross-device learning.</li>
            <li><strong>Subject Requests:</strong> Class and subject preferences submitted through our request form. If you request notification, we store your email solely to notify you when that subject is released.</li>
            <li><strong>Content Error Reports:</strong> User-submitted feedback regarding potential errors in question text or explanations.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-950">3. Personalized Study Watermarks</h2>
          <p>
            To deter unauthorized distribution of paid practice material, our protected reader renders a discreet,
            non-intrusive watermark on reader surfaces. For your privacy, this watermark uses a masked identifier
            (e.g., <code>s***t@example.com [License #...]</code>) rather than exposing full unmasked personal details.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-950">4. Third-Party Processors</h2>
          <p>
            We partner exclusively with trusted technical providers for core platform functionality:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Razorpay:</strong> Encrypted payment processing for INR transactions.</li>
            <li><strong>Supabase:</strong> Cloud database infrastructure with Row Level Security (RLS) enforcement.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-950">5. Contact Data Officer</h2>
          <p>
            For data inquiries, access requests, or deletion:
            <code>privacy@blocks-and-loops.com</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
