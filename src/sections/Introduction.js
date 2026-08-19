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
    <section className="py-24 md:py-40 px-6 md:px-12 lg:px-16 bg-white relative overflow-hidden">
      {/* Background watermark text */}
      <div className="absolute top-12 md:top-16 left-6 md:left-12 lg:left-16 pointer-events-none select-none" aria-hidden="true">
        <span className="font-serif text-[5rem] md:text-[7rem] lg:text-[9rem] font-bold uppercase tracking-[0.2em] text-charcoal/[0.04] leading-none">
          ABOUT
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div className="lg:pt-12">
          <p ref={eyebrowRef} className="text-gold text-[11px] tracking-[0.3em] uppercase mb-6 opacity-0">{t('intro.eyebrow')}</p>
          <h2 ref={headingRef} className="font-serif text-display text-charcoal mb-8 opacity-0">{t('intro.heading')}</h2>
          <div ref={lineRef} className="w-16 h-px bg-gold mb-8" />
          <div ref={textRef} className="space-y-5 opacity-0">
            <p className="text-dark-grey leading-relaxed"><strong className="font-semibold">{t('intro.para1bold')}</strong>{t('intro.para1')}</p>
            <p className="text-dark-grey leading-relaxed"><strong className="font-semibold">{t('intro.para2bold')}</strong>{t('intro.para2')}</p>
            <a href="/about" className="inline-flex items-center gap-2 mt-8 text-[12px] tracking-[0.15em] uppercase text-charcoal hover:text-gold transition-colors duration-300">
              <span>{t('intro.readMore')}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1"><path d="M3 8H13M13 8L8 3M13 8L8 13" /></svg>
            </a>
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
          <img src="https://res.cloudinary.com/dmjaisk94/image/upload/v1787139206/The_Grand_Shaurya_16_of_25_1_thohpm.jpg" alt={t('intro.imageAlt')} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute bottom-0 right-0 bg-gold text-white px-6 py-4 md:px-8 md:py-6">
            <span className="text-[10px] tracking-[0.2em] uppercase block">{t('intro.established')}</span>
            <span className="font-serif text-2xl">2008</span>
          </div>
        </div>
      </div>
    </section>
  );
}