import Link from 'next/link';
import { Users } from 'lucide-react';
import type { Team } from '@/lib/data/teams';

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <Link
      href={`/teams/${team.id}`}
      className="group p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-bombers-yellow hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bombers-yellow"
    >
      <div className="flex flex-col space-y-4">
        {/* Team Name */}
        <h3 className="text-xl font-semibold text-bombers-navy">
          {team.name}
        </h3>

        {/* Head Coach */}
        <p className="text-gray-600 text-sm">
          Coach: <span className="font-medium text-bombers-navy">{team.headCoachName}</span>
        </p>

        {/* Stats */}
        <div className="flex items-center gap-6 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={16} className="text-bombers-yellow" />
            <span>{team.players.length} {team.players.length === 1 ? 'player' : 'players'}</span>
          </div>
          <div className="text-sm text-gray-600">
            {team.coaches.length} {team.coaches.length === 1 ? 'coach' : 'coaches'}
          </div>
        </div>
      </div>
    </Link>
  );
}
