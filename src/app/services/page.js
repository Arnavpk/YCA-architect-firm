'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '@/lib/constants';
import { useRevealAnimation } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const SVC_KEYS = ['residential','commercial','office','kitchen','turnkey','architecture','renovation','furniture','landscape','visualization','spacePlanning','projectManagement'];

function ServiceRow({ service, svcKey, index }) {
  const ref = useRef(null);
  const { t } = useLanguage();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } });
    return () => { ScrollTrigger.getAll().forEach(st => { if (st.trigger === el) st.kill(); }); };
  }, []);

  return (
    <div ref={ref} id={service.id} className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-12 md:py-16 border-b border-soft-grey opacity-0 scroll-mt-28">
      <div className="lg:col-span-1"><span className="text-gold/30 font-serif text-sm">{String(index + 1).padStart(2, '0')}</span></div>
      <div className="lg:col-span-4">
        <p className="text-gold text-[10px] tracking-[0.2em] uppercase mb-2">{t(`servicesList.${svcKey}.subtitle`)}</p>
        <h3 className="font-serif text-2xl md:text-3xl text-charcoal group-hover:text-gold transition-colors duration-300">{t(`servicesList.${svcKey}.title`)}</h3>
      </div>
      <div className="lg:col-span-4"><p className="text-dark-grey/60 leading-relaxed">{t(`servicesList.${svcKey}.description`)}</p></div>
      <div className="lg:col-span-3 flex items-start lg:justify-end">
        <div className="image-mask w-full lg:w-48 aspect-[4/3] overflow-hidden"><img src={service.image} alt={t(`servicesList.${svcKey}.title`)} className="w-full h-full object-cover" loading="lazy" /></div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const { t } = useLanguage();
  const heroRef = useRevealAnimation({ y: 60 });
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-6 md:px-12 lg:px-16 bg-white">
        <div ref={heroRef} className="max-w-4xl opacity-0">
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-6">{t('servicesPage.eyebrow')}</p>
          <h1 className="font-serif text-display-lg text-charcoal mb-8">{t('servicesPage.heading')}</h1>
          <p className="text-dark-grey/60 text-lg leading-relaxed max-w-2xl">{t('servicesPage.description')}</p>
        </div>
      </section>
      <section className="px-6 md:px-12 lg:px-16 pb-24 md:pb-40 bg-white">
        {SERVICES.map((service, i) => <ServiceRow key={service.id} service={service} svcKey={SVC_KEYS[i]} index={i} />)}
      </section>
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-warm-white text-center">
        <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4">{t('servicesPage.ctaEyebrow')}</p>
        <h2 className="font-serif text-display text-charcoal mb-8 max-w-2xl mx-auto">{t('servicesPage.ctaHeading')}</h2>
        <Link href="/contact" className="btn-luxury btn-gold"><span>{t('servicesPage.ctaButton')}</span></Link>
      </section>
    </>
  );
}
