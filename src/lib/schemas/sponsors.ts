import { z } from 'zod';

// Sponsor schema
export const SponsorSchema = z.object({
  id: z
    .string()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Sponsor ID must be in kebab-case format (e.g., "hometown-sports")'),
  name: z.string().min(1, 'Sponsor name is required'),
  logoUrl: z.string().min(1, 'Sponsor logo URL is required'),
  description: z.string().min(1, 'Sponsor description is required'),
  websiteUrl: z.string().url('Website URL must be a valid URL').optional(),
});

export type Sponsor = z.infer<typeof SponsorSchema>;

// Root schema for sponsors data
export const SponsorsDataSchema = z.object({
  sponsors: z.array(SponsorSchema),
});

export type SponsorsData = z.infer<typeof SponsorsDataSchema>;
