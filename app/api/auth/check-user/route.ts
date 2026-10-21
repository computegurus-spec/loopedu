import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/server';
import { getLead } from '@/lib/db/store';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawEmail = (body.email || body.identifier || '').trim();

    if (!rawEmail) {
      return NextResponse.json({ error: 'Please enter an email address.' }, { status: 400 });
    }

    const email = rawEmail.toLowerCase();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmail) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    let exists = false;
    let name = '';

    // 1. Check Cloud Supabase
    if (isSupabaseConfigured) {
      try {
        const supabase = createServerSupabaseClient();

        // Check profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, email, full_name')
          .eq('email', email)
          .maybeSingle();

        if (profile) {
          exists = true;
          name = profile.full_name || '';
        }

        // Also check leads table if not found in profiles
        if (!exists) {
          const { data: lead } = await supabase
            .from('leads')
            .select('id, student_name, student_email')
            .eq('student_email', email)
            .maybeSingle();

          if (lead) {
            exists = true;
            name = lead.student_name || '';
          }
        }
      } catch (err) {
        console.warn('[CheckUser] Supabase query notice:', (err as any)?.message || err);
      }
    }

    // 2. Check local store fallback
    if (!exists) {
      const { getUserAccountByEmail } = await import('@/lib/db/store');
      const account = await getUserAccountByEmail(email);
      if (account) {
        exists = true;
        name = account.name || '';
      }
    }

    if (!exists) {
      const localLead = await getLead(email);
      if (localLead) {
        exists = true;
        name = localLead.student_name || '';
      }
    }

    // 3. Known system admin / owner fallback
    if (email === 'sadish@loopedu.in' || email === 'founder@tinko.in' || email === 'admin@loopedu.in') {
      exists = true;
      name = 'Sadish';
    }

    return NextResponse.json({
      exists,
      email,
      name: name || undefined,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal check error' }, { status: 500 });
  }
}
