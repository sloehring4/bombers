import { teams, currentSeason } from '@/lib/data/teams';
import TeamCard from '@/components/teams/TeamCard';
import Container from '@/components/layout/Container';
import type { Team } from '@/lib/data/teams';

export const metadata = {
  title: 'Teams | O\'Fallon Bombers',
  description: 'Browse all O\'Fallon Bombers baseball teams by age group. View rosters, coaches, and team information for Spring 2026.',
};

export default function TeamsPage() {
  // Group teams by age group
  const teamsByAge = teams.reduce((acc, team) => {
    if (!acc[team.ageGroup]) {
      acc[team.ageGroup] = [];
    }
    acc[team.ageGroup].push(team);
    return acc;
  }, {} as Record<string, Team[]>);

  // Sort age groups numerically (7U, 9U, 10U, etc.)
  const sortedAgeGroups = Object.keys(teamsByAge).sort((a, b) => {
    const numA = parseInt(a.replace('U', ''));
    const numB = parseInt(b.replace('U', ''));
    return numA - numB;
  });

  return (
    <Container>
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-bombers-navy mb-4">
          Our Teams
        </h1>
        <p className="text-xl md:text-2xl text-bombers-yellow font-semibold">
          {currentSeason} Rosters
        </p>
      </div>

      {/* Teams grouped by age division */}
      {sortedAgeGroups.map((ageGroup) => (
        <section key={ageGroup} className="mb-12">
          {/* Age Group Header */}
          <h2 className="text-2xl md:text-3xl font-bold text-bombers-navy mb-6 pb-2 border-b-4 border-bombers-yellow">
            {ageGroup} Division
          </h2>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamsByAge[ageGroup].map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </section>
      ))}
    </Container>
  );
}
