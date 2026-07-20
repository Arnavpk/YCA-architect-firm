'use client';

import { COMPANY } from '@/lib/constants';
import { useRevealAnimation } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPage() {
  const { t } = useLanguage();
  const heroRef = useRevealAnimation({ y: 50 });
  return (
    <section className="pt-32 md:pt-40 pb-24 md:pb-40 px-6 md:px-12 lg:px-16 bg-white">
      <div ref={heroRef} className="max-w-3xl mx-auto opacity-0">
        <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-6">{t('privacyPage.eyebrow')}</p>
        <h1 className="font-serif text-display text-charcoal mb-12">{t('privacyPage.heading')}</h1>
        <div className="space-y-8 text-dark-grey/70 leading-relaxed">
          <p>{t('privacyPage.intro')}</p>
          <div><h2 className="font-serif text-xl text-charcoal mb-3">{t('privacyPage.section1Title')}</h2><p>{t('privacyPage.section1Text')}</p></div>
          <div><h2 className="font-serif text-xl text-charcoal mb-3">{t('privacyPage.section2Title')}</h2><p>{t('privacyPage.section2Text')}</p></div>
          <div><h2 className="font-serif text-xl text-charcoal mb-3">{t('privacyPage.section3Title')}</h2><p>{t('privacyPage.section3Text')}</p></div>
          <div><h2 className="font-serif text-xl text-charcoal mb-3">{t('privacyPage.section4Title')}</h2><p>{t('privacyPage.section4ContactPrefix')}{' '}<a href={`mailto:${COMPANY.email}`} className="text-gold hover:underline">{COMPANY.email}</a>.</p></div>
          <p className="text-sm text-dark-grey/40 pt-8 border-t border-soft-grey">{t('privacyPage.lastUpdated')}</p>
        </div>
      </div>
    </section>
  );
}
