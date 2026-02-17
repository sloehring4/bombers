import type { Metadata } from 'next';
import Link from 'next/link';
import SponsorGrid from '@/components/organization/SponsorGrid';
import { sponsors } from '@/lib/data/sponsors';

export const metadata: Metadata = {
  title: 'Our Sponsors | O\'Fallon Bombers',
  description: 'Meet the local businesses and organizations that support the O\'Fallon Bombers youth baseball program.',
};

export default function SponsorsPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-bombers-navy mb-4">
          Our Sponsors
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We are grateful to the local businesses and organizations that make our programs possible.
          Their support helps us provide exceptional experiences for our players and families.
        </p>
      </div>

      {/* Full Sponsor Grid */}
      <div className="mb-16">
        <SponsorGrid sponsors={sponsors} />
      </div>

      {/* Become a Sponsor CTA */}
      <section className="bg-bombers-navy text-white rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Become a Sponsor
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Join our community of sponsors and help support youth baseball in O&apos;Fallon.
          Your partnership makes a difference in the lives of young athletes and their families.
          Contact us to learn about sponsorship opportunities and benefits.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-bombers-yellow text-bombers-navy px-8 py-3 rounded-lg font-semibold hover:bg-bombers-yellow/90 transition-colors"
        >
          Contact Us About Sponsorship
        </Link>
      </section>
    </main>
  );
}
