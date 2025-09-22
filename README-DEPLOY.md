# Ironhorse Phase 3 + Phase 4 Drop-in (No Tailwind)

This package replaces the text-only scaffold with a styled UI and Phase-4 stub pages, using **vanilla CSS** (no Tailwind/PostCSS).

## How to use
1) **Backup** your repo (or clone a fresh working copy).
2) Extract the contents of this zip **into the repo root**, overwriting existing files:
   - `app/`, `components/`, `public/`, plus `tsconfig.json`, `next.config.ts`, `package.json`, `next-env.d.ts`.
3) Commit and push to `main`:
   ```bash
   git add -A
   git commit -m "feat(ui): Phase 3/4 drop-in — styled shell, routes, APIs"
   git push origin main
   ```
4) Vercel will auto-deploy. Open the production URL and verify:
   - Styled homepage (hero + cards)
   - Routes return 200: `/member`, `/charities`, `/milestones`, `/qna`, `/news`, `/calendar`, `/privacy`, `/terms`
   - API: `/api/ok` returns `{ ok: true }`, `/api/quotes/weekly` returns JSON
   - Sitemap: `/sitemap` returns XML

## Notes
- No Tailwind required; this avoids plugin/config mismatches.
- Typescript config includes path aliases `@/*` and `@components/*` if you want to adopt them later.
- You can drop a real logo at `public/logo.svg` and replace the placeholder images in `public/`.
