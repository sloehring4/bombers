import Image from 'next/image';
import { Coach } from '@/lib/data/teams';

interface CoachCardProps {
  coach: Coach;
}

export default function CoachCard({ coach }: CoachCardProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden hover:border-bombers-yellow hover:shadow-lg transition-all">
      {/* Photo section */}
      <div className="relative bg-gray-100 aspect-square">
        <Image
          src={coach.photoUrl}
          alt={`${coach.name} - ${coach.role}`}
          width={400}
          height={400}
          className="object-cover w-full h-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Info section */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-bombers-navy mb-1">
          {coach.name}
        </h3>
        <p className="text-sm text-gray-600">
          {coach.role}
        </p>
        {coach.bio && (
          <p className="text-sm text-gray-500 mt-2">{coach.bio}</p>
        )}
      </div>
    </div>
  );
}
