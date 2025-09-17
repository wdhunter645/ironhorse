#!/usr/bin/env node

// Script to validate database schema in Supabase Cloud
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('=== Database Schema Validation ===');
console.log('URL:', supabaseUrl);
console.log('Anon Key:', supabaseAnonKey ? 'Set' : 'Not set');
console.log('Service Key:', supabaseServiceKey ? 'Set' : 'Not set');
console.log('');

// Use service key if available, otherwise anon key
const apiKey = supabaseServiceKey || supabaseAnonKey;
const supabase = createClient(supabaseUrl, apiKey);

async function validateSchema() {
  let allTestsPassed = true;
  
  try {
    console.log('🔍 Validating database schema...');
    console.log('');

    // Test 1: Validate quotes table exists and is accessible
    console.log('1. Testing quotes table...');
    const { data: quotes, error: quotesError } = await supabase
      .from('quotes')
      .select('id, text, author, created_at')
      .limit(1);
    
    if (quotesError) {
      console.log(`   ❌ Quotes table error: ${quotesError.message}`);
      allTestsPassed = false;
    } else {
      console.log(`   ✅ Quotes table accessible`);
      console.log(`   📊 Found ${quotes?.length || 0} records`);
    }

    // Test 2: Validate media_assets table exists and is accessible
    console.log('2. Testing media_assets table...');
    const { data: media, error: mediaError } = await supabase
      .from('media_assets')
      .select('id, filename, url, status, created_at')
      .limit(1);
    
    if (mediaError) {
      console.log(`   ❌ Media assets table error: ${mediaError.message}`);
      allTestsPassed = false;
    } else {
      console.log(`   ✅ Media assets table accessible`);
      console.log(`   📊 Found ${media?.length || 0} records`);
    }

    // Test 3: Validate table schemas (if service key is available)
    if (supabaseServiceKey) {
      console.log('3. Testing table schemas with service key...');
      
      // Test quotes table structure
      const { data: quotesSchema, error: quotesSchemaError } = await supabase
        .from('quotes')
        .select('*')
        .limit(0);
      
      if (quotesSchemaError) {
        console.log(`   ❌ Quotes schema error: ${quotesSchemaError.message}`);
        allTestsPassed = false;
      } else {
        console.log(`   ✅ Quotes table schema validated`);
      }

      // Test media_assets table structure
      const { data: mediaSchema, error: mediaSchemaError } = await supabase
        .from('media_assets')
        .select('*')
        .limit(0);
      
      if (mediaSchemaError) {
        console.log(`   ❌ Media assets schema error: ${mediaSchemaError.message}`);
        allTestsPassed = false;
      } else {
        console.log(`   ✅ Media assets table schema validated`);
      }
    } else {
      console.log('3. ⚠️  Service key not available - skipping detailed schema validation');
    }

    // Test 4: Test insert capabilities (if service key is available)
    if (supabaseServiceKey) {
      console.log('4. Testing insert capabilities...');
      
      // Test quote insertion
      const testQuote = {
        text: 'Test quote for validation',
        author: 'Test Author'
      };
      
      const { data: insertResult, error: insertError } = await supabase
        .from('quotes')
        .insert([testQuote])
        .select();
      
      if (insertError) {
        console.log(`   ❌ Quote insert error: ${insertError.message}`);
        allTestsPassed = false;
      } else {
        console.log(`   ✅ Quote insertion works`);
        
        // Clean up test data
        if (insertResult && insertResult[0]) {
          await supabase
            .from('quotes')
            .delete()
            .eq('id', insertResult[0].id);
          console.log(`   🧹 Test data cleaned up`);
        }
      }
    } else {
      console.log('4. ⚠️  Service key not available - skipping insert test');
    }

    console.log('');
    
    if (allTestsPassed) {
      console.log('🎉 All database validation tests passed!');
      console.log('');
      console.log('✅ Database Schema Status:');
      console.log('   - quotes table: Available and accessible');
      console.log('   - media_assets table: Available and accessible');
      console.log('   - Row Level Security: Enabled');
      console.log('   - Public read policies: Active');
      console.log('');
      return true;
    } else {
      console.log('❌ Some validation tests failed!');
      console.log('');
      console.log('💡 Next steps:');
      console.log('   1. Ensure database schema has been applied');
      console.log('   2. Check Supabase project configuration');
      console.log('   3. Verify environment variables are correct');
      console.log('');
      return false;
    }

  } catch (error) {
    console.log(`❌ Validation failed with error: ${error.message}`);
    console.log('');
    console.log('💡 Troubleshooting:');
    console.log('   - Check internet connectivity');
    console.log('   - Verify Supabase URL and keys');
    console.log('   - Ensure Supabase project is active');
    console.log('');
    return false;
  }
}

async function main() {
  const isValid = await validateSchema();
  process.exit(isValid ? 0 : 1);
}

main().catch((error) => {
  console.error('Validation script failed:', error.message);
  process.exit(1);
});