#!/usr/bin/env node

/**
 * Apply Supabase migrations to the database
 * This script applies migration files in the supabase/migrations directory
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
  console.error('\nPlease set these in your .env.local file or as GitHub secrets.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
    console.log('ℹ️  No existing migrations found');
    return [];
  }
  
  return data.map(row => row.name);
}

async function applyMigration(migrationFile, migrationSQL) {
  console.log(`📦 Applying migration: ${migrationFile}`);
  
  try {
    // Apply the migration SQL
    const { error: sqlError } = await supabase.rpc('exec_sql', { sql: migrationSQL });
    
    if (sqlError) {
      console.error(`❌ Migration failed: ${sqlError.message}`);
      return false;
    }
    
    // Record the migration as applied
    const { error: recordError } = await supabase
      .from('_migrations')
      .insert([{ name: migrationFile }]);
      
    if (recordError) {
      console.error(`❌ Failed to record migration: ${recordError.message}`);
      return false;
    }
    
    console.log(`✅ Migration applied: ${migrationFile}`);
    return true;
  } catch (error) {
    console.error(`❌ Migration error: ${error.message}`);
    return false;
  }
}

async function runMigrations() {
  console.log('=== Supabase Migration Runner ===\n');
  
  const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');
  
  if (!fs.existsSync(migrationsDir)) {
    console.error(`❌ Migrations directory not found: ${migrationsDir}`);
    process.exit(1);
  }
  
  // Create migration tracking table
  const tableCreated = await createMigrationTable();
  if (!tableCreated) {
    process.exit(1);
  }
  
  // Get list of applied migrations
  const appliedMigrations = await getAppliedMigrations();
  console.log(`📊 Previously applied migrations: ${appliedMigrations.length}\n`);
  
  // Get all migration files
  const migrationFiles = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort();
    
  console.log(`📁 Found ${migrationFiles.length} migration files\n`);
  
  let appliedCount = 0;
  let skippedCount = 0;
  
  for (const migrationFile of migrationFiles) {
    if (appliedMigrations.includes(migrationFile)) {
      console.log(`⏭️  Skipping already applied: ${migrationFile}`);
      skippedCount++;
      continue;
    }
    
    const migrationPath = path.join(migrationsDir, migrationFile);
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    const success = await applyMigration(migrationFile, migrationSQL);
    if (!success) {
      console.error(`\n❌ Migration failed: ${migrationFile}`);
      process.exit(1);
    }
    
    appliedCount++;
  }
  
  console.log('\n=== Migration Summary ===');
  console.log(`✅ Applied: ${appliedCount}`);
  console.log(`⏭️  Skipped: ${skippedCount}`);
  console.log(`📊 Total: ${migrationFiles.length}`);
  
  if (appliedCount > 0) {
    console.log('\n🎉 Migrations completed successfully!');
  } else {
    console.log('\n✨ Database is up to date!');
  }
}

// Handle Supabase RPC function for executing SQL
// Note: This requires the exec_sql function to be created in Supabase
async function ensureExecSqlFunction() {
  const execSqlFunction = `
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
  
  // Try to create the function (will fail silently if it exists)
  await supabase.rpc('exec_sql', { sql: execSqlFunction }).catch(() => {});
}

runMigrations().catch((error) => {
  console.error('❌ Migration script failed:', error.message);
  process.exit(1);
});