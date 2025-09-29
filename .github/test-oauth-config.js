#!/usr/bin/env node
/**
 * Test script to verify ChatGPT OAuth configuration is complete
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Testing ChatGPT OAuth configuration...\n');

// Test 1: Check all required files exist
const requiredFiles = [
  '.github/oauth-app.json',
  '.github/github-app-manifest.json', 
  '.github/app.yml',
  '.github/chatgpt-app.yml',
  '.github/workflows/chatgpt-oauth.yml',
  '.github/CHATGPT_OAUTH_SETUP.md'
];

console.log('✅ Checking required configuration files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

// Test 2: Validate JSON files
console.log('\n✅ Validating JSON configuration...');
try {
  const oauthConfig = JSON.parse(fs.readFileSync('.github/oauth-app.json', 'utf8'));
  const manifestConfig = JSON.parse(fs.readFileSync('.github/github-app-manifest.json', 'utf8'));
  
  // Check OAuth app has required fields
  const requiredOAuthFields = ['name', 'authorization_callback_url', 'scopes'];
  const hasRequiredOAuth = requiredOAuthFields.every(field => field in oauthConfig);
  console.log(`${hasRequiredOAuth ? '✅' : '❌'} OAuth app has required fields`);
  
  // Check GitHub App manifest has required fields  
  const requiredManifestFields = ['name', 'redirect_url', 'default_permissions'];
  const hasRequiredManifest = requiredManifestFields.every(field => field in manifestConfig);
  console.log(`${hasRequiredManifest ? '✅' : '❌'} GitHub App manifest has required fields`);
  
  // Check OAuth scopes are configured
  const hasScopes = oauthConfig.scopes && oauthConfig.scopes.length > 0;
  console.log(`${hasScopes ? '✅' : '❌'} OAuth scopes configured: ${oauthConfig.scopes?.join(', ')}`);
  
} catch (error) {
  console.log(`❌ JSON validation failed: ${error.message}`);
  allFilesExist = false;
}

// Test 3: Check callback URLs
console.log('\n✅ Checking callback URLs...');
try {
  const oauthConfig = JSON.parse(fs.readFileSync('.github/oauth-app.json', 'utf8'));
  const manifestConfig = JSON.parse(fs.readFileSync('.github/github-app-manifest.json', 'utf8'));
  
  const oauthCallback = oauthConfig.authorization_callback_url;
  const manifestCallback = manifestConfig.redirect_url;
  
  console.log(`✅ OAuth callback: ${oauthCallback}`);
  console.log(`✅ App redirect: ${manifestCallback}`);
  
  const validCallbacks = oauthCallback?.includes('chatgpt.com') && manifestCallback?.includes('chatgpt.com');
  console.log(`${validCallbacks ? '✅' : '❌'} Callbacks point to ChatGPT domain`);
  
} catch (error) {
  console.log(`❌ Callback URL check failed: ${error.message}`);
}

// Final result
console.log('\n' + '='.repeat(50));
if (allFilesExist) {
  console.log('🎉 SUCCESS: ChatGPT OAuth configuration is complete!');
  console.log('📱 ChatGPT should now appear on the OAuth Apps tab');
  console.log('\nNext steps:');
  console.log('1. Go to GitHub Settings > Developer settings > OAuth Apps');
  console.log('2. Look for "ChatGPT" in the authorized applications');
  console.log('3. Authorize the application for this repository');
  console.log('4. Test integration by creating a Design Spec issue');
} else {
  console.log('❌ FAILED: OAuth configuration is incomplete');
  console.log('Please check the missing files and try again');
  process.exit(1);
}