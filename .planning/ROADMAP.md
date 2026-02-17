# Roadmap: O'Fallon Bombers Website

## Overview

This roadmap transforms a cluttered 20+ page JerseyWatch site into a clean, modern 7-page static website that parents can quickly navigate. Starting with project foundation and core infrastructure, we'll build the highest-traffic section (teams & rosters), then add organization info, fees/registration, and supporting sections. The journey ends with content management tooling and deployment, ensuring board members can maintain the site independently.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Setup** - Next.js project with Tailwind, branding, and mobile-responsive base layout
- [ ] **Phase 2: Core Layout & Navigation** - Site-wide header, footer, and simplified navigation structure
- [ ] **Phase 3: Home Page** - Landing page with hero, quick links, and key information
- [ ] **Phase 4: Teams & Rosters System** - Team listing and individual roster pages with player/coach data
- [ ] **Phase 5: Organization Pages** - About, board/staff, code of conduct, and sponsor sections
- [ ] **Phase 6: Fees & Events** - Season fees, registration info, key dates, and FAQ
- [ ] **Phase 7: Spirit Wear** - Product catalog preview and external store links
- [ ] **Phase 8: Contact & Social** - Contact form, social links, donation link, and social feed embeds
- [ ] **Phase 9: Content Management System** - JSON data structure and update documentation
- [ ] **Phase 10: Deployment & Documentation** - Vercel deployment, domain setup, and board member guide
- [ ] **Phase 11: Performance & SEO** - Optimization, SEO metadata, and final polish

## Phase Details

### Phase 1: Foundation & Setup
**Goal**: Project infrastructure is ready with branding, mobile-first design, and static generation
**Depends on**: Nothing (first phase)
**Requirements**: FOUN-01, FOUN-02, FOUN-04
**Success Criteria** (what must be TRUE):
  1. Next.js project builds and exports static HTML successfully
  2. Tailwind CSS is configured with Bombers yellow (#feda00) and navy (#0a0047) colors
  3. Mobile-responsive base layout works correctly on phone screens
  4. Site loads quickly (static files, no server runtime)
**Plans:** 1 plan

Plans:
- [ ] 01-01-PLAN.md — Scaffold Next.js with static export, Bombers branding, and mobile-first base components

### Phase 2: Core Layout & Navigation
**Goal**: Site-wide layout structure with simplified navigation is functional across all pages
**Depends on**: Phase 1
**Requirements**: FOUN-03
**Success Criteria** (what must be TRUE):
  1. Header with logo and navigation menu appears on all pages
  2. Footer with essential links appears on all pages
  3. Navigation includes ~7 core pages (Home, Teams, About, Fees & Events, Spirit Wear, Contact)
  4. Mobile hamburger menu works correctly on small screens
  5. Navigation active state highlights current page
**Plans:** 2 plans

Plans:
- [ ] 02-01-PLAN.md — Header with responsive navigation (NavLinks, MobileMenu, navigation config)
- [ ] 02-02-PLAN.md — Footer and root layout integration with visual verification

### Phase 3: Home Page
**Goal**: Engaging landing page provides quick access to most-used sections
**Depends on**: Phase 2
**Requirements**: (No specific requirements, but supports all content sections as entry point)
**Success Criteria** (what must be TRUE):
  1. Hero section displays Bombers branding with compelling headline and visual
  2. Quick links to Teams, Fees, Spirit Wear, and Contact are prominently displayed
  3. Key information (next tryout date, registration deadline) is visible without scrolling
  4. Page communicates athletic energy and clean design
**Plans:** 2 plans

Plans:
- [ ] 03-01-PLAN.md — Install lucide-react, create home page data file, and build Hero component
- [ ] 03-02-PLAN.md — Build QuickLinkCard, QuickLinks, AnnouncementBanner, and compose home page

### Phase 4: Teams & Rosters System
**Goal**: Parents can view all age groups and access detailed rosters for each team
**Depends on**: Phase 3
**Requirements**: TEAM-01, TEAM-02, TEAM-03, TEAM-04
**Success Criteria** (what must be TRUE):
  1. Teams overview page displays all age groups (7U-15U) in a grid layout
  2. Clicking an age group navigates to that team's roster page
  3. Roster pages show player names, jersey numbers, and positions
  4. Coach names and photos/bios appear on roster pages
  5. Team photos display correctly on roster pages
**Plans:** 3 plans

Plans:
- [ ] 04-01-PLAN.md — Team data types/sample data and teams overview page with age group grouping
- [ ] 04-02-PLAN.md — Dynamic roster pages with RosterTable, CoachCard, and generateStaticParams
- [ ] 04-03-PLAN.md — Gap closure: placeholder images, coach bios (TEAM-04), and 15U team data

### Phase 5: Organization Pages
**Goal**: Families can learn about the Bombers organization, leadership, and values
**Depends on**: Phase 4
**Requirements**: ORG-01, ORG-02, ORG-03, ORG-04
**Success Criteria** (what must be TRUE):
  1. About page describes Bombers mission, history, and organization structure
  2. Board of directors and coaching staff are listed with names and roles
  3. Code of conduct and sportsmanship values are accessible (page section or PDF)
  4. Sponsor logos display prominently on relevant pages
**Plans:** 2 plans

Plans:
- [ ] 05-01-PLAN.md — Data layer and reusable components (organization/sponsor/conduct data, Accordion, BoardMemberCard, SponsorCard, SponsorGrid)
- [ ] 05-02-PLAN.md — Organization pages (About, Board/Staff, Code of Conduct, Sponsors), home page sponsors section, and navigation update

### Phase 6: Fees & Events
**Goal**: Parents can find season costs, key dates, and registration information
**Depends on**: Phase 5
**Requirements**: FEES-01, FEES-02, FEES-03, FEES-04
**Success Criteria** (what must be TRUE):
  1. Season fee breakdown displays for each age group
  2. Key dates (tryouts, season start, tournament schedule) are clearly listed
  3. Registration section includes embedded JerseyWatch registration form/link
  4. FAQ section answers common parent questions about fees, tryouts, and season structure
**Plans:** 2 plans

Plans:
- [ ] 06-01-PLAN.md — Data layer (fees, dates, FAQ) and section components (FeeCard, EventList, RegistrationCTA)
- [ ] 06-02-PLAN.md — Compose Fees & Events page at /fees with all sections and FAQ accordion

### Phase 7: Spirit Wear
**Goal**: Families can browse spirit wear products and access the purchase store
**Depends on**: Phase 6
**Requirements**: SPRT-01, SPRT-02
**Success Criteria** (what must be TRUE):
  1. Spirit wear catalog preview displays product images and descriptions
  2. "Buy Now" links navigate to external spirit wear store
**Plans:** 1 plan

Plans:
- [ ] 07-01-PLAN.md — Spirit wear data layer, ProductCard/ProductGrid components, and /spirit-wear page with catalog and store CTA

### Phase 8: Contact & Social
**Goal**: Families can contact the organization and connect via social media
**Depends on**: Phase 7
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04
**Success Criteria** (what must be TRUE):
  1. Contact form submits successfully to ofallonbombers@gmail.com
  2. Social media icons link correctly to Facebook and Instagram pages
  3. Donation link navigates to donation page/form
  4. Embedded social media feed displays recent Facebook or Instagram posts
**Plans**: TBD

Plans:
- [ ] 08-01: TBD
- [ ] 08-02: TBD

### Phase 9: Content Management System
**Goal**: Board members can update rosters, events, and fees without code changes
**Depends on**: Phase 8
**Requirements**: MGMT-01, MGMT-02
**Success Criteria** (what must be TRUE):
  1. JSON data files exist for rosters, events, fees, and staff with clear structure
  2. Content update guide documents how to edit JSON files for common tasks
  3. Board members can add/update player rosters by editing JSON and redeploying
  4. Board members can update event dates and fees without developer assistance
**Plans**: TBD

Plans:
- [ ] 09-01: TBD
- [ ] 09-02: TBD

### Phase 10: Deployment & Documentation
**Goal**: Site is live on custom domain with clear maintenance instructions
**Depends on**: Phase 9
**Requirements**: (No specific requirements, but enables all features to go live)
**Success Criteria** (what must be TRUE):
  1. Site deploys successfully to Vercel free tier
  2. Custom domain (ofallonbombers.com) points to deployed site
  3. Board member guide explains how to update content and redeploy
  4. Deployment process is documented with step-by-step instructions
**Plans**: TBD

Plans:
- [ ] 10-01: TBD
- [ ] 10-02: TBD

### Phase 11: Performance & SEO
**Goal**: Site loads fast, ranks well in search, and provides excellent user experience
**Depends on**: Phase 10
**Requirements**: (No specific requirements, but optimizes all previous work)
**Success Criteria** (what must be TRUE):
  1. Page load times are under 2 seconds on mobile and desktop
  2. SEO metadata (titles, descriptions, Open Graph tags) is present on all pages
  3. Images are optimized and lazy-loaded where appropriate
  4. Site passes Google Lighthouse performance audit (90+ score)
  5. Mobile usability issues are resolved
**Plans**: TBD

Plans:
- [ ] 11-01: TBD
- [ ] 11-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Setup | 0/1 | Not started | - |
| 2. Core Layout & Navigation | 0/TBD | Not started | - |
| 3. Home Page | 0/2 | Not started | - |
| 4. Teams & Rosters System | 0/2 | Not started | - |
| 5. Organization Pages | 0/2 | Not started | - |
| 6. Fees & Events | 0/TBD | Not started | - |
| 7. Spirit Wear | 0/TBD | Not started | - |
| 8. Contact & Social | 0/TBD | Not started | - |
| 9. Content Management System | 0/TBD | Not started | - |
| 10. Deployment & Documentation | 0/TBD | Not started | - |
| 11. Performance & SEO | 0/TBD | Not started | - |
