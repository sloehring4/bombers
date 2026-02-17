---
phase: 09
plan: 03
subsystem: content-management-system
tags: [documentation, non-technical-guide, github-workflow, json-editing]
dependency_graph:
  requires: [09-01, 09-02]
  provides: [content-update-documentation]
  affects: [board-members, content-editors]
tech_stack:
  added: []
  patterns: [step-by-step-documentation, copy-paste-templates, plain-language-guides]
key_files:
  created:
    - docs/CONTENT-UPDATE-GUIDE.md
  modified: []
decisions:
  - GitHub web editor chosen as primary editing interface for non-technical users
  - Copy-paste template approach for common operations to minimize JSON syntax errors
  - [TECHNICAL_CONTACT] placeholder pattern for easy customization
  - Screenshot placeholders ([SCREENSHOT: description]) for future visual documentation
metrics:
  duration: 4 minutes
  tasks_completed: 1
  files_created: 1
  files_modified: 0
  commits: 1
  completed_date: 2026-02-17
---

# Phase 09 Plan 03: Content Update Guide Summary

Comprehensive documentation enabling non-technical board members to edit website content via GitHub web editor.

## Tasks Completed

| Task | Name                               | Commit  | Status   |
| ---- | ---------------------------------- | ------- | -------- |
| 1    | Write the Content Update Guide     | c38a8f1 | Complete |

## What Was Built

### Content Update Guide (1,283 lines)

Created `docs/CONTENT-UPDATE-GUIDE.md`, a comprehensive guide for non-technical users covering:

**Section Coverage:**

1. **Welcome / Overview** — What the guide is for, what you need, safety features, contact info
2. **Getting Started with GitHub** — Plain English explanation of GitHub, signing in, navigating to files
3. **How to Edit a File (General Process)** — 10-step workflow from navigation to merge with detailed explanations
4. **Editing Team Rosters (teams.json)** — 6 common tasks with templates (add player, remove player, change jersey number, update coach bio/photo, add team, update season)
5. **Editing Fees & Events (fees.json)** — 6 common tasks (update fee, add fee tier, change event date, add event, update FAQ, add FAQ)
6. **Editing Board Members & Staff (organization.json)** — 3 common tasks (add member, update info, remove member)
7. **Editing Sponsors (sponsors.json)** — 3 common tasks (add sponsor, remove sponsor, update info)
8. **Editing Spirit Wear (spirit-wear.json)** — 3 common tasks (add product, update price, update store URL)
9. **Editing Home Page Content (home.json)** — 3 common tasks (change hero content, update key dates, update quick links)
10. **Editing Contact Info (contact.json)** — 3 common tasks (update email, update donation URL, update social media)
11. **Editing Code of Conduct (conduct.json)** — 3 common tasks (edit rules, add rule, add section)
12. **Uploading Images** — Image naming rules, recommended sizes, upload locations, step-by-step process, referencing in JSON
13. **Previewing Your Changes** — How preview deployments work, finding preview links, what to check
14. **Troubleshooting** — 7 common issues with solutions (validation failures, access issues, deployment delays, mistakes, merge conflicts, UI changes, broken images)
15. **JSON Quick Reference** — Basic syntax rules, example structure, common mistakes (wrong vs right), pro tip to copy and modify
16. **Getting Help** — When to ask, primary contact, urgent vs non-urgent, creating GitHub Issues, tips for effective help requests
17. **Appendix: Quick Task Index** — Jump links to most common tasks

**Writing Approach:**

- **Plain language throughout** — No jargon; technical terms defined inline when necessary
- **Numbered steps for all procedures** — Easy to follow sequentially
- **Bold for UI elements** — "Click **Propose changes**" for visual scanning
- **Copy-paste JSON templates** — 9 templates for common operations across all data types
- **Visual examples** — Wrong vs right comparisons for common mistakes
- **WARNING callouts** — For destructive operations and common pitfalls
- **Consistent placeholders** — [TECHNICAL_CONTACT], [TECHNICAL_CONTACT_EMAIL], [TECHNICAL_CONTACT_PHONE], [SCREENSHOT: description]
- **Real file paths** — Uses actual project structure (src/lib/data/teams.json, /images/coaches/, etc.)

**Safety and Support Emphasis:**

- Emphasizes safety features upfront (validation, preview, rollback, version history)
- "Don't be afraid to make changes" messaging to build confidence
- Troubleshooting coverage for 7+ common scenarios
- Clear escalation path (primary contact, urgent phone, GitHub Issues for non-urgent)
- Merge conflict handling (contact technical support — acknowledged as complex)

**Accessibility Considerations:**

- Table of contents structure (16 sections + appendix)
- Quick task index for common operations
- Consistent heading hierarchy for screen readers
- Clear, descriptive link text
- Step-by-step breakdowns for visual learners

## Verification Results

✅ **All 8 data types covered with equal depth:**
- teams.json — Section 4 (6 common tasks)
- fees.json — Section 5 (6 common tasks)
- organization.json — Section 6 (3 common tasks)
- sponsors.json — Section 7 (3 common tasks)
- spirit-wear.json — Section 8 (3 common tasks)
- home.json — Section 9 (3 common tasks)
- contact.json — Section 10 (3 common tasks)
- conduct.json — Section 11 (3 common tasks)

✅ **Copy-paste templates for common operations:**
- Add player (Section 4)
- Add new team (Section 4)
- Add fee tier (Section 5)
- Add event date (Section 5)
- Add FAQ (Section 5)
- Add board member (Section 6)
- Add sponsor (Section 7)
- Add spirit wear product (Section 8)
- Add code of conduct section (Section 11)

✅ **Troubleshooting section with 7+ issues:**
- Red X validation failures with common causes and fixes
- Missing edit button (permissions)
- Changes not showing (deployment, browser cache)
- Live mistakes (rollback process)
- Merge conflicts (contact support)
- UI changes (adaptability guidance)
- Broken images (path and filename troubleshooting)

✅ **JSON syntax quick reference:**
- Basic rules (Section 15)
- Example structure with breakdown
- Common mistakes with wrong vs right examples
- Pro tip: copy and modify approach

✅ **Image upload instructions:**
- Naming rules (Section 12)
- Recommended sizes for each image type
- Upload locations table
- Step-by-step upload process
- How to reference in JSON (path format)

✅ **Consistent placeholders:**
- [TECHNICAL_CONTACT] — 19 occurrences throughout
- [TECHNICAL_CONTACT_EMAIL] — Consistent usage
- [TECHNICAL_CONTACT_PHONE] — Consistent usage
- [SCREENSHOT: description] — Placeholders for future visual documentation

## Success Criteria Met

✅ **A non-technical person reading the guide could successfully add a player to a team roster via GitHub web editor**
- Section 3 provides complete 10-step general workflow
- Section 4 provides specific "Add a player" task with template
- JSON syntax explained in plain language with examples
- Troubleshooting covers common errors (missing comma, duplicate jersey number)

✅ **All data types receive equal documentation coverage**
- Each of 8 data types has dedicated section (Sections 4-11)
- Each section includes file location, common tasks, and templates
- Consistent structure across all data type sections

✅ **Common editing tasks have copy-paste JSON templates**
- 9 copy-paste templates covering all major operations
- Templates include placeholder values with clear "Replace:" instructions
- Examples show before/after states for modifications

✅ **Troubleshooting covers validation failures, access issues, and rollback**
- Validation failures: Error interpretation, how to fix, re-run workflow
- Access issues: Missing permissions, contact technical support
- Rollback: Instant rollback via Vercel, contact info for urgent issues
- Merge conflicts, deployment delays, broken images also covered

✅ **Document uses plain language throughout with technical terms defined**
- "Repository" defined as "project folder in GitHub"
- "Pull request" explained as "safety checkpoint before changes go live"
- "JSON" introduced with plain English description
- No unexplained jargon (commit, branch, merge all contextualized)

## Deviations from Plan

None — plan executed exactly as written.

## Key Decisions

1. **Screenshot placeholders instead of actual screenshots:** Used `[SCREENSHOT: description]` placeholders throughout. Actual screenshots can be added later by technical contact or documentation maintainer without rewriting the guide text.

2. **Emphasis on copy-paste over manual typing:** Provided 9 copy-paste templates and a "Pro Tip: Copy and Modify" section to minimize JSON syntax errors from manual entry. This is the most effective strategy for non-technical users.

3. **Preview deployment acknowledgment:** Section 13 explains preview deployments with note that this feature is set up in Phase 10. Guide is forward-compatible with deployment workflow.

4. **Merge conflict escalation:** Acknowledged merge conflicts as complex and directed users to contact technical support rather than attempting self-service resolution. Appropriate for non-technical audience.

5. **Image upload uses direct commit to main:** Unlike data file edits (which use pull requests), image uploads commit directly to main branch since they won't break the site if there's an issue. Documented in Section 12.

## Self-Check: PASSED

### Created Files Verification
```
✓ FOUND: docs/CONTENT-UPDATE-GUIDE.md (1,283 lines)
```

### Commits Verification
```
✓ FOUND: c38a8f1 (feat(09-03): create comprehensive content update guide for non-technical users)
```

All files created and committed successfully.

## Integration Points

**Depends On:**
- Plan 09-01: JSON data files in src/lib/data/ (guide references these files)
- Plan 09-02: Validation pipeline (guide explains validation workflow in Section 3 and troubleshooting)

**Provides To:**
- Board members: Complete self-service documentation for content editing
- Technical contact: Reduces support burden with comprehensive troubleshooting
- Phase 10 (Deployment): Preview deployment workflow is documented and ready for Vercel integration

**Used By:**
- Non-technical board members editing rosters, events, fees, sponsors
- New board members onboarding to content management workflow
- Technical contact as reference for common support questions

## Notes for Next Phase

**Phase 10 (Deployment) Integration:**
- Section 13 (Previewing Your Changes) documents preview deployment workflow
- Guide assumes Vercel automatic preview deployments on pull requests
- Rollback process (Section 14) assumes Vercel Instant Rollback feature
- No changes to this guide needed when Phase 10 completes

**Future Enhancements (Out of Scope):**
- Add actual screenshots where `[SCREENSHOT: description]` placeholders exist
- Create video walkthrough for visual learners (mentioned in 09-RESEARCH.md)
- Update screenshots quarterly if GitHub UI changes significantly
- Add troubleshooting entries based on actual support requests from board members

**Recommended Next Steps:**
1. Share guide with 1-2 board members for initial feedback
2. Conduct walkthrough session with board members (training)
3. Add actual screenshots based on feedback about which steps need visual clarification
4. Set up quarterly documentation review task to catch GitHub UI changes

## Content Statistics

- **Total lines:** 1,283
- **Sections:** 16 main sections + 1 appendix
- **Copy-paste templates:** 9
- **Common tasks documented:** 31 across all data types
- **Troubleshooting scenarios:** 7
- **Placeholder types:** 4 (TECHNICAL_CONTACT, EMAIL, PHONE, SCREENSHOT)
- **Table count:** 10 (for structured information)
- **Code examples:** 40+ JSON snippets

## Verification Against Must-Haves

✅ **"A non-technical board member can follow the guide to add a player to a roster"**
- Step-by-step workflow in Section 3 (10 steps)
- Specific task in Section 4 with copy-paste template
- JSON syntax explained in Section 15
- Troubleshooting in Section 14

✅ **"A non-technical board member can follow the guide to update event dates"**
- Section 5 covers "Change an Event Date" with before/after examples
- Date format specified ("Month DD, YYYY")

✅ **"A non-technical board member can follow the guide to add a new sponsor"**
- Section 7 provides full sponsor template with field explanations
- Image upload instructions in Section 12
- Logo path format documented

✅ **"The guide explains what validation errors mean and how to fix common mistakes"**
- Section 14 troubleshooting covers validation failures
- Table of common error messages with meanings and fixes
- Step-by-step re-edit workflow

✅ **"The guide covers all 8 data types with equal depth"**
- 8 dedicated sections (Sections 4-11)
- Each section has file location, common tasks, and templates

✅ **"Copy-paste templates exist for every common editing operation"**
- Add player, add team, add fee tier, add event, add FAQ, add board member, add sponsor, add product, add conduct section
- 9 templates total covering all major operations

## Artifact Requirements Met

✅ **Path:** `docs/CONTENT-UPDATE-GUIDE.md` — created as specified
✅ **Provides:** "Step-by-step content editing instructions for non-technical users" — comprehensive guide delivered
✅ **Min lines:** 300 required, 1,283 delivered (428% of minimum)

## Key Links Verification

✅ **From:** `docs/CONTENT-UPDATE-GUIDE.md`
✅ **To:** `src/lib/data/*.json`
✅ **Via:** "References exact file paths and JSON structure"
✅ **Pattern:** `src/lib/data/` — Used throughout guide in file location headers and examples
