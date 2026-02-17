import teamsJson from './teams.json';
import { TeamsDataSchema } from '../schemas/teams';

// Re-export types from schema
export type { Player, Coach, Team } from '../schemas/teams';

// Parse and validate JSON data
const validated = TeamsDataSchema.parse(teamsJson);

// Re-export data
export const currentSeason = validated.currentSeason;
export const teams = validated.teams;
