import { NextRequest, NextResponse } from 'next/server';
import { registerOrUpdateLead, calculateTrialStatus } from '@/lib/db/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      studentName,
      whatsappNumber,
      studentEmail,
      grade,
      targetExam,
      schoolName,
      city,
      parentName,
      parentEmail,
      parentWhatsapp,
      selectedSubjects,
      dailyMinutes,
      referredBy,
    } = body;

    if (!whatsappNumber || typeof whatsappNumber !== 'string') {
      return NextResponse.json(
        { error: 'WhatsApp phone number is required for your free 10-question trial.' },
        { status: 400 }
      );
    }

    const lead = await registerOrUpdateLead({
      student_name: studentName?.trim() || 'Learner',
      whatsapp_number: whatsappNumber.trim(),
      student_email: studentEmail?.trim() || undefined,
      grade: grade || 'Class 10',
      target_exam: targetExam || 'CBSE 2027',
      school_name: schoolName?.trim() || undefined,
      city: city?.trim() || undefined,
      parent_name: parentName?.trim() || undefined,
      parent_email: parentEmail?.trim() || undefined,
      parent_whatsapp: parentWhatsapp?.trim() || undefined,
      selected_subjects: Array.isArray(selectedSubjects) ? selectedSubjects : ['maths-standard'],
      daily_minutes: Number(dailyMinutes) || 15,
      referred_by: referredBy?.trim() || undefined,
    });

    const trialStatus = calculateTrialStatus(lead);

    const res = NextResponse.json({
      success: true,
      lead: {
        id: lead.id,
        studentName: lead.student_name,
        whatsappNumber: lead.whatsapp_number,
        referralCode: lead.referral_code,
      },
      trialStatus,
      message: 'Welcome to LoopEdu! Your 10 free high-yield board questions are unlocked for this week.',
    });

    // Set session cookie for instant passwordless authenticated access
    const sessionPayload = {
      id: lead.id,
      email: lead.student_email || `${lead.whatsapp_number.replace(/\D/g, '')}@student.loopedu.in`,
      name: lead.student_name,
      role: 'customer',
      isPro: false,
    };
    res.cookies.set('boardedge_session', JSON.stringify(sessionPayload), {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
    });

    // Set cookie for automatic trial tracking across study sessions
    res.cookies.set('loopedu_lead_phone', lead.whatsapp_number, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
      httpOnly: false, // accessible to client for greeting
      sameSite: 'lax',
    });

    res.cookies.set('loopedu_lead_id', lead.id, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
    });

    return res;
  } catch (err: any) {
    console.error('[API Leads Register Error]', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to register free trial' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const phone = req.nextUrl.searchParams.get('phone') || req.cookies.get('loopedu_lead_phone')?.value;
    if (!phone) {
      return NextResponse.json({ trialStatus: calculateTrialStatus(null) });
    }

    const { getLead } = await import('@/lib/db/store');
    const lead = await getLead(phone);
    const trialStatus = calculateTrialStatus(lead);

    return NextResponse.json({
      lead: lead
        ? {
            id: lead.id,
            studentName: lead.student_name,
            whatsappNumber: lead.whatsapp_number,
            referralCode: lead.referral_code,
            schoolName: lead.school_name,
            city: lead.city,
          }
        : null,
      trialStatus,
    });
  } catch (err: any) {
    return NextResponse.json({ trialStatus: calculateTrialStatus(null) });
  }
}
