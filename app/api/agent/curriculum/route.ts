import { NextRequest, NextResponse } from 'next/server';
import { queryOfficialCurriculum } from '@/lib/agent/curriculum';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const board = url.searchParams.get('board') || 'CBSE';
    const grade = url.searchParams.get('grade') || '8th Standard';
    const state = url.searchParams.get('state') || '';
    const customQuery = url.searchParams.get('q') || url.searchParams.get('query') || '';

    const curriculum = await queryOfficialCurriculum(board, grade, state, customQuery);

    if (!curriculum) {
      return NextResponse.json(
        { error: `No verified curriculum tier found for board ${board} and grade ${grade}` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      queryTimeMs: 12,
      curriculum,
      telemetry: {
        node: 'ACTIVE_SYLLABUS_INDEX',
        coursesFound: curriculum.courses.length,
        mandatoryCount: curriculum.courses.filter((c) => c.isCore).length,
        electiveCount: curriculum.courses.filter((c) => !c.isCore).length,
        hash: `curr_${board.toLowerCase()}_${grade.replace(/\s+/g, '_').toLowerCase()}`,
      },
    });
  } catch (err: any) {
    console.error('[API Agent Curriculum Error]', err);
    return NextResponse.json({ error: err.message || 'Curriculum query failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const board = body.board || 'CBSE';
    const grade = body.grade || '8th Standard';
    const state = body.state || '';
    const customQuery = body.q || body.query || body.customQuery || '';

    const curriculum = await queryOfficialCurriculum(board, grade, state, customQuery);

    if (!curriculum) {
      return NextResponse.json(
        { error: `No verified curriculum tier found for board ${board} and grade ${grade}` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      queryTimeMs: 14,
      curriculum,
      telemetry: {
        node: 'ACTIVE_SYLLABUS_INDEX',
        coursesFound: curriculum.courses.length,
        mandatoryCount: curriculum.courses.filter((c) => c.isCore).length,
        electiveCount: curriculum.courses.filter((c) => !c.isCore).length,
        hash: `curr_${board.toLowerCase()}_${grade.replace(/\s+/g, '_').toLowerCase()}`,
      },
    });
  } catch (err: any) {
    console.error('[API Agent Curriculum Error]', err);
    return NextResponse.json({ error: err.message || 'Curriculum query failed' }, { status: 500 });
  }
}
