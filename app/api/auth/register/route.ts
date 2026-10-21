import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { hashPassword } from '@/lib/auth/password';
import { saveUserAccount } from '@/lib/db/store';
import { createServerSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || '').trim().toLowerCase();
    const password = (body.password || '').trim();
    const name = (body.name || body.full_name || '').trim();
    const whatsapp = (body.whatsapp_number || body.phone || '9999999999').trim();
    const grade = (body.grade || 'Class 10').trim();
    const redirectUrl = body.redirect || body.redirectUrl || '/study/cbse-10-science';

    // 1. Validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }
    if (!password || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long.' }, { status: 400 });
    }
    if (!name) {
      return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 });
    }

    const userId = `usr_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const passwordHash = hashPassword(password);
    const nowIso = new Date().toISOString();

    // 2. Persist in local DB store
    await saveUserAccount({
      id: userId,
      email,
      name,
      password_hash: passwordHash,
      role: 'customer',
      whatsapp_number: whatsapp,
      grade,
      isPro: false,
      created_at: nowIso,
      updated_at: nowIso,
    });

    // 3. Persist in Cloud Supabase PostgreSQL
    if (isSupabaseConfigured) {
      try {
        const supabase = createServerSupabaseClient();

        // Save to leads table (verified accessible in Supabase Cloud)
        await supabase.from('leads').upsert(
          {
            student_name: name,
            student_email: email,
            whatsapp_number: whatsapp,
            grade,
            target_exam: 'CBSE 2027',
            trial_questions_attempted: 0,
            updated_at: nowIso,
          },
          { onConflict: 'student_email' }
        );

        // Also attempt profiles insert/upsert if RLS allows
        try {
          await supabase.from('profiles').upsert(
            {
              id: crypto.randomUUID(),
              email,
              full_name: name,
              role: 'customer',
              updated_at: nowIso,
            },
            { onConflict: 'email' }
          );
        } catch {
          // Ignore RLS policy failure on profiles table
        }
      } catch (sbErr) {
        console.warn('[Register] Supabase cloud sync notice:', (sbErr as any)?.message || sbErr);
      }
    }

    // 4. Create Session
    const sessionPayload = {
      id: userId,
      email,
      name,
      role: 'customer' as const,
      isPro: false,
    };

    const res = NextResponse.json({
      success: true,
      message: 'Account created successfully! Welcome to LoopEdu.',
      user: sessionPayload,
      redirectUrl,
    });

    res.cookies.set('boardedge_session', JSON.stringify(sessionPayload), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    res.cookies.delete('boardedge_demo_role');

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Registration failed' }, { status: 500 });
  }
}
