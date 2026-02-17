import { Sponsor } from '@/lib/data/sponsors';
import SponsorCard from './SponsorCard';

interface SponsorGridProps {
  sponsors: readonly Sponsor[];
  limit?: number;
}

export default function SponsorGrid({ sponsors, limit }: SponsorGridProps) {
  const displayedSponsors = limit ? sponsors.slice(0, limit) : sponsors;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayedSponsors.map((sponsor) => (
        <SponsorCard key={sponsor.id} sponsor={sponsor} />
      ))}
    </div>
  );
}
