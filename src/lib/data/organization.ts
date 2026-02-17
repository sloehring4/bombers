import organizationJson from './organization.json';
import { OrganizationDataSchema } from '../schemas/organization';

// Re-export types from schema
export type { BoardMember } from '../schemas/organization';

// Parse and validate JSON data
const validated = OrganizationDataSchema.parse(organizationJson);

// Re-export data
export const boardMembers = validated.boardMembers;
export const staff = validated.staff;
