import Image from 'next/image';
import Link from 'next/link';
import { heroContent } from '@/lib/data/home';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden bg-bombers-navy">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/images/bombers-logo.png"
          alt=""
          width={600}
          height={600}
          className="opacity-15 w-[500px] md:w-[600px] lg:w-[700px] h-auto select-none"
          aria-hidden="true"
        />
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl space-y-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-heading">
          O&apos;Fallon Bombers
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-medium">
          {heroContent.tagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href={heroContent.primaryCta.href}>
            <Button variant="primary">{heroContent.primaryCta.text}</Button>
          </Link>
          <Link href={heroContent.secondaryCta.href}>
            <Button variant="secondary">{heroContent.secondaryCta.text}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
