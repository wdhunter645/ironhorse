#!/usr/bin/env node

/**
 * Bootstrap script for Lou Gehrig Fan Club - Supabase Cloud Setup
 * 
 * This script validates the current setup and provides guidance for
 * setting up the Supabase Cloud database and environment variables.
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables - prioritize GitHub secrets over .env.local
require('dotenv').config({ path: '.env.local' });

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'cyan');
}

async function checkEnvironmentVariables() {
  log('\n=== Environment Variables Check ===', 'bold');
  
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ];
  
  const optionalVars = [
    'SUPABASE_SERVICE_ROLE_KEY',
    'NEXT_PUBLIC_B2_ENDPOINT',
    'NEXT_PUBLIC_B2_BUCKET',
    'B2_KEY_ID',
    'B2_APP_KEY'
  ];
  
  let allRequired = true;
  
  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (value) {
      logSuccess(`${varName}: Set`);
    } else {
      logError(`${varName}: Missing`);
      allRequired = false;
    }
  }
  
  for (const varName of optionalVars) {
    const value = process.env[varName];
    if (value) {
      logSuccess(`${varName}: Set`);
    } else {
      logWarning(`${varName}: Not set`);
    }
  }
  
  return allRequired;
}

async function testSupabaseConnection() {
  log('\n=== Supabase Connection Test ===', 'bold');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    logError('Supabase credentials not found in environment variables');
    return false;
  }
  
  logInfo(`Testing connection to: ${supabaseUrl}`);
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  try {
    // Test quotes table
    const { data: quotes, error: quotesError } = await supabase
      .from('quotes')
      .select('count')
      .limit(1);
    
    if (quotesError) {
      logError(`Quotes table: ${quotesError.message}`);
      return false;
    } else {
      logSuccess('Quotes table: Accessible');
    }

    // Test media_assets table
    const { data: media, error: mediaError } = await supabase
      .from('media_assets')
      .select('count')
      .limit(1);
    
    if (mediaError) {
      logError(`Media assets table: ${mediaError.message}`);
      return false;
    } else {
      logSuccess('Media assets table: Accessible');
    }

    return true;
  } catch (error) {
    logError(`Connection failed: ${error.message}`);
    return false;
  }
}

async function validateDatabaseSchema() {
  log('\n=== Database Schema Validation ===', 'bold');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    logError('Cannot validate schema without Supabase credentials');
    return false;
  }
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  try {
    // Test that we can actually read data from both tables
    const { data: quotes, error: quotesError } = await supabase
      .from('quotes')
      .select('*')
      .limit(5);
    
    const { data: media, error: mediaError } = await supabase
      .from('media_assets')
      .select('*')
      .limit(5);
    
    if (!quotesError && !mediaError) {
      logSuccess(`Found ${quotes?.length || 0} quotes and ${media?.length || 0} media assets`);
      
      if ((quotes?.length || 0) === 0) {
        logWarning('No sample data found. Consider running the seed script.');
      }
      
      return true;
    } else {
      if (quotesError) logError(`Quotes query failed: ${quotesError.message}`);
      if (mediaError) logError(`Media query failed: ${mediaError.message}`);
      return false;
    }
  } catch (error) {
    logError(`Schema validation failed: ${error.message}`);
    return false;
  }
}

function printSetupInstructions() {
  log('\n=== Setup Instructions ===', 'bold');
  log('\nTo complete the setup:\n');
  
  log('1. Database Schema Setup:', 'yellow');
  log('   • Open your Supabase dashboard: https://app.supabase.com');
  log('   • Go to SQL Editor');
  log('   • Run the SQL from: sql/supabase_cloud_migration.sql');
  log('   • Run the seed data from: sql/supabase_cloud_seed.sql');
  log('   • See DATABASE_SETUP.md for detailed instructions\n');
  
  log('2. Environment Variables (Production - Recommended):', 'yellow');
  log('   • Set GitHub repository secrets: bash scripts/set_repo_secrets.sh');
  log('   • This is the recommended approach for all deployments\n');
  
  log('3. Environment Variables (Local Development - Optional):', 'yellow');
  log('   • Copy env.sample to .env.local');
  log('   • Fill in your Supabase credentials from the dashboard\n');
  
  log('4. Verification:', 'yellow');
  log('   • Deploy to production: vercel --prod');
  log('   • Or for local testing: npm run dev');
}

function printSuccessMessage() {
  log('\n=== Setup Complete! ===', 'bold');
  logSuccess('Database schema is properly configured');
  logSuccess('Environment variables are set');
  logSuccess('Supabase connection is working');
  
  log('\nNext steps:', 'cyan');
  log('• Deploy to production: vercel --prod (with GitHub secrets)');
  log('• Or test locally: npm run dev');
}

async function main() {
  log('Lou Gehrig Fan Club - Bootstrap Setup', 'bold');
  log('=====================================\n');
  
  // Check if dependencies are installed
  if (!fs.existsSync('node_modules')) {
    logError('Dependencies not installed. Run: npm install');
    process.exit(1);
  }
  
  // Check environment variables
  const envOk = await checkEnvironmentVariables();
  
  // Test Supabase connection
  const connectionOk = await testSupabaseConnection();
  
  // Validate database schema
  let schemaOk = false;
  if (connectionOk) {
    schemaOk = await validateDatabaseSchema();
  }
  
  // Print appropriate message based on results
  if (envOk && connectionOk && schemaOk) {
    printSuccessMessage();
  } else {
    printSetupInstructions();
    
    if (!envOk) {
      log('\n⚠️  Environment variables need to be configured');
    }
    if (!connectionOk) {
      log('⚠️  Database connection failed - check credentials and schema');
    }
    if (!schemaOk && connectionOk) {
      log('⚠️  Database schema needs to be applied');
    }
  }
  
  log('\nFor detailed setup instructions, see:', 'cyan');
  log('• README.md - General setup');
  log('• DATABASE_SETUP.md - Database configuration');
  log('• SETUP_INSTRUCTIONS.md - Complete setup process');
}

main().catch(error => {
  logError(`Bootstrap failed: ${error.message}`);
  process.exit(1);
});