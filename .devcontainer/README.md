# GitHub Codespaces Development Setup

This repository is configured for GitHub Codespaces development with automatic setup of all required CLI tools.

## Quick Start

1. **Open in Codespaces**: Click the "Code" button and select "Create codespace on main"
2. **Wait for setup**: The devcontainer will automatically:
   - Install Node.js 18
   - Install project dependencies (`npm install`)
   - Install CLI tools including Vercel CLI and GitHub CLI
   - Configure VS Code extensions

## Included Tools

The codespace comes pre-configured with:

- **Node.js 18**: JavaScript runtime
- **Vercel CLI**: For deployment to Vercel platform
- **GitHub CLI**: For GitHub repository management
- **VS Code Extensions**:
  - TypeScript support
  - JSON support
  - Tailwind CSS IntelliSense
  - Prettier code formatter

## Verifying Installation

After the codespace starts, you can verify the CLI tools are installed:

```bash
# Check Vercel CLI
vercel --version

# Check GitHub CLI
gh --version

# Check Node.js
node --version
```

## Development Workflow

1. **Start development server**:
   ```bash
   npm run dev
   ```
   The dev server will be available on port 3000 (automatically forwarded)

2. **Build for production**:
   ```bash
   npm run build
   ```

3. **Deploy to Vercel** (requires authentication):
   ```bash
   vercel --prod
   ```

## Authentication Setup

### Vercel Authentication
Before deploying, authenticate with Vercel:
```bash
vercel login
```

### GitHub Authentication
GitHub CLI should be automatically authenticated in Codespaces, but you can verify:
```bash
gh auth status
```

## Manual CLI Installation

If you need to manually install CLI tools, run:
```bash
bash scripts/install_cli_tools.sh
```

## Port Forwarding

The codespace automatically forwards port 3000 for the Next.js development server. You'll receive a notification when the port is available.

## VS Code Extensions

The following extensions are automatically installed:
- TypeScript and JavaScript Language Support
- JSON Language Support
- Tailwind CSS IntelliSense
- Prettier Code Formatter

## Troubleshooting

### Vercel CLI Issues
If Vercel CLI is not working:
1. Check if it's installed: `command -v vercel`
2. Reinstall if needed: `npm install -g vercel`
3. Verify with: `vercel --version`

### Port Not Forwarding
If the development server port isn't forwarding:
1. Check if the server is running: `npm run dev`
2. Verify the port in VS Code's "Ports" tab
3. Manually forward port 3000 if needed

## Project Structure

- `.devcontainer/`: Codespaces configuration
- `scripts/`: Setup and deployment scripts
- `app/`: Next.js application code
- `public/`: Static assets

For more detailed setup instructions, see [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md).