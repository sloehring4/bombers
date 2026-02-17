---
phase: 08-contact-social
plan: 01
subsystem: contact
tags: [forms, validation, accessibility, social-links, web3forms]
dependency_graph:
  requires:
    - react-hook-form
    - zod
    - "@hookform/resolvers"
    - lucide-react (existing)
  provides:
    - ContactForm component
    - SocialLinks component
    - contactFormSchema
    - contact data layer
  affects:
    - future contact page integration
tech_stack:
  added:
    - react-hook-form: "Form state management and validation"
    - zod: "Schema validation with type inference"
    - "@hookform/resolvers": "Bridge between react-hook-form and Zod"
    - web3forms: "Email delivery API for contact submissions"
  patterns:
    - "Zod schema with type inference for form data"
    - "Accessible form fields with ARIA attributes"
    - "Centralized contact data file pattern"
    - "Client component with controlled form state"
    - "Server component for static social links"
key_files:
  created:
    - src/lib/schemas/contact.ts: "Zod validation schema for contact form"
    - src/lib/data/contact.ts: "Social links, email, donation URL constants"
    - src/components/contact/ContactForm.tsx: "Client-side contact form with validation"
    - src/components/contact/SocialLinks.tsx: "Social media links with icons"
    - .env.example: "Documents required Web3Forms access key"
  modified:
    - package.json: "Added form dependencies"
    - pnpm-lock.yaml: "Locked dependency versions"
decisions:
  - what: "Use Web3Forms for email delivery"
    why: "Simple, free tier, no backend email server needed"
    alternatives: ["SendGrid", "Mailgun", "direct SMTP"]
  - what: "Zod for form validation"
    why: "Type-safe schema validation with automatic TypeScript type inference"
    alternatives: ["Yup", "Joi", "manual validation"]
  - what: "Optional phone field with flexible regex"
    why: "Allows various phone formats without being too restrictive"
    alternatives: ["Strict E.164 format", "No phone field"]
  - what: "Inline error messages with ARIA attributes"
    why: "Accessible validation feedback for screen readers"
    alternatives: ["Toast notifications", "Summary error list"]
  - what: "Facebook and Instagram only for social links"
    why: "Matches existing Footer.tsx social links, keeps UI simple"
    alternatives: ["Add Twitter/X", "Add TikTok", "Add YouTube"]
metrics:
  duration: "2m 59s"
  tasks_completed: 2
  files_created: 6
  files_modified: 2
  commits: 2
  completed_at: "2026-02-16"
---

# Phase 08 Plan 01: Contact Form & Social Links Summary

**One-liner:** Contact form with Zod validation and Web3Forms submission, plus social links component with Facebook and Instagram icons.

## Overview

Installed form dependencies (react-hook-form, zod, @hookform/resolvers) and created a fully accessible ContactForm component with Web3Forms integration. Built a reusable SocialLinks component that renders Facebook and Instagram links from centralized data. Established Zod schema pattern for type-safe form validation.

## Tasks Completed

### Task 1: Install dependencies and create data layer with Zod schema
**Commit:** `9daa3ef`

- Installed react-hook-form, zod, and @hookform/resolvers via pnpm
- Created `src/lib/schemas/contact.ts` with contactFormSchema
  - Validates: name (1-100 chars), email (email format), phone (optional, flexible regex), subject (1-200 chars), message (10-2000 chars)
  - Exports ContactFormData type via z.infer
- Created `src/lib/data/contact.ts` following spirit-wear.ts pattern
  - SocialLink interface with name, url, icon (LucideIcon)
  - socialLinks readonly array: Facebook, Instagram (matches Footer.tsx URLs)
  - CONTACT_EMAIL constant: ofallonbombers@gmail.com
  - DONATION_URL constant: https://paypal.me/ofallonbombers (placeholder)
- Created `.env.example` documenting NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
- Created `.env.local` with placeholder value (user will replace with real key)

**Files created:**
- src/lib/schemas/contact.ts
- src/lib/data/contact.ts
- .env.example

**Files modified:**
- package.json
- pnpm-lock.yaml

### Task 2: Build ContactForm and SocialLinks components
**Commit:** `722f12f`

- Created `src/components/contact/ContactForm.tsx` as 'use client' component
  - useForm with zodResolver(contactFormSchema)
  - 5 form fields: name, email, phone (optional), subject, message (textarea with rows={5})
  - All fields have accessible ARIA attributes:
    - aria-invalid based on error state
    - aria-describedby pointing to error message ID
    - Error messages with role="alert"
  - Dynamic styling: red border on error, yellow focus on valid
  - onSubmit handler:
    - POSTs to https://api.web3forms.com/submit
    - Sends: access_key, from_name, subject (prefixed with "Bombers Website:"), all form data
    - Success: setSubmitStatus('success'), reset form
    - Error: setSubmitStatus('error')
    - try/catch for network errors
  - Submit button: disabled during submission, shows "Sending..." text
  - Success message: green background, border-l-4, role="status"
  - Error message: red background, border-l-4, role="alert", includes fallback email link
- Created `src/components/contact/SocialLinks.tsx` as server component
  - Imports socialLinks from centralized data file
  - Maps over socialLinks to render anchor tags
  - Each link: external (target="_blank", rel="noopener noreferrer")
  - aria-label for accessibility
  - Icon rendered with aria-hidden="true"
  - Responsive layout: flex-col on mobile, flex-row on sm+
  - Hover effect: border changes to bombers-yellow

**Files created:**
- src/components/contact/ContactForm.tsx
- src/components/contact/SocialLinks.tsx

## Verification Results

All verification criteria met:
- pnpm run build completed successfully
- ContactForm has 'use client' directive
- All 5 form fields have aria-invalid attributes
- All 5 form fields have aria-describedby attributes
- 6 error/status messages use role="alert" or role="status"
- SocialLinks imports from centralized data file (not hardcoded URLs)
- Zod schema validates all required fields with meaningful error messages
- TypeScript compilation passes (npx tsc --noEmit)

## Deviations from Plan

None - plan executed exactly as written.

## Integration Notes

**For Contact Page:**
The contact page should import and render both components:
```tsx
import ContactForm from '@/components/contact/ContactForm';
import SocialLinks from '@/components/contact/SocialLinks';

// In page component:
<ContactForm />
<SocialLinks />
```

**Web3Forms Setup:**
User must:
1. Sign up at https://web3forms.com
2. Create a new form
3. Copy the access key
4. Replace placeholder in `.env.local` with real key
5. Restart dev server for env var to take effect

**Environment Variable:**
- `.env.local` is already in .gitignore (via `.env*` pattern)
- Production deployment must set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in environment

## Success Criteria Met

- react-hook-form, zod, @hookform/resolvers installed and importable
- Contact data centralized in src/lib/data/contact.ts
- Zod schema in src/lib/schemas/contact.ts with type export
- ContactForm component with full validation, Web3Forms submission, accessible error handling
- SocialLinks component with Facebook/Instagram icon links
- Build passes cleanly

## What's Next

**Phase 08 Plan 02:** Contact Page Integration
- Create contact page using ContactForm and SocialLinks components
- Add page metadata
- Implement layout with form, social links, and office hours/location info
- Add email and donation links

## Self-Check: PASSED

All files verified:
- FOUND: src/lib/schemas/contact.ts
- FOUND: src/lib/data/contact.ts
- FOUND: src/components/contact/ContactForm.tsx
- FOUND: src/components/contact/SocialLinks.tsx
- FOUND: .env.example

All commits verified:
- FOUND: 9daa3ef
- FOUND: 722f12f
