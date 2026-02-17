---
phase: 09
plan: 01
subsystem: content-management-system
tags: [data-migration, zod-validation, json-cms, type-safety]
dependency_graph:
  requires: [08-02]
  provides: [json-data-layer, zod-validation-layer]
  affects: [all-pages]
tech_stack:
  added: [zod-4.3.6]
  patterns: [json-import, schema-validation, icon-mapping]
key_files:
  created:
    - src/lib/schemas/teams.ts
    - src/lib/schemas/fees.ts
    - src/lib/schemas/organization.ts
    - src/lib/schemas/sponsors.ts
    - src/lib/schemas/home.ts
    - src/lib/schemas/spirit-wear.ts
    - src/lib/schemas/contact.ts
    - src/lib/schemas/conduct.ts
    - src/lib/schemas/index.ts
    - src/lib/data/teams.json
    - src/lib/data/fees.json
    - src/lib/data/organization.json
    - src/lib/data/sponsors.json
    - src/lib/data/home.json
    - src/lib/data/spirit-wear.json
    - src/lib/data/contact.json
    - src/lib/data/conduct.json
  modified:
    - src/lib/data/teams.ts
    - src/lib/data/fees.ts
    - src/lib/data/organization.ts
    - src/lib/data/sponsors.ts
    - src/lib/data/home.ts
    - src/lib/data/spirit-wear.ts
    - src/lib/data/contact.ts
    - src/lib/data/conduct.ts
decisions:
  - Renamed fees KeyDate schema to FeesKeyDate to avoid conflict with home KeyDate schema
  - Added contactFormSchema to contact.ts schema for form validation (required by existing ContactForm component)
  - Icon mapping pattern for home and contact data (iconName string in JSON mapped to LucideIcon in TS)
metrics:
  duration: 15 minutes
  tasks_completed: 2
  files_created: 17
  files_modified: 8
  commits: 2
  completed_date: 2026-02-17
---

# Phase 09 Plan 01: Data Migration to JSON + Zod Summary

Migrated all 8 TypeScript data files to JSON with Zod validation schemas for non-technical editing.

## Tasks Completed

| Task | Name                                          | Commit  | Status   |
| ---- | --------------------------------------------- | ------- | -------- |
| 1    | Create Zod schemas for all 8 data types      | 87fd784 | Complete |
| 2    | Migrate data to JSON and update TS wrappers   | 699a1d0 | Complete |

## What Was Built

### Zod Schemas

Created comprehensive validation schemas for all data types with:
- **teams.ts**: Player, Coach, Team schemas with duplicate jersey number and team ID validation
- **fees.ts**: AgeFee, FeesKeyDate, FAQItem schemas with category enums
- **organization.ts**: BoardMember schema for board and staff
- **sponsors.ts**: Sponsor schema with kebab-case ID validation and optional URL
- **home.ts**: QuickLink, KeyDate, HeroContent schemas with iconName as string
- **spirit-wear.ts**: SpiritWearProduct schema with category enum and optional sizes/URL
- **contact.ts**: SocialLink, ContactData schemas with iconName mapping + contactFormSchema
- **conduct.ts**: ConductSection schema with rules array validation
- **index.ts**: Central export of all schemas

All schemas use Zod 4 `message` parameter syntax (not `errorMap`) with descriptive error messages.

### JSON Data Files

Extracted all data from TypeScript into clean JSON files:
- **teams.json**: 10 teams with 11 coaches and 94 players across 7U-15U divisions
- **fees.json**: 9 age fee tiers, 8 key dates (tryouts through season end), 13 FAQ items
- **organization.json**: 5 board members with bios
- **sponsors.json**: 6 sponsors with descriptions and optional website URLs
- **home.json**: 4 quick links (with iconName strings), 3 key dates, hero content
- **spirit-wear.json**: 8 products across 3 categories, store URL
- **contact.json**: 2 social links (with iconName strings), contact email, donation URL
- **conduct.json**: 4 code of conduct sections (player, parent, coach, spectator)

All JSON files use 2-space indentation for readability.

### TypeScript Wrappers

Converted all `.ts` data files to thin validation wrappers:
- Import JSON file using `resolveJsonModule`
- Import corresponding Zod schema
- Parse JSON with schema validation at import time
- Re-export validated data with same export names
- Re-export types from schemas (single source of truth)

**Icon mapping pattern** for home.ts and contact.ts:
- JSON stores `iconName` as string (`"Users"`, `"Facebook"`, etc.)
- TS wrapper maps iconName to actual Lucide icon component
- QuickLink/SocialLink interfaces in TS include `LucideIcon` type
- Consumers receive fully mapped objects with icon components

## Verification Results

✅ **TypeScript compilation**: Zero errors (`npx tsc --noEmit`)  
✅ **Next.js build**: Successful with all 22 pages generated  
✅ **Component imports**: No changes required (drop-in replacement)  
✅ **Data validation**: All JSON files pass Zod schema validation  
✅ **Icon mapping**: home and contact data properly mapped with Lucide icons

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing functionality] Added contactFormSchema to contact.ts**
- **Found during:** Task 1 - TypeScript compilation check
- **Issue:** ContactForm.tsx was importing `contactFormSchema` and `ContactFormData` which didn't exist yet
- **Fix:** Added contact form validation schema with name, email, phone (optional), subject, message fields
- **Files modified:** src/lib/schemas/contact.ts
- **Commit:** 87fd784 (included in Task 1)

**2. [Rule 1 - Bug] Renamed fees KeyDate schema to avoid type conflict**
- **Found during:** Task 1 - TypeScript compilation check
- **Issue:** Both fees.ts and home.ts exported `KeyDate` and `KeyDateSchema`, causing ambiguous export in schemas/index.ts
- **Fix:** Renamed fees exports to `FeesKeyDate` and `FeesKeyDateSchema` (fees has `id` and `category`, home has simpler structure)
- **Files modified:** src/lib/schemas/fees.ts, src/lib/data/fees.ts
- **Commit:** 87fd784 (included in Task 1)

**3. [Rule 1 - Bug] Fixed Zod 4 enum syntax**
- **Found during:** Task 1 - TypeScript compilation check
- **Issue:** Using Zod 3 `errorMap` parameter instead of Zod 4 `message` parameter for enum error messages
- **Fix:** Changed all `z.enum([...], { errorMap: () => ({ message: '...' }) })` to `z.enum([...], { message: '...' })`
- **Files modified:** src/lib/schemas/teams.ts, src/lib/schemas/fees.ts, src/lib/schemas/spirit-wear.ts
- **Commit:** 87fd784 (included in Task 1)

## Key Decisions

1. **Icon mapping approach**: Store icon names as strings in JSON, map to Lucide components in TS wrappers (icons can't be serialized to JSON)
2. **Schema naming for KeyDate**: Use `FeesKeyDate` for fees (has category field) vs `KeyDate` for home (simpler structure)
3. **Form schema location**: Added `contactFormSchema` to contact.ts schema file (co-located with contact data schema)
4. **Zod parse timing**: Validation happens at import time (fail-fast approach catches data errors immediately)

## Self-Check: PASSED

### Created Files Verification
```
✓ FOUND: src/lib/schemas/teams.ts
✓ FOUND: src/lib/schemas/fees.ts
✓ FOUND: src/lib/schemas/organization.ts
✓ FOUND: src/lib/schemas/sponsors.ts
✓ FOUND: src/lib/schemas/home.ts
✓ FOUND: src/lib/schemas/spirit-wear.ts
✓ FOUND: src/lib/schemas/contact.ts
✓ FOUND: src/lib/schemas/conduct.ts
✓ FOUND: src/lib/schemas/index.ts
✓ FOUND: src/lib/data/teams.json
✓ FOUND: src/lib/data/fees.json
✓ FOUND: src/lib/data/organization.json
✓ FOUND: src/lib/data/sponsors.json
✓ FOUND: src/lib/data/home.json
✓ FOUND: src/lib/data/spirit-wear.json
✓ FOUND: src/lib/data/contact.json
✓ FOUND: src/lib/data/conduct.json
```

### Commits Verification
```
✓ FOUND: 87fd784 (feat(09-01): create Zod schemas for all 8 data types)
✓ FOUND: 699a1d0 (feat(09-01): migrate data to JSON with Zod validation wrappers)
```

All files created and committed successfully.
