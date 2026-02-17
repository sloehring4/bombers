# Phase 5: Organization Pages - Research

**Researched:** 2026-02-16
**Domain:** Next.js 16 static page routing, React accordion UI patterns, sponsor presentation, organization content structure
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Page structure:**
- Multiple separate pages: About, Board/Staff, Code of Conduct, Sponsors
- Each page is its own route under the site navigation
- Sponsors also get a summary section on the home page ("Our Sponsors")

**Leadership display:**
- Board members have: names, titles, and photos available
- No contact info on the page — privacy-first, same as coaches (link to Contact page)
- Claude's discretion on grouping (Board vs Staff sections) and card vs list layout based on data

**Code of conduct:**
- Collapsible accordion sections — keeps page compact, users expand what they need
- Content pulled from existing JerseyWatch site
- Claude structures sections based on common youth baseball org patterns
- Claude decides whether to include a brief values intro or keep it strictly rules/expectations

**Sponsor presentation:**
- Cards with details: logo + company name + short description per sponsor
- Sponsors appear on dedicated Sponsors page AND as a section on the home page
- Mix of real and placeholder sponsor data — structure must support easy data replacement
- Claude decides whether to include a "Become a Sponsor" CTA

### Claude's Discretion

- About page content balance (mission, history, structure)
- Navigation approach for org pages (dropdown vs flat)
- Page header style (hero banners vs simple headers) — match existing site patterns
- Board/Staff grouping and display layout
- Code of conduct section structure
- Whether to include values intro on conduct page
- "Become a Sponsor" CTA inclusion

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

## Summary

Building organization pages in Next.js 16 App Router requires static page routes for About, Board/Staff, Code of Conduct, and Sponsors pages, client-side accordion components using React state management, and responsive sponsor card grids. The phase focuses on informational content presentation with privacy-first leadership displays and accessible accordion patterns for code of conduct content.

**Key findings:** Static pages use standard `app/[route]/page.tsx` structure; accordion components require `"use client"` directive for state management; native HTML `<details>/<summary>` elements provide semantic accessibility but lack styling flexibility — custom React accordion recommended; sponsor cards use responsive grid with Next.js Image for logo optimization; leadership cards follow established CoachCard pattern from Phase 4 with privacy-first approach (no contact info).

**Primary recommendation:** Create four static page routes (`/about`, `/board-staff`, `/code-of-conduct`, `/sponsors`), build reusable Accordion component using React useState for single-item expansion, follow established card grid pattern for board members (same as coaches), use sponsor card component for both dedicated page and home page section, and structure code of conduct with sections for Players, Parents, Coaches, and Spectators based on JerseyWatch best practices.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js App Router | 16.1.6 (installed) | Static page routes with metadata | Standard routing for content pages |
| React 19 | 19.2.3 (installed) | useState for accordion state management | Native state handling for interactive UI |
| next/image | Built-in | Sponsor logos, board member photos | Automatic optimization, responsive sizing, WebP conversion |
| TypeScript | 5.x (installed) | Type-safe org data structures | Prevents data shape errors, provides autocomplete |
| Tailwind CSS | v4 (installed) | Responsive card grids, accordion styling | Established pattern for cards and responsive layouts |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 0.564+ (installed) | ChevronDown/ChevronUp icons for accordion | Consistent with existing icon usage |
| clsx | 2.1.1 (installed) | Conditional styling for accordion expand/collapse states | Already in project, ideal for interactive state styling |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom React accordion | Native `<details>/<summary>` | Native HTML is semantic and accessible out of box, but limited styling flexibility and can't control expand behavior (allows multiple open). Custom React gives full control over UI and single-item expansion. |
| Single expanded item | Multiple simultaneous expansion | Single expansion keeps page compact, follows standard accordion UX. Multiple expansion can overwhelm with too much content visible. |
| Card grid for leadership | List layout | Cards show photos prominently, consistent with coach display pattern. List layout more compact but less visual. |
| Sponsor data in TypeScript file | JSON files | TypeScript provides type safety consistent with Phase 4 teams pattern. JSON easier for non-devs but Phase 9 CMS will replace both. |

**Installation:**
No new dependencies required — all needed libraries already installed.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── about/
│   │   └── page.tsx                 # About page
│   ├── board-staff/
│   │   └── page.tsx                 # Board/Staff page
│   ├── code-of-conduct/
│   │   └── page.tsx                 # Code of conduct page
│   └── sponsors/
│       └── page.tsx                 # Sponsors page
├── components/
│   ├── organization/
│   │   ├── BoardMemberCard.tsx      # Board member display (reuses coach card pattern)
│   │   ├── SponsorCard.tsx          # Sponsor logo + details
│   │   ├── SponsorGrid.tsx          # Reusable sponsor grid for page + home
│   │   └── Accordion.tsx            # Reusable accordion component
│   └── home/
│       └── SponsorsSection.tsx      # Home page sponsor section
└── lib/
    └── data/
        ├── organization.ts          # Board/staff data
        ├── sponsors.ts              # Sponsor data
        └── conduct.ts               # Code of conduct content sections
```

### Pattern 1: Static Page Routes with Metadata
**What:** Create standard static page routes for organization pages with SEO metadata
**When to use:** Content pages that don't require dynamic routing (follows established Phase 3/4 pattern)
**Example:**
```typescript
// app/about/page.tsx
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us | O'Fallon Bombers",
  description: "Learn about the O'Fallon Bombers baseball organization — our mission, history, and commitment to developing young athletes.",
};

export default function AboutPage() {
  return (
    <main className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-bombers-navy mb-6">
          About the Bombers
        </h1>
        {/* Content sections */}
      </div>
    </main>
  );
}
```
**Source:** [Next.js Metadata Documentation](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

### Pattern 2: Client-Side Accordion Component
**What:** Reusable accordion component with single-item expansion using React useState
**When to use:** Code of conduct sections, FAQs, any collapsible content (NOT native details/summary for better UX control)
**Example:**
```typescript
// components/organization/Accordion.tsx
// Source: https://www.sitepoint.com/react-js-accordion-component/
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className="border-2 border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Accordion header */}
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="text-lg font-semibold text-bombers-navy text-left">
                {item.title}
              </span>
              <ChevronDown
                className={clsx(
                  'w-5 h-5 text-bombers-navy transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </button>

            {/* Accordion content */}
            {isOpen && (
              <div className="px-6 py-4 bg-gray-50 border-t-2 border-gray-200">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
```
**Source:** [How to Build an Accordion Component with React.js](https://www.sitepoint.com/react-js-accordion-component/)

### Pattern 3: Board Member Card (Reuse Coach Pattern)
**What:** Card component for board members/staff using established CoachCard pattern from Phase 4
**When to use:** Leadership display pages with photos, names, titles (privacy-first, no contact info)
**Example:**
```typescript
// components/organization/BoardMemberCard.tsx
import Image from 'next/image';

interface BoardMember {
  name: string;
  title: string;
  photoUrl: string;
  bio?: string;
}

interface BoardMemberCardProps {
  member: BoardMember;
}

export default function BoardMemberCard({ member }: BoardMemberCardProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden hover:border-bombers-yellow hover:shadow-lg transition-all">
      {/* Photo section */}
      <div className="relative bg-gray-100 aspect-square">
        <Image
          src={member.photoUrl}
          alt={`${member.name} - ${member.title}`}
          width={400}
          height={400}
          className="object-cover w-full h-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Info section */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-bombers-navy mb-1">
          {member.name}
        </h3>
        <p className="text-sm text-gray-600">
          {member.title}
        </p>
        {member.bio && (
          <p className="text-sm text-gray-500 mt-2">{member.bio}</p>
        )}
      </div>
    </div>
  );
}
```
**Note:** Pattern identical to CoachCard from Phase 4, maintains consistency across leadership displays

### Pattern 4: Sponsor Card and Grid
**What:** Sponsor card component with logo, name, description + reusable grid for page and home section
**When to use:** Dedicated sponsors page and home page "Our Sponsors" section
**Example:**
```typescript
// components/organization/SponsorCard.tsx
import Image from 'next/image';

interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  websiteUrl?: string;
}

interface SponsorCardProps {
  sponsor: Sponsor;
}

export default function SponsorCard({ sponsor }: SponsorCardProps) {
  const CardContent = (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-bombers-yellow hover:shadow-lg transition-all">
      {/* Logo */}
      <div className="relative h-24 mb-4 flex items-center justify-center">
        <Image
          src={sponsor.logoUrl}
          alt={`${sponsor.name} logo`}
          width={200}
          height={96}
          className="object-contain"
        />
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-bombers-navy mb-2 text-center">
        {sponsor.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 text-center">
        {sponsor.description}
      </p>
    </div>
  );

  // If sponsor has website, make card clickable
  if (sponsor.websiteUrl) {
    return (
      <a
        href={sponsor.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {CardContent}
      </a>
    );
  }

  return CardContent;
}

// components/organization/SponsorGrid.tsx
import SponsorCard from './SponsorCard';
import type { Sponsor } from '@/lib/data/sponsors';

interface SponsorGridProps {
  sponsors: Sponsor[];
  limit?: number; // For home page: show subset
}

export default function SponsorGrid({ sponsors, limit }: SponsorGridProps) {
  const displaySponsors = limit ? sponsors.slice(0, limit) : sponsors;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displaySponsors.map((sponsor) => (
        <SponsorCard key={sponsor.id} sponsor={sponsor} />
      ))}
    </div>
  );
}
```
**Source:** [Tailwind CSS Customer Logos](https://flowbite.com/blocks/marketing/customer-logos/)

### Pattern 5: Type-Safe Organization Data
**What:** TypeScript interfaces for board members, sponsors, and code of conduct content
**When to use:** Ensures data consistency across organization pages (follows Phase 4 pattern)
**Example:**
```typescript
// lib/data/organization.ts
export interface BoardMember {
  name: string;
  title: string;
  photoUrl: string;
  bio?: string;
}

export const boardMembers: BoardMember[] = [
  {
    name: 'John Smith',
    title: 'President',
    photoUrl: '/images/board/placeholder.jpg',
    bio: 'John has been involved with youth baseball for over 15 years...',
  },
  // ...
];

export const staff: BoardMember[] = [
  // Staff members with different titles
];

// lib/data/sponsors.ts
export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  websiteUrl?: string;
  tier?: 'platinum' | 'gold' | 'silver' | 'bronze'; // For future tiered display
}

export const sponsors: Sponsor[] = [
  {
    id: 'sponsor-1',
    name: 'Example Business',
    logoUrl: '/images/sponsors/placeholder.jpg',
    description: 'Supporting youth baseball in our community',
    websiteUrl: 'https://example.com',
  },
  // Mix of real and placeholder data
];

// lib/data/conduct.ts
export interface ConductSection {
  id: string;
  title: string;
  rules: string[];
}

export const conductSections: ConductSection[] = [
  {
    id: 'players',
    title: 'Player Code of Conduct',
    rules: [
      'Display good sportsmanship to all players, coaches, officials, and opponents',
      'Follow coaching staff directions and respect all team rules',
      'Maintain a drug, tobacco, and alcohol-free commitment',
      // ...
    ],
  },
  {
    id: 'parents',
    title: 'Parent Code of Conduct',
    rules: [
      'Support your child positively regardless of game outcome',
      'Respect all coaches\' decisions and refrain from coaching from the sidelines',
      'Model good sportsmanship for all children',
      // ...
    ],
  },
  {
    id: 'coaches',
    title: 'Coach Code of Conduct',
    rules: [
      'Create a positive learning experience for all players',
      'Prioritize player development over winning',
      'Never argue with referees or officials',
      // ...
    ],
  },
  {
    id: 'spectators',
    title: 'Spectator Expectations',
    rules: [
      'Cheer positively for both teams',
      'Remain in designated spectator areas',
      'Respect all officials and their decisions',
      // ...
    ],
  },
];
```

### Anti-Patterns to Avoid
- **Don't use native `<details>/<summary>` for accordions:** Limited styling control, can't enforce single-item expansion, inconsistent browser styling. Use custom React component instead.
- **Don't allow multiple accordion items open:** Overwhelming amount of content visible, defeats purpose of compact accordion. Single expansion maintains focus.
- **Don't include contact info on board/staff page:** Privacy-first approach established in Phase 4 for coaches applies to all leadership. Link to contact page instead.
- **Don't use different card styles for board vs coaches:** Maintain visual consistency across leadership displays using same component pattern.
- **Don't hardcode sponsor logos without placeholder fallback:** Broken images look unprofessional. Implement placeholder image strategy from Phase 4.
- **Don't forget metadata for SEO:** Each org page should have unique title and description for search engines.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Accordion animation | Custom CSS transitions and height calculations | Tailwind transition utilities + conditional rendering | Complex height animations error-prone. Simple show/hide with icon rotation provides clear UX without animation complexity. |
| Image placeholders for sponsors | Random color backgrounds or initials | Consistent placeholder image strategy from Phase 4 | Visual consistency across site. Copy hero-placeholder.jpg pattern for sponsor/board placeholders. |
| Responsive sponsor grid | Custom media queries for different sponsor counts | Tailwind grid with auto-fit columns | Tailwind handles responsive breakpoints automatically. `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` pattern proven in Phase 4. |
| Code of conduct content formatting | Manual HTML formatting in JSX | Structured data with map() rendering | Maintainable, consistent formatting. Easy to update content without touching component code. |
| Accordion keyboard navigation | Custom keydown handlers | Native button elements with onClick | Buttons provide keyboard accessibility (Enter/Space) and focus management automatically. |
| Sponsor logo sizing | Manual width/height calculations | next/image with object-contain | Maintains aspect ratios, prevents distortion, handles different logo sizes automatically. |

**Key insight:** Organization pages are content-heavy but interaction-simple. The challenge is content structure (code of conduct sections, sponsor data organization) and maintaining visual consistency with established patterns (coach cards for board members). Use established Phase 4 patterns and React state management for accordion interactivity.

## Common Pitfalls

### Pitfall 1: Forgetting "use client" Directive for Accordion
**What goes wrong:** Accordion component throws React hydration error or useState not working
**Why it happens:**
- Next.js 16 App Router defaults to Server Components
- Accordion needs useState for interactive expand/collapse
- Server Components can't use React hooks or browser events
- TypeScript won't warn — error only appears at runtime

**How to avoid:**
- ALWAYS add `'use client'` as first line in accordion component file
- Any component using useState, useEffect, or event handlers needs client directive
- Parent pages can remain Server Components — only accordion needs client
- Test accordion interaction in browser, not just build success

**Warning signs:**
- Error: "You're importing a component that needs useState..."
- Hydration mismatch warnings in console
- Accordion renders but doesn't respond to clicks
- State updates don't trigger re-renders

**Source:** [Next.js "use client" Directive](https://nextjs.org/docs/app/api-reference/directives/use-client)

### Pitfall 2: Multiple Accordion Items Open Simultaneously
**What goes wrong:** Users expand multiple sections, page becomes overwhelming with too much visible content
**Why it happens:**
- Using array of open items instead of single openId state
- Accordion allows "toggle" behavior without closing others
- UX goal of compact accordion defeated by multiple open sections

**How to avoid:**
- Use single `openId` state (string | null), not array
- Toggle logic: `setOpenId(openId === id ? null : id)`
- Clicking same item closes it, clicking different item closes previous and opens new
- Single expansion is standard accordion UX pattern

**Warning signs:**
- Users complain about "too much scrolling" on code of conduct page
- Multiple sections visible at once during testing
- Accordion feels more like a show/hide toggle than focused navigation

**Source:** [React Accordion Patterns](https://mui.com/material-ui/react-accordion/)

### Pitfall 3: Sponsor Logos with Different Aspect Ratios Looking Inconsistent
**What goes wrong:** Sponsor cards have varying heights, logos appear stretched or poorly aligned
**Why it happens:**
- Sponsor logos are different sizes and aspect ratios (horizontal, vertical, square)
- Using `object-cover` instead of `object-contain` crops logos
- Fixed height on Image component distorts logos
- No consistent container height for logo area

**How to avoid:**
- Use `object-contain` on Image component (fits within container, preserves aspect ratio)
- Set consistent height container for logo area: `h-24` or similar
- Center logos with flexbox: `flex items-center justify-center`
- Provide width/height to Image as max dimensions, not exact size
- Test with variety of logo shapes (horizontal, vertical, square)

**Warning signs:**
- Logos appear stretched or distorted
- Inconsistent card heights in sponsor grid
- Logos not centered in their containers
- Different visual weight across sponsor cards

**Source:** [Next.js Image Component](https://nextjs.org/docs/app/api-reference/components/image)

### Pitfall 4: Forgetting Accessibility Attributes on Accordion
**What goes wrong:** Screen readers don't properly announce accordion state or structure
**Why it happens:**
- Missing `aria-expanded` attribute on accordion button
- Button doesn't convey expanded/collapsed state to assistive tech
- Heading hierarchy broken (accordion titles not proper heading tags)

**How to avoid:**
- Add `aria-expanded={isOpen}` to accordion button
- Use semantic heading tags for accordion titles: `<h3>` or appropriate level
- Ensure keyboard navigation works: button elements provide this automatically
- Test with screen reader (NVDA, JAWS, or VoiceOver)

**Warning signs:**
- Screen reader doesn't announce "expanded" or "collapsed"
- Keyboard navigation doesn't work as expected
- Accessibility audit tools flag missing ARIA attributes
- Users with assistive tech report confusion about page structure

**Source:** [Accessible Accordion Best Practices](https://www.aditus.io/patterns/accordion/)

### Pitfall 5: Not Handling Missing Board Member Photos
**What goes wrong:** Broken image icons appear for board members without photos
**Why it happens:**
- photoUrl points to non-existent file
- No fallback placeholder image configured
- Different from Phase 4 which had placeholder.jpg for all coaches

**How to avoid:**
- Follow Phase 4 placeholder strategy: copy hero-placeholder.jpg to `/images/board/placeholder.jpg`
- Use consistent placeholder for all board members initially
- Replace with real photos incrementally
- Test with mix of real and placeholder data before launch

**Warning signs:**
- Broken image icons (browser default) appearing on board page
- 404 errors in console for image paths
- Inconsistent visual appearance across board member cards

**Source:** Phase 4 placeholder image strategy (teams.ts data structure)

### Pitfall 6: Code of Conduct Content Too Long for Single Accordion Item
**What goes wrong:** Accordion sections with too many rules become overwhelming when expanded
**Why it happens:**
- Trying to fit all rules into single section
- No hierarchy or grouping within sections
- Long paragraphs instead of scannable bullet points

**How to avoid:**
- Break rules into logical groups (4-8 items per section)
- Use bullet list formatting for scannable rules
- Keep rule text concise (one sentence each)
- Consider sub-sections if content is extensive
- Follow JerseyWatch structure: separate sections for Players, Parents, Coaches, Spectators

**Warning signs:**
- Expanded accordion section requires significant scrolling
- Users miss rules at bottom of long lists
- Feedback that conduct page is "too much to read"

**Source:** [How to Create a Code of Conduct for Youth Sports](https://www.jerseywatch.com/blog/code-of-conduct-for-youth-sports)

## Code Examples

Verified patterns from official sources:

### Complete About Page with Metadata
```typescript
// app/about/page.tsx
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: "About Us | O'Fallon Bombers",
  description: "Learn about the O'Fallon Bombers baseball organization — our mission, history, and commitment to developing young athletes both on and off the field.",
};

export default function AboutPage() {
  return (
    <main className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-bombers-navy mb-4">
            About the O'Fallon Bombers
          </h1>
          <p className="text-xl text-gray-600">
            Building champions on and off the field since [YEAR]
          </p>
        </div>

        {/* Mission section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-bombers-navy mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The O'Fallon Bombers are dedicated to developing well-rounded young athletes through competitive baseball. We emphasize skill development, teamwork, sportsmanship, and character building in a positive, supportive environment.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our goal is to prepare players not just for success on the field, but for life beyond baseball — teaching discipline, resilience, leadership, and the value of hard work.
          </p>
        </section>

        {/* History section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-bombers-navy mb-4">Our History</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Founded in [YEAR], the O'Fallon Bombers have grown from a small group of dedicated families into one of the premier youth baseball organizations in the region. Over [X] years, we've coached hundreds of players and maintained a commitment to excellence both on and off the field.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Today, we field teams across multiple age divisions (7U through 15U) with experienced coaching staff and a strong support network of parents and volunteers.
          </p>
        </section>

        {/* Organization structure */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-bombers-navy mb-4">Organization Structure</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Bombers are governed by a volunteer Board of Directors who oversee operations, finances, and strategic planning. Our coaching staff consists of experienced volunteers who are background-checked and committed to player development.
          </p>
          <div className="bg-bombers-yellow/10 border-l-4 border-bombers-yellow p-6 rounded">
            <p className="text-gray-700">
              <strong className="text-bombers-navy">Want to learn more?</strong><br />
              Visit our <a href="/board-staff" className="text-bombers-navy hover:text-bombers-yellow underline">Board & Staff</a> page to meet our leadership team.
            </p>
          </div>
        </section>

        {/* Values section */}
        <section>
          <h2 className="text-2xl font-bold text-bombers-navy mb-4">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-bombers-navy mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">
                We strive for excellence in every aspect — from skill development to sportsmanship.
              </p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-bombers-navy mb-2">Teamwork</h3>
              <p className="text-gray-600 text-sm">
                Success comes through collaboration, support, and trust among teammates.
              </p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-bombers-navy mb-2">Character</h3>
              <p className="text-gray-600 text-sm">
                We build character through discipline, resilience, and integrity on and off the field.
              </p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-bombers-navy mb-2">Community</h3>
              <p className="text-gray-600 text-sm">
                We're more than a team — we're a family supporting each other and our community.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
```

### Code of Conduct Page with Accordion
```typescript
// app/code-of-conduct/page.tsx
import type { Metadata } from 'next';
import Accordion from '@/components/organization/Accordion';
import { conductSections } from '@/lib/data/conduct';

export const metadata: Metadata = {
  title: "Code of Conduct | O'Fallon Bombers",
  description: "Our code of conduct outlines expectations for players, parents, coaches, and spectators to maintain a positive, respectful environment.",
};

export default function CodeOfConductPage() {
  // Transform conduct data into accordion items
  const accordionItems = conductSections.map((section) => ({
    id: section.id,
    title: section.title,
    content: (
      <ul className="space-y-2">
        {section.rules.map((rule, idx) => (
          <li key={idx} className="flex gap-3">
            <span className="text-bombers-yellow mt-1">•</span>
            <span className="text-gray-700">{rule}</span>
          </li>
        ))}
      </ul>
    ),
  }));

  return (
    <main className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-bombers-navy mb-4">
            Code of Conduct
          </h1>
          <p className="text-lg text-gray-600">
            Creating a positive environment for everyone involved in Bombers baseball
          </p>
        </div>

        {/* Values intro */}
        <div className="bg-bombers-yellow/10 border-l-4 border-bombers-yellow p-6 rounded-lg mb-8">
          <p className="text-gray-700 leading-relaxed">
            The O'Fallon Bombers are committed to providing a positive, respectful environment where athletes can learn and grow. All players, parents, coaches, and spectators are expected to demonstrate good sportsmanship, respect, and integrity.
          </p>
        </div>

        {/* Accordion sections */}
        <Accordion items={accordionItems} />

        {/* Enforcement notice */}
        <div className="mt-8 bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-bombers-navy mb-2">Enforcement</h2>
          <p className="text-gray-700 text-sm">
            Violations of this code of conduct may result in warnings, game suspensions, or removal from the organization. The Board of Directors reserves the right to address conduct issues on a case-by-case basis.
          </p>
        </div>
      </div>
    </main>
  );
}
```

### Board & Staff Page with Card Grid
```typescript
// app/board-staff/page.tsx
import type { Metadata } from 'next';
import BoardMemberCard from '@/components/organization/BoardMemberCard';
import { boardMembers, staff } from '@/lib/data/organization';

export const metadata: Metadata = {
  title: "Board & Staff | O'Fallon Bombers",
  description: "Meet the O'Fallon Bombers Board of Directors and staff who lead and support our organization.",
};

export default function BoardStaffPage() {
  return (
    <main className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Page header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-bombers-navy mb-4">
            Board & Staff
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our volunteer leadership team is dedicated to providing the best possible experience for Bombers players and families.
          </p>
        </div>

        {/* Board of Directors section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-bombers-navy mb-6 pb-2 border-b-4 border-bombers-yellow">
            Board of Directors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardMembers.map((member) => (
              <BoardMemberCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        {/* Staff section (if applicable) */}
        {staff.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-bombers-navy mb-6 pb-2 border-b-4 border-bombers-yellow">
              Staff
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {staff.map((member) => (
                <BoardMemberCard key={member.name} member={member} />
              ))}
            </div>
          </section>
        )}

        {/* Contact CTA */}
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8 text-center">
          <h2 className="text-xl font-bold text-bombers-navy mb-2">
            Questions or Feedback?
          </h2>
          <p className="text-gray-700 mb-4">
            We'd love to hear from you. Reach out through our contact page.
          </p>
          <a
            href="/contact"
            className="inline-block bg-bombers-yellow text-bombers-navy font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </main>
  );
}
```

### Sponsors Page with Grid and CTA
```typescript
// app/sponsors/page.tsx
import type { Metadata } from 'next';
import SponsorGrid from '@/components/organization/SponsorGrid';
import { sponsors } from '@/lib/data/sponsors';

export const metadata: Metadata = {
  title: "Our Sponsors | O'Fallon Bombers",
  description: "Thank you to our sponsors who make Bombers baseball possible through their generous support of youth athletics.",
};

export default function SponsorsPage() {
  return (
    <main className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Page header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-bombers-navy mb-4">
            Our Sponsors
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're grateful to our sponsors for their generous support of youth baseball in our community.
          </p>
        </div>

        {/* Sponsor grid */}
        <SponsorGrid sponsors={sponsors} />

        {/* Become a Sponsor CTA */}
        <div className="mt-16 bg-bombers-navy text-white rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Become a Sponsor
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Support youth baseball in our community while gaining visibility for your business. Sponsorship packages available at multiple levels.
          </p>
          <a
            href="/contact"
            className="inline-block bg-bombers-yellow text-bombers-navy font-semibold px-8 py-4 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Contact Us About Sponsorship
          </a>
        </div>
      </div>
    </main>
  );
}
```

### Home Page Sponsor Section
```typescript
// components/home/SponsorsSection.tsx
import Link from 'next/link';
import SponsorGrid from '@/components/organization/SponsorGrid';
import { sponsors } from '@/lib/data/sponsors';

export default function SponsorsSection() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-bombers-navy mb-4">
            Our Sponsors
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Thank you to our sponsors for supporting youth baseball in our community
          </p>
        </div>

        {/* Sponsor grid (limited to 8 for home page) */}
        <SponsorGrid sponsors={sponsors} limit={8} />

        {/* View all link */}
        <div className="text-center mt-8">
          <Link
            href="/sponsors"
            className="inline-block text-bombers-navy hover:text-bombers-yellow font-semibold transition-colors"
          >
            View All Sponsors →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| jQuery accordion plugins | React useState accordion | React adoption (2018+) | Simpler state management, no external dependencies, better performance |
| Native `<details>/<summary>` | Custom React accordion with state | UX maturity (2022+) | Better UX control (single expansion), consistent styling across browsers, smoother animations |
| Multiple metadata exports | Single `metadata` object or `generateMetadata` | Next.js 13 App Router (Oct 2022) | Simpler API, better TypeScript support, automatic SEO optimization |
| CSS Grid with media queries | Tailwind responsive grid utilities | Tailwind adoption (2019+) | Faster development, consistent breakpoints, mobile-first approach |
| Manual logo sizing | `next/image` with object-contain | Next.js 10 (Oct 2020) | Automatic optimization, maintains aspect ratios, responsive sizing |
| Separate component files for similar patterns | Component reuse (CoachCard → BoardMemberCard) | Modern React patterns (2020+) | DRY principle, consistent UI, easier maintenance |

**Deprecated/outdated:**
- **jQuery accordion plugins:** Heavy dependency, outdated pattern. React state management is standard.
- **Native `<details>/<summary>` for complex accordions:** Limited styling control, can't enforce single expansion, browser inconsistencies
- **Manual accordion animations:** Complex CSS transitions error-prone. Simple show/hide with icon rotation cleaner.
- **Individual metadata exports (Pages Router):** App Router uses single metadata object with better TypeScript support

## Open Questions

1. **Should board members have separate sections (Board vs Staff) or combined?**
   - What we know: User left to Claude's discretion; need to display names, titles, photos
   - What's unclear: Whether organization has distinct staff roles vs all volunteer board
   - Recommendation: Create separate sections IF staff data exists, otherwise single "Board of Directors" section. Flexibility in data structure allows either pattern. Implementation uses conditional rendering: `{staff.length > 0 && <section>...</section>}`.

2. **Should sponsor section on home page show all sponsors or limited subset?**
   - What we know: Sponsors appear on dedicated page AND home page
   - What's unclear: How many sponsors to show on home (all vs featured)
   - Recommendation: Show 8 sponsors on home page with "View All Sponsors" link to dedicated page. Prevents home page from becoming too long while giving sponsors visibility. SponsorGrid component accepts `limit` prop for this purpose.

3. **Should code of conduct include values introduction or be strictly rules?**
   - What we know: User left to Claude's discretion
   - What's unclear: Balance between welcoming tone vs direct rules communication
   - Recommendation: Include brief values introduction (2-3 sentences) before accordion to set positive tone, then use accordion for detailed rules by stakeholder group. Makes page approachable while keeping rules organized and scannable.

4. **Should "Become a Sponsor" CTA be included on sponsors page?**
   - What we know: User left to Claude's discretion
   - What's unclear: Whether organization actively seeking new sponsors
   - Recommendation: Include CTA at bottom of sponsors page linking to contact form. Low-commitment addition that opens sponsorship pathway without being pushy. Can be easily removed if org not accepting new sponsors.

5. **Should navigation include dropdown for org pages or flat links?**
   - What we know: User left to Claude's discretion; four org pages (About, Board/Staff, Code of Conduct, Sponsors)
   - What's unclear: Whether to group under "About" dropdown or keep navigation flat
   - Recommendation: Keep navigation flat initially (matches existing simple nav pattern). Four links fit comfortably in desktop nav, can be reorganized into dropdown in future phase if navigation becomes crowded. Simpler implementation, clearer for users.

## Sources

### Primary (HIGH confidence)
- [Next.js App Router Documentation](https://nextjs.org/docs/app) - Official Next.js 16 App Router patterns
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - Official metadata configuration
- [Next.js "use client" Directive](https://nextjs.org/docs/app/api-reference/directives/use-client) - Client component requirements
- [Next.js Image Component](https://nextjs.org/docs/app/api-reference/components/image) - Official image optimization API
- [React useState Documentation](https://react.dev/reference/react/useState) - Official React hooks documentation

### Secondary (MEDIUM confidence)
- [How to Build an Accordion Component with React.js](https://www.sitepoint.com/react-js-accordion-component/) - React accordion patterns verified with React docs
- [React Accordion Component - Material UI](https://mui.com/material-ui/react-accordion/) - Accordion UX patterns from established library
- [Accessible Accordion Best Practices](https://www.aditus.io/patterns/accordion/) - WCAG-compliant accordion patterns
- [lucide-react ChevronDown Icon](https://lucide.dev/icons/chevron-down) - Icon library documentation
- [Tailwind CSS Customer Logos](https://flowbite.com/blocks/marketing/customer-logos/) - Sponsor logo grid patterns
- [How to Create a Code of Conduct for Youth Sports - JerseyWatch](https://www.jerseywatch.com/blog/code-of-conduct-for-youth-sports) - Youth sports conduct content structure
- [Youth Sports Organization About Us Structure](https://www.usyouthsoccer.org/about/) - Organization page content patterns
- [Youth Sports Sponsorship Best Practices](https://www.jerseywatch.com/blog/youth-sports-sponsorship-package) - Sponsor display guidance

### Tertiary (LOW confidence - for context only)
- [Native HTML Accordion with details/summary](https://nikitahl.com/native-html-accordion) - Alternative approach, but limited styling control
- [Pinterest Board of Directors Design](https://www.pinterest.com/ideas/board-of-directors-design/903262715123/) - Visual inspiration only, no implementation details
- [Nonprofit Website Design for Board Pages](https://www.socialectric.com/insights/nonprofit-website-layouts) - General guidance, not technical implementation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed, Next.js 16 patterns well-established
- Architecture: HIGH - Patterns follow established Phase 4 conventions (card grids, data structures)
- Accordion pattern: HIGH - React useState pattern verified with official React docs and multiple sources
- Sponsor display: HIGH - Pattern consistent with Phase 4 team cards, verified with Tailwind docs
- Code of conduct content: MEDIUM - JerseyWatch guidance provides structure, but content needs organization-specific adaptation
- SEO metadata: HIGH - Next.js 16 metadata API verified with official documentation

**Research date:** 2026-02-16
**Valid until:** 2026-03-16 (30 days) - Next.js stable, React patterns mature, no breaking changes expected

**Notes:**
- Next.js 16.1.6 is current stable version (released Nov 2024)
- React 19.2.3 stable, useState pattern well-established
- Accordion pattern proven in multiple UI libraries (MUI, Amplify UI, React Bootstrap)
- Phase 4 card grid and data structure patterns apply directly to board member and sponsor displays
- JerseyWatch content guidance based on youth sports industry standards
- All required dependencies already installed, no new packages needed
