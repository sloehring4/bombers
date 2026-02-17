# Phase 4: Teams & Rosters System - Research

**Researched:** 2026-02-16
**Domain:** Next.js 15 dynamic routing for multi-level team/roster navigation, TypeScript data structures, mobile-responsive roster displays
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Team naming convention:**
- Teams are identified by age level + head coach's last name (e.g., "10U Cook")
- Multiple teams can exist within the same age group (e.g., 10U Cook, 10U Smith)
- Approximately 5-8 age groups with 10-15 total teams

**Team listing layout:**
- Claude's discretion on layout approach (card grid vs grouped list)
- Each team entry shows: age group label and head coach name
- Teams visually grouped by age group on the overview page

**Roster page — players:**
- Player details: name and jersey number only (no position or grade)
- Claude's discretion on display format (table vs cards)

**Roster page — coaches:**
- Coach display: name, role (Head Coach, Assistant), and photo
- Claude's discretion on whether to show coach contact info (balance privacy vs accessibility)

**Team photo:**
- Team photo included on roster page but not as the main visual focus — smaller/secondary placement

**Season context:**
- Teams page shows current season label (e.g., "Spring 2026 Rosters") so parents know rosters are current

### Claude's Discretion

- Team listing layout style (card grid vs grouped list vs hybrid)
- Player display format (table vs cards — optimize for mobile)
- Navigation flow: two-level (age group → teams) vs flat list with grouping
- Whether each team gets its own page URL or expands inline
- Sibling navigation between teams in the same age group
- Empty roster state approach ("coming soon" message vs hiding unpopulated teams)
- Data structure (JSON files in repo — consistent with Phase 9 CMS plans)
- Coach contact visibility on roster pages

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

## Summary

Building a Teams & Rosters system in Next.js 15 App Router requires dynamic routes with `generateStaticParams` for pre-rendering, responsive table/card patterns for mobile-optimized player rosters, and type-safe data structures for team/player/coach information. Next.js 15 made `params` asynchronous (must await), which is critical to avoid runtime errors when accessing route parameters.

**Key findings:** Dynamic routes use `[slug]` folder naming with `generateStaticParams` to pre-render all team pages at build time; `params` prop is now a Promise and must be awaited before accessing values; mobile roster displays work best with card layouts (converts table rows to cards) rather than horizontal scrolling; grouping teams by age group on overview page improves scannability; TypeScript interfaces ensure type safety across team/player/coach data.

**Primary recommendation:** Use flat URL structure (`/teams/[teamId]`) with team ID as slug (e.g., "10u-cook"), group teams by age group on overview page using array `.reduce()` pattern, convert roster tables to card layout on mobile using Tailwind responsive utilities, and follow existing data pattern from Phase 3 (TypeScript file in `src/lib/data/teams.ts` for type-safe team data).

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js App Router | 16.1.6 (installed) | Dynamic routes with `generateStaticParams` | Official Next.js pattern for static generation of dynamic routes |
| next/image | Built-in | Coach photos, team photos | Automatic optimization, responsive sizing, WebP conversion |
| TypeScript | 5.x (installed) | Type-safe team/roster data structures | Prevents data shape errors, provides autocomplete for nested objects |
| Tailwind CSS | v4 (installed) | Responsive table/card layouts | Mobile-first breakpoints for table-to-card transformation |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | 2.1.1 (installed) | Conditional styling for active team nav, empty states | Already in project, ideal for roster row styling |
| lucide-react | 0.564+ (installed) | Icons for jersey numbers, navigation arrows | Consistent with Phase 3 home page patterns |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Flat `/teams/[teamId]` | Nested `/teams/[ageGroup]/[teamId]` | Nested URLs more semantic but require two dynamic segments and complex `generateStaticParams`. Flat URLs simpler, work well with team IDs like "10u-cook". |
| Card layout on mobile | Horizontal scroll table | Cards eliminate scrolling frustration, show all data without interaction. Horizontal scroll is anti-pattern on mobile. |
| TypeScript data file | JSON files | TypeScript provides type safety, imports, and autocomplete. JSON easier for non-devs but no type checking. Phase 9 CMS will replace both. |
| Group by reduce | Nested folder structure | Reduce allows dynamic grouping in code. Folder structure rigid, doesn't reflect actual URL structure. |

**Installation:**
No new dependencies required — all needed libraries already installed.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   └── teams/
│       ├── page.tsx             # Teams overview (grouped by age)
│       └── [teamId]/
│           └── page.tsx         # Individual roster page
├── components/
│   └── teams/
│       ├── TeamCard.tsx         # Team card for overview
│       ├── TeamGroup.tsx        # Age group section wrapper
│       ├── RosterTable.tsx      # Player roster (responsive)
│       ├── PlayerCard.tsx       # Mobile player card
│       ├── CoachCard.tsx        # Coach display with photo
│       └── TeamPhoto.tsx        # Team photo component
└── lib/
    └── data/
        └── teams.ts             # Type-safe team/roster data
```

### Pattern 1: Dynamic Route with generateStaticParams
**What:** Pre-render all team roster pages at build time using `generateStaticParams`
**When to use:** When you have a known list of teams and want static HTML for each (fast page loads, SEO-friendly)
**Example:**
```typescript
// app/teams/[teamId]/page.tsx
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes

import { teams } from '@/lib/data/teams';
import type { PageProps } from '@/lib/types';

// Generate static paths for all teams at build time
export async function generateStaticParams() {
  return teams.map((team) => ({
    teamId: team.id, // e.g., "10u-cook"
  }));
}

export default async function TeamRosterPage({ params }: PageProps<'/teams/[teamId]'>) {
  // CRITICAL: params is a Promise in Next.js 15+ - must await
  const { teamId } = await params;

  // Find team data by ID
  const team = teams.find(t => t.id === teamId);

  if (!team) {
    notFound(); // 404 if team not found
  }

  return (
    <div>
      <h1>{team.name} Roster</h1>
      {/* Roster components */}
    </div>
  );
}
```
**Source:** [Next.js Dynamic Routes Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes)

### Pattern 2: Grouping Teams by Age Group
**What:** Transform flat team array into grouped object for organized display
**When to use:** Teams overview page where teams need visual grouping by age
**Example:**
```typescript
// app/teams/page.tsx
import { teams } from '@/lib/data/teams';

export default function TeamsPage() {
  // Group teams by age group
  const teamsByAge = teams.reduce((acc, team) => {
    const age = team.ageGroup; // e.g., "7U", "10U"
    if (!acc[age]) {
      acc[age] = [];
    }
    acc[age].push(team);
    return acc;
  }, {} as Record<string, typeof teams>);

  // Sort age groups
  const sortedAges = Object.keys(teamsByAge).sort((a, b) => {
    const numA = parseInt(a);
    const numB = parseInt(b);
    return numA - numB;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-bombers-navy mb-2">Our Teams</h1>
        <p className="text-lg text-gray-600">Spring 2026 Rosters</p>
      </div>

      {sortedAges.map((age) => (
        <TeamGroup key={age} ageGroup={age} teams={teamsByAge[age]} />
      ))}
    </div>
  );
}
```

### Pattern 3: Responsive Table to Card Layout
**What:** Display player roster as table on desktop, cards on mobile using Tailwind responsive utilities
**When to use:** Any tabular data that needs mobile optimization (rosters, schedules, stats)
**Example:**
```typescript
// components/teams/RosterTable.tsx
import type { Player } from '@/lib/data/teams';

interface RosterTableProps {
  players: Player[];
}

export default function RosterTable({ players }: RosterTableProps) {
  return (
    <>
      {/* Desktop: Traditional table */}
      <table className="hidden md:table w-full border-collapse">
        <thead>
          <tr className="bg-bombers-navy text-white">
            <th className="p-3 text-left">Jersey #</th>
            <th className="p-3 text-left">Player Name</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, idx) => (
            <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3 font-semibold text-bombers-navy">{player.jerseyNumber}</td>
              <td className="p-3">{player.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile: Card layout */}
      <div className="md:hidden space-y-3">
        {players.map((player, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg border-2 border-gray-200 flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-bombers-yellow rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-bombers-navy">{player.jerseyNumber}</span>
            </div>
            <div>
              <p className="font-semibold text-bombers-navy">{player.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
```
**Source:** [Tailwind Responsive Tables Pattern](https://tallpad.com/series/tailwindcss-patterns/lessons/responsive-tables-on-mobile-screens)

### Pattern 4: Type-Safe Team Data Structure
**What:** TypeScript interfaces for teams, players, and coaches with centralized data file
**When to use:** Ensures data consistency across overview and roster pages (follows Phase 3 pattern)
**Example:**
```typescript
// lib/data/teams.ts
export interface Player {
  name: string;
  jerseyNumber: number;
}

export interface Coach {
  name: string;
  role: 'Head Coach' | 'Assistant Coach';
  photoUrl: string;
  email?: string; // Optional - Claude's discretion
  phone?: string; // Optional - Claude's discretion
}

export interface Team {
  id: string;           // URL slug: "10u-cook"
  name: string;         // Display name: "10U Cook"
  ageGroup: string;     // "7U", "10U", etc.
  headCoachName: string; // For team card display
  players: Player[];
  coaches: Coach[];
  teamPhotoUrl?: string; // Optional team photo
  season: string;       // "Spring 2026"
}

export const teams: Team[] = [
  {
    id: '10u-cook',
    name: '10U Cook',
    ageGroup: '10U',
    headCoachName: 'Coach Cook',
    season: 'Spring 2026',
    players: [
      { name: 'Johnny Smith', jerseyNumber: 12 },
      { name: 'Sarah Johnson', jerseyNumber: 5 },
      // ...
    ],
    coaches: [
      {
        name: 'Mike Cook',
        role: 'Head Coach',
        photoUrl: '/images/coaches/cook.jpg',
      },
      {
        name: 'Lisa Davis',
        role: 'Assistant Coach',
        photoUrl: '/images/coaches/davis.jpg',
      },
    ],
    teamPhotoUrl: '/images/teams/10u-cook.jpg',
  },
  // ... more teams
];
```

### Anti-Patterns to Avoid
- **Don't forget to await params:** Next.js 15+ requires `const { teamId } = await params` — synchronous access will fail at runtime
- **Don't use horizontal scroll for tables on mobile:** Frustrating UX, hard to see all columns. Convert to cards instead.
- **Don't use nested dynamic routes without clear need:** `/teams/[ageGroup]/[teamId]` adds complexity. Flat `/teams/[teamId]` is simpler.
- **Don't hardcode team lists in components:** Use centralized data file for single source of truth
- **Don't skip `notFound()` check:** If team ID doesn't exist, show 404 page instead of undefined error
- **Don't forget empty state handling:** Teams with no players should show "Roster coming soon" message, not empty table

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Static generation of dynamic routes | Custom build script to generate HTML | `generateStaticParams` | Next.js handles pre-rendering, hydration, prefetching automatically. Custom scripts miss React Server Components benefits. |
| Grouping logic | Complex nested loops or manual categorization | Array `.reduce()` with object accumulator | Standard JavaScript pattern, easy to test, maintains type safety. |
| Responsive table patterns | Custom media queries and duplicate markup | Tailwind responsive utilities (`hidden md:table`) | Mobile-first, consistent breakpoints, no custom CSS maintenance. |
| Async params handling | Custom wrapper or params conversion | Built-in `await params` | Next.js ensures proper async handling during SSR and client navigation. |
| Image optimization for coach photos | Manual image resizing and format conversion | `next/image` with width/height props | Automatic WebP/AVIF, responsive srcset, lazy loading out of box. |
| Empty state logic | Inline conditionals scattered through components | Dedicated empty state components | Reusable, consistent messaging, easier to update. |

**Key insight:** Team roster pages are content-heavy but structurally simple. The challenge isn't UI complexity — it's data organization (grouping, filtering), performance (image optimization, static generation), and mobile responsiveness (table transformation). Use Next.js and Tailwind built-ins rather than custom solutions.

## Common Pitfalls

### Pitfall 1: Not Awaiting Params in Next.js 15+
**What goes wrong:** Runtime error or TypeScript error when trying to access `params.teamId` directly
**Why it happens:**
- Next.js 15 changed `params` to be a Promise for better streaming and async performance
- Old pattern `({ params })` and immediate access `params.teamId` no longer works
- TypeScript shows error: "Property 'teamId' does not exist on type 'Promise<...>'"

**How to avoid:**
- ALWAYS await params: `const { teamId } = await params`
- Mark page component as `async`: `export default async function TeamPage({ params })`
- Update generateMetadata similarly: `export async function generateMetadata({ params })`
- Run Next.js codemod if migrating from v14: `npx @next/codemod@latest upgrade async-request-api`

**Warning signs:**
- TypeScript errors about Promise type mismatch
- Runtime errors: "Cannot read property of undefined"
- Page component not marked as `async` but uses params

**Source:** [Next.js 15 Breaking Changes - Async Params](https://medium.com/@matijazib/handling-breaking-changes-in-next-js-15-async-params-and-search-params-96075e04f7b6)

### Pitfall 2: Horizontal Scroll Tables on Mobile
**What goes wrong:** Parent tries to scroll horizontally on mobile, users miss columns or find interaction awkward
**Why it happens:**
- Desktop table doesn't fit mobile viewport (roster table with 5+ columns)
- Wrapping table in `overflow-x-auto` div seems like quick fix
- Mobile users can't see all data without horizontal scrolling

**How to avoid:**
- Use responsive card layout: `hidden md:table` for table, `md:hidden` for cards
- Show most important data first in card layout (jersey number, name)
- Test on actual mobile device width (375px iPhone SE, not just browser resize)
- Consider information hierarchy: what must be visible immediately vs on tap?

**Warning signs:**
- Users report "can't see full roster" on mobile
- Lighthouse flags horizontal scrolling issues
- Touch targets too small (columns squeezed to fit)

**Source:** [Mobile Responsive Tables Pattern](https://www.tailwindtap.com/components/table/mobile-responsive-table)

### Pitfall 3: generateStaticParams Missing Teams
**What goes wrong:** Some team pages return 404 even though team data exists
**Why it happens:**
- Team ID in `generateStaticParams` doesn't match team ID in URL
- Typo in team ID generation (e.g., "10U-cook" vs "10u-cook")
- Team added to data file but not included in generateStaticParams return array

**How to avoid:**
- Use consistent ID format: lowercase, hyphenated (e.g., "10u-cook")
- Generate IDs from data file, don't hardcode: `teams.map(t => ({ teamId: t.id }))`
- Add build-time validation: check all team IDs match expected format
- Test by navigating to each team page in development mode

**Warning signs:**
- 404 errors for valid team URLs
- Build succeeds but pages missing in production
- Inconsistent casing in URLs (10U vs 10u)

**Source:** [Next.js generateStaticParams Documentation](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)

### Pitfall 4: Large Team Photos Slowing Page Load
**What goes wrong:** Roster pages load slowly due to unoptimized team/coach photos
**Why it happens:**
- Using `<img>` tag instead of `next/image`
- Coach photos are high-resolution originals (2MB+)
- No lazy loading for below-fold team photo

**How to avoid:**
- ALWAYS use `next/image` for photos: automatic optimization, responsive sizing
- Specify explicit width/height: `<Image width={200} height={200} ... />`
- For team photo (below fold), omit `preload` prop to enable lazy loading
- Compress photos before adding to repo: aim for ~100-200KB per coach photo

**Warning signs:**
- Slow page load on roster pages
- Large Network tab waterfall for image downloads
- Lighthouse flags "Properly size images" or "Defer offscreen images"

### Pitfall 5: Broken Image Paths in Production
**What goes wrong:** Coach/team photos display in dev but 404 in production build
**Why it happens:**
- Images referenced in data file but not in `/public` directory
- Case sensitivity differences (Windows dev, Linux production)
- Image imported but path string doesn't match actual file

**How to avoid:**
- Store all images in `/public/images/` with consistent naming
- Use lowercase, hyphenated filenames: `coach-smith.jpg` not `Coach Smith.jpg`
- Test production build locally: `npm run build && npm start`
- Add placeholder image fallback for missing photos

**Warning signs:**
- Images work in `npm run dev` but not after `npm run build`
- 404 errors in browser console for image paths
- Different behavior on different operating systems

### Pitfall 6: Empty Roster State Not Handled
**What goes wrong:** Empty array renders blank table/card section with no explanation
**Why it happens:**
- Component renders roster list without checking if players array is empty
- No fallback UI for teams with no players yet
- Parents confused about whether roster is incomplete or not loading

**How to avoid:**
- Check players array length before rendering: `if (players.length === 0)`
- Show friendly message: "Roster coming soon — check back after tryouts!"
- Style empty state distinctly: bordered box with icon and centered text
- Consistent empty state pattern across all team pages

**Warning signs:**
- Blank sections on roster pages
- User confusion about whether page is broken
- No visual feedback for incomplete data

**Source:** [Empty State UX Best Practices](https://blog.logrocket.com/ux-design/empty-state-ux/)

## Code Examples

Verified patterns from official sources:

### Dynamic Team Roster Page with Async Params
```typescript
// app/teams/[teamId]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { teams } from '@/lib/data/teams';
import RosterTable from '@/components/teams/RosterTable';
import CoachCard from '@/components/teams/CoachCard';

export async function generateStaticParams() {
  return teams.map((team) => ({
    teamId: team.id,
  }));
}

export default async function TeamRosterPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  // CRITICAL: Await params before accessing properties
  const { teamId } = await params;

  const team = teams.find((t) => t.id === teamId);

  if (!team) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-bombers-navy mb-2">{team.name}</h1>
        <p className="text-lg text-gray-600">{team.season} Roster</p>
      </div>

      {/* Coaches Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-bombers-navy mb-6">Coaching Staff</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.coaches.map((coach, idx) => (
            <CoachCard key={idx} coach={coach} />
          ))}
        </div>
      </section>

      {/* Players Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-bombers-navy mb-6">Players</h2>
        {team.players.length > 0 ? (
          <RosterTable players={team.players} />
        ) : (
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg">
              Roster coming soon — check back after tryouts!
            </p>
          </div>
        )}
      </section>

      {/* Team Photo (secondary placement) */}
      {team.teamPhotoUrl && (
        <section>
          <h2 className="text-2xl font-bold text-bombers-navy mb-6">Team Photo</h2>
          <div className="relative w-full max-w-2xl h-64 rounded-lg overflow-hidden">
            <Image
              src={team.teamPhotoUrl}
              alt={`${team.name} team photo`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        </section>
      )}
    </div>
  );
}
```
**Source:** [Next.js Dynamic Routes with generateStaticParams](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes)

### Teams Overview with Age Group Grouping
```typescript
// app/teams/page.tsx
import { teams } from '@/lib/data/teams';
import TeamCard from '@/components/teams/TeamCard';

export default function TeamsPage() {
  // Group teams by age group
  const teamsByAge = teams.reduce((acc, team) => {
    if (!acc[team.ageGroup]) {
      acc[team.ageGroup] = [];
    }
    acc[team.ageGroup].push(team);
    return acc;
  }, {} as Record<string, typeof teams>);

  // Sort age groups numerically
  const sortedAges = Object.keys(teamsByAge).sort((a, b) => {
    const numA = parseInt(a);
    const numB = parseInt(b);
    return numA - numB;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-bombers-navy mb-4">
          Our Teams
        </h1>
        <p className="text-xl text-gray-600">Spring 2026 Rosters</p>
      </div>

      {/* Teams grouped by age */}
      <div className="space-y-12">
        {sortedAges.map((age) => (
          <section key={age}>
            <h2 className="text-3xl font-bold text-bombers-navy mb-6 border-b-4 border-bombers-yellow pb-2">
              {age} Division
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamsByAge[age].map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
```

### Responsive Roster Table (Desktop) and Cards (Mobile)
```typescript
// components/teams/RosterTable.tsx
import type { Player } from '@/lib/data/teams';

interface RosterTableProps {
  players: Player[];
}

export default function RosterTable({ players }: RosterTableProps) {
  // Sort players by jersey number
  const sortedPlayers = [...players].sort((a, b) => a.jerseyNumber - b.jerseyNumber);

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden rounded-lg border-2 border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-bombers-navy text-white">
              <th className="px-6 py-4 text-left text-sm font-semibold">Jersey #</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Player Name</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPlayers.map((player, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-bombers-yellow rounded-full text-bombers-navy font-bold">
                    {player.jerseyNumber}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-900 font-medium">{player.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {sortedPlayers.map((player, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-lg border-2 border-gray-200 flex items-center gap-4 hover:border-bombers-yellow transition-colors"
          >
            <div className="flex-shrink-0 w-14 h-14 bg-bombers-yellow rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-bombers-navy">
                {player.jerseyNumber}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-bombers-navy">{player.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
```
**Source:** [Responsive Tables with Tailwind CSS](https://tailkits.com/blog/tailwind-responsive-tables/)

### Coach Card Component
```typescript
// components/teams/CoachCard.tsx
import Image from 'next/image';
import type { Coach } from '@/lib/data/teams';

interface CoachCardProps {
  coach: Coach;
  showContact?: boolean; // Claude's discretion - default false for privacy
}

export default function CoachCard({ coach, showContact = false }: CoachCardProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden hover:border-bombers-yellow transition-all hover:shadow-lg">
      {/* Photo */}
      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={coach.photoUrl}
          alt={`${coach.name} - ${coach.role}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-bombers-navy mb-1">{coach.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{coach.role}</p>

        {/* Optional contact info */}
        {showContact && (
          <div className="space-y-1 text-sm text-gray-700">
            {coach.email && (
              <p>
                <a
                  href={`mailto:${coach.email}`}
                  className="text-bombers-navy hover:text-bombers-yellow transition-colors"
                >
                  {coach.email}
                </a>
              </p>
            )}
            {coach.phone && <p>{coach.phone}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
```

### Team Card for Overview Page
```typescript
// components/teams/TeamCard.tsx
import Link from 'next/link';
import { Users } from 'lucide-react';
import type { Team } from '@/lib/data/teams';

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <Link
      href={`/teams/${team.id}`}
      className="group block bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-bombers-yellow hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-bombers-navy group-hover:text-bombers-yellow transition-colors">
            {team.name}
          </h3>
          <p className="text-gray-600 mt-1">{team.headCoachName}</p>
        </div>
        <div className="p-3 bg-bombers-yellow/10 rounded-full group-hover:bg-bombers-yellow transition-colors">
          <Users className="w-6 h-6 text-bombers-navy group-hover:text-white transition-colors" />
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="font-semibold">{team.players.length}</span>
        <span>players</span>
        <span className="text-gray-400">•</span>
        <span className="font-semibold">{team.coaches.length}</span>
        <span>coaches</span>
      </div>
    </Link>
  );
}
```

### Type-Safe Team Data
```typescript
// lib/data/teams.ts
export interface Player {
  name: string;
  jerseyNumber: number;
}

export interface Coach {
  name: string;
  role: 'Head Coach' | 'Assistant Coach';
  photoUrl: string;
  email?: string;
  phone?: string;
}

export interface Team {
  id: string;           // URL slug: "10u-cook"
  name: string;         // Display: "10U Cook"
  ageGroup: string;     // "7U", "10U", "15U"
  headCoachName: string;
  season: string;
  players: Player[];
  coaches: Coach[];
  teamPhotoUrl?: string;
}

export const teams: Team[] = [
  {
    id: '10u-cook',
    name: '10U Cook',
    ageGroup: '10U',
    headCoachName: 'Coach Cook',
    season: 'Spring 2026',
    players: [
      { name: 'Johnny Smith', jerseyNumber: 12 },
      { name: 'Sarah Johnson', jerseyNumber: 5 },
      { name: 'Michael Brown', jerseyNumber: 23 },
    ],
    coaches: [
      {
        name: 'Mike Cook',
        role: 'Head Coach',
        photoUrl: '/images/coaches/cook.jpg',
        email: 'coach.cook@ofallonbombers.com',
      },
      {
        name: 'Lisa Davis',
        role: 'Assistant Coach',
        photoUrl: '/images/coaches/davis.jpg',
      },
    ],
    teamPhotoUrl: '/images/teams/10u-cook.jpg',
  },
  // Additional teams...
];
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Synchronous params access | `await params` required | Next.js 15 (Oct 2024) | Breaking change — must await params promise before accessing properties |
| `getStaticPaths` (Pages Router) | `generateStaticParams` (App Router) | Next.js 13 (Oct 2022) | Simpler API, better TypeScript support, integrates with React Server Components |
| Horizontal scroll tables on mobile | Card layout transformation | UX best practice evolution (2020+) | Better mobile UX, eliminates horizontal scrolling frustration |
| Manual image optimization | `next/image` automatic optimization | Next.js 10 (Oct 2020) | Automatic WebP/AVIF, responsive srcset, lazy loading |
| CSS Grid with media queries | Tailwind responsive utilities | Tailwind adoption (2019+) | Faster development, consistent breakpoints, no custom CSS |
| JSON data files | TypeScript data files | Modern Next.js pattern (2023+) | Type safety, autocomplete, refactoring support |

**Deprecated/outdated:**
- **`getStaticPaths`:** Pages Router API replaced by `generateStaticParams` in App Router
- **`fallback: true/false/blocking`:** Replaced by simpler static params generation in App Router
- **Synchronous params:** Next.js 15 made params async — old sync access pattern no longer works
- **`revalidate` in getStaticProps:** Replaced by App Router's fetch caching and revalidation patterns

## Open Questions

1. **Should coach contact info be displayed on roster pages?**
   - What we know: User left this to Claude's discretion; balance privacy vs accessibility
   - What's unclear: Whether parents need direct coach contact or should use general contact form
   - Recommendation: Hide contact info by default (privacy-first), but include a "Contact Coach" button that links to general contact page with team pre-selected in form. This protects coach privacy while providing clear path to communication.

2. **Should empty rosters show placeholder or hide team entirely?**
   - What we know: User mentioned "coming soon" message vs hiding unpopulated teams
   - What's unclear: Whether teams with no players should appear on overview page
   - Recommendation: Show all teams on overview page (parents need to know team exists), but display "Roster coming soon" message on roster page. This confirms team is real and roster will be added later.

3. **Should team photo be clickable/expandable?**
   - What we know: Team photo should have "smaller/secondary placement"
   - What's unclear: Whether photo should be interactive (click to enlarge, lightbox, etc.)
   - Recommendation: Keep photo static (no lightbox) for simplicity. Secondary placement below roster is sufficient. Parents care more about roster data than large team photo. Can add interactivity in future if requested.

4. **Should there be navigation between teams in same age group?**
   - What we know: User mentioned "sibling navigation" as Claude's discretion
   - What's unclear: Value of prev/next team navigation on roster pages
   - Recommendation: Skip sibling navigation for Phase 4. Parents typically access specific team directly from overview page, not browsing sequentially through teams. Navigation adds complexity with minimal UX benefit. Revisit if user feedback requests it.

5. **How should teams be sorted within each age group?**
   - What we know: Teams grouped by age, but ordering within age group not specified
   - What's unclear: Sort by coach name alphabetically, or by team ID, or custom order?
   - Recommendation: Sort alphabetically by head coach last name within each age group. Matches team naming convention ("10U Cook") and makes teams predictable to find. Easy to implement: `teams.sort((a, b) => a.headCoachName.localeCompare(b.headCoachName))`.

## Sources

### Primary (HIGH confidence)
- [Next.js Dynamic Routes Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes) - Official Next.js 16.1 dynamic routes with generateStaticParams
- [Next.js 15 Async Params Breaking Change](https://nextjs.org/docs/messages/sync-dynamic-apis) - Official documentation on async params requirement
- [Next.js Image Component](https://nextjs.org/docs/app/api-reference/components/image) - Official image optimization API
- [Next.js Static Exports Guide](https://nextjs.org/docs/app/guides/static-exports) - Static generation patterns and best practices

### Secondary (MEDIUM confidence)
- [Handling Next.js 15 Async Params](https://medium.com/@matijazib/handling-breaking-changes-in-next-js-15-async-params-and-search-params-96075e04f7b6) - Migration guide verified against official docs
- [Tailwind Responsive Tables](https://tailkits.com/blog/tailwind-responsive-tables/) - Responsive table patterns verified with Tailwind docs
- [Mobile Responsive Table Component](https://www.tailwindtap.com/components/table/mobile-responsive-table) - Card layout transformation pattern
- [Responsive Tables on Mobile](https://tallpad.com/series/tailwindcss-patterns/lessons/responsive-tables-on-mobile-screens) - TailwindCSS patterns for table responsiveness
- [Empty State UX Best Practices](https://blog.logrocket.com/ux-design/empty-state-ux/) - Empty state design principles
- [Next.js generateStaticParams Guide](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) - Official API reference for static params generation

### Tertiary (LOW confidence - for context only)
- [Mobile Data Tables UX Design](https://medium.com/design-bootcamp/designing-user-friendly-data-tables-for-mobile-devices-c470c82403ad) - General UX principles, not Next.js specific
- [Table vs Cards Pattern Guide](https://uxpatterns.dev/pattern-guide/table-vs-list-vs-cards) - UX pattern comparison, not implementation details

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Next.js dynamic routes and Image component verified with official documentation
- Architecture: HIGH - Patterns follow Next.js 15 App Router conventions and established React best practices
- Dynamic routing: HIGH - generateStaticParams pattern verified with official Next.js docs
- Async params: HIGH - Breaking change documented in official Next.js 15 migration guide
- Responsive tables: MEDIUM - Pattern verified with Tailwind docs, but implementation details may vary
- Data structure: HIGH - TypeScript patterns consistent with Phase 3 approach, well-established pattern
- Pitfalls: HIGH - Async params pitfall documented in official docs; mobile table issues from UX research

**Research date:** 2026-02-16
**Valid until:** 2026-03-16 (30 days) - Next.js stable, no major releases expected; patterns unlikely to change

**Notes:**
- Next.js 16.1.6 is current stable version (released Nov 2024)
- Async params requirement introduced in Next.js 15, now standard pattern
- Tailwind v4 responsive utilities already established in project
- No breaking changes expected in researched areas within next 30 days
- Phase 9 CMS will replace TypeScript data files with editable content system
