# Phase 6: Fees & Events - Research

**Researched:** 2026-02-16
**Domain:** Content presentation (fees, dates, FAQ, registration embedding)
**Confidence:** HIGH

## Summary

Phase 6 delivers a comprehensive fees and events page where parents can quickly find season costs, key dates, registration information, and answers to common questions. The page must present fee breakdowns by age group, display a chronological list of key dates, embed JerseyWatch registration (with fallback link), and provide an FAQ section using the existing Accordion component from Phase 5.

The implementation is content-focused rather than technically complex. No external libraries are required beyond what already exists (Next.js, React, Tailwind v4, lucide-react). The existing Accordion component handles the FAQ requirement. The primary technical consideration is iframe security for embedding JerseyWatch registration forms.

**Primary recommendation:** Follow the centralized data file pattern established in prior phases. Create `/src/lib/data/fees.ts` with TypeScript interfaces for fees, dates, and FAQ data. Build simple, semantic components for fee display and date presentation. Use the existing Accordion component for FAQs. Implement iframe embedding with proper security attributes (sandbox, CSP considerations) and provide a clear link fallback if embedding is not supported.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **JerseyWatch registration embed:** Must embed JerseyWatch registration form via iframe where possible, with link fallback if embedding not supported
- **FAQ format:** Must use accordion format (expand/collapse) — this is required, not discretionary
- **Reuse existing component:** Must reuse the existing Accordion component built in Phase 5 for FAQ section

### Claude's Discretion
- Fee organization structure (unified vs per-age-group) based on data
- Fee detail level (itemized breakdown vs simple totals)
- Layout style (pricing cards vs clean table)
- Payment-related details (plans, methods, financial aid) included or not
- Key dates presentation format (timeline vs list vs calendar cards)
- Event types to include (milestones only vs comprehensive)
- Past event handling (greyed out vs hidden)
- Event categorization (grouped by type vs single chronological list)
- Registration urgency messaging approach (deadline callouts vs clean presentation)
- CTA placement (dedicated section vs integrated with fees vs both)
- Registration checklist (what parents need to prepare) included or not
- FAQ question grouping (by topic vs flat list)
- FAQ content generation based on typical youth sports parent questions
- FAQ placement (same page vs separate)
- All technical implementation details

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope

</user_constraints>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | Static site framework | Already in use, handles routing and static export |
| React | 19.2.3 | UI library | Already in use, component foundation |
| TypeScript | ^5 | Type safety | Already in use, ensures data integrity |
| Tailwind CSS | ^4 | Styling | Already in use with v4 syntax (@theme directive) |
| lucide-react | ^0.564.0 | Icons | Already in use for UI icons (Calendar, DollarSign, etc.) |
| clsx | ^2.1.1 | Conditional classes | Already in use for dynamic styling |

### Supporting
No additional libraries required. This phase uses only existing dependencies.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Native iframe | react-iframe library | Native HTML is simpler, no added dependency |
| Existing Accordion | Third-party accordion | User requirement: reuse Phase 5 component |
| CSS-only timeline | react-calendar-timeline | External library adds 200KB+ for simple date display |
| Custom date formatting | next-intl | Overkill for US-only static site with hardcoded dates |

**Installation:**
```bash
# No new dependencies required
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   └── fees/                  # Fees & Events page route
│       └── page.tsx           # Main page component
├── components/
│   ├── fees/                  # Fee-specific components
│   │   ├── FeeCard.tsx        # Individual fee display card
│   │   ├── FeeTable.tsx       # Tabular fee breakdown (alternative)
│   │   ├── EventList.tsx      # Key dates/events display
│   │   └── RegistrationCTA.tsx # Registration call-to-action with iframe
│   └── organization/
│       └── Accordion.tsx      # Existing component (Phase 5) - reuse for FAQ
└── lib/
    └── data/
        └── fees.ts            # Centralized data: fees, dates, FAQ
```

### Pattern 1: Centralized Data File Pattern (Established in Prior Phases)
**What:** Export TypeScript interfaces and const arrays from `/src/lib/data/fees.ts`. All content lives in one type-safe file.
**When to use:** For all static content (fees, dates, FAQ questions/answers)
**Example:**
```typescript
// src/lib/data/fees.ts
export interface AgeFee {
  ageGroup: string;
  baseSeasonFee: number;
  uniformDeposit?: number;
  tournamentFee?: number;
  total: number;
  description?: string;
}

export interface KeyDate {
  id: string;
  label: string;
  date: string; // ISO format or display format
  category: 'tryout' | 'registration' | 'season' | 'tournament';
  isPast?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: 'fees' | 'tryouts' | 'season' | 'general';
}

export const ageFees: AgeFee[] = [ /* data */ ];
export const keyDates: KeyDate[] = [ /* data */ ];
export const faqItems: FAQItem[] = [ /* data */ ];
```

### Pattern 2: Reusable Component Pattern (Established in Phase 5)
**What:** The Accordion component from Phase 5 accepts `AccordionItem[]` with id, title, and content.
**When to use:** For FAQ section (user requirement)
**Example:**
```typescript
// src/app/fees/page.tsx
import Accordion, { AccordionItem } from '@/components/organization/Accordion';
import { faqItems } from '@/lib/data/fees';

const accordionItems: AccordionItem[] = faqItems.map(item => ({
  id: item.id,
  title: item.question,
  content: <p className="text-gray-700">{item.answer}</p>,
}));

<Accordion items={accordionItems} />
```

### Pattern 3: Iframe Security Best Practices
**What:** When embedding third-party registration forms, use sandbox attribute and CSP headers
**When to use:** For JerseyWatch registration embed
**Example:**
```tsx
// src/components/fees/RegistrationCTA.tsx
<iframe
  src="https://jerseywatch.com/register/your-org"
  sandbox="allow-scripts allow-forms allow-same-origin"
  className="w-full h-[600px] border-2 border-gray-200 rounded-lg"
  title="Player Registration Form"
  loading="lazy"
/>
```

**Security considerations:**
- Use `sandbox` attribute to restrict iframe capabilities
- Only allow necessary permissions: `allow-scripts`, `allow-forms`, `allow-same-origin`
- Consider adding CSP headers if needed (may require middleware for static export)
- Provide clear link fallback if iframe fails to load or is blocked

**Sources:**
- [2026 Iframe Security Risks and 10 Ways to Secure Them](https://qrvey.com/blog/iframe-security/)
- [Secure and Make Your Iframe Compliant in 2025](https://www.feroot.com/blog/how-to-secure-iframe-compliance-2025/)
- [Next.js Content Security Policy Guide](https://nextjs.org/docs/pages/guides/content-security-policy)

### Pattern 4: Component Layout Strategy
**What:** Use semantic section elements with consistent spacing and visual hierarchy
**When to use:** For page composition (fees section, dates section, registration section, FAQ section)
**Example:**
```tsx
// src/app/fees/page.tsx
export default function FeesPage() {
  return (
    <main className="container mx-auto px-4 max-w-5xl py-8 md:py-12">
      {/* Page Header */}
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-bombers-navy mb-4">
          Fees & Registration
        </h1>
        <p className="text-lg text-gray-600">
          Season costs, key dates, and registration information.
        </p>
      </section>

      {/* Season Fees Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-bombers-navy mb-6 border-b-4 border-bombers-yellow pb-2 inline-block">
          Season Fees
        </h2>
        {/* Fee content */}
      </section>

      {/* Key Dates Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-bombers-navy mb-6 border-b-4 border-bombers-yellow pb-2 inline-block">
          Key Dates
        </h2>
        {/* Dates content */}
      </section>

      {/* Registration Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-bombers-navy mb-6 border-b-4 border-bombers-yellow pb-2 inline-block">
          Registration
        </h2>
        {/* Registration iframe/CTA */}
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-bombers-navy mb-6 border-b-4 border-bombers-yellow pb-2 inline-block">
          Frequently Asked Questions
        </h2>
        <Accordion items={accordionItems} />
      </section>
    </main>
  );
}
```

### Anti-Patterns to Avoid
- **Don't use external date libraries for simple date display:** The project has hardcoded dates in existing data files (see `/src/lib/data/home.ts` keyDates). Follow this pattern rather than adding date-fns or moment.js.
- **Don't create custom accordion from scratch:** User requirement is to reuse the existing Accordion component from Phase 5.
- **Don't use unsandboxed iframes:** Always include sandbox attribute with minimal permissions for third-party embeds.
- **Don't make fees dynamic:** This is a static export site. Fees are hardcoded content, not fetched at runtime.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Accordion UI | Custom expand/collapse logic | Existing Accordion component from Phase 5 | Already built, tested, and matches design system |
| Icon display | Custom SVG icons | lucide-react (already installed) | Calendar, DollarSign, CheckCircle icons available |
| Date formatting | Custom date parsing | Native JavaScript `Date` or simple string display | Dates are hardcoded strings, no runtime parsing needed |
| Responsive tables | Complex media query logic | Tailwind responsive utilities | Built-in, works with existing system |

**Key insight:** This phase is primarily about content presentation, not complex functionality. The existing component library (Accordion) and utility library (lucide-react) cover all interactive needs. Focus on clear information architecture and clean visual design rather than building new abstractions.

## Common Pitfalls

### Pitfall 1: Iframe Embedding Failures
**What goes wrong:** Third-party iframes can fail to load due to CSP restrictions, browser security settings, or user ad blockers.
**Why it happens:** Modern browsers and security tools aggressively block third-party content, especially iframes.
**How to avoid:**
- Always provide a visible link fallback: "If the form doesn't load, [register directly here](https://jerseywatch.com/...)"
- Use `loading="lazy"` to improve initial page load
- Test in multiple browsers and with common ad blockers
- Set explicit height to prevent layout shift if iframe fails

**Warning signs:** Blank space where iframe should be, console errors about "X-Frame-Options" or CSP violations

### Pitfall 2: Unclear Fee Presentation
**What goes wrong:** Parents struggle to find "total cost" when fees are broken into many line items.
**Why it happens:** Organizations often itemize fees (season, uniform, tournament, fundraising) but bury the total.
**How to avoid:**
- Lead with the total cost per age group
- Use visual hierarchy: total is bold/larger, breakdown is secondary
- Consider a simple summary table before detailed breakdowns

**Warning signs:** User testing shows confusion, FAQ gets "how much does it cost?" question

**Sources:**
- [Understanding Registration Fees for Youth Sports](https://teamlinkt.com/blog/understanding-registration-fees-for-youth-sports-where-does-the-money-go)
- [Youth Basketball Registration Form Best Practices](https://www.jerseywatch.com/blog/youth-basketball-sign-up-forms)

### Pitfall 3: Timeline Complexity Overkill
**What goes wrong:** Adding a full-featured timeline library for 5-10 simple dates adds 200KB+ of JavaScript.
**Why it happens:** Developer sees "timeline" and reaches for react-calendar-timeline or similar.
**How to avoid:**
- Use simple CSS-only vertical list with date labels
- Add visual markers (dots, lines) with Tailwind and pseudo-elements if desired
- Dates in this context are static, ordered, and simple — list is sufficient

**Warning signs:** Bundle size increases significantly, page becomes interactive when it should be static

**Sources:**
- [CSS-only timeline examples](https://freefrontend.com/css-timelines/)
- [W3Schools: How To Create a Timeline](https://www.w3schools.com/howto/howto_css_timeline.asp)

### Pitfall 4: Accordion Accessibility Gaps
**What goes wrong:** Custom accordion implementation lacks proper ARIA attributes, keyboard navigation fails.
**Why it happens:** Developer implements expand/collapse without following WAI-ARIA accordion pattern.
**How to avoid:**
- Use the existing Accordion component (Phase 5), which already has proper ARIA attributes
- Ensure `aria-expanded`, `aria-labelledby`, and `hidden` attributes are correct
- Test keyboard navigation: Enter/Space to toggle, Tab to move between items

**Warning signs:** Screen reader announces incorrect state, keyboard users can't interact

**Sources:**
- [W3C ARIA Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
- [Accessible Accordion Best Practices](https://www.aditus.io/patterns/accordion/)

### Pitfall 5: Hydration Mismatch with Dates
**What goes wrong:** If dates are formatted client-side with `new Date()`, server and client render different content, causing hydration errors.
**Why it happens:** Server renders in UTC, client renders in user's timezone.
**How to avoid:**
- Use static date strings (e.g., "March 15, 2026") rather than runtime Date objects
- Follow the pattern in `/src/lib/data/home.ts`: `{ label: 'Next Tryouts', date: 'March 15, 2026' }`
- If you must use Date objects, only render them client-side with 'use client'

**Warning signs:** Console warnings about hydration mismatch, dates appear different after page load

**Sources:**
- [Reliable date formatting in Next.js](https://next-intl.dev/blog/date-formatting-nextjs)
- [Next.js Date & Time Localization Guide](https://staarter.dev/blog/nextjs-date-and-time-localization-guide)

## Code Examples

Verified patterns from official sources and existing codebase:

### Fee Display - Pricing Card Pattern
```typescript
// src/components/fees/FeeCard.tsx
interface FeeCardProps {
  ageGroup: string;
  total: number;
  breakdown?: { label: string; amount: number }[];
}

export default function FeeCard({ ageGroup, total, breakdown }: FeeCardProps) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bombers-yellow transition-colors">
      <h3 className="text-xl font-bold text-bombers-navy mb-2">{ageGroup}</h3>
      <div className="text-3xl font-bold text-bombers-navy mb-4">
        ${total}
      </div>
      {breakdown && (
        <ul className="space-y-2 text-gray-700">
          {breakdown.map((item, idx) => (
            <li key={idx} className="flex justify-between text-sm">
              <span>{item.label}</span>
              <span>${item.amount}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Key Dates - Simple List Pattern
```typescript
// src/components/fees/EventList.tsx
import { Calendar } from 'lucide-react';
import { KeyDate } from '@/lib/data/fees';

interface EventListProps {
  events: KeyDate[];
}

export default function EventList({ events }: EventListProps) {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex gap-4 items-start border-l-4 border-bombers-yellow pl-4 py-2"
        >
          <Calendar className="w-5 h-5 text-bombers-navy mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-bombers-navy">{event.label}</h3>
            <p className="text-gray-600">{event.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Registration Embed with Fallback
```typescript
// src/components/fees/RegistrationCTA.tsx
export default function RegistrationCTA() {
  return (
    <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-bombers-navy mb-4">
        Register Your Player
      </h2>
      <p className="text-gray-700 mb-6">
        Complete your registration online using the form below.
      </p>

      {/* Iframe embed */}
      <iframe
        src="https://www.jerseywatch.com/org/ofallon-bombers/register"
        sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
        className="w-full h-[600px] border-2 border-gray-300 rounded-lg mb-4"
        title="Player Registration Form"
        loading="lazy"
      />

      {/* Fallback link */}
      <p className="text-sm text-gray-600 text-center">
        If the form doesn't load,{' '}
        <a
          href="https://www.jerseywatch.com/org/ofallon-bombers/register"
          target="_blank"
          rel="noopener noreferrer"
          className="text-bombers-navy font-semibold hover:text-bombers-yellow transition-colors"
        >
          register directly on JerseyWatch →
        </a>
      </p>
    </div>
  );
}
```

### FAQ Using Existing Accordion
```typescript
// src/app/fees/page.tsx
import Accordion, { AccordionItem } from '@/components/organization/Accordion';
import { faqItems, FAQItem } from '@/lib/data/fees';

// Transform FAQ data into Accordion items
const accordionItems: AccordionItem[] = faqItems.map((item: FAQItem) => ({
  id: item.id,
  title: item.question,
  content: <p className="text-gray-700 leading-relaxed">{item.answer}</p>,
}));

// In component JSX:
<section>
  <h2 className="text-2xl font-semibold text-bombers-navy mb-6">
    Frequently Asked Questions
  </h2>
  <Accordion items={accordionItems} />
</section>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Separate pricing pages per age group | Single page with all fees visible | Modern UX trend (2020+) | Parents can compare costs easily |
| PDF downloads for fee schedules | Responsive HTML tables/cards | Mobile-first era (2015+) | Accessible on all devices |
| External registration links only | Embedded registration forms | Iframe security improved (2022+) | Seamless user experience |
| Manual FAQ pages | Accordion/collapsible FAQs | Common since 2018 | Reduces scroll, improves scanability |
| Complex calendar widgets | Simple chronological lists | Simplicity trend (2023+) | Faster load, better for static sites |

**Deprecated/outdated:**
- **jQuery accordion plugins:** Modern React components handle this with hooks and proper accessibility
- **Flash/Java calendars:** Web standards (HTML5, CSS3) replaced proprietary tech
- **Unsandboxed iframes:** Security best practices now require sandbox attribute and CSP headers
- **Table-only layouts for pricing:** Mobile-first design favors card layouts that stack on small screens

## Recommendations

Based on research, here are specific recommendations for discretionary areas:

### Fee Presentation
**Recommendation:** Use pricing cards in a responsive grid, organized by age group.
- **Why:** Cards work better on mobile than wide tables, match existing design system (see About page values cards)
- **Detail level:** Show total prominently, itemized breakdown as secondary details
- **Payment info:** Include brief note about payment plans and financial aid with link to contact page

### Key Dates Layout
**Recommendation:** Use simple vertical list with left border accent and calendar icons.
- **Why:** Static list is faster, simpler, and more accessible than timeline libraries
- **Event types:** Include milestones only (tryouts, registration deadline, season start, major tournaments)
- **Past events:** Hide past events or mark them as "Completed" in lighter text
- **Categorization:** Single chronological list (don't group by type — simpler for 5-10 dates)

### Registration Flow
**Recommendation:** Dedicated section with iframe embed and prominent fallback link.
- **Why:** Meets user requirement for embed preference while ensuring accessibility
- **Urgency messaging:** Clean presentation with registration deadline date visible in Key Dates section
- **CTA placement:** Dedicated section after fees and dates (logical flow: see cost → see dates → register)
- **Checklist:** Include short "What to prepare" list (player info, payment method, medical forms)

### FAQ Structure
**Recommendation:** Grouped accordion (by topic: Fees, Tryouts, Season, General).
- **Why:** Grouped FAQs help parents find relevant answers faster
- **Content:** Generate 10-15 common questions covering fees, tryouts, season structure, equipment, practice schedule
- **Placement:** Same page, after registration section (FAQs often answer hesitations before registration)

## Open Questions

1. **JerseyWatch Embed URL**
   - What we know: JerseyWatch supports registration forms and embedding videos, but API/iframe specifics not documented publicly
   - What's unclear: Exact iframe URL for O'Fallon Bombers organization registration
   - Recommendation: Use placeholder iframe in implementation, document that actual URL needs to be provided by organization

2. **Fee Amounts and Breakdown**
   - What we know: Youth sports fees typically include season fee, uniform deposit, tournament fees
   - What's unclear: Actual fee amounts for O'Fallon Bombers by age group
   - Recommendation: Use realistic placeholder data ($200-$600 range based on research), mark as TBD in planning

3. **Season Key Dates**
   - What we know: Sample dates exist in home.ts (tryouts March 15, registration deadline March 30, season starts April 12)
   - What's unclear: Full calendar of tournaments and key milestones
   - Recommendation: Reuse dates from home.ts, add 2-3 placeholder tournament dates

## Sources

### Primary (HIGH confidence)
- Existing codebase patterns:
  - `/src/lib/data/teams.ts` - Data file structure pattern
  - `/src/lib/data/home.ts` - Date formatting pattern
  - `/src/components/organization/Accordion.tsx` - Component to reuse
  - `/src/app/code-of-conduct/page.tsx` - Page layout pattern with Accordion usage
  - `/src/app/about/page.tsx` - Section layout and values card pattern
- Next.js Official Documentation:
  - [Content Security Policy Guide](https://nextjs.org/docs/pages/guides/content-security-policy)

### Secondary (MEDIUM confidence)
- Security Best Practices:
  - [2026 Iframe Security Risks](https://qrvey.com/blog/iframe-security/)
  - [Secure Iframe Compliance 2025](https://www.feroot.com/blog/how-to-secure-iframe-compliance-2025/)
  - [WorkOS: Security risks of iframes](https://workos.com/blog/security-risks-of-iframes)
- Accessibility:
  - [W3C ARIA Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
  - [Accessible Accordion Best Practices](https://www.aditus.io/patterns/accordion/)
- UI/UX Patterns:
  - [FreeFrontend: CSS Timelines](https://freefrontend.com/css-timelines/)
  - [W3Schools: How To Create a Timeline](https://www.w3schools.com/howto/howto_css_timeline.asp)
  - [Accordion UI Best Practices](https://www.eleken.co/blog-posts/accordion-ui)

### Tertiary (LOW confidence)
- Youth Sports Context:
  - [Understanding Registration Fees for Youth Sports](https://teamlinkt.com/blog/understanding-registration-fees-for-youth-sports-where-does-the-money-go)
  - [Youth Basketball Registration Form Best Practices](https://www.jerseywatch.com/blog/youth-basketball-sign-up-forms)
  - [JerseyWatch Features Overview](https://www.jerseywatch.com/features/sports-registration-software)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All dependencies already in use, verified in package.json
- Architecture: HIGH - Patterns established in prior phases (data files, component reuse)
- Security: MEDIUM - Best practices documented but need testing in this specific context
- UI/UX patterns: HIGH - Existing components and CSS system cover all needs

**Research date:** 2026-02-16
**Valid until:** 2026-03-16 (30 days - stable technologies, established patterns)
