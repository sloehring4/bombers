'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface NavLinksProps {
  links: ReadonlyArray<{ readonly href: string; readonly label: string }>;
}

export default function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex md:items-center md:gap-6">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              'text-sm font-medium transition-colors',
              isActive
                ? 'text-bombers-yellow font-semibold border-b-2 border-bombers-yellow pb-1'
                : 'text-navy-700 hover:text-bombers-yellow'
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
