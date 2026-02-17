export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/teams', label: 'Teams' },
  { href: '/about', label: 'About' },
  { href: '/board-staff', label: 'Board & Staff' },
  { href: '/fees', label: 'Fees & Events' },
  { href: '/spirit-wear', label: 'Spirit Wear' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/contact', label: 'Contact' },
] as const;

export type NavLink = typeof navLinks[number];
