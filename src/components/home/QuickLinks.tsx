import { quickLinks } from '@/lib/data/home';
import QuickLinkCard from './QuickLinkCard';

export default function QuickLinks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => (
            <QuickLinkCard
              key={link.title}
              icon={link.icon}
              title={link.title}
              description={link.description}
              href={link.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
