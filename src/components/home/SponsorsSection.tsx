import Link from 'next/link';
import SponsorGrid from '@/components/organization/SponsorGrid';
import { sponsors } from '@/lib/data/sponsors';

export default function SponsorsSection() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-bombers-navy mb-4">
            Our Sponsors
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Thank you to our generous sponsors who make our programs possible.
          </p>
        </div>

        {/* Limited Sponsor Grid */}
        <SponsorGrid sponsors={sponsors} limit={8} />

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            href="/sponsors"
            className="inline-flex items-center gap-2 text-bombers-navy font-semibold hover:text-bombers-yellow transition-colors"
          >
            View All Sponsors
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
