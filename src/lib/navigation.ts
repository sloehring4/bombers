export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/teams', label: 'Teams' },
  { href: '/about', label: 'About' },
  { href: '/fees', label: 'Fees & Events' },
  { href: '/spirit-wear', label: 'Spirit Wear' },
  { href: '/contact', label: 'Contact' },
] as const;

export type NavLink = typeof navLinks[number];
