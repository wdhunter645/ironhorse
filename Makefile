supabase-create: ; bash scripts/setup_supabase_project.sh
db-apply: ; bash scripts/db_apply.sh
env-check: ; bash scripts/check_env.sh
repo-secrets: ; bash scripts/set_repo_secrets.sh
vercel-env: ; bash scripts/set_vercel_env.sh
smoke: ; bash scripts/health_smoke.sh
