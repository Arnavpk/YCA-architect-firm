'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageToggle({ variant = 'default' }) {
  const { language, setLanguage, mounted } = useLanguage();

  // During SSR / before hydration, render the toggle but don't show active state
  const isEn = mounted ? language === 'en' : true;
  const isMr = mounted ? language === 'mr' : false;

  const baseClasses =
    variant === 'mobile'
      ? 'flex items-center gap-3 mt-8 pt-6 border-t border-charcoal/10'
      : 'flex items-center gap-0';

  return (
    <div className={baseClasses} role="radiogroup" aria-label="Select language">
      <button
        onClick={() => setLanguage('en')}
        aria-label="Switch website language to English"
        aria-pressed={isEn}
        className={`transition-all duration-300 ${
          variant === 'mobile'
            ? `text-sm tracking-wide px-3 py-1.5 ${
                isEn
                  ? 'text-gold font-medium'
                  : 'text-dark-grey/40 hover:text-charcoal'
              }`
            : `text-[11px] tracking-[0.1em] px-2.5 py-1.5 ${
                isEn
                  ? 'text-gold font-medium'
                  : 'text-dark-grey/40 hover:text-charcoal'
              }`
        }`}
      >
        EN
      </button>

      <span
        className={`${
          variant === 'mobile'
            ? 'text-charcoal/15 text-sm'
            : 'text-charcoal/15 text-[11px]'
        }`}
        aria-hidden="true"
      >
        |
      </span>

      <button
        onClick={() => setLanguage('mr')}
        aria-label="वेबसाइटची भाषा मराठीवर बदला"
        aria-pressed={isMr}
        className={`transition-all duration-300 font-sans ${
          variant === 'mobile'
            ? `text-sm px-3 py-1.5 ${
                isMr
                  ? 'text-gold font-medium'
                  : 'text-dark-grey/40 hover:text-charcoal'
              }`
            : `text-[12px] px-2.5 py-1.5 ${
                isMr
                  ? 'text-gold font-medium'
                  : 'text-dark-grey/40 hover:text-charcoal'
              }`
        }`}
        style={{ fontFamily: "'Noto Sans Devanagari', 'DM Sans', sans-serif" }}
      >
        मराठी
      </button>
    </div>
  );
}
