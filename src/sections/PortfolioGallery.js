'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { PORTFOLIO_GALLERY } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';

const INITIAL_COUNT = 6;
const BATCH_SIZE = 6;

// Cycled rather than randomised so the server and client render the same markup.
// The ratios repeat every BATCH_SIZE so each reveal adds comparable height to
// every column and the wall stays roughly level along the bottom.
const ASPECTS = [
  'aspect-[4/5]',
  'aspect-[1/1]',
  'aspect-[3/4]',
  'aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-[1/1]',
];

export default function PortfolioGallery() {
  const { t } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const wallRef = useRef(null);
  const previousCountRef = useRef(INITIAL_COUNT);

  const visible = PORTFOLIO_GALLERY.slice(0, visibleCount);
  const remaining = PORTFOLIO_GALLERY.length - visibleCount;

  useEffect(() => {
    const previous = previousCountRef.current;
    previousCountRef.current = visibleCount;
    if (visibleCount <= previous) return;

    const tiles = wallRef.current?.querySelectorAll('.gallery-tile');
    if (!tiles) return;

    const added = Array.from(tiles).slice(previous);
    if (!added.length) return;

    const tween = gsap.fromTo(
      added,
      { y: 30, opacity: 0, force3D: true },
      { y: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: 'power2.out', force3D: true }
    );
    return () => tween.kill();
  }, [visibleCount]);

  return (
    <div className="mt-20 md:mt-28">
      <div className="flex items-end gap-6 mb-10 md:mb-12">
        <div>
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-3">
            {t('portfolioPage.galleryEyebrow')}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal">
            {t('portfolioPage.galleryHeading')}
          </h2>
        </div>
        <div className="flex-1 h-px bg-charcoal/10 mb-2" />
      </div>

      <div
        ref={wallRef}
        className="columns-2 md:columns-3 gap-4 md:gap-6"
        role="group"
        aria-label={t('portfolioPage.galleryHeading')}
      >
        {visible.map((src, i) => (
          <figure
            key={src}
            className={`gallery-tile relative overflow-hidden mb-4 md:mb-6 break-inside-avoid bg-soft-grey ${ASPECTS[i % ASPECTS.length]}`}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
            />
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
    </div>
  );
}
