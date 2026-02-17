# Bombers Baseball Operations Guide

**Last Updated:** February 2026
**For:** Site owner and board members managing deployment and site operations
**Technical Contact:** [TECHNICAL_CONTACT] — [TECHNICAL_CONTACT_EMAIL] — [TECHNICAL_CONTACT_PHONE]

---

## 1. Welcome / What This Guide Covers

This guide covers everything related to deploying, managing, and troubleshooting the Bombers Baseball website, including:

- How the automated deployment pipeline works
- Initial setup of hosting and custom domain
- Checking deployment status and preview links
- Rolling back when something goes wrong
- Troubleshooting common issues
- Who to contact for help

**This guide does NOT cover editing content** (rosters, events, fees, etc.). For content updates, see the [Content Update Guide](CONTENT-UPDATE-GUIDE.md).

### Who This Guide Is For

- **Site Owner:** The person responsible for the Vercel account, domain configuration, and overall site operations
- **Board Members:** Anyone who needs to understand how the site deploys and what to do when issues occur

You don't need coding experience, but this guide assumes you're comfortable with web browser tasks like logging into accounts and following step-by-step instructions.

---

## 2. How the Website Works (High-Level)

The Bombers website uses an **automated deployment pipeline** that takes changes from GitHub and publishes them to the live site automatically:

```
Step 1: Edit JSON files in GitHub
   ↓
Step 2: Create Pull Request (PR)
   ↓
Step 3: CI automatically validates the JSON
   ↓
Step 4: Review preview deployment
   ↓
Step 5: Merge PR to main branch
   ↓
Step 6: Vercel automatically deploys to production
   ↓
Step 7: Live site updates (2-3 minutes)
```

### Key Points

- **No manual deployment needed** — merging a pull request automatically updates the live site
- **Preview deployments** — every PR gets its own preview URL so you can check changes before they go live
- **Validation catches errors** — the CI system checks JSON files for errors before allowing merge
- **Fast updates** — changes go live 2-3 minutes after merging
- **Instant rollback** — site owner can revert to previous version in seconds if needed

### Production vs Preview URLs

- **Production URL** (live site): https://ofallonbombers.com
- **Preview URLs** (for testing): https://ofallonbombers-git-[branch-name].vercel.app

Preview URLs are temporary and automatically created for each pull request. They're for verification only — the production URL is what visitors see.

---

## 3. Initial Deployment Setup (Site Owner Only)

This section is for the **site owner** performing the **one-time setup** of hosting and the custom domain. Board members can skip to section 4.

### A. Create Vercel Account & Import Project

1. Go to https://vercel.com
2. Click **Sign Up** in the top right
3. Choose **Continue with GitHub** (recommended for seamless integration)
4. Authorize Vercel to access your GitHub account
5. Once logged in, click **Add New...** in the top right → **Project**
6. Click **Import Git Repository**
7. If you don't see the bombers repository:
   - Click **Adjust GitHub App Permissions**
   - Grant access to the repository
   - Return to Vercel and refresh
8. Find and select the **bombers** repository
9. Vercel auto-detects Next.js settings — **do NOT change** the default configuration:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: (auto-detected)
   - Output Directory: (auto-detected)
10. Click **Deploy**
11. Wait 2-3 minutes for the first deployment to complete
12. You'll see a success screen with a preview URL like `bombers.vercel.app`

[SCREENSHOT: Vercel import repository screen]

**Note:** This project uses a **public repository** (no secrets in code). This is recommended because:
- Simpler setup (no special permissions needed)
- Free tier friendly (Vercel free tier works great with public repos)
- Community/family can see the code if they want
- All sensitive data (contact form submissions, etc.) stays in third-party services

### B. Add Custom Domain

1. In the Vercel dashboard, select your **bombers** project
2. Click **Settings** in the top navigation
3. Click **Domains** in the left sidebar
4. Click **Add** or **Add Domain**
5. Enter: `ofallonbombers.com`
6. Click **Add**
7. Vercel will prompt you to also add `www.ofallonbombers.com` — click **Add** (recommended)
8. Vercel displays the DNS records you need to configure (keep this page open)

[SCREENSHOT: Vercel add domain screen showing DNS records]

You'll see two sets of records:

**For ofallonbombers.com (apex domain):**
- Type: **A**
- Name: **@** (or leave blank)
- Value: **76.76.21.21**

**For www.ofallonbombers.com (www subdomain):**
- Type: **CNAME**
- Name: **www**
- Value: **cname.vercel-dns.com**

**IMPORTANT:** Leave this Vercel page open — you'll need these values in the next step.

### C. Update DNS Records

**WARNING: You're about to change how your domain points to a website. Before making ANY changes, screenshot or write down your current DNS records as a backup.**

1. Log into your **domain registrar** (the service where you purchased ofallonbombers.com)
   - Common registrars: GoDaddy, Namecheap, Google Domains, Cloudflare
2. Navigate to **DNS Settings** or **DNS Management** for ofallonbombers.com
3. **CRITICAL BACKUP STEP:**
   - Take a screenshot of all current DNS records
   - Or copy them to a text file
   - This lets you restore if something goes wrong
4. Find any existing **A records** or **CNAME records** that point to JerseyWatch (the old site)
5. **Delete those old A and CNAME records** (but NOT MX or TXT records — see warning below)
6. **Add the new A record** for the apex domain:
   - Type: **A**
   - Name: **@** (or leave blank — exact field name varies by registrar)
   - Value: **76.76.21.21**
   - TTL: **Auto** or **3600** (1 hour)
7. **Add the new CNAME record** for www:
   - Type: **CNAME**
   - Name: **www**
   - Value: **cname.vercel-dns.com**
   - TTL: **Auto** or **3600**
8. **Save** or **Apply Changes**

[SCREENSHOT: Example DNS settings panel with A and CNAME records]

**CRITICAL WARNING: Do NOT touch MX records or TXT records.** These handle email and email security. If you delete them, email will break. Only modify A and CNAME records.

### D. Wait for DNS Propagation

DNS changes take time to spread across the internet:

- **Minimum:** 5 minutes
- **Typical:** 1-4 hours
- **Maximum:** 48 hours (rare)

**How to check progress:**

1. **In Vercel dashboard** (easiest):
   - Go to Settings → Domains
   - You'll see a status for each domain:
     - **Pending Verification** → DNS not propagated yet
     - **Valid Configuration** (green checkmark) → DNS is live!
2. **Using nslookup** (if you're comfortable with command line):
   - Open terminal or command prompt
   - Type: `nslookup ofallonbombers.com`
   - Look for the IP address — should be **76.76.21.21**
3. **Using online tools**:
   - Go to https://dnschecker.org
   - Enter `ofallonbombers.com`
   - See if DNS servers worldwide show the new IP

**What to do while waiting:**
- **Don't panic** — propagation taking several hours is normal
- **Don't keep changing DNS records** — this resets the propagation timer
- **Check back every 30-60 minutes** in the Vercel dashboard
- **Wait for green checkmark** in Vercel before testing the domain

### E. SSL Certificate (Automatic)

Once DNS propagation completes:

1. Vercel **automatically provisions** an SSL certificate (HTTPS)
2. This happens within **minutes** of DNS verification
3. You'll see **"SSL Active"** in Vercel Settings → Domains
4. Your site is now accessible at:
   - https://ofallonbombers.com (with HTTPS lock icon)
   - https://www.ofallonbombers.com

**No action needed** — Vercel handles SSL completely automatically and renews it before expiration.

### F. Add Board Members as GitHub Collaborators

After deployment is working, give board members access to edit content:

1. Go to the GitHub repository: https://github.com/[your-username]/bombers
2. Click **Settings** (in the repository navigation)
3. Click **Collaborators** in the left sidebar (under "Access")
4. You may need to confirm your GitHub password
5. Click **Add people**
6. Enter the board member's **GitHub username** or **email address**
7. Select the correct person from the dropdown
8. Click **Add [username] to this repository**
9. Board member receives an **invitation email**
10. They must **click the link in the email** to accept
11. Once accepted, they have **write access** (can edit files and merge PRs)

[SCREENSHOT: GitHub collaborators settings page]

**Repeat steps 5-11** for each board member who needs access.

**Access levels:**
- Board members get **Write** access (can edit content, create PRs, merge to main)
- Do NOT give **Admin** access unless they need to change repository settings

---

## 4. Checking Deployment Status

### For Board Members (No Vercel Access)

After you merge a pull request:

1. **Wait 2-3 minutes** for the build and deployment to complete
2. **Visit https://ofallonbombers.com** to verify your changes appear
3. **Check the GitHub commit** for build status:
   - Go to the repository → click **Commits** (or the commit message)
   - Look for a **green checkmark** ✅ = deployment succeeded
   - Look for a **red X** ❌ = deployment failed (see Troubleshooting)

[SCREENSHOT: GitHub commit with green checkmark]

**Hard refresh** if you don't see your changes:
- **Windows:** Ctrl + Shift + R
- **Mac:** Cmd + Shift + R

This clears your browser cache and loads the latest version.

### For Site Owner (With Vercel Dashboard Access)

You have more detailed visibility in Vercel:

1. Log into https://vercel.com
2. Click on the **bombers** project
3. Click **Deployments** tab
4. See all deployments with status:
   - **Building** → deployment in progress
   - **Ready** → deployment succeeded (live)
   - **Error** → deployment failed

[SCREENSHOT: Vercel deployments tab]

**To see build logs:**
1. Click any deployment in the list
2. Click **View Build Logs** or **Building** tab
3. See detailed output from the build process
4. Errors appear in red with file/line numbers

**Production vs Preview deployments:**
- Deployments from **main branch** → Production (live site)
- Deployments from **other branches** → Preview (temporary test URL)

---

## 5. Preview Deployments

Every pull request automatically gets a **preview deployment** — a temporary copy of the site with your changes.

### How Preview Deployments Work

1. Create a pull request with your content changes
2. Vercel automatically builds a preview version
3. **Vercel bot comments on the PR** with a preview link (within 2-3 minutes)
4. Click the link to see your changes in action
5. Preview URL looks like: `ofallonbombers-git-branch-name.vercel.app`

[SCREENSHOT: Vercel bot comment with preview link]

### Key Points

- **Preview is NOT the live site** — it's only for YOU to review
- **Live site is always** https://ofallonbombers.com
- **Preview updates** automatically when you push more changes to the PR
- **Preview is deleted** automatically after merging or closing the PR
- **Multiple people** can view the preview link — share it with others for review

### Preview Deployment Workflow

```
1. Create PR with roster change
   ↓
2. Wait 2-3 minutes for Vercel bot comment
   ↓
3. Click preview link
   ↓
4. Verify roster looks correct on preview site
   ↓
5. If good → merge PR → changes go to production
   ↓
6. If issues → push fixes → preview auto-updates
```

**Best practice:** Always check the preview before merging. Catch issues before they go live.

---

## 6. Rollback (When Something Goes Wrong)

If a bad change makes it to the live site, you can revert it quickly.

### Method 1: Instant Rollback (Site Owner Only)

**Fastest option** — revert to previous version in seconds (no rebuild needed).

1. Log into Vercel dashboard
2. Select the **bombers** project
3. Look at the **Production Deployment** tile (top of screen)
4. Click **Options Menu** (three dots) on the current production deployment
5. Click **Instant Rollback**
6. Vercel shows the **previous deployment** (what you're rolling back to)
7. Review the timestamp and commit message
8. Click **Rollback** to confirm
9. Site **immediately reverts** (no build time)

[SCREENSHOT: Vercel instant rollback dialog]

**IMPORTANT: After rollback, automatic deployments are DISABLED.**

- This prevents the bad deployment from auto-deploying again
- To re-enable auto-deployments:
  - Fix the issue in GitHub (merge a corrected PR)
  - OR: Go to Vercel → Deployments → click **Undo Rollback**

**Free tier limitation:**
- Can only rollback to **immediately previous deployment**
- Cannot rollback to deployments older than one version
- For deeper rollbacks, use Method 2 or redeploy a specific commit

### Method 2: Fix Forward with GitHub (Any Board Member)

**Slower but available to everyone** — create a new PR that fixes the issue.

1. **Option A: Revert the bad change**
   - Find the bad PR in GitHub
   - Create a new PR that removes/reverts the bad JSON change
   - Or: restore the old values from git history
2. **Option B: Fix the problem**
   - Create a new PR with the corrected JSON
   - Fix the typo, wrong value, etc.
3. Merge the fix PR
4. Wait 2-3 minutes for auto-deployment
5. Verify fix on https://ofallonbombers.com

**When to use Method 2:**
- You don't have Vercel dashboard access
- The issue is easy to fix (just fix it forward instead of rolling back)
- You want to rollback more than one deployment (free tier limitation)

### Method 3: Redeploy Specific Commit (Site Owner)

**For deeper rollbacks** beyond the immediately previous deployment.

1. Log into Vercel dashboard
2. Select **bombers** project → **Deployments** tab
3. Find the **good deployment** (before the problem started)
4. Click on it to view details
5. Click **Redeploy** button
6. Confirm
7. Vercel rebuilds from that old commit
8. Takes 2-3 minutes (same as normal deployment)

**Note:** This does NOT change the git history — it just rebuilds the site from an older commit. You should still fix the bad code in GitHub afterward.

---

## 7. Troubleshooting

### A. "I merged a PR but the site hasn't updated"

**Likely causes:**
1. **Normal build time** — wait 2-3 minutes
2. **Browser cache** — do a hard refresh:
   - Windows: Ctrl + Shift + R
   - Mac: Cmd + Shift + R
3. **Build failed** — check for red X on the commit in GitHub
4. **Auto-deploy disabled** — if rollback was done previously, auto-deploy may be off

**Steps to diagnose:**
1. Check the commit in GitHub:
   - Green checkmark ✅ → build succeeded, deployment worked
   - Red X ❌ → build failed (see troubleshooting B)
   - Yellow dot 🟡 → still building (wait)
2. If green checkmark but no update:
   - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - Check a different browser or device
   - Check Vercel dashboard (site owner) for deployment status
3. If rollback was done recently:
   - Site owner: Check Vercel for "Auto-deployments disabled"
   - Click **Undo Rollback** to re-enable

**If still not working after 10 minutes with green checkmark:**
- Contact site owner if you're a board member
- Site owner: check Vercel deployment logs for errors

### B. "The site is showing an error page"

**Immediate action:**
- **Don't panic** — site owner can rollback in seconds (see section 6)
- **Contact site owner** immediately for rollback

**After rollback:**
1. Identify the bad change:
   - Look at recent merged PRs
   - Check what was changed in the JSON files
2. Fix the issue:
   - Correct the bad data
   - Test on a preview deployment first
3. Merge the fix:
   - New PR with corrected data
   - Verify on preview before merging

**Common causes:**
- Invalid JSON (missing comma, extra bracket)
- Required field left empty
- Wrong data type (number instead of string)
- Broken image path

These are usually caught by validation, but edge cases can slip through.

### C. "DNS was changed but site still shows old content"

**This is normal** — DNS propagation takes time.

**Timeline:**
- Minimum: 5 minutes
- Typical: 1-4 hours
- Maximum: 48 hours (rare)

**What to do:**
1. **Wait patiently** — don't keep changing DNS records (this resets the timer)
2. **Check propagation status:**
   - Vercel dashboard: Settings → Domains → look for green checkmark
   - nslookup: `nslookup ofallonbombers.com` → should show 76.76.21.21
   - Online tool: https://dnschecker.org → enter ofallonbombers.com
3. **Check every 30-60 minutes** — it will eventually propagate
4. **Once Vercel shows green checkmark** → DNS is live, site should work

**If still showing old content after 48 hours:**
- Double-check DNS records in your registrar match Vercel's instructions exactly
- Check for typos in the values (especially CNAME value: cname.vercel-dns.com)
- Contact domain registrar support (might be an issue on their end)
- Contact Vercel support (might be a verification issue)

### D. "I can't find the repository in GitHub"

**Likely cause:** You haven't accepted the collaborator invitation yet.

**Steps:**
1. Check your email (the one linked to your GitHub account)
2. Look for invitation email from GitHub with subject like "You've been invited to collaborate on bombers"
3. Click **View Invitation** in the email
4. Click **Accept Invitation** on the GitHub page
5. Bookmark the repository URL: https://github.com/[repo-owner]/bombers

**If invitation expired:**
- Contact the site owner to re-send the invitation
- They can do this from GitHub Settings → Collaborators → click the expired invitation and resend

**If you accepted but still can't see it:**
- Log out of GitHub and log back in
- Go directly to the repository URL
- Make sure you're logged into the correct GitHub account

### E. "Build is failing after my changes"

**This means the CI validation caught an error in your JSON.**

**Steps:**
1. Go to your pull request in GitHub
2. Look for the red X next to the commit
3. Click **Details** next to the failed check
4. Read the error message — it tells you what's wrong:
   - File with the error (e.g., "src/lib/data/teams.ts")
   - Type of error (e.g., "Required field missing: name")
   - Line/position of the error
5. Fix the error in GitHub web editor (edit the JSON file)
6. Commit the fix to the same PR branch
7. CI automatically re-runs validation
8. Look for green checkmark — validation passed

**Common JSON errors:**
- **Missing comma** → add comma between items
- **Extra comma** → remove trailing comma after last item
- **Missing quote** → add closing quote
- **Missing bracket** → add closing ] or }
- **Wrong field name** → check spelling matches schema
- **Wrong value type** → check if field needs string vs number

**Detailed help:** See the [Content Update Guide](CONTENT-UPDATE-GUIDE.md) Troubleshooting section for JSON fix instructions.

### F. "I need to rollback further than one deployment"

**Free tier limitation:** Instant Rollback only goes back one deployment.

**Workarounds:**

1. **Fix forward** (recommended):
   - Create a new PR with the corrected data
   - Merge it to deploy the fix
   - Faster and cleaner than deep rollback

2. **Redeploy specific commit:**
   - Site owner logs into Vercel
   - Go to Deployments tab
   - Find the good deployment (before problems started)
   - Click **Redeploy**
   - Takes 2-3 minutes to rebuild

3. **Revert in git:**
   - Advanced option — use git revert to undo specific commits
   - Contact technical support if you need this

**Best practice:** Prevent the need for deep rollbacks by:
- Always checking preview deployments before merging
- Making small changes (easier to identify and fix problems)
- Testing changes on preview first

### G. "The site is down / not loading at all"

**First: Check if it's a Vercel platform issue**
1. Go to https://vercel-status.com
2. Look for any ongoing incidents or outages
3. If Vercel is experiencing issues:
   - Wait for them to resolve it (usually quick)
   - Check status page for updates

**If Vercel status is all green:**
1. Check if it's just you:
   - Try a different browser
   - Try a different device
   - Try from mobile data (not your WiFi)
   - Ask someone else to try loading the site
2. Check DNS:
   - Use nslookup or dnschecker.org (see section 7C)
   - Verify domain is still pointing to Vercel
3. Check Vercel dashboard (site owner):
   - Any failed deployments?
   - Any configuration changes?

**If site is truly down for everyone and Vercel is up:**
- **Immediate:** Contact site owner
- **If urgent and site owner unavailable:** Call technical contact at [TECHNICAL_CONTACT_PHONE]

**Possible causes:**
- Domain expired (check registrar account)
- DNS records accidentally changed (check registrar DNS settings)
- Vercel project accidentally deleted (site owner check dashboard)
- Vercel free tier limits exceeded (rare — site owner check usage)

---

## 8. Who to Contact (Escalation Path)

When you need help, follow this escalation path:

### Level 1: Self-Help

1. **Check this guide's Troubleshooting section** (section 7 above)
2. **Check the Content Update Guide** for JSON editing issues
3. **Check Vercel status page** if site is down: https://vercel-status.com

### Level 2: Site Owner

Contact the site owner for:
- Deployment issues (site not updating, builds failing)
- Rollback requests (bad change went live)
- Vercel dashboard questions
- Adding/removing GitHub collaborators
- Domain or DNS questions

**Site Owner Contact:**
- Name: [SITE_OWNER_NAME]
- Email: [SITE_OWNER_EMAIL]

**Response time:** Usually within 24 hours for non-urgent issues

### Level 3: Technical Contact

Contact technical support for:
- Issues the site owner can't resolve
- Complex build failures
- Git/GitHub questions beyond basic editing
- Architecture or code questions
- Site owner is unavailable

**Technical Contact:**
- Name: [TECHNICAL_CONTACT]
- Email: [TECHNICAL_CONTACT_EMAIL]
- Phone: [TECHNICAL_CONTACT_PHONE]

**Response time:**
- Email: Within 48 hours
- Phone: Use for urgent issues only (site completely down)

### Level 4: Emergency

**Call [TECHNICAL_CONTACT_PHONE] directly if:**
- Site is completely down and not loading
- Site owner is unavailable
- Security issue discovered
- Data loss suspected

**Do NOT use phone for:**
- Normal content updates
- Non-urgent questions
- Learning how to use GitHub

### When Asking for Help

Include this information to get faster help:

1. **What you were trying to do**
   - "I was trying to update the 10U roster"
2. **What happened instead**
   - "The site is showing an error page"
3. **The PR URL** (if applicable)
   - https://github.com/[owner]/bombers/pull/123
4. **Any error messages**
   - Copy the exact text or take a screenshot
5. **What you've already tried**
   - "I tried hard refresh and checked on mobile — same error"

---

## 9. Quick Reference

### Common Tasks

| Task | Who Can Do It | Where | Documentation |
|------|---------------|-------|---------------|
| Edit content (JSON) | Any board member | GitHub web editor | [Content Update Guide](CONTENT-UPDATE-GUIDE.md) |
| Check deployment status | Any board member | GitHub commit checks | Section 4 above |
| Preview changes | Any board member | PR preview URL | Section 5 above |
| Rollback bad deployment | Site owner | Vercel dashboard | Section 6 above |
| Fix bad content | Any board member | New PR with corrected JSON | Section 6 (Method 2) |
| Add/remove collaborators | Site owner | GitHub Settings | Section 3F above |
| Domain/DNS changes | Site owner | Domain registrar + Vercel | Section 3C above |
| Vercel account issues | Site owner | Vercel dashboard | Contact Vercel support |

### URLs to Bookmark

- **Live site:** https://ofallonbombers.com
- **GitHub repository:** https://github.com/[owner]/bombers
- **Vercel dashboard:** https://vercel.com (site owner)
- **Vercel status:** https://vercel-status.com

### Key Vercel Settings (Site Owner)

- **Deployments tab:** See all builds and deployment history
- **Settings → Domains:** Manage custom domain and DNS
- **Settings → Git:** Configure auto-deployment settings
- **Settings → General:** Project name and danger zone (delete project)

### Deployment Timeline

- **PR preview deployment:** 2-3 minutes after PR creation
- **Production deployment:** 2-3 minutes after merging to main
- **DNS propagation:** 5 minutes to 48 hours (typically 1-4 hours)
- **SSL provisioning:** Minutes after DNS verification

### Emergency Contacts

- **Site Owner:** [SITE_OWNER_NAME] at [SITE_OWNER_EMAIL]
- **Technical Contact:** [TECHNICAL_CONTACT] at [TECHNICAL_CONTACT_EMAIL] / [TECHNICAL_CONTACT_PHONE]

---

## 10. Additional Resources

### Vercel Documentation

- **Vercel overview:** https://vercel.com/docs
- **Custom domains:** https://vercel.com/docs/projects/domains
- **Deployments:** https://vercel.com/docs/deployments/overview

### GitHub Documentation

- **Pull requests:** https://docs.github.com/en/pull-requests
- **Collaborators:** https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository

### DNS Tools

- **DNS checker:** https://dnschecker.org
- **What's my DNS:** https://www.whatsmydns.net

### Browser Extensions (Optional)

- **Vercel Toolbar:** Browser extension to see deployment info while browsing the site
- **Install:** https://vercel.com/docs/workflow-collaboration/vercel-toolbar

---

**Document Version:** 1.0
**Last Reviewed:** February 2026
**Next Review:** Before next season (update contact info and verify all procedures still accurate)
