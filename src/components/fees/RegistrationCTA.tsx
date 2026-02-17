import { CheckCircle, ExternalLink } from 'lucide-react';

const checklistItems = [
  'Player information (name, age, address)',
  'Medical information and emergency contacts',
  'Payment method (credit card or check)',
  'Parent/guardian contact details',
  'Signed waiver and code of conduct agreement',
];

export default function RegistrationCTA() {
  const registrationUrl = 'https://www.jerseywatch.com/org/ofallon-bombers/register';

  return (
    <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8">
      <h3 className="text-2xl font-bold text-bombers-navy mb-4">
        Register Your Player
      </h3>

      <p className="text-gray-700 mb-6">
        Complete your online registration through our secure portal. The process
        takes about 10 minutes and you'll receive immediate confirmation.
      </p>

      <div className="mb-6">
        <h4 className="font-semibold text-bombers-navy mb-3">
          What You'll Need:
        </h4>
        <ul className="space-y-2">
          {checklistItems.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-bombers-yellow flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <iframe
          src={registrationUrl}
          sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
          className="w-full h-[600px] border-2 border-gray-300 rounded-lg"
          title="Player Registration Form"
          loading="lazy"
        />

        <a
          href={registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-bombers-navy font-semibold hover:text-bombers-yellow transition-colors"
        >
          If the form doesn't load, register directly on JerseyWatch
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
