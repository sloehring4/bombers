import { z } from 'zod';

// SocialLink schema (iconName as string for JSON storage)
export const SocialLinkSchema = z.object({
  name: z.string().min(1, 'Social link name is required'),
  url: z.string().url('Social link URL must be a valid URL'),
  iconName: z.string().min(1, 'Icon name is required'),
});

export type SocialLinkData = z.infer<typeof SocialLinkSchema>;

// Root schema for contact data
export const ContactDataSchema = z.object({
  socialLinks: z.array(SocialLinkSchema),
  contactEmail: z.string().email('Contact email must be a valid email address'),
  donationUrl: z.string().url('Donation URL must be a valid URL'),
});

export type ContactData = z.infer<typeof ContactDataSchema>;

// Contact form schema (for form validation)
export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(
      /^[\d\s()+-]*$/,
      'Phone number can only contain digits, spaces, parentheses, plus, and hyphen'
    )
    .optional()
    .or(z.literal('')),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
