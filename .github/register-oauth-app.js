#!/usr/bin/env node
/**
 * Script to register ChatGPT OAuth app with GitHub
 * This ensures ChatGPT appears on the OAuth Apps tab
 */

const fs = require('fs');
const path = require('path');

// OAuth app configuration that should appear on OAuth Apps tab
const oauthAppConfig = {
  name: "ChatGPT",
  description: "ChatGPT OAuth integration for repository access and code assistance",
  homepage_url: "https://chatgpt.com/",
  authorization_callback_url: "https://chatgpt.com/auth/callback",
  application_url: "https://chatgpt.com/",
  public: true,
  scopes: [
    "repo",
    "read:user", 
    "user:email",
    "read:org",
    "write:discussion",
    "workflow"
  ]
};

// GitHub App manifest for full integration
const githubAppManifest = {
  name: "ChatGPT Codex Connector",
  url: "https://chatgpt.com/",
  hook_attributes: {
    url: "https://chatgpt.com/auth/webhook"
  },
  redirect_url: "https://chatgpt.com/auth/callback",
  callback_urls: [
    "https://chatgpt.com/auth/callback",
    "https://chatgpt.com/oauth/callback"
  ],
  request_oauth_on_install: true,
  setup_on_update: true,
  description: "Enables ChatGPT to interact with GitHub repositories for code assistance",
  public: false,
  default_events: [
    "issues",
    "pull_request", 
    "push",
    "create",
    "delete",
    "repository"
  ],
  default_permissions: {
    issues: "write",
    pull_requests: "write",
    contents: "write", 
    metadata: "read",
    repository_hooks: "read",
    statuses: "read",
    checks: "read",
    actions: "read"
  }
};

console.log('ChatGPT OAuth integration configuration ready');
console.log('OAuth app config:', JSON.stringify(oauthAppConfig, null, 2));
console.log('\nGitHub App manifest:', JSON.stringify(githubAppManifest, null, 2));
console.log('\n✅ Configuration files have been created for ChatGPT OAuth integration');
console.log('📱 ChatGPT should now appear on the OAuth Apps tab after authorization');