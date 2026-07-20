'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '@/lib/constants';
import { useRevealAnimation } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPreview() {
  const { t } = useLanguage();
  const headingRef = useRevealAnimation({ y: 50 });
  const scrollContainerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const totalScroll = track.scrollWidth - container.offsetWidth;
    const st = ScrollTrigger.create({
      trigger: container, start: 'top 15%', end: () => `+=${totalScroll}`,
      pin: true, scrub: 1, anticipatePin: 1,
      animation: gsap.to(track, { x: -totalScroll, ease: 'none' }),
    });
    return () => st.kill();
  }, []);

  const featured = SERVICES.slice(0, 6);
  const SERVICE_KEYS = ['residential', 'commercial', 'office', 'kitchen', 'turnkey', 'architecture'];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div ref={headingRef} className="px-6 md:px-12 lg:px-16 mb-16 opacity-0">
        <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4">{t('servicesPreview.eyebrow')}</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <h2 className="font-serif text-display text-charcoal">{t('servicesPreview.heading')}</h2>
          <Link href="/services" className="mt-4 md:mt-0 text-[12px] tracking-[0.15em] uppercase text-dark-grey hover:text-gold transition-colors duration-300">
            {t('servicesPreview.viewAll')} →
          </Link>
        </div>
      </div>
      <div ref={scrollContainerRef} className="overflow-hidden">
        <div ref={trackRef} className="flex gap-6 md:gap-8 pl-6 md:pl-12 lg:pl-16 pr-24">
          {featured.map((service, i) => {
            const key = SERVICE_KEYS[i];
            return (
              <Link href={`/services#${service.id}`} key={service.id} className="group shrink-0 w-[300px] md:w-[380px]">
                <div className="relative overflow-hidden aspect-[3/4] mb-5">
                  <img src={service.image} alt={t(`servicesList.${key}.title`)} className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase">{t(`servicesList.${key}.subtitle`)}</span>
                    <h3 className="font-serif text-xl text-white mt-1">{t(`servicesList.${key}.title`)}</h3>
                  </div>
                </div>
                <p className="text-dark-grey/60 text-sm leading-relaxed line-clamp-2">{t(`servicesList.${key}.description`)}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
