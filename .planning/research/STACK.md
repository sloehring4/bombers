# Stack Research: Youth Baseball Association Website

## Recommended Stack

### Framework: Next.js 14+ (Static Export)
- **Why**: React-based, generates static HTML, zero runtime server costs
- **Hosting**: Deploy to Vercel (free tier), Netlify (free tier), or GitHub Pages
- **Confidence**: High

### Styling: Tailwind CSS 3.4+
- **Why**: Utility-first CSS, fast to build responsive layouts, easy to maintain brand colors as theme tokens
- **Confidence**: High

### Content Management: Markdown files + JSON data
- **Why**: Non-technical board members can edit simple structured files (roster JSON, event lists) without a CMS. For a site this size, a full CMS is overkill.
- **Alternative considered**: Headless CMS (Contentful, Sanity) — free tiers exist but add complexity and external dependency
- **Alternative considered**: Google Sheets as data source — familiar to volunteers but brittle integration
- **Best approach**: JSON data files in the repo for structured content (rosters, events, fees). Board members can edit via GitHub's web UI or a simple admin approach.
- **Confidence**: Medium-High (depends on board comfort with editing JSON/markdown)

### Deployment: Vercel (free tier)
- **Why**: Zero-config Next.js deployment, free for personal/hobby projects, automatic HTTPS, custom domain support
- **Alternative**: Netlify (equivalent free tier), GitHub Pages (more limited)
- **Confidence**: High

### Images/Assets: Local assets + Next.js Image optimization
- **Why**: Team photos, logos, spirit wear images stored in repo. Next.js handles optimization automatically.
- **Confidence**: High

## What NOT to Use

| Technology | Why Not |
|-----------|---------|
| WordPress | Requires hosting costs, PHP server, security patches, overkill for a static content site |
| JerseyWatch | What they're replacing — cluttered, limited design control |
| Full CMS (Contentful, Strapi) | Adds external dependency and complexity for a simple site |
| Database (PostgreSQL, MongoDB) | No dynamic data needed — all content is static/seasonal |
| Server-side rendering | No need — content changes seasonally, not in real-time |
| React SPA without SSG | Poor SEO, slower initial load |

## Cost Analysis

| Item | Monthly Cost |
|------|-------------|
| Vercel hosting (free tier) | $0 |
| Custom domain (ofallonbombers.com) | ~$12/year |
| **Total** | **~$1/month** |

## Version Recommendations

| Package | Version | Notes |
|---------|---------|-------|
| Next.js | 14.x or 15.x | Static export mode |
| React | 18.x or 19.x | Matches Next.js version |
| Tailwind CSS | 3.4+ | Stable, well-documented |
| TypeScript | 5.x | Type safety for data structures |
