---
phase: 10-deployment-documentation
plan: 01
subsystem: documentation
tags: [operations, deployment, vercel, dns, troubleshooting, documentation]

dependency_graph:
  requires:
    - 09-03-PLAN.md (Content Update Guide referenced)
  provides:
    - Operations documentation for deployment and troubleshooting
    - Project README as repository landing page
  affects:
    - Board member onboarding for site operations
    - Site owner deployment workflow

tech_stack:
  added: []
  patterns:
    - Tiered escalation path for support
    - Placeholder pattern for contact information
    - Cross-referencing between documentation guides
    - Section-based troubleshooting organization

key_files:
  created:
    - docs/OPERATIONS_GUIDE.md (714 lines)
  modified:
    - README.md (90 lines, replaced default create-next-app content)

decisions:
  - Public repository recommendation for simpler setup and free tier compatibility
  - Instant rollback as primary method (site owner only, free tier limitation)
  - Fix-forward as secondary rollback method (available to all board members)
  - Tiered escalation: self-help → site owner → technical contact → emergency phone
  - Placeholder pattern for contact info ([SITE_OWNER_NAME], [TECHNICAL_CONTACT], etc.)
  - Screenshot placeholders for future visual documentation
  - DNS propagation timeline: 5 min to 48 hours (typically 1-4 hours)
  - 7 troubleshooting scenarios covering common issues

metrics:
  duration: 4 minutes
  completed: 2026-02-17
---

# Phase 10 Plan 01: Operations Guide & README Summary

**One-liner:** Comprehensive operations documentation covering Vercel deployment setup, DNS configuration, preview deployments, three rollback methods, and seven troubleshooting scenarios with tiered escalation path.

## What Was Built

### 1. Operations Guide (docs/OPERATIONS_GUIDE.md)

Created a 714-line comprehensive operations guide for non-technical board members covering all aspects of site deployment and operations (except JSON content editing, which is in the Content Update Guide).

**Structure:**
1. **Welcome** — Scope, audience, cross-reference to Content Update Guide
2. **How the Website Works** — High-level deployment pipeline with visual flow
3. **Initial Deployment Setup** — One-time Vercel and domain configuration
   - Create Vercel account and import repository
   - Add custom domain (ofallonbombers.com + www)
   - Update DNS records (A record to 76.76.21.21, CNAME to cname.vercel-dns.com)
   - Wait for DNS propagation (5 min to 48 hours)
   - Automatic SSL certificate provisioning
   - Add board members as GitHub collaborators
4. **Checking Deployment Status** — For board members (GitHub checks) and site owner (Vercel dashboard)
5. **Preview Deployments** — How PRs get preview URLs, workflow for verifying before merge
6. **Rollback** — Three methods with detailed procedures:
   - Method 1: Instant Rollback (site owner, Vercel dashboard, free tier limitation)
   - Method 2: Fix Forward (any board member, create corrective PR)
   - Method 3: Redeploy Specific Commit (site owner, for deeper rollbacks)
7. **Troubleshooting** — Seven common scenarios with step-by-step fixes:
   - A. Site hasn't updated after merge
   - B. Error page showing
   - C. DNS changed but still shows old content
   - D. Can't find repository in GitHub
   - E. Build failing after changes
   - F. Need to rollback further than one deployment
   - G. Site completely down
8. **Who to Contact** — Tiered escalation path:
   - Level 1: Self-help (this guide)
   - Level 2: Site owner ([SITE_OWNER_NAME], [SITE_OWNER_EMAIL])
   - Level 3: Technical contact ([TECHNICAL_CONTACT], [TECHNICAL_CONTACT_EMAIL], [TECHNICAL_CONTACT_PHONE])
   - Level 4: Emergency (call technical contact directly)
9. **Quick Reference** — Summary table of common tasks with who can do them
10. **Additional Resources** — Links to Vercel/GitHub docs, DNS tools

**Writing style:**
- Plain language, no jargon (matches Content Update Guide tone)
- Numbered steps for all procedures
- Bold for UI elements ("Click **Deploy**")
- WARNING callouts for destructive operations (DNS changes, rollback implications)
- Consistent placeholder pattern ([SITE_OWNER_NAME], [TECHNICAL_CONTACT], etc.)
- Screenshot placeholders for future visual documentation

### 2. Updated README (README.md)

Replaced default create-next-app README with project-specific content serving as repository landing page.

**Structure:**
- **Project description** — O'Fallon Bombers website overview
- **For Board Members** — Prominent section linking to both guides
- **Tech stack** — Next.js 16, Tailwind v4, TypeScript, Zod, Vercel
- **Development** — Install, dev, build, validate commands
- **Project structure** — Key directories with explanations
- **Content workflow** — 6-step validation-first workflow summary
- **Key features** — SSG, type-safety, responsive, accessible, zero runtime deps
- **Deployment** — Auto-deploy configuration and custom domain note
- **License** — Copyright notice

**Dual audience:**
- Board members: directed to guides in prominent section
- Developers: tech stack, dev commands, project structure

## Deviations from Plan

None — plan executed exactly as written.

## Decisions Made

1. **Public repository recommendation** — Documented in setup guide as recommended approach (no secrets in code, simpler, free tier friendly)

2. **Instant rollback as primary method** — Fastest option (seconds), but documented free tier limitation (only to immediately previous deployment) with workarounds

3. **Fix-forward as secondary rollback** — Emphasized as alternative available to all board members without Vercel access

4. **Tiered escalation path** — Four levels (self-help → site owner → technical contact → emergency) prevents over-escalation

5. **Placeholder pattern consistency** — [SITE_OWNER_NAME], [SITE_OWNER_EMAIL], [TECHNICAL_CONTACT], [TECHNICAL_CONTACT_EMAIL], [TECHNICAL_CONTACT_PHONE] used throughout

6. **Screenshot placeholders** — [SCREENSHOT: description] pattern allows guide to be complete now, visuals added later

7. **DNS propagation timeline** — Set expectation of 5 min to 48 hours (typically 1-4 hours) to prevent panic

8. **7 troubleshooting scenarios** — Covered most common issues board members will encounter based on typical non-technical user workflows

## Key Technical Details

**Vercel Configuration:**
- A record: 76.76.21.21 (apex domain)
- CNAME: cname.vercel-dns.com (www subdomain)
- Auto-deploy enabled on main branch
- Preview deployments on all PRs
- Instant rollback available (with free tier limitation)

**Deployment Timeline:**
- Preview deployment: 2-3 minutes after PR creation
- Production deployment: 2-3 minutes after merge to main
- DNS propagation: 5 minutes to 48 hours (typically 1-4 hours)
- SSL provisioning: minutes after DNS verification

**Rollback Options:**
1. Instant Rollback (Vercel): seconds, one deployment back only
2. Fix Forward (GitHub): 2-3 minutes (new PR + build), unlimited
3. Redeploy Commit (Vercel): 2-3 minutes (rebuild), any commit

**Access Levels:**
- Site owner: Vercel dashboard + GitHub admin
- Board members: GitHub write access (edit, PR, merge)

## Cross-References

**Operations Guide links to:**
- docs/CONTENT-UPDATE-GUIDE.md (3 references for JSON editing procedures)

**README.md links to:**
- docs/CONTENT-UPDATE-GUIDE.md (2 references)
- docs/OPERATIONS_GUIDE.md (2 references)

**Pattern:** Operations Guide focuses on deployment/infrastructure, defers all JSON editing to Content Update Guide. README directs users to appropriate guide based on task.

## Documentation Coverage

**Operations Guide covers:**
- ✅ Vercel account creation and project import
- ✅ Custom domain configuration (ofallonbombers.com)
- ✅ DNS record updates with registrar
- ✅ DNS propagation timeline and verification
- ✅ SSL certificate provisioning
- ✅ GitHub collaborator management
- ✅ Deployment status checking (board member and site owner methods)
- ✅ Preview deployment workflow
- ✅ Three rollback methods with limitations
- ✅ Seven troubleshooting scenarios
- ✅ Tiered escalation path
- ✅ Quick reference table

**Operations Guide explicitly does NOT cover:**
- ❌ JSON editing (deferred to Content Update Guide)
- ❌ Code changes (not in scope for board members)
- ❌ Advanced git operations (not needed for content workflow)

**README.md provides:**
- ✅ Project overview for repository visitors
- ✅ Clear navigation to documentation guides
- ✅ Tech stack for developers
- ✅ Development setup commands
- ✅ Content workflow summary

## Verification Results

All verification criteria met:

1. ✅ docs/OPERATIONS_GUIDE.md exists with **714 lines** (required: 300+)
2. ✅ README.md is project-specific with **90 lines** (required: 30+)
3. ✅ Operations guide covers:
   - Initial Deployment Setup (section 3)
   - Custom Domain (section 3B)
   - Rollback procedures (section 6, three methods)
   - Troubleshooting (section 7, seven scenarios)
   - Escalation path (section 8, four levels)
4. ✅ Cross-references to Content Update Guide (3 mentions)
5. ✅ Consistent placeholder pattern (10 instances of TECHNICAL_CONTACT/SITE_OWNER)
6. ✅ README links to both guides (4 links total)

## Board Member Impact

**Site owner benefits:**
- Step-by-step setup guide for one-time Vercel and domain configuration
- Clear rollback procedures for when changes go wrong
- Quick reference for common operations tasks

**Board member benefits:**
- Understanding of how deployment pipeline works (no manual steps needed)
- How to check deployment status without Vercel access
- Preview deployment workflow for safe testing
- Troubleshooting guide for self-service problem resolution
- Clear escalation path when help is needed

**Documentation completeness:**
- Phase 9 (Content Update Guide): covers JSON editing for content changes
- Phase 10 (Operations Guide): covers deployment, domain, troubleshooting
- README: navigates users to appropriate guide

Board members now have complete documentation for both content editing and operational concerns.

## Files Created/Modified

**Created:**
- `docs/OPERATIONS_GUIDE.md` (714 lines)

**Modified:**
- `README.md` (90 lines, replaced default content)

## Commits

- `6325f19`: docs(10-01): create Operations Guide for deployment and troubleshooting
- `9757080`: docs(10-01): update README with project info and guide links

## Self-Check

### File Existence

```bash
[ -f "docs/OPERATIONS_GUIDE.md" ] && echo "FOUND: docs/OPERATIONS_GUIDE.md" || echo "MISSING: docs/OPERATIONS_GUIDE.md"
```
**Result:** FOUND: docs/OPERATIONS_GUIDE.md

```bash
[ -f "README.md" ] && echo "FOUND: README.md" || echo "MISSING: README.md"
```
**Result:** FOUND: README.md

### Commit Verification

```bash
git log --oneline --all | grep -q "6325f19" && echo "FOUND: 6325f19" || echo "MISSING: 6325f19"
```
**Result:** FOUND: 6325f19

```bash
git log --oneline --all | grep -q "9757080" && echo "FOUND: 9757080" || echo "MISSING: 9757080"
```
**Result:** FOUND: 9757080

### Content Verification

Operations Guide line count:
```bash
wc -l docs/OPERATIONS_GUIDE.md
```
**Result:** 714 docs/OPERATIONS_GUIDE.md

README line count:
```bash
wc -l README.md
```
**Result:** 90 README.md

Cross-references present:
```bash
grep -c "CONTENT-UPDATE-GUIDE" docs/OPERATIONS_GUIDE.md
```
**Result:** 3

Documentation links in README:
```bash
grep -c "docs/CONTENT-UPDATE-GUIDE.md\|docs/OPERATIONS_GUIDE.md" README.md
```
**Result:** 4

## Self-Check: PASSED

All files created, all commits exist, all verification criteria met.
