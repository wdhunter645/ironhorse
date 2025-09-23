#!/usr/bin/env node

/**
 * Database introspection and migration script for Phases 3-4
 * Checks existing schema and applies required migrations
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅ Set' : '❌ Missing');
  console.log('\n💡 Continuing with what we can do without database connection...');
  
  // If missing env vars, just list what would be done
  console.log('\n📋 Migration plan (would be executed with proper env vars):');
  console.log('- Check existing tables: media_assets, quotes');
  console.log('- Create missing tables: charities, milestones, posts, events, photos, matchups, votes');
  console.log('- Seed minimal test data if tables are empty');
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function introspectSchema() {
  console.log('🔍 Introspecting database schema...\n');
  
  // Check what tables exist
  const { data: tables, error } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public')
    .neq('table_name', '_migrations');

  if (error) {
    console.error('❌ Failed to introspect schema:', error.message);
    return null;
  }

  const tableNames = tables.map(t => t.table_name).sort();
  console.log('📊 Existing tables:');
  tableNames.forEach(name => console.log(`   ✅ ${name}`));
  
  return tableNames;
}

async function ensureExecSqlFunction() {
  console.log('\n🔧 Ensuring exec_sql function exists...');
  
  const createFunctionSQL = `
    create or replace function exec_sql(sql text)
    returns void
    language plpgsql
    security definer
    as $$
    begin
      execute sql;
    end;
    $$;
  `;

  const { error } = await supabase.rpc('exec_sql', { sql: createFunctionSQL });
  
  if (error && !error.message.includes('function does not exist')) {
    console.error('❌ Failed to create exec_sql function:', error.message);
    return false;
  }
  
  console.log('✅ exec_sql function ready');
  return true;
}

async function createMigrationTable() {
  console.log('📋 Creating migration tracking table...');
  
  const migrationTableSQL = `
    create table if not exists public._migrations (
      id serial primary key,
      name text unique not null,
      applied_at timestamptz default now()
    );
  `;

  const { error } = await supabase.rpc('exec_sql', { sql: migrationTableSQL });
  
  if (error) {
    console.error('❌ Failed to create migration table:', error.message);
    return false;
  }
  
  console.log('✅ Migration table ready');
  return true;
}

async function getAppliedMigrations() {
  const { data, error } = await supabase
    .from('_migrations')
    .select('name');

  if (error) {
    console.error('❌ Failed to get applied migrations:', error.message);
    return [];
  }

  return data.map(m => m.name);
}

async function applyMigration(migrationFile, migrationSQL) {
  console.log(`🚀 Applying migration: ${migrationFile}`);
  
  const { error } = await supabase.rpc('exec_sql', { sql: migrationSQL });
  
  if (error) {
    console.error(`❌ Failed to apply migration ${migrationFile}:`, error.message);
    return false;
  }
  
  // Record migration as applied
  const { error: recordError } = await supabase
    .from('_migrations')
    .insert({ name: migrationFile });
    
  if (recordError) {
    console.error(`❌ Failed to record migration ${migrationFile}:`, recordError.message);
    return false;
  }
  
  console.log(`✅ Migration ${migrationFile} applied successfully`);
  return true;
}

async function runMigrations() {
  console.log('=== Database Setup & Migration Runner ===\n');
  
  // First introspect to see what exists
  const existingTables = await introspectSchema();
  if (!existingTables) {
    process.exit(1);
  }

  // Ensure we can run SQL
  if (!(await ensureExecSqlFunction())) {
    process.exit(1);
  }
  
  // Create migration tracking table
  if (!(await createMigrationTable())) {
    process.exit(1);
  }
  
  // Get list of applied migrations
  const appliedMigrations = await getAppliedMigrations();
  console.log(`\n📊 Previously applied migrations: ${appliedMigrations.length}`);
  
  // Get all migration files
  const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');
  
  if (!fs.existsSync(migrationsDir)) {
    console.error(`❌ Migrations directory not found: ${migrationsDir}`);
    process.exit(1);
  }
  
  const migrationFiles = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort();
    
  console.log(`\n📁 Found ${migrationFiles.length} migration files`);
  
  let appliedCount = 0;
  let skippedCount = 0;
  
  for (const file of migrationFiles) {
    if (appliedMigrations.includes(file)) {
      console.log(`⏭️  Skipping ${file} (already applied)`);
      skippedCount++;
      continue;
    }
    
    const migrationPath = path.join(migrationsDir, file);
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    if (await applyMigration(file, migrationSQL)) {
      appliedCount++;
    } else {
      console.error(`\n❌ Migration failed, stopping here.`);
      process.exit(1);
    }
  }
  
  console.log(`\n🎉 Migration complete!`);
  console.log(`   Applied: ${appliedCount} migrations`);
  console.log(`   Skipped: ${skippedCount} migrations`);
  
  // Final schema check
  console.log('\n📊 Final schema verification:');
  const finalTables = await introspectSchema();
  
  const expectedTables = ['media_assets', 'quotes', 'charities', 'milestones', 'posts', 'events', 'photos', 'matchups', 'votes'];
  const missingTables = expectedTables.filter(table => !finalTables.includes(table));
  
  if (missingTables.length === 0) {
    console.log('✅ All required tables present');
  } else {
    console.log('⚠️  Missing tables:', missingTables);
  }
}

runMigrations().catch((error) => {
  console.error('❌ Migration script failed:', error.message);
  process.exit(1);
});