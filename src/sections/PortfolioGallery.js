'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_GALLERY, cloudinaryImage } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const INITIAL_COUNT = 6;
const BATCH_SIZE = 6;
const THUMB_WIDTH = 800;
const FULL_WIDTH = 1600;

// Cycled rather than randomised: the page is server rendered, so drawing sizes at
// random would produce different markup on the server and client and trip
// hydration. Twelve entries swing between wide, square and tall so the repeat is
// not legible, and the height factors average out near 1 to keep columns level.
const ASPECTS = [
  'aspect-[3/4]',
  'aspect-[4/3]',
  'aspect-[1/1]',
  'aspect-[2/3]',
  'aspect-[3/2]',
  'aspect-[4/5]',
  'aspect-[1/1]',
  'aspect-[16/10]',
  'aspect-[3/4]',
  'aspect-[5/4]',
  'aspect-[2/3]',
  'aspect-[4/3]',
];

export default function PortfolioGallery() {
  const { t } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const wallRef = useRef(null);

  const visible = PORTFOLIO_GALLERY.slice(0, visibleCount);
  const remaining = PORTFOLIO_GALLERY.length - visibleCount;
  const isOpen = lightboxIndex !== null;

  // Reveal tiles as they scroll into view. Marking each element keeps a later
  // "show more" from re-animating the ones already on screen.
  useEffect(() => {
    const fresh = wallRef.current?.querySelectorAll('.gallery-tile:not([data-revealed])');
    if (!fresh?.length) return;

    const tiles = Array.from(fresh);
    tiles.forEach((tile) => tile.setAttribute('data-revealed', ''));

    const tween = gsap.fromTo(
      tiles,
      { y: 40, opacity: 0, force3D: true },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power2.out',
        force3D: true,
        scrollTrigger: { trigger: tiles[0], start: 'top 92%', once: true, fastScrollEnd: true },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [visibleCount]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const step = useCallback((delta) => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      const total = PORTFOLIO_GALLERY.length;
      return (current + delta + total) % total;
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, closeLightbox, step]);

  return (
    <div className="mt-20 md:mt-28">
      <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-10 mb-10 md:mb-14">
        <div className="shrink-0">
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-3">
            {t('portfolioPage.galleryEyebrow')}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal">
            {t('portfolioPage.galleryHeading')}
          </h2>
        </div>
        <p className="text-dark-grey/55 text-sm leading-relaxed max-w-md md:mb-1.5">
          {t('portfolioPage.galleryNote')}
        </p>
      </div>

      <div ref={wallRef} className="columns-2 md:columns-3 gap-4 md:gap-6">
        {visible.map((publicId, i) => (
          <figure
            key={publicId}
            className={`gallery-tile mb-4 md:mb-6 break-inside-avoid ${ASPECTS[i % ASPECTS.length]}`}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group relative block w-full h-full overflow-hidden bg-soft-grey cursor-zoom-in"
            >
              <img
                src={cloudinaryImage(publicId, THUMB_WIDTH)}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
              />
              <span className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/25" />
              <span className="absolute inset-0 flex items-center justify-center opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                <span className="w-10 h-10 border border-white/70 flex items-center justify-center text-white">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                    <path d="M8 3.5V12.5M3.5 8H12.5" />
                  </svg>
                </span>
              </span>
            </button>
          </figure>
        ))}
      </div>

      {remaining > 0 && (
        <div className="flex justify-center mt-12 md:mt-16">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + BATCH_SIZE)}
            className="group relative inline-flex items-center gap-4 overflow-hidden border border-gold/50 px-10 py-4 text-gold transition-colors duration-500 hover:text-charcoal hover:border-gold"
          >
            <span className="absolute inset-0 bg-gold translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
            <span className="relative text-[12px] tracking-[0.2em] uppercase">
              {t('portfolioPage.showMore')}
            </span>
            <span className="relative text-[11px] tabular-nums opacity-60">{remaining}</span>
            <svg
              className="relative transition-transform duration-500 group-hover:translate-y-1"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              aria-hidden="true"
            >
              <path d="M8 3V13M8 13L3 8M8 13L13 8" />
            </svg>
          </button>
        </div>
      )}

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] bg-charcoal/95 flex items-center justify-center p-4 md:p-10"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label={t('portfolioPage.closeImage')}
            className="absolute top-5 right-5 md:top-8 md:right-8 w-11 h-11 flex items-center justify-center text-white/70 hover:text-gold transition-colors duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <path d="M3 3L13 13M13 3L3 13" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label={t('portfolioPage.previousImage')}
            className="absolute left-3 md:left-8 w-11 h-11 flex items-center justify-center text-white/70 hover:text-gold transition-colors duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <path d="M10 3L5 8L10 13" />
            </svg>
          </button>

          <img
            src={cloudinaryImage(PORTFOLIO_GALLERY[lightboxIndex], FULL_WIDTH)}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full object-contain"
          />

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label={t('portfolioPage.nextImage')}
            className="absolute right-3 md:right-8 w-11 h-11 flex items-center justify-center text-white/70 hover:text-gold transition-colors duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <path d="M6 3L11 8L6 13" />
            </svg>
          </button>

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-[11px] tracking-[0.2em] tabular-nums">
            {lightboxIndex + 1} / {PORTFOLIO_GALLERY.length}
          </span>
        </div>
      )}
    </div>
  );
}
