import sponsorsJson from './sponsors.json';
import { SponsorsDataSchema } from '../schemas/sponsors';

// Re-export types from schema
export type { Sponsor } from '../schemas/sponsors';

// Parse and validate JSON data
const validated = SponsorsDataSchema.parse(sponsorsJson);

// Re-export data
export const sponsors = validated.sponsors;
