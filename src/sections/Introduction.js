'use client';

import { useRevealAnimation, useImageReveal, useLineReveal } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

export default function Introduction() {
  const eyebrowRef = useRevealAnimation({ y: 20 });
  const headingRef = useRevealAnimation({ y: 50, delay: 0.1 });
  const textRef = useRevealAnimation({ y: 40, delay: 0.2 });
  const imageRef = useImageReveal();
  const lineRef = useLineReveal();
  const statsRef = useRevealAnimation({ y: 30, delay: 0.3 });
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-40 px-6 md:px-12 lg:px-16 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div className="lg:pt-12">
          <p ref={eyebrowRef} className="text-gold text-[11px] tracking-[0.3em] uppercase mb-6 opacity-0">{t('intro.eyebrow')}</p>
          <h2 ref={headingRef} className="font-serif text-display text-charcoal mb-8 opacity-0">{t('intro.heading')}</h2>
          <div ref={lineRef} className="w-16 h-px bg-gold mb-8" />
          <div ref={textRef} className="space-y-5 opacity-0">
            <p className="text-dark-grey leading-relaxed">{t('intro.para1')}</p>
            <p className="text-dark-grey/70 leading-relaxed">{t('intro.para2')}</p>
          </div>
          <div ref={statsRef} className="grid grid-cols-3 gap-8 mt-14 pt-10 border-t border-soft-grey opacity-0">
            {[
              { number: '100+', label: t('intro.statProjects') },
              { number: '15+', label: t('intro.statYears') },
              { number: '35+', label: t('intro.statTeam') },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="font-serif text-3xl md:text-4xl text-charcoal">{stat.number}</span>
                <p className="text-[11px] tracking-[0.2em] uppercase text-dark-grey/50 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div ref={imageRef} className="relative aspect-[3/4] lg:aspect-[4/5]">
          <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80" alt={t('intro.imageAlt')} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute bottom-0 right-0 bg-gold text-white px-6 py-4 md:px-8 md:py-6">
            <span className="text-[10px] tracking-[0.2em] uppercase block">{t('intro.established')}</span>
            <span className="font-serif text-2xl">2008</span>
          </div>
        </div>
      </div>
    </section>
  );
}
