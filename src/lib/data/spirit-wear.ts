import spiritWearJson from './spirit-wear.json';
import { SpiritWearDataSchema } from '../schemas/spirit-wear';

// Re-export types from schema
export type { SpiritWearProduct } from '../schemas/spirit-wear';

// Parse and validate JSON data
const validated = SpiritWearDataSchema.parse(spiritWearJson);

// Re-export data
export const SPIRIT_WEAR_STORE_URL = validated.storeUrl;
export const spiritWearProducts = validated.products;
