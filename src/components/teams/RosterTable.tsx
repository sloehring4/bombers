import { Player } from '@/lib/data/teams';

interface RosterTableProps {
  players: Player[];
}

export default function RosterTable({ players }: RosterTableProps) {
  // Sort players by jersey number
  const sortedPlayers = [...players].sort((a, b) => a.jerseyNumber - b.jerseyNumber);

  // Empty state
  if (sortedPlayers.length === 0) {
    return (
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
        <p className="text-gray-600">
          Roster coming soon — check back after tryouts!
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop view - Table */}
      <div className="hidden md:block rounded-lg border-2 border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-bombers-navy text-white">
            <tr>
              <th className="px-6 py-4 text-left">Jersey #</th>
              <th className="px-6 py-4 text-left">Player Name</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPlayers.map((player) => (
              <tr key={`${player.jerseyNumber}-${player.name}`} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-10 h-10 bg-bombers-yellow rounded-full flex items-center justify-center font-bold text-bombers-navy">
                    {player.jerseyNumber}
                  </div>
                </td>
                <td className="px-6 py-4 text-bombers-navy font-medium">
                  {player.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view - Cards */}
      <div className="md:hidden space-y-3">
        {sortedPlayers.map((player) => (
          <div
            key={`${player.jerseyNumber}-${player.name}`}
            className="bg-white p-4 rounded-lg border-2 border-gray-200 flex items-center gap-4"
          >
            <div className="w-14 h-14 bg-bombers-yellow rounded-full flex items-center justify-center font-bold text-bombers-navy text-lg flex-shrink-0">
              {player.jerseyNumber}
            </div>
            <div className="font-semibold text-bombers-navy">
              {player.name}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
