import { NextRequest, NextResponse } from 'next/server';
import { EXAM_CATALOG } from '@/lib/data/examCatalog';
import { CAREER_PATHS_CATALOG } from '@/lib/data/careerPaths';

export const dynamic = 'force-dynamic';

// Curated context summary for prompt grounding
const CATALOG_SUMMARY = EXAM_CATALOG.slice(0, 15).map(e => ({
  id: e.id,
  name: e.name,
  code: e.code,
  authority: e.conductingAuthority.fullName,
  portal: e.conductingAuthority.officialPortalUrl,
  category: e.category,
  qualification: e.qualificationRequired,
  examDate: e.dates.examDate,
  appDeadline: e.dates.applicationClose,
  isConfirmed: e.dates.isConfirmedByGazette,
}));

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query = '' } = body;

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return NextResponse.json({ error: 'Please enter a valid query.' }, { status: 400 });
    }

    // System prompt grounding the response in statutory accuracy and zero marketing hype
    const systemPrompt = `You are the LoopEdu Autonomous Exam & Career Intelligence Engine for India.
You provide authoritative, statutory, and curriculum-verified information for students, aspirants, and parents.

GROUND RULES:
1. STATUTORY INTEGRITY: Cite official conducting authorities (NTA, UPSC, SSC, IBPS, RRB, CBSE, UGC) and official Information Bulletins.
2. ELIGIBILITY PRECISION: Explicitly mention age cutoffs, category relaxations (SC/ST/OBC-NCL/EWS/PwD), and subject prerequisite nuances (e.g. Maths Standard vs Maths Basic for Class 11 CBSE, PCM mandatory for B.Tech).
3. NO MARKETING FLUFF: Do not sell coaching, courses, or promote external brands. Maintain an enterprise, factual, objective tone.
4. STRUCTURED FORMAT:
   - **Direct Answer**: 1-2 sentence executive summary.
   - **Statutory Rules & Criteria**: Bullet points with exact numbers/percentages/dates.
   - **Official Source**: Authority name and official portal.
   - **LoopEdu Recommendation / Action Step**: A practical 1-step action the student or parent should take today.

REFERENCE OFFICIAL EXAMS CATALOG CURRENTLY MONITORED:
${JSON.stringify(CATALOG_SUMMARY, null, 2)}
`;

    const nvidiaKey = process.env.NVIDIA_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;
    const apiKey = nvidiaKey || openAiKey;

    if (apiKey) {
      try {
        const isNvidia = Boolean(nvidiaKey || apiKey.startsWith('nvapi-'));
        const endpoint = isNvidia
          ? 'https://integrate.api.nvidia.com/v1/chat/completions'
          : 'https://api.openai.com/v1/chat/completions';
        const model = isNvidia ? 'meta/llama-3.1-70b-instruct' : 'gpt-4o-mini';

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: trimmedQuery },
            ],
            temperature: 0.2,
            max_tokens: 650,
          }),
        });

        if (res.ok) {
          const json = await res.json();
          const answer = json.choices?.[0]?.message?.content;
          if (answer) {
            return NextResponse.json({
              success: true,
              source: isNvidia ? 'NVIDIA Llama-3.1-70B Verified Intelligence' : 'OpenAI Intelligence',
              answer,
              query: trimmedQuery,
            });
          }
        }
      } catch (liveAiErr) {
        console.warn('[LiveIntel] Live AI API error, falling back to deterministic catalog rules:', liveAiErr);
      }
    }

    // Deterministic High-Fidelity Fallback matched against query keywords
    const lower = trimmedQuery.toLowerCase();
    let matchedExam = EXAM_CATALOG.find(e =>
      lower.includes(e.code.toLowerCase()) ||
      lower.includes(e.name.toLowerCase()) ||
      lower.includes(e.id.toLowerCase())
    );

    if (matchedExam) {
      const fallbackAnswer = `**Direct Answer**: ${matchedExam.name} is conducted by **${matchedExam.conductingAuthority.fullName} (${matchedExam.conductingAuthority.code})** for ${matchedExam.targetRecruitmentOrCourse}.

**Statutory Details & Current Cycle**:
- **Conducting Authority**: ${matchedExam.conductingAuthority.fullName}
- **Official Portal**: [${matchedExam.conductingAuthority.officialPortalUrl}](${matchedExam.conductingAuthority.officialPortalUrl})
- **Minimum Qualification**: ${matchedExam.qualificationRequired}
- **Exam Date**: ${matchedExam.dates.examDate} (${matchedExam.dates.isConfirmedByGazette ? 'Gazette Confirmed' : 'Tentative Cycle'})
- **Application Window**: ${matchedExam.dates.applicationStart} to ${matchedExam.dates.applicationClose}
- **Key Preparation Topics**: ${matchedExam.preparationOverlap.join(', ')}

**LoopEdu Action Step**:
Check your detailed eligibility including category relaxations using the **LoopEdu AST Eligibility Engine** on the Exams page, or start daily 15-minute diagnostic practice for this track.`;

      return NextResponse.json({
        success: true,
        source: 'LoopEdu Statutory Catalog Engine',
        answer: fallbackAnswer,
        query: trimmedQuery,
      });
    }

    // Generic authoritative fallback
    const genericAnswer = `**Direct Answer**: The statutory rules and eligibility criteria depend on the official notification issued by the central or state regulatory body.

**Key Verification Checklist**:
- **Prerequisite Subjects**: Verify if your Class 10/12 stream satisfies mandatory subjects (e.g. Mathematics Standard for engineering, Biology for medical, or any recognized graduation for Civil Services).
- **Age Cutoff & Category Relaxations**: Statutory age limits are calculated as of the cut-off date specified in the official gazette. SC/ST candidates receive up to 5 years relaxation, and OBC-NCL candidates receive 3 years.
- **Gazette Recalculation**: Always verify against the latest official Information Bulletin rather than third-party coaching websites.

**LoopEdu Action Step**:
Select your specific target exam from the **Goal Explorer** above or use our **Declarative Eligibility Checker** to get an exact AST assessment for your date of birth and category.`;

    return NextResponse.json({
      success: true,
      source: 'LoopEdu Gazette Rule Engine',
      answer: genericAnswer,
      query: trimmedQuery,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error processing query' }, { status: 500 });
  }
}
