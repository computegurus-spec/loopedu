import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/server';
import { getUserAccountByEmail } from '@/lib/db/store';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || '').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'https://loopedu.in';

    // 1. Trigger Supabase official password reset if configured
    if (isSupabaseConfigured) {
      try {
        const supabase = createServerSupabaseClient();
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${origin}/login?reset=true&email=${encodeURIComponent(email)}`,
        });
      } catch (err) {
        console.warn('[ResetPassword] Supabase reset notice:', (err as any)?.message || err);
      }
    }

    // 2. Verify account exists in local store
    const localAccount = await getUserAccountByEmail(email);

    return NextResponse.json({
      success: true,
      message: `A password reset link has been sent to ${email}. Please check your inbox and spam folder.`,
      email,
      registered: Boolean(localAccount),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to send reset link.' }, { status: 500 });
  }
}
