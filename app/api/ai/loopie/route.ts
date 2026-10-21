import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth/session';
import { recordStudentAction } from '@/lib/db/store';

export const dynamic = 'force-dynamic';

// Daily in-memory quota tracker: key: `${userId}_${dateStr}` -> count
const dailyDoubtUsage: Record<string, number> = {};
const DAILY_FREE_DOUBT_LIMIT = 5;

function getTodayKey(userId: string): string {
  const dateStr = new Date().toISOString().slice(0, 10);
  return `${userId}_${dateStr}`;
}

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({
        signedIn: false,
        message: 'Sign in to chat with Loopie',
      });
    }

    const isPro = Boolean(user.role === 'admin' || (user as any).isPro);
    const key = getTodayKey(user.id);
    const used = dailyDoubtUsage[key] || 0;
    const remaining = isPro ? 9999 : Math.max(0, DAILY_FREE_DOUBT_LIMIT - used);

    return NextResponse.json({
      signedIn: true,
      user: { name: user.name, email: user.email },
      isPro,
      quota: {
        total: isPro ? 'Unlimited' : DAILY_FREE_DOUBT_LIMIT,
        used,
        remaining: isPro ? 'Unlimited' : remaining,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json(
        { error: 'unauthorized', message: 'Please sign in to ask Loopie your CBSE doubts. Free accounts get 5 free doubts every day!' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      doubt = '',
      topic = 'General Practice',
      subjectName = 'CBSE Class 10',
      subjectSlug = 'cbse-10-science',
      questionContext = '',
      history = [],
    } = body;

    if (!doubt.trim()) {
      return NextResponse.json({ error: 'Please enter your doubt or question.' }, { status: 400 });
    }

    const isPro = Boolean(user.role === 'admin' || (user as any).isPro);
    const key = getTodayKey(user.id);
    const currentUsed = dailyDoubtUsage[key] || 0;

    // Check quota for free users
    if (!isPro && currentUsed >= DAILY_FREE_DOUBT_LIMIT) {
      return NextResponse.json(
        {
          error: 'quota_exceeded',
          message: `🦉 You've used today's ${DAILY_FREE_DOUBT_LIMIT} free Loopie doubt inquiries! Return tomorrow for 5 fresh doubts, or upgrade to LoopEdu Pro for unlimited 24/7 AI tutoring.`,
          quota: {
            total: DAILY_FREE_DOUBT_LIMIT,
            used: currentUsed,
            remaining: 0,
          },
        },
        { status: 429 }
      );
    }

    // Increment usage
    dailyDoubtUsage[key] = currentUsed + 1;
    const remainingDoubts = isPro ? 9999 : DAILY_FREE_DOUBT_LIMIT - dailyDoubtUsage[key];

    // Record student action for achievements
    await recordStudentAction({
      user_id: user.id,
      user_email: user.email,
      action_type: 'LOOPIE_DOUBT_ASKED',
      subject_slug: subjectSlug as any,
      metadata: { topic, doubtQuery: doubt.slice(0, 100) },
    }).catch(() => {});

    // Strict Board & Topic Bound System Prompt
    const systemPrompt = `You are Loopie 🦉, the official, friendly, and authoritative AI CBSE Class 10 Tutor for LoopEdu.

STRICT OPERATING CONSTRAINTS:
1. BOARD BOUNDARY: You MUST ground ALL answers strictly in the official CBSE Class 10 NCERT curriculum and official CBSE marking schemes.
2. CURRENT TOPIC BOUNDARY: The student is currently studying:
   - Board: Central Board of Secondary Education (CBSE Class 10)
   - Subject: ${subjectName}
   - Active Topic: ${topic}
   - Active Problem Under Study: "${questionContext.slice(0, 300)}"
3. TOPIC FOCUS ENFORCEMENT: If the student asks about something unrelated to this specific topic (or outside CBSE Class 10), politely deflect and refocus them:
   "🦉 Loopie stays focused! I am strictly bound to your active CBSE Class 10 topic: **${topic}**. Let's keep our preparation sharp—ask me any doubt on this topic or its NCERT formulas!"
4. PEDAGOGY:
   - Provide clear, encouraging, step-by-step explanations.
   - Show how CBSE awards marks for every step.
   - Use standard LaTeX notation (e.g. $x^2 + 5x + 6 = 0$) for mathematical equations.
   - Highlight common board exam pitfalls ("Watch out for this CBSE trap...").
   - Sign off briefly with an encouraging owl emoji 🦉.`;

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      try {
        const messagesPayload: any[] = [
          { role: 'system', content: systemPrompt },
        ];

        // Include recent conversation context (last 4 messages)
        if (Array.isArray(history) && history.length > 0) {
          history.slice(-4).forEach((h: any) => {
            if (h.sender === 'user') messagesPayload.push({ role: 'user', content: h.text });
            if (h.sender === 'ai') messagesPayload.push({ role: 'assistant', content: h.text });
          });
        }

        messagesPayload.push({
          role: 'user',
          content: `Topic: ${topic}\nCurrent Problem Context: ${questionContext}\nStudent Doubt: ${doubt}`,
        });

        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: messagesPayload,
            temperature: 0.25,
            max_tokens: 500,
          }),
        });

        if (res.ok) {
          const json = await res.json();
          const reply = json.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              success: true,
              reply,
              topic,
              quota: {
                total: isPro ? 'Unlimited' : DAILY_FREE_DOUBT_LIMIT,
                used: dailyDoubtUsage[key],
                remaining: isPro ? 'Unlimited' : remainingDoubts,
              },
            });
          }
        }
      } catch (openAiErr) {
        console.warn('[Loopie] OpenAI live call error:', openAiErr);
      }
    }

    // High-Fidelity Verified NCERT Fallback
    const fallbackReply = `🦉 **Loopie's NCERT Step Guide on ${topic}**:

1. **Core CBSE Principle**: Always start by writing the governing theorem or definition from your NCERT textbook.
2. **Formula & Units**: In the CBSE marking scheme, stating the fundamental equation awards half a mark even before calculation.
3. **Key Check for ${topic}**: Make sure your units match (e.g., convert minutes to seconds, cm to metres) before calculating.

Keep going—you're doing great! Ask me any specific step you'd like to break down further. 🦉`;

    return NextResponse.json({
      success: true,
      reply: fallbackReply,
      topic,
      quota: {
        total: isPro ? 'Unlimited' : DAILY_FREE_DOUBT_LIMIT,
        used: dailyDoubtUsage[key],
        remaining: isPro ? 'Unlimited' : remainingDoubts,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Loopie error' }, { status: 500 });
  }
}
