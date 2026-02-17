---
phase: 06-fees-events
plan: 01
subsystem: ui
tags: [react, typescript, lucide-react, data-layer]

# Dependency graph
requires:
  - phase: 04-teams-rosters-system
    provides: Centralized data file pattern with interfaces and readonly arrays
  - phase: 03-home-page
    provides: KeyDate interface pattern and date formatting conventions
  - phase: 05-organization-pages
    provides: AccordionItem interface for FAQ data mapping
provides:
  - Type-safe fees data with AgeFee, KeyDate, and FAQItem interfaces
  - Fee data for all 9 age groups (7U-15U) with pricing tiers and breakdowns
  - Key dates data with 8 chronological events across 4 categories
  - FAQ data with 12 items across 4 categories (fees, tryouts, season, general)
  - FeeCard component for displaying age group pricing cards
  - EventList component for rendering chronological key dates
  - RegistrationCTA component with embedded iframe and fallback
affects: [06-02-fees-events-page, fees-page-composition]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Readonly array types with 'as const' for data immutability
    - Optional description fields on data interfaces
    - Category-based data organization (tryout, registration, season, tournament)
    - Iframe sandbox security pattern for third-party embeds
    - Fallback link pattern for iframe content

key-files:
  created:
    - src/lib/data/fees.ts
    - src/components/fees/FeeCard.tsx
    - src/components/fees/EventList.tsx
    - src/components/fees/RegistrationCTA.tsx
  modified: []

key-decisions:
  - "Pricing tiers: 7U-8U ($350), 9U-10U ($450), 11U-12U ($550), 13U-15U ($650)"
  - "8 key dates from tryouts through season end covering all major milestones"
  - "12 FAQ items distributed across 4 categories for comprehensive parent coverage"
  - "JerseyWatch iframe with sandbox security (allow-scripts, allow-forms, allow-same-origin, allow-popups)"
  - "Category badges on EventList for visual categorization of date types"

patterns-established:
  - "Readonly breakdown arrays with label/amount pairs for itemized costs"
  - "Category-based date organization with visual badges"
  - "Iframe security pattern with sandbox attribute and fallback link"
  - "Checklist pattern with CheckCircle icons for registration preparation"

# Metrics
duration: 3.5min
completed: 2026-02-16
---

# Phase 6 Plan 1: Fees & Events Data and Components Summary

**Type-safe fees data layer with 9 age group pricing cards, 8 key dates with category badges, 12 FAQ items, and secure JerseyWatch iframe registration embed**

## Performance

- **Duration:** 3.5 min
- **Started:** 2026-02-17T02:10:24Z
- **Completed:** 2026-02-17T02:14:16Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Created centralized fees data file with complete type definitions for fees, dates, and FAQs
- Built 9 age group pricing cards with realistic fee breakdowns and descriptions
- Implemented chronological event timeline with 8 key dates across tryout/registration/season/tournament categories
- Created comprehensive FAQ with 12 items covering fees, tryouts, season logistics, and general questions
- Built three presentational components ready for page composition in Plan 02

## Task Commits

Each task was committed atomically:

1. **Task 1: Create fees data file with types and content** - `2d8d297` (feat)
2. **Task 2: Build FeeCard, EventList, and RegistrationCTA components** - `f6d1c2f` (feat)

## Files Created/Modified
- `src/lib/data/fees.ts` - Type-safe data layer with AgeFee, KeyDate, and FAQItem interfaces plus populated arrays for all content
- `src/components/fees/FeeCard.tsx` - Pricing card component displaying age group fees with prominent total and itemized breakdown
- `src/components/fees/EventList.tsx` - Chronological event list with calendar icons, category badges, and left border accents
- `src/components/fees/RegistrationCTA.tsx` - Registration section with checklist, sandboxed JerseyWatch iframe, and fallback link

## Decisions Made

**Pricing Structure:**
- Established 4 pricing tiers based on age groups and competitive level
- 7U-8U ($350): Entry level with 2 local tournaments
- 9U-10U ($450): Intermediate with expanded schedule
- 11U-12U ($550): Competitive with 3 tournaments
- 13U-15U ($650): Advanced with travel tournament opportunities

**Key Dates Strategy:**
- Included 8 chronological dates from March 15 (tryouts) through July 25 (season end)
- Four category types: tryout, registration, season, tournament
- Category badges provide visual organization and filtering capability

**FAQ Coverage:**
- 12 items distributed across 4 categories for comprehensive parent needs
- Fees category (4 items): costs, payment plans, financial aid, refunds
- Tryouts category (3 items): logistics, preparation, age cutoffs
- Season category (3 items): practice/game schedules, travel requirements
- General category (3 items): volunteers, communication, weather policies

**Security Pattern:**
- JerseyWatch iframe uses sandbox attribute with minimal required permissions
- Fallback link with external link icon provides alternative access
- ExternalLink icon indicates opens in new window

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

All data and components ready for Plan 02 (Fees & Events page composition):
- FeeCard can be mapped over ageFees array
- EventList can receive filtered keyDates by category
- RegistrationCTA ready to embed at bottom of page
- FAQ data ready for Accordion component integration

No blockers or concerns.

## Self-Check: PASSED

All files and commits verified:
- FOUND: src/lib/data/fees.ts
- FOUND: src/components/fees/FeeCard.tsx
- FOUND: src/components/fees/EventList.tsx
- FOUND: src/components/fees/RegistrationCTA.tsx
- FOUND: 2d8d297 (Task 1 commit)
- FOUND: f6d1c2f (Task 2 commit)

---
*Phase: 06-fees-events*
*Completed: 2026-02-16*
