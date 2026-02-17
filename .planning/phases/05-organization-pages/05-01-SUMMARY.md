---
phase: 05-organization-pages
plan: 01
subsystem: organization-data-components
tags: [data-layer, ui-components, type-safety, reusable-components]

dependency_graph:
  requires: []
  provides:
    - organization-data-structures
    - sponsor-data-structures
    - conduct-data-structures
    - board-member-components
    - sponsor-components
    - accordion-component
  affects:
    - 05-02-PLAN.md

tech_stack:
  added:
    - lucide-react/ChevronDown
  patterns:
    - centralized-data-files
    - readonly-arrays
    - client-component-state-management
    - conditional-link-wrapper

key_files:
  created:
    - src/lib/data/organization.ts
    - src/lib/data/sponsors.ts
    - src/lib/data/conduct.ts
    - src/components/organization/Accordion.tsx
    - src/components/organization/BoardMemberCard.tsx
    - src/components/organization/SponsorCard.tsx
    - src/components/organization/SponsorGrid.tsx
    - public/images/board/placeholder.jpg
    - public/images/sponsors/placeholder.jpg
  modified: []

decisions:
  - Privacy-first board member data with no email/phone fields
  - Empty staff array for conditional rendering in pages
  - Single-item accordion expansion pattern for better UX
  - object-contain for sponsor logos to preserve aspect ratio
  - Conditional link wrapper pattern for sponsors with websites
  - Reusable SponsorGrid with optional limit prop for home page

metrics:
  tasks_completed: 2
  files_created: 9
  files_modified: 0
  commits: 2
  duration_minutes: 2
  completed_at: 2026-02-16
---

# Phase 05 Plan 01: Organization Data Layer and Components Summary

Type-safe data structures and reusable UI components for organization pages.

## Overview

Created centralized data files for board members, sponsors, and code of conduct content, following the established pattern from Phase 4 teams data. Built four reusable components: Accordion (client-side with single-item expansion), BoardMemberCard (following CoachCard pattern), SponsorCard (with conditional website linking), and SponsorGrid (responsive with optional limit).

## Tasks Completed

### Task 1: Data files for organization, sponsors, and code of conduct
**Status:** Complete
**Commit:** 519425d

Created three type-safe data files:
- **organization.ts:** BoardMember interface with name, title, photoUrl, and optional bio. 5 board members with realistic titles and bios. Empty staff array for conditional rendering.
- **sponsors.ts:** Sponsor interface with id, name, logoUrl, description, and optional websiteUrl. 6 diverse placeholder sponsors (sports shop, restaurant, auto dealer, hardware store, bank, dental office).
- **conduct.ts:** ConductSection interface with id, title, and readonly rules array. 4 sections: Player Code, Parent Code, Coach Code, and Spectator Expectations, each with 5-7 concise rules based on youth baseball best practices.

Also created placeholder images for board members and sponsors by copying hero-placeholder.jpg.

**Files created:**
- src/lib/data/organization.ts
- src/lib/data/sponsors.ts
- src/lib/data/conduct.ts
- public/images/board/placeholder.jpg
- public/images/sponsors/placeholder.jpg

### Task 2: Organization UI components
**Status:** Complete
**Commit:** 6dd9f01

Created four components in src/components/organization/:

- **Accordion.tsx (client component):** Single-item expansion with `useState<string | null>`. ChevronDown icon rotates on expansion. Includes aria-expanded for accessibility. Styled with bordered cards, gray-50 backgrounds, and smooth transitions.

- **BoardMemberCard.tsx (server component):** Follows exact pattern from CoachCard. Aspect-square photo, name as h3, title subtitle, optional bio. Same hover effects and responsive image sizing.

- **SponsorCard.tsx (server component):** Logo area with object-contain (preserves aspect ratio), centered name and description. Conditional link wrapper if websiteUrl exists (target="_blank" with noopener noreferrer). Same card styling as other components.

- **SponsorGrid.tsx (server component):** Responsive grid (1/2/3/4 columns). Optional limit prop slices sponsor array for home page subset display.

**Files created:**
- src/components/organization/Accordion.tsx
- src/components/organization/BoardMemberCard.tsx
- src/components/organization/SponsorCard.tsx
- src/components/organization/SponsorGrid.tsx

## Verification

- TypeScript compilation passes with no errors
- All 3 data files export interfaces and readonly data arrays
- All 4 components exist in src/components/organization/
- Accordion.tsx has 'use client' directive on line 1
- Accordion includes aria-expanded attribute for accessibility
- Placeholder images exist at both required paths

## Deviations from Plan

None - plan executed exactly as written.

## Key Decisions

1. **Privacy-first approach:** No email or phone fields on BoardMember interface, consistent with Coach interface from Phase 4
2. **Empty staff array:** Allows for conditional rendering in pages without needing to remove the export
3. **Single-item expansion:** Accordion closes other items when opening one, reducing visual clutter
4. **object-contain for logos:** Preserves sponsor logo aspect ratios unlike object-cover
5. **Conditional link wrapper:** Entire SponsorCard becomes clickable link only if websiteUrl exists
6. **Optional limit prop:** SponsorGrid can show subset for home page or all sponsors on dedicated page

## Success Criteria

- [x] Data layer and components ready for page assembly in Plan 02
- [x] TypeScript compiles without errors
- [x] Components follow established patterns from Phase 4 (CoachCard, data files)
- [x] Accordion has client directive and accessibility features
- [x] All interfaces use readonly arrays for type safety
- [x] Placeholder images in place for easy replacement

## Next Steps

Plan 02 will assemble these components into four pages: About, Board/Staff, Code of Conduct, and Sponsors. Data structures are ready, components are tested and type-safe.

## Self-Check: PASSED

**Files created:**
- FOUND: src/lib/data/organization.ts
- FOUND: src/lib/data/sponsors.ts
- FOUND: src/lib/data/conduct.ts
- FOUND: src/components/organization/Accordion.tsx
- FOUND: src/components/organization/BoardMemberCard.tsx
- FOUND: src/components/organization/SponsorCard.tsx
- FOUND: src/components/organization/SponsorGrid.tsx
- FOUND: public/images/board/placeholder.jpg
- FOUND: public/images/sponsors/placeholder.jpg

**Commits:**
- FOUND: 519425d
- FOUND: 6dd9f01
