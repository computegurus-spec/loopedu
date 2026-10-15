/**
 * Supabase Connection Diagnostic Tool
 * Run with: node scripts/test-supabase.js
 */

const fs = require('fs');
const path = require('path');

// Manually parse .env.local if not already in process.env
const envLocalPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envLocalPath)) {
  const content = fs.readFileSync(envLocalPath, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const value = trimmed.slice(idx + 1).trim().replace(/^['"](.*)['"]$/, '$1');
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  });
}

const { createClient } = require('@supabase/supabase-js');

async function checkSupabase() {
  console.log('\n========================================================');
  console.log('       🔍 LOOPEDU / SUPABASE CONNECTION DIAGNOSTIC       ');
  console.log('========================================================\n');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY;

  console.log('1. Checking Environment Variables:');
  console.log('   - SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL :', supabaseUrl ? `✅ Configured (${supabaseUrl})` : '❌ Missing');
  console.log('   - SUPABASE_SERVICE_ROLE_KEY / ANON_KEY    :', serviceKey ? `✅ Configured (${serviceKey.slice(0, 12)}...)` : '❌ Missing');

  if (!supabaseUrl || !serviceKey) {
    console.log('\n--------------------------------------------------------');
    console.log('⚠️  CURRENT STATUS: LOCAL OFFLINE MODE ACTIVE');
    console.log('--------------------------------------------------------');
    console.log('The application is currently running against the local file store:');
    console.log('📁 File: data/private/database.json (All 8 subjects & 1,600 questions cached)');
    console.log('\nTo connect to your cloud Supabase database:');
    console.log('1. Go to https://supabase.com and open/create your project.');
    console.log('2. Go to Project Settings -> API.');
    console.log('3. Copy your "Project URL" and "service_role" (or "anon") secret key.');
    console.log('4. Add them to .env.local:');
    console.log('      NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co');
    console.log('      SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key');
    console.log('5. In Supabase Dashboard, open SQL Editor and execute:');
    console.log('      supabase/schema.sql');
    console.log('6. Re-run this check: node scripts/test-supabase.js\n');
    process.exit(0);
  }

  console.log('\n2. Testing Cloud Connection & Table Access:');

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  const tablesToCheck = ['subjects', 'questions', 'profiles', 'orders', 'entitlements', 'user_progress'];
  let allHealthy = true;

  let couldNotConnect = false;

  for (const table of tablesToCheck) {
    const start = Date.now();
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      const elapsed = Date.now() - start;

      if (error) {
        console.log(`   ❌ [${table.padEnd(14)}] Error: ${error.message}`);
        if (error.message?.includes('fetch failed')) {
          console.log(`      💡 Reason: Could not reach "${supabaseUrl}".`);
          console.log(`         • The project may be paused (Supabase free tier pauses after 7 days) or deleted.`);
          console.log(`         • Check your project status in the Supabase Dashboard: https://supabase.com/dashboard`);
          console.log(`         • Or update NEXT_PUBLIC_SUPABASE_URL in .env.local with your active project URL.`);
          allHealthy = false;
          couldNotConnect = true;
          break; // Stop further checks if server cannot be reached
        }
        allHealthy = false;
      } else {
        console.log(`   ✅ [${table.padEnd(14)}] Connected! Records: ${count ?? 0} (${elapsed}ms)`);
      }
    } catch (err) {
      allHealthy = false;
      couldNotConnect = true;
      console.log(`   ❌ [${table.padEnd(14)}] Connection error: ${err.message}`);
    }
  }

  console.log('\n--------------------------------------------------------');
  if (allHealthy) {
    console.log('🎉 SUCCESS: Supabase is fully connected and all tables exist!');
    console.log('--------------------------------------------------------\n');
  } else if (couldNotConnect) {
    console.log('❌ CONNECTION FAILED: Unable to reach the Supabase project host.');
    console.log('Check your project on https://supabase.com/dashboard and update .env.local.');
    console.log('--------------------------------------------------------\n');
  } else {
    console.log('⚠️  PARTIAL: Connected to Supabase, but some tables are missing.');
    console.log('Open SQL Editor on Supabase and run "supabase/schema.sql".');
    console.log('--------------------------------------------------------\n');
  }
}

checkSupabase();
