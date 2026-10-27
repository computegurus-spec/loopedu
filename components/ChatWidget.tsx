'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  User,
  Mail,
  BookOpen,
  Check,
  Loader2,
  Bot,
  HelpCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { MathRenderer } from './MathRenderer';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
}

interface SessionData {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    isPro?: boolean;
  } | null;
  isAdmin: boolean;
  isPaid: boolean;
  enrolledSubjects: string[];
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<SessionData | null>(null);

  // Tab for non-pro visitors: 'ask' or 'contact'
  const [activeTab, setActiveTab] = useState<'ask' | 'contact'>('ask');

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Maths Standard');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState<{ ticketId: string; message: string } | null>(null);
  const [contactError, setContactError] = useState('');

  // AI Chat State
  const [selectedSubjectTrack, setSelectedSubjectTrack] = useState('Mathematics Standard (041)');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I am the **LoopEdu AI Study Coach**.\n\nI can help you understand tricky concepts, formula derivations, and official step-by-step marking schemes. What are you working on today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch session to determine if user has Pro access
  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data: SessionData) => {
        setSession(data);
        if (data.user?.email) {
          setContactEmail(data.user.email);
          setContactName(data.user.name || '');
        }
      })
      .catch(() => {});
  }, []);

  const isPro = Boolean(session?.isPaid || session?.isAdmin || session?.user?.isPro);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, chatMessages]);

  // Handle Contact Submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactMessage) {
      setContactError('Please provide your email and message.');
      return;
    }
    setContactSubmitting(true);
    setContactError('');

    try {
      const res = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          subject: contactSubject,
          message: contactMessage,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');

      setContactSuccess({
        ticketId: data.messageId || `TKT-${Math.floor(100000 + Math.random() * 900000)}`,
        message: data.confirmation || 'Inquiry registered. Our academic desk will reply via email shortly.',
      });
      setContactMessage('');
    } catch (err: any) {
      setContactError(err.message || 'Could not send message. Please try again.');
    } finally {
      setContactSubmitting(false);
    }
  };

  // Handle AI Chat Message
  const handleSendAiMessage = async (textToSend?: string) => {
    const query = (textToSend || chatInput).trim();
    if (!query || aiLoading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setAiLoading(true);

    try {
      const res = await fetch('/api/ai/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          topic: selectedSubjectTrack,
          source: 'NCERT Textbook & Official CBSE Marking Scheme',
          action: 'ask',
          userQuery: query,
        }),
      });

      const data = await res.json();
      const aiReplyText =
        data.text ||
        'According to the NCERT syllabus, write each procedural step clearly with correct units to secure full step marks.';

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: 'system',
        text: 'Unable to reach the coaching server. Please check your connection and try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, errorMsg]);
    } finally {
      setAiLoading(false);
    }
  };

  const samplePrompts = [
    'How is √5 proved irrational step-by-step?',
    'What is the step-marking for Pythagoras theorem?',
    'Difference between real and virtual image',
  ];

  const pathname = usePathname();
  if (pathname === '/') {
    return null;
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-14 right-4 sm:bottom-16 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 ${
            isOpen
              ? 'bg-forest-950 text-white border border-forest-800'
              : 'bg-forest-900 hover:bg-forest-800 text-white border border-forest-700'
          }`}
          aria-label={isOpen ? 'Close assistant' : 'Open LoopEdu Assistant'}
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-limeaccent" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-limeaccent rounded-full animate-ping" />
          </div>

          <div className="text-left hidden xs:block">
            <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
              <span>LoopEdu Assistant</span>
              {isPro && (
                <span className="bg-limeaccent text-forest-950 text-[10px] px-1 py-0.2 rounded font-bold">
                  PRO
                </span>
              )}
            </div>
            <div className="text-[10px] text-paper-300">
              {isPro ? 'NCERT AI Coach' : 'Doubts & Support'}
            </div>
          </div>

          {isOpen ? (
            <X className="w-4 h-4 ml-1 text-paper-400 group-hover:text-white" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-limeaccent hidden xs:inline" />
          )}
        </button>
      </div>

      {/* Chat / Support Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-3 sm:bottom-16 sm:right-6 z-50 w-[94vw] sm:w-[410px] max-h-[calc(100vh-80px)] h-[530px] bg-white rounded-3xl shadow-2xl border border-academic-border flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Clean Header */}
          <div className="bg-forest-950 text-white p-3.5 sm:p-4 border-b border-forest-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-forest-900 text-limeaccent flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-white flex items-center gap-1.5">
                  <span>LoopEdu Assistant</span>
                  {isPro && (
                    <span className="bg-limeaccent text-forest-950 text-[10px] px-1.5 py-0.2 rounded font-bold">
                      PRO
                    </span>
                  )}
                </h3>
                <p className="text-[11px] text-forest-300">
                  {isPro ? 'NCERT AI Coach • Unlimited Access' : 'Doubts & Academic Support'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-forest-400 hover:text-white p-1 rounded-lg transition"
              aria-label="Close assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Subheader: Subject Focus for Pro or Tab Switcher for Guest */}
          {isPro ? (
            <div className="px-3.5 py-2 bg-paper-100 border-b border-academic-border flex items-center justify-between text-xs">
              <span className="text-[11px] text-academic-subtle font-medium">Subject Focus:</span>
              <select
                value={selectedSubjectTrack}
                onChange={(e) => setSelectedSubjectTrack(e.target.value)}
                className="text-xs bg-white border border-academic-border rounded-lg px-2 py-1 text-forest-950 focus:outline-none focus:ring-1 focus:ring-forest-800 font-medium"
              >
                <option value="Mathematics Standard (041)">Maths Standard (041)</option>
                <option value="Mathematics Basic (241)">Maths Basic (241)</option>
                <option value="Science (086)">Science (086)</option>
                <option value="Social Science (087)">Social Science (087)</option>
                <option value="English Language & Literature (184)">English (184)</option>
                <option value="German (017)">German (017)</option>
                <option value="Artificial Intelligence (417)">AI (417)</option>
              </select>
            </div>
          ) : (
            <div className="flex border-b border-academic-border bg-paper-50 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('ask')}
                className={`flex-1 py-2.5 text-center transition ${
                  activeTab === 'ask'
                    ? 'text-forest-950 border-b-2 border-forest-950 bg-white font-bold'
                    : 'text-academic-subtle hover:text-forest-900'
                }`}
              >
                Ask a Doubt
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-2.5 text-center transition ${
                  activeTab === 'contact'
                    ? 'text-forest-950 border-b-2 border-forest-950 bg-white font-bold'
                    : 'text-academic-subtle hover:text-forest-900'
                }`}
              >
                Contact Support
              </button>
            </div>
          )}

          {/* CHAT VIEW (Active for Pro users, or guest on 'ask' tab) */}
          {isPro || activeTab === 'ask' ? (
            <div className="flex-1 flex flex-col bg-paper-50 overflow-hidden">
              {/* Message History */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-forest-900 text-white rounded-br-xs'
                          : 'bg-white border border-academic-border text-forest-950 rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      {msg.sender === 'ai' ? (
                        <div className="prose prose-xs max-w-none text-forest-950">
                          <MathRenderer text={msg.text} />
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      )}
                    </div>
                    <span className="text-[10px] text-academic-subtle mt-0.5 px-1">{msg.timestamp}</span>
                  </div>
                ))}

                {aiLoading && (
                  <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-academic-border w-fit text-xs text-forest-700">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-forest-900" />
                    <span>Verifying NCERT step-marking rubrics...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Sample Doubt Prompts */}
              <div className="px-3 py-1.5 bg-paper-100/60 border-t border-academic-border/60 overflow-x-auto flex gap-1.5 no-scrollbar">
                {samplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendAiMessage(prompt)}
                    className="whitespace-nowrap px-2.5 py-1 bg-white hover:bg-forest-50 border border-academic-border rounded-full text-[11px] text-forest-800 hover:text-forest-950 transition flex-shrink-0"
                  >
                    💡 {prompt}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <div className="p-2.5 bg-white border-t border-academic-border">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendAiMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask any formula, derivation, or doubt..."
                    disabled={aiLoading}
                    className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 bg-paper-50 border border-academic-border rounded-xl text-forest-950 placeholder:text-academic-subtle focus:outline-none focus:ring-1 focus:ring-forest-800"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || aiLoading}
                    className="p-2.5 bg-forest-900 hover:bg-forest-800 disabled:opacity-50 text-limeaccent rounded-xl transition shadow-sm"
                    aria-label="Send query"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {!isPro && (
                  <div className="flex items-center justify-between text-[11px] text-academic-subtle mt-1.5 px-1 pt-1 border-t border-academic-border/40">
                    <span>Free Preview</span>
                    <Link
                      href="/catalogue"
                      onClick={() => setIsOpen(false)}
                      className="text-forest-950 font-bold hover:underline"
                    >
                      Unlock Pro (₹299/mo) →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* CONTACT US VIEW (For Guests on 'contact' tab) */
            <div className="flex-1 flex flex-col bg-paper-50 overflow-y-auto p-4 space-y-4">
              <div className="bg-white rounded-2xl border border-academic-border p-4 shadow-sm space-y-3">
                <div className="border-b border-academic-border pb-2">
                  <h4 className="text-xs font-bold text-forest-950 uppercase tracking-wider">
                    Message Academic Support
                  </h4>
                  <p className="text-[11px] text-academic-subtle mt-0.5">
                    Have questions about subjects, parent observability, or subscriptions?
                  </p>
                </div>

                {contactSuccess ? (
                  <div className="p-3.5 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-forest-950">
                      <Check className="w-4 h-4 text-forest-700" />
                      <span>Inquiry Submitted!</span>
                    </div>
                    <p className="text-xs text-forest-800">{contactSuccess.message}</p>
                    <div className="text-[10px] font-mono text-academic-subtle">
                      Reference Ticket: <strong>{contactSuccess.ticketId}</strong>
                    </div>
                    <button
                      onClick={() => setContactSuccess(null)}
                      className="text-xs text-forest-900 font-bold underline mt-1"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    {contactError && (
                      <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-900 text-xs">
                        {contactError}
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-semibold text-forest-950 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Aryan Sharma"
                        className="w-full text-xs px-3 py-2 bg-paper-50 border border-academic-border rounded-lg text-forest-950 focus:outline-none focus:ring-1 focus:ring-forest-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-forest-950 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="parent@example.com"
                        className="w-full text-xs px-3 py-2 bg-paper-50 border border-academic-border rounded-lg text-forest-950 focus:outline-none focus:ring-1 focus:ring-forest-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-forest-950 mb-1">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="How can we help your board preparation?"
                        className="w-full text-xs px-3 py-2 bg-paper-50 border border-academic-border rounded-lg text-forest-950 focus:outline-none focus:ring-1 focus:ring-forest-800"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={contactSubmitting}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold py-2.5 rounded-xl text-xs transition shadow-sm disabled:opacity-50"
                    >
                      {contactSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <span>Send Message</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
