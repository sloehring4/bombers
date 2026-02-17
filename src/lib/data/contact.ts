import { Facebook, Instagram, type LucideIcon } from 'lucide-react';

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

export const CONTACT_EMAIL = 'ofallonbombers@gmail.com';
export const DONATION_URL = 'https://paypal.me/ofallonbombers';
