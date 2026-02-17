import Hero from '@/components/home/Hero';
import AnnouncementBanner from '@/components/home/AnnouncementBanner';
import QuickLinks from '@/components/home/QuickLinks';
import SponsorsSection from '@/components/home/SponsorsSection';
import { keyDates } from '@/lib/data/home';

export default function Home() {
  return (
    <main>
      <Hero />
      <AnnouncementBanner
        dates={keyDates.map(d => ({ label: d.label, date: d.date }))}
        bannerId="spring-2026"
      />
      <QuickLinks />
      <SponsorsSection />
    </main>
  );
}
