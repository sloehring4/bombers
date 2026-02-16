# Phase 1: Foundation & Setup - Research

**Researched:** 2026-02-16
**Domain:** Next.js static site generation with Tailwind CSS
**Confidence:** HIGH

## Summary

Phase 1 establishes the technical foundation for the Bombers baseball organization website. The standard stack is Next.js 16 (latest stable: 16.1.6) with Tailwind CSS v4 (latest: 4.1), using static HTML export for fast loading and simple deployment. The current ecosystem strongly favors TypeScript with pnpm for package management, prioritizing long-term maintainability over initial learning curve.

The mobile-first design requirement aligns perfectly with modern web standards - bottom navigation patterns, thumb-zone optimization, and progressive enhancement from mobile to desktop. Tailwind v4's CSS-first configuration (@theme directive) simplifies color customization for the Bombers brand (yellow #feda00, navy #0a0047).

For non-technical board members, Markdown content with a git-based CMS (like Decap CMS or TinaCMS) provides the best balance - content lives in readable files, changes are version-controlled automatically, and editors get a visual interface without needing to understand code.

**Primary recommendation:** Use create-next-app with defaults (TypeScript, Tailwind, App Router, pnpm), add `output: 'export'` to next.config.js, configure custom brand colors in @theme, and implement mobile-first with bottom navigation pattern.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
**Branding & visual identity:**
- Design feel: Friendly and approachable — warm, inviting, feels like a community organization parents trust
- Primary colors: Bombers yellow (#feda00) and navy (#0a0047) only — Claude derives grays, backgrounds, and accent shades from these two
- Logo: User will provide a logo file (SVG/PNG) — build with logo placeholder that can be swapped in
- No dark mode — light theme only

**Mobile layout approach:**
- Audience: Mix of phone and desktop — parents check rosters/dates on phones at the field, use desktop at home for registration
- Mobile should feel app-like — smooth, fast, thumb-friendly
- Low-connectivity is nice-to-have — fast loading and caching help but no full offline/service worker needed

**Project conventions:**
- Board members who maintain the site are not technical at all — content editing must be as simple as possible
- Data format, language (TS vs JS), and package manager are Claude's discretion, optimized for non-technical maintainability

### Claude's Discretion
- Typography selection (should match friendly/approachable feel)
- Mobile vs desktop content strategy (what to show/hide)
- Breakpoint strategy (2 vs 3 breakpoints)
- Layout width approach (full-width sections vs centered)
- Animation/transition approach (should support app-like feel)
- Accessibility level (standard best practices minimum)
- Design token depth for Phase 1 (enough for consistency without over-engineering)
- Button color hierarchy (yellow vs navy for primary/secondary)
- Corner styles and shape language (should reinforce friendly feel)
- Data storage format (JSON vs markdown — optimize for non-technical editors)
- TypeScript vs JavaScript
- Package manager choice
- Component organization and folder structure

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | React framework, static export | Industry standard for static sites, excellent DX, built-in optimization |
| React | 19 (canary) | UI library | Next.js App Router uses React 19 features (Server Components) |
| Tailwind CSS | 4.1 | Utility-first CSS | v4 simplifies theme config with @theme, OKLCH colors, no JS config needed |
| TypeScript | 5.1+ | Type safety | Default in Next.js 16, catches errors early, better maintainability |
| pnpm | 9.x | Package manager | Fastest installs, disk space efficient, monorepo-ready if needed later |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/font | Built-in | Font optimization | Automatic for Google Fonts, prevents layout shift |
| next/image | Built-in | Image optimization | Use with custom loader for static export |
| ESLint | 9.x | Code quality | Default Next.js setup, catches common mistakes |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| TypeScript | JavaScript | TS adds learning curve but prevents errors non-technical users might introduce |
| pnpm | npm | npm is more familiar but 40-60% slower on installs, wastes disk space |
| Tailwind v4 | Tailwind v3 | v3 more stable but v4's CSS config is simpler (no JS file) |
| App Router | Pages Router | Pages Router more stable but App Router is the future, better for SSG |

**Installation:**
```bash
pnpm create next-app@latest bombers --yes
cd bombers
pnpm install
```

The `--yes` flag uses defaults: TypeScript, Tailwind CSS 4, ESLint, App Router, Turbopack, with `@/*` import alias.

## Architecture Patterns

### Recommended Project Structure
```
bombers/
├── public/
│   ├── logo.svg              # Bombers logo (placeholder until user provides)
│   └── images/               # Static images
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout (font, metadata, base structure)
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Tailwind imports + @theme config
│   ├── components/
│   │   ├── ui/               # Reusable primitives (Button, Card, etc)
│   │   └── layout/           # Layout components (Header, Footer, Nav)
│   └── lib/
│       └── fonts.ts          # Font configuration
└── content/                  # Markdown/JSON content files (future)
```

### Pattern 1: Static Export Configuration
**What:** Configure Next.js to output pure HTML/CSS/JS with no server runtime
**When to use:** Always for this project (requirement FOUN-04)
**Example:**
```typescript
// next.config.ts
// Source: https://nextjs.org/docs/pages/guides/static-exports
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',

  // Optional: Change output folder from 'out' to 'dist'
  // distDir: 'dist',

  // Optional: Add trailing slashes for cleaner URLs
  // trailingSlash: true,
};

export default nextConfig;
```

### Pattern 2: Tailwind v4 Brand Color Configuration
**What:** Use @theme directive to define custom colors (no tailwind.config.js needed)
**When to use:** Always for custom brand colors
**Example:**
```css
/* src/app/globals.css */
/* Source: https://tailwindcss.com/docs/theme */
@import "tailwindcss";

@theme {
  /* Bombers brand colors */
  --color-bombers-yellow: #feda00;
  --color-bombers-navy: #0a0047;

  /* Derived shades (generated from brand colors) */
  --color-yellow-50: oklch(0.99 0.02 95);
  --color-yellow-100: oklch(0.97 0.05 95);
  --color-yellow-500: oklch(0.90 0.15 95);  /* #feda00 in OKLCH */
  --color-yellow-600: oklch(0.75 0.14 95);
  --color-yellow-700: oklch(0.60 0.12 95);

  --color-navy-50: oklch(0.95 0.01 270);
  --color-navy-100: oklch(0.90 0.02 270);
  --color-navy-500: oklch(0.20 0.05 270);   /* #0a0047 in OKLCH */
  --color-navy-600: oklch(0.15 0.04 270);
  --color-navy-900: oklch(0.10 0.03 270);
}
```

**Generated utilities:** `bg-bombers-yellow`, `text-bombers-navy`, `border-yellow-500`, etc.

### Pattern 3: Mobile-First Responsive Design
**What:** Design for mobile first, progressively enhance for larger screens
**When to use:** All components and layouts
**Example:**
```tsx
// Source: Next.js responsive design best practices
export default function Header() {
  return (
    <header className="
      px-4 py-3                    /* Mobile: compact padding */
      md:px-6 md:py-4              /* Tablet: more breathing room */
      lg:px-8 lg:py-5              /* Desktop: generous padding */
    ">
      <nav className="
        flex items-center justify-between
        max-w-7xl mx-auto           /* Center on large screens */
      ">
        {/* Logo, nav items */}
      </nav>
    </header>
  );
}
```

**Recommended breakpoints:**
- Mobile: 0-768px (default, no prefix)
- Tablet: 768-1024px (`md:`)
- Desktop: 1024px+ (`lg:`)

### Pattern 4: Bottom Navigation (Thumb-Friendly)
**What:** Place primary navigation at bottom of screen on mobile for easy thumb reach
**When to use:** Mobile navigation for main site sections
**Example:**
```tsx
// Source: Mobile navigation patterns 2026
export default function MobileNav() {
  return (
    <nav className="
      md:hidden                    /* Hide on tablet/desktop */
      fixed bottom-0 left-0 right-0
      bg-white border-t border-gray-200
      safe-area-inset-bottom       /* Account for iOS home indicator */
    ">
      <div className="flex justify-around py-2">
        {/* 4-5 primary nav items with icons */}
      </div>
    </nav>
  );
}
```

### Pattern 5: Next.js Font Optimization
**What:** Use next/font to load Google Fonts with zero layout shift
**When to use:** All font loading
**Example:**
```typescript
// src/lib/fonts.ts
// Source: https://nextjs.org/docs/app/getting-started/fonts
import { Inter, Poppins } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});
```

```tsx
// app/layout.tsx
import { inter, poppins } from '@/lib/fonts';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

### Pattern 6: Image Optimization for Static Export
**What:** Configure custom image loader since Next.js default requires server
**When to use:** When using next/image with static export
**Example:**
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,  // Simplest: disable optimization
    // OR use custom loader for external service (Cloudinary, imgix, etc)
  },
};
```

**Alternative:** For production, use a custom loader with an image CDN service.

### Anti-Patterns to Avoid
- **Don't use Server-Side Rendering (SSR) features:** getServerSideProps, API routes, dynamic rendering won't work with static export
- **Don't rely on default image optimization:** Requires `unoptimized: true` or custom loader
- **Don't use JavaScript config for Tailwind v4:** Use CSS @theme instead (cleaner, no build step)
- **Don't use absolute imports without alias:** Configure `@/*` alias for cleaner imports
- **Don't hardcode colors in components:** Use Tailwind utilities referencing @theme variables

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading optimization | Manual font loading with @font-face | next/font | Prevents layout shift, optimizes file size, handles font display automatically |
| Responsive images | Manual srcset/picture elements | next/image with custom loader | Handles responsive sizing, lazy loading, format conversion |
| Mobile-first CSS | Custom media query system | Tailwind breakpoint utilities | Consistent breakpoints, less code, mobile-first by default |
| Color palette generation | Manual shade generation | Tailwind @theme with OKLCH | Perceptually uniform colors, automatic utility generation |
| TypeScript configuration | Manual tsconfig setup | Next.js auto-generated config | Optimized for Next.js, includes IDE plugin |
| Linting setup | Manual ESLint config | Next.js built-in ESLint | Catches Next.js-specific issues, React best practices |
| Component organization | Ad-hoc folder structure | Next.js project structure conventions | Colocation, route groups, standard patterns |
| Static site deployment | Custom build scripts | next build with output: 'export' | Generates optimized HTML, handles routing, creates 404 page |

**Key insight:** Next.js and Tailwind provide battle-tested solutions for common static site problems. Custom solutions introduce maintenance burden and miss edge cases (font loading race conditions, image loading strategies, color contrast ratios).

## Common Pitfalls

### Pitfall 1: Using SSR Features with Static Export
**What goes wrong:** Build fails or runtime errors when using features that require a server (getServerSideProps, API routes, server actions)
**Why it happens:** Developers familiar with full-stack Next.js forget static export limitations
**How to avoid:**
- Always use `getStaticProps` and `getStaticPaths` for data fetching
- Never use API routes - all data must be available at build time
- Check [unsupported features list](https://nextjs.org/docs/pages/guides/static-exports#unsupported-features)
**Warning signs:**
- Build errors mentioning "output: export"
- Runtime errors about missing server functionality
- API routes in `app/api/` folder

### Pitfall 2: Forgetting Image Optimization Configuration
**What goes wrong:** Build fails with "Image Optimization using the default loader is not compatible with export"
**Why it happens:** next/image requires server-side processing by default
**How to avoid:**
- Add `unoptimized: true` to images config in next.config.ts
- OR configure custom loader for external CDN
**Warning signs:**
- Build error specifically about image loader
- Images not rendering in static export

### Pitfall 3: Tailwind v4 Migration Confusion
**What goes wrong:** Using v3 syntax (@tailwind directives, tailwind.config.js) with v4
**Why it happens:** Documentation and tutorials still show v3 patterns
**How to avoid:**
- Use `@import "tailwindcss"` instead of `@tailwind base/components/utilities`
- Configure colors in CSS with @theme, not in tailwind.config.js
- Run `npx @tailwindcss/upgrade` for automatic migration
**Warning signs:**
- Build errors about @tailwind directive
- Custom colors not applying
- Missing tailwindcss PostCSS plugin

### Pitfall 4: Default Border Color Change in Tailwind v4
**What goes wrong:** Borders appear invisible or wrong color (currentColor instead of gray-200)
**Why it happens:** Tailwind v4 changed default border color from gray-200 to currentColor
**How to avoid:**
- Always specify border color explicitly: `border border-gray-200`
- Use @theme to set custom default: `--color-border: var(--color-gray-200)`
**Warning signs:**
- Borders have unexpected colors
- Borders disappear when text color changes

### Pitfall 5: Mobile Navigation Not in Thumb Zone
**What goes wrong:** Navigation placed at top of screen, hard to reach with thumb on phones
**Why it happens:** Desktop-first thinking, standard website patterns
**How to avoid:**
- Use bottom navigation pattern for mobile (fixed bottom-0)
- Place primary actions in bottom third of screen
- Test on actual phone, not just browser DevTools
**Warning signs:**
- Users complain about hard-to-reach navigation
- High interaction friction on mobile analytics

### Pitfall 6: Not Testing Static Export Output
**What goes wrong:** Site works in dev (`next dev`) but broken in production (static export)
**Why it happens:** Dev mode uses server, static export doesn't
**How to avoid:**
- Regularly run `next build` locally to test static output
- Serve the `out` folder with a static server: `npx serve@latest out`
- Test all routes, especially dynamic ones
**Warning signs:**
- Works locally but fails when deployed
- 404 errors on navigation after deployment
- Dynamic routes not rendering

### Pitfall 7: Missing Node.js Version Requirement
**What goes wrong:** Build fails with cryptic errors about missing features
**Why it happens:** Next.js 16 requires Node.js 20.9+, some developers use older versions
**How to avoid:**
- Check Node version: `node --version`
- Use nvm to install Node 20.9+
- Add `.nvmrc` file with version requirement
**Warning signs:**
- Syntax errors in Next.js code
- Build fails with "Unknown feature" errors

### Pitfall 8: Inconsistent Breakpoint Usage
**What goes wrong:** Some components break at tablet size, inconsistent responsive behavior
**Why it happens:** Mixing custom breakpoints with Tailwind defaults, no agreed-upon strategy
**How to avoid:**
- Stick to 2-3 Tailwind breakpoints: `md:` (768px) and `lg:` (1024px)
- Document breakpoint strategy in codebase
- Use same breakpoints across all components
**Warning signs:**
- Layout breaks at unexpected screen sizes
- Inconsistent behavior between pages

## Code Examples

Verified patterns from official sources:

### Create Next.js App with Defaults
```bash
# Source: https://nextjs.org/docs/app/getting-started/installation
pnpm create next-app@latest bombers --yes
cd bombers
```

### Configure Static Export
```typescript
// next.config.ts
// Source: https://nextjs.org/docs/pages/guides/static-exports
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

### Build and Test Static Export
```bash
# Build static site
pnpm build

# Test static output locally
npx serve@latest out

# Visit http://localhost:3000
```

### Configure Bombers Brand Colors
```css
/* src/app/globals.css */
/* Source: https://tailwindcss.com/docs/theme */
@import "tailwindcss";

@theme {
  --color-bombers-yellow: #feda00;
  --color-bombers-navy: #0a0047;

  /* Friendly rounded corners */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
}
```

### Friendly Typography Setup
```typescript
// src/lib/fonts.ts
// Source: https://nextjs.org/docs/app/getting-started/fonts
import { Poppins, Inter } from 'next/font/google';

// Poppins for headings - friendly, rounded, approachable
export const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

// Inter for body - clean, readable
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
```

### Mobile-First Layout Component
```tsx
// src/components/layout/Container.tsx
export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      px-4 py-6              /* Mobile: compact */
      md:px-6 md:py-8        /* Tablet: more space */
      lg:px-8 lg:py-12       /* Desktop: generous */
      max-w-7xl mx-auto      /* Center on large screens */
    ">
      {children}
    </div>
  );
}
```

### Thumb-Friendly Button Component
```tsx
// src/components/ui/Button.tsx
export default function Button({
  children,
  variant = 'primary'
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}) {
  const baseClasses = "
    px-6 py-3                    /* Thumb-friendly tap target */
    rounded-lg                   /* Friendly rounded corners */
    font-semibold
    transition-colors
    active:scale-95              /* Tactile feedback */
  ";

  const variantClasses = {
    primary: "bg-bombers-yellow text-bombers-navy hover:bg-yellow-600",
    secondary: "bg-bombers-navy text-white hover:bg-navy-600",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| next export command | output: 'export' in config | Next.js 14 (2024) | Simpler, unified with other output modes |
| @tailwind directives | @import "tailwindcss" | Tailwind v4 (Jan 2025) | Single import, cleaner |
| tailwind.config.js | @theme in CSS | Tailwind v4 (Jan 2025) | No JS config, CSS-native theming |
| rgb() colors | oklch() colors | Tailwind v4 (Jan 2025) | Perceptually uniform, P3 color space |
| Pages Router | App Router | Next.js 13+ (stable in 16) | Better SSG, React Server Components |
| Webpack | Turbopack | Next.js 16 (Feb 2026) | 40-60% faster builds |
| bg-opacity-* | bg-black/50 | Tailwind v4 (Jan 2025) | More intuitive opacity syntax |
| outline-none | outline-hidden | Tailwind v4 (Jan 2025) | Better semantic meaning |

**Deprecated/outdated:**
- `next export` CLI command - use `output: 'export'` in config
- `@tailwind base/components/utilities` - use `@import "tailwindcss"`
- `tailwindcss` PostCSS plugin - use `@tailwindcss/postcss`
- `getStaticPaths` with `fallback: true/blocking` - not supported in static export
- RGB color format in Tailwind - v4 uses OKLCH by default

## Recommendations for Claude's Discretion Areas

Based on research and user requirements:

### Typography Selection
**Recommendation:** Poppins (headings) + Inter (body)
- Poppins: Rounded, friendly, geometric - perfect for approachable feel
- Inter: Clean, readable, professional - great for body text
- Both have excellent Google Fonts support via next/font

### Mobile vs Desktop Content Strategy
**Recommendation:** Content parity with layout adaptation
- Show same content on mobile and desktop (parents need all info at field)
- Adapt layout: stack on mobile, side-by-side on desktop
- Hide decorative elements on mobile (keep it fast)

### Breakpoint Strategy
**Recommendation:** 2 breakpoints (md: 768px, lg: 1024px)
- Mobile: 0-768px (phones)
- Tablet/Desktop: 768px+ (most everything else)
- Large Desktop: 1024px+ (optional enhancements)

### Layout Width Approach
**Recommendation:** Centered max-width container with full-width accent sections
- Main content: max-w-7xl centered
- Hero/banner sections: full-width with centered content
- Prevents awkward ultra-wide layouts on large monitors

### Animation/Transition Approach
**Recommendation:** Subtle transitions for app-like feel
- Tailwind transition utilities: `transition-colors duration-200`
- Active states for buttons: `active:scale-95`
- Smooth page transitions (optional): view-transitions API
- No heavy animations (keep it fast on phones)

### Accessibility Level
**Recommendation:** WCAG 2.1 AA minimum
- Semantic HTML (header, nav, main, footer)
- Color contrast 4.5:1 for text (yellow on white may need adjustment)
- Focus indicators on interactive elements
- Alt text for images
- Mobile: 44px minimum tap targets

### Design Token Depth for Phase 1
**Recommendation:** Minimal but complete
- Colors: 2 brand colors + derived shades
- Spacing: Use Tailwind defaults (4px scale)
- Border radius: 3-4 custom values (sm, md, lg, xl)
- Typography: 2 fonts, use Tailwind size scale
- Don't over-engineer - expand in later phases if needed

### Button Color Hierarchy
**Recommendation:** Yellow primary, Navy secondary
- Primary actions (Register, Sign Up): Yellow background, navy text
- Secondary actions (Learn More, Cancel): Navy background, white text
- Tertiary/ghost: Navy text, transparent background
- Reasoning: Yellow is the dominant brand color, eye-catching for CTAs

### Corner Styles and Shape Language
**Recommendation:** Rounded (0.5-1rem) for friendly feel
- Buttons: rounded-lg (0.5rem)
- Cards: rounded-xl (0.75rem)
- Images: rounded-lg or rounded-2xl
- Avoid sharp corners (less friendly) and pill shapes (too playful)

### Data Storage Format
**Recommendation:** Markdown with frontmatter for content
- Reasoning: Human-readable, git-friendly, CMS-compatible
- Board members edit via CMS UI (Decap CMS, TinaCMS), not raw files
- Developers can edit directly if needed
- JSON for structured data (roster data, schedule) - easier to validate

### TypeScript vs JavaScript
**Recommendation:** TypeScript
- Reasoning: Catches errors before deployment (critical when non-technical users maintain site)
- Next.js default, better DX, industry standard
- Learning curve is worth it for long-term maintenance

### Package Manager Choice
**Recommendation:** pnpm
- Reasoning: 40-60% faster than npm, disk space efficient
- Industry momentum (many projects switching from npm/yarn)
- Works with all Next.js features
- If team prefers npm for familiarity, it's acceptable but slower

### Component Organization and Folder Structure
**Recommendation:** Feature-based with ui/ folder
```
src/
├── components/
│   ├── ui/              # Reusable primitives (Button, Card, Input)
│   └── layout/          # Layout components (Header, Footer, MobileNav)
├── app/                 # Next.js App Router pages/layouts
└── lib/                 # Utilities (fonts, helpers)
```
- Reasoning: Clear separation, easy to find components, scales to later phases

## Open Questions

1. **Logo file format and dimensions**
   - What we know: User will provide logo (SVG/PNG)
   - What's unclear: Exact dimensions, whether we need multiple sizes
   - Recommendation: Build with placeholder, use next/image with multiple sizes (mobile: 120px, desktop: 180px height)

2. **Content editing workflow**
   - What we know: Board members are non-technical, need simple editing
   - What's unclear: Whether to add CMS in Phase 1 or later
   - Recommendation: Phase 1 sets up file structure for Markdown, add CMS UI in Phase 2 when there's content to manage

3. **Yellow contrast on white backgrounds**
   - What we know: Brand yellow is #feda00
   - What's unclear: Whether this meets WCAG AA contrast requirements for text
   - Recommendation: Test contrast, may need darker yellow variant for text or only use yellow for backgrounds/accents

4. **Image assets and optimization**
   - What we know: Static export needs custom image handling
   - What's unclear: Whether to use external CDN (Cloudinary) or just unoptimized
   - Recommendation: Start with `unoptimized: true`, add CDN in later phase if needed (premature optimization)

## Sources

### Primary (HIGH confidence)
- [Next.js Official Docs - Static Exports](https://nextjs.org/docs/pages/guides/static-exports) - Configuration, limitations, deployment (updated 2026-02-11)
- [Next.js Official Docs - Installation](https://nextjs.org/docs/app/getting-started/installation) - System requirements, CLI usage (updated 2026-02-11)
- [Tailwind CSS v4 Blog](https://tailwindcss.com/blog/tailwindcss-v4) - v4 release notes, breaking changes
- [Tailwind CSS Docs - Theme](https://tailwindcss.com/docs/theme) - @theme directive, color configuration
- [Tailwind CSS Docs - Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide) - v3 to v4 migration steps

### Secondary (MEDIUM confidence)
- [Next.js Complete Guide for 2026](https://devtoolbox.dedyn.io/blog/nextjs-complete-guide) - Modern best practices
- [Tailwind CSS v4 Complete Guide](https://devtoolbox.dedyn.io/blog/tailwind-css-v4-complete-guide) - v4 features and migration
- [Mobile Navigation Patterns in 2026](https://phone-simulator.com/blog/mobile-navigation-patterns-in-2026) - Bottom nav patterns
- [Responsive Design Best Practices 2025](https://nextnative.dev/blog/responsive-design-best-practices) - Mobile-first strategies
- [Next.js App Router Project Structure](https://makerkit.dev/blog/tutorials/nextjs-app-router-project-structure) - Folder organization
- [pnpm vs npm vs Yarn 2026](https://pockit.tools/blog/pnpm-npm-yarn-bun-comparison-2026/) - Package manager benchmarks
- [Popular Font Pairs for 2026](https://www.lummi.ai/blog/popular-font-pairs-2026) - Typography recommendations
- [Static Site CMS Options 2026](https://avada.io/blog/cms-for-static-websites/) - Non-technical editing solutions

### Tertiary (LOW confidence - marked for validation)
- Multiple Medium articles on Next.js and Tailwind - useful for patterns but need official doc verification
- GitHub discussions on static export issues - real-world problems but may be outdated

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official docs confirm Next.js 16.1.6, Tailwind 4.1, all verified
- Architecture: HIGH - Official Next.js and Tailwind docs provide clear patterns
- Pitfalls: MEDIUM-HIGH - Mix of official docs and community experience, verified where possible
- Recommendations: MEDIUM - Based on research but some subjective judgment (fonts, colors)

**Research date:** 2026-02-16
**Valid until:** Approximately 30 days (Feb 2026 - stable stack, slow-moving)
**Next.js version researched:** 16.1.6 (latest stable as of 2026-02-11)
**Tailwind version researched:** 4.1 (latest stable, released Jan 2025)
