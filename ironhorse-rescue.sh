#!/usr/bin/env bash
# ironhorse-rescue.sh — Day-0/1 recovery for Vercel + Next.js repo
# Usage examples:
#   ./ironhorse-rescue.sh
#   ENABLE_AUTOPILOT=1 ./ironhorse-rescue.sh
#   FORCE=1 ENABLE_AUTOPILOT=1 ./ironhorse-rescue.sh

set -euo pipefail

FORCE="${FORCE:-0}"                 # 1 to overwrite existing files created by this script
ENABLE_AUTOPILOT="${ENABLE_AUTOPILOT:-0}"  # 1 to install Issue→PR autopilot workflow
PKG_MGR=""                          # will detect pnpm or npm
ROOT="$(pwd)"

say()  { printf "\n\033[1;36m%s\033[0m\n" "$*"; }
warn() { printf "\033[1;33m%s\033[0m\n" "$*"; }
note() { printf "\033[0;90m%s\033[0m\n" "$*"; }

mkfile() {
  local path="$1"; shift
  if [[ -e "$path" && "$FORCE" != "1" ]]; then
    warn "⚠️  Skipping existing: $path  (set FORCE=1 to overwrite)"
    return 0
  fi
  mkdir -p "$(dirname "$path")"
  cat > "$path" <<'EOF'
'"$@"'
EOF
  note "✍️  Wrote $path"
}

detect_pkg_mgr() {
  if command -v pnpm >/dev/null 2>&1; then PKG_MGR="pnpm"
  elif command -v npm  >/dev/null 2>&1; then PKG_MGR="npm"
  else
    warn "No pnpm/npm found. Installing deps step will be skipped."
    PKG_MGR="none"
  fi
}

ensure_tsconfig() {
  if [[ ! -f tsconfig.json ]]; then
    mkfile tsconfig.json '{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}'
  fi
  if [[ ! -f next-env.d.ts ]]; then
    mkfile next-env.d.ts '/// <reference types="next" />'
  fi
}

ensure_package_json() {
  if [[ ! -f package.json ]]; then
    mkfile package.json '{
  "name": "ironhorse",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "typescript": "^5.6.3",
    "eslint": "^9.11.1"
  }
}'
    note "🧩 Created minimal package.json. If you already use different versions, set FORCE=1 and re-run after editing."
  fi
}

ensure_next_config() {
  if [[ ! -f next.config.js || "$FORCE" == "1" ]]; then
    mkfile next.config.js '/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.backblazeb2.com" },
      { protocol: "https", hostname: "f*.backblazeb2.com" }
    ]
  }
};
module.exports = nextConfig;'
  else
    note "ℹ️  next.config.js exists. Ensure Backblaze domains are allowed in images.remotePatterns."
  fi
}

ensure_src_files() {
  mkfile app/page.tsx 'export default function Page() {
  return (
    <main style={{ padding: 32, fontFamily: "ui-sans-serif" }}>
      <h1>ironhorse ✅</h1>
      <p>Build healthy. Env: {process.env.NEXT_PUBLIC_SITE_URL ?? "not set"}</p>
      <ul>
        <li><a href="/api/health">/api/health</a></li>
        <li><a href="/placeholders">/placeholders</a></li>
      </ul>
    </main>
  );
}'
  mkfile app/api/health/route.ts 'import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET() {
  return NextResponse.json({ ok: true, ts: Date.now(), env: process.env.NODE_ENV });
}'
  mkfile app/placeholders/page.tsx 'export default function Placeholders() {
  const items = Array.from({ length: 12 }, (_, i) => `https://picsum.photos/seed/${i}/600/400`);
  return (
    <main style={{ padding: 24, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {items.map((src, i) => (
        <img key={i} src={src} alt={`ph-${i}`} style={{ width: "100%", borderRadius: 12 }} />
      ))}
    </main>
  );
}'
}

ensure_ci() {
  mkfile .github/workflows/ci.yml 'name: CI
on:
  pull_request:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: corepack enable
      - run: pnpm install --frozen-lockfile || npm ci
      - run: pnpm -s build || npm run build'
}

ensure_issue_templates() {
  mkfile .github/ISSUE_TEMPLATE/01-design-spec.yml 'name: Design Spec (Chat)
description: Structured design & patch for a change
title: "[Design] <feature>"
labels: ["design", "auto-apply"]
body:
  - type: textarea
    id: goal
    attributes: { label: Goal, description: One sentence }
    validations: { required: true }
  - type: textarea
    id: scope
    attributes: { label: Scope, description: Files to add/modify, env vars (public vs server-only), any SQL/migrations }
  - type: textarea
    id: patch
    attributes:
      label: Patch (unified diff)
      description: |
        Provide one patch block between markers:

        \`\`\`patch
        *** BEGIN PATCH
        *** ADD FILE: app/page.tsx
        +export default function Page(){ return <main>ironhorse ✅</main> }
        *** END PATCH
        \`\`\`

        For edits, use unified diff (---/+++ and @@ hunks).
      value: |
        *** BEGIN PATCH
        *** END PATCH
    validations: { required: true }
  - type: textarea
    id: validation
    attributes: { label: Validation, description: Commands (pnpm build/test) + URLs to verify }
'
}

ensure_autopilot_workflow() {
  [[ "$ENABLE_AUTOPILOT" != "1" ]] && { note "⏭  Skipping Issue→PR autopilot (set ENABLE_AUTOPILOT=1 to enable)"; return; }
  mkfile .github/workflows/issue-to-pr.yml 'name: Issue → PR (autopilot)
on:
  issues:
    types: [opened, edited, labeled]
permissions:
  contents: write
  pull-requests: write
  issues: write
jobs:
  extract-and-pr:
    if: contains(github.event.issue.labels.*.name, "auto-apply")
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Extract patch from issue
        id: extract
        uses: actions/github-script@v7
        with:
          script: |
            const body = context.payload.issue.body || "";
            const m = body.match(/\*\*\* BEGIN PATCH([\s\S]*?)\*\*\* END PATCH/);
            if(!m) core.setFailed("No patch block found between *** BEGIN/END PATCH");
            core.setOutput("patch", m[1].trim());
      - name: Prepare repo
        run: |
          git config user.name "ironhorse-bot"
          git config user.email "bot@users.noreply.github.com"
          echo "${{ steps.extract.outputs.patch }}" > .autopatch.txt
          BRANCH="auto/${{ github.event.issue.number }}-$(date +%Y%m%d-%H%M%S)"
          echo "$BRANCH" > .branch
      - name: Apply patch
        shell: bash
        run: |
          BRANCH=$(cat .branch)
          git switch -c "$BRANCH"
          # Parse simple ADD FILE blocks & separate unified diff
          awk "
            BEGIN{ mode=0 }
            /^\\*\\*\\* ADD FILE: / { mode=1; file=substr(\$0,16); print \"\" > file; next }
            mode==1 && !/^\\*\\*\\* END PATCH$/ { print \$0 >> file; next }
            /^\\*\\*\\* END PATCH$/ { mode=0; next }
            { print \$0 >> \".autopatch.diff\" }
          " .autopatch.txt
          # Apply unified diff if present
          if [ -s .autopatch.diff ]; then
            git apply --whitespace=fix .autopatch.diff || { echo "git apply failed"; cat .autopatch.diff; exit 1; }
          fi
          git add -A
          git commit -m "Autopilot: apply patch from issue #${{ github.event.issue.number }}" || echo "No changes to commit"
      - name: Build check
        uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: corepack enable
      - run: pnpm install --frozen-lockfile || npm ci
      - run: pnpm -s build || npm run build
      - name: Push branch
        run: |
          BRANCH=$(cat .branch)
          git push origin "$BRANCH"
      - name: Open PR
        id: cpr
        uses: peter-evans/create-pull-request@v6
        with:
          title: "Autopilot PR from Issue #${{ github.event.issue.number }}"
          body: "Generated from Issue #${{ github.event.issue.number }}"
          base: main
          branch: ${{ steps.extract.outputs.branch || '' }}
      - name: Link PR back to Issue
        uses: actions/github-script@v7
        with:
          script: |
            const pr = "${{ steps.cpr.outputs.pull-request-number }}";
            await github.rest.issues.createComment({
              owner: context.repo.owner, repo: context.repo.repo,
              issue_number: context.payload.issue.number,
              body: \`Opened PR #\${pr} from this design.\`
            });
            await github.rest.issues.addLabels({
              owner: context.repo.owner, repo: context.repo.repo,
              issue_number: context.payload.issue.number,
              labels: ["in-progress"]
            });
'
}

ensure_readme_section() {
  mkfile RESCUE_README.md '# ironhorse – Rescue Notes

## What was added
- Minimal homepage (`/`) and health endpoint (`/api/health`) so Vercel shows green.
- Image config for Backblaze B2 (Next Image `remotePatterns`).
- CI workflow that builds on PRs and pushes to `main`.
- Issue template for **Design Spec (Chat)**. Optionally, an **Issue → PR autopilot** workflow.

## How Chat & Codex work now
1. Chat opens an Issue using **Design Spec (Chat)** and includes a single patch block:
   \`\`\`
   *** BEGIN PATCH
   *** ADD FILE: app/page.tsx
   +export default function Page(){ return <main>ironhorse ✅</main> }
   *** END PATCH
   \`\`\`
2. If \`issue-to-pr\` autopilot is enabled and label \`auto-apply\` is present, a PR is opened automatically.
3. Codex iterates on the PR branch until CI passes. Copilot/Agent reviews. Merge when ready.

## Next steps (suggested)
- Ask Chat to propose:
  - Supabase schema + RLS (Design Spec with SQL + migrations).
  - B2 presigned upload routes (Design Spec with two API routes and CORS notes).
- Keep secrets only in Vercel env (server-only where appropriate).
'
}

main() {
  say "🔧 ironhorse rescue starting…"
  detect_pkg_mgr
  ensure_package_json
  ensure_tsconfig
  ensure_next_config
  ensure_src_files
  ensure_ci
  ensure_issue_templates
  ensure_autopilot_workflow
  ensure_readme_section

  if [[ "$PKG_MGR" != "none" ]]; then
    say "📦 Installing dependencies…"
    if [[ "$PKG_MGR" == "pnpm" ]]; then pnpm install || true; else npm install || true; fi
    say "🔨 Building…"
    if [[ "$PKG_MGR" == "pnpm" ]]; then pnpm -s build; else npm run -s build; fi
  fi

  say "✅ Rescue complete."
  echo "Next:"
  echo "  1) Commit & push: git add -A && git commit -m 'rescue: minimal homepage & CI' && git push"
  echo "  2) On Vercel, set env: NEXT_PUBLIC_SITE_URL=https://<your-domain>"
  echo "  3) Visit / and /api/health to verify."
  if [[ "$ENABLE_AUTOPILOT" == "1" ]]; then
    echo "  4) Chat can now open a 'Design Spec (Chat)' Issue with label 'auto-apply' to trigger PR creation."
  else
    echo "  4) (Optional) Re-run with ENABLE_AUTOPILOT=1 to let Issues auto-create PRs."
  fi
}

main "$@"
