import { Users, DollarSign, Shirt, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface QuickLink {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export interface KeyDate {
  label: string;
  date: string;
}

export const quickLinks: QuickLink[] = [
  {
    icon: Users,
    title: 'Teams',
    description: 'Explore our age divisions, team rosters, and coaching staff',
    href: '/teams',
  },
  {
    icon: DollarSign,
    title: 'Fees & Registration',
    description: 'Season costs, payment plans, and registration information',
    href: '/fees',
  },
  {
    icon: Shirt,
    title: 'Spirit Wear',
    description: 'Get official Bombers gear, apparel, and accessories',
    href: '/spirit-wear',
  },
  {
    icon: Mail,
    title: 'Contact Us',
    description: 'Get in touch with our organization for questions or support',
    href: '/contact',
  },
];

export const keyDates = [
  {
    label: 'Next Tryouts',
    date: 'March 15, 2026',
  },
  {
    label: 'Registration Deadline',
    date: 'March 30, 2026',
  },
  {
    label: 'Season Starts',
    date: 'April 12, 2026',
  },
];

export const heroContent = {
  headline: "O'Fallon Bombers",
  tagline: 'Building Champions On and Off the Field',
  primaryCta: {
    text: 'Register Your Player',
    href: '/fees',
  },
  secondaryCta: {
    text: 'View Our Teams',
    href: '/teams',
  },
} as const;
