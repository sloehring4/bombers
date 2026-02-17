import { z } from 'zod';

// QuickLink schema (iconName as string for JSON storage)
export const QuickLinkSchema = z.object({
  iconName: z.string().min(1, 'Icon name is required'),
  title: z.string().min(1, 'Quick link title is required'),
  description: z.string().min(1, 'Quick link description is required'),
  href: z.string().min(1, 'Quick link href is required'),
});

export type QuickLinkData = z.infer<typeof QuickLinkSchema>;

// KeyDate schema
export const KeyDateSchema = z.object({
  label: z.string().min(1, 'Key date label is required'),
  date: z.string().min(1, 'Key date is required'),
});

export type KeyDate = z.infer<typeof KeyDateSchema>;

// HeroContent schema
export const HeroContentSchema = z.object({
  headline: z.string().min(1, 'Hero headline is required'),
  tagline: z.string().min(1, 'Hero tagline is required'),
  primaryCta: z.object({
    text: z.string().min(1, 'Primary CTA text is required'),
    href: z.string().min(1, 'Primary CTA href is required'),
  }),
  secondaryCta: z.object({
    text: z.string().min(1, 'Secondary CTA text is required'),
    href: z.string().min(1, 'Secondary CTA href is required'),
  }),
});

export type HeroContent = z.infer<typeof HeroContentSchema>;

// Root schema for home data
export const HomeDataSchema = z.object({
  quickLinks: z.array(QuickLinkSchema),
  keyDates: z.array(KeyDateSchema),
  heroContent: HeroContentSchema,
});

export type HomeData = z.infer<typeof HomeDataSchema>;
