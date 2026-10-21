'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  Loader2,
  Bot,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Minimize2,
  Maximize2,
  HelpCircle,
} from 'lucide-react';
import { MathRenderer } from '../MathRenderer';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
}

interface LoopieChatProps {
  topic?: string;
  subjectName?: string;
  subjectSlug?: string;
  questionContext?: string;
}

export const LoopieChatWidget: React.FC<LoopieChatProps> = ({
  topic = 'General Practice',
  subjectName = 'CBSE Class 10 Science',
  subjectSlug = 'cbse-10-science',
  questionContext = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [quota, setQuota] = useState<{ total: any; used: number; remaining: any }>({
    total: 5,
    used: 0,
    remaining: 5,
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
          text: `🦉 **Hi! I'm Loopie**, your CBSE Class 10 Doubt Coach.\n\nI am locked to your active topic: **${topic}** (${subjectName}).\n\nAsk me about formulas, CBSE step-marking schemes, or concept derivations!`,
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
              text: data.message || "🦉 Daily limit reached! You've used today's 5 free doubts. Upgrade to LoopEdu Pro for unlimited doubts.",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
          if (data.quota) setQuota(data.quota);
          return;
        }
        throw new Error(data.message || data.error || 'Failed to get answer from Loopie');
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
          text: `⚠️ ${err.message || 'Error communicating with Loopie. Please try again.'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const remainingNum = typeof quota.remaining === 'number' ? quota.remaining : 999;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            fetchStatus();
          }}
          className="group relative flex items-center gap-2.5 bg-forest-900 hover:bg-forest-800 text-limeaccent px-4 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 border border-forest-700"
          aria-label="Ask Loopie Doubt Coach"
        >
          <span className="text-xl">🦉</span>
          <div className="flex flex-col items-start text-left">
            <span className="text-xs font-bold leading-none tracking-tight text-white group-hover:text-limeaccent">
              Ask Loopie
            </span>
            <span className="text-[10px] text-limeaccent/90 font-mono font-medium leading-tight">
              {sessionUser
                ? isPro
                  ? '⚡ Unlimited AI Doubts'
                  : `🦉 ${remainingNum}/5 Free Doubts`
                : 'Free CBSE AI Doubt Coach'}
            </span>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[410px] h-[550px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-academic-border flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-forest-900 text-white p-4 flex items-center justify-between border-b border-forest-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-forest-800 text-limeaccent flex items-center justify-center text-xl shadow-inner">
                🦉
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold tracking-tight">Loopie Doubt Solver</h3>
                  <span className="text-[9px] bg-limeaccent text-forest-950 font-mono font-bold px-1.5 py-0.2 rounded uppercase">
                    CBSE 10
                  </span>
                </div>
                <p className="text-[10px] text-academic-subtle truncate max-w-[200px]">
                  Topic: <span className="text-white font-medium">{topic}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-forest-800 flex items-center justify-center text-academic-subtle hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subheader: Quota Pill & Board Indicator */}
          <div className="bg-paper-100 border-b border-academic-border px-3.5 py-2 flex items-center justify-between text-[11px] shrink-0">
            <div className="flex items-center gap-1.5 text-forest-900 font-semibold truncate">
              <span className="w-2 h-2 rounded-full bg-forest-700" />
              <span className="truncate">{subjectName}</span>
            </div>

            {sessionUser ? (
              isPro ? (
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  ⚡ Pro Unlimited
                </span>
              ) : (
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    remainingNum <= 1
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-forest-50 text-forest-900 border-forest-200'
                  }`}
                >
                  🦉 {remainingNum}/5 Free Left Today
                </span>
              )
            ) : (
              <span className="text-[10px] text-forest-700 font-bold">Free Practice Mode</span>
            )}
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-paper-50/50">
            {/* If user not logged in, show mandatory login notice */}
            {!sessionUser && (
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 space-y-2.5 text-amber-950 text-xs shadow-2xs">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-950">Login Required to Chat</h4>
                    <p className="text-[11px] text-amber-800 leading-relaxed mt-0.5">
                      To ask doubts and save your questions and achievements to Supabase, please sign in. Free accounts include 5 doubts every day!
                    </p>
                  </div>
                </div>
                <Link
                  href={`/login?redirect=/study/${subjectSlug}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold py-2 px-3 rounded-xl text-xs uppercase tracking-wider transition"
                >
                  <span>Sign In or Create Free Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-forest-900 text-white rounded-br-none'
                      : msg.sender === 'system'
                      ? 'bg-amber-50 text-amber-950 border border-amber-200'
                      : 'bg-white text-forest-950 border border-academic-border rounded-bl-none'
                  }`}
                >
                  <MathRenderer content={msg.text} />
                </div>
                <span className="text-[9px] text-academic-subtle mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {sending && (
              <div className="flex items-start gap-2">
                <div className="bg-white border border-academic-border rounded-2xl rounded-bl-none p-3 text-xs flex items-center gap-2 text-forest-900 shadow-2xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-forest-800" />
                  <span>Loopie is reviewing NCERT guidelines...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick NCERT Prompt Chips */}
          {sessionUser && remainingNum > 0 && (
            <div className="px-3 pt-2 pb-1 bg-white border-t border-academic-border/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-[11px]">
              <button
                type="button"
                onClick={() => handleSend('Explain the official CBSE formula and theorem for this.')}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-paper-100 hover:bg-paper-200 text-forest-950 text-[10px] font-medium transition shrink-0"
              >
                📐 NCERT Formula
              </button>
              <button
                type="button"
                onClick={() => handleSend('What are the step-by-step marks awarded in CBSE for this?')}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-paper-100 hover:bg-paper-200 text-forest-950 text-[10px] font-medium transition shrink-0"
              >
                ✍️ Marking Steps
              </button>
              <button
                type="button"
                onClick={() => handleSend('What common trap or mistake do students make here?')}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-paper-100 hover:bg-paper-200 text-forest-950 text-[10px] font-medium transition shrink-0"
              >
                ⚠️ Common Pitfall
              </button>
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-academic-border shrink-0">
            {sessionUser ? (
              remainingNum > 0 ? (
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
                    placeholder={`Ask about ${topic.slice(0, 25)}...`}
                    disabled={sending}
                    className="flex-1 rounded-xl border border-academic-border bg-paper-50 px-3 py-2 text-xs text-forest-950 placeholder:text-academic-subtle focus:bg-white focus:outline-none focus:border-forest-800 transition"
                  />
                  <button
                    type="submit"
                    disabled={sending || !input.trim()}
                    className="w-9 h-9 rounded-xl bg-forest-900 hover:bg-forest-800 text-limeaccent flex items-center justify-center transition disabled:opacity-40 shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="text-center p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-1">
                  <p className="font-bold">Today's 5 free doubts used!</p>
                  <Link
                    href="/catalogue"
                    className="inline-block text-[11px] font-bold text-forest-900 underline"
                  >
                    Upgrade to LoopEdu Pro for unlimited doubts (₹299/mo) →
                  </Link>
                </div>
              )
            ) : (
              <Link
                href={`/login?redirect=/study/${subjectSlug}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-forest-900 hover:bg-forest-800 text-limeaccent font-bold py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider transition"
              >
                <span>Sign In to Ask Doubts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
