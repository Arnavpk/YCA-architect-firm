'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const SLIDE_INTERVAL = 6000;

const SLIDE_IMAGES = [
  'https://res.cloudinary.com/dmjaisk94/image/upload/w_1920,q_auto,f_auto/v1785406630/IMG_5216_jbygfj.jpg',
  'https://res.cloudinary.com/dmjaisk94/image/upload/w_1920,q_auto,f_auto/v1785406717/IMG_5239_jzrtz2.jpg',
  'https://res.cloudinary.com/dmjaisk94/image/upload/w_1920,q_auto,f_auto/v1785406403/Grand_Shaurya_2_of_15_1_qedt9o.jpg',
  'https://res.cloudinary.com/dmjaisk94/image/upload/w_1920,q_auto,f_auto/v1785406274/Grand_Shaurya_1_of_15_1_1_pj1lj0.jpg',
  'https://res.cloudinary.com/dmjaisk94/image/upload/w_1920,q_auto,f_auto/v1785406213/Ganga_Gold_qsypm5.jpg',
  'https://res.cloudinary.com/dmjaisk94/image/upload/w_1920,q_auto,f_auto/v1786814984/0F28CF92-69E0-4702-AAFC-8B72D4ADF00E_gv7p0a.png',
  'https://res.cloudinary.com/dmjaisk94/image/upload/w_1920,q_auto,f_auto/v1786814982/7C79AE14-61A3-4435-9983-68943FB83BF0_crwo6y.png',
];

export default function Hero() {
  const containerRef = useRef(null);
  const captionRef = useRef(null);
  const subRef = useRef(null);
  const scrollRef = useRef(null);
  const overlayRef = useRef(null);
  const imageRefs = useRef([]);
  const { t, tArray } = useLanguage();

  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef(null);
  const activeIndexRef = useRef(0);

  const captions = tArray('hero.captions');
  const slideCount = SLIDE_IMAGES.length;

  const playCaptionIn = useCallback((withOverlay) => {
    const tl = gsap.timeline();
    if (withOverlay) {
      tl.fromTo(overlayRef.current, { scaleY: 1 }, { scaleY: 0, duration: 1.2, ease: 'power3.inOut', transformOrigin: 'top' });
    }
    tl.fromTo(captionRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, withOverlay ? '-=0.4' : 0)
      .fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5');
    if (withOverlay) {
      tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2');
    }
    return tl;
  }, []);

  const playCaptionOut = useCallback(() => {
    return gsap.timeline().to([captionRef.current, subRef.current], { y: -60, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.in' });
  }, []);

  useEffect(() => { activeIndexRef.current = activeIndex; }, [activeIndex]);

  const goToSlide = useCallback((nextIndex) => {
    const current = activeIndexRef.current;
    if (nextIndex === current) return;

    const nextEl = imageRefs.current[nextIndex];
    const currentEl = imageRefs.current[current];
    if (!nextEl || !currentEl) return;

    const outTl = playCaptionOut();
    gsap.to(currentEl, { opacity: 0, duration: 0.9, ease: 'power2.inOut' });
    gsap.to(nextEl, { opacity: 1, duration: 0.9, ease: 'power2.inOut' });
    outTl.eventCallback('onComplete', () => {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    });
  }, [playCaptionOut]);

  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      const next = (activeIndexRef.current + 1) % slideCount;
      goToSlide(next);
    }, SLIDE_INTERVAL);
  }, [goToSlide, slideCount]);

  useEffect(() => {
    playCaptionIn(true);
    const heroImage = containerRef.current?.querySelector('.hero-image.active');
    let parallaxTween = null;
    if (heroImage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !window.matchMedia('(max-width: 767px)').matches) {
      parallaxTween = gsap.to(heroImage, {
        y: 100, ease: 'none', force3D: true,
        scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 0.4, fastScrollEnd: true },
      });
    }
    resetAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      parallaxTween?.scrollTrigger?.kill();
      parallaxTween?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    playCaptionIn(false);
  }, [activeIndex, playCaptionIn]);

  const handleDotClick = (index) => { goToSlide(index); resetAutoplay(); };

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {SLIDE_IMAGES.map((src, i) => (
        <div key={i} ref={(el) => (imageRefs.current[i] = el)}
          className={`hero-image absolute inset-0 w-full h-[120%] -top-[10%] ${i === activeIndex ? 'active' : ''}`}
          style={{ opacity: i === activeIndex ? 1 : 0 }}>
          <img src={src} alt={captions[i] || ''} className="w-full h-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
          <div className="absolute inset-0 bg-charcoal/30" />
        </div>
      ))}

      <div ref={overlayRef} className="hero-overlay-mask absolute inset-0 bg-charcoal z-10" />

      <div className="relative z-20 h-full flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
        <div className="max-w-5xl">
          <h1 ref={captionRef} className="font-serif text-display text-white leading-[1.2] mb-8">
            {captions[activeIndex] || ''}
          </h1>

          <div ref={subRef} className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
            <p className="text-white/60 text-sm md:text-base max-w-md leading-relaxed">
              {t('hero.description')}
            </p>
            <Link href="/portfolio"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-white/80 hover:text-gold transition-colors duration-300 shrink-0">
              <span>{t('hero.cta')}</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" />
              </svg>
            </Link>
          </div>

          <div className="mt-10 flex gap-3">
            {SLIDE_IMAGES.map((_, i) => (
              <button key={i} type="button" onClick={() => handleDotClick(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-[2px] transition-all duration-500 ${i === activeIndex ? 'w-8 bg-gold' : 'w-4 bg-white/30'}`} />
            ))}
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">{t('hero.scroll')}</span>
        <div className="w-px h-8 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/60 animate-pulse" style={{ animationDuration: '2s' }} />
        </div>
      </div>
    </section>
  );
}