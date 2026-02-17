# Phase 7: Spirit Wear - Research

**Researched:** 2026-02-16
**Domain:** Static product catalog with external e-commerce integration
**Confidence:** HIGH

## Summary

Phase 7 implements a spirit wear catalog preview page that displays product information (images, descriptions, prices) and links to an external store for purchasing. This is a straightforward implementation following established project patterns: centralized data file for type-safe product content, responsive grid layout using Tailwind CSS, Next.js Image component with unoptimized mode (already configured for static export), and external links with proper security attributes.

The key architectural decision is "catalog preview without checkout" - the site displays products to build awareness and provide information, but all purchasing happens on an external platform. This avoids complex e-commerce infrastructure (shopping cart, checkout, payment processing, inventory management) while maintaining the static export model.

**Primary recommendation:** Use the established data-driven component pattern (src/lib/data/spirit-wear.ts + component rendering) with external store links. Follow existing SponsorCard pattern for optional external URLs, implement responsive grid similar to SponsorGrid, and ensure accessibility for external links with proper ARIA labels and security attributes.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | Static site framework | Already configured with `output: 'export'` for static HTML generation |
| React | 19.2.3 | UI rendering | Next.js dependency, server components by default |
| TypeScript | 5.x | Type safety | Existing pattern for all data files and components |
| Tailwind CSS | 4.x | Styling | Project standard, using v4 syntax with @import and @theme |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/image | 16.1.6 | Image optimization | Product photos (already configured with unoptimized: true) |
| lucide-react | 0.564.0 | Icons | External link icon, shopping cart icon if needed |
| clsx | 2.1.1 | Conditional classes | Component styling logic |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Static catalog preview | Full e-commerce (Shopify, Stripe) | Preview is simpler, no cart/checkout complexity, fits static export model |
| External store link | Embedded iframe store | External link is more reliable, better SEO, less security risk |
| Centralized data file | CMS/API | Data file fits existing pattern, no build-time API calls needed |

**Installation:**
```bash
# No new dependencies required - all libraries already installed
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── lib/
│   └── data/
│       └── spirit-wear.ts      # Product catalog data (TypeScript)
├── components/
│   └── spirit-wear/
│       ├── ProductCard.tsx     # Individual product display
│       └── ProductGrid.tsx     # Grid layout container
└── app/
    └── spirit-wear/
        └── page.tsx            # Main catalog page
```

### Pattern 1: Centralized Data File
**What:** Type-safe product data in src/lib/data/spirit-wear.ts exported as const arrays
**When to use:** All static content that doesn't change at runtime
**Example:**
```typescript
// Following sponsors.ts and fees.ts patterns
export interface SpiritWearProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'apparel' | 'accessories' | 'headwear';
  sizes?: readonly string[];
  externalUrl?: string; // Optional link to specific product page
}

export const spiritWearProducts: readonly SpiritWearProduct[] = [
  {
    id: 'bombers-tshirt',
    name: 'Bombers T-Shirt',
    description: 'Classic navy t-shirt with Bombers logo',
    price: 20,
    imageUrl: '/images/spirit-wear/tshirt.jpg',
    category: 'apparel',
    sizes: ['Youth S', 'Youth M', 'Youth L', 'Adult S', 'Adult M', 'Adult L', 'Adult XL'] as const,
  },
  // ... more products
] as const;
```

### Pattern 2: External Link with Security
**What:** Safe external links following SponsorCard pattern
**When to use:** All links to external stores or product pages
**Example:**
```typescript
// Source: Existing SponsorCard.tsx pattern + MDN rel=noopener docs
<a
  href={product.externalUrl || storeUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="..."
>
  Buy Now
  <ExternalLink className="w-4 h-4" aria-hidden="true" />
</a>
```

### Pattern 3: Responsive Product Grid
**What:** Auto-fit grid that adapts to screen size
**When to use:** Displaying multiple products in catalog layout
**Example:**
```typescript
// Source: SponsorGrid.tsx pattern
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```

### Pattern 4: Product Card with Image
**What:** Card component with Next.js Image, following SponsorCard/FeeCard patterns
**When to use:** Individual product display in grid
**Example:**
```typescript
// Source: SponsorCard.tsx + FeeCard.tsx patterns
import Image from 'next/image';

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 hover:border-bombers-yellow hover:shadow-lg transition-all">
      <div className="relative h-48 bg-gray-50">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={200}
          className="object-cover w-full h-full rounded-t-lg"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-bombers-navy mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-bombers-navy">
            ${product.price}
          </span>
          {/* Buy button here */}
        </div>
      </div>
    </div>
  );
}
```

### Pattern 5: Section Heading with Yellow Accent
**What:** Consistent heading style with bottom border accent
**When to use:** All major section headings (established in fees page)
**Example:**
```typescript
// Source: fees/page.tsx pattern
<h2 className="text-2xl font-semibold text-bombers-navy mb-6 border-b-4 border-bombers-yellow pb-2 inline-block">
  Spirit Wear Catalog
</h2>
```

### Anti-Patterns to Avoid
- **Inline product data in components:** Always use centralized data file for maintainability and type safety
- **Missing external link security:** Always include `rel="noopener noreferrer"` on external links to prevent security vulnerabilities
- **Hardcoded store URLs:** Define store URL as constant at top of data file for easy updates
- **Missing alt text on product images:** Always provide descriptive alt text for accessibility
- **Optimized images in static export:** Already configured correctly with `unoptimized: true` in next.config.ts

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Shopping cart | Custom cart state management | Link to external store | Avoids complexity of cart, checkout, payment processing, inventory sync |
| Payment processing | Custom payment forms | External store (e.g., TeamSnap, Spiritwear.com) | PCI compliance, security, fraud protection handled by platform |
| Inventory management | Stock tracking system | External store platform | Real-time inventory, size/color variants handled externally |
| Image optimization | Custom image pipeline | Next.js Image component | Already configured for static export with unoptimized mode |
| Responsive grid | Custom media queries | Tailwind grid utilities | Battle-tested responsive patterns, minimal code |

**Key insight:** E-commerce is deceptively complex. Even "simple" features like shopping carts require state management, persistence, checkout flows, payment integration, order confirmation, inventory sync, and security considerations. For static sites, external store integration is the proven pattern.

## Common Pitfalls

### Pitfall 1: Forgetting noopener on External Links
**What goes wrong:** External links without `rel="noopener"` create security vulnerability (reverse tabnapping) where external site can access window.opener
**Why it happens:** target="_blank" alone doesn't provide protection in older browsers
**How to avoid:** Always pair `target="_blank"` with `rel="noopener noreferrer"` on all external links
**Warning signs:** External links open new tab but missing security attributes

**Source:** [Chrome for Developers - External Anchors](https://developer.chrome.com/docs/lighthouse/best-practices/external-anchors-use-rel-noopener), [MDN rel=noopener](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener)

### Pitfall 2: Missing Accessible Names for Icon Buttons
**What goes wrong:** Buttons with only icons (like external link icon) are not announced to screen readers
**Why it happens:** Visual users see icon and understand meaning, but screen readers need text
**How to avoid:** Use `aria-label` on icon-only buttons, or include visually-hidden text. For decorative icons in buttons with text, use `aria-hidden="true"` on icon
**Warning signs:** Icon buttons that can't be identified by screen reader users

**Source:** [Sara Soueidan - Accessible Icon Buttons](https://www.sarasoueidan.com/blog/accessible-icon-buttons/), [W3C ARIA8 Technique](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA8)

### Pitfall 3: Inconsistent Data Patterns
**What goes wrong:** Product data structured differently than other data files (sponsors, fees, teams)
**Why it happens:** Not reviewing existing patterns before implementing
**How to avoid:** Follow established conventions: readonly arrays, as const assertions, TypeScript interfaces, optional fields with ? operator
**Warning signs:** Type errors, data file doesn't match sponsors.ts/fees.ts structure

### Pitfall 4: Poor Mobile Grid Layout
**What goes wrong:** Product grid looks good on desktop but cramped or too wide on mobile
**Why it happens:** Not using responsive breakpoint classes or testing on mobile viewports
**How to avoid:** Use Tailwind responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` pattern from SponsorGrid
**Warning signs:** Products overlap on mobile, or only one column on large screens

### Pitfall 5: Missing Product Categories
**What goes wrong:** All products shown in single list, hard to browse as catalog grows
**Why it happens:** Not planning for content organization from the start
**How to avoid:** Include category field in data model, consider filter/tab UI if 10+ products
**Warning signs:** Long scrolling page with no visual grouping

## Code Examples

Verified patterns from existing codebase and official sources:

### External Store Link with Accessibility
```typescript
// Source: RegistrationCTA.tsx pattern + W3C ARIA guidance
import { ExternalLink } from 'lucide-react';

<a
  href="https://example-spirit-wear-store.com"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 bg-bombers-yellow text-bombers-navy px-6 py-3 rounded-lg font-semibold hover:bg-bombers-yellow/90 transition-colors"
>
  Shop Now
  <ExternalLink className="w-4 h-4" aria-hidden="true" />
</a>
```

### Product Data Type Definition
```typescript
// Source: Following sponsors.ts + fees.ts patterns
export interface SpiritWearProduct {
  id: string;                              // Unique identifier (kebab-case)
  name: string;                            // Display name
  description: string;                     // Short description
  price: number;                           // USD price (no cents for simplicity)
  imageUrl: string;                        // Relative path to image
  category: 'apparel' | 'accessories' | 'headwear'; // For filtering/grouping
  sizes?: readonly string[];               // Optional size options
  colors?: readonly string[];              // Optional color options
  externalUrl?: string;                    // Optional specific product page
}

export const SPIRIT_WEAR_STORE_URL = 'https://example-spirit-wear-store.com';

export const spiritWearProducts: readonly SpiritWearProduct[] = [
  // Product data here
] as const;
```

### Product Card Component
```typescript
// Source: Combining SponsorCard.tsx + FeeCard.tsx patterns
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import type { SpiritWearProduct } from '@/lib/data/spirit-wear';

interface ProductCardProps {
  product: SpiritWearProduct;
  storeUrl: string;
}

export default function ProductCard({ product, storeUrl }: ProductCardProps) {
  const buyUrl = product.externalUrl || storeUrl;

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 hover:border-bombers-yellow hover:shadow-lg transition-all">
      {/* Image Section */}
      <div className="relative h-48 bg-gray-50">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={200}
          className="object-cover w-full h-full rounded-t-lg"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-bombers-navy mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {product.description}
        </p>

        {/* Price and Buy Button */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-bombers-navy">
            ${product.price}
          </span>
          <a
            href={buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-bombers-yellow text-bombers-navy px-4 py-2 rounded font-semibold text-sm hover:bg-bombers-yellow/90 transition-colors"
          >
            Buy Now
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        {/* Optional Size Info */}
        {product.sizes && (
          <p className="text-xs text-gray-500 mt-3">
            Sizes: {product.sizes.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}
```

### Page Layout
```typescript
// Source: sponsors/page.tsx + fees/page.tsx patterns
import type { Metadata } from 'next';
import Link from 'next/link';
import ProductGrid from '@/components/spirit-wear/ProductGrid';
import { spiritWearProducts, SPIRIT_WEAR_STORE_URL } from '@/lib/data/spirit-wear';

export const metadata: Metadata = {
  title: 'Spirit Wear | O\'Fallon Bombers',
  description: 'Shop official O\'Fallon Bombers apparel, accessories, and team gear.',
};

export default function SpiritWearPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-bombers-navy mb-4">
          Spirit Wear
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Show your Bombers pride with official team apparel and accessories.
        </p>
      </div>

      {/* Product Catalog Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-bombers-navy mb-6 border-b-4 border-bombers-yellow pb-2 inline-block">
          Available Products
        </h2>
        <ProductGrid products={spiritWearProducts} storeUrl={SPIRIT_WEAR_STORE_URL} />
      </section>

      {/* Store CTA Section */}
      <section className="bg-bombers-navy text-white rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Visit Our Store
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Browse our complete catalog and make purchases through our secure online store.
        </p>
        <a
          href={SPIRIT_WEAR_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-bombers-yellow text-bombers-navy px-8 py-3 rounded-lg font-semibold hover:bg-bombers-yellow/90 transition-colors"
        >
          Shop All Products
        </a>
      </section>
    </main>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Embedded store iframes | External links with preview catalog | 2024-2025 | Better SEO, faster page load, clearer user experience |
| Server-side image optimization | Static images with unoptimized mode | Next.js 14+ static exports | Simpler deployment, no image optimization server needed |
| `next export` command | `output: 'export'` in config | Next.js 14 (2024) | Already implemented in project |
| Manual responsive breakpoints | Container queries | 2026 | Not yet needed for simple grid, consider if nested layouts added |
| Page-driven responsive | Component-driven responsive | 2025-2026 | Grid responds to container, not viewport (future enhancement) |

**Deprecated/outdated:**
- next export command: Use `output: 'export'` in next.config instead (already done)
- Image component without unoptimized: Must set `unoptimized: true` for static export (already done)

## Open Questions

1. **What products should be in initial catalog?**
   - What we know: Common spirit wear includes t-shirts, hoodies, hats, jerseys per WebSearch findings
   - What's unclear: Specific products user wants to feature
   - Recommendation: Start with 6-8 placeholder products covering key categories (t-shirt, hoodie, hat, water bottle), user can update data file

2. **Should products be filterable by category?**
   - What we know: Single grid works for <10 products, filtering/tabs help at scale
   - What's unclear: Expected final product count
   - Recommendation: Implement simple grid first, add category filtering in future phase if catalog grows beyond 12 products

3. **What is the actual external store URL?**
   - What we know: Project uses placeholders during development (example.com)
   - What's unclear: Real spirit wear vendor URL
   - Recommendation: Use placeholder constant `SPIRIT_WEAR_STORE_URL` in data file, easy to update later

4. **Should we show "Coming Soon" if store not yet active?**
   - What we know: Page structure ready, external link is simple boolean condition
   - What's unclear: Timeline for actual store setup
   - Recommendation: Include conditional rendering - if store active, show "Buy Now", else show "Coming Soon" with contact link

## Sources

### Primary (HIGH confidence)
- Project codebase: src/lib/data/sponsors.ts, src/lib/data/fees.ts, src/app/sponsors/page.tsx, src/app/fees/page.tsx, src/components/organization/SponsorCard.tsx, src/components/fees/FeeCard.tsx - existing patterns verified via Read tool
- [Next.js Static Exports Documentation](https://nextjs.org/docs/app/guides/static-exports) - Official docs on static export configuration
- [Next.js Image Component](https://nextjs.org/docs/app/api-reference/components/image) - Official docs on Image component with unoptimized mode
- [MDN rel=noopener](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener) - Security best practice for external links
- [Chrome Developers External Links](https://developer.chrome.com/docs/lighthouse/best-practices/external-anchors-use-rel-noopener) - External link security guidance

### Secondary (MEDIUM confidence)
- [Sara Soueidan Accessible Icon Buttons](https://www.sarasoueidan.com/blog/accessible-icon-buttons/) - ARIA best practices verified with official W3C docs
- [W3C ARIA8 Technique](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA8) - aria-label for link purpose
- [Tailwind CSS Grid Patterns 2026](https://thelinuxcode.com/tailwind-css-grid-template-columns-practical-patterns-for-2026-layouts/) - Modern responsive grid approaches
- [Types of Sportswear 2026](https://argusapparel.com/blog/types-of-sportswear/) - Common spirit wear product categories

### Tertiary (LOW confidence)
- WebSearch results on spirit wear catalogs - provide context but specific vendors vary

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed and configured correctly
- Architecture: HIGH - Following established project patterns (sponsors, fees pages)
- Pitfalls: MEDIUM-HIGH - Security and accessibility patterns verified, component-specific issues are common
- Product categories: MEDIUM - General spirit wear knowledge from web search, specific products TBD by user

**Research date:** 2026-02-16
**Valid until:** 30 days (stable domain, minimal framework changes expected)
