import { z } from 'zod';

// ConductSection schema
export const ConductSectionSchema = z.object({
  id: z.string().min(1, 'Conduct section ID is required'),
  title: z.string().min(1, 'Conduct section title is required'),
  rules: z.array(z.string().min(1, 'Rule text is required')).min(1, 'Each conduct section must have at least one rule'),
});

export type ConductSection = z.infer<typeof ConductSectionSchema>;

// Root schema for conduct data
export const ConductDataSchema = z.object({
  conductSections: z.array(ConductSectionSchema),
});

export type ConductData = z.infer<typeof ConductDataSchema>;
