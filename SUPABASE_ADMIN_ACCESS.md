# Supabase Service Role Key Access

This project’s Supabase **service role key** is securely managed as a GitHub repository secret.

- All admin-level operations, including table creation, policy management, and data migration for Supabase, are authorized via this key.
- GitHub Copilot, Copilot Agent, and ChatGPT Codex—through generated code, automation, or CI/CD workflows—can access Supabase with full privileges using the service role key stored in repo secrets.
- Only authorized repository collaborators can view or update this secret.

## How to Update

1. Go to your repository on GitHub.
2. Navigate to **Settings > Secrets and variables > Actions**.
3. Update or add the `SUPABASE_SERVICE_ROLE_KEY`.

## Security Notice

- The service role key provides full access to Supabase resources—protect it carefully.
- Never expose secrets in source code, issue comments, or public documentation.

---