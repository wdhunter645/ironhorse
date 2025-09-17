#!/bin/bash

# Script to check and install Vercel and GitHub CLI for Supabase Cloud deployment

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

echo "All CLI tools are installed and ready!"
echo ""
echo "Note: Supabase CLI is not required for this project."
echo "This project uses Supabase Cloud exclusively with GitHub repository secrets."
