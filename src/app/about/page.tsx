import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | O\'Fallon Bombers',
  description: 'Learn about the O\'Fallon Bombers youth baseball organization - our mission, history, structure, and values that guide our commitment to developing well-rounded young athletes.',
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 max-w-4xl py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-bombers-navy mb-4">
          About the O&apos;Fallon Bombers
        </h1>
        <p className="text-lg text-gray-600">
          Building champions on and off the field since our founding in O&apos;Fallon, Illinois.
        </p>
      </div>

      {/* Our Mission */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-bombers-navy mb-4 border-b-4 border-bombers-yellow pb-2">
          Our Mission
        </h2>
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            The O&apos;Fallon Bombers are dedicated to developing well-rounded young athletes through competitive baseball.
            We emphasize skill development, teamwork, and sportsmanship while building character that extends beyond the diamond.
            Our programs provide a positive environment where players can grow athletically, socially, and personally,
            preparing them for success in baseball and in life.
          </p>
        </div>
      </section>

      {/* Our History */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-bombers-navy mb-4 border-b-4 border-bombers-yellow pb-2">
          Our History
        </h2>
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Founded in O&apos;Fallon, Illinois, the Bombers organization has grown from a small group of dedicated families
            into a premier youth baseball organization serving the community. Over the years, we&apos;ve expanded our reach
            to field competitive teams across multiple age divisions, from 7U through 15U, providing opportunities for
            hundreds of young players to develop their skills and passion for the game.
          </p>
          <p>
            Our commitment to excellence, both on and off the field, has made the Bombers a trusted name in youth baseball.
            We continue to evolve and grow, always keeping our focus on what matters most: the development and well-being
            of our players.
          </p>
        </div>
      </section>

      {/* Organization Structure */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-bombers-navy mb-4 border-b-4 border-bombers-yellow pb-2">
          Organization Structure
        </h2>
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            The O&apos;Fallon Bombers are governed by a volunteer Board of Directors who oversee all operations,
            from team management to fundraising and community outreach. Our board members bring diverse backgrounds
            and expertise, united by a shared commitment to youth development.
          </p>
          <p>
            All of our coaching staff undergo thorough background checks and are dedicated to creating a safe,
            supportive environment for every player. Our coaches are trained in both baseball fundamentals and
            positive youth development practices.
          </p>
        </div>

        {/* Callout Box */}
        <div className="mt-6 border-l-4 border-bombers-yellow bg-bombers-yellow/10 p-6 rounded">
          <p className="text-gray-700 mb-2">
            <strong>Meet Our Leadership:</strong> Learn more about our dedicated Board of Directors and staff.
          </p>
          <Link
            href="/board-staff"
            className="inline-block text-bombers-navy font-semibold hover:text-bombers-yellow transition-colors"
          >
            View Board & Staff →
          </Link>
        </div>
      </section>

      {/* Our Values */}
      <section>
        <h2 className="text-2xl font-semibold text-bombers-navy mb-6 border-b-4 border-bombers-yellow pb-2">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Excellence */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bombers-yellow transition-colors">
            <h3 className="text-xl font-bold text-bombers-navy mb-3">Excellence</h3>
            <p className="text-gray-700">
              We strive for excellence in everything we do, from player development to organizational operations.
              Our commitment to high standards ensures every player receives quality coaching and opportunities to succeed.
            </p>
          </div>

          {/* Teamwork */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bombers-yellow transition-colors">
            <h3 className="text-xl font-bold text-bombers-navy mb-3">Teamwork</h3>
            <p className="text-gray-700">
              Baseball is a team sport, and we emphasize collaboration, communication, and mutual support.
              Players learn to work together toward common goals, building bonds that last beyond the season.
            </p>
          </div>

          {/* Character */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bombers-yellow transition-colors">
            <h3 className="text-xl font-bold text-bombers-navy mb-3">Character</h3>
            <p className="text-gray-700">
              We believe sports build character. Our programs teach respect, integrity, responsibility, and perseverance—
              values that shape young athletes into strong individuals both on and off the field.
            </p>
          </div>

          {/* Community */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bombers-yellow transition-colors">
            <h3 className="text-xl font-bold text-bombers-navy mb-3">Community</h3>
            <p className="text-gray-700">
              The Bombers are more than a baseball organization—we&apos;re a community. We foster connections among
              families, support local businesses, and give back to O&apos;Fallon through service and engagement.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
