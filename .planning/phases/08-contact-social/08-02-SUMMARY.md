---
phase: 08-contact-social
plan: 02
subsystem: contact
tags: [contact-page, social-feed, footer-enhancement, seo, responsive-layout]
dependency_graph:
  requires:
    - ContactForm (08-01)
    - SocialLinks (08-01)
    - contact data layer (08-01)
    - lucide-react (existing)
  provides:
    - SocialFeed component
    - /contact page route
    - Enhanced footer with icons
  affects:
    - Footer displayed on all pages
    - Contact page accessible from navigation
tech_stack:
  added: []
  patterns:
    - "Production-ready placeholder pattern for third-party embeds"
    - "Two-column responsive layout collapsing to single column on mobile"
    - "Yellow bottom border accent for section headings"
    - "External link with target='_blank' and rel='noopener noreferrer'"
    - "Flex items-center gap pattern for icon-text pairs"
key_files:
  created:
    - src/components/contact/SocialFeed.tsx: "Social media feed placeholder with direct follow CTAs"
    - src/app/contact/page.tsx: "Complete contact page composing all contact components"
  modified:
    - src/components/layout/Footer.tsx: "Added social media icons to Follow Us links"
decisions:
  - what: "Production-ready placeholder for social feed"
    why: "Third-party embeds require account setup; placeholder provides immediate value with direct social links"
    alternatives: ["Empty state", "Embed with setup instructions", "Skip section entirely"]
  - what: "Two-column layout (form left, aside right)"
    why: "Form is primary action, side content provides alternative contact methods"
    alternatives: ["Single column stacked", "Three column", "Tabs"]
  - what: "Heart icon for donation section"
    why: "Conveys emotional appeal and community support better than Gift icon"
    alternatives: ["Gift icon", "DollarSign icon", "No icon"]
  - what: "Icons in footer social links"
    why: "Improves visual recognition and consistency with SocialLinks component"
    alternatives: ["Text only", "Icon only", "Icon after text"]
metrics:
  duration: "2m 3s"
  tasks_completed: 2
  files_created: 2
  files_modified: 1
  commits: 2
  completed_at: "2026-02-17"
---

# Phase 08 Plan 02: Contact Page Integration & Social Feed Summary

**One-liner:** Complete /contact page with form, email, social links, donation CTA, social feed placeholder, and enhanced footer with social icons.

## Overview

Built the complete contact page that composes all contact components from Plan 01. Created a production-ready SocialFeed component with an attractive placeholder design and direct social media CTAs (ready for future embed widget integration). Enhanced the footer with Facebook and Instagram icons for better visual recognition. The contact page uses a responsive two-column layout with the form on the left and additional contact options in a sidebar on the right, collapsing to single column on mobile.

## Tasks Completed

### Task 1: Create SocialFeed component and compose /contact page
**Commit:** `cb52421`

**SocialFeed Component (src/components/contact/SocialFeed.tsx):**
- Server component with production-ready placeholder design
- Section heading "Follow Our Journey" with yellow bottom border accent
- Card-style container: bg-gray-50, rounded-lg, border-2 border-gray-200, p-8
- Icon row: Facebook and Instagram icons at w-12 h-12 in bombers-navy
- Descriptive text encouraging social media follows
- Two CTA buttons:
  - "Follow on Facebook": bg-bombers-navy text-white
  - "Follow on Instagram": bg-bombers-yellow text-bombers-navy
  - Both with hover transitions and external link properties
- HTML comment marking where third-party embed widget code should be inserted
- Imports socialLinks from centralized contact data

**Contact Page (src/app/contact/page.tsx):**
- Exported metadata: title "Contact Us | O'Fallon Bombers Baseball", description
- Imported components: ContactForm, SocialLinks, SocialFeed
- Imported data: CONTACT_EMAIL, DONATION_URL from contact data
- Imported icons: Mail, Heart, ExternalLink from lucide-react

Page structure:
- Page header: h1 "Contact Us", subtitle paragraph
- Two-column grid (grid-cols-1 lg:grid-cols-2, gap-8, mb-12):
  - **Left column:** "Send Us a Message" heading + ContactForm
  - **Right column (aside, space-y-8):**
    - "Email Us Directly": Mail icon + mailto link to CONTACT_EMAIL, helper text
    - "Connect With Us": SocialLinks component
    - "Support Our Team": Heart icon + description + donation CTA button with ExternalLink icon
- Full-width SocialFeed section below grid
- All section headings: text-2xl font-semibold text-bombers-navy mb-4 border-b-4 border-bombers-yellow pb-2 inline-block

**Files created:**
- src/components/contact/SocialFeed.tsx
- src/app/contact/page.tsx

### Task 2: Enhance footer with social media icons
**Commit:** `2d65f77`

- Imported Facebook and Instagram from lucide-react
- Updated Follow Us section (Column 3):
  - Added `flex items-center gap-2` to link className
  - Added Facebook icon before "Facebook" text (w-4 h-4, aria-hidden="true")
  - Added Instagram icon before "Instagram" text (w-4 h-4, aria-hidden="true")
  - Added aria-label attributes for accessibility: "Visit our Facebook page", "Visit our Instagram page"
- Preserved all existing footer structure, links, and styling
- Footer remains a server component (lucide-react icons are SVG, no client JS)

**Files modified:**
- src/components/layout/Footer.tsx

## Verification Results

All verification criteria met:
- `npx tsc --noEmit` passed with no errors
- `npm run build` succeeded without errors
- /contact route appears in build output as static route
- Contact page imports and renders ContactForm, SocialLinks, SocialFeed
- Contact page exports metadata with title and description
- Donation link points to DONATION_URL with target="_blank" and rel="noopener noreferrer"
- Footer social links have lucide-react icons with aria-hidden="true"
- Footer social links have aria-label for screen readers
- All section headings use consistent yellow border-b-4 accent

## Deviations from Plan

None - plan executed exactly as written.

## Integration Notes

**Contact Page Route:**
The /contact page is now fully functional and accessible from the navigation menu (link already exists in Header and Footer from Phase 02).

**Social Feed Widget Integration:**
When the organization sets up a third-party social feed service (EmbedSocial or SociableKIT):
1. Sign up for service and configure feed
2. Copy embed widget code
3. Open `src/components/contact/SocialFeed.tsx`
4. Find the HTML comment marking the insertion point
5. Paste widget code after the comment, inside the `<section>` tag
6. Optionally remove or hide the placeholder div (keep heading)

**Donation URL:**
The DONATION_URL in `src/lib/data/contact.ts` is currently a placeholder: `https://paypal.me/ofallonbombers`. Update this with the actual donation link when ready.

## Success Criteria Met

- Contact page at /contact with all four requirement areas:
  - CONT-01: Contact form (from Plan 01, composed here)
  - CONT-02: Social links (from Plan 01, composed here)
  - CONT-03: Donation link with external CTA button
  - CONT-04: Social feed section (production-ready placeholder)
- SEO metadata on contact page (title and description)
- Footer enhanced with social media icons (affects all pages)
- Production-ready social feed section (works without third-party account)
- Build passes cleanly with /contact route generated as static page
- Two-column responsive layout collapses to single column on mobile
- All section headings use yellow border accent pattern

## What's Next

**Phase 09:** Image Optimization & Placeholders
- Replace all placeholder images with actual team photos or optimized placeholders
- Implement responsive image loading with Next.js Image component
- Set up image optimization pipeline

## Self-Check: PASSED

All files verified:
- FOUND: src/components/contact/SocialFeed.tsx
- FOUND: src/app/contact/page.tsx
- FOUND: src/components/layout/Footer.tsx

All commits verified:
- FOUND: cb52421
- FOUND: 2d65f77
