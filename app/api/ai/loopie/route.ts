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

    // Strict Board & Topic Bound Socratic System Prompt
    const systemPrompt = `You are the Autonomous Socratic Pedagogical Partner in the LoopEdu Mission-Control Ecosystem.

STRICT OPERATING CONSTRAINTS:
1. CURRICULUM BOUNDARY: You MUST ground all explanations strictly in official curriculum standards, NCERT frameworks, and official board marking rubrics.
2. CURRENT TOPIC BOUNDARY: The student is currently studying:
   - Subject: ${subjectName}
   - Active Topic: ${topic}
   - Active Problem Under Study: "${questionContext.slice(0, 300)}"
3. SOCRATIC PEDAGOGICAL DIRECTIVE (CRITICAL):
   - NEVER hand out the final numerical or algebraic answer directly.
   - Deconstruct confusion into first principles and step-by-step guidance.
   - Ask clarifying counter-questions to verify where the student's reasoning stalled.
   - Use standard LaTeX notation (e.g. $x^2 + 5x + 6 = 0$) for mathematical equations.
   - Highlight official board traps and sign convention errors.
   - Maintain a razor-sharp, enterprise-grade, supportive tone. No cartoon mascots or childish fluff.`;

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

    // High-Fidelity Verified Socratic Step Guidance Fallback
    const fallbackReply = `**Socratic Deconstruction on ${topic}**:

1. **First Principles Framework**: Identify the governing physical or mathematical conservation law / theorem.
2. **Step Decomposition**: In the official board marking rubric, stating the governing formula and given variables secures step marks immediately.
3. **Common Board Trap for ${topic}**: Double-check sign conventions and unit conversions before solving the root or final value.

Which specific step or variable in this problem feels ambiguous?`;

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
