# Phase 10: Deployment & Documentation - Context

**Gathered:** 2026-02-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Deploy the site to Vercel free tier, connect a custom domain (repointing from existing JerseyWatch site), and create a comprehensive operations guide so non-technical board members can maintain the site independently. Phase 9's Content Update Guide covers JSON editing; this phase covers deployment, troubleshooting, and operational documentation.

</domain>

<decisions>
## Implementation Decisions

### Deploy workflow
- Auto-deploy on push to main — every merged PR triggers a production deploy
- API keys (Web3Forms) stay hardcoded in code — no Vercel environment variable management needed
- Board members' workflow: edit JSON in GitHub → create PR → CI validates → merge → auto-deploys

### Domain & DNS
- Repointing an existing domain from JerseyWatch to Vercel (domain already owned)
- Document DNS record changes needed (A record / CNAME to Vercel)
- SSL handled automatically by Vercel

### Board guide scope
- Full operations guide: deployment steps, troubleshooting common issues, escalation path
- Audience is non-technical (parents/coaches) — step-by-step instructions, assume no dev knowledge
- Include "who to contact" escalation section for issues beyond the guide's scope
- Complements Phase 9's Content Update Guide (don't duplicate JSON editing instructions)

### Access & permissions
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

</decisions>

<specifics>
## Specific Ideas

- Board members are non-technical parents/coaches — every instruction needs to be screenshot-level clear
- Phase 9 already created a Content Update Guide with GitHub web editor workflow and copy-paste templates
- The deploy workflow should feel invisible to board members: merge PR → site updates automatically
- Escalation contact for when things go wrong (site owner as technical point of contact)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 10-deployment-documentation*
*Context gathered: 2026-02-17*
