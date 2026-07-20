'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const SLIDE_INTERVAL = 6000; // ms between auto-advances

export default function Hero() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const scrollRef = useRef(null);
  const overlayRef = useRef(null);
  const imageRefs = useRef([]);
  const { t } = useLanguage();

  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef(null);
  const autoplayRef = useRef(null);

  // Define your slides here — each pulls its own translation keys
  const slides = [
    {
      line1: t('hero.slide1.line1'),
      line2: t('hero.slide1.line2'),
      line3: t('hero.slide1.line3'),
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
      imageAlt: t('hero.slide1.imageAlt'),
    },
    {
      line1: t('hero.slide2.line1'),
      line2: t('hero.slide2.line2'),
      line3: t('hero.slide2.line3'),
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
      imageAlt: t('hero.slide2.imageAlt'),
    },
    {
      line1: t('hero.slide3.line1'),
      line2: t('hero.slide3.line2'),
      line3: t('hero.slide3.line3'),
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',
      imageAlt: t('hero.slide3.imageAlt'),
    },
  ];

  // Plays the heading stagger-in animation for the CURRENT activeIndex's DOM content
  const playHeadingIn = useCallback((withOverlay) => {
    const tl = gsap.timeline();

    if (withOverlay) {
      tl.fromTo(
        overlayRef.current,
        { scaleY: 1 },
        { scaleY: 0, duration: 1.2, ease: 'power3.inOut', transformOrigin: 'top' }
      );
    }

    tl.fromTo(
      headingRef.current?.children || [],
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' },
      withOverlay ? '-=0.4' : 0
    ).fromTo(
      subRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );

    if (withOverlay) {
      tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2');
    }

    return tl;
  }, []);

  const playHeadingOut = useCallback(() => {
    return gsap.timeline().to(
      [headingRef.current?.children || [], subRef.current],
      { y: -60, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.in' }
    );
  }, []);

  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const goToSlide = useCallback(
    (nextIndex) => {
      const current = activeIndexRef.current;
      if (nextIndex === current) return;

      const outTl = playHeadingOut();

      // Crossfade images
      gsap.to(imageRefs.current[current], { opacity: 0, duration: 0.9, ease: 'power2.inOut' });
      gsap.to(imageRefs.current[nextIndex], { opacity: 1, duration: 0.9, ease: 'power2.inOut' });

      outTl.eventCallback('onComplete', () => {
        activeIndexRef.current = nextIndex; // keep ref in sync immediately
        setActiveIndex(nextIndex);
      });
    },
    [playHeadingOut]
  );

  // Reset autoplay timer whenever the slide changes (manual or auto)
  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      const next = (activeIndexRef.current + 1) % slides.length;
      goToSlide(next);
    }, SLIDE_INTERVAL);
  }, [goToSlide, slides.length]);

  // Initial mount: intro animation + parallax + autoplay
  useEffect(() => {
    timelineRef.current = playHeadingIn(true);

    gsap.to(containerRef.current?.querySelector('.hero-image.active'), {
      y: 150,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    resetAutoplay();

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Whenever activeIndex changes (after slide swap), play the in-animation for new content
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    playHeadingIn(false);
  }, [activeIndex, playHeadingIn]);

  const handleDotClick = (index) => {
    goToSlide(index);
    resetAutoplay();
  };

  const current = slides[activeIndex];

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          ref={(el) => (imageRefs.current[i] = el)}
          className={`hero-image absolute inset-0 w-full h-[120%] -top-[10%] ${i === activeIndex ? 'active' : ''}`}
          style={{ opacity: i === activeIndex ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.imageAlt}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-charcoal/30" />
        </div>
      ))}

      <div ref={overlayRef} className="absolute inset-0 bg-charcoal z-10" />

      <div className="relative z-20 h-full flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
        <div className="max-w-5xl">
          <div ref={headingRef} className="overflow-hidden">
            <h1 className="font-serif text-display-xl text-white leading-[0.95]">
              <span className="block overflow-hidden">
                <span className="block">{current.line1}</span>
              </span>
              <span className="block overflow-hidden">
                <span className="block">{current.line2}</span>
              </span>
              <span className="block overflow-hidden">
                <span className="block italic font-normal text-white/80">{current.line3}</span>
              </span>
            </h1>
          </div>
          <div ref={subRef} className="mt-8 flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
            <p className="text-white/60 text-sm md:text-base max-w-md leading-relaxed">
              {t('hero.description')}
            </p>

            <a href="/portfolio"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-white/80 hover:text-gold transition-colors duration-300 shrink-0">

              <span>{t('hero.cta')}</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" />
              </svg>
            </a>
          </div>

          {/* Dot indicators */}
          <div className="mt-10 flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleDotClick(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-[2px] transition-all duration-500 ${i === activeIndex ? 'w-8 bg-gold' : 'w-4 bg-white/30'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">{t('hero.scroll')}</span>
        <div className="w-px h-8 bg-white/20 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full bg-white/60 animate-pulse"
            style={{ animationDuration: '2s' }}
          />
        </div>
      </div>
    </section>
  );
}