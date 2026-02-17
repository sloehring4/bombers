import { z } from 'zod';

// AgeFee schema
export const AgeFeeSchema = z.object({
  ageGroup: z.string().min(1, 'Age group is required'),
  breakdown: z.array(
    z.object({
      label: z.string().min(1, 'Fee breakdown label is required'),
      amount: z.number().positive('Fee amount must be a positive number'),
    })
  ),
  total: z.number().positive('Total fee must be a positive number'),
  description: z.string().optional(),
});

export type AgeFee = z.infer<typeof AgeFeeSchema>;

// KeyDate schema (for fees page with category)
export const FeesKeyDateSchema = z.object({
  id: z.string().min(1, 'Key date ID is required'),
  label: z.string().min(1, 'Key date label is required'),
  date: z.string().min(1, 'Key date is required'),
  category: z.enum(['tryout', 'registration', 'season', 'tournament'], {
    message: 'Key date category must be one of: tryout, registration, season, tournament',
  }),
  description: z.string().optional(),
});

export type FeesKeyDate = z.infer<typeof FeesKeyDateSchema>;

// FAQItem schema
export const FAQItemSchema = z.object({
  id: z.string().min(1, 'FAQ ID is required'),
  question: z.string().min(1, 'FAQ question is required'),
  answer: z.string().min(1, 'FAQ answer is required'),
  category: z.enum(['fees', 'tryouts', 'season', 'general'], {
    message: 'FAQ category must be one of: fees, tryouts, season, general',
  }),
});

export type FAQItem = z.infer<typeof FAQItemSchema>;

// Root schema for fees data
export const FeesDataSchema = z.object({
  ageFees: z.array(AgeFeeSchema),
  keyDates: z.array(FeesKeyDateSchema),
  faqItems: z.array(FAQItemSchema),
});

export type FeesData = z.infer<typeof FeesDataSchema>;
