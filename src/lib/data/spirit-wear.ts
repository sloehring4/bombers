export interface SpiritWearProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'apparel' | 'accessories' | 'headwear';
  sizes?: readonly string[];
  externalUrl?: string;
}

export const SPIRIT_WEAR_STORE_URL = 'https://example-spirit-wear-store.com';

export const spiritWearProducts: readonly SpiritWearProduct[] = [
  // Apparel
  {
    id: 'bombers-tshirt',
    name: 'Bombers T-Shirt',
    description: 'Comfortable cotton t-shirt featuring the Bombers logo. Perfect for practices, games, or everyday wear.',
    price: 20,
    imageUrl: '/images/spirit-wear/placeholder.jpg',
    category: 'apparel',
    sizes: ['Youth S', 'Youth M', 'Youth L', 'Adult S', 'Adult M', 'Adult L', 'Adult XL'] as const,
  },
  {
    id: 'bombers-hoodie',
    name: 'Bombers Hoodie',
    description: 'Warm fleece hoodie with embroidered Bombers logo. Stay cozy during cool weather games and practices.',
    price: 40,
    imageUrl: '/images/spirit-wear/placeholder.jpg',
    category: 'apparel',
    sizes: ['Youth S', 'Youth M', 'Youth L', 'Adult S', 'Adult M', 'Adult L', 'Adult XL'] as const,
  },
  {
    id: 'bombers-jersey',
    name: 'Bombers Jersey',
    description: 'Official game-day style jersey with team colors and logo. Show your Bombers pride at the ballpark.',
    price: 35,
    imageUrl: '/images/spirit-wear/placeholder.jpg',
    category: 'apparel',
    sizes: ['Youth S', 'Youth M', 'Youth L', 'Adult S', 'Adult M', 'Adult L', 'Adult XL'] as const,
  },
  {
    id: 'bombers-shorts',
    name: 'Bombers Shorts',
    description: 'Athletic shorts with Bombers branding. Lightweight and comfortable for active wear.',
    price: 25,
    imageUrl: '/images/spirit-wear/placeholder.jpg',
    category: 'apparel',
    sizes: ['Youth S', 'Youth M', 'Youth L', 'Adult S', 'Adult M', 'Adult L'] as const,
  },
  // Headwear
  {
    id: 'bombers-baseball-cap',
    name: 'Bombers Baseball Cap',
    description: 'Classic baseball cap with embroidered Bombers logo. Adjustable strap for the perfect fit.',
    price: 18,
    imageUrl: '/images/spirit-wear/placeholder.jpg',
    category: 'headwear',
  },
  {
    id: 'bombers-visor',
    name: 'Bombers Visor',
    description: 'Lightweight visor perfect for sunny game days. Features the Bombers logo on the front.',
    price: 15,
    imageUrl: '/images/spirit-wear/placeholder.jpg',
    category: 'headwear',
  },
  // Accessories
  {
    id: 'bombers-water-bottle',
    name: 'Bombers Water Bottle',
    description: 'Durable 32oz water bottle with Bombers branding. Keep hydrated during games and practices.',
    price: 12,
    imageUrl: '/images/spirit-wear/placeholder.jpg',
    category: 'accessories',
  },
  {
    id: 'bombers-equipment-bag',
    name: 'Bombers Equipment Bag',
    description: 'Spacious duffel bag with multiple compartments for all your baseball gear. Features team logo.',
    price: 30,
    imageUrl: '/images/spirit-wear/placeholder.jpg',
    category: 'accessories',
  },
] as const;
