import type { Metadata } from 'next';
import Link from 'next/link';
import { boardMembers, staff } from '@/lib/data/organization';
import BoardMemberCard from '@/components/organization/BoardMemberCard';

export const metadata: Metadata = {
  title: 'Board & Staff | O\'Fallon Bombers',
  description: 'Meet the dedicated volunteer board members and staff who lead the O\'Fallon Bombers organization.',
};

export default function BoardStaffPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-bombers-navy mb-4">
          Board & Staff
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Meet the dedicated volunteers who lead our organization and work tirelessly
          to provide exceptional experiences for our players and families.
        </p>
      </div>

      {/* Board of Directors Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-bombers-navy mb-6 border-b-4 border-bombers-yellow pb-2 inline-block">
          Board of Directors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {boardMembers.map((member) => (
            <BoardMemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      {/* Staff Section - Conditionally rendered */}
      {staff.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-bombers-navy mb-6 border-b-4 border-bombers-yellow pb-2 inline-block">
            Staff
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((member) => (
              <BoardMemberCard key={member.name} member={member} />
            ))}
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold text-bombers-navy mb-4">
          Questions or Feedback?
        </h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          We welcome your questions, suggestions, and feedback. Our board is committed
          to transparency and open communication with all Bombers families.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-bombers-yellow text-bombers-navy px-8 py-3 rounded-lg font-semibold hover:bg-bombers-yellow/90 transition-colors"
        >
          Contact Us
        </Link>
      </section>
    </main>
  );
}
