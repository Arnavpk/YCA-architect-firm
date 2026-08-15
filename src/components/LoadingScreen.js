'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const SESSION_KEY = 'yca-loading-seen';

export default function LoadingScreen() {
  const [hiding, setHiding] = useState(false);
  const [unmounted, setUnmounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        setUnmounted(true);
        return;
      }
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // sessionStorage unavailable
    }

    const fadeTimer = setTimeout(() => setHiding(true), 1800);
    const removeTimer = setTimeout(() => setUnmounted(true), 2600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (unmounted) return null;

  return (
    <div className={`loading-screen ${hiding ? 'hidden' : ''}`}>
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
