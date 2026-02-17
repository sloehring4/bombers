import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { teams } from '@/lib/data/teams';
import RosterTable from '@/components/teams/RosterTable';
import CoachCard from '@/components/teams/CoachCard';
import type { Metadata } from 'next';

// Pre-render all team pages at build time
export async function generateStaticParams() {
  return teams.map((team) => ({
    teamId: team.id,
  }));
}

// Generate metadata for each team page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ teamId: string }>;
}): Promise<Metadata> {
  const { teamId } = await params;
  const team = teams.find((t) => t.id === teamId);

  if (!team) {
    return {
      title: 'Team Not Found | O\'Fallon Bombers',
      description: 'The team you are looking for could not be found.',
    };
  }

  return {
    title: `${team.name} Roster | O'Fallon Bombers`,
    description: `View the ${team.name} roster for ${team.season}. Player names, jersey numbers, and coaching staff.`,
  };
}

export default async function TeamRosterPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;
  const team = teams.find((t) => t.id === teamId);

  if (!team) {
    notFound();
  }

  return (
    <main className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Back navigation */}
        <Link
          href="/teams"
          className="inline-flex items-center gap-2 text-bombers-navy hover:text-bombers-yellow transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>All Teams</span>
        </Link>

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-bombers-navy mb-2">
            {team.name}
          </h1>
          <p className="text-lg text-gray-600 mb-3">
            {team.season} Roster
          </p>
          <span className="inline-block bg-bombers-yellow text-bombers-navy px-3 py-1 rounded-full text-sm font-semibold">
            {team.ageGroup}
          </span>
        </div>

        {/* Coaching Staff section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-bombers-navy mb-6">
            Coaching Staff
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.coaches.map((coach) => (
              <CoachCard key={coach.name} coach={coach} />
            ))}
          </div>
        </section>

        {/* Players section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-bombers-navy mb-6">
            Players ({team.players.length})
          </h2>
          <RosterTable players={team.players} />
        </section>

        {/* Team Photo section (conditional) */}
        {team.teamPhotoUrl && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-bombers-navy mb-6">
              Team Photo
            </h2>
            <div className="max-w-2xl">
              <div className="relative h-64 rounded-lg overflow-hidden border-2 border-gray-200">
                <Image
                  src={team.teamPhotoUrl}
                  alt={`${team.name} team photo`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
