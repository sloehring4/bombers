import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import { socialLinks } from '@/lib/data/contact';

export default function SocialFeed() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-bombers-navy mb-6 border-b-4 border-bombers-yellow pb-2 inline-block">
        Follow Our Journey
      </h2>

      {/* Production-ready placeholder for social feed embed */}
      {/*
        TODO: Replace this placeholder with embedded social feed widget when configured.
        Recommended services:
        - EmbedSocial: https://embedsocial.com
        - SociableKIT: https://www.sociablekit.com

        Insert embed widget code below this comment block.
      */}

      <div className="bg-gray-50 rounded-lg border-2 border-gray-200 p-8 text-center">
        {/* Icon Row */}
        <div className="flex justify-center items-center gap-6 mb-6">
          <Facebook className="w-12 h-12 text-bombers-navy" aria-hidden="true" />
          <Instagram className="w-12 h-12 text-bombers-navy" aria-hidden="true" />
        </div>

        {/* Description */}
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Follow us on social media for the latest updates, game highlights, and team news!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={socialLinks.find(link => link.name === 'Facebook')?.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-bombers-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-800 transition-colors inline-flex items-center gap-2"
          >
            <Facebook className="w-5 h-5" aria-hidden="true" />
            Follow on Facebook
          </Link>

          <Link
            href={socialLinks.find(link => link.name === 'Instagram')?.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-bombers-yellow text-bombers-navy px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors inline-flex items-center gap-2"
          >
            <Instagram className="w-5 h-5" aria-hidden="true" />
            Follow on Instagram
          </Link>
        </div>
      </div>
    </section>
  );
}
