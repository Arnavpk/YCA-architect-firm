'use client';

import Link from 'next/link';
import { useRevealAnimation, useParallax } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactCTA() {
  const { t } = useLanguage();
  const contentRef = useRevealAnimation({ y: 60 });
  const bgRef = useParallax(-0.15);

  return (
    <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 w-full h-[130%] -top-[15%]">
        <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80" alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-charcoal/50" />
      </div>
      <div ref={contentRef} className="relative z-10 text-center px-6 opacity-0">
        <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-6">{t('contactCta.eyebrow')}</p>
        <h2 className="font-serif text-display-lg text-white max-w-3xl mx-auto mb-10">{t('contactCta.heading')}</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="inline-flex items-center gap-3 bg-gold text-white px-8 py-4 text-[12px] tracking-[0.2em] uppercase hover:bg-gold/90 transition-colors duration-300">
            <span>{t('contactCta.btnPrimary')}</span>
          </Link>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-[12px] tracking-[0.2em] uppercase hover:bg-white/10 transition-colors duration-300">
            <span>{t('contactCta.btnWhatsapp')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
