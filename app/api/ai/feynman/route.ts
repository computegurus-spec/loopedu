import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    const body = await req.json();
    const { question, topic, conceptExplanation, correctExplanation, subjectName } = body;

    if (!conceptExplanation || conceptExplanation.trim().length < 5) {
      return NextResponse.json(
        { error: 'Explanation is too short. Explain the core intuition in at least 1-2 sentences.' },
        { status: 400 }
      );
    }

    const nvidiaKey = process.env.NVIDIA_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;
    const apiKey = nvidiaKey || openAiKey;

    // Deterministic pedagogical evaluation rubric
    if (apiKey) {
      try {
        const isNvidia = Boolean(nvidiaKey || apiKey.startsWith('nvapi-'));
        const endpoint = isNvidia
          ? 'https://integrate.api.nvidia.com/v1/chat/completions'
          : 'https://api.openai.com/v1/chat/completions';
        const model = isNvidia ? 'meta/llama-3.1-70b-instruct' : 'gpt-4o-mini';

        const systemPrompt = `You are the Feynman Concept Defense Evaluator in an autonomous pedagogical multi-agent system.
Your job is to test if a student truly understands the underlying concept (the "Why") rather than just memorizing formulas or rote steps.

Evaluate the student's explanation against the question and the reference concept.
Question: "${question}"
Topic: "${topic}" (${subjectName || 'Academic Standard'})
Reference Conceptual Principle: "${correctExplanation || topic}"

Return ONLY a valid JSON object with:
{
  "score": number (0 to 100),
  "masteryLevel": "Intuitive Mastery" | "Solid Understanding" | "Partial / Formula-Heavy" | "Misconception Detected",
  "strengths": string,
  "blindSpot": string,
  "socraticRecommendation": string
}
Keep feedback concise, high-signal, enterprise-grade, and free of patronizing fluff or emojis.`;

        const requestBody: any = {
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Student Explanation: "${conceptExplanation}"` },
          ],
          temperature: 0.2,
        };

        // OpenAI supports response_format: { type: 'json_object' }
        if (!isNvidia) {
          requestBody.response_format = { type: 'json_object' };
        }

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(requestBody),
        });

        if (res.ok) {
          const json = await res.json();
          const content = json.choices?.[0]?.message?.content;
          if (content) {
            const parsed = JSON.parse(content);
            return NextResponse.json({ success: true, evaluation: parsed });
          }
        }
      } catch (e) {
        console.warn('[Feynman Evaluator API] Live call error:', e);
      }
    }

    // Heuristic fallback if API key unavailable
    const words = conceptExplanation.trim().split(/\s+/).length;
    const hasWhy = /because|since|proportional|inversely|ratio|derivation|due to|represents/i.test(conceptExplanation);
    let score = Math.min(95, 60 + (hasWhy ? 20 : 0) + Math.min(15, words));

    return NextResponse.json({
      success: true,
      evaluation: {
        score,
        masteryLevel: score >= 80 ? 'Solid Understanding' : 'Partial / Formula-Heavy',
        strengths: hasWhy
          ? 'Clear causal reasoning identified; articulated why the principle holds true.'
          : 'Good recall of operational variables and definition.',
        blindSpot: hasWhy
          ? 'Verify boundary conditions and edge-case applicability.'
          : 'Relies heavily on formula definition rather than physical or mathematical intuition.',
        socraticRecommendation:
          'Next step: Explain what happens when one variable approaches zero to confirm limiting behavior.',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Evaluation error' }, { status: 500 });
  }
}
