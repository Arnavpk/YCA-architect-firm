'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div className={`loading-screen ${hidden ? 'hidden' : ''}`}>
      <div className="flex flex-col items-center">
        <span className="font-serif text-3xl md:text-4xl text-white/90 tracking-tight">YCA</span>
        <span className="text-[13px] tracking-[0.4em] uppercase text-white/30 mt-4">
          {t('loading.name')}
        </span>
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/30 mt-1">
          {t('loading.subtitle')}
        </span>
      </div>
      <div className="loading-bar" />
    </div>
  );
}
