import Image from 'next/image';
import { BoardMember } from '@/lib/data/organization';

interface BoardMemberCardProps {
  member: BoardMember;
}

export default function BoardMemberCard({ member }: BoardMemberCardProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden hover:border-bombers-yellow hover:shadow-lg transition-all">
      {/* Photo section */}
      <div className="relative bg-gray-100 aspect-square">
        <Image
          src={member.photoUrl}
          alt={`${member.name} - ${member.title}`}
          width={400}
          height={400}
          className="object-cover w-full h-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Info section */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-bombers-navy mb-1">
          {member.name}
        </h3>
        <p className="text-sm text-gray-600">
          {member.title}
        </p>
        {member.bio && (
          <p className="text-sm text-gray-500 mt-2">{member.bio}</p>
        )}
      </div>
    </div>
  );
}
