'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const SubjectRequestForm: React.FC = () => {
  const [className, setClassName] = useState('Class 10');
  const [subjectName, setSubjectName] = useState('');
  const [notes, setNotes] = useState('');
  const [email, setEmail] = useState('');
  const [consentNotify, setConsentNotify] = useState(false);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!className.trim() || !subjectName.trim()) {
      setStatus({
        type: 'error',
        message: 'Please specify both class and subject name.',
      });
      return;
    }

    if (consentNotify && (!email.trim() || !email.includes('@'))) {
      setStatus({
        type: 'error',
        message: 'A valid email address is required if you request an availability notification.',
      });
      return;
    }

    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const res = await fetch('/api/requests/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          className,
          subjectName,
          notes,
          email,
          consentNotify,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit subject request.');
      }

      setStatus({
        type: 'success',
        message:
          'Thank you. Your subject request has been recorded in our editorial pipeline.' +
          (consentNotify ? ' We will notify you when this bank is published.' : ''),
      });

      // Clear fields
      setSubjectName('');
      setNotes('');
      setEmail('');
      setConsentNotify(false);
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'An error occurred while submitting your request.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="request" className="rounded-2xl bg-white border border-academic-border p-6 sm:p-10 shadow-sm">
      <div className="max-w-xl">
        <span className="text-[11px] font-bold uppercase tracking-widest text-forest-700">
          Curriculum Expansion
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950 mt-1 mb-2">
          Your next subject, our next question bank.
        </h2>
        <p className="text-xs sm:text-sm text-academic-subtle leading-relaxed mb-6">
          Tell us what you would like to practise next. We prioritize new subject releases based on verified student, parent, and tutor demand.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="req-class" className="block text-xs font-semibold text-forest-900 mb-1">
              Class <span className="text-red-600">*</span>
            </label>
            <input
              id="req-class"
              type="text"
              required
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="e.g. Class 10 or Class 12"
              className="w-full px-3.5 py-2.5 rounded-lg border border-academic-borderStrong/70 bg-paper-50 text-forest-950 text-sm focus:bg-white transition"
            />
          </div>

          <div>
            <label htmlFor="req-subject" className="block text-xs font-semibold text-forest-900 mb-1">
              Subject Name <span className="text-red-600">*</span>
            </label>
            <input
              id="req-subject"
              type="text"
              required
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="e.g. Physics, Accountancy, French"
              className="w-full px-3.5 py-2.5 rounded-lg border border-academic-borderStrong/70 bg-paper-50 text-forest-950 text-sm focus:bg-white transition"
            />
          </div>
        </div>

        <div>
          <label htmlFor="req-notes" className="block text-xs font-semibold text-forest-900 mb-1">
            Anything specific you need? (optional)
          </label>
          <textarea
            id="req-notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Case-study questions for Light & Electricity, or specific chapter revision focus."
            className="w-full px-3.5 py-2.5 rounded-lg border border-academic-borderStrong/70 bg-paper-50 text-forest-950 text-sm focus:bg-white transition"
          />
        </div>

        <div className="pt-1">
          <label htmlFor="req-email" className="block text-xs font-semibold text-forest-900 mb-1">
            Email address (optional unless notification is requested)
          </label>
          <input
            id="req-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="parent.or.student@example.com"
            className="w-full sm:w-80 px-3.5 py-2.5 rounded-lg border border-academic-borderStrong/70 bg-paper-50 text-forest-950 text-sm focus:bg-white transition"
          />
        </div>

        {/* Explicit unchecked consent checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={consentNotify}
              onChange={(e) => setConsentNotify(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-academic-border text-forest-900 focus:ring-forest-800"
            />
            <span className="text-xs text-forest-800 leading-snug">
              Email me when this question bank becomes available. (We do not subscribe you to general marketing.)
            </span>
          </label>
        </div>

        {status.type !== 'idle' && (
          <div
            className={`p-3.5 rounded-xl text-xs flex items-start gap-2 ${
              status.type === 'success'
                ? 'bg-forest-50 text-forest-900 border border-forest-200'
                : 'bg-red-50 text-red-900 border border-red-200'
            }`}
            role="status"
          >
            {status.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-forest-700 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-700 flex-shrink-0 mt-0.5" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <div className="pt-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-sm disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting request...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Submit Subject Request</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
