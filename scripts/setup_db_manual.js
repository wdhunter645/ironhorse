#!/usr/bin/env node

// Script to apply database schema using Supabase client
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('=== Supabase Database Schema Setup ===');
console.log('URL:', supabaseUrl);
console.log('Anon Key:', supabaseAnonKey ? 'Set' : 'Not set');
console.log('Service Key:', supabaseServiceKey ? 'Set' : 'Not set');
console.log('');

// Use service key if available, otherwise anon key
const apiKey = supabaseServiceKey || supabaseAnonKey;
const supabase = createClient(supabaseUrl, apiKey);

async function applySchemaManually() {
  console.log('Since we cannot execute DDL with the anon key, here are the steps to apply the schema:');
  console.log('');
  console.log('1. Go to your Supabase dashboard: https://app.supabase.com');
  console.log('2. Open your project dashboard');
  if (supabaseUrl) {
    console.log(`   Your project URL: ${supabaseUrl}`);
  }
  console.log('3. Go to the SQL Editor');
  console.log('4. Copy and paste the following SQL:');
  console.log('');
  console.log('─'.repeat(80));
  
  const migrationFile = path.join(__dirname, '..', 'sql', 'supabase_cloud_migration.sql');
  const sql = fs.readFileSync(migrationFile, 'utf8');
  console.log(sql);
  
  console.log('─'.repeat(80));
  console.log('');
  console.log('5. Click "Run" to execute the SQL');
  console.log('6. Then run the seed data:');
  console.log('');
  console.log('─'.repeat(80));
  
  const seedFile = path.join(__dirname, '..', 'sql', 'supabase_cloud_seed.sql');
  const seedSql = fs.readFileSync(seedFile, 'utf8');
  console.log(seedSql);
  
  console.log('─'.repeat(80));
  console.log('');
  console.log('After applying the schema, test the connection again.');
}

async function testConnection() {
  try {
    console.log('Testing current connection...');
    
    // Test quotes table
    const { data: quotes, error: quotesError } = await supabase
      .from('quotes')
      .select('*')
      .limit(1);
    
    if (quotesError) {
      console.log(`❌ Quotes table: ${quotesError.message}`);
      return false;
    } else {
      console.log(`✅ Quotes table accessible, found ${quotes?.length || 0} records`);
    }

    // Test media_assets table
    const { data: media, error: mediaError } = await supabase
      .from('media_assets')
      .select('*')
      .limit(1);
    
    if (mediaError) {
      console.log(`❌ Media assets table: ${mediaError.message}`);
      return false;
    } else {
      console.log(`✅ Media assets table accessible, found ${media?.length || 0} records`);
    }

    return true;
  } catch (error) {
    console.log(`❌ Connection test failed: ${error.message}`);
    return false;
  }
}

async function main() {
  const connected = await testConnection();
  
  if (!connected) {
    console.log('');
    await applySchemaManually();
  } else {
    console.log('');
    console.log('🎉 Database schema is already applied and working!');
  }
}

main().catch(console.error);