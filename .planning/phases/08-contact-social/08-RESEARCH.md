# Phase 8: Contact & Social - Research

**Researched:** 2026-02-16
**Domain:** Contact forms, email services, social media integration, form validation
**Confidence:** HIGH

## Summary

Phase 8 requires implementing a contact form with email delivery, social media links/feed, and a donation link for a Next.js static export site. The critical challenge is that static exports cannot run server-side code (no API routes, no Nodemailer), requiring third-party email services.

The research reveals a mature ecosystem for static site contact forms. **Web3Forms** and **FormSubmit** are the leading free, zero-backend solutions that work perfectly with Next.js static exports. For form handling and validation, **react-hook-form** with **Zod** schema validation and **@hookform/resolvers** is the industry standard stack offering excellent TypeScript support, minimal re-renders, and robust error handling.

Social media integration is straightforward: lucide-react already provides Facebook and Instagram icons (though marked as deprecated, still functional), and embedding feeds requires third-party widgets like EmbedSocial or SociableKIT. Donation links can be simple external links to PayPal Donate or Stripe Payment Links, requiring no custom implementation.

**Primary recommendation:** Use Web3Forms for email delivery (free, no data storage, AWS-backed reliability), react-hook-form + Zod for client-side validation, lucide-react for social icons, and a third-party embed widget for the social feed. This stack requires zero backend code, maintains the static export architecture, and provides production-ready reliability.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-hook-form | ^7.54+ | Form state management and validation | Industry standard for React forms - minimal re-renders, excellent TypeScript support, tiny bundle size (9kb), performant with uncontrolled components |
| zod | ^3.24+ | Schema validation and TypeScript inference | De facto validation library for TypeScript projects - runtime type safety, schema reusability, automatic type inference, integrates seamlessly with react-hook-form |
| @hookform/resolvers | ^3.9+ | Bridge between react-hook-form and Zod | Official adapter for external validators - transforms Zod errors into react-hook-form FieldError shape |
| Web3Forms | N/A (API service) | Email delivery for contact form | Leading free serverless form backend - zero data storage, AWS infrastructure, reCAPTCHA support, perfect for static sites |
| lucide-react | ^0.564+ (already installed) | Social media icons | Already in project dependencies - provides Facebook, Instagram icons with consistent styling |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| EmbedSocial / SociableKIT | N/A (embed widget) | Social media feed embedding | For displaying recent Facebook/Instagram posts - provides auto-updating feeds with customizable styling |
| clsx | ^2.1+ (already installed) | Conditional className management | Already in project - use for dynamic form input styling (error states, focus states) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Web3Forms | FormSubmit | FormSubmit is equally viable (same features, free), Web3Forms chosen for explicit no-data-storage policy and AWS reliability |
| react-hook-form | Formik | Formik is older, heavier (13kb vs 9kb), uses controlled components causing more re-renders |
| Zod | Yup | Yup lacks first-class TypeScript support and type inference capabilities that Zod provides |
| Third-party embed | Custom API integration | Social media APIs (Meta Graph API) require OAuth, app registration, tokens, rate limits - massive complexity for simple feed display |

**Installation:**
```bash
npm install react-hook-form zod @hookform/resolvers
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   └── contact/
│       └── page.tsx             # Contact page with form, social links, donation link
├── components/
│   └── contact/
│       ├── ContactForm.tsx      # Form component with validation
│       ├── SocialLinks.tsx      # Social media icon links
│       └── SocialFeed.tsx       # Embedded social media feed widget
└── lib/
    ├── data/
    │   └── contact.ts           # Type-safe contact data (social URLs, donation URL)
    └── schemas/
        └── contact.ts           # Zod validation schema for contact form
```

### Pattern 1: Contact Form with Web3Forms + react-hook-form + Zod
**What:** Client-side form with validation that POSTs to Web3Forms API endpoint
**When to use:** Any static site contact form requiring email delivery without backend

**Example:**
```typescript
// src/lib/schemas/contact.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

```typescript
// src/components/contact/ContactForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact';
import { useState } from 'react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          from_name: data.name,
          subject: data.subject,
          ...data,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name field with inline error */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-bombers-navy mb-2">
          Name <span className="text-red-600">*</span>
        </label>
        <input
          {...register('name')}
          id="name"
          type="text"
          className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
            errors.name
              ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
              : 'border-gray-300 focus:border-bombers-yellow focus:ring-2 focus:ring-bombers-yellow/20'
          }`}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-2 text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email field */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-bombers-navy mb-2">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
            errors.email
              ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
              : 'border-gray-300 focus:border-bombers-yellow focus:ring-2 focus:ring-bombers-yellow/20'
          }`}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-2 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Submit button with loading state */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-bombers-yellow text-bombers-navy py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {/* Success/Error messages */}
      {submitStatus === 'success' && (
        <div role="status" className="p-4 bg-green-50 border-l-4 border-green-500 text-green-800 rounded">
          <p className="font-semibold">Message sent successfully!</p>
          <p className="text-sm">We'll get back to you soon.</p>
        </div>
      )}
      {submitStatus === 'error' && (
        <div role="alert" className="p-4 bg-red-50 border-l-4 border-red-500 text-red-800 rounded">
          <p className="font-semibold">Failed to send message</p>
          <p className="text-sm">Please try again or email us directly at ofallonbombers@gmail.com</p>
        </div>
      )}
    </form>
  );
}
```

**Source:** Synthesized from [Web3Forms documentation](https://docs.web3forms.com), [React Hook Form official docs](https://react-hook-form.com/), and [Zod integration guide](https://www.contentful.com/blog/react-hook-form-validation-zod/)

### Pattern 2: Social Links with lucide-react Icons
**What:** Accessible social media link component using existing lucide-react icons
**When to use:** Any external social media links requiring icons

**Example:**
```typescript
// src/lib/data/contact.ts
import { Facebook, Instagram } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
}

export const socialLinks: readonly SocialLink[] = [
  {
    name: 'Facebook',
    url: 'https://facebook.com/ofallonbombers',
    icon: Facebook,
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/ofallonbombers',
    icon: Instagram,
  },
] as const;

export const donationUrl = 'https://paypal.me/ofallonbombers'; // or Stripe Payment Link
export const contactEmail = 'ofallonbombers@gmail.com';
```

```typescript
// src/components/contact/SocialLinks.tsx
import { socialLinks } from '@/lib/data/contact';

export default function SocialLinks() {
  return (
    <div className="flex gap-4">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-bombers-navy hover:text-bombers-yellow transition-colors"
          aria-label={`Visit our ${social.name} page`}
        >
          <social.icon className="w-6 h-6" aria-hidden="true" />
          <span className="font-semibold">{social.name}</span>
        </a>
      ))}
    </div>
  );
}
```

**Source:** Adapted from [Lucide React documentation](https://lucide.dev/guide/packages/lucide-react) and project's existing pattern in `src/lib/data/home.ts`

### Pattern 3: Social Media Feed Embed
**What:** Third-party widget embed for displaying recent social posts
**When to use:** Requirement for embedded social feed without custom API integration

**Example:**
```typescript
// src/components/contact/SocialFeed.tsx
export default function SocialFeed() {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
      <h2 className="text-2xl font-semibold text-bombers-navy mb-4 border-b-4 border-bombers-yellow pb-2">
        Follow Our Journey
      </h2>
      {/* EmbedSocial or SociableKIT embed code goes here */}
      <div
        className="embedsocial-feed"
        data-ref="YOUR_FEED_ID"
        dangerouslySetInnerHTML={{ __html: '<!-- Embed widget script -->' }}
      />
    </div>
  );
}
```

**Note:** Actual embed code comes from EmbedSocial/SociableKIT dashboard after connecting social accounts.

**Source:** Pattern from [EmbedSocial implementation guide](https://embedsocial.com/blog/embed-instagram-feed-for-free/)

### Anti-Patterns to Avoid

- **Don't use API Routes with `output: 'export'`**: Next.js static exports cannot run server-side code. API routes won't be generated in the build. Use third-party email services instead.

- **Don't rely solely on placeholder text for labels**: Screen readers may not announce placeholders. Always use proper `<label>` elements with `htmlFor` attribute.

- **Don't disable submit button on validation errors**: Keep button enabled and show inline validation errors. Disabled buttons without explanation are confusing for users.

- **Don't use toast notifications for form errors**: Errors should be persistent and located near the problematic input field, not in fleeting toast messages that disappear.

- **Don't directly integrate social media APIs**: Meta Graph API requires OAuth, app registration, access tokens, rate limits, and webhook verification. Use embed widgets instead for simple feed display.

- **Don't store environment variables in source control**: Web3Forms access key should be in `.env.local` (gitignored) and exposed via `NEXT_PUBLIC_` prefix for client-side access in static builds.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Email delivery from static site | Custom SMTP, Nodemailer server, AWS SES integration | Web3Forms or FormSubmit API | Email delivery requires server infrastructure, rate limiting, spam prevention, bounce handling, DKIM/SPF configuration. Third-party services handle all of this with zero config. |
| Form validation | Custom regex validators, manual error state management | Zod schema + react-hook-form | Form validation has dozens of edge cases: nested objects, async validation, conditional fields, error message formatting, accessibility announcements. Libraries solve these robustly. |
| Social media feed display | Direct Meta Graph API integration | EmbedSocial, SociableKIT widgets | Social APIs require OAuth flows, token refresh, rate limit handling, webhook verification, data caching. Embed widgets handle all complexity behind a simple script tag. |
| File uploads in contact form | Custom base64 encoding, client-side file handling | Extend Web3Forms with file upload service | File validation (type, size), malware scanning, storage, and delivery require specialized infrastructure. Web3Forms supports file attachments via their API. |

**Key insight:** Static sites deliberately avoid backend complexity. Fighting this with complex client-side workarounds defeats the purpose. Embrace third-party services that specialize in these problems.

## Common Pitfalls

### Pitfall 1: Exposing Sensitive API Keys in Static Builds
**What goes wrong:** Web3Forms access key exposed in client-side bundle can be stolen and abused for spam.

**Why it happens:** Static builds include all environment variables prefixed with `NEXT_PUBLIC_` in the JavaScript bundle. Developers often don't realize this key is publicly visible.

**How to avoid:**
- Web3Forms keys are *intended* to be public (they use reCAPTCHA and rate limiting to prevent abuse)
- Add reCAPTCHA v3 to Web3Forms configuration to protect against spam
- Monitor submissions via Web3Forms dashboard
- If abuse occurs, regenerate the access key (free on Web3Forms)

**Warning signs:** Unexpected spam submissions in inbox, form working locally but not in production (forgot `NEXT_PUBLIC_` prefix).

### Pitfall 2: Not Handling Fetch Failures in Form Submission
**What goes wrong:** Network errors, API downtime, or CORS issues cause form to hang indefinitely or show no feedback.

**Why it happens:** Developers only test happy path (successful submission), not error scenarios.

**How to avoid:**
- Wrap fetch in try/catch to handle network errors
- Use `response.ok` to check HTTP status before assuming success
- Set loading state before fetch, clear it in `finally` block
- Provide fallback text: "If this form isn't working, email us directly at ofallonbombers@gmail.com"
- Test with network throttling, offline mode, and blocked requests in DevTools

**Warning signs:** Button stays in "Sending..." state forever, console errors about CORS or network failures, no user feedback when API is down.

### Pitfall 3: Inaccessible Form Validation Errors
**What goes wrong:** Screen reader users cannot perceive validation errors, failing WCAG 2.1 AA compliance.

**Why it happens:** Errors only shown via CSS (red border) or visual icons without text alternatives and ARIA attributes.

**How to avoid:**
- Use `aria-invalid="true"` on invalid inputs
- Use `aria-describedby` to associate error message with input
- Use `role="alert"` on error messages for live region announcements
- Don't rely solely on color to indicate errors (use icons + text)
- Error messages should be persistent (not tooltips that disappear on focus)

**Warning signs:** Error messages not announced by screen readers, color-only error indicators, missing or incorrect ARIA attributes.

### Pitfall 4: Form State Lost on Refresh/Navigation
**What goes wrong:** User fills out long form, accidentally refreshes, loses all data.

**Why it happens:** Form state only exists in component state, not persisted anywhere.

**How to avoid:**
- Use `localStorage` or `sessionStorage` to persist draft form data
- Show "unsaved changes" warning on page navigation with `beforeunload` event
- Auto-save drafts every 30-60 seconds
- Or keep form simple enough that losing data isn't catastrophic

**Warning signs:** User complaints about lost data, especially on mobile where accidental refreshes are common.

### Pitfall 5: Social Media Icons Suddenly Break
**What goes wrong:** Facebook and Instagram icons stop rendering after lucide-react update.

**Why it happens:** Lucide has deprecated social media brand icons and may remove them in future major versions.

**Root cause:** Lucide team decided to remove brand icons to reduce maintenance burden and licensing concerns.

**How to avoid:**
- Pin lucide-react to current major version to prevent breaking changes
- Plan migration to alternative icon set for brand icons (e.g., Simple Icons, React Icons)
- For now, use existing Facebook/Instagram icons (still functional as of 2026)
- Have fallback text links if icons fail to render

**Warning signs:** GitHub issues about icon deprecation, TypeScript errors after lucide-react upgrade, missing icons in production.

### Pitfall 6: Embedded Social Feed Performance
**What goes wrong:** Third-party social feed widget slows down initial page load significantly.

**Why it happens:** Embed scripts often load synchronously and fetch large amounts of data.

**How to avoid:**
- Lazy load social feed widget below the fold using Intersection Observer
- Use `loading="lazy"` on iframe embeds
- Consider showing static fallback initially, loading feed on interaction
- Test page performance with Lighthouse, ensure feed doesn't block main thread

**Warning signs:** Slow Lighthouse scores, long blocking time, users complaining about page lag.

## Code Examples

Verified patterns from official sources and project conventions:

### Web3Forms Setup and Configuration
```bash
# 1. Sign up for free account at https://web3forms.com
# 2. Create a new form and get your access key
# 3. Add to environment variables

# .env.local (gitignored)
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-access-key-here
```

```typescript
// Environment variable validation (add to relevant config file)
if (!process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY) {
  console.warn('Warning: Web3Forms access key not configured. Contact form will not work.');
}
```

### Complete Contact Page Structure
```typescript
// src/app/contact/page.tsx
import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import SocialLinks from '@/components/contact/SocialLinks';
import SocialFeed from '@/components/contact/SocialFeed';
import { contactEmail, donationUrl } from '@/lib/data/contact';

export const metadata: Metadata = {
  title: 'Contact Us | O\'Fallon Bombers',
  description: 'Get in touch with the O\'Fallon Bombers. Send us a message, connect on social media, or make a donation to support our youth baseball organization.',
};

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 max-w-6xl py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-bombers-navy mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600">
          Get in touch with the O'Fallon Bombers. We're here to help!
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Contact Form */}
        <section>
          <h2 className="text-2xl font-semibold text-bombers-navy mb-4 border-b-4 border-bombers-yellow pb-2">
            Send Us a Message
          </h2>
          <ContactForm />
        </section>

        {/* Contact Info Sidebar */}
        <aside className="space-y-8">
          {/* Email */}
          <div>
            <h2 className="text-2xl font-semibold text-bombers-navy mb-4 border-b-4 border-bombers-yellow pb-2">
              Email Us
            </h2>
            <a
              href={`mailto:${contactEmail}`}
              className="text-lg text-bombers-navy hover:text-bombers-yellow transition-colors"
            >
              {contactEmail}
            </a>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-2xl font-semibold text-bombers-navy mb-4 border-b-4 border-bombers-yellow pb-2">
              Connect With Us
            </h2>
            <SocialLinks />
          </div>

          {/* Donation */}
          <div>
            <h2 className="text-2xl font-semibold text-bombers-navy mb-4 border-b-4 border-bombers-yellow pb-2">
              Support Our Team
            </h2>
            <a
              href={donationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-bombers-yellow text-bombers-navy px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
            >
              Make a Donation
            </a>
            <p className="mt-3 text-sm text-gray-600">
              Your donation helps us provide quality baseball programs for young athletes.
            </p>
          </div>
        </aside>
      </div>

      {/* Social Feed */}
      <SocialFeed />
    </main>
  );
}
```

### Accessible Form Input Component Pattern
```typescript
// Reusable form input component following project conventions
interface FormInputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  required?: boolean;
  error?: string;
  register: any; // From react-hook-form
  placeholder?: string;
  rows?: number; // For textarea
}

function FormInput({ label, name, type = 'text', required, error, register, placeholder, rows }: FormInputProps) {
  const inputId = `form-${name}`;
  const errorId = `${inputId}-error`;
  const isTextarea = type === 'textarea';

  const baseStyles = 'w-full px-4 py-3 rounded-lg border-2 transition-colors';
  const errorStyles = error
    ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
    : 'border-gray-300 focus:border-bombers-yellow focus:ring-2 focus:ring-bombers-yellow/20';

  const inputProps = {
    ...register(name),
    id: inputId,
    className: `${baseStyles} ${errorStyles}`,
    placeholder,
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': error ? errorId : undefined,
  };

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-semibold text-bombers-navy mb-2">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {isTextarea ? (
        <textarea {...inputProps} rows={rows ?? 5} />
      ) : (
        <input {...inputProps} type={type} />
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Formik for React forms | react-hook-form | ~2020-2021 | react-hook-form is smaller (9kb vs 13kb), faster (uncontrolled components), and has better TypeScript/hooks integration. Formik still maintained but ecosystem shifted. |
| Yup for validation | Zod | ~2021-2022 | Zod provides first-class TypeScript support with automatic type inference. Yup added TypeScript support later but Zod's API is more TypeScript-native. |
| EmailJS for static forms | Web3Forms / FormSubmit | ~2023-2024 | EmailJS requires client-side email credentials (security concern). Web3Forms uses server-side API keys and doesn't store data, better for privacy and security. |
| Direct social media API integration | Embed widgets | Ongoing trend | Social media APIs increasingly restrictive (require app review, strict rate limits, complex OAuth). Embed widgets are officially supported alternative requiring no developer credentials. |
| Custom email regex validation | `z.string().email()` or HTML5 `type="email"` | Standard since HTML5 | Email regex is notoriously complex (RFC 5322). Let browsers and validation libraries handle it. |

**Deprecated/outdated:**
- **Netlify Forms**: Works for Netlify deployments but not portable to other static hosts. Web3Forms is host-agnostic.
- **React Hook Form v6 and earlier**: v7 introduced better TypeScript support and API improvements. Use v7+.
- **Next.js Pages Router API routes for forms**: App Router with Server Actions is the modern approach, but both are incompatible with static exports. Use third-party services instead.

## Open Questions

1. **What social media platform should the feed display: Facebook or Instagram?**
   - What we know: Requirement specifies "Facebook or Instagram posts" (not both). Footer already links to both platforms.
   - What's unclear: Which platform is more actively maintained by the organization? Which has better engagement?
   - Recommendation: Ask user for preference. Instagram feeds tend to have better visual appeal and engagement for youth sports. Facebook feeds can show more text content and event announcements. Default to Instagram unless specified.

2. **Should the donation link go to an existing donation page or create a new one?**
   - What we know: Requirement is "donation link" (ambiguous: could be external link or internal page)
   - What's unclear: Does organization have PayPal.me, Stripe Payment Link, or other donation platform already set up?
   - Recommendation: Use simple external link approach (PayPal Donate button URL or Stripe Payment Link). Creating a full donation page with payment form is out of scope for "Phase 8: Contact & Social" and would require payment gateway integration.

3. **Should contact form include phone number field?**
   - What we know: Schema example includes optional phone field. Many sports organizations prefer phone contact.
   - What's unclear: User preference for phone contact.
   - Recommendation: Include as optional field with proper validation (`z.string().regex(/^[\d\s\-\(\)]+$/).optional()` for flexible phone formats).

4. **Should form submissions be stored anywhere besides email?**
   - What we know: Web3Forms sends to email directly, doesn't store data.
   - What's unclear: Need for submission history, analytics, or CRM integration.
   - Recommendation: For initial launch, email-only is sufficient. If organization needs submission tracking later, Web3Forms offers paid plans with dashboard storage, or can add webhook to Google Sheets/Airtable.

## Sources

### Primary (HIGH confidence)
- [Web3Forms Official Website](https://web3forms.com/) - Feature documentation
- [React Hook Form Official Documentation](https://react-hook-form.com/) - API reference and patterns
- [Zod GitHub Repository](https://github.com/colinhacks/zod) - Schema validation library
- [Lucide React Icons](https://lucide.dev/) - Icon library documentation (Facebook/Instagram icons)
- [W3C WAI Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/) - WCAG accessibility guidelines

### Secondary (MEDIUM confidence)
- [Web3Forms Documentation](https://docs.web3forms.com) - Implementation guide (verified API integration pattern)
- [FormSubmit Official Site](https://formsubmit.co/) - Alternative email service (cross-verified features with Web3Forms)
- [EmbedSocial Blog: Embed Instagram Feed](https://embedsocial.com/blog/embed-instagram-feed-for-free/) - Social feed embedding guide
- [Contentful: React Hook Form + Zod Validation](https://www.contentful.com/blog/react-hook-form-validation-zod/) - Integration pattern guide
- [FreeCodeCamp: Form Validation with Zod and React-Hook-Form](https://www.freecodecamp.org/news/react-form-validation-zod-react-hook-form/) - Practical tutorial
- [AbstractAPI: Type-Safe Form Validation in Next.js 15](https://www.abstractapi.com/guides/email-validation/type-safe-form-validation-in-next-js-15-with-zod-and-react-hook-form) - Modern best practices
- [PayPal Developer Community: Donate SDK](https://developer.paypal.com/community/blog/how-to-add-donations-to-your-website-with-paypals-donate-sdk/) - Donation button implementation

### Secondary - Accessibility (MEDIUM-HIGH confidence)
- [Deque: Anatomy of Accessible Forms](https://www.deque.com/blog/anatomy-of-accessible-forms-best-practices/) - WCAG compliance patterns
- [UXPin: Accessible Form Validation](https://www.uxpin.com/studio/blog/accessible-form-validation-best-practices/) - Best practices
- [Smashing Magazine: Accessible Form Validation](https://www.smashingmagazine.com/2023/02/guide-accessible-form-validation/) - Implementation guide

### Tertiary (LOW-MEDIUM confidence, general UX guidance)
- [Medium: Error Handling UX Patterns](https://medium.com/design-bootcamp/error-handling-ux-design-patterns-c2a5bbae5f8d) - General UX principles
- [Pencil & Paper: Error Message UX](https://www.pencilandpaper.io/articles/ux-pattern-analysis-error-feedback) - UX patterns
- [User Journeys: Error Handling Guidelines](https://www.userjourneys.com/blog/ux-guidelines-for-error-handling/) - Best practices

## Metadata

**Confidence breakdown:**
- Standard stack: **HIGH** - React Hook Form, Zod, Web3Forms are well-documented industry standards with official docs verified
- Architecture: **HIGH** - Patterns sourced from official docs and verified against project conventions in existing codebase
- Pitfalls: **MEDIUM-HIGH** - Based on common issues documented in multiple sources, accessibility guidelines from W3C, and web development best practices
- Social media integration: **MEDIUM** - Third-party embed widgets are standard approach but specific implementation varies by provider choice
- Donation implementation: **MEDIUM** - PayPal/Stripe approaches are standard but specific organization setup is unknown

**Research date:** 2026-02-16
**Valid until:** ~60 days (stable ecosystem - react-hook-form and Zod have infrequent breaking changes, Web3Forms is SaaS with stable API)

**Notes:**
- No CONTEXT.md exists, so no user constraints to honor
- Lucide-react Facebook/Instagram icons are marked as deprecated but still functional - monitor for removal in future versions
- Web3Forms free tier is sufficient for small-to-medium traffic; rate limits and feature restrictions not encountered in research
- Social feed embedding requires signup for third-party service (EmbedSocial, SociableKIT) - all offer free tiers for basic usage
