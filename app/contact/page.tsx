import React from 'react';
import Link from 'next/link';
import { Mail, HelpCircle, MessageSquare, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Contact & Support | BoardEdge AI by itappens',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-900 border border-forest-200 text-xs font-semibold uppercase tracking-wider">
          Student & Parent Support
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950">
          We’re here to help.
        </h1>
        <p className="text-sm sm:text-base text-forest-800 leading-relaxed">
          Have questions regarding subject syllabus tracks, your purchase entitlement, or practice reader features?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border border-academic-border p-6 sm:p-7 space-y-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-900 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-forest-950">
              Customer & Enrolment Support
            </h3>
            <p className="text-xs text-academic-subtle mt-1 leading-relaxed">
              Email our support desk for inquiries regarding payments, login assistance, or receipt reconciliation.
            </p>
          </div>
          <div className="pt-2 text-xs font-mono font-medium text-forest-950 bg-paper-100 p-3 rounded-lg border border-academic-border">
            support@itappens.ai <span className="text-[10px] text-academic-subtle block font-sans">[OWNER_SETUP_REQUIRED: Connect official domain mailbox]</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-academic-border p-6 sm:p-7 space-y-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-limeaccent/30 text-forest-950 flex items-center justify-center border border-limeaccent">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-forest-950">
              Request a New Subject
            </h3>
            <p className="text-xs text-academic-subtle mt-1 leading-relaxed">
              Looking for Class 12 question banks or additional Class 10 subjects? Use our dedicated subject request form.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/#request"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-900 hover:underline"
            >
              <span>Go to Subject Request Form →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Business Setup Checklist for Owner */}
      <div className="p-6 bg-paper-100 border border-academic-border rounded-2xl space-y-3 text-xs text-forest-900">
        <div className="font-bold text-forest-950 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-forest-700" />
          <span>Platform Launch Information Checklist (For Business Owner Review)</span>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-academic-subtle">
          <li><strong>Domain:</strong> Configured for <code>itappens.ai</code>. Route <code>/CBSE</code> redirects to <code>/catalogue</code>.</li>
          <li><strong>Razorpay:</strong> Set up INR business account with webhook secret configured in <code>.env.local</code>.</li>
          <li><strong>Entity Details:</strong> Replace <code>[OWNER_SETUP_REQUIRED]</code> placeholders in Terms and Privacy policies with registered business entity.</li>
          <li><strong>Support Email:</strong> Connect <code>support@itappens.ai</code> or preferred support alias.</li>
        </ul>
      </div>
    </div>
  );
}
