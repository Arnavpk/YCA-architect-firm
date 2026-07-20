'use client';

import Link from 'next/link';
import { useRevealAnimation } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';
import Process from '@/sections/Process';

export default function ProcessPage() {
  const { t } = useLanguage();
  const heroRef = useRevealAnimation({ y: 60 });
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-6 md:px-12 lg:px-16 bg-white">
        <div ref={heroRef} className="max-w-4xl opacity-0">
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-6">{t('processPage.eyebrow')}</p>
          <h1 className="font-serif text-display-lg text-charcoal mb-8">{t('processPage.heading')}</h1>
          <p className="text-dark-grey/60 text-lg leading-relaxed max-w-2xl">{t('processPage.description')}</p>
        </div>
      </section>
      <Process />
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-warm-white text-center">
        <h2 className="font-serif text-display text-charcoal mb-6">{t('processPage.ctaHeading')}</h2>
        <p className="text-dark-grey/50 mb-8 max-w-lg mx-auto">{t('processPage.ctaText')}</p>
        <Link href="/contact" className="btn-luxury btn-gold"><span>{t('processPage.ctaButton')}</span></Link>
      </section>
    </>
  );
}
