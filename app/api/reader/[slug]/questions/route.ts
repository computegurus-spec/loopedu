import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser, isUserAdmin } from '@/lib/auth/session';
import { getQuestionsForSubject, hasActiveEntitlement, getSubject } from '@/lib/db/store';
import { SubjectSlug } from '@/types';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug as SubjectSlug;
    const subject = await getSubject(slug);
    if (!subject) {
      return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
    }

    const user = await getSessionUser();
    const isAdmin = isUserAdmin(user);
    const isEntitled = user ? await hasActiveEntitlement(user.id, slug) : false;

    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '50', 10);
    const offset = parseInt(url.searchParams.get('offset') || '0', 10);
    const topic = url.searchParams.get('topic') || undefined;
    const search = url.searchParams.get('search') || undefined;

    const { questions, total } = await getQuestionsForSubject(slug, {
      isEntitled,
      isAdmin,
      limit,
      offset,
      topic,
      search,
    });

    // Strip answers and explanations if the user is neither entitled nor admin and question is not a public sample
    const safeQuestions = questions.map((q) => {
      if (!isEntitled && !isAdmin && !q.is_sample) {
        return {
          ...q,
          answer: '[Locked - Purchase access required to reveal model answer]',
          explanation: '[Locked - Purchase access required to reveal detailed method]',
        };
      }
      return q;
    });

    const response = NextResponse.json({
      subject: {
        slug: subject.slug,
        name: subject.name,
        track: subject.track,
        questionCount: subject.questionCount,
        verifiedTopics: subject.verifiedTopics,
      },
      isEntitled,
      isAdmin,
      questions: safeQuestions,
      total,
      limit,
      offset,
    });

    // Strict non-cacheable headers for sensitive study material
    response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');

    return response;
  } catch (err: any) {
    console.error('[API Reader Questions Error]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
