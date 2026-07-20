'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRevealAnimation, useImageReveal, useLineReveal } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

function TeamMember({ member, index }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el, { y: 60, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, delay: index * 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    });
    return () => { ScrollTrigger.getAll().forEach(st => { if (st.trigger === el) st.kill(); }); };
  }, [index]);

  const IMAGES = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  ];

  return (
    <div ref={ref} className="group opacity-0">
      <div className="relative overflow-hidden aspect-[3/4] mb-5">
        <img src={IMAGES[index]} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" loading="lazy" />
      </div>
      <h3 className="font-serif text-lg text-charcoal">{member.name}</h3>
      <p className="text-gold text-[11px] tracking-[0.15em] uppercase mt-1">{member.role}</p>
      <p className="text-dark-grey/50 text-sm leading-relaxed mt-3">{member.bio}</p>
    </div>
  );
}

export default function AboutPage() {
  const { t, tArray } = useLanguage();
  const heroRef = useRevealAnimation({ y: 60 });
  const storyRef = useRevealAnimation({ y: 50 });
  const imgRef = useImageReveal();
  const lineRef = useLineReveal();
  const teamHeadingRef = useRevealAnimation({ y: 40 });
  const team = tArray('teamList');

  return (
    <>
      <section className="pt-32 md:pt-40 pb-20 md:pb-28 px-6 md:px-12 lg:px-16 bg-white">
        <div ref={heroRef} className="max-w-4xl opacity-0">
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-6">{t('about.eyebrow')}</p>
          <h1 className="font-serif text-display-lg text-charcoal mb-8">{t('about.heading')}</h1>
          <p className="text-dark-grey/60 text-lg leading-relaxed max-w-2xl">{t('about.description')}</p>
        </div>
      </section>
      <section ref={imgRef} className="px-6 md:px-12 lg:px-16 pb-24">
        <div className="w-full aspect-[21/9] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80" alt={t('about.imageAlt')} className="w-full h-full object-cover" loading="lazy" />
        </div>
      </section>
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-warm-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div ref={storyRef} className="opacity-0">
            <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-6">{t('about.storyEyebrow')}</p>
            <h2 className="font-serif text-display text-charcoal mb-8">{t('about.storyHeading')}</h2>
            <div ref={lineRef} className="w-16 h-px bg-gold mb-8" />
          </div>
          <div className="space-y-6 text-dark-grey/70 leading-relaxed lg:pt-4">
            <p>{t('about.storyPara1')}</p>
            <p>{t('about.storyPara2')}</p>
            <p>{t('about.storyPara3')}</p>
          </div>
        </div>
      </section>
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-charcoal text-white">
        <div className="max-w-5xl mx-auto text-center mb-20">
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4">{t('about.valuesEyebrow')}</p>
          <h2 className="font-serif text-display text-white/90">{t('about.valuesHeading')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {[1, 2, 3].map((n) => (
            <div key={n} className="text-center md:text-left">
              <span className="text-gold/30 font-serif text-5xl block mb-4">{String(n).padStart(2, '0')}</span>
              <h3 className="font-serif text-xl text-white/90 mb-3">{t(`about.value${n}Title`)}</h3>
              <p className="text-white/40 leading-relaxed text-sm">{t(`about.value${n}Text`)}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-16 bg-white">
        <div ref={teamHeadingRef} className="text-center mb-16 md:mb-20 opacity-0">
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4">{t('about.teamEyebrow')}</p>
          <h2 className="font-serif text-display text-charcoal">{t('about.teamHeading')}</h2>
          <p className="text-dark-grey/50 mt-4 max-w-lg mx-auto">{t('about.teamSubtitle')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {team.map((member, i) => <TeamMember key={member.name} member={member} index={i} />)}
        </div>
      </section>
    </>
  );
}
