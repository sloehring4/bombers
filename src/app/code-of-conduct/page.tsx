import type { Metadata } from 'next';
import Accordion from '@/components/organization/Accordion';
import { conductSections } from '@/lib/data/conduct';

export const metadata: Metadata = {
  title: 'Code of Conduct | O\'Fallon Bombers',
  description: 'Our code of conduct for players, parents, coaches, and spectators ensures a positive, respectful environment for youth baseball.',
};

export default function CodeOfConductPage() {
  // Transform conduct sections into accordion items
  const accordionItems = conductSections.map((section) => ({
    id: section.id,
    title: section.title,
    content: (
      <ul className="space-y-3">
        {section.rules.map((rule, index) => (
          <li key={index} className="flex gap-3">
            <span className="text-bombers-yellow mt-1 flex-shrink-0">●</span>
            <span className="text-gray-700">{rule}</span>
          </li>
        ))}
      </ul>
    ),
  }));

  return (
    <main className="container mx-auto px-4 max-w-4xl py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-bombers-navy mb-4">
          Code of Conduct
        </h1>
        <p className="text-lg text-gray-600">
          Guidelines for creating a positive, respectful environment for all participants.
        </p>
      </div>

      {/* Values Intro */}
      <div className="border-l-4 border-bombers-yellow bg-bombers-yellow/10 p-6 rounded mb-8">
        <p className="text-gray-700 leading-relaxed">
          The O&apos;Fallon Bombers are committed to providing a safe, positive, and respectful environment
          for all players, families, and volunteers. Our code of conduct reflects our core values and ensures
          that everyone—players, parents, coaches, and spectators—contributes to a culture of sportsmanship
          and mutual respect.
        </p>
      </div>

      {/* Accordion Sections */}
      <div className="mb-10">
        <Accordion items={accordionItems} />
      </div>

      {/* Enforcement Notice */}
      <section className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-bombers-navy mb-4">Enforcement</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The O&apos;Fallon Bombers Board of Directors is responsible for enforcing this code of conduct.
          Violations will be reviewed on a case-by-case basis and may result in warnings, suspensions,
          or removal from the organization, depending on the severity and frequency of the infraction.
        </p>
        <p className="text-gray-700 leading-relaxed">
          We encourage all participants to report concerns about conduct or safety to organization leadership.
          Our goal is to address issues promptly and fairly while maintaining a positive environment for everyone.
        </p>
      </section>
    </main>
  );
}
