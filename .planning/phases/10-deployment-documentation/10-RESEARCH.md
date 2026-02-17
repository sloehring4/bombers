# Phase 10: Deployment & Documentation - Research

**Researched:** 2026-02-17
**Domain:** Vercel deployment, DNS configuration, operations documentation for non-technical users
**Confidence:** HIGH

## Summary

Phase 10 deploys the Next.js site to Vercel's free tier (Hobby plan), repoints the existing ofallonbombers.com domain from JerseyWatch, and creates comprehensive operations documentation for non-technical board members. The research confirms that Vercel's GitHub integration provides zero-config auto-deployment on push to main, instant rollback capabilities via dashboard, and automatic preview deployments for PRs—all features available on the free tier. Custom domain setup requires simple DNS record changes (A record or CNAME), with Vercel handling SSL automatically. The primary challenge is documentation: board members are non-technical parents/coaches who need screenshot-level clarity for operations beyond JSON editing (which Phase 9's Content Update Guide already covers).

**Primary recommendation:** Use Vercel's GitHub integration for auto-deploy on main branch, enable preview deployments for content PRs, grant board members GitHub collaborator access only (no Vercel dashboard access needed), create an operations guide in markdown within the repo covering deployment status checks, rollback procedures, and escalation contacts.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Deploy workflow**
- Auto-deploy on push to main — every merged PR triggers a production deploy
- API keys (Web3Forms) stay hardcoded in code — no Vercel environment variable management needed
- Board members' workflow: edit JSON in GitHub → create PR → CI validates → merge → auto-deploys

**Domain & DNS**
- Repointing an existing domain from JerseyWatch to Vercel (domain already owned)
- Document DNS record changes needed (A record / CNAME to Vercel)
- SSL handled automatically by Vercel

**Board guide scope**
- Full operations guide: deployment steps, troubleshooting common issues, escalation path
- Audience is non-technical (parents/coaches) — step-by-step instructions, assume no dev knowledge
- Include "who to contact" escalation section for issues beyond the guide's scope
- Complements Phase 9's Content Update Guide (don't duplicate JSON editing instructions)

**Access & permissions**
- Whole board needs edit access to GitHub repo
- All board members get GitHub accounts and repo collaborator access

### Claude's Discretion

- Preview deployments for content PRs (recommend yes — free on Vercel, lets board members check changes)
- Rollback approach (recommend Vercel instant rollback — simplest for non-technical users)
- Old JerseyWatch URL redirects (recommend skip unless high-traffic pages exist — effort vs benefit)
- Repo visibility: public vs private (recommend public — simpler, free tier, no secrets in code)
- Branch protection on main (recommend no required reviews — whole board edits, CI validation from Phase 9 catches errors, reviews would bottleneck non-technical users)
- Vercel dashboard access (recommend just the site owner — board members interact through GitHub only, keeps things simple)
- Guide format (recommend markdown in repo — always in sync with code, accessible via GitHub)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

## Standard Stack

### Core Deployment Platform
| Platform | Plan | Purpose | Why Standard |
|---------|------|---------|--------------|
| Vercel | Hobby (free) | Deployment, hosting, SSL | Created by Next.js team, zero-config Next.js deployment, automatic SSL, generous free tier (100 GB data transfer, 100 deployments/day) |

### Supporting Infrastructure
| Service | Cost | Purpose | When to Use |
|---------|------|---------|-------------|
| Vercel GitHub Integration | Free | Auto-deploy on push, PR previews | Standard for any GitHub + Vercel project |
| GitHub Collaborators | Free | Repository access control | Board member content editing access |
| DNS Provider (existing) | Varies | Domain DNS records | Domain already owned, just need to update records |

### Free Tier Limits (Hobby Plan)
| Resource | Limit | Impact |
|---------|-------|--------|
| Custom domains per project | 50 | More than sufficient (need 1) |
| Deployments per day | 100 | Plenty for content updates |
| Deployments per hour | 100 | Sufficient for rapid iteration |
| Build time per deployment | 45 minutes | Far exceeds typical Next.js build (5-10 min) |
| Projects | 200 | Only need 1 |
| Concurrent builds | 1 | Sequential builds acceptable for free tier |
| Fast Data Transfer | 100 GB/month | Adequate for small club site |
| Runtime logs retention | 1 hour | Limited, but sufficient for basic troubleshooting |

**Source:** [Vercel Limits Documentation](https://vercel.com/docs/limits)

**Installation:** Vercel CLI optional (not needed for GitHub integration workflow)
```bash
# Only needed for manual deployments (not recommended for this project)
npm install -g vercel
```

## Architecture Patterns

### Recommended Deployment Workflow
```
Board Member → Edit JSON in GitHub web editor (Phase 9 guide)
            ↓
         Create PR via GitHub web UI
            ↓
         GitHub Actions CI validates JSON (Phase 9)
            ↓ (if valid)
         Merge PR
            ↓
         Vercel auto-deploys to production (GitHub integration)
            ↓
         Site updates live at ofallonbombers.com
```

### Pattern 1: Vercel GitHub Integration (Auto-Deploy)
**What:** Connect GitHub repository to Vercel project, auto-deploy on every push to main
**When to use:** Always — standard pattern for GitHub + Vercel projects
**How it works:**
1. Import GitHub repository to Vercel (one-time setup)
2. Vercel detects Next.js, configures build automatically
3. Every push to main triggers production deployment
4. Every PR creates preview deployment with unique URL

**Configuration:** Zero configuration needed — Vercel auto-detects Next.js and sets optimal build settings

**Source:** [Vercel for GitHub Documentation](https://vercel.com/docs/git/vercel-for-github)

### Pattern 2: Preview Deployments for PRs
**What:** Every PR gets a unique, stable preview URL that updates with new commits
**When to use:** Recommended for this project — board members can preview content changes before merging
**Benefits:**
- Board members verify changes before going live
- Completely isolated from production
- Automatic — no configuration needed
- Free on Hobby tier

**How it works:**
1. Board member creates PR with content changes
2. Vercel automatically builds and deploys to unique URL (e.g., `ofallonbombers-git-update-schedule.vercel.app`)
3. Vercel bot comments on PR with preview URL
4. Board member clicks link, verifies changes
5. If good, merge PR → production deployment
6. If issues, push more commits to PR → preview URL updates automatically

**Source:** [Preview Deployments Features](https://vercel.com/docs/deployments/preview-deployments)

### Pattern 3: Instant Rollback via Dashboard
**What:** One-click rollback to any previous production deployment
**When to use:** When production deployment has issues (broken content, errors)
**Who can do it:** Only users with Vercel dashboard access (recommend: site owner only)

**Process:**
1. Site owner logs into Vercel dashboard
2. Click "Instant Rollback" on production deployment tile
3. Select previous good deployment
4. Confirm rollback → instant switch (no rebuild)
5. Vercel pauses auto-deployment (prevents new pushes from auto-deploying)
6. To restore auto-deployment: promote a deployment via "Undo Rollback"

**Free tier limitation:** Hobby users can only rollback to immediately previous deployment (Pro/Enterprise can rollback to any past deployment)

**Source:** [Performing an Instant Rollback](https://vercel.com/docs/instant-rollback)

### Pattern 4: Domain Configuration
**What:** Point custom domain to Vercel deployment
**Options:**
1. **A Record** (apex domain: ofallonbombers.com) → Point to Vercel IP: `76.76.21.21`
2. **CNAME** (subdomain: www.ofallonbombers.com) → Point to project-specific CNAME (e.g., `cname.vercel-dns.com`)

**Recommended:** Configure apex domain with A record, optionally add www subdomain (Vercel prompts for this)

**SSL:** Automatic via Vercel — provisions Let's Encrypt certificate within minutes of DNS propagation

**Source:** [Adding & Configuring a Custom Domain](https://vercel.com/docs/projects/domains/add-a-domain)

### GitHub Collaborator Access Pattern
**What:** Grant board members write access to repository via collaborator invitations
**Permissions:**
- Pull (read) repository contents
- Push (write) changes via web editor
- Create branches and PRs
- Merge PRs (if no branch protection)
- Manage issues

**Cannot do:** Change repository settings, add/remove collaborators, delete repository

**Setup:**
1. Repository owner navigates to Settings → Collaborators
2. Invite each board member by GitHub username or email
3. Board member accepts invitation
4. Board member can now edit JSON via web editor (Phase 9 workflow)

**Important:** Collaborators on personal repositories have full write access — no read-only option. For more granular control, would need GitHub organization (overkill for this project).

**Source:** [Permission levels for a personal account repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/permission-levels-for-a-personal-account-repository)

### Anti-Patterns to Avoid
- **Manual deployments via CLI:** Board members should never need Vercel CLI — GitHub integration handles everything
- **Vercel dashboard access for board members:** Unnecessary complexity — they interact through GitHub only
- **Branch protection requiring reviews:** Would bottleneck non-technical users; CI validation from Phase 9 catches errors
- **Separate staging environment:** Preview deployments per PR serve this purpose — no need for dedicated staging
- **Environment variables for API keys:** Web3Forms key is public-facing (appears in form HTML anyway) — hardcoding is simpler

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Deployment automation | Custom CI/CD pipeline with manual deploy scripts | Vercel GitHub Integration | Zero-config, automatic, handles builds/caching/SSL/rollback |
| SSL certificate management | Manual Let's Encrypt setup, cert renewal scripts | Vercel automatic SSL | Provisions and renews certificates automatically |
| Preview environments | Separate staging server, manual staging deploys | Vercel preview deployments | Automatic per-PR previews with unique URLs, free |
| Rollback mechanism | Git revert + manual redeploy workflow | Vercel Instant Rollback | One-click dashboard rollback, no rebuild needed |
| Build caching | Custom build cache storage and invalidation logic | Vercel automatic build cache | Intelligent caching of dependencies and build outputs |
| DNS management | Complex DDNS scripts or manual DNS updates | Simple A/CNAME record updates | Vercel provides static IP and CNAME targets |

**Key insight:** Vercel abstracts away deployment complexity — every "don't hand-roll" item here is a multi-day engineering project if done manually. For non-technical board member maintenance, Vercel's zero-config approach is essential.

## Common Pitfalls

### Pitfall 1: DNS Propagation Time Confusion
**What goes wrong:** Board member or site owner updates DNS records in domain registrar, immediately checks domain, site doesn't load, assumes configuration is wrong, starts changing records repeatedly
**Why it happens:** DNS changes take 5 minutes to 48 hours to propagate globally (typically 1-4 hours)
**How to avoid:**
- Operations guide must explain DNS propagation delay upfront
- Provide command to check DNS status: `nslookup ofallonbombers.com` (shows current DNS resolution)
- Vercel dashboard shows domain verification status — wait for green checkmark before troubleshooting
**Warning signs:** "I updated DNS but site still shows old host" within first 24 hours

### Pitfall 2: Rollback Disables Auto-Deployment
**What goes wrong:** Site owner performs instant rollback to fix a bad deployment, problem is fixed, but later PRs merged to main don't deploy automatically — site appears "stuck"
**Why it happens:** Vercel disables auto-assignment of production domains after rollback to prevent immediately re-deploying the broken commit
**How to avoid:**
- Operations guide must explain rollback side effect clearly
- After fixing the underlying issue (bad JSON, etc.), must "Undo Rollback" to re-enable auto-deployment
- Alternative: manually promote a deployment via dashboard (also re-enables auto-deployment)
**Warning signs:** "I merged a PR but the site didn't update"

**Source:** [Undo a rollback section](https://vercel.com/docs/instant-rollback#undo-a-rollback)

### Pitfall 3: Hobby Tier Rollback Limitation
**What goes wrong:** Site owner needs to rollback 2-3 deployments ago, but Vercel only allows rollback to immediately previous deployment on free tier
**Why it happens:** Hobby plan restriction — only Pro/Enterprise can rollback to any eligible deployment
**How to avoid:**
- Operations guide should document this limitation
- Workaround: Redeploy a specific past commit manually via Vercel dashboard (Deployments tab → select old deployment → click "..." → Redeploy)
- Alternative: Fix forward by merging a revert PR in GitHub
**Warning signs:** "I need to rollback further but can't select older deployments"

**Source:** [Instant Rollback plan limitations](https://vercel.com/docs/instant-rollback#who-can-roll-back-deployments)

### Pitfall 4: Overwriting JerseyWatch DNS Without Backup
**What goes wrong:** Site owner updates DNS records to point to Vercel, old JerseyWatch site becomes inaccessible, realizes later they needed to preserve specific JerseyWatch content or redirects
**Why it happens:** DNS changes are destructive — once you repoint the domain, old host is no longer accessible via that domain
**How to avoid:**
- BEFORE changing DNS: document current DNS records (A, CNAME, MX, TXT)
- BEFORE changing DNS: screenshot old site or save important content
- BEFORE changing DNS: decide if any old URLs need redirects (user decided to skip this unless high-traffic pages exist)
**Warning signs:** "Can we get back to the old JerseyWatch site?" after DNS change

### Pitfall 5: GitHub Collaborator Confusion
**What goes wrong:** Board member accepts GitHub collaborator invitation but can't find the repository or doesn't understand how to navigate to web editor
**Why it happens:** GitHub onboarding for non-technical users is minimal — no guided workflow
**How to avoid:**
- Operations guide includes GitHub basics: how to find the repository from notification email, how to navigate to data files, how to access web editor
- Consider creating a bookmarked link directly to the data directory for board members
- Phase 9's Content Update Guide already covers JSON editing workflow — operations guide should link to it
**Warning signs:** "I got a GitHub invite but I don't know what to do next"

### Pitfall 6: Preview Deployment URL Confusion
**What goes wrong:** Board member creates PR, Vercel bot comments with preview URL, board member clicks it, sees changes, thinks the production site has updated, merges PR, tells users to check the site, but users see old content because they're visiting the preview URL
**Why it happens:** Vercel preview URLs look similar to production URLs (both `*.vercel.app` domains)
**How to avoid:**
- Operations guide must clearly explain preview vs production URLs
- Preview URL pattern: `ofallonbombers-git-<branch-name>.vercel.app`
- Production URL: `ofallonbombers.com` (custom domain)
- Instruct board members: "Preview URL is for checking changes before merging — only YOU see it. Production site updates AFTER merging PR."
**Warning signs:** "I updated the schedule but parents are saying they don't see it" (checked preview URL instead of production)

### Pitfall 7: Build Failures Not Noticed
**What goes wrong:** Board member merges PR, Vercel starts build, build fails (e.g., JSON syntax error that CI missed, or CI was skipped), production site doesn't update, board member doesn't realize anything is wrong
**Why it happens:** Build failures are visible in Vercel dashboard and GitHub commit status, but board members aren't checking these
**How to avoid:**
- Configure GitHub integration to send notifications on failed builds (Vercel can comment on PR/commit)
- Operations guide: "After merging PR, wait 2-3 minutes, then check production site to verify changes went live"
- Site owner should monitor Vercel dashboard for failed builds
**Warning signs:** "I merged the PR but the site hasn't updated after 10 minutes"

## Code Examples

Verified patterns from official sources:

### Vercel Project Import (One-Time Setup)
```bash
# Via Vercel Dashboard (recommended for non-developers):
# 1. Log into vercel.com
# 2. Click "Add New..." → Project
# 3. Import Git Repository → Select GitHub → Authorize Vercel → Select repo
# 4. Vercel auto-detects Next.js → Click "Deploy"
# 5. First deployment completes → Project created

# Via CLI (alternative for developers):
vercel --prod
# Vercel prompts to link to existing project or create new one
# Auto-detects Next.js configuration
# Deploys to production
```

**Source:** [Deploying a Git repository](https://vercel.com/docs/git#deploying-a-git-repository)

### Adding Custom Domain (Dashboard)
```
# Via Vercel Dashboard:
# 1. Select project → Settings → Domains
# 2. Click "Add Domain"
# 3. Enter: ofallonbombers.com
# 4. Vercel prompts: "Add www.ofallonbombers.com?" (recommended: Yes)
# 5. Vercel displays DNS configuration:

For apex domain (ofallonbombers.com):
  Type: A
  Name: @ (or leave blank)
  Value: 76.76.21.21

For www subdomain (www.ofallonbombers.com):
  Type: CNAME
  Name: www
  Value: cname.vercel-dns.com (project-specific, shown in dashboard)

# 6. Add these records to DNS provider (domain registrar)
# 7. Wait for DNS propagation (5 min - 48 hrs, typically 1-4 hrs)
# 8. Vercel verifies domain → Status changes to "Valid Configuration"
# 9. SSL certificate auto-provisions within minutes
```

**Source:** [Adding & Configuring a Custom Domain](https://vercel.com/docs/projects/domains/add-a-domain)

### Checking Deployment Status (Dashboard)
```
# Board member workflow (no dashboard access):
# 1. Merge PR in GitHub
# 2. Wait 2-3 minutes for build to complete
# 3. Visit https://ofallonbombers.com (production site)
# 4. Verify changes are live

# Site owner workflow (dashboard access):
# 1. Log into Vercel dashboard
# 2. Select project → Deployments tab
# 3. See list of all deployments with status:
#    - "Building" (in progress)
#    - "Ready" (successful)
#    - "Error" (failed)
# 4. Click deployment → View build logs if needed
```

### Performing Instant Rollback (Dashboard Only)
```
# Site owner only (requires Vercel dashboard access):
# 1. Log into Vercel dashboard
# 2. Select project → Overview tab
# 3. Production deployment tile shows current deployment
# 4. Click "Instant Rollback" button
# 5. Dialog shows:
#    - Current production deployment
#    - Previous deployment (Hobby tier: only 1 option)
# 6. Select previous deployment → Click "Continue"
# 7. Review domains being rolled back → Click "Confirm Rollback"
# 8. Rollback completes instantly (no rebuild)
# 9. Production site now serves previous deployment
# 10. IMPORTANT: Auto-deployment is now DISABLED
# 11. To restore auto-deployment:
#     - Click "Undo Rollback" button
#     - Select deployment to promote
#     - Click "Confirm"
#     - Auto-deployment re-enabled
```

**Source:** [Instant Rollback Documentation](https://vercel.com/docs/instant-rollback)

### Adding GitHub Collaborators (Repository Owner)
```
# Via GitHub web interface:
# 1. Navigate to repository: https://github.com/<owner>/ofallonbombers
# 2. Click "Settings" tab (requires owner/admin permissions)
# 3. Sidebar: Click "Collaborators and teams"
# 4. Click "Add people" button
# 5. Enter board member's GitHub username or email
# 6. Click "Add <username> to this repository"
# 7. Board member receives email invitation
# 8. Board member clicks "Accept invitation" in email
# 9. Board member now has write access to repository

# Verify access:
# 1. Settings → Collaborators → See list of all collaborators
# 2. Board member should appear with "Write" role
```

**Source:** [Managing teams and people with access to your repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-teams-and-people-with-access-to-your-repository)

### Checking DNS Propagation Status
```bash
# Check if DNS has propagated (run from any terminal):
nslookup ofallonbombers.com

# Expected output BEFORE DNS change (still pointing to JerseyWatch):
# Server: <your DNS server>
# Address: <DNS server IP>
# Name: ofallonbombers.com
# Address: <JerseyWatch IP>

# Expected output AFTER DNS change (pointing to Vercel):
# Server: <your DNS server>
# Address: <DNS server IP>
# Name: ofallonbombers.com
# Address: 76.76.21.21

# Alternative: Use online DNS checker
# Visit: https://dnschecker.org
# Enter: ofallonbombers.com
# See propagation status globally
```

### Preview Deployment Workflow Example
```
# Board member workflow:
# 1. Create branch and make changes in GitHub web editor (Phase 9 guide)
# 2. Create pull request via GitHub web UI
# 3. GitHub Actions CI runs validation (Phase 9)
# 4. Vercel bot comments on PR within 1-2 minutes:

   "✅ Preview deployment ready!

   Visit: https://ofallonbombers-git-update-schedule-<team>.vercel.app

   Inspect: https://vercel.com/<team>/ofallonbombers/<deployment-id>

   View logs: https://vercel.com/<team>/ofallonbombers/deployments/<deployment-id>"

# 5. Board member clicks "Visit" link → Preview site loads
# 6. Board member verifies changes look correct
# 7. If good: Merge PR → Production deploys automatically
# 8. If bad: Push more commits to PR → Preview URL updates automatically
```

**Source:** [Preview Deployments](https://vercel.com/docs/deployments/preview-deployments)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual FTP uploads | Git-based deployment (Vercel GitHub integration) | ~2020 | Automatic deployments on push, no manual file transfers |
| Separate staging servers | Per-PR preview deployments | ~2021 | Every PR gets isolated environment, no dedicated staging server |
| Manual SSL certificate renewal | Automatic SSL (Let's Encrypt via Vercel) | ~2019 | Zero maintenance, auto-renewal |
| Build server configuration | Zero-config framework detection | ~2020 | Vercel auto-detects Next.js, no build config needed |
| Manual rollback (git revert + rebuild) | Instant rollback via dashboard | ~2023 | One-click rollback without rebuild |
| Environment variable management | Hardcoded config for public values | Ongoing | Simpler for non-technical maintainers when appropriate (Web3Forms key is public) |

**Deprecated/outdated:**
- **Manual deployment workflows:** Vercel GitHub integration replaces all manual deploy scripts, FTP, SSH-based deployments
- **Self-hosted staging environments:** Preview deployments replace need for separate staging server/domain
- **Manual SSL certificate management:** Let's Encrypt automation via Vercel eliminates manual cert setup/renewal
- **Build configuration files for simple Next.js projects:** Vercel auto-detection replaces need for custom build scripts in most cases

## Open Questions

1. **Q: Should we configure redirects from old JerseyWatch URLs to new site?**
   - What we know: User decided to skip this unless high-traffic pages exist (effort vs benefit)
   - What's unclear: Which JerseyWatch pages (if any) receive significant external traffic (backlinks, bookmarks)
   - Recommendation: Deploy new site first, monitor Vercel analytics for 404s, add redirects if specific old URLs show up frequently. If needed, use `vercel.json` redirects configuration.

2. **Q: Should repository be public or private?**
   - What we know: User left this to Claude's discretion; no secrets in code (Web3Forms key is public-facing)
   - What's unclear: Board preference for transparency vs privacy
   - Recommendation: **Public repository**
     - Simpler: No collaborator limit concerns, easier sharing
     - Free tier friendly: GitHub free tier has unlimited public repos
     - Transparent: Community can see club's tech stack (good PR)
     - No security risk: No secrets, no proprietary code
     - Easy to switch: Can make private later if needed (one click)

3. **Q: Should we enable branch protection on main?**
   - What we know: User recommends no required reviews (would bottleneck non-technical users); Phase 9 CI validation catches errors
   - What's unclear: Whether to enable ANY branch protection settings (prevent direct pushes, require CI to pass)
   - Recommendation: **Minimal branch protection**
     - Enable: "Require status checks to pass before merging" (Phase 9 CI must pass)
     - Enable: "Require branches to be up to date before merging" (prevents merge conflicts)
     - Disable: "Require pull request reviews before merging" (would bottleneck board)
     - Disable: "Require signed commits" (too complex for non-technical users)
     - Result: Board can merge their own PRs, but CI must pass first

4. **Q: Should all board members have Vercel dashboard access?**
   - What we know: User recommends just the site owner for simplicity
   - What's unclear: Whether any board members need visibility into deployment status
   - Recommendation: **Site owner only**
     - Board members interact through GitHub exclusively (simpler mental model)
     - Site owner handles Vercel-specific tasks (rollback, domain config, troubleshooting)
     - Fewer accounts = less security risk, less onboarding
     - Board members can see deployment status via GitHub commit checks (Vercel updates commit status)

5. **Q: What format should the operations guide use?**
   - What we know: User recommends markdown in repo (always in sync, accessible via GitHub)
   - What's unclear: File location, structure, whether to include screenshots
   - Recommendation: **Markdown in repo root: `OPERATIONS_GUIDE.md`**
     - Location: Root directory (visible immediately when visiting repo)
     - Format: GitHub Flavored Markdown with screenshots (use GitHub's image hosting via web interface)
     - Structure: Clear sections with step-by-step numbered lists
     - Link from README.md for discoverability
     - Version controlled alongside code (updates tracked in git history)

## Sources

### Primary (HIGH confidence)
- [Vercel Deployments Overview](https://vercel.com/docs/deployments/overview) - Auto-deploy on push, deployment methods
- [Vercel for GitHub](https://vercel.com/docs/git/vercel-for-github) - GitHub integration, preview deployments, system environment variables
- [Adding & Configuring a Custom Domain](https://vercel.com/docs/projects/domains/add-a-domain) - DNS configuration, SSL setup
- [Performing an Instant Rollback](https://vercel.com/docs/instant-rollback) - Rollback process, limitations, undo rollback
- [Vercel Limits](https://vercel.com/docs/limits) - Hobby tier limits, deployment quotas, domain limits
- [Managing Deployments](https://vercel.com/docs/deployments/managing-deployments) - Redeploying, filtering, deleting deployments
- [Preview Deployments Features](https://vercel.com/docs/deployments/preview-deployments) - PR preview configuration
- [GitHub Permission levels for personal account repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/permission-levels-for-a-personal-account-repository) - Collaborator permissions
- [Managing teams and people with access to your repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-teams-and-people-with-access-to-your-repository) - Adding collaborators
- [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) - Branch protection rules
- [Basic writing and formatting syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) - GitHub Flavored Markdown

### Secondary (MEDIUM confidence)
- [Instant Rollback is now generally available](https://vercel.com/changelog/instant-rollback-is-now-available-to-revert-deployments) - Rollback feature announcement
- [Vercel Hobby Plan](https://vercel.com/docs/plans/hobby) - Free tier details (verified with Limits doc)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs) - Next.js deployment configuration
- [10 Essential Technical Documentation Best Practices for 2026](https://www.documind.chat/blog/technical-documentation-best-practices) - Non-technical user documentation guidance
- [Creating technical documentation for non-technical people](https://www.theengineroom.org/library/creating-technical-documentation-for-non-technical-people-tips-from-our-team/) - Simplification strategies
- [Escalation management: Best practices](https://www.zendesk.com/blog/escalation-management/) - Escalation path structure
- [Escalation policies for effective incident management](https://www.atlassian.com/incident-management/on-call/escalation-policies) - Hierarchical escalation patterns

### Tertiary (LOW confidence)
- Various WebSearch results for Vercel team member permissions (no definitive documentation found for GitHub-only access pattern) - Verified through GitHub collaborator docs instead
- WebSearch results for markdown best practices - Cross-referenced with official GitHub docs

## Metadata

**Confidence breakdown:**
- Vercel deployment workflow: **HIGH** - Official Vercel documentation, verified with multiple sources
- DNS configuration: **HIGH** - Official Vercel documentation, standard DNS practices
- GitHub permissions: **HIGH** - Official GitHub documentation
- Free tier limits: **HIGH** - Official Vercel limits documentation
- Instant rollback: **HIGH** - Official Vercel documentation with changelog confirmation
- Documentation best practices: **MEDIUM** - Multiple sources with consistent guidance, but not framework-specific
- Board member workflow: **MEDIUM** - Synthesized from multiple sources, needs validation with actual non-technical users

**Research date:** 2026-02-17
**Valid until:** 30 days (stable platform — Vercel core features change infrequently)

**Notes:**
- Vercel's zero-config approach aligns perfectly with non-technical board member requirement
- Primary risk is documentation clarity for non-technical users — consider user testing the operations guide
- Free tier limits are generous for a small club site — no anticipated scaling issues
- GitHub collaborator access is simpler than Vercel team member management — correct choice for this use case
