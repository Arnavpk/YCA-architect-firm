'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '@/data/translations';

const LanguageContext = createContext(undefined);

/**
 * Retrieves a nested value from the translations object using a dot-separated key.
 * Falls back to English if the key is missing in the current language.
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

export function LanguageProvider({ children }) {
  // Start with 'en' to avoid hydration mismatch; update from localStorage after mount
  const [language, setLanguageState] = useState('en');
  const [mounted, setMounted] = useState(false);

  // On mount, read stored preference
  useEffect(() => {
    try {
      const stored = localStorage.getItem('yca-language');
      if (stored === 'mr') {
        setLanguageState('mr');
      }
    } catch {
      // localStorage unavailable
    }
    setMounted(true);
  }, []);

  // Update localStorage and html lang attribute when language changes
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('yca-language', language);
    } catch {
      // localStorage unavailable
    }
    document.documentElement.lang = language === 'mr' ? 'mr' : 'en';

    // Refresh GSAP ScrollTrigger positions after language change
    // Small delay to allow DOM to update with new text lengths
    const timer = setTimeout(() => {
      try {
        const { ScrollTrigger } = require('gsap/ScrollTrigger');
        ScrollTrigger.refresh();
      } catch {
        // ScrollTrigger not available
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [language, mounted]);

  const setLanguage = useCallback((lang) => {
    if (lang === 'en' || lang === 'mr') {
      setLanguageState(lang);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'en' ? 'mr' : 'en'));
  }, []);

  /**
   * Translation function.
   * Usage: t('hero.line1') or t('servicesList.residential.title')
   * Falls back to English text, then to the key itself.
   */
  const t = useCallback(
    (key) => {
      const value = getNestedValue(translations[language], key);
      if (value !== undefined) return value;

      // Fallback to English
      const fallback = getNestedValue(translations.en, key);
      if (fallback !== undefined) return fallback;

      // Return the key as last resort
      return key;
    },
    [language]
  );

  /**
   * Get array data (for lists like testimonials, process steps, etc.)
   * Usage: tArray('testimonialsList')
   */
  const tArray = useCallback(
    (key) => {
      const value = getNestedValue(translations[language], key);
      if (Array.isArray(value)) return value;

      const fallback = getNestedValue(translations.en, key);
      if (Array.isArray(fallback)) return fallback;

      return [];
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        tArray,
        isMarathi: language === 'mr',
        mounted,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
