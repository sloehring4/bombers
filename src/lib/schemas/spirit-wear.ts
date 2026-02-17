import { z } from 'zod';

// SpiritWearProduct schema
export const SpiritWearProductSchema = z.object({
  id: z.string().min(1, 'Product ID is required'),
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Product description is required'),
  price: z.number().positive('Product price must be a positive number'),
  imageUrl: z.string().min(1, 'Product image URL is required'),
  category: z.enum(['apparel', 'accessories', 'headwear'], {
    message: 'Product category must be one of: apparel, accessories, headwear',
  }),
  sizes: z.array(z.string()).optional(),
  externalUrl: z.string().optional(),
});

export type SpiritWearProduct = z.infer<typeof SpiritWearProductSchema>;

// Root schema for spirit wear data
export const SpiritWearDataSchema = z.object({
  storeUrl: z.string().url('Store URL must be a valid URL'),
  products: z.array(SpiritWearProductSchema),
});

export type SpiritWearData = z.infer<typeof SpiritWearDataSchema>;
