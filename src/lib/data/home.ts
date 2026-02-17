import { Users, DollarSign, Shirt, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import homeJson from './home.json';
import { HomeDataSchema } from '../schemas/home';

// QuickLink with LucideIcon (not in JSON)
export interface QuickLink {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

// Re-export KeyDate type from schema
export type { KeyDate } from '../schemas/home';

// Parse and validate JSON data
const validated = HomeDataSchema.parse(homeJson);

// Icon name mapping
const iconMap: Record<string, LucideIcon> = {
  Users,
  DollarSign,
  Shirt,
  Mail,
};

// Map quickLinks from JSON iconName to actual LucideIcon
export const quickLinks: QuickLink[] = validated.quickLinks.map((link) => ({
  icon: iconMap[link.iconName],
  title: link.title,
  description: link.description,
  href: link.href,
}));

// Re-export other data
export const keyDates = validated.keyDates;
export const heroContent = validated.heroContent;
