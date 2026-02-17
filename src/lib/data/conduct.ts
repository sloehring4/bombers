import conductJson from './conduct.json';
import { ConductDataSchema } from '../schemas/conduct';

// Re-export types from schema
export type { ConductSection } from '../schemas/conduct';

// Parse and validate JSON data
const validated = ConductDataSchema.parse(conductJson);

// Re-export data
export const conductSections = validated.conductSections;
