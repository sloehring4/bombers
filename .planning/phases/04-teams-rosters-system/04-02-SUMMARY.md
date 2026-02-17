---
phase: 04-teams-rosters-system
plan: 02
subsystem: teams
tags: [roster-pages, dynamic-routes, responsive-components]
dependency_graph:
  requires: [04-01]
  provides: [team-roster-pages, coach-display, player-roster-display]
  affects: [teams-overview]
tech_stack:
  added: []
  patterns: [generateStaticParams, async-server-components, responsive-table-cards, conditional-rendering]
key_files:
  created:
    - src/components/teams/RosterTable.tsx
    - src/components/teams/CoachCard.tsx
    - src/app/teams/[teamId]/page.tsx
  modified: []
decisions: []
metrics:
  duration_minutes: 2
  completed: 2026-02-17T00:29:50Z
  tasks_completed: 2
  files_created: 3
  commits: 2
---

# Phase 04 Plan 02: Individual Team Roster Pages Summary

**One-liner:** Dynamic team roster pages with responsive player tables, coach cards with photos, and optional team photos — all pre-rendered at build time via generateStaticParams.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create RosterTable and CoachCard components | d699f78 | src/components/teams/RosterTable.tsx, src/components/teams/CoachCard.tsx |
| 2 | Build dynamic roster page with generateStaticParams | e67a4eb | src/app/teams/[teamId]/page.tsx |

## What Was Built

### RosterTable Component (src/components/teams/RosterTable.tsx)
- **Responsive layout:**
  - Desktop: Traditional HTML table with navy header, white rows, yellow jersey badges
  - Mobile: Card layout with larger jersey badges and player names
- **Sorting:** Players automatically sorted by jersey number ascending
- **Empty state:** Friendly "Roster coming soon — check back after tryouts!" message with dashed border for teams without players
- **Styling:** Hover effects on rows, proper spacing, bombers brand colors

### CoachCard Component (src/components/teams/CoachCard.tsx)
- **Photo display:** next/image with explicit dimensions (400x400) for proper aspect ratio
- **Responsive images:** Uses sizes prop for optimization across breakpoints
- **Card layout:** Photo on top, info section below with name and role
- **Hover effects:** Border changes to yellow, shadow increases on hover
- **Graceful fallback:** bg-gray-100 background shows if photo fails to load

### Dynamic Roster Page (src/app/teams/[teamId]/page.tsx)
- **Static generation:** generateStaticParams pre-renders all 10 team pages at build time
- **Async params handling:** Proper Next.js 15+ pattern with `await params`
- **SEO:** generateMetadata creates unique title/description per team
- **404 handling:** Returns notFound() for invalid team IDs
- **Page sections (top to bottom):**
  1. Back navigation to /teams with arrow icon
  2. Team header with name, season, age group badge
  3. Coaching Staff grid (1-3 columns responsive)
  4. Players section with count and RosterTable
  5. Team Photo section (conditional, only when teamPhotoUrl exists)
- **Spacing:** Consistent mb-8/mb-12 vertical rhythm, container with px-4

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

✅ `npx tsc --noEmit` passes with no type errors
✅ `npm run build` succeeds and generates all /teams/[teamId] pages
✅ Build output shows "● /teams/[teamId]" with 10 pre-rendered paths (7u-adams, 7u-miller, 9u-johnson, +7 more)
✅ RosterTable renders responsive layout (table desktop, cards mobile)
✅ Empty roster (12U Rodriguez) displays "coming soon" message correctly
✅ CoachCard displays photo, name, and role with proper image optimization
✅ Team photo section only renders when teamPhotoUrl is present
✅ Back navigation links to /teams overview
✅ Invalid team IDs return 404 via notFound()

## Success Criteria Met

✅ Parents can navigate from teams overview to individual roster pages
✅ Coaching staff displayed in responsive grid with photos
✅ Full player roster shown with jersey numbers (table on desktop, cards on mobile)
✅ Team photos appear in secondary/smaller placement when available
✅ Empty roster shows friendly message instead of blank table
✅ All team pages pre-rendered at build time
✅ Invalid team IDs return 404
✅ Complete teams flow works: /teams → click team card → roster page with correct data

## Technical Notes

- **Next.js 15+ async params:** Both page component and generateMetadata properly await params
- **Image optimization:** CoachCard uses explicit dimensions (not fill mode) for predictable layout
- **Responsive patterns:** Desktop table hidden on mobile (hidden md:block), mobile cards hidden on desktop (md:hidden)
- **Jersey badge styling:** Yellow circles (w-10 h-10 desktop, w-14 h-14 mobile) with centered navy text
- **Conditional rendering:** Team photo section uses `{team.teamPhotoUrl && ...}` pattern
- **Sort stability:** Spread operator creates new array before sorting to avoid mutating props
- **Build confirmation:** All 10 team pages listed in build output under SSG section

## Next Steps

Phase 04 Teams & Rosters System is now complete. The teams feature provides:
- Teams overview page with age-grouped cards (/teams) - from Plan 01
- Individual roster pages with coaches, players, and photos (/teams/[teamId]) - from Plan 02

Next phase will begin Phase 05 or continue with remaining roadmap items.

## Self-Check

Verifying all claimed files and commits exist:

**Files:**
- ✅ FOUND: src/components/teams/RosterTable.tsx
- ✅ FOUND: src/components/teams/CoachCard.tsx
- ✅ FOUND: src/app/teams/[teamId]/page.tsx

**Commits:**
- ✅ FOUND: d699f78
- ✅ FOUND: e67a4eb

## Self-Check: PASSED

All files and commits verified successfully.
