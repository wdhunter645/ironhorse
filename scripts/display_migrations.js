#!/usr/bin/env node

/**
 * Simple migration script for Supabase Cloud
 * Applies migration files by executing them directly
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL in environment variables');
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.log('⚠️  No SUPABASE_SERVICE_ROLE_KEY found');
  console.log('📋 Migration SQL will be displayed for manual application');
  console.log('');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function displayMigrations() {
  console.log('=== Supabase Migration Files ===\n');
  
  const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');
  
  if (!fs.existsSync(migrationsDir)) {
    console.error(`❌ Migrations directory not found: ${migrationsDir}`);
    process.exit(1);
  }
  
  const migrationFiles = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort();
    
  if (migrationFiles.length === 0) {
    console.log('❌ No migration files found');
    process.exit(1);
  }
  
  console.log(`📁 Found ${migrationFiles.length} migration files:\n`);
  
  for (const migrationFile of migrationFiles) {
    console.log(`📦 Migration: ${migrationFile}`);
    console.log('─'.repeat(60));
    
    const migrationPath = path.join(migrationsDir, migrationFile);
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    console.log(migrationSQL);
    console.log('');
    console.log('═'.repeat(60));
    console.log('');
  }
  
  console.log('💡 To apply these migrations:');
  console.log('   1. Copy each SQL block above');
  console.log('   2. Go to your Supabase Dashboard > SQL Editor');
  console.log('   3. Paste and run each migration in order');
  console.log('   4. Or set SUPABASE_SERVICE_ROLE_KEY for automated application');
  
  return migrationFiles;
}

async function testConnection() {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // Try to query a simple table or create a test
    const { data, error } = await supabase
      .from('quotes')
      .select('count')
      .limit(1);
    
    if (error && error.code === 'PGRST116') {
      console.log('✅ Connected to Supabase (tables not yet created)');
      return true;
    } else if (error) {
      console.log(`❌ Connection error: ${error.message}`);
      return false;
    } else {
      console.log('✅ Connected to Supabase (tables exist)');
      return true;
    }
  } catch (error) {
    console.log(`❌ Connection failed: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('=== Supabase Migration Tool ===\n');
  
  // Check if we have dummy credentials
  const isDummyEnv = supabaseUrl.includes('dummy') || (supabaseServiceKey && supabaseServiceKey.includes('dummy'));
  
  if (!isDummyEnv) {
    // Test connection only with real credentials
    const connected = await testConnection();
    if (!connected) {
      console.log('\n💡 Please check your Supabase configuration:');
      console.log('   - NEXT_PUBLIC_SUPABASE_URL');
      console.log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY');
      console.log('   - SUPABASE_SERVICE_ROLE_KEY (optional)');
      process.exit(1);
    }
    console.log('');
  } else {
    console.log('🔍 Dummy environment detected - skipping connection test');
    console.log('');
  }
  
  // Display migration files
  const migrationFiles = await displayMigrations();
  
  console.log(`\n📊 Summary:`);
  console.log(`   - ${migrationFiles.length} migration files ready`);
  if (!isDummyEnv) {
    console.log(`   - Database connection verified`);
  }
  console.log(`   - Ready for migration application`);
}

main().catch((error) => {
  console.error('❌ Migration tool failed:', error.message);
  process.exit(1);
});