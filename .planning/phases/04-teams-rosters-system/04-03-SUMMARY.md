---
phase: 04-teams-rosters-system
plan: 03
subsystem: teams-rosters
tags:
  - gap-closure
  - data-enhancement
  - image-assets
  - coach-bios
dependency_graph:
  requires:
    - 04-01 (Teams Overview Page)
    - 04-02 (Individual Team Roster Pages)
  provides:
    - Complete image asset coverage (no 404s)
    - Coach bio functionality (TEAM-04 requirement)
    - Full 7U-15U age range coverage
  affects:
    - All roster pages (coach cards now display bios)
    - Teams overview page (15U now included)
tech_stack:
  added:
    - public/images/coaches/* (placeholder images)
    - public/images/teams/* (placeholder images)
  patterns:
    - Optional bio field with conditional rendering
    - Placeholder image strategy for sample data
key_files:
  created:
    - public/images/coaches/placeholder.jpg
    - public/images/teams/7u-adams.jpg
    - public/images/teams/9u-johnson.jpg
    - public/images/teams/10u-smith.jpg
    - public/images/teams/14u-patterson.jpg
  modified:
    - src/lib/data/teams.ts
    - src/components/teams/CoachCard.tsx
decisions:
  - decision: "Use hero-placeholder.jpg as base for all team/coach placeholders"
    rationale: "Simple, consistent approach for sample data — final photos will be provided by organization"
    alternatives: "Generate unique colored placeholders, use external placeholder service"
  - decision: "Add bios to all coaches (head + assistant)"
    rationale: "Provides rich sample data to demonstrate the bio feature fully"
    alternatives: "Only add bios to head coaches"
  - decision: "15U team follows established naming convention (age + coach last name)"
    rationale: "Maintains consistency with existing team data structure"
    alternatives: "Use different naming pattern for older age groups"
metrics:
  duration: "3 minutes"
  tasks_completed: 2
  files_created: 5
  files_modified: 2
  commits: 2
  completed_date: "2026-02-17"
---

# Phase 04 Plan 03: Gap Closure - Images, Bios, and 15U Team Summary

**One-liner:** Added placeholder images for all coaches/teams, implemented coach bio display functionality, and added 15U team to complete the 7U-15U age range per Phase 04 success criteria.

## What Was Built

This plan closed 3 critical verification gaps discovered during Phase 04 verification:

1. **Gap 1 - Missing Images:** Created 5 placeholder images (1 coach, 4 teams) to prevent 404 errors on roster pages
2. **Gap 2 - Coach Bios:** Added bio field to Coach interface, populated sample bios for all coaches, and updated CoachCard to display bios
3. **Gap 3 - Age Range:** Added 15U Thompson team to complete the required 7U-15U age range

### Key Components

**Data Layer:**
- Updated `Coach` interface with optional `bio?: string` field
- Added comprehensive sample bios (2-3 sentences) for all head coaches and assistant coaches
- Created new 15U Thompson team with full roster (2 coaches, 10 players)

**Image Assets:**
- `public/images/coaches/placeholder.jpg` - Generic coach placeholder
- `public/images/teams/7u-adams.jpg` - Team photo placeholder
- `public/images/teams/9u-johnson.jpg` - Team photo placeholder
- `public/images/teams/10u-smith.jpg` - Team photo placeholder
- `public/images/teams/14u-patterson.jpg` - Team photo placeholder

**Component Updates:**
- `CoachCard.tsx` now conditionally renders `coach.bio` with appropriate styling

## Implementation Approach

**Task 1: Assets and Data**
1. Created `public/images/coaches/` and `public/images/teams/` directories
2. Copied existing `hero-placeholder.jpg` to all 5 required locations
3. Added `bio?: string` to Coach interface
4. Populated sample bios emphasizing coaching philosophy, years of experience, and development focus
5. Added 15U Thompson team following established team data pattern

**Task 2: Component Integration**
1. Updated CoachCard to display bio text when present
2. Used conditional rendering (`{coach.bio && ...}`)
3. Styled bio as `text-sm text-gray-500 mt-2` for subtle, readable presentation
4. Verified full build succeeds with all teams pre-rendered

## Deviations from Plan

None - plan executed exactly as written.

## Testing & Verification

**Type Safety:**
- ✅ `npx tsc --noEmit` passes with no errors
- ✅ Optional bio field integrates cleanly with existing types

**Build Verification:**
- ✅ `npm run build` succeeds
- ✅ All team pages pre-render (including 15U Thompson)
- ✅ Build output shows 10 total team routes

**Asset Verification:**
- ✅ All 5 placeholder images exist and are valid JPEGs
- ✅ Coach photos reference `/images/coaches/placeholder.jpg`
- ✅ Team photos reference correct paths in `/images/teams/`

**Data Verification:**
- ✅ 15U team appears in teams array
- ✅ All coaches have bios (head coaches have longer bios, assistants have shorter ones)
- ✅ CoachCard renders bio text when present

## Known Issues / Tech Debt

None. All verification gaps are now closed:
- ✅ No more 404 errors on coach/team images
- ✅ TEAM-04 coach bio requirement satisfied
- ✅ Age range now covers 7U through 15U

## Next Steps

Phase 04 verification gaps are now closed. Ready to proceed to Phase 05 or continue with remaining Phase 04 plans if any exist.

**Recommended actions:**
1. Run Phase 04 verification again to confirm all gaps are closed
2. Update Phase 04 status to complete
3. Proceed to next phase in roadmap

## Files Changed

**Created (5 files):**
- `public/images/coaches/placeholder.jpg`
- `public/images/teams/7u-adams.jpg`
- `public/images/teams/9u-johnson.jpg`
- `public/images/teams/10u-smith.jpg`
- `public/images/teams/14u-patterson.jpg`

**Modified (2 files):**
- `src/lib/data/teams.ts` - Added bio field, populated bios, added 15U team
- `src/components/teams/CoachCard.tsx` - Added conditional bio rendering

## Commits

1. **07a4923** - `feat(04-03): add placeholder images, coach bios, and 15U team`
   - Created 5 placeholder images
   - Added bio field to Coach interface
   - Populated sample bios for all coaches
   - Added 15U Thompson team

2. **2786592** - `feat(04-03): add bio display to CoachCard component`
   - CoachCard conditionally renders coach.bio
   - Styled for readability
   - Build verification passed

## Self-Check: PASSED

**Verifying created files:**
- ✓ FOUND: public/images/coaches/placeholder.jpg
- ✓ FOUND: public/images/teams/7u-adams.jpg
- ✓ FOUND: public/images/teams/9u-johnson.jpg
- ✓ FOUND: public/images/teams/10u-smith.jpg
- ✓ FOUND: public/images/teams/14u-patterson.jpg

**Verifying commits:**
- ✓ FOUND: commit 07a4923
- ✓ FOUND: commit 2786592

All files created and commits exist. Self-check passed successfully.
