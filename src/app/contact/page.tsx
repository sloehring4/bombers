import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Heart, ExternalLink } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import SocialLinks from '@/components/contact/SocialLinks';
import SocialFeed from '@/components/contact/SocialFeed';
import { CONTACT_EMAIL, DONATION_URL } from '@/lib/data/contact';

export const metadata: Metadata = {
  title: "Contact Us | O'Fallon Bombers Baseball",
  description: "Get in touch with the O'Fallon Bombers. Send us a message, connect on social media, or support our youth baseball program.",
};

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 max-w-6xl py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-bombers-navy mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600">
          Have questions about registration, teams, or events? We&apos;re here to help!
        </p>
      </div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column - Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold text-bombers-navy mb-4 border-b-4 border-bombers-yellow pb-2 inline-block">
            Send Us a Message
          </h2>
          <ContactForm />
        </div>

        {/* Right Column - Additional Contact Options */}
        <aside className="space-y-8">
          {/* Email Us Directly */}
          <div>
            <h2 className="text-2xl font-semibold text-bombers-navy mb-4 border-b-4 border-bombers-yellow pb-2 inline-block">
              Email Us Directly
            </h2>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <Mail className="w-6 h-6 text-bombers-navy flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-lg font-semibold text-bombers-navy hover:text-bombers-yellow transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
                <p className="text-sm text-gray-600 mt-1">
                  We typically respond within 24-48 hours
                </p>
              </div>
            </div>
          </div>

          {/* Connect With Us */}
          <div>
            <h2 className="text-2xl font-semibold text-bombers-navy mb-4 border-b-4 border-bombers-yellow pb-2 inline-block">
              Connect With Us
            </h2>
            <SocialLinks />
          </div>

          {/* Support Our Team */}
          <div>
            <h2 className="text-2xl font-semibold text-bombers-navy mb-4 border-b-4 border-bombers-yellow pb-2 inline-block">
              Support Our Team
            </h2>
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start gap-3 mb-4">
                <Heart className="w-6 h-6 text-bombers-navy flex-shrink-0 mt-1" aria-hidden="true" />
                <p className="text-gray-700">
                  Your donations help us provide quality coaching, equipment, and opportunities for young athletes in our community.
                </p>
              </div>
              <Link
                href={DONATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bombers-yellow text-bombers-navy px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors inline-flex items-center gap-2 w-full justify-center"
              >
                Make a Donation
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Social Feed Section */}
      <SocialFeed />
    </main>
  );
}
