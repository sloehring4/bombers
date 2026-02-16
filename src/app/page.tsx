import Image from 'next/image';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col items-center gap-8 text-center">
        <Image
          src="/logo-placeholder.svg"
          alt="O'Fallon Bombers Logo"
          width={120}
          height={120}
          priority
        />

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-bombers-navy">
            O&apos;Fallon Bombers
          </h1>
          <p className="text-lg md:text-xl text-navy-700 max-w-2xl">
            Select youth baseball club serving ages 7U-15U. Building champions on and off the field.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button variant="primary">
            Register Your Player
          </Button>
          <Button variant="secondary">
            View Teams
          </Button>
        </div>

        <div className="mt-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200 max-w-2xl">
          <h2 className="text-2xl font-semibold text-bombers-navy mb-3">
            Foundation Complete
          </h2>
          <p className="text-navy-700">
            This placeholder demonstrates the Bombers design system: Poppins headings, Inter body text,
            branded yellow and navy colors, and mobile-first responsive layout.
          </p>
        </div>
      </div>
    </Container>
  );
}
