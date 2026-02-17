# Phase 9: Content Management System - Context

**Gathered:** 2026-02-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Enable board members to update rosters, events, fees, staff, and sponsors by editing structured data files — without needing a developer. Includes data file organization, validation to prevent broken deploys, and a comprehensive update guide. The actual deployment pipeline is Phase 10.

</domain>

<decisions>
## Implementation Decisions

### Data file structure
- Claude's Discretion: file organization (one file per type vs per page — choose based on existing codebase patterns in src/data/)
- Claude's Discretion: whether to keep TypeScript data files or migrate to plain JSON that .ts files import (optimize for non-technical editors)
- All data types updated equally frequently — no prioritization needed; rosters, events, fees, sponsors, staff all get equal documentation coverage
- Claude's Discretion: image management approach (board members adding images to a folder and referencing filenames, or separate process)

### Update workflow
- Board members are **non-technical** — comfortable with email and basic computer use, no coding or GitHub experience
- Claude's Discretion: edit method (GitHub web editor, intermediary process, or simplest approach for non-technical users)
- Claude's Discretion: deployment trigger (auto-deploy on commit vs manual trigger — coordinate with Phase 10 Vercel setup)
- Claude's Discretion: preview capability (leverage what Vercel offers out of the box)

### Validation & safety
- **Critical priority**: The site should never break from a bad edit — validation must catch errors before deploy
- Claude's Discretion: rollback mechanism (simplest approach for the team — likely Vercel's one-click rollback)
- Claude's Discretion: validation strategy (given critical safety priority, lean toward blocking bad deploys rather than warn-only)
- Claude's Discretion: example/template data for common tasks (adding a new team, new sponsor, etc.)

### Documentation style
- Claude's Discretion: format (markdown in repo vs standalone document — most accessible for non-technical board members)
- Claude's Discretion: detail level (step-by-step vs cheat sheet — tailored for non-technical audience)
- Claude's Discretion: troubleshooting section inclusion (given critical safety priority and non-technical audience)
- Claude's Discretion: technical contact reference (generic placeholder that can be filled in later)

### Claude's Discretion
- File organization pattern (per-type vs per-page)
- TypeScript vs JSON as the editable format
- Image management workflow
- Edit method for non-technical board members
- Deploy trigger and preview setup
- Validation implementation (schema validation, CI checks)
- Rollback mechanism
- Documentation format, detail level, and troubleshooting coverage
- Example/template data files

</decisions>

<specifics>
## Specific Ideas

- Board members are non-technical — every decision should optimize for the simplest possible editing experience
- Safety is critical — bad edits must not break the site
- All data types (rosters, events, fees, sponsors, staff) are updated with equal frequency
- Existing codebase uses TypeScript data files (home.ts, teams.ts, etc.) — build on this pattern

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 09-content-management-system*
*Context gathered: 2026-02-16*
