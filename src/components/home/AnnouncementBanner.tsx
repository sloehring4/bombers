'use client';

import { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';

interface AnnouncementBannerProps {
  dates: { label: string; date: string }[];
  bannerId: string;
}

export default function AnnouncementBanner({ dates, bannerId }: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(`banner-dismissed-${bannerId}`);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, [bannerId]);

  const handleDismiss = () => {
    localStorage.setItem(`banner-dismissed-${bannerId}`, 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-bombers-yellow border-y-4 border-bombers-navy py-4 px-4">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          {dates.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <Calendar size={18} className="text-bombers-navy flex-shrink-0" />
              <span className="font-bold text-bombers-navy">{item.label}:</span>
              <span className="text-bombers-navy">{item.date}</span>
            </div>
          ))}
        </div>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="text-bombers-navy hover:bg-bombers-navy/10 p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bombers-navy flex-shrink-0"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
