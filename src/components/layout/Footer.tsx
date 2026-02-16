import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white border-t border-navy-700">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* 3-column grid layout */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Column 1 - Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-navy-300">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/teams"
                className="text-sm text-navy-200 hover:text-bombers-yellow transition-colors"
              >
                Teams
              </Link>
              <Link
                href="/about"
                className="text-sm text-navy-200 hover:text-bombers-yellow transition-colors"
              >
                About
              </Link>
              <Link
                href="/fees-events"
                className="text-sm text-navy-200 hover:text-bombers-yellow transition-colors"
              >
                Fees &amp; Events
              </Link>
              <Link
                href="/spirit-wear"
                className="text-sm text-navy-200 hover:text-bombers-yellow transition-colors"
              >
                Spirit Wear
              </Link>
              <Link
                href="/contact"
                className="text-sm text-navy-200 hover:text-bombers-yellow transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Column 2 - Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-navy-300">
              Contact
            </h3>
            <div className="flex flex-col gap-2 text-sm text-navy-200">
              <p>ofallonbombers@gmail.com</p>
              <p>O&apos;Fallon, Illinois</p>
            </div>
          </div>

          {/* Column 3 - Follow Us */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-navy-300">
              Follow Us
            </h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://facebook.com/ofallonbombers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-navy-200 hover:text-bombers-yellow transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com/ofallonbombers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-navy-200 hover:text-bombers-yellow transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar - Attribution */}
        <div className="mt-8 border-t border-navy-700 pt-8 text-center text-sm text-navy-400">
          <p>
            Powered by{' '}
            <a
              href="https://jerseywatch.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-bombers-yellow transition-colors"
            >
              JerseyWatch
            </a>
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} O&apos;Fallon Bombers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
