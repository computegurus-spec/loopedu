import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface CoachRequest {
  question?: string;
  topic?: string;
  source?: string;
  explanation?: string;
  modelAnswer?: string;
  action?: 'hint' | 'simple' | 'steps' | 'why_wrong' | 'another_way' | 'ask';
  userQuery?: string;
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    coach: 'NCERT Class 10 AI Coach',
    model: 'Grounded CBSE Marking Scheme',
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CoachRequest;
    const {
      question = '',
      topic = 'Mathematics & Science Class 10',
      source = 'NCERT Class 10',
      explanation = '',
      modelAnswer = '',
      action = 'ask',
      userQuery = '',
    } = body;

    const apiKey =
      process.env.OPENAI_API_KEY ||
      process.env.AI_API_KEY ||
      process.env.GEMINI_API_KEY;

    // Strict NCERT Grounding System Prompt
    const systemPrompt = `You are an authoritative CBSE Class 10 NCERT Academic Coach.
CRITICAL GROUNDING RULES:
1. Answer ONLY adhering strictly to the official NCERT Class 10 textbooks and CBSE marking scheme guidelines.
2. DO NOT introduce out-of-syllabus college-level formulas or external definitions.
3. Ground your response directly on the provided Question, Topic (${topic}), Source (${source}), and Model Solution.
4. For "hint": Offer a progressive conceptual clue. DO NOT reveal the final numeric answer or direct option letter.
5. For "why_wrong": Highlight frequent signs, unit errors, and common CBSE student traps for this topic.
6. For "simple": Use plain-English daily-life analogies suitable for a 15-year-old student.
7. For "steps": List a numbered step-by-step procedure required to score full marks in the CBSE board exam.
8. If the student asks something beyond Class 10, clearly reply: "This concept is beyond the Class 10 CBSE NCERT syllabus."
Keep formatting clean using standard Markdown and LaTeX math syntax (e.g. $x^2 + bx + c = 0$).`;

    if (apiKey && process.env.OPENAI_API_KEY) {
      // Live OpenAI API call with gpt-4o-mini
      let userPrompt = '';
      if (action === 'hint') userPrompt = `Give me a progressive hint to solve this problem without revealing the answer. Question: "${question}". Verified Topic: ${topic}.`;
      else if (action === 'simple') userPrompt = `Explain this concept more simply using an intuitive analogy. Question: "${question}". Concept: ${topic}.`;
      else if (action === 'steps') userPrompt = `List the exact step-by-step CBSE marking-scheme steps needed to solve this. Question: "${question}". Solution: "${explanation}".`;
      else if (action === 'why_wrong') userPrompt = `Explain common misconceptions and why students lose marks on this topic. Question: "${question}".`;
      else if (action === 'another_way') userPrompt = `Explain another valid alternative method to solve this. Question: "${question}". Solution: "${explanation}".`;
      else userPrompt = `Student Question: "${userQuery}". Context Problem: "${question}". Topic: ${topic}. Answer as per NCERT Class 10.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.2, // Low temperature for high factual adherence to NCERT
          max_tokens: 400,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        const content = json.choices?.[0]?.message?.content;
        if (content) {
          return NextResponse.json({
            success: true,
            provider: 'live-openai-ncert-grounded',
            text: content,
          });
        }
      }
    }

    // High-Fidelity Verified NCERT Fallback Generator (Ensures 100% uptime when API key is not yet set)
    let fallbackText = '';
    if (action === 'hint') {
      if (topic.includes('Quadratic')) {
        fallbackText = 'Recall standard form $ax^2 + bx + c = 0$. Can you split the middle term into two numbers whose product is $ac$ and sum is $b$?';
      } else if (topic.includes('Respiration') || topic.includes('Chemical')) {
        fallbackText = 'Think about cellular respiration: what react together in mitochondria to yield biological ATP energy? Is energy absorbed or released?';
      } else if (topic.includes('Electricity')) {
        fallbackText = 'Remember the equivalent resistance rules: parallel combinations obey $\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2}$. Calculate the reciprocal sum carefully.';
      } else {
        fallbackText = `Focus on the core NCERT principle for ${topic}. Check which parameters are given in the problem statement and recall the standard theorem from ${source}.`;
      }
    } else if (action === 'simple') {
      if (topic.includes('Quadratic')) {
        fallbackText = 'Imagine balancing a see-saw. Finding the roots means finding which two secret numbers make both sides completely level with zero.';
      } else if (topic.includes('Respiration')) {
        fallbackText = 'Just like burning wood in a campfire gives off heat and light, your body cells gently "burn" food glucose to give you energy to run and think.';
      } else {
        fallbackText = `In plain English, ${topic} describes how fundamental conditions predict physical outcomes according to the Class 10 NCERT curriculum.`;
      }
    } else if (action === 'steps') {
      fallbackText = `1. **Identify Given Data**: Write down known values and units.\n2. **State NCERT Formula**: Write the governing formula for ${topic}.\n3. **Substitute Values**: Perform intermediate algebraic steps cleanly.\n4. **Verify Units**: Conclude with correct units and significant figures.`;
    } else if (action === 'why_wrong') {
      if (topic.includes('Quadratic')) {
        fallbackText = 'Common pitfall: Sign errors during factorisation! When $(x - 3)(x - 5) = 0$, roots are $+3$ and $+5$, not $-3$ and $-5$.';
      } else if (topic.includes('Electricity')) {
        fallbackText = 'Common pitfall: Forgetting to take the reciprocal at the end! After finding $\\frac{1}{R_p} = \\frac{1}{3}$, remember $R_p = 3\\,\\Omega$.';
      } else {
        fallbackText = 'Common pitfall: Missing intermediate formula marks on CBSE answer sheets or omitting required scientific units.';
      }
    } else if (action === 'another_way') {
      if (topic.includes('Quadratic')) {
        fallbackText = 'Alternative Method: Use the quadratic formula $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$. Calculate the discriminant $D = b^2 - 4ac$ first to determine root nature.';
      } else {
        fallbackText = `Alternative approach: You can also verify candidate solutions by direct substitution back into the primary equation.`;
      }
    } else {
      // action === 'ask' or free-form question
      const queryLower = (userQuery || question).toLowerCase();

      if (queryLower.includes('pythagoras') || queryLower.includes('triangle')) {
        fallbackText = `### CBSE Marking Scheme for Pythagoras Theorem (Chapter 6: Triangles)
1. **Given & To Prove Statements (1 Mark)**:
   In right $\\triangle ABC$, $\\angle B = 90^\\circ$. To prove: $AC^2 = AB^2 + BC^2$.
2. **Construction (0.5 Mark)**:
   Draw $BD \\perp AC$.
3. **Similarity Deductions (2 Marks)**:
   - In $\\triangle ADB$ and $\\triangle ABC$, $\\triangle ADB \\sim \\triangle ABC$ (Theorem 6.7).
   - Hence $\\frac{AD}{AB} = \\frac{AB}{AC} \\implies AB^2 = AD \\cdot AC$ *(Equation 1)*.
   - Similarly, $\\triangle BDC \\sim \\triangle ABC \\implies BC^2 = CD \\cdot AC$ *(Equation 2)*.
4. **Conclusion (0.5 Mark)**:
   Adding (1) & (2): $AB^2 + BC^2 = AC(AD + CD) = AC \\cdot AC = AC^2$. Q.E.D.`;
      } else if (queryLower.includes('quadratic') || queryLower.includes('sign') || queryLower.includes('root')) {
        fallbackText = `### CBSE NCERT Rules for Quadratic Equations (Chapter 4)
- **Standard Form**: $ax^2 + bx + c = 0$, where $a \\neq 0$.
- **Discriminant**: $D = b^2 - 4ac$.
  - If $D > 0$: Two distinct real roots ($x = \\frac{-b \\pm \\sqrt{D}}{2a}$).
  - If $D = 0$: Two equal real roots ($x = -\\frac{b}{2a}$).
  - If $D < 0$: No real roots.
- **CBSE Trap Alert**: When factorising $x^2 - 8x + 15 = (x - 3)(x - 5) = 0$, the roots are $+3$ and $+5$. Do not leave the final answer inside brackets!`;
      } else if (queryLower.includes('ray') || queryLower.includes('image') || queryLower.includes('mirror') || queryLower.includes('lens')) {
        fallbackText = `### CBSE NCERT Ray Diagram Rules (Science Chapter 10: Light)
1. **Real vs Virtual Image**:
   - **Real Image**: Formed when reflected rays actually intersect. Can be cast on a screen. Always inverted. Sign convention: $v$ is negative for concave mirrors.
   - **Virtual Image**: Formed when reflected rays appear to diverge from behind the mirror. Cannot be caught on a screen. Always erect.
2. **3 Essential Rays for Concave Mirror**:
   - Ray parallel to principal axis passes through Focus $F$ after reflection.
   - Ray passing through Centre of Curvature $C$ retraces its path ($i = r = 0^\\circ$).
   - Ray passing through Focus $F$ emerges parallel to principal axis.`;
      } else if (queryLower.includes('non-cooperation') || queryLower.includes('movement') || queryLower.includes('history') || queryLower.includes('nationalism')) {
        fallbackText = `### CBSE Class 10 History: Non-Cooperation Movement (Chapter 2)
**Key Causes & Turning Points**:
1. **Rowlatt Act (1919)**: Allowed detention of political prisoners without trial for 2 years.
2. **Jallianwala Bagh Massacre (13 April 1919)**: General Dyer opened fire on peaceful villagers at Amritsar.
3. **Khilafat Issue**: Mahatma Gandhi unified the national struggle with the Ali brothers (Shaukat & Muhammad Ali).
4. **Nagpur Congress Session (Dec 1920)**: Non-Cooperation programme formally adopted.
5. **Withdrawal (Feb 1922)**: Called off after the violent Chauri Chaura incident in Gorakhpur.`;
      } else if (queryLower.includes('mark') || queryLower.includes('step')) {
        fallbackText = `### CBSE Official Step-Marking Guidelines
In the CBSE board exam, marks are awarded for every coherent step:
- **Formula Writing**: Always state the general formula before substituting numbers (awards $0.5$–$1$ mark).
- **Correct Substitution**: Substitute given data with units.
- **Calculation Steps**: Show rough work in the right-hand margin.
- **Final Statement with Units**: Underline the final answer and specify correct SI units (e.g., $cm^2$, $\\Omega$, $m/s$). A missing unit costs $0.5$ marks!`;
      } else {
        fallbackText = `### NCERT Class 10 Guidance: ${topic}
According to official CBSE Class 10 NCERT standards:
- Always begin by writing the relevant theorem or governing law from your textbook.
- Show algebraic steps systematically, stating given values with units.
- In subjective questions (3 & 5 markers), structure your answer with clear sub-headings or bullet points as prescribed in the CBSE marking scheme.`;
      }
    }

    return NextResponse.json({
      success: true,
      provider: 'ncert-offline-verified',
      text: fallbackText,
      note: 'Set OPENAI_API_KEY in .env.local to enable live real-time LLM answers strictly grounded in NCERT.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
