import { Calendar } from 'lucide-react';
import type { KeyDate } from '@/lib/data/fees';

interface EventListProps {
  events: KeyDate[];
}

const categoryLabels: Record<KeyDate['category'], string> = {
  tryout: 'Tryout',
  registration: 'Registration',
  season: 'Season',
  tournament: 'Tournament',
};

export default function EventList({ events }: EventListProps) {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex gap-4 items-start border-l-4 border-bombers-yellow pl-4 py-2"
        >
          <Calendar className="w-5 h-5 text-bombers-navy flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-bombers-navy">{event.label}</h4>
              <span className="bg-bombers-navy/10 text-bombers-navy text-xs px-2 py-0.5 rounded-full">
                {categoryLabels[event.category]}
              </span>
            </div>
            <p className="text-gray-600">{event.date}</p>
            {event.description && (
              <p className="text-sm text-gray-500 mt-1">{event.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
