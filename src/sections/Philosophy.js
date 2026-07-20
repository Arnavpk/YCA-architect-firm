'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRevealAnimation, useParallax } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const { t } = useLanguage();
  const titleRef = useRevealAnimation({ y: 60 });
  const quoteRef = useRevealAnimation({ y: 40, delay: 0.2 });
  const img1Ref = useParallax(-0.2);
  const pillarsRef = useRef(null);

  useEffect(() => {
    const el = pillarsRef.current;
    if (!el) return;
    const items = el.querySelectorAll('.pillar-item');
    gsap.fromTo(items, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
    });
    return () => { ScrollTrigger.getAll().forEach(st => { if (st.trigger === el) st.kill(); }); };
  }, []);

  const pillars = [
    { title: t('philosophy.pillar1Title'), text: t('philosophy.pillar1Text') },
    { title: t('philosophy.pillar2Title'), text: t('philosophy.pillar2Text') },
    { title: t('philosophy.pillar3Title'), text: t('philosophy.pillar3Text') },
  ];

  return (
    <section className="py-24 md:py-40 bg-charcoal text-white overflow-hidden">
      <div className="px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          <div ref={titleRef} className="opacity-0">
            <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-6">{t('philosophy.eyebrow')}</p>
            <h2 className="font-serif text-display-lg text-white/90">{t('philosophy.heading')}</h2>
          </div>
          <div ref={quoteRef} className="flex items-end opacity-0">
            <p className="text-white/40 leading-relaxed max-w-md">{t('philosophy.description')}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div ref={img1Ref} className="lg:col-span-5 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80" alt="" className="w-full aspect-[3/4] object-cover" loading="lazy" />
          </div>
          <div ref={pillarsRef} className="lg:col-span-7 flex flex-col justify-center">
            {pillars.map((pillar, i) => (
              <div key={i} className="pillar-item py-8 border-b border-white/10 last:border-0">
                <div className="flex items-start gap-6">
                  <span className="text-gold/40 text-sm font-serif mt-1 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-white/90 mb-3">{pillar.title}</h3>
                    <p className="text-white/40 leading-relaxed max-w-lg">{pillar.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
