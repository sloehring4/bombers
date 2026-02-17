import { z } from 'zod';

// BoardMember schema (used for both board members and staff)
export const BoardMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  photoUrl: z.string().min(1, 'Photo URL is required'),
  bio: z.string().optional(),
});

export type BoardMember = z.infer<typeof BoardMemberSchema>;

// Root schema for organization data
export const OrganizationDataSchema = z.object({
  boardMembers: z.array(BoardMemberSchema),
  staff: z.array(BoardMemberSchema),
});

export type OrganizationData = z.infer<typeof OrganizationDataSchema>;
