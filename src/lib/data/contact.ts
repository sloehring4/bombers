import { Facebook, Instagram, type LucideIcon } from 'lucide-react';
import contactJson from './contact.json';
import { ContactDataSchema } from '../schemas/contact';

// SocialLink with LucideIcon (not in JSON)
export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
}

// Parse and validate JSON data
const validated = ContactDataSchema.parse(contactJson);

// Icon name mapping
const iconMap: Record<string, LucideIcon> = {
  Facebook,
  Instagram,
};

// Map socialLinks from JSON iconName to actual LucideIcon
export const socialLinks: SocialLink[] = validated.socialLinks.map((link) => ({
  name: link.name,
  url: link.url,
  icon: iconMap[link.iconName],
}));

// Re-export other data
export const CONTACT_EMAIL = validated.contactEmail;
export const DONATION_URL = validated.donationUrl;
