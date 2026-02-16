# Phase 2: Core Layout & Navigation - Research

**Researched:** 2026-02-16
**Domain:** Next.js 15 App Router layouts, responsive navigation, Tailwind CSS v4 mobile-first patterns
**Confidence:** HIGH

## Summary

Next.js 15 App Router provides a nested layout system where `app/layout.tsx` serves as the root layout wrapping all pages. For this phase, we'll implement a site-wide header with navigation and footer by adding them to the existing root layout. Navigation requires extracting interactive components (hamburger menu, active link highlighting) into Client Components marked with `'use client'`, while keeping the layout itself as a Server Component.

Tailwind CSS v4 (already configured) uses a mobile-first breakpoint system where unprefixed utilities apply to all screen sizes, and prefixed utilities (like `md:`) apply at that breakpoint and above. The `md` breakpoint at 768px (user-specified) is perfect for switching from hamburger menu to horizontal navigation.

**Primary recommendation:** Create separate Client Components for `<NavLinks>` (handles active state with `usePathname`) and `<MobileMenu>` (manages open/close state with `useState`), then import them into the root layout Server Component.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
**Mobile menu breakpoint:** 768px (md breakpoint in Tailwind)

### Claude's Discretion
The user deferred nearly all design decisions to Claude. This gives full flexibility on:
- **Header:** sticky behavior, logo position, background treatment, CTA inclusion
- **Footer:** content selection, layout columns, background, attribution
- **Navigation:** organization (flat vs grouped), ordering, active state, Home link treatment
- **Mobile:** menu animation style, hamburger icon, extra content in mobile menu

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope

</user_constraints>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 (installed) | App Router layouts | Official framework pattern for shared UI |
| React | 19.2.3 (installed) | Client Components | `useState`, `usePathname` for interactivity |
| Tailwind CSS | v4 (installed) | Responsive utilities | Mobile-first breakpoints, utility-first styling |
| next/link | Built-in | Client-side navigation | Prefetching, instant navigation |
| next/navigation | Built-in | `usePathname` hook | Active link detection in Client Components |
| next/image | Built-in | Logo optimization | Automatic sizing, format optimization, LCP boost |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | ~2.1.1 | Conditional classes | Active nav state, hamburger toggle states |
| React hooks | Built-in | useState, useEffect | Mobile menu open/close state |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| clsx | classnames | clsx is smaller (239B) and faster |
| Client Component nav | Third-party menu lib | Custom code gives full control, no bundle bloat |
| Tailwind animations | Framer Motion | Framer adds 60KB+, CSS transitions suffice for menu |

**Installation:**
```bash
npm install clsx
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   └── layout.tsx           # Root layout with Header/Footer
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Server Component wrapper
│   │   ├── NavLinks.tsx     # Client Component (active state)
│   │   ├── MobileMenu.tsx   # Client Component (hamburger state)
│   │   └── Footer.tsx       # Server Component
│   └── ui/
│       └── Logo.tsx         # Reusable logo component
└── lib/
    └── navigation.ts        # Navigation config array
```

### Pattern 1: Root Layout with Header/Footer
**What:** Root layout renders `<html>` and `<body>` tags, imports Header and Footer as children
**When to use:** Always for site-wide UI that appears on every page
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/layout
// app/layout.tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### Pattern 2: Active Navigation Links with usePathname
**What:** Client Component compares current pathname to link href, applies active styling
**When to use:** Navigation menus that highlight current page
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/layout (Active Nav Links example)
// components/layout/NavLinks.tsx
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

const links = [
  { href: '/', label: 'Home' },
  { href: '/teams', label: 'Teams' },
  { href: '/about', label: 'About' },
  // ...
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex md:gap-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={clsx(
            'text-sm font-medium transition-colors hover:text-yellow-500',
            pathname === link.href
              ? 'text-yellow-500'
              : 'text-navy-700'
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
```

### Pattern 3: Mobile Hamburger Menu with useState
**What:** Client Component manages menu open/close state, displays below md breakpoint
**When to use:** Responsive navigation for mobile screens
**Example:**
```typescript
// Source: Community pattern from https://codewithmarish.com/post/how-to-create-responsive-navbar-in-next-js
// components/layout/MobileMenu.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export function MobileMenu({ links }: { links: Array<{ href: string; label: string }> }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {/* Hamburger icon SVG */}
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-16 bg-white shadow-lg">
          <nav className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'px-4 py-3 text-sm font-medium',
                  pathname === link.href ? 'bg-yellow-50 text-yellow-600' : 'text-navy-700'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
```

### Pattern 4: Sticky Footer with Flexbox
**What:** Flexbox layout ensures footer stays at bottom on short pages, flows naturally on long pages
**When to use:** All sites with footers
**Example:**
```typescript
// Source: https://moderncss.dev/keep-the-footer-at-the-bottom-flexbox-vs-grid/
// body element uses flex flex-col min-h-screen, main uses flex-1
<body className="flex min-h-screen flex-col">
  <Header />
  <main className="flex-1">{children}</main>
  <Footer />
</body>
```

### Pattern 5: Logo with Next.js Image Component
**What:** Use next/image for optimized logo with priority prop for LCP
**When to use:** Logos in header (visible on initial load)
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/components/image
import Image from 'next/image'

export function Logo() {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="O'Fallon Bombers"
        width={150}
        height={50}
        priority
        className="h-auto w-auto"
      />
    </Link>
  )
}
```

### Anti-Patterns to Avoid
- **Using 'use client' on layout.tsx:** Layouts should be Server Components; extract interactive pieces into separate Client Components
- **Accessing pathname directly in layout:** Layouts don't re-render on navigation, so pathname becomes stale; use Client Component with usePathname
- **Using sm: for mobile styles:** Tailwind is mobile-first; unprefixed utilities apply to mobile, prefixed utilities apply at breakpoint and up
- **Forgetting aria-label and aria-expanded:** Hamburger buttons must be accessible to screen readers
- **Not closing mobile menu on link click:** User expects menu to close after navigation

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Active link detection | Custom route parsing logic | `usePathname()` from next/navigation | Built-in, syncs with Next.js router, handles edge cases |
| Client-side navigation | `<a>` tags with onClick handlers | `<Link>` from next/link | Automatic prefetching, instant navigation, Router integration |
| Responsive breakpoints | Custom window.innerWidth listeners | Tailwind responsive utilities (md:, lg:) | No JS needed, SSR-safe, mobile-first |
| Conditional classNames | String concatenation with ternaries | clsx library | Handles null/undefined, cleaner syntax, tiny bundle |
| Image optimization | Manual srcset/WebP generation | next/image component | Automatic format conversion, lazy loading, responsive sizes |

**Key insight:** Next.js and Tailwind provide all primitives needed for navigation. Custom solutions add complexity without benefits.

## Common Pitfalls

### Pitfall 1: Marking Entire Layout as Client Component
**What goes wrong:** Adding `'use client'` to `layout.tsx` forces all child pages to be client-rendered, losing Server Component benefits (streaming, zero JS for static content)
**Why it happens:** Navigation needs interactivity (active state, hamburger toggle), so developers assume layout must be client
**How to avoid:** Keep layout as Server Component, extract only interactive navigation into separate Client Components (`NavLinks.tsx`, `MobileMenu.tsx`)
**Warning signs:** Every page hydrates on client, bundle size increases, initial load slows

### Pitfall 2: Layout State Becomes Stale
**What goes wrong:** Using `usePathname()` or `useSearchParams()` directly in layout causes stale values—layout doesn't re-render on navigation
**Why it happens:** Next.js caches layouts for performance; they persist across route changes
**How to avoid:** Always use hooks like `usePathname` inside Client Components that re-render on navigation
**Warning signs:** Active nav state doesn't update when navigating, search params show old values

### Pitfall 3: Mobile Menu Stays Open After Navigation
**What goes wrong:** User taps a link in mobile menu, page changes but menu stays open
**Why it happens:** Navigation doesn't automatically close menu; state persists
**How to avoid:** Add `onClick={() => setIsOpen(false)}` to each mobile menu link
**Warning signs:** Mobile users complain menu blocks content after navigation

### Pitfall 4: Using `sm:` Breakpoint for Mobile
**What goes wrong:** Applying `sm:hidden` to hide desktop nav on mobile doesn't work—nav still shows
**Why it happens:** Tailwind is mobile-first: `sm:` means "at 640px and up," not "mobile only"
**How to avoid:** Use unprefixed utilities for mobile (default), prefixed for larger screens: `hidden md:flex` not `flex sm:hidden`
**Warning signs:** Mobile nav doesn't appear, desktop nav shows on phone

### Pitfall 5: Forgetting to Add `priority` to Logo Image
**What goes wrong:** Logo lazy-loads on initial page load, causing LCP delay and visible pop-in
**Why it happens:** next/image lazy-loads by default; developers forget to mark above-fold images as priority
**How to avoid:** Add `priority` prop to logo Image component in header
**Warning signs:** Lighthouse LCP warning, visible image loading after page renders

### Pitfall 6: Hamburger Button Inaccessible
**What goes wrong:** Screen reader users can't identify or operate hamburger menu
**Why it happens:** Missing `aria-label` and `aria-expanded` attributes
**How to avoid:** Always include `aria-label="Toggle menu"` and `aria-expanded={isOpen}` on button
**Warning signs:** Accessibility audit failures, screen reader testing shows unlabeled button

### Pitfall 7: Z-index Conflicts with Sticky Header
**What goes wrong:** Sticky header appears below dropdowns, modals, or other content
**Why it happens:** Sticky position creates stacking context; insufficient z-index
**How to avoid:** Apply moderate z-index to sticky header (e.g., `z-10` or `z-20`), reserve higher values (z-40, z-50) for modals/dropdowns
**Warning signs:** Header overlaps incorrectly, dropdowns hide behind header

## Code Examples

Verified patterns from official sources:

### Responsive Header with Desktop and Mobile Navigation
```typescript
// Source: Community pattern + Next.js official docs
// components/layout/Header.tsx (Server Component)
import Link from 'next/link'
import Image from 'next/image'
import { NavLinks } from './NavLinks'
import { MobileMenu } from './MobileMenu'

const links = [
  { href: '/', label: 'Home' },
  { href: '/teams', label: 'Teams' },
  { href: '/about', label: 'About' },
  { href: '/fees', label: 'Fees & Events' },
  { href: '/spirit-wear', label: 'Spirit Wear' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-navy-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="O'Fallon Bombers"
            width={150}
            height={50}
            priority
            className="h-auto w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <NavLinks links={links} />

        {/* Mobile Menu */}
        <MobileMenu links={links} />
      </div>
    </header>
  )
}
```

### Footer with Multiple Columns
```typescript
// Source: Community pattern
// components/layout/Footer.tsx (Server Component)
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Navigation Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/teams" className="text-sm hover:text-yellow-500">Teams</Link>
              <Link href="/about" className="text-sm hover:text-yellow-500">About</Link>
              <Link href="/fees" className="text-sm hover:text-yellow-500">Fees & Events</Link>
              <Link href="/contact" className="text-sm hover:text-yellow-500">Contact</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">Contact</h3>
            <p className="text-sm">Email: ofallonbombers@gmail.com</p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com/ofallonbombers" className="text-sm hover:text-yellow-500">Facebook</a>
              <a href="https://instagram.com/ofallonbombers" className="text-sm hover:text-yellow-500">Instagram</a>
            </div>
          </div>
        </div>

        {/* Attribution */}
        <div className="mt-8 border-t border-navy-700 pt-8 text-center text-sm text-navy-400">
          <p>Powered by <a href="https://jerseywatch.com" className="hover:text-yellow-500">JerseyWatch</a></p>
          <p className="mt-2">&copy; {new Date().getFullYear()} O&apos;Fallon Bombers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
```

### Navigation Configuration (Shared)
```typescript
// Source: Community pattern
// lib/navigation.ts
export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/teams', label: 'Teams' },
  { href: '/about', label: 'About' },
  { href: '/fees', label: 'Fees & Events' },
  { href: '/spirit-wear', label: 'Spirit Wear' },
  { href: '/contact', label: 'Contact' },
] as const
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router with _app.js | App Router with layout.tsx | Next.js 13 (2022), stable in 14-15 | Nested layouts, streaming, better DX |
| Tailwind v3 config.js | Tailwind v4 @theme CSS | v4.0 (Dec 2024) | CSS-first config, 70% smaller output, automatic content detection |
| @tailwind directives | @import "tailwindcss" | v4.0 (Dec 2024) | Single import, cleaner syntax |
| Manual responsive logic | Mobile-first utilities | Always in Tailwind | Simpler, SSR-safe, no JS |
| classnames package | clsx package | Community shift (~2020) | Smaller (239B vs 1KB), faster |

**Deprecated/outdated:**
- **Pages Router _app.js:** Still supported but App Router is default for new projects
- **Tailwind v3 tailwind.config.js:** v4 uses CSS @theme, though v3 still works
- **useRouter() for pathname:** usePathname() is cleaner in App Router

## Open Questions

1. **Logo file format and dimensions**
   - What we know: Next.js Image component optimizes automatically, supports PNG/SVG/WebP
   - What's unclear: Exact logo asset (filename, format) from client
   - Recommendation: Use placeholder, document required dimensions (suggested 150x50px for header)

2. **Exact navigation ordering**
   - What we know: ~7 pages (Home, Teams, About, Fees & Events, Spirit Wear, Contact)
   - What's unclear: Exact order (e.g., Teams first or About first?)
   - Recommendation: Propose logical order (Home → Teams → About → Fees → Spirit Wear → Contact), easily changed in config

3. **Footer sponsor logos**
   - What we know: User left sponsor placement to Claude's discretion
   - What's unclear: Should sponsors appear in footer or dedicated pages only?
   - Recommendation: Start with footer sponsor section (optional), can be populated later or removed

## Sources

### Primary (HIGH confidence)
- [Next.js layout.tsx file convention](https://nextjs.org/docs/app/api-reference/file-conventions/layout) - Layout API reference
- [Next.js Linking and Navigating](https://nextjs.org/docs/app/getting-started/linking-and-navigating) - Link component, usePathname, prefetching
- [Tailwind CSS Next.js guide](https://tailwindcss.com/docs/guides/nextjs) - Official v4 installation
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design) - Mobile-first breakpoints
- [Next.js Image Component](https://nextjs.org/docs/app/api-reference/components/image) - Image optimization

### Secondary (MEDIUM confidence)
- [Next.js App Router pitfalls](https://imidef.com/en/2026-02-11-app-router-pitfalls) - Common mistakes (Feb 11, 2026)
- [Accessible Mobile Navigation](https://a11ymatters.com/pattern/mobile-nav/) - ARIA patterns for hamburger menus
- [Tailwind v4 OKLCH colors](https://tailwindcss.com/blog/tailwindcss-v4) - Color system changes
- [Keep Footer at Bottom: Flexbox vs Grid](https://moderncss.dev/keep-the-footer-at-the-bottom-flexbox-vs-grid/) - Sticky footer patterns

### Tertiary (LOW confidence)
- Community examples from Medium, CodeWithMarish - Mobile nav patterns (verified against official docs)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Next.js and Tailwind docs, versions confirmed in package.json
- Architecture: HIGH - Official Next.js layout patterns, verified with recent docs (Feb 2026)
- Pitfalls: HIGH - Official docs + recent community post (Feb 2026) on App Router pitfalls

**Research date:** 2026-02-16
**Valid until:** ~30 days (Next.js/Tailwind stable, slow-moving APIs)
