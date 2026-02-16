import Link from 'next/link';
import Image from 'next/image';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';
import { navLinks } from '@/lib/navigation';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-navy-100 relative">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo-placeholder.svg"
            alt="O'Fallon Bombers"
            width={150}
            height={50}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop navigation and mobile menu */}
        <div className="flex items-center gap-4">
          <NavLinks links={navLinks} />
          <MobileMenu links={navLinks} />
        </div>
      </div>
    </header>
  );
}
