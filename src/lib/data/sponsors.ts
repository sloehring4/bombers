export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  websiteUrl?: string;
}

export const sponsors: readonly Sponsor[] = [
  {
    id: 'hometown-sports',
    name: 'Hometown Sports & Fitness',
    logoUrl: '/images/sponsors/placeholder.jpg',
    description: 'Your local source for quality sporting goods, team uniforms, and athletic equipment. Proudly serving the community for over 20 years.',
    websiteUrl: 'https://example.com',
  },
  {
    id: 'riverside-pizza',
    name: 'Riverside Pizza & Grill',
    logoUrl: '/images/sponsors/placeholder.jpg',
    description: 'Family-owned restaurant serving delicious pizza, pasta, and American favorites. Post-game team dinners are our specialty!',
    websiteUrl: 'https://example.com',
  },
  {
    id: 'valley-auto',
    name: 'Valley Auto Group',
    logoUrl: '/images/sponsors/placeholder.jpg',
    description: 'Trusted automotive sales and service for families in the region. Supporting youth sports since 1995.',
    websiteUrl: 'https://example.com',
  },
  {
    id: 'smiths-hardware',
    name: 'Smith\'s Hardware & Garden',
    logoUrl: '/images/sponsors/placeholder.jpg',
    description: 'Your neighborhood hardware store with everything you need for home and garden projects. Proud supporter of local youth athletics.',
  },
  {
    id: 'central-bank',
    name: 'Central Community Bank',
    logoUrl: '/images/sponsors/placeholder.jpg',
    description: 'Banking with a personal touch. Committed to investing in our community\'s future through youth sports and education.',
    websiteUrl: 'https://example.com',
  },
  {
    id: 'summit-dental',
    name: 'Summit Family Dental',
    logoUrl: '/images/sponsors/placeholder.jpg',
    description: 'Complete dental care for the whole family. We believe healthy smiles start with supporting active, healthy kids.',
    websiteUrl: 'https://example.com',
  },
];
