'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface MobileMenuProps {
  links: ReadonlyArray<{ readonly href: string; readonly label: string }>;
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        className="p-2 text-navy-700 hover:text-bombers-yellow transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <>
              {/* X icon when open */}
              <path d="M6 18L18 6M6 6l12 12" />
            </>
          ) : (
            <>
              {/* Hamburger icon when closed */}
              <path d="M4 6h16M4 12h16M4 18h16" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full bg-white shadow-lg border-t border-navy-100 z-20">
          <div className="flex flex-col">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'px-6 py-3 text-sm font-medium border-b border-navy-50',
                    isActive
                      ? 'bg-yellow-50 text-bombers-yellow font-semibold'
                      : 'text-navy-700 hover:bg-navy-50'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
