# Phase 2: Core Layout & Navigation - Context

**Gathered:** 2026-02-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Site-wide layout structure with header, footer, and simplified navigation that appears on every page. Mobile hamburger menu for small screens. Navigation highlights the current page. This is the shell that wraps all future content pages.

</domain>

<decisions>
## Implementation Decisions

### Header design
- Claude's discretion on sticky vs static behavior
- Claude's discretion on logo placement (left-aligned vs centered)
- Claude's discretion on header background color/style
- Claude's discretion on whether to include a CTA button alongside nav links

### Mobile menu
- Breakpoint at 768px (standard tablet breakpoint) — user-specified
- Claude's discretion on menu open style (slide-in, dropdown, or overlay)
- Claude's discretion on hamburger icon style
- Claude's discretion on whether mobile menu includes extras beyond nav links

### Footer content
- Claude's discretion on footer content and layout (nav links, contact info, social, sponsors)
- Claude's discretion on sponsor logo placement (footer vs dedicated pages only)
- Claude's discretion on footer background color
- Claude's discretion on JerseyWatch attribution

### Navigation structure
- Claude's discretion on flat list vs dropdowns for ~7 pages
- Claude's discretion on nav item ordering
- Claude's discretion on active page indicator style
- Claude's discretion on Home link vs logo-as-home

### Claude's Discretion
The user deferred nearly all design decisions to Claude. This gives full flexibility on:
- Header: sticky behavior, logo position, background treatment, CTA inclusion
- Footer: content selection, layout columns, background, attribution
- Navigation: organization (flat vs grouped), ordering, active state, Home link treatment
- Mobile: menu animation style, hamburger icon, extra content in mobile menu

The only locked decision is the mobile menu breakpoint at 768px.

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. The user trusts Claude to make design decisions that align with the Bombers branding (navy #0a0047, yellow #feda00) and modern sports organization aesthetics.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-core-layout-navigation*
*Context gathered: 2026-02-16*
