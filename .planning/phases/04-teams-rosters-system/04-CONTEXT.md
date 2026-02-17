# Phase 4: Teams & Rosters System - Context

**Gathered:** 2026-02-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Parents can view all age groups (7U-15U) and access detailed rosters for each team. Teams overview page displays teams, clicking navigates to individual roster pages showing players and coaches. Creating/editing team data is managed via Phase 9 CMS. Search, filtering, and historical rosters are out of scope.

</domain>

<decisions>
## Implementation Decisions

### Team naming convention
- Teams are identified by age level + head coach's last name (e.g., "10U Cook")
- Multiple teams can exist within the same age group (e.g., 10U Cook, 10U Smith)
- Approximately 5-8 age groups with 10-15 total teams

### Team listing layout
- Claude's discretion on layout approach (card grid vs grouped list)
- Each team entry shows: age group label and head coach name
- Teams visually grouped by age group on the overview page

### Roster page — players
- Player details: name and jersey number only (no position or grade)
- Claude's discretion on display format (table vs cards)

### Roster page — coaches
- Coach display: name, role (Head Coach, Assistant), and photo
- Claude's discretion on whether to show coach contact info (balance privacy vs accessibility)

### Team photo
- Team photo included on roster page but not as the main visual focus — smaller/secondary placement

### Season context
- Teams page shows current season label (e.g., "Spring 2026 Rosters") so parents know rosters are current

### Claude's Discretion
- Team listing layout style (card grid vs grouped list vs hybrid)
- Player display format (table vs cards — optimize for mobile)
- Navigation flow: two-level (age group → teams) vs flat list with grouping
- Whether each team gets its own page URL or expands inline
- Sibling navigation between teams in the same age group
- Empty roster state approach ("coming soon" message vs hiding unpopulated teams)
- Data structure (JSON files in repo — consistent with Phase 9 CMS plans)
- Coach contact visibility on roster pages

</decisions>

<specifics>
## Specific Ideas

- Team naming follows the pattern coaches and parents already use: "10U Cook" (age level + coach last name)
- Season label should be prominent so parents always know they're looking at current rosters

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-teams-rosters-system*
*Context gathered: 2026-02-16*
