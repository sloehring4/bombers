---
phase: 07-spirit-wear
plan: 01
subsystem: spirit-wear
tags: [catalog, e-commerce, product-display, external-store]
dependency_graph:
  requires: [foundation-setup, core-layout]
  provides: [spirit-wear-catalog, product-data, product-components]
  affects: [navigation, home-page]
tech_stack:
  added: []
  patterns: [centralized-data-file, server-components, responsive-grid, external-links, category-badges]
key_files:
  created:
    - src/lib/data/spirit-wear.ts
    - src/components/spirit-wear/ProductCard.tsx
    - src/components/spirit-wear/ProductGrid.tsx
    - src/app/spirit-wear/page.tsx
    - public/images/spirit-wear/placeholder.jpg
  modified: []
decisions:
  - "8 spirit wear products covering 3 categories: apparel (4), headwear (2), accessories (2)"
  - "SPIRIT_WEAR_STORE_URL as constant for easy external store URL updates"
  - "Category badge pattern on products for visual categorization (apparel/headwear/accessories)"
  - "External product links with rel=noopener noreferrer for security"
  - "Optional product.externalUrl field allows product-specific links (fallback to store URL)"
  - "Sizes display as comma-separated list when available"
  - "Buy Now button with ExternalLink icon for clear external navigation"
  - "Section heading with yellow bottom border accent (consistent with fees page pattern)"
  - "Store CTA section with navy background for prominent call-to-action"
metrics:
  duration_minutes: 3.2
  completed_date: 2026-02-16
  tasks_completed: 2
  files_created: 5
  commits: 2
---

# Phase 07 Plan 01: Spirit Wear Catalog Summary

**One-liner:** Spirit wear catalog with 8 products (apparel, headwear, accessories) displayed in responsive grid with external store integration.

## What Was Built

Complete spirit wear catalog system enabling families to browse Bombers merchandise and purchase through an external store.

**Components:**
- **Data Layer:** `spirit-wear.ts` with SpiritWearProduct interface, 8 products (t-shirts, hoodies, jerseys, shorts, caps, visors, water bottles, equipment bags), and store URL constant
- **Display Components:** ProductCard (image, category badge, name, description, price, Buy Now link) and ProductGrid (responsive 1-4 column layout)
- **Page:** `/spirit-wear` with metadata, header, product catalog section, and store CTA
- **Assets:** Placeholder product images

**Product Catalog:**
1. Bombers T-Shirt ($20) - Youth/Adult sizes
2. Bombers Hoodie ($40) - Youth/Adult sizes
3. Bombers Jersey ($35) - Youth/Adult sizes
4. Bombers Shorts ($25) - Youth/Adult sizes
5. Bombers Baseball Cap ($18)
6. Bombers Visor ($15)
7. Bombers Water Bottle ($12)
8. Bombers Equipment Bag ($30)

## How It Works

**Data Flow:**
1. `spiritWearProducts` array exported from centralized data file
2. `SpiritWearPage` imports products and renders ProductGrid
3. ProductGrid maps products to individual ProductCards
4. Each card displays product details with Buy Now link to external store

**Security:**
- All external links include `rel="noopener noreferrer"` for security
- Links open in new tabs (`target="_blank"`)
- Optional per-product URLs with fallback to store URL constant

**Responsive Design:**
- Grid adapts: 1 column (mobile) → 2 (sm) → 3 (lg) → 4 (xl)
- Product images use responsive sizes attribute for optimal loading
- Mobile-friendly card layout with clear pricing and CTAs

## Deviations from Plan

None - plan executed exactly as written. All tasks completed successfully with no bugs, missing functionality, or blocking issues encountered.

## Verification Results

✓ TypeScript compilation passes with no errors
✓ Next.js build succeeds with /spirit-wear page in static export
✓ All external links have `rel="noopener noreferrer"` and `target="_blank"`
✓ Product catalog displays 8 products with images, names, descriptions, prices, category badges
✓ Each ProductCard has Buy Now link opening external store
✓ Responsive grid adapts from 1-4 columns
✓ Store CTA section provides prominent link to external catalog
✓ Page exports SEO metadata
✓ All components are server components (no 'use client' directives)
✓ Placeholder image exists at public/images/spirit-wear/placeholder.jpg

## Task Breakdown

| Task | Name | Status | Commit | Files |
|------|------|--------|--------|-------|
| 1 | Create spirit wear data file and display components | ✓ Complete | decea9f | spirit-wear.ts, ProductCard.tsx, ProductGrid.tsx, placeholder.jpg |
| 2 | Compose Spirit Wear page at /spirit-wear | ✓ Complete | 549127b | page.tsx |

## Key Technical Decisions

1. **Centralized data file pattern:** Following established pattern from sponsors.ts and fees.ts for type-safe product data
2. **Category badges:** Visual categorization using navy/10 background with uppercase tracking
3. **External link security:** All store links use noopener noreferrer to prevent security vulnerabilities
4. **Optional product URLs:** Flexibility to link to specific product pages while maintaining store-wide fallback
5. **Sizes as optional field:** Not all products have sizes (accessories don't), so field is optional with conditional rendering
6. **Server components only:** No client-side JavaScript needed - all data is static and links are standard anchor tags

## Success Criteria Met

✓ Product catalog displays 6-8 products with images, names, descriptions, prices, and category badges
✓ Each product card has a Buy Now link opening external store in new tab with security attributes
✓ Responsive grid adapts from 1 column (mobile) to 4 columns (xl screens)
✓ Store CTA section provides prominent link to browse full external catalog
✓ Page has proper SEO metadata
✓ All components compile without TypeScript errors
✓ Next.js build succeeds with /spirit-wear page in static export

## Self-Check

Verifying all claimed files and commits exist:

**Files:**
✓ FOUND: src/lib/data/spirit-wear.ts
✓ FOUND: src/components/spirit-wear/ProductCard.tsx
✓ FOUND: src/components/spirit-wear/ProductGrid.tsx
✓ FOUND: src/app/spirit-wear/page.tsx
✓ FOUND: public/images/spirit-wear/placeholder.jpg

**Commits:**
✓ FOUND: decea9f
✓ FOUND: 549127b

**Result:** PASSED - All claimed files and commits verified successfully.
