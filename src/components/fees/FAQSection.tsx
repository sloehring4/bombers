'use client';

import Accordion, { type AccordionItem } from '@/components/organization/Accordion';
import type { FAQItem } from '@/lib/data/fees';

interface FAQSectionProps {
  faqItems: readonly FAQItem[];
}

const categoryOrder: FAQItem['category'][] = ['fees', 'tryouts', 'season', 'general'];

const categoryDisplayNames: Record<FAQItem['category'], string> = {
  fees: 'Fees & Payments',
  tryouts: 'Tryouts',
  season: 'Season & Schedule',
  general: 'General',
};

export default function FAQSection({ faqItems }: FAQSectionProps) {
  // Group FAQ items by category
  const groupedFAQs = categoryOrder.map((category) => {
    const items = faqItems.filter((item) => item.category === category);
    if (items.length === 0) return null;

    // Map FAQItem to AccordionItem with JSX content
    const accordionItems: AccordionItem[] = items.map((item) => ({
      id: item.id,
      title: item.question,
      content: <p className="text-gray-700 leading-relaxed">{item.answer}</p>,
    }));

    return {
      category,
      displayName: categoryDisplayNames[category],
      items: accordionItems,
    };
  }).filter((group): group is NonNullable<typeof group> => group !== null);

  return (
    <div>
      {groupedFAQs.map((group, index) => (
        <div key={group.category}>
          <h3 className={`text-lg font-semibold text-bombers-navy mb-3 ${index === 0 ? 'mt-0' : 'mt-8'}`}>
            {group.displayName}
          </h3>
          <Accordion items={group.items} />
        </div>
      ))}
    </div>
  );
}
