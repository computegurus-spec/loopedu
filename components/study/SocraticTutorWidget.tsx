'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Brain,
  Sparkles,
  X,
  Send,
  Loader2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Minimize2,
  Maximize2,
  HelpCircle,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { MathRenderer } from '../MathRenderer';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
}

interface SocraticTutorProps {
  topic?: string;
  subjectName?: string;
  subjectSlug?: string;
  questionContext?: string;
}

export const SocraticTutorWidget: React.FC<SocraticTutorProps> = ({
  topic = 'General Practice',
  subjectName = 'CBSE Class 10 Science',
  subjectSlug = 'cbse-10-science',
  questionContext = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [quota, setQuota] = useState<{ total: any; used: number; remaining: any }>({
    total: 10,
    used: 0,
    remaining: 10,
  });
  const [isPro, setIsPro] = useState(false);
  const [loadingSession, setLoadingSession] = useState(true);

  // Chat conversation state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Fetch user session and quota status
  const fetchStatus = () => {
    fetch('/api/ai/loopie')
      .then((res) => res.json())
      .then((data) => {
        setLoadingSession(false);
        if (data.signedIn) {
          setSessionUser(data.user);
          setIsPro(Boolean(data.isPro));
          if (data.quota) {
            setQuota(data.quota);
          }
        } else {
          setSessionUser(null);
        }
      })
      .catch(() => setLoadingSession(false));
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  // Set initial greeting when opened or topic changes
  useEffect(() => {
    if (chatMessages.length === 0) {
      setChatMessages([
        {
          id: 'welcome',
          sender: 'ai',
          text: `**Socratic Pedagogical Partner Active**.\n\nLocked to target unit: **${topic}** (${subjectName}).\n\nI decompose complex problems into first principles rather than giving away direct answers. What part of the conceptual setup are you analyzing?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [topic, subjectName]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, chatMessages, sending]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || sending) return;

    if (!sessionUser) {
      return;
    }

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSending(true);

    try {
      const res = await fetch('/api/ai/loopie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doubt: query,
          topic,
          subjectName,
          subjectSlug,
          questionContext,
          history: chatMessages.slice(-4),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === 'quota_exceeded') {
          setChatMessages((prev) => [
            ...prev,
            {
              id: `sys_${Date.now()}`,
              sender: 'system',
              text: data.message || "Daily Socratic inquiry budget reached. Pacing ceiling active to prevent fatigue.",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
          if (data.quota) setQuota(data.quota);
          return;
        }
        throw new Error(data.message || data.error || 'Failed to get Socratic response');
      }

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatMessages((prev) => [...prev, aiMsg]);
      if (data.quota) {
        setQuota(data.quota);
      }
    } catch (err: any) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'system',
          text: `⚠️ ${err.message || 'Error communicating with Socratic Tutor. Please try again.'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            fetchStatus();
          }}
          className="fixed bottom-6 right-6 z-40 bg-white border border-slate-200 hover:border-[#0066FF] text-slate-800 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 group font-sans"
          aria-label="Open Socratic Pedagogical Agent"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-[#0066FF] flex items-center justify-center text-white shadow-xs">
              <Brain className="w-4 h-4" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
          </div>

          <div className="text-left hidden sm:block pr-1">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span>Socratic Agent</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                Online
              </span>
            </div>
            <div className="text-[10px] text-slate-500">Step Guidance • No Direct Answers</div>
          </div>
        </button>
      )}

      {/* Socratic Terminal Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[460px] h-[600px] max-h-[85vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 font-sans">
          {/* Header */}
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#0066FF] flex items-center justify-center text-white shadow-2xs">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-slate-900 tracking-tight">Socratic Reasoning Partner</h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-[11px] text-slate-500 truncate max-w-[260px] font-medium">
                  Topic: {topic}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-800 p-1.5 rounded-xl hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 text-xs">
            {chatMessages.map((msg) => {
              const isAi = msg.sender === 'ai';
              const isSystem = msg.sender === 'system';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isSystem ? 'items-center my-2' : isAi ? 'items-start' : 'items-end'
                  }`}
                >
                  {isSystem ? (
                    <div className="bg-amber-50 border border-amber-200 text-amber-900 p-2.5 rounded-2xl text-[11px] max-w-sm text-center font-medium">
                      {msg.text}
                    </div>
                  ) : (
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 space-y-1 shadow-2xs leading-relaxed ${
                        isAi
                          ? 'bg-white border border-slate-200 text-slate-800'
                          : 'bg-[#0066FF] text-white font-medium'
                      }`}
                    >
                      <div className="text-[10px] opacity-70 flex items-center justify-between gap-4 font-semibold">
                        <span>{isAi ? 'Socratic Node' : 'You'}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <div className="prose prose-xs max-w-none text-xs">
                        <MathRenderer content={msg.text} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {sending && (
              <div className="flex items-center gap-2 text-slate-500 text-xs bg-white p-3 rounded-2xl border border-slate-200 w-fit shadow-2xs">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0066FF]" />
                <span>Deconstructing first principles...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Socratic Prompt Pills */}
          <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            {[
              'Deconstruct Step 1',
              'Where is the potential board trap?',
              'Explain formula intuition',
              'Give Socratic hint without solution',
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                disabled={sending}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 text-slate-700 hover:text-[#0066FF] hover:border-blue-200 shrink-0 transition font-medium"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200">
            {sessionUser ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask for a stepped breakdown or hint..."
                  disabled={sending}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:bg-white transition"
                />
                <button
                  type="submit"
                  disabled={sending || !input.trim()}
                  className="bg-[#0066FF] hover:bg-blue-600 text-white p-2.5 rounded-xl disabled:opacity-40 transition shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="text-center p-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-[#0066FF] hover:underline font-bold"
                >
                  <span>Sign in to activate Socratic inquiries →</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
