'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, School, Send, Loader2, Sparkles } from 'lucide-react';

interface TeacherInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherInquiryModal: React.FC<TeacherInquiryModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [subject, setSubject] = useState('Mathematics Standard (041)');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setSubmitting(true);
    try {
      await fetch('/api/requests/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          details: `[Teacher/School Inquiry] School: ${schoolName} | Subject Focus: ${subject} | Notes: ${notes}`,
        }),
      });
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setName('');
        setEmail('');
        setPhone('');
        setSchoolName('');
        setNotes('');
      }, 2500);
    } catch (e) {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold">
            <School className="w-3.5 h-3.5 text-blue-700" />
            <span>Classroom Question Banks & School Pilot</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-950">
            Empower Your Class With CBSE Question Banks
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Get curated unit test question sets, step-by-step marking rubrics, and diagnostic student tracking for your school or coaching batch.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-slate-900 text-base">Inquiry Dispatched!</h4>
            <p className="text-xs text-emerald-800">
              Our academic partnership team will WhatsApp and email you sample printable unit test PDFs and teacher access details within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Teacher / Educator Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mrs. Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-slate-900 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">School / Institute Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DPS Bangalore South"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-slate-900 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-800 mb-1">WhatsApp Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-slate-900 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="teacher@school.edu.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-slate-900 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Primary Subject Focus</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-slate-900 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="Mathematics Standard (041)">Mathematics Standard (041)</option>
                <option value="Mathematics Basic (241)">Mathematics Basic (241)</option>
                <option value="Science (086)">Science (Physics, Chem, Bio) (086)</option>
                <option value="Social Science (087)">Social Science (087)</option>
                <option value="English Language & Literature (184)">English Language & Literature (184)</option>
                <option value="All CBSE Class 10 Subjects">All CBSE Class 10 Subjects (School-Wide)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">How can we assist you? (Optional)</label>
              <textarea
                rows={2}
                placeholder="e.g. Need printable test papers for 120 Class 10 students..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-slate-900 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 disabled:opacity-50 inline-flex items-center gap-1.5 shadow-sm"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Submit Teacher Inquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
