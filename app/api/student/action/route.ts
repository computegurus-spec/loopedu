import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth/session';
import {
  recordStudentAction,
  getStudentActions,
  getStudentAchievements,
  awardAchievement,
} from '@/lib/db/store';
import { StudentAchievement } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
    }

    const actions = await getStudentActions(user.id);
    const achievements = await getStudentAchievements(user.id);

    const attemptsCount = actions.filter((a) => a.action_type === 'QUESTION_ATTEMPT').length;
    const correctCount = actions.filter((a) => a.action_type === 'QUESTION_CORRECT').length;

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
      stats: {
        totalActions: actions.length,
        attemptsCount,
        correctCount,
        achievementsCount: achievements.length,
      },
      achievements,
      recentActions: actions.slice(0, 20),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized. Login required to record practice actions.' }, { status: 401 });
    }

    const body = await req.json();
    const {
      action_type,
      subject_slug,
      question_id,
      smart_score = 0,
      time_spent_seconds = 0,
      metadata = {},
    } = body;

    if (!action_type || !subject_slug) {
      return NextResponse.json({ error: 'action_type and subject_slug are required' }, { status: 400 });
    }

    // 1. Record the action
    const recordedAction = await recordStudentAction({
      user_id: user.id,
      user_email: user.email,
      action_type,
      subject_slug,
      question_id,
      smart_score,
      time_spent_seconds,
      metadata,
    });

    // 2. Evaluate and award real-time achievements
    const newlyAwarded: StudentAchievement[] = [];

    // Achievement 1: First Question Attempted
    if (action_type === 'QUESTION_ATTEMPT') {
      const res = await awardAchievement(user.id, {
        code: 'FIRST_STEP',
        title: '🎯 First Step Forward',
        description: 'Completed your very first CBSE practice question on LoopEdu!',
        icon: '🎯',
      });
      if (res.awarded) newlyAwarded.push(res.achievement);
    }

    // Achievement 2: Speed Solver (< 45s correct)
    if (action_type === 'QUESTION_CORRECT' && time_spent_seconds > 0 && time_spent_seconds <= 45) {
      const res = await awardAchievement(user.id, {
        code: 'SPEED_SOLVER',
        title: '⚡ Lightning Reflexes',
        description: 'Solved a CBSE question correctly in under 45 seconds!',
        icon: '⚡',
      });
      if (res.awarded) newlyAwarded.push(res.achievement);
    }

    // Achievement 3: Read Detailed NCERT Hints & Explanations
    if (action_type === 'HINT_ACCESSED') {
      const res = await awardAchievement(user.id, {
        code: 'SCHOLAR_CURIOSITY',
        title: '🧠 Concept Deep Diver',
        description: 'Explored NCERT-grounded step hints to understand core underlying concepts.',
        icon: '🧠',
      });
      if (res.awarded) newlyAwarded.push(res.achievement);
    }

    // Achievement 4: Loopie AI Doubt Asked
    if (action_type === 'LOOPIE_DOUBT_ASKED') {
      const res = await awardAchievement(user.id, {
        code: 'LOOPIE_SCHOLAR',
        title: '🦉 Loopie Scholar',
        description: 'Consulted Loopie AI Tutor for targeted doubt solving on your CBSE topic.',
        icon: '🦉',
      });
      if (res.awarded) newlyAwarded.push(res.achievement);
    }

    // Achievement 5: Comeback Champ (mistake review)
    if (action_type === 'MISTAKE_VAULT_REVIEW' || (action_type === 'QUESTION_CORRECT' && metadata?.is_revisit)) {
      const res = await awardAchievement(user.id, {
        code: 'COMEBACK_CHAMPION',
        title: '🔁 Comeback Champion',
        description: 'Mastered a question that you previously flagged in your mistake vault!',
        icon: '🔁',
      });
      if (res.awarded) newlyAwarded.push(res.achievement);
    }

    // Achievement 6: SmartScore Mastery (70+, 85+, 100)
    if (smart_score >= 70) {
      const res70 = await awardAchievement(user.id, {
        code: 'SMART_SCORE_70',
        title: '🌟 Proficient Achiever (70+)',
        description: 'Elevated your IXL-style SmartScore™ past 70 points!',
        icon: '🌟',
      });
      if (res70.awarded) newlyAwarded.push(res70.achievement);
    }

    if (smart_score >= 90) {
      const res90 = await awardAchievement(user.id, {
        code: 'SMART_SCORE_90',
        title: '🏆 CBSE Board Mastery (90+)',
        description: 'Achieved top-tier SmartScore™ mastery exceeding 90 points!',
        icon: '🏆',
      });
      if (res90.awarded) newlyAwarded.push(res90.achievement);
    }

    return NextResponse.json({
      success: true,
      actionId: recordedAction.id,
      newAchievements: newlyAwarded,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
