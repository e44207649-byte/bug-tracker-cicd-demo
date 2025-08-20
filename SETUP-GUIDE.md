# 🚀 Demo Setup Guide

## 📋 Pre-Demo Checklist (30 minutes before presentation)

### 1. Environment Setup
- [ ] **GitHub Repository**: Ensure repo is public and accessible
- [ ] **Vercel Account**: Connected to GitHub with proper permissions
- [ ] **Jira Instance**: Test ticket (DEMO-123) created and accessible
- [ ] **Local Development**: All dependencies installed and working

### 2. Required Secrets Configuration

#### GitHub Repository Secrets
Navigate to: `Settings > Secrets and Variables > Actions`

```bash
# Vercel Configuration
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_organization_id
VERCEL_PROJECT_ID=your_project_id

# Jira Integration
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_API_TOKEN=your_jira_api_token
JIRA_USER_EMAIL=your_email@company.com
```

#### How to Get Vercel Values
1. **VERCEL_TOKEN**: 
   - Go to https://vercel.com/account/tokens
   - Create new token with appropriate scope
   
2. **VERCEL_ORG_ID** and **VERCEL_PROJECT_ID**:
   - Run locally: `npx vercel`
   - Follow setup prompts
   - Check `.vercel/project.json` for IDs

#### How to Get Jira Values
1. **JIRA_API_TOKEN**:
   - Go to https://id.atlassian.com/manage-profile/security/api-tokens
   - Create API token
   
2. **JIRA_BASE_URL**: Your Jira domain (https://company.atlassian.net)
3. **JIRA_USER_EMAIL**: Your Jira account email

### 3. Test Environment URLs
- **Production**: `https://bug-tracker-cicd-demo.vercel.app`
- **Staging**: `https://bug-tracker-demo-staging.vercel.app`

### 4. Local Testing Commands
```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Run unit tests (should show 2 failing tests - this is expected!)
npm test

# Build application
npm run build

# Start production server
npm start

# Open Cypress (optional)
npm run cypress:open
```

---

## 🧪 Pre-Demo Test Script

### Test 1: Verify Intentional Bugs
```bash
# Run tests - should see 2 failing tests
npm test

# Look for these specific failures:
# 1. "DEMO BUG: critical filter should show only critical bugs but shows all bugs"
# 2. "DEMO BUG: should not allow adding bugs with empty title but does"
```

### Test 2: Verify Local Application
```bash
# Start dev server
npm run dev

# Visit http://localhost:3000
# Test the critical filter bug:
# 1. Click "Critical" filter
# 2. Should show all 4 bugs (this is the bug!)
# 3. Other filters should work correctly
```

### Test 3: Verify Pipeline (Optional)
```bash
# Create test branch
git checkout -b test/pipeline-check

# Make small change
echo "# Pipeline test" >> test-file.md
git add test-file.md
git commit -m "test: DEMO-123 Pipeline test"
git push origin test/pipeline-check

# Watch GitHub Actions run
# Clean up after test
git checkout main
git branch -D test/pipeline-check
git push origin --delete test/pipeline-check
```

---

## 🎭 Demo Day Setup (5 minutes before)

### Browser Setup
- [ ] **Large Font**: Set browser zoom to 125%
- [ ] **Multiple Tabs Ready**:
  - Tab 1: Production site (`https://bug-tracker-cicd-demo.vercel.app`)
  - Tab 2: GitHub repository
  - Tab 3: GitHub Actions
  - Tab 4: Jira ticket (DEMO-123)
  - Tab 5: Local development (`http://localhost:3000`)

### Terminal Setup
- [ ] **Large Font**: Terminal font size 24pt minimum
- [ ] **Working Directory**: Positioned in project root
- [ ] **Clean State**: No running processes

### Code Editor Setup
- [ ] **Large Font**: Editor font size 18pt minimum
- [ ] **File Ready**: `pages/index.js` bookmarked for quick access
- [ ] **Theme**: High contrast theme for visibility

### Network/Backup Plans
- [ ] **Screenshots**: Prepared screenshots of each demo step
- [ ] **Screen Recording**: Optional - record successful run as backup
- [ ] **Presentation Slides**: Available as fallback
- [ ] **Mobile Hotspot**: Backup internet connection

---

## 🚨 Troubleshooting Common Issues

### Issue: Tests Not Running
```bash
# Clear Jest cache
npm test -- --clearCache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: Build Failures
```bash
# Check Node version (should be 18+)
node --version

# Clear Next.js cache
rm -rf .next
npm run build
```

### Issue: GitHub Actions Failing
- **Secrets**: Verify all secrets are correctly set
- **Permissions**: Ensure GitHub Actions has repository access
- **Branch Protection**: Check if branch protection rules are blocking

### Issue: Vercel Deployment Failing
- **Token**: Verify Vercel token has correct permissions
- **Limits**: Check Vercel account limits
- **Build**: Ensure local build works first

### Issue: Jira Integration Not Working
- **API Token**: Verify token has correct permissions
- **Ticket**: Ensure DEMO-123 ticket exists
- **URL**: Verify Jira base URL is correct

---

## 📖 Backup Presentation Materials

### If Complete Technical Failure
1. **Screenshot Deck**: Prepared screenshots of each step
2. **Concept Presentation**: Focus on CI/CD concepts vs live demo
3. **Architecture Diagram**: Visual explanation of pipeline stages

### If Partial Failure
- **Local Demo Only**: Show bug fix and tests locally
- **Pipeline Screenshots**: Walk through completed pipeline run
- **Jira Screenshots**: Show ticket integration examples

---

## 🎯 Success Criteria

### Technical Success
- [ ] Critical filter bug demonstrates clearly
- [ ] Tests show failing cases appropriately
- [ ] Pipeline runs end-to-end successfully
- [ ] Staging deployment works
- [ ] Production deployment completes
- [ ] Jira integration updates ticket

### Presentation Success
- [ ] Audience can see all screen content clearly
- [ ] Demo timing stays within 30 minutes
- [ ] Key concepts are explained clearly
- [ ] Questions are handled confidently
- [ ] Technical issues are handled gracefully

---

## 📞 Emergency Contacts

### Technical Support
- **Repository**: [Link to GitHub repo]
- **Vercel Dashboard**: [Link to Vercel project]
- **Jira Project**: [Link to Jira project]

### Demo Support
- **Backup Presenter**: [Name and contact]
- **Technical Assistant**: [Name and contact]
- **Event Coordinator**: [Name and contact]

---

**Remember**: The goal is to inspire teams to adopt modern CI/CD practices. Even if technical issues occur, the concepts and benefits can still be effectively communicated!