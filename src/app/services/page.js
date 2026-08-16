'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '@/lib/constants';
import { useRevealAnimation } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const SVC_KEYS = ['residential', 'commercial', 'architecture', 'renovation', 'jewellery'];

const JEWELLERY_IMAGES = [
  'https://res.cloudinary.com/dmjaisk94/image/upload/v1786814984/0F28CF92-69E0-4702-AAFC-8B72D4ADF00E_gv7p0a.png',
  'https://res.cloudinary.com/dmjaisk94/image/upload/v1786814982/7C79AE14-61A3-4435-9983-68943FB83BF0_crwo6y.png',
  ' https://res.cloudinary.com/dmjaisk94/image/upload/v1786905306/ChatGPT_Image_Aug_17_2026_12_04_52_AM_gmvr8x.png',
  'https://res.cloudinary.com/dmjaisk94/image/upload/v1786814934/F4A9E657-90FC-4C7A-9239-D2DE51588728_qehbrb.png',
  'https://res.cloudinary.com/dmjaisk94/image/upload/v1786814911/333CC337-F49A-4CFB-8FF9-151737EFC390_lobmao.png',
];

function ServiceRow({ service, svcKey, index }) {
  const ref = useRef(null);
  const { t } = useLanguage();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const tween = gsap.fromTo(el, { y: 40, opacity: 0, force3D: true }, {
      y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', force3D: true,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true, fastScrollEnd: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
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

function JewelleryShowcase() {
  const { t } = useLanguage();
  const headingRef = useRevealAnimation({ y: 50 });
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll('.jewellery-card');
    gsap.fromTo(cards, { y: 60, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: track, start: 'top 80%', toggleActions: 'play none none none' },
    });
    return () => { ScrollTrigger.getAll().forEach(st => { if (st.trigger === track) st.kill(); }); };
  }, []);

  return (
    <section id="jewellery" className="py-24 md:py-32 bg-charcoal scroll-mt-28">
      <div ref={headingRef} className="px-6 md:px-12 lg:px-16 mb-16 opacity-0">
        <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4">
          {t('jewelleryShowcase.eyebrow')}
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-display text-white/90 mb-6">
              {t('jewelleryShowcase.heading')}
            </h2>
            <p className="text-white/40 leading-relaxed">
              {t('jewelleryShowcase.description')}
            </p>
          </div>
          <Link
            href="/portfolio/fancy-re-jewellery-studio"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase text-gold hover:text-white transition-colors duration-300 shrink-0"
          >
            {t('jewelleryShowcase.viewProject')}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M3 8H13M13 8L8 3M13 8L8 13" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <div ref={trackRef} className="flex gap-4 md:gap-6 pl-6 md:pl-12 lg:pl-16 pr-6 md:pr-12 lg:pr-16 pb-4" style={{ minWidth: 'max-content' }}>
          {JEWELLERY_IMAGES.map((src, i) => (
            <div key={i} className="jewellery-card shrink-0 w-[280px] md:w-[380px] lg:w-[450px]">
              <div className="relative overflow-hidden aspect-[4/3] group">
                <img
                  src={src}
                  alt={`Jewellery store design ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const { t } = useLanguage();
  const heroRef = useRevealAnimation({ y: 60 });

  const displayedServices = SERVICES.filter(s => s.id !== 'jewellery');

  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-6 md:px-12 lg:px-16 bg-white">
        <div ref={heroRef} className="max-w-4xl opacity-0">
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-6">{t('servicesPage.eyebrow')}</p>
          <h1 className="font-serif text-display-lg text-charcoal mb-8">{t('servicesPage.heading')}</h1>
          <p className="text-dark-grey/60 text-lg leading-relaxed max-w-2xl">{t('servicesPage.description')}</p>
        </div>
      </section>
      <section className="px-6 md:px-12 lg:px-16 pb-24 md:pb-32 bg-white">
        {displayedServices.map((service, i) => (
          <ServiceRow key={service.id} service={service} svcKey={SVC_KEYS[i]} index={i} />
        ))}
      </section>

      <JewelleryShowcase />

      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-warm-white text-center">
        <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4">{t('servicesPage.ctaEyebrow')}</p>
        <h2 className="font-serif text-display text-charcoal mb-8 max-w-2xl mx-auto">{t('servicesPage.ctaHeading')}</h2>
        <Link href="/contact" className="btn-luxury btn-gold"><span>{t('servicesPage.ctaButton')}</span></Link>
      </section>
    </>
  );
}