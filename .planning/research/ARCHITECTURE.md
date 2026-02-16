# Architecture Research: Youth Baseball Association Website

## Site Structure (Simplified)

The current site has 20+ pages. The redesign should consolidate to ~6-8 pages max.

### Proposed Page Structure

```
/                     → Home (hero, quick links to key sections, announcements)
/teams                → All teams overview (age groups grid)
/teams/[age-group]    → Individual team roster (e.g., /teams/10u-black)
/about                → Organization info, board, coaching staff, mission
/fees-and-events      → Season fees, registration, upcoming events/tryouts
/spirit-wear          → Spirit wear catalog or link to external store
/contact              → Contact form, email, social links, location
```

### Content vs. Current Site Mapping

| Current Site Pages | New Site Location |
|-------------------|-------------------|
| 16+ individual roster pages | `/teams` + `/teams/[slug]` (dynamic routes) |
| Club Fees & Events | `/fees-and-events` |
| Spirit Wear | `/spirit-wear` |
| Code of Conduct | `/about` (section or downloadable PDF) |
| Pillars of Sportsmanship | `/about` (section or downloadable PDF) |
| Board of Directors | `/about` (section) |
| Director of Player Development | `/about` (section) |
| Bombers Blast | Remove (external newsletter) |
| Links | Remove (consolidate relevant links into other pages) |
| Contact | `/contact` |
| Donation | `/contact` or `/about` (section with donation link) |

## Component Architecture

```
Layout (shared)
├── Header (logo, nav, mobile menu)
├── Footer (contact info, social links, copyright)
└── Page Content

Data Layer
├── /data/teams.json        → All team rosters, coaches, age groups
├── /data/events.json       → Season events, tryout dates
├── /data/fees.json         → Fee structure by age group
├── /data/board.json        → Board members, staff
└── /data/site.json         → Site-wide config (contact, social links)

Components
├── TeamCard               → Team preview in grid
├── RosterTable            → Player list for a team
├── EventList              → Upcoming events display
├── FeeTable               → Fee breakdown
├── ContactForm            → Contact form (external service like Formspree)
├── Hero                   → Homepage hero section
├── StaffCard              → Board/coach profile card
└── SocialLinks            → Social media icons
```

## Data Flow

```
JSON data files → Next.js static generation → Static HTML pages → Vercel CDN → User's browser
                                                                      ↑
Board members edit JSON files → Git commit → Auto-deploy trigger ─────┘
```

## Build Order (Dependencies)

1. **Foundation** — Next.js setup, Tailwind config, brand colors, layout (header/footer/nav)
2. **Home page** — Hero section, quick navigation links
3. **Teams system** — Data structure, team listing page, individual roster pages
4. **Info pages** — About, fees/events, spirit wear, contact
5. **Polish** — Responsive refinement, SEO, performance, favicon/meta
6. **Deployment** — Vercel setup, custom domain, final testing
