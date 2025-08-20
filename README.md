# 🚀 Bug Tracker CI/CD Demo

A complete CI/CD pipeline demonstration for the Oklahoma IT Symposium, showcasing modern DevOps practices through a bug tracking dashboard application.

## 🎯 Demo Overview

This project demonstrates a complete CI/CD pipeline using a bug tracking dashboard that ironically contains bugs. The live demo shows how to fix a "critical filter" bug and watch it flow through an automated pipeline from code commit to production deployment.

### Key Demo Story
- **Application**: Bug tracking dashboard (React/Next.js)
- **Demo Bug**: Critical filter doesn't work (shows all bugs instead of just critical)
- **Target Audience**: IT professionals, developers, team leads
- **Duration**: 30-minute live demonstration

## 🏗️ Architecture

### Application Stack
- **Frontend**: Next.js 14 with React 18
- **Styling**: Tailwind CSS
- **Testing**: Jest (unit) + Cypress (E2E)
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions
- **Integration**: Jira (automatic ticket updates)

### Demo Features
- ✅ Bug tracking dashboard with statistics
- ✅ Add new bugs with severity levels
- ✅ Filter bugs by severity (with intentional critical filter bug)
- ✅ Professional UI with icons and responsive design
- ✅ Comprehensive test suite that demonstrates bugs
- ✅ Complete CI/CD pipeline with staging and production

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Local Development
```bash
# Clone the repository
git clone <repository-url>
cd bug-tracker-cicd-demo

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run cypress:open # Open Cypress test runner
npm run cypress:run  # Run Cypress tests headlessly
```

## 🐛 Intentional Demo Bugs

### Bug #1: Critical Filter Issue
**Location**: `pages/index.js:46-52`
**Problem**: Critical filter shows all bugs instead of just critical ones
**Test**: Unit test and E2E test will fail on critical filter functionality
**Fix**: Add missing line: `if (filter === 'critical') return bug.severity === 'critical'`

### Bug #2: Empty Input Validation
**Location**: `pages/index.js:74-84`
**Problem**: Can add bugs with empty titles
**Test**: Unit test and E2E test will fail on input validation
**Fix**: Add validation: `if (!newBug.title.trim()) return`

## 🎭 Demo Script (30 minutes)

### Minutes 1-4: Show the Problem
1. Open production site: `https://bug-tracker-cicd-demo.vercel.app`
2. Click "Critical" filter
3. **Point out**: Shows all bugs instead of just critical
4. **Explain**: This is a production bug that needs fixing

### Minutes 4-12: Fix the Bug Locally
1. Clone repository locally
2. Show failing tests: `npm test`
3. Identify the bug in `pages/index.js`
4. Fix the critical filter logic
5. Show tests now passing: `npm test`
6. Demonstrate fix works locally: `npm run dev`

### Minutes 12-22: CI/CD Pipeline in Action
1. Create feature branch: `git checkout -b fix/DEMO-123-critical-filter`
2. Commit fix: `git commit -m "fix: DEMO-123 Fix critical bug filter"`
3. Push to GitHub: `git push origin fix/DEMO-123-critical-filter`
4. Show GitHub Actions pipeline running:
   - ✅ Quality checks (linting, unit tests)
   - ✅ E2E tests
   - ✅ Build
   - ✅ Deploy to staging
   - 📝 Jira ticket updated automatically

### Minutes 22-28: Staging and Production
1. Review staging deployment
2. Create pull request to main
3. Show manual approval for production
4. Approve production deployment
5. Watch production deployment complete

### Minutes 28-30: Verification and Wrap-up
1. Test production fix: critical filter now works
2. Show Jira ticket automatically moved to "Done"
3. Summarize the complete pipeline journey
4. Q&A

## 🏭 CI/CD Pipeline

### Pipeline Stages
1. **Quality Gates**
   - ESLint code quality checks
   - Unit tests with coverage
   - E2E tests with Cypress

2. **Build**
   - Next.js production build
   - Artifact storage

3. **Deploy Staging**
   - Automatic deployment to staging
   - Health checks
   - Jira ticket updates

4. **Deploy Production**
   - Manual approval required
   - Production deployment
   - Health verification
   - Jira ticket completion

### Required Secrets
Set these in GitHub repository secrets:

```bash
# Vercel Configuration
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# Jira Integration
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_API_TOKEN=your_api_token
JIRA_USER_EMAIL=your_email@domain.com
```

## 🧪 Testing Strategy

### Unit Tests (Jest + React Testing Library)
- Component rendering validation
- Bug filtering logic (including broken tests)
- Form submission and validation
- Statistics calculation
- User interaction testing

### E2E Tests (Cypress)
- Complete user workflows
- Cross-browser compatibility
- Form interactions
- Filter functionality testing
- Visual regression prevention

### Test Data Attributes
All interactive elements have `data-testid` attributes for reliable testing:
- `filter-{severity}` - Filter buttons
- `add-bug-button` - Add bug button
- `bug-{id}` - Individual bug items
- `total-bugs` - Statistics counters

## 🌐 Deployment

### Environments
- **Staging**: `https://bug-tracker-demo-staging.vercel.app`
- **Production**: `https://bug-tracker-cicd-demo.vercel.app`

### Deployment Strategy
- Automatic staging deployment on develop/main branch
- Manual approval required for production
- Health checks on both environments
- Rollback capability through Vercel dashboard

## 🎯 Jira Integration

### Automatic Features
- Detects `DEMO-XXX` ticket numbers in commit messages
- Adds deployment comments with environment details
- Transitions tickets to "Done" on successful production deployment
- Includes commit information and deployment URLs

### Example Commit Message
```bash
git commit -m "fix: DEMO-123 Fix critical filter bug

- Added missing critical severity filter logic
- All tests now pass
- Ready for production deployment"
```

## 🛠️ Troubleshooting

### Common Issues

**Tests Failing Locally**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm test
```

**Cypress Issues**
```bash
# Clear Cypress cache
npx cypress cache clear
npx cypress install
```

**Build Failures**
```bash
# Check Node version
node --version  # Should be 18+

# Clean build
rm -rf .next
npm run build
```

### Demo Day Checklist
- [ ] Test all scripts work locally
- [ ] Verify staging and production URLs are accessible
- [ ] Check GitHub Actions pipeline permissions
- [ ] Validate Jira integration with test ticket
- [ ] Prepare backup slides in case of technical issues
- [ ] Test screen sharing and presentation setup

## 📚 Learning Resources

### Key Concepts Demonstrated
- **Continuous Integration**: Automated testing and quality checks
- **Continuous Deployment**: Automated staging with manual production approval
- **Infrastructure as Code**: GitHub Actions workflow configuration
- **Quality Gates**: Multiple layers of validation before production
- **Integration Testing**: E2E tests that mirror user behavior
- **Monitoring**: Health checks and deployment verification

### Technologies Showcased
- **Next.js**: Modern React framework
- **GitHub Actions**: CI/CD automation
- **Vercel**: Modern deployment platform
- **Jest/Cypress**: Comprehensive testing strategy
- **Jira**: Project management integration
- **Tailwind CSS**: Utility-first styling

## 🤝 Contributing

This is a demo project for educational purposes. To modify for your own presentations:

1. Fork the repository
2. Update branding and content as needed
3. Configure your own deployment secrets
4. Test the complete pipeline
5. Practice the demo script multiple times

## 📞 Support

For questions about this demo or CI/CD practices:
- Create an issue in this repository
- Reference the troubleshooting section
- Check the demo script for timing and flow

## 📄 License

This project is created for educational purposes as part of the Oklahoma IT Symposium presentation.

---

**🎉 Ready to demonstrate modern CI/CD practices!**

The complete pipeline showcases how modern development teams can deploy code confidently and quickly through automated testing, staging environments, and controlled production releases.