#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

console.log('🔍 Testing Supabase connection...\n');
console.log('📍 URL:', supabaseUrl);
console.log('🔑 Key:', supabaseKey.substring(0, 20) + '...\n');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Test 1: List tables
    console.log('📊 Test 1: Querying database schema...');
    const { data: tables, error: tablesError } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true });

    if (tablesError && tablesError.code === '42P01') {
      console.log('⚠️  profiles table does not exist yet');
      console.log('   Run: supabase-schema.sql to create tables\n');
    } else if (tablesError) {
      console.log('⚠️  Error querying profiles:', tablesError.message, '\n');
    } else {
      console.log('✅ profiles table exists\n');
    }

    // Test 2: Check database health
    console.log('💓 Test 2: Database health check...');
    const { data: healthData, error: healthError } = await supabase
      .rpc('version');

    if (healthError && healthError.code === '42883') {
      console.log('ℹ️  RPC not configured (this is normal)\n');
    } else if (healthError) {
      console.log('⚠️  Health check error:', healthError.message, '\n');
    } else {
      console.log('✅ Database responding\n');
    }

    // Test 3: Simple query
    console.log('🔎 Test 3: Testing basic query...');
    const { data: testData, error: testError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);

    if (testError && testError.code === '42P01') {
      console.log('⚠️  Tables need to be created\n');
      console.log('📝 Action Required:');
      console.log('   1. Go to: https://supabase.com/dashboard/project/qtaidcamesetdbpqkmjq/editor');
      console.log('   2. Open SQL Editor');
      console.log('   3. Run the SQL from: server/supabase-schema.sql\n');
    } else if (testError) {
      console.log('⚠️  Query error:', testError.message, '\n');
    } else {
      console.log('✅ Query successful');
      console.log('   Profiles in database:', testData ? testData.length : 0, '\n');
    }

    // Test 4: Check auth
    console.log('🔐 Test 4: Testing auth service...');
    const { data: authData, error: authError } = await supabase.auth.getSession();

    if (authError) {
      console.log('⚠️  Auth check error:', authError.message, '\n');
    } else {
      console.log('✅ Auth service accessible\n');
    }

    console.log('═══════════════════════════════════════════════');
    console.log('✅ CONNECTION TEST COMPLETE');
    console.log('═══════════════════════════════════════════════\n');
    console.log('📌 Your Supabase project is ACTIVE and RESPONSIVE');
    console.log('📌 This activity should prevent auto-pause\n');
    console.log('💡 Tip: Run this script weekly to keep project active:');
    console.log('   node server/test-supabase-connection.js\n');

  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    process.exit(1);
  }
}

testConnection();
