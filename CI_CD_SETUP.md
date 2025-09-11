# CI/CD Setup Guide

## 🚀 GitHub Actions CI/CD Pipeline

This project includes a comprehensive CI/CD pipeline with the following workflows:

### 1. Main CI/CD Pipeline (`.github/workflows/ci-cd.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**Jobs:**
- **Code Quality & Tests**: TypeScript check, ESLint, Build
- **Security Scan**: Vulnerability scanning with Trivy
- **Deploy Preview**: Preview deployments for PRs (Vercel)
- **Deploy Production**: Production deployments (main branch only)

### 2. Code Analysis (`.github/workflows/code-analysis.yml`)

**Features:**
- CodeQL security analysis
- Bundle size analysis and PR comments
- Lighthouse performance testing

### 3. Dependency Management (`.github/workflows/dependencies.yml`)

**Features:**
- Weekly automated dependency updates
- Security auditing
- Auto-creation of PRs for updates

## 🔧 Setup Instructions

### Step 1: GitHub Secrets

Add these secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):

```
VERCEL_TOKEN=<your-vercel-token>
VERCEL_ORG_ID=<your-vercel-org-id>
VERCEL_PROJECT_ID=<your-vercel-project-id>
SLACK_WEBHOOK_URL=<optional-slack-webhook> 
```

### Step 2: Vercel Setup

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Link project: `vercel link`
4. Get org/project IDs: `vercel env ls`

### Step 3: Enable GitHub Actions

1. Go to `Settings > Actions > General`
2. Set "Actions permissions" to "Allow all actions and reusable workflows"
3. Enable "Allow GitHub Actions to create and approve pull requests"

## 📊 Pipeline Features

### ✅ Quality Gates

- **TypeScript**: Zero compilation errors
- **ESLint**: Code style and quality checks  
- **Build**: Successful Next.js build
- **Security**: Vulnerability scanning
- **Performance**: Lighthouse scoring

### 🚀 Deployment Strategy

- **Preview**: Every PR gets a preview deployment
- **Production**: Only `main` branch deploys to production
- **Rollback**: Previous deployments available in Vercel dashboard

### 🔄 Automation

- **Dependencies**: Weekly updates with PR creation
- **Security**: Continuous vulnerability monitoring
- **Performance**: Lighthouse checks on every PR
- **Bundle Analysis**: Size tracking and reporting

## 🛠 Local Development

### Available Scripts

```bash
# Development
bun run dev          # Start dev server
bun run build        # Production build
bun run start        # Start production server

# Quality Checks  
bun run lint         # Run ESLint
bun run lint:fix     # Fix ESLint issues
bun run type-check   # TypeScript check
bun run format       # Format with Prettier

# Security
bun run audit        # Security audit
```

### Pre-commit Checks

Install pre-commit hooks (optional):

```bash
# Install husky
bun add -D husky lint-staged

# Setup pre-commit hook
echo '#!/bin/sh
bun run lint && bun run type-check' > .husky/pre-commit
chmod +x .husky/pre-commit
```

## 📈 Monitoring & Notifications

### Vercel Integration
- Automatic deployments
- Preview URLs for every PR
- Performance monitoring
- Error tracking

### GitHub Integration
- Status checks on PRs
- Automated PR comments (bundle size, performance)
- Security alerts
- Dependency update PRs

### Slack Integration (Optional)
- Deployment notifications
- Build failure alerts
- Security vulnerability alerts

## 🔒 Security Features

- **Trivy scanning**: Container and filesystem vulnerability scanning
- **CodeQL analysis**: Static code analysis for security issues
- **Dependency auditing**: Weekly security audits
- **Automated updates**: Security patches via automated PRs

## 📋 Workflow Status

You can monitor workflow status at:
- `https://github.com/[username]/[repo]/actions`

## 🚨 Troubleshooting

### Common Issues

1. **Build failures**: Check TypeScript and ESLint errors
2. **Deployment issues**: Verify Vercel secrets are correct
3. **Security failures**: Update vulnerable dependencies
4. **Performance issues**: Check Lighthouse recommendations

### Getting Help

- Check workflow logs in GitHub Actions tab
- Review Vercel deployment logs
- Run scripts locally to debug issues
