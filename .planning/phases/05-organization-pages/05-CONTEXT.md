# Phase 5: Organization Pages - Context

**Gathered:** 2026-02-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Pages that tell families who the Bombers are — mission, leadership, values, and sponsors. Includes About, Board/Staff, Code of Conduct, and Sponsors pages. Content is informational and read-only. Contact forms, social feeds, and registration are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Page structure
- Multiple separate pages: About, Board/Staff, Code of Conduct, Sponsors
- Each page is its own route under the site navigation
- Sponsors also get a summary section on the home page ("Our Sponsors")

### Leadership display
- Board members have: names, titles, and photos available
- No contact info on the page — privacy-first, same as coaches (link to Contact page)
- Claude's discretion on grouping (Board vs Staff sections) and card vs list layout based on data

### Code of conduct
- Collapsible accordion sections — keeps page compact, users expand what they need
- Content pulled from existing JerseyWatch site
- Claude structures sections based on common youth baseball org patterns
- Claude decides whether to include a brief values intro or keep it strictly rules/expectations

### Sponsor presentation
- Cards with details: logo + company name + short description per sponsor
- Sponsors appear on dedicated Sponsors page AND as a section on the home page
- Mix of real and placeholder sponsor data — structure must support easy data replacement
- Claude decides whether to include a "Become a Sponsor" CTA

### Claude's Discretion
- About page content balance (mission, history, structure)
- Navigation approach for org pages (dropdown vs flat)
- Page header style (hero banners vs simple headers) — match existing site patterns
- Board/Staff grouping and display layout
- Code of conduct section structure
- Whether to include values intro on conduct page
- "Become a Sponsor" CTA inclusion

</decisions>

<specifics>
## Specific Ideas

- Privacy-first approach consistent with coach data — no personal emails/phones on leadership pages
- Code of conduct from existing JerseyWatch site should be migrated, not rewritten
- Sponsor section on home page should complement, not duplicate, the full sponsors page

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-organization-pages*
*Context gathered: 2026-02-16*
