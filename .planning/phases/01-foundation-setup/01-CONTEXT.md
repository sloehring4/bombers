# Phase 1: Foundation & Setup - Context

**Gathered:** 2026-02-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Next.js project with Tailwind CSS, Bombers branding (yellow #feda00, navy #0a0047), mobile-responsive base layout, and static HTML export. This phase delivers project infrastructure only — no pages or navigation (those are Phase 2+).

</domain>

<decisions>
## Implementation Decisions

### Branding & visual identity
- Design feel: Friendly and approachable — warm, inviting, feels like a community organization parents trust
- Primary colors: Bombers yellow (#feda00) and navy (#0a0047) only — Claude derives grays, backgrounds, and accent shades from these two
- Logo: User will provide a logo file (SVG/PNG) — build with logo placeholder that can be swapped in
- No dark mode — light theme only

### Mobile layout approach
- Audience: Mix of phone and desktop — parents check rosters/dates on phones at the field, use desktop at home for registration
- Mobile should feel app-like — smooth, fast, thumb-friendly
- Low-connectivity is nice-to-have — fast loading and caching help but no full offline/service worker needed

### Project conventions
- Board members who maintain the site are not technical at all — content editing must be as simple as possible
- Data format, language (TS vs JS), and package manager are Claude's discretion, optimized for non-technical maintainability

### Claude's Discretion
- Typography selection (should match friendly/approachable feel)
- Mobile vs desktop content strategy (what to show/hide)
- Breakpoint strategy (2 vs 3 breakpoints)
- Layout width approach (full-width sections vs centered)
- Animation/transition approach (should support app-like feel)
- Accessibility level (standard best practices minimum)
- Design token depth for Phase 1 (enough for consistency without over-engineering)
- Button color hierarchy (yellow vs navy for primary/secondary)
- Corner styles and shape language (should reinforce friendly feel)
- Data storage format (JSON vs markdown — optimize for non-technical editors)
- TypeScript vs JavaScript
- Package manager choice
- Component organization and folder structure

</decisions>

<specifics>
## Specific Ideas

- "Like a modern app" on mobile — should feel app-like, smooth, thumb-friendly
- Site is replacing a cluttered 20+ page JerseyWatch site — the new site should feel like a breath of fresh air
- Board members are not technical — every convention choice should favor simplicity for content editors

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-setup*
*Context gathered: 2026-02-16*
