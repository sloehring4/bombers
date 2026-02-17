import { socialLinks } from '@/lib/data/contact';

export default function SocialLinks() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit our ${social.name} page`}
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-bombers-yellow transition-colors"
          >
            <Icon className="w-6 h-6" aria-hidden="true" />
            <span className="font-semibold">{social.name}</span>
          </a>
        );
      })}
    </div>
  );
}
