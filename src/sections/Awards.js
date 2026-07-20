'use client';

import { useRevealAnimation, useStaggerReveal } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

export default function Awards() {
  const { t, tArray } = useLanguage();
  const headingRef = useRevealAnimation({ y: 40 });
  const listRef = useStaggerReveal();
  const awards = tArray('awardsList');

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-warm-white">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4">{t('awards.eyebrow')}</p>
          <h2 className="font-serif text-display text-charcoal">{t('awards.heading')}</h2>
        </div>
        <div ref={listRef}>
          {awards.map((award, i) => (
            <div key={i} data-stagger className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-charcoal/8 group cursor-default">
              <div className="flex items-center gap-6">
                <span className="text-gold/30 text-sm font-serif w-8">{award.year}</span>
                <h3 className="font-serif text-lg md:text-xl text-charcoal group-hover:text-gold transition-colors duration-300">{award.title}</h3>
              </div>
              <p className="text-dark-grey/40 text-sm mt-2 md:mt-0 md:pl-14">{award.org}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
