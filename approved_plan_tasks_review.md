# Lou Gehrig Fan Club — Approved Project Plan Tasks (Phases 1–4)

[P1] Connect Vercel project to the public GitHub repo; set Production Branch=main and Root Directory=repo root.
[P1] Verify Vercel build command (Next.js default) and output settings (no custom dist dir).
[P1] Remove any Git LFS pointers and ensure repo has only normal Git-tracked files.
[P1] Configure all environment variables in Vercel: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAILS.
[P1] Configure Backblaze B2 env: B2_KEY_ID, B2_APP_KEY, B2_BUCKET, B2_ENDPOINT, PUBLIC_B2_BASE_URL.
[P1] Configure NEXT_PUBLIC_SITE_URL to the production domain.
[P1] Add/confirm health endpoint /api/ok returns { ok: true }.
[P1] Add/confirm /sitemap route produces XML with public routes.
[P1] Add robots.txt (disallow none) at /public/robots.txt.
[P1] Commit baseline and verify a green Production deploy from main.

[P2] Create idempotent SQL migration to ensure core tables exist or are added without destructive changes.
[P2] Ensure tables exist (create if missing): media_assets (canonical for uploads), quotes, photos, matchups, votes, charities, milestones, posts(kind: news|qna), events.
[P2] Add unique index on media_assets.key for upserts.
[P2] Add unique constraint or composite conflict target for quotes (text+source) for idempotent seed.
[P2] Implement /api/quotes/weekly to read from quotes (tolerate text|quote_text and source|attribution columns); return latest week or recent items.
[P2] Implement /api/vote to accept { matchupId, choice } with one-vote-per-voter (cookie + IP hash) and return { a, b } totals.
[P2] Implement B2 presign API at /api/admin/b2/presign (S3-compatible client) returning PUT URL + publicUrl.
[P2] Add seed script for 50 quotes and run it once; verify quotes table populated.
[P2] Add minimal seed rows for charities, milestones, posts, events when those tables are empty (optional but allowed by plan).
[P2] Commit and verify production build green.

[P3] Replace layout with the approved global shell (embedded CSS permitted) without altering approved visual structure.
[P3] Set the exact header labels and links (public nav): Weekly Matchup (/weekly) · Milestones (/milestones) · Charities (/charities) · News & Q&A (/news) · Calendar (/calendar) · Join (/member).
[P3] Move Admin link to footer utility row alongside Privacy and Terms.
[P3] Implement Home hero with CTA “Join the Club” linking to /member.
[P3] Implement Home tiles: Weekly Matchup, Milestones, News & Q&A, Member, Charities, Calendar.
[P3] Ensure public routes exist and render 200: /weekly, /milestones, /charities, /news, /qna, /calendar, /privacy, /terms.
[P3] Set Privacy page copy with contact email LouGehrigFanClub@gmail.com (approved text).
[P3] Set Terms page copy with contact email LouGehrigFanClub@gmail.com (approved text).
[P3] Remove any duplicate app trees (e.g., ironhorse/*) so only one Next.js app remains at repo root.
[P3] Commit and verify production shows the approved header/footer and a styled home (no text-only regression).

[P4] Wire Supabase auth using @supabase/auth-helpers-nextjs (email magic-link); do not prompt users for providers not in plan.
[P4] Add middleware to protect /member/** (require session) and /admin/** (require session + email allowlist via ADMIN_EMAILS).
[P4] Add Sign In / Sign Out controls in header (show user email when authenticated).
[P4] Build Member area pages: /member (home), /member/signin (email form), /member/profile, /member/downloads, /member/photos.
[P4] Build Admin dashboard shell with left sidebar at /admin and tool links: Imports, Uploads, Matchups, News & Q&A, Milestones, Charities, Events.
[P4] Implement Admin Imports page (/admin/imports) with button to POST /api/admin/b2/sync and render sync stats.
[P4] Implement /api/admin/b2/sync to list B2 bucket, upsert media_assets(key,url), and upsert photos(url,title); return { scanned, images, upsertedAssets, upsertedPhotos }.
[P4] Run B2 sync once and confirm photos table count ≈ uploaded images.
[P4] Implement Member Gallery at /member/photos (latest 60 photos, grid, simple pagination with ?page=N).
[P4] Implement Weekly Matchup admin CRUD: list (/admin/matchups), create (/admin/matchups/new), edit/results (/admin/matchups/[id]).
[P4] Ensure public /weekly reads the active matchup and supports voting via /api/vote; display live totals after vote.
[P4] Implement Admin content CRUD: Charities, Milestones, News & Q&A (posts), Events (list/create/edit with validation).
[P4] Update public pages to read from DB: /charities, /milestones, /news, /qna, /calendar render real data.
[P4] Add per-page metadata (title/description) and favicon; confirm sitemap includes public routes.
[P4] Document runbook: how to add admins (ADMIN_EMAILS), run B2 sync, create a matchup, post News/Q&A, add Milestones and Events.
[P4] Final production verification checklist: all routes 200; auth gating correct; Admin tools functional; quotes API returns DB data; Weekly voting enforces one vote per user; builds green.

[Owner] Upload media images to B2 (done; verify bucket count matches photos after sync).
[Owner] Draft final copy for each page and publish via Admin tools (Charities, Milestones, News/Q&A, Events).
