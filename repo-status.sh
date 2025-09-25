set -euo pipefail
OUT="repo-status.txt"
echo "=== IRONHORSE STATUS ($(date -u +"%Y-%m-%d %H:%M:%S UTC")) ===" > "$OUT"

echo -e "\n[git] branch & last 10 commits" >> "$OUT"
git rev-parse --abbrev-ref HEAD >> "$OUT"
git log --oneline -n 10 >> "$OUT"

echo -e "\n[git] working tree" >> "$OUT"
git status -s >> "$OUT" || true

echo -e "\n[tree] top-level app folders (root)" >> "$OUT"
ls -la | sed -n '1,200p' >> "$OUT"

echo -e "\n[tree] app structure" >> "$OUT"
find app -maxdepth 2 -type f -name "page.tsx" | sort >> "$OUT" || true
find app -maxdepth 2 -type f -name "layout.tsx" | sort >> "$OUT" || true

echo -e "\n[dup-check] ironhorse subtree (should be gone)" >> "$OUT"
find ironhorse -maxdepth 3 -type f 2>/dev/null | head -n 20 >> "$OUT" || echo "no ironhorse/ folder" >> "$OUT"

echo -e "\n[layout] check for embedded CSS guardrail" >> "$OUT"
if grep -q "const GLOBAL_CSS" app/layout.tsx 2>/dev/null; then
  echo "OK: embedded CSS present in app/layout.tsx" >> "$OUT"
else
  echo "MISSING: embedded CSS not found in app/layout.tsx" >> "$OUT"
fi

echo -e "\n[public routes] expected Phase-4 pages" >> "$OUT"
for p in weekly member charities milestones qna news calendar privacy terms; do
  test -f "app/$p/page.tsx" && echo "OK: app/$p/page.tsx" >> "$OUT" || echo "MISSING: app/$p/page.tsx" >> "$OUT"
done

echo -e "\n[apis] expected endpoints" >> "$OUT"
test -f app/api/ok/route.ts && echo "OK: /api/ok" >> "$OUT" || echo "MISSING: /api/ok" >> "$OUT"
test -f app/api/quotes/weekly/route.ts && echo "OK: /api/quotes/weekly" >> "$OUT" || echo "MISSING: /api/quotes/weekly" >> "$OUT"

echo -e "\n[auth/admin] gating presence" >> "$OUT"
test -f middleware.ts && echo "middleware.ts present" >> "$OUT" || echo "MISSING: middleware.ts" >> "$OUT"
grep -R "@supabase/supabase-js" -n package.json || echo "@supabase/supabase-js not in package.json" >> "$OUT"
grep -R "@aws-sdk/client-s3" -n package.json || echo "@aws-sdk/client-s3 not in package.json" >> "$OUT"

echo -e "\n[next] config sanity" >> "$OUT"
test -f next.config.ts && echo "next.config.ts present" >> "$OUT" || echo "MISSING: next.config.ts" >> "$OUT"
test -f tsconfig.json && echo "tsconfig.json present" >> "$OUT" || echo "MISSING: tsconfig.json" >> "$OUT"

echo -e "\n=== END ===" >> "$OUT"
echo "Wrote $OUT"