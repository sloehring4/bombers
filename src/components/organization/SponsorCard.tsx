import Image from 'next/image';
import { Sponsor } from '@/lib/data/sponsors';

interface SponsorCardProps {
  sponsor: Sponsor;
}

export default function SponsorCard({ sponsor }: SponsorCardProps) {
  const CardContent = (
    <>
      {/* Logo section */}
      <div className="h-24 flex items-center justify-center bg-gray-50">
        <div className="relative w-full h-full p-4">
          <Image
            src={sponsor.logoUrl}
            alt={`${sponsor.name} logo`}
            width={200}
            height={80}
            className="object-contain w-full h-full"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      </div>

      {/* Info section */}
      <div className="p-6 text-center">
        <h3 className="text-lg font-bold text-bombers-navy mb-2">
          {sponsor.name}
        </h3>
        <p className="text-sm text-gray-600">
          {sponsor.description}
        </p>
      </div>
    </>
  );

  if (sponsor.websiteUrl) {
    return (
      <a
        href={sponsor.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white rounded-lg border-2 border-gray-200 hover:border-bombers-yellow hover:shadow-lg transition-all block"
      >
        {CardContent}
      </a>
    );
  }

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 hover:border-bombers-yellow hover:shadow-lg transition-all">
      {CardContent}
    </div>
  );
}
