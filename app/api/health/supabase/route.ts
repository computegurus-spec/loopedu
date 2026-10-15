import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({
      connected: false,
      mode: 'local_offline_mock',
      status: 'NOT_CONFIGURED',
      message: 'Supabase environment variables are missing. App is using local offline file storage (data/private/database.json).',
      missingEnvVars: [
        !supabaseUrl ? 'NEXT_PUBLIC_SUPABASE_URL' : null,
        !serviceKey ? 'SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)' : null,
      ].filter(Boolean),
      nextSteps: [
        '1. Create a project at https://supabase.com',
        '2. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local',
        '3. Run supabase/schema.sql in your Supabase SQL Editor',
        '4. Run "node scripts/test-supabase.js" to verify',
      ],
    });
  }

  const startTime = Date.now();
  try {
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });

    // Test connectivity by querying subjects table
    const { count, error } = await supabase
      .from('subjects')
      .select('*', { count: 'exact' })
      .limit(1);

    const latencyMs = Date.now() - startTime;

    if (error) {
      return NextResponse.json({
        connected: false,
        status: 'CONNECTION_FAILED_OR_SCHEMA_MISSING',
        error: error.message,
        hint: error.hint || error.details || 'Check if you have executed supabase/schema.sql in your Supabase SQL Editor.',
        url: supabaseUrl.replace(/^(https:\/\/[^.]+).*/, '$1.supabase.co'),
        latencyMs,
      }, { status: 500 });
    }

    return NextResponse.json({
      connected: true,
      status: 'HEALTHY',
      message: 'Supabase PostgreSQL is connected and reachable!',
      projectUrl: supabaseUrl,
      subjectsCount: count ?? 0,
      latencyMs: `${latencyMs}ms`,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    const isDnsError = err?.message?.includes('ENOTFOUND') || err?.cause?.code === 'ENOTFOUND';
    return NextResponse.json({
      connected: false,
      status: isDnsError ? 'HOST_NOT_FOUND_OR_PAUSED' : 'UNEXPECTED_ERROR',
      error: err?.message || String(err),
      hint: isDnsError
        ? 'Hostname cannot be resolved. The Supabase project may be paused (free tier pauses after 7 days) or deleted. Check your project status at https://supabase.com/dashboard.'
        : 'Verify your API keys and network connection.',
      latencyMs: Date.now() - startTime,
    }, { status: 503 });
  }
}
