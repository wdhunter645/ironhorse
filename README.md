# Lou Gehrig Fan Club (Iron Horse)

[![CodeQL](https://github.com/wdhunter645/ironhorse/workflows/CodeQL%20Security%20Analysis/badge.svg)](https://github.com/wdhunter645/ironhorse/actions/workflows/codeql.yml)
[![Security](https://img.shields.io/badge/security-enabled-green)](./SECURITY.md)
[![Build Status](https://github.com/wdhunter645/ironhorse/workflows/Lou%20Gehrig%20Fan%20Club%20-%20Build%20and%20Deploy/badge.svg)](https://github.com/wdhunter645/ironhorse/actions/workflows/deploy.yml)

A zero-profit initiative supporting ALS research through a fan community website.

## 🛡️ Security

This project is protected by GitHub Advanced Security features:

- **[CodeQL Analysis](https://github.com/wdhunter645/ironhorse/security/code-scanning)**: Automated vulnerability scanning
- **[Secret Scanning](https://github.com/wdhunter645/ironhorse/security/secret-scanning)**: Automatic detection of exposed credentials
- **[Dependabot](https://github.com/wdhunter645/ironhorse/security/dependabot)**: Automated dependency updates and security patches
- **Security Policy**: See [SECURITY.md](./SECURITY.md) for vulnerability reporting

### Security Workflows

- 🔍 **CodeQL scans** run on every push and PR
- 📅 **Weekly security analysis** scheduled for comprehensive checks
- 🔄 **Automated dependency updates** for security patches
- 🚨 **Real-time secret detection** prevents credential exposure

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Development

```bash
# Clone the repository
git clone https://github.com/wdhunter645/ironhorse.git
cd ironhorse

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Building

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🏗️ Project Structure

```
├── .github/
│   ├── workflows/           # CI/CD and security workflows
│   ├── dependabot.yml      # Automated dependency updates
│   └── secret-scanning.md  # Secret scanning documentation
├── app/                    # Next.js app directory
├── components/             # React components
├── scripts/               # Setup and deployment scripts
├── docs/                  # Project documentation
├── SECURITY.md           # Security policy and vulnerability reporting
└── DEPLOYMENT.md         # Deployment instructions
```

## 🔧 Development Tools

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Linting**: ESLint with Next.js configuration
- **CI/CD**: GitHub Actions
- **Security**: GitHub Advanced Security (CodeQL, Secret Scanning, Dependabot)

## 📚 Documentation

- [Setup Instructions](./scripts/README_PREREQS.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Security Policy](./SECURITY.md)
- [Design Documentation](./docs/DESIGN_PER_PAGE.md)
- [Development Container](/.devcontainer/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Security Considerations

When contributing:
- Never commit secrets or credentials
- Review CodeQL findings and fix security issues
- Keep dependencies updated
- Follow the security policy in [SECURITY.md](./SECURITY.md)

## 🏥 Supporting ALS Research

This project is a zero-profit initiative. All proceeds and donations support ALS research organizations.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Security Advisories](https://github.com/wdhunter645/ironhorse/security/advisories)
- [Code Scanning Alerts](https://github.com/wdhunter645/ironhorse/security/code-scanning)
- [Dependabot](https://github.com/wdhunter645/ironhorse/security/dependabot)