'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className="border-2 border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-bold text-bombers-navy">
                {item.title}
              </h3>
              <ChevronDown
                className={clsx(
                  'w-5 h-5 text-bombers-navy transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            {isOpen && (
              <div className="bg-gray-50 border-t-2 border-gray-200 p-4">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
