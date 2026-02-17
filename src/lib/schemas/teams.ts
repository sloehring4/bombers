import { z } from 'zod';

// Player schema
export const PlayerSchema = z.object({
  name: z.string().min(1, 'Player name is required'),
  jerseyNumber: z
    .number()
    .int('Jersey number must be a whole number')
    .min(0, 'Jersey number must be between 0 and 99')
    .max(99, 'Jersey number must be between 0 and 99'),
});

export type Player = z.infer<typeof PlayerSchema>;

// Coach schema
export const CoachSchema = z.object({
  name: z.string().min(1, 'Coach name is required'),
  role: z.enum(['Head Coach', 'Assistant Coach'], {
    message: 'Coach role must be "Head Coach" or "Assistant Coach"',
  }),
  photoUrl: z.string().min(1, 'Coach photo URL is required'),
  bio: z.string().optional(),
});

export type Coach = z.infer<typeof CoachSchema>;

// Team schema
export const TeamSchema = z
  .object({
    id: z
      .string()
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Team ID must be in kebab-case format (e.g., "10u-cook")'),
    name: z.string().min(1, 'Team name is required'),
    ageGroup: z
      .string()
      .regex(/^(7|8|9|10|11|12|13|14|15)U$/, 'Age group must be in format "7U", "8U", ..., "15U"'),
    headCoachName: z.string().min(1, 'Head coach name is required'),
    season: z.string().min(1, 'Season is required'),
    players: z.array(PlayerSchema),
    coaches: z
      .array(CoachSchema)
      .min(1, 'Each team must have at least one coach'),
    teamPhotoUrl: z.string().optional(),
  })
  .refine(
    (team) => {
      // Check for duplicate jersey numbers within a team
      const jerseyNumbers = team.players.map((p) => p.jerseyNumber);
      const uniqueJerseyNumbers = new Set(jerseyNumbers);
      return jerseyNumbers.length === uniqueJerseyNumbers.size;
    },
    {
      message: 'Each player on a team must have a unique jersey number',
      path: ['players'],
    }
  );

export type Team = z.infer<typeof TeamSchema>;

// Root schema for teams data
export const TeamsDataSchema = z
  .object({
    currentSeason: z
      .string()
      .regex(/^.+\s\d{4}$/, 'Current season must be in format "Season YYYY" (e.g., "Spring 2026")'),
    teams: z.array(TeamSchema),
  })
  .refine(
    (data) => {
      // Check for duplicate team IDs
      const teamIds = data.teams.map((t) => t.id);
      const uniqueTeamIds = new Set(teamIds);
      return teamIds.length === uniqueTeamIds.size;
    },
    {
      message: 'Each team must have a unique ID',
      path: ['teams'],
    }
  );

export type TeamsData = z.infer<typeof TeamsDataSchema>;
