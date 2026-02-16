# Research Summary: O'Fallon Bombers Website

## Stack Decision

**Next.js (static export) + Tailwind CSS + JSON data files → Vercel free tier**

This gives a fast, modern, zero-cost site. Content lives in JSON files that board members can edit. No database, no server, no CMS to maintain.

**Cost: ~$1/month** (domain renewal only, hosting is free)

## Table Stakes Features

1. Team rosters by age group (7U–15U) — the #1 reason families visit
2. Season fees and registration info
3. Contact information and form
4. Mobile-responsive design
5. About the organization (board, staff, mission)
6. Event/schedule information (tryouts, tournaments)

## Key Architecture Decisions

- **Consolidate 20+ pages → ~7 pages** (Home, Teams, Teams/[slug], About, Fees & Events, Spirit Wear, Contact)
- **JSON data files** in `/data/` folder for all structured content (rosters, events, fees, staff)
- **Static generation** — no server runtime, everything is pre-built HTML
- **Component-based** — reusable TeamCard, RosterTable, EventList, etc.

## Top Pitfalls to Avoid

1. **Content update bottleneck** — Must create clear documentation so board members can edit JSON files independently
2. **Roster data management** — Design the data structure carefully; 16+ teams is a lot of data to manage
3. **Mobile neglect** — Parents check from baseball fields; mobile-first is essential
4. **Over-engineering** — No database, no CMS, no admin panel. Static files are enough for seasonal content
5. **Spirit wear trap** — Link to external store, don't build e-commerce

## Build Order

1. Foundation (Next.js, Tailwind, layout, nav, brand colors)
2. Home page (hero, quick links)
3. Teams system (data structure, listing, individual rosters)
4. Info pages (about, fees/events, spirit wear, contact)
5. Polish (responsive, SEO, performance)
6. Deploy (Vercel, custom domain, content guide for board members)
