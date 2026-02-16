import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface QuickLinkCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export default function QuickLinkCard({ icon: Icon, title, description, href }: QuickLinkCardProps) {
  return (
    <Link
      href={href}
      className="group p-8 bg-white rounded-xl border-2 border-gray-200 hover:border-bombers-yellow hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bombers-yellow"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-bombers-yellow/10 group-hover:bg-bombers-yellow flex items-center justify-center transition-all duration-300">
          <Icon
            size={40}
            strokeWidth={2}
            className="text-bombers-navy group-hover:text-white transition-all duration-300"
          />
        </div>
        <h3 className="text-xl font-semibold text-bombers-navy">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}
