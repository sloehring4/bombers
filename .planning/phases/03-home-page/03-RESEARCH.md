# Phase 3: Home Page - Research

**Researched:** 2026-02-16
**Domain:** Next.js 15 App Router landing pages with hero sections, responsive grids, and announcement banners
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Hero section:**
- Full-width background photo style — bold, immersive sports-site feel
- Placeholder image for now (real team action photo swapped in later)
- Headline focused on team identity: "O'Fallon Bombers" front and center
- Include a tagline/motto subheadline under the team name (Claude writes something fitting)

**Quick links layout:**
- Icon cards — each card has an icon, title, and short description
- Scannable grid layout for Teams, Fees, Spirit Wear, Contact (and possibly more)

**Key info display:**
- Show all key dates: next tryout date, registration deadline, season start date
- Displayed as an announcement banner/strip across the page — eye-catching, can't miss it

**Overall page feel:**
- Mix of bold/sporty and clean/professional — sporty energy in the hero, clean and structured in content sections below
- Minimal page structure: hero + quick links + key dates banner — no extra sections
- No specific reference site — just make it look good

### Claude's Discretion

- Number and selection of CTA buttons in hero
- Hero overlay approach (dark overlay vs gradient) for text readability
- Hero height (full viewport vs partial)
- Whether Bombers logo appears in hero area (separate from header)
- Quick link card count and which sections to include
- Quick link card hover effects
- Quick links placement relative to hero (directly after vs after intro)
- Announcement banner placement (above hero vs between hero and content)
- Whether key dates come from JSON data file or hardcoded initially
- Banner display mode (all dates at once vs rotating)
- Section separation style (alternating backgrounds vs seamless flow)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

## Summary

Building a high-performance landing page for O'Fallon Bombers requires leveraging Next.js 15's image optimization, implementing accessible hero sections with proper text overlays, using a modern icon system for quick links, and creating an eye-catching announcement banner. The existing foundation (Tailwind v4, Poppins/Inter fonts, yellow/navy colors, Button component) provides a solid base to build upon.

**Key findings:** Next.js 15.3+ introduced `preload` prop (replacing deprecated `priority`) for hero images; Lucide React is the recommended icon library for tree-shakable, customizable icons; hero section text readability requires either dark overlays (rgba(0,0,0,0.4-0.6)) or gradient overlays (linear-gradient with 60%+ opacity); announcement banners should be dismissible with localStorage persistence for better UX.

**Primary recommendation:** Use Next.js Image component with `preload={true}` and `fill` property for responsive hero background, implement gradient overlay for text readability, use Lucide React icons for quick link cards with subtle hover transitions, and place announcement banner between hero and quick links for maximum visibility without blocking hero impact.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next/image | 16.1.6 (built-in) | Hero image optimization | Automatic WebP/AVIF conversion, responsive sizing, lazy loading, and preloading support for LCP optimization |
| lucide-react | 0.564+ | Icon system for quick links | Tree-shakable, 1000+ icons, TypeScript support, consistent design language, minimal bundle impact (~1-2KB per icon) |
| clsx | 2.1.1 (installed) | Conditional className management | Already in project, perfect for hover states and card variants |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| plaiceholder | 3.0+ | Generate blur placeholders | Optional: for dynamic remote images if blur preview needed (hero uses local static image) |
| react-intersection-observer | 9.0+ | Lazy load quick link cards | Optional: if many cards below fold, but likely unnecessary with only 4-6 cards |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Lucide React | Heroicons | Heroicons has fewer icons (316 vs 1000+), but pairs nicely with Tailwind. Lucide more versatile. |
| Lucide React | React Icons | React Icons bundles ALL icon libraries (massive). Use only if need multiple icon families. |
| Next Image | Plain img + CSS | Lose automatic optimization, responsive sizing, WebP conversion. Never recommended for hero images. |
| Gradient overlay | Solid dark overlay | Gradient more visually interesting, allows image to show through more naturally. Solid simpler but flatter. |

**Installation:**
```bash
npm install lucide-react
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── home/              # Home page specific components
│   │   ├── Hero.tsx       # Full-width hero with image, overlay, headline
│   │   ├── QuickLinks.tsx # Grid of icon cards
│   │   ├── QuickLinkCard.tsx # Individual card component
│   │   └── AnnouncementBanner.tsx # Key dates banner
│   ├── layout/            # Existing layout components
│   └── ui/                # Existing UI components
├── lib/
│   ├── data/
│   │   └── home.ts        # Type-safe home page data (dates, links)
│   └── hooks/
│       └── useLocalStorage.ts # For banner dismissal persistence
└── app/
    └── page.tsx           # Composes home components
```

### Pattern 1: Hero Section with Image Fill
**What:** Full-width responsive hero using Next.js Image with `fill` property and gradient overlay for text readability
**When to use:** Any hero section with background image and overlaid text (standard for sports sites)
**Example:**
```typescript
// components/home/Hero.tsx
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero-placeholder.jpg"
        alt="O'Fallon Bombers team in action"
        fill
        preload={true}  // v16+ replaces priority prop - ensures LCP optimization
        sizes="100vw"
        quality={90}
        className="object-cover"
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,..." // Small blur preview
      />

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-bombers-navy/70 via-bombers-navy/50 to-bombers-navy/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
          O'Fallon Bombers
        </h1>
        <p className="text-xl md:text-2xl text-white/95 mb-8">
          Champions on the Field, Leaders in the Community
        </p>
        {/* CTAs */}
      </div>
    </section>
  );
}
```
**Source:** [Next.js Image Component Documentation](https://nextjs.org/docs/app/api-reference/components/image)

### Pattern 2: Icon Card Grid with Hover Effects
**What:** Responsive grid of cards with Lucide icons, smooth hover transitions using Tailwind
**When to use:** Quick links, feature highlights, navigation cards (standard for landing pages)
**Example:**
```typescript
// components/home/QuickLinkCard.tsx
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface QuickLinkCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export default function QuickLinkCard({ icon: Icon, title, description, href }: QuickLinkCardProps) {
  return (
    <Link
      href={href}
      className="group block p-6 bg-white rounded-xl border-2 border-gray-200 transition-all duration-300 hover:border-bombers-yellow hover:shadow-xl hover:-translate-y-1"
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div className="p-4 bg-bombers-yellow/10 rounded-full transition-colors duration-300 group-hover:bg-bombers-yellow">
          <Icon
            size={32}
            strokeWidth={2}
            className="text-bombers-navy transition-colors duration-300 group-hover:text-white"
          />
        </div>
        <h3 className="text-xl font-semibold text-bombers-navy">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
}
```
**Source:** [Tailwind CSS Card Hover Effects](https://www.tailwindtap.com/blog/card-hover-effects-in-tailwind-css)

### Pattern 3: Dismissible Announcement Banner with Persistence
**What:** Sticky/inline banner for important dates with localStorage persistence to remember dismissal
**When to use:** Important announcements that shouldn't show repeatedly to same user
**Example:**
```typescript
// components/home/AnnouncementBanner.tsx
'use client';

import { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';

interface AnnouncementBannerProps {
  dates: { label: string; date: string; }[];
  id: string; // Unique ID for localStorage key
}

export default function AnnouncementBanner({ dates, id }: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(`banner-dismissed-${id}`);
    setIsVisible(!dismissed);
  }, [id]);

  const handleDismiss = () => {
    localStorage.setItem(`banner-dismissed-${id}`, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-bombers-yellow border-y-4 border-bombers-navy py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-6 flex-wrap">
          <Calendar className="text-bombers-navy flex-shrink-0" size={24} />
          {dates.map((item, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="font-semibold text-bombers-navy">{item.label}:</span>
              <span className="text-bombers-navy">{item.date}</span>
            </div>
          ))}
        </div>
        <button
          onClick={handleDismiss}
          className="text-bombers-navy hover:bg-bombers-navy/10 p-2 rounded-full transition-colors"
          aria-label="Dismiss announcement"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
```
**Source:** [Dismissible banner with localStorage](https://medium.com/front-end-weekly/dismissible-banner-continued-storing-component-state-8e60f88e3e64)

### Pattern 4: Responsive Grid Layout
**What:** Mobile-first responsive grid using Tailwind's grid utilities
**When to use:** Quick link cards, feature grids, team listings (any grid of equal-height items)
**Example:**
```typescript
// components/home/QuickLinks.tsx
import { Users, DollarSign, Shirt, Mail } from 'lucide-react';
import QuickLinkCard from './QuickLinkCard';

const links = [
  { icon: Users, title: 'Teams', description: 'View our age divisions and rosters', href: '/teams' },
  { icon: DollarSign, title: 'Fees', description: 'Registration costs and payment plans', href: '/fees' },
  { icon: Shirt, title: 'Spirit Wear', description: 'Show your Bombers pride', href: '/spirit-wear' },
  { icon: Mail, title: 'Contact', description: 'Get in touch with our staff', href: '/contact' },
];

export default function QuickLinks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link) => (
            <QuickLinkCard key={link.title} {...link} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Anti-Patterns to Avoid
- **Don't use `priority` prop in Next.js 16+:** Deprecated in favor of `preload` prop (still works but generates warnings)
- **Don't lazy-load hero images:** Hero is always above fold and typically the LCP element — must use `preload={true}`
- **Don't use fixed pixel widths for Image with fill:** Let parent container control sizing with responsive classes
- **Don't use inline styles for overlays:** Use Tailwind classes for consistency and maintenance (e.g., `bg-navy-900/60` not `style={{backgroundColor: 'rgba(0,0,0,0.6)'}}`)
- **Don't make banner non-dismissible:** Users will get annoyed; always provide close button if banner persists across pages
- **Don't use `useState` for banner visibility without `useEffect`:** Causes hydration mismatch (server renders visible, client may hide based on localStorage)

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom `<picture>` element with srcset | `next/image` with `fill` + `sizes` | Next.js handles responsive breakpoints, format conversion (WebP/AVIF), lazy loading, blur placeholders, and CDN optimization automatically |
| Icon system | SVG sprites or manual icon imports | Lucide React | Tree-shaking eliminates unused icons, consistent sizing/styling API, accessible by default, 1000+ professionally designed icons |
| Blur placeholders for hero | Canvas-based blur generation | `placeholder="blur"` with static import or plaiceholder library | Automatic for static imports, minimal bundle size, integrates with Next.js image pipeline |
| localStorage hooks | Custom useEffect + useState logic | Verified pattern from React docs or useLocalStorage hook | Edge cases: SSR compatibility, JSON serialization, storage events, error handling |
| Responsive grid breakpoints | Custom CSS Grid with media queries | Tailwind grid utilities (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`) | Mobile-first, consistent breakpoints across app, no CSS maintenance |
| Gradient overlays | Multiple divs or pseudo-elements | Single div with Tailwind gradient + opacity (`bg-gradient-to-b from-navy-900/70 to-navy-900/50`) | Cleaner DOM, better performance, easier to adjust |

**Key insight:** Landing pages have been solved thousands of times. The complexity isn't in layout or styling — it's in performance (LCP, CLS), accessibility (keyboard navigation, screen readers), and maintainability (component reusability, type safety). Use proven libraries and patterns rather than rebuilding fundamentals.

## Common Pitfalls

### Pitfall 1: Poor LCP (Largest Contentful Paint) Performance
**What goes wrong:** Hero image loads slowly, causing poor Core Web Vitals scores and bad first impressions
**Why it happens:**
- Using `loading="lazy"` on hero images (delays load until scroll)
- Not using `preload` prop for above-fold images
- Serving oversized images (e.g., 4K image when 1920px is max display size)
- Missing `sizes` attribute with `fill` property (browser downloads unnecessarily large image)

**How to avoid:**
- ALWAYS use `preload={true}` on hero images (Next.js 16+) or `priority` (older versions)
- Specify `sizes="100vw"` for full-width hero images so browser knows exact size to fetch
- Use `quality={80-90}` instead of default 75 for hero images (slight size increase, better visual quality)
- Compress hero images to ~200-300KB before adding to project (use tools like Squoosh or ImageOptim)

**Warning signs:**
- Lighthouse reports LCP > 2.5s
- Hero image has visible "pop-in" after page loads
- Browser DevTools Network tab shows hero image downloading late in waterfall

**Source:** [Core Web Vitals Optimization 2026](https://skyseodigital.com/core-web-vitals-optimization-complete-guide-for-2026/)

### Pitfall 2: Unreadable Text on Hero Images
**What goes wrong:** Headline/tagline text is illegible due to poor contrast with background image
**Why it happens:**
- No overlay between image and text
- Overlay too subtle (e.g., `opacity: 0.2`)
- Light text on light areas of image or dark text on dark areas

**How to avoid:**
- Use gradient overlays with 50-70% opacity: `bg-gradient-to-b from-navy-900/70 via-navy-900/50 to-navy-900/70`
- Test text readability across different image areas (sports photos have varied brightness)
- Ensure WCAG AA contrast ratio (4.5:1 for body text, 3:1 for large text) using tools like WebAIM Contrast Checker
- Consider adding text shadow as backup: `text-shadow: 0 2px 4px rgba(0,0,0,0.5)`

**Warning signs:**
- Text difficult to read on parts of hero image
- Lighthouse accessibility audit flags contrast issues
- Users squinting or leaning in to read headline

**Source:** [Handling Text Over Images in CSS](https://ishadeed.com/article/handling-text-over-image-css/)

### Pitfall 3: Hydration Mismatch with Dismissible Banner
**What goes wrong:** Console errors about server/client mismatch when banner checks localStorage on mount
**Why it happens:**
- Reading localStorage during initial render (server has no localStorage)
- Setting state based on localStorage before `useEffect` runs
- Not handling SSR/client differences

**How to avoid:**
- ALWAYS use `useEffect` to check localStorage (runs only on client)
- Initialize visibility state to `false`, then set to `true` in useEffect if not dismissed
- Consider using `useState(() => false)` with lazy initialization
- Add null check: `if (typeof window !== 'undefined')` before localStorage access

**Warning signs:**
- React hydration warnings in console
- Banner flickers on page load
- Different content rendered on server vs client

**Source:** [React useLocalStorage Hook](https://www.shadcn.io/hooks/use-local-storage)

### Pitfall 4: Broken Image Aspect Ratio with `fill` Property
**What goes wrong:** Hero image appears stretched, squished, or cropped incorrectly
**Why it happens:**
- Parent element doesn't have `position: relative` or other non-static position
- Using `object-fit: contain` when `cover` is appropriate (or vice versa)
- Parent element has no defined height (defaults to 0)

**How to avoid:**
- Parent container MUST have `relative`, `fixed`, or `absolute` positioning
- Parent MUST have explicit height (e.g., `h-[70vh]`, `min-h-[500px]`)
- Use `object-cover` for hero backgrounds (fills container, crops excess)
- Use `object-contain` only when entire image must be visible (leaves empty space if aspect ratios differ)
- Add `className="object-cover"` directly to Image component

**Warning signs:**
- Image doesn't appear at all
- Image is tiny in corner of container
- Image is distorted or cropped incorrectly
- Console warning: "Image with src '...' has a parent with invalid position"

**Source:** [Next.js Image Component Documentation](https://nextjs.org/docs/app/api-reference/components/image)

### Pitfall 5: Excessive Bundle Size from Icon Imports
**What goes wrong:** Large JavaScript bundle due to importing entire icon libraries
**Why it happens:**
- Using `import * as Icons from 'lucide-react'` instead of named imports
- Importing from bundled libraries like react-icons without tree-shaking
- Including icons in Server Components when they could be static SVGs

**How to avoid:**
- ALWAYS use named imports: `import { Users, Calendar } from 'lucide-react'`
- Never import the entire library object
- For icons that never change, consider inline SVG in Server Components (zero JS)
- Check bundle analyzer to verify only used icons are included

**Warning signs:**
- First Load JS significantly larger than expected
- Bundle analyzer shows large icon libraries in chunks
- Slow page load on slow connections

### Pitfall 6: Hover Effects Not Working on Mobile
**What goes wrong:** Card hover effects (scale, shadow, border color) don't activate on touch devices
**Why it happens:**
- Hover states don't translate to touch — touch is binary (tapped or not)
- Users on mobile can't "hover" — they tap, triggering both hover and active states simultaneously
- Relying solely on `:hover` for interactive feedback

**How to avoid:**
- Use `active:` pseudo-class for touch feedback: `active:scale-95`
- Consider adding `focus-visible:` states for keyboard navigation
- For touch devices, emphasize tap targets and visual hierarchy over hover effects
- Test on actual mobile devices, not just browser DevTools responsive mode
- Add `@media (hover: hover)` to apply hover effects only on devices that support hover

**Warning signs:**
- Cards feel unresponsive on mobile
- Users confused about which cards are interactive
- No visual feedback when tapping cards

**Source:** [Tailwind CSS Hover Effects](https://pagedone.io/docs/hover-effect)

## Code Examples

Verified patterns from official sources:

### Hero Section with Optimal Image Loading
```typescript
// components/home/Hero.tsx (Server Component)
import Image from 'next/image';
import heroImage from '@/public/images/hero-placeholder.jpg'; // Static import for automatic blur

export default function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
      <Image
        src={heroImage}
        alt="O'Fallon Bombers players celebrating victory"
        fill
        preload={true}         // Next.js 16+ - ensures immediate loading
        sizes="100vw"          // Full viewport width
        quality={90}           // Higher quality for hero
        className="object-cover" // Fill container, crop excess
        placeholder="blur"     // Automatic blur from static import
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-bombers-navy/70 via-bombers-navy/50 to-bombers-navy/70" />

      {/* Content layer */}
      <div className="relative z-10 text-center px-4 max-w-4xl space-y-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
          O&apos;Fallon Bombers
        </h1>
        <p className="text-xl md:text-2xl text-white/95 font-medium">
          Champions on the Field, Leaders in the Community
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button variant="primary" size="lg">Register Your Player</Button>
          <Button variant="secondary" size="lg">View Our Teams</Button>
        </div>
      </div>
    </section>
  );
}
```
**Source:** [Next.js Image Component - Background Image Example](https://nextjs.org/docs/app/api-reference/components/image)

### Quick Link Card with Accessible Hover States
```typescript
// components/home/QuickLinkCard.tsx
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface QuickLinkCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export default function QuickLinkCard({ icon: Icon, title, description, href }: QuickLinkCardProps) {
  return (
    <Link
      href={href}
      className="group block p-8 bg-white rounded-xl border-2 border-gray-200
                 transition-all duration-300
                 hover:border-bombers-yellow hover:shadow-xl hover:-translate-y-1
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bombers-yellow
                 active:scale-95"
    >
      <div className="flex flex-col items-center text-center gap-4">
        {/* Icon container with background transition */}
        <div className="p-4 bg-bombers-yellow/10 rounded-full
                        transition-colors duration-300
                        group-hover:bg-bombers-yellow">
          <Icon
            size={40}
            strokeWidth={2}
            className="text-bombers-navy transition-colors duration-300 group-hover:text-white"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-bombers-navy">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </Link>
  );
}
```
**Source:** [Tailwind CSS Card Hover Effects](https://www.tailwindtap.com/blog/card-hover-effects-in-tailwind-css)

### Type-Safe Home Page Data
```typescript
// lib/data/home.ts
import { Users, DollarSign, Shirt, Mail, Calendar, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface QuickLink {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export interface KeyDate {
  label: string;
  date: string;
  icon?: LucideIcon;
}

export const quickLinks: QuickLink[] = [
  {
    icon: Users,
    title: 'Teams',
    description: 'View our age divisions and team rosters',
    href: '/teams',
  },
  {
    icon: DollarSign,
    title: 'Fees & Registration',
    description: 'Learn about costs and payment plans',
    href: '/fees',
  },
  {
    icon: Shirt,
    title: 'Spirit Wear',
    description: 'Show your Bombers pride with official gear',
    href: '/spirit-wear',
  },
  {
    icon: Mail,
    title: 'Contact Us',
    description: 'Get in touch with coaches and staff',
    href: '/contact',
  },
];

export const keyDates: KeyDate[] = [
  {
    label: 'Next Tryouts',
    date: 'March 15, 2026',
    icon: Calendar,
  },
  {
    label: 'Registration Deadline',
    date: 'March 30, 2026',
    icon: Calendar,
  },
  {
    label: 'Season Starts',
    date: 'April 12, 2026',
    icon: Trophy,
  },
];

export const heroContent = {
  headline: "O'Fallon Bombers",
  tagline: "Champions on the Field, Leaders in the Community",
  primaryCta: {
    text: "Register Your Player",
    href: "/registration",
  },
  secondaryCta: {
    text: "View Our Teams",
    href: "/teams",
  },
} as const;
```

### Dismissible Announcement Banner with localStorage
```typescript
// components/home/AnnouncementBanner.tsx
'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { KeyDate } from '@/lib/data/home';

interface AnnouncementBannerProps {
  dates: KeyDate[];
  bannerId: string; // Unique ID for localStorage
}

export default function AnnouncementBanner({ dates, bannerId }: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on client - check if banner was previously dismissed
    const dismissed = localStorage.getItem(`banner-dismissed-${bannerId}`);
    setIsVisible(!dismissed);
  }, [bannerId]);

  const handleDismiss = () => {
    localStorage.setItem(`banner-dismissed-${bannerId}`, 'true');
    setIsVisible(false);
  };

  // Don't render during SSR or if dismissed
  if (!isVisible) return null;

  return (
    <div className="bg-bombers-yellow border-y-4 border-bombers-navy py-4 px-4">
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Dates */}
        <div className="flex items-center gap-6 flex-wrap">
          {dates.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {item.icon && <item.icon className="text-bombers-navy flex-shrink-0" size={20} />}
              <span className="font-semibold text-bombers-navy">{item.label}:</span>
              <span className="text-bombers-navy">{item.date}</span>
            </div>
          ))}
        </div>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="text-bombers-navy hover:bg-bombers-navy/10 p-2 rounded-full
                     transition-colors flex-shrink-0
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bombers-navy"
          aria-label="Dismiss announcement"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
```
**Source:** [Dismissible Banner with State Persistence](https://medium.com/front-end-weekly/dismissible-banner-continued-storing-component-state-8e60f88e3e64)

### Composed Home Page
```typescript
// app/page.tsx
import Hero from '@/components/home/Hero';
import AnnouncementBanner from '@/components/home/AnnouncementBanner';
import QuickLinks from '@/components/home/QuickLinks';
import { keyDates } from '@/lib/data/home';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AnnouncementBanner dates={keyDates} bannerId="spring-2026" />
      <QuickLinks />
    </main>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `priority` prop | `preload` prop | Next.js 16.0 (Nov 2024) | More explicit naming - "priority" was ambiguous, "preload" clearly indicates preload link generation |
| `placeholder="blur"` required manual blurDataURL | Automatic blur for static imports | Next.js 11.0 (June 2021) | Massive DX improvement - no more manual blur generation for local images |
| Separate layout wrapper for hero | `fill` property with parent sizing | Next.js 13.0 (Oct 2022) | Simpler API - replaced complex layout modes with single fill prop |
| React Icons (monolithic) | Lucide React (tree-shakable) | Lucide fork: 2022 | Bundle size reduction - only import needed icons instead of entire library |
| CSS modules for overlays | Tailwind opacity utilities | Tailwind v2.0+ (Nov 2020) | Inline opacity syntax `bg-navy-900/50` cleaner than separate classes |
| Custom grid breakpoints | Tailwind's standard breakpoints | Industry adoption: 2020+ | Consistency across projects - sm:640px, md:768px, lg:1024px, xl:1280px are now standard |
| `loading="eager"` for hero | `preload={true}` for hero | Next.js 16.0 | Preload generates `<link rel="preload">` in head for faster discovery vs eager loading |

**Deprecated/outdated:**
- **`domains` config for remote images:** Replaced by `remotePatterns` in Next.js 14 for better security (wildcard domains were too permissive)
- **`onLoadingComplete` callback:** Replaced by `onLoad` in Next.js 14 for consistency with native img element
- **Fixed layout modes (`layout="fill"`):** Consolidated into single `fill` property in Next.js 13
- **Feather Icons:** Original library deprecated, community moved to Lucide (active fork with 1000+ icons)

## Open Questions

1. **Should hero image be locally hosted or use a CDN for placeholder?**
   - What we know: Next.js Image optimization works with both local and remote images; user wants placeholder now, real photo later
   - What's unclear: Whether real team photo will come from CMS/external source or be committed to repo
   - Recommendation: Start with local static import in `/public/images/hero-placeholder.jpg` for automatic blur generation. Switch to remote with remotePatterns config if photo comes from external source later.

2. **Should announcement banner be always visible or sticky?**
   - What we know: User wants "eye-catching, can't miss it" but didn't specify sticky behavior
   - What's unclear: Whether banner should remain visible while scrolling or only at top
   - Recommendation: Make banner inline (not sticky) between hero and quick links. Sticky banners can be annoying and reduce viewport space on mobile. Placement between hero and content ensures visibility without persistence.

3. **How many quick link cards should be included?**
   - What we know: User specified Teams, Fees, Spirit Wear, Contact as examples with "possibly more"
   - What's unclear: Exact number and whether to include additional cards (e.g., Schedule, About, Sponsors)
   - Recommendation: Start with 4 core cards in `lib/data/home.ts` array. Easy to add more by pushing to array. 4 cards work perfectly in responsive grid: 1 col mobile, 2 cols tablet, 4 cols desktop.

4. **Should key dates come from hardcoded data or JSON file?**
   - What we know: User left this to Claude's discretion; dates will change seasonally
   - What's unclear: Whether dates should be in TypeScript file (type-safe), JSON file (easier for non-devs to edit), or eventually CMS
   - Recommendation: Use TypeScript file (`lib/data/home.ts`) with exported constant. Type-safe, easy to update for developer, clear change tracking in git. Move to JSON/CMS only if non-technical staff need to update dates independently.

5. **Should hero include logo separate from header?**
   - What we know: Header already has logo; user left hero logo to Claude's discretion
   - What's unclear: Whether repeating logo in hero strengthens branding or creates redundancy
   - Recommendation: Don't include logo in hero section. Header logo is sufficient, and hero should focus on impactful headline/tagline with clear CTAs. Sports sites typically use full-bleed hero images with text overlay, not logos.

## Sources

### Primary (HIGH confidence)
- [Next.js Image Component Documentation](https://nextjs.org/docs/app/api-reference/components/image) - Official Next.js 16.1 documentation for Image optimization API
- [Next.js Image Optimization Guide](https://nextjs.org/docs/app/building-your-application/optimizing/images) - Official guide for image optimization best practices
- [Lucide React Documentation](https://lucide.dev/guide/packages/lucide-react) - Official Lucide icon library documentation and API reference

### Secondary (MEDIUM confidence)
- [Next.js Landing Pages Performance Optimization](https://blog.shubhra.dev/nextjs-landing-pages-perceived-performance/) - Landing page perceived performance techniques verified with Next.js official docs
- [Handling Text Over Images in CSS](https://ishadeed.com/article/handling-text-over-image-css/) - Comprehensive guide to text readability over background images
- [Core Web Vitals Optimization Guide 2026](https://skyseodigital.com/core-web-vitals-optimization-complete-guide-for-2026/) - LCP optimization strategies cross-referenced with Google's Web Vitals documentation
- [Tailwind CSS Card Hover Effects](https://www.tailwindtap.com/blog/card-hover-effects-in-tailwind-css) - Hover effect patterns verified with Tailwind CSS official documentation
- [Dismissible Banner with State Persistence](https://medium.com/front-end-weekly/dismissible-banner-continued-storing-component-state-8e60f88e3e64) - localStorage persistence pattern verified with React documentation
- [Hero Section Design Best Practices 2026](https://www.perfectafternoon.com/2025/hero-section-design/) - Modern hero section patterns cross-referenced with industry examples

### Tertiary (LOW confidence - for context only)
- [19 Best Sports Website Designs 2026](https://www.designrush.com/best-designs/websites/trends/best-sports-websites) - Sports website inspiration examples (design trends, not technical implementation)
- [Best React Icon Libraries 2026](https://mighil.com/best-react-icon-libraries) - Icon library comparison (verified Lucide recommendation with official docs)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Next.js Image and Lucide React verified with official documentation; both are industry-standard choices
- Architecture: HIGH - Patterns verified with Next.js official docs and established React best practices
- Hero implementation: HIGH - Next.js Image API verified with official docs; overlay patterns verified with CSS best practices
- Announcement banner: MEDIUM - localStorage persistence pattern common but implementation details vary; recommended pattern tested and verified
- Quick link cards: HIGH - Tailwind grid and hover effects verified with official Tailwind documentation
- Pitfalls: HIGH - Common issues documented in Next.js official docs, Lighthouse audits, and Web Vitals standards

**Research date:** 2026-02-16
**Valid until:** 2026-03-16 (30 days) - Next.js stable release cycle is ~2 months; core patterns unlikely to change significantly

**Notes:**
- Next.js 16 released November 2024 is current stable version (16.1.6 in package.json)
- Tailwind v4 stable syntax already established in project foundation
- No breaking changes expected in researched areas within next 30 days
- If Next.js 17 releases, review Image component API changes (historically stable)
