#!/usr/bin/env bash
set -euo pipefail
mkdir -p rescue/.state; : > rescue/.state/secrets.txt
grep -RIn --exclude-dir={.git,node_modules,rescue/.state} -E '\b(vck_[A-Za-z0-9_-]{20,})\b' . >> rescue/.state/secrets.txt || true
grep -RIn --exclude-dir={.git,node_modules,rescue/.state} -E '\b(supabase|SUPABASE)[A-Za-z_]*(key|KEY)\b.*' . >> rescue/.state/secrets.txt || true
grep -RIn --exclude-dir={.git,node_modules,rescue/.state} -E '\b(AKIA[0-9A-Z]{16})\b' . >> rescue/.state/secrets.txt || true
grep -RIn --exclude-dir={.git,node_modules,rescue/.state} -E '\b(b2_[a-z0-9]{20,})\b' . >> rescue/.state/secrets.txt || true
grep -RIn --exclude-dir={.git,node_modules,rescue/.state} -E 'BEGIN (RSA|EC) PRIVATE KEY' . >> rescue/.state/secrets.txt || true
[[ -s rescue/.state/secrets.txt ]] && echo "SECRETS STATUS: FOUND" && exit 1 || echo "SECRETS STATUS: OK"
