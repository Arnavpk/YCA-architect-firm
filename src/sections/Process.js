'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRevealAnimation } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const { t, tArray } = useLanguage();
  const headingRef = useRevealAnimation({ y: 50 });
  const stepsRef = useRef(null);
  const steps = tArray('processSteps');

  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;
    const items = el.querySelectorAll('.process-step');
    items.forEach((step) => {
      gsap.fromTo(step, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: step, start: 'top 85%', toggleActions: 'play none none none' },
      });
    });
    return () => { ScrollTrigger.getAll().forEach(st => { items.forEach(step => { if (st.trigger === step) st.kill(); }); }); };
  }, []);

  return (
    <section className="py-24 md:py-40 px-6 md:px-12 lg:px-16 bg-white">
      <div ref={headingRef} className="text-center mb-20 opacity-0">
        <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4">{t('process.eyebrow')}</p>
        <h2 className="font-serif text-display text-charcoal">{t('process.heading')}</h2>
        <p className="text-dark-grey/50 mt-4 max-w-lg mx-auto">{t('process.subtitle')}</p>
      </div>
      <div ref={stepsRef} className="max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <div key={i} className="process-step grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 md:gap-12 py-10 border-b border-soft-grey last:border-0">
            <div className="flex items-start"><span className="font-serif text-4xl md:text-5xl text-gold/20">{String(i + 1).padStart(2, '0')}</span></div>
            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-3">{step.title}</h3>
              <p className="text-dark-grey/70 leading-relaxed mb-4 max-w-xl">{step.description}</p>
              <p className="text-[11px] tracking-[0.15em] uppercase text-dark-grey/35">{step.details}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
