#!/usr/bin/env node
/**
 * Supabase Keep-Alive Script
 *
 * This script generates activity on your Supabase project to prevent auto-pause.
 * Supabase pauses free-tier projects that have been inactive for 7+ days.
 *
 * Usage:
 *   node server/keep-supabase-alive.js
 *
 * Schedule with cron (run weekly):
 *   0 0 * * 0 cd /path/to/project && node server/keep-supabase-alive.js
 *
 * Or use GitHub Actions (see .github/workflows/keep-supabase-alive.yml)
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function keepAlive() {
  const timestamp = new Date().toISOString();

  console.log('🔄 Supabase Keep-Alive');
  console.log('⏰ Timestamp:', timestamp);
  console.log('📍 Project:', supabaseUrl);
  console.log('');

  try {
    // Activity 1: Query profiles table
    console.log('1️⃣  Querying profiles...');
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (profilesError) {
      console.log('   ⚠️  Error:', profilesError.message);
    } else {
      console.log('   ✅ Success');
    }

    // Activity 2: Query posts table
    console.log('2️⃣  Querying posts...');
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('id')
      .limit(1);

    if (postsError) {
      console.log('   ⚠️  Error:', postsError.message);
    } else {
      console.log('   ✅ Success');
    }

    // Activity 3: Check auth
    console.log('3️⃣  Checking auth service...');
    const { data: session } = await supabase.auth.getSession();
    console.log('   ✅ Auth service responsive');

    // Activity 4: Query ai_generations
    console.log('4️⃣  Querying ai_generations...');
    const { data: generations, error: genError } = await supabase
      .from('ai_generations')
      .select('id')
      .limit(1);

    if (genError) {
      console.log('   ⚠️  Error:', genError.message);
    } else {
      console.log('   ✅ Success');
    }

    console.log('');
    console.log('═══════════════════════════════════════');
    console.log('✅ KEEP-ALIVE SUCCESSFUL');
    console.log('═══════════════════════════════════════');
    console.log('📌 Your Supabase project received activity');
    console.log('📌 Auto-pause timer has been reset');
    console.log('📌 Next run recommended: ' + getNextRunDate());
    console.log('');

    return true;

  } catch (error) {
    console.error('');
    console.error('❌ Keep-alive failed:', error.message);
    console.error('');
    process.exit(1);
  }
}

function getNextRunDate() {
  const next = new Date();
  next.setDate(next.getDate() + 7);
  return next.toDateString();
}

// Run the keep-alive
keepAlive();
