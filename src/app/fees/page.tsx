import type { Metadata } from 'next';
import Link from 'next/link';
import { ageFees, keyDates, faqItems } from '@/lib/data/fees';
import FeeCard from '@/components/fees/FeeCard';
import EventList from '@/components/fees/EventList';
import RegistrationCTA from '@/components/fees/RegistrationCTA';
import FAQSection from '@/components/fees/FAQSection';

export const metadata: Metadata = {
  title: "Fees & Events | O'Fallon Bombers Baseball",
  description: "Season fees by age group, key dates, registration information, and FAQ for O'Fallon Bombers youth baseball.",
};

export default function FeesPage() {
  return (
    <main className="container mx-auto px-4 max-w-5xl py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-bombers-navy mb-4">
          Fees &amp; Events
        </h1>
        <p className="text-lg text-gray-600">
          Everything you need to know about season costs, key dates, and how to register your player.
        </p>
      </div>

      {/* Season Fees Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-bombers-navy mb-6 border-b-4 border-bombers-yellow pb-2 inline-block">
          Season Fees
        </h2>
        <p className="text-gray-700 mb-4">
          Fees vary by age group and cover the full season including tournaments, uniforms, and facilities.
        </p>
        <p className="text-gray-700 mb-8">
          Payment plans are available.{' '}
          <Link
            href="/contact"
            className="text-bombers-navy font-semibold hover:text-bombers-yellow transition-colors"
          >
            Contact us
          </Link>{' '}
          if you need financial assistance — we never want cost to prevent a player from participating.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ageFees.map((fee) => (
            <FeeCard key={fee.ageGroup} fee={fee} />
          ))}
        </div>
      </section>

      {/* Key Dates Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-bombers-navy mb-6 border-b-4 border-bombers-yellow pb-2 inline-block">
          Key Dates
        </h2>
        <p className="text-gray-700 mb-6">
          Mark your calendar for these important dates for the upcoming season.
        </p>
        <EventList events={keyDates} />
      </section>

      {/* Registration Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-bombers-navy mb-6 border-b-4 border-bombers-yellow pb-2 inline-block">
          Registration
        </h2>
        <RegistrationCTA />
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-2xl font-semibold text-bombers-navy mb-6 border-b-4 border-bombers-yellow pb-2 inline-block">
          Frequently Asked Questions
        </h2>
        <FAQSection faqItems={faqItems} />
      </section>
    </main>
  );
}
