# O'Fallon Bombers Baseball Website

A clean, modern website for the O'Fallon Bombers select youth baseball club serving ages 7U through 15U. Built with Next.js 16 and deployed on Vercel with an automated CI/CD pipeline.

## For Board Members

If you're a board member looking to update content or manage the site:

- **[Content Update Guide](docs/CONTENT-UPDATE-GUIDE.md)** — How to edit rosters, events, fees, sponsors, and all site content using GitHub's web editor
- **[Operations Guide](docs/OPERATIONS_GUIDE.md)** — Deployment setup, troubleshooting, rollback procedures, and who to contact for help

These guides are written for non-technical users. No coding experience required.

## Tech Stack

- **Next.js 16** — React framework with static site generation
- **Tailwind CSS v4** — Utility-first CSS with OKLCH color space
- **TypeScript** — Type-safe development
- **Zod** — Runtime validation for JSON data files
- **Vercel** — Hosting with automatic deployments on push to main

## Development

Prerequisites: Node.js 18+ and npm

```bash
# Install dependencies
npm install

# Start development server at http://localhost:3000
npm run dev

# Build static site for production
npm run build

# Validate JSON data files
npm run validate:data
```

## Project Structure

```
bombers/
├── src/
│   ├── app/              # Next.js pages and routes
│   ├── components/       # Reusable UI components
│   ├── lib/
│   │   ├── data/        # JSON data files (editable by board members)
│   │   └── schemas/     # Zod validation schemas
│   └── styles/          # Tailwind CSS configuration
├── docs/                # Documentation for board members
├── scripts/             # Validation and utility scripts
└── public/              # Static assets (images, logos)
```

## Content Workflow

The site uses a **validation-first content workflow** designed for non-technical board members:

1. **Edit JSON files** in `src/lib/data/` using GitHub's web editor
2. **Create a pull request** to propose the changes
3. **CI validates** the JSON automatically (catches errors before they go live)
4. **Preview deployment** is created with a temporary URL to verify changes
5. **Merge the PR** to deploy changes to production
6. **Site auto-deploys** to https://ofallonbombers.com (2-3 minutes)

For detailed instructions, see the [Content Update Guide](docs/CONTENT-UPDATE-GUIDE.md).

## Key Features

- **Static site generation** — Fast page loads with pre-rendered HTML
- **Type-safe data** — Zod schemas validate all content at build time
- **Responsive design** — Mobile-first with tablet and desktop breakpoints
- **Accessible** — WCAG 2.1 compliant with ARIA labels and keyboard navigation
- **Form integration** — Contact form uses Web3Forms for email delivery
- **Zero runtime dependencies** — No client-side data fetching

## Deployment

The site is configured for **automatic deployment** on Vercel:

- **Production:** Deploys automatically when changes are merged to the `main` branch
- **Preview:** Every pull request gets a preview deployment for testing
- **Domain:** Custom domain configured at https://ofallonbombers.com

For deployment setup and troubleshooting, see the [Operations Guide](docs/OPERATIONS_GUIDE.md).

## License

Copyright © 2026 O'Fallon Bombers Baseball Club. All rights reserved.
