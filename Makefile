supabase-create: ; bash scripts/setup_supabase_project.sh
db-apply: ; bash scripts/db_apply.sh
db-deploy: ; bash scripts/deploy_database.sh
db-validate: ; node scripts/validate_database.js
db-setup: db-deploy db-validate
db-migrations: ; node scripts/display_migrations.js
db-migrate: ; node scripts/apply_migrations.js
env-check: ; bash scripts/check_env.sh
repo-secrets: ; bash scripts/set_repo_secrets.sh
vercel-env: ; bash scripts/set_vercel_env.sh
smoke: ; bash scripts/health_smoke.sh
verify-cli: ; bash scripts/verify_cli_tools.sh
validate-supabase: ; bash scripts/validate_supabase_setup.sh
