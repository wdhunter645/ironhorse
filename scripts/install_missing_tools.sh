#!/bin/bash
set -e

# Ensure apt-get is up to date
sudo apt-get update

# Install GitHub CLI
echo "Installing GitHub CLI..."
if ! command -v gh &> /dev/null; then
  sudo apt-get install -y gh || echo 'gh package not found, trying alternate method...'
  type -p curl >/dev/null || sudo apt-get install curl -y
  curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
  sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
  sudo apt-get update
  sudo apt-get install gh -y
fi

echo "Installing postgresql-client..."
sudo apt-get install -y postgresql-client || echo 'postgresql-client package not found.'

# Ensure npm registry is public
echo "Setting npm registry to public..."
npm config set registry https://registry.npmjs.org/

# Install Vercel CLI
if ! command -v vercel &> /dev/null; then
  echo "Installing Vercel CLI..."
  npm install -g vercel
fi

# Install Supabase CLI
if ! command -v supabase &> /dev/null; then
  echo "Installing Supabase CLI..."
  # Download and install Supabase CLI binary (npm global install is deprecated)
  curl -sSL https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz | tar -xz
  sudo mv supabase /usr/local/bin/
  echo "Supabase CLI installed successfully"
fi

echo "All prerequisites attempted. Please rerun your setup scripts if no errors above."