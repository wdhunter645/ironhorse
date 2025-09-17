#!/bin/bash

# Script to check and install Vercel, Supabase, and GitHub CLI in Codespaces

set -e

echo "Checking and installing CLI tools..."

#### Vercel CLI ####
if ! command -v vercel &> /dev/null; then
  echo "Installing Vercel CLI..."
  npm install -g vercel
else
  echo "Vercel CLI already installed: $(vercel --version)"
fi

#### GitHub CLI ####
if ! command -v gh &> /dev/null; then
  echo "Installing GitHub CLI..."
  if command -v brew &> /dev/null; then
    brew install gh
  elif command -v apt &> /dev/null; then
    sudo apt update && sudo apt install -y gh
  else
    echo "Please install GitHub CLI manually: https://cli.github.com/"
    exit 1
  fi
else
  echo "GitHub CLI already installed: $(gh --version | head -n1)"
fi

#### Supabase CLI ####
if ! command -v supabase &> /dev/null; then
  echo "Installing Supabase CLI..."
  if command -v brew &> /dev/null; then
    brew install supabase/tap/supabase
  else
    # Detect OS and ARCH for binary download
    OS=$(uname -s | tr '[:upper:]' '[:lower:]')
    ARCH=$(uname -m)
    if [[ "$ARCH" == "x86_64" ]]; then
      ARCH="amd64"
    elif [[ "$ARCH" == "arm64" || "$ARCH" == "aarch64" ]]; then
      ARCH="arm64"
    fi
    SUPABASE_URL="https://github.com/supabase/cli/releases/latest/download/supabase_${OS}_${ARCH}.tar.gz"
    TMP_DIR=$(mktemp -d)
    echo "Downloading Supabase CLI from $SUPABASE_URL..."
    curl -L "$SUPABASE_URL" -o "$TMP_DIR/supabase.tar.gz"
    tar -xzf "$TMP_DIR/supabase.tar.gz" -C "$TMP_DIR"
    chmod +x "$TMP_DIR/supabase"
    sudo mv "$TMP_DIR/supabase" /usr/local/bin/
    rm -rf "$TMP_DIR"
  fi
else
  echo "Supabase CLI already installed: $(supabase --version)"
fi

echo "All CLI tools are installed and ready!"
