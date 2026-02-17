import feesJson from './fees.json';
import { FeesDataSchema } from '../schemas/fees';

// Re-export types from schema
export type { AgeFee, FeesKeyDate as KeyDate, FAQItem } from '../schemas/fees';

// Parse and validate JSON data
const validated = FeesDataSchema.parse(feesJson);

// Re-export data
export const ageFees = validated.ageFees;
export const keyDates = validated.keyDates;
export const faqItems = validated.faqItems;
