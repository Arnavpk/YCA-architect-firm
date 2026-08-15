'use client';

import { useState } from 'react';
import { useRevealAnimation } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const sectionRef = useRevealAnimation({ y: 50 });
  const { t, tArray } = useLanguage();
  const items = tArray('testimonialsList');

  const goTo = (index) => {
    if (index < 0) setActive(items.length - 1);
    else if (index >= items.length) setActive(0);
    else setActive(index);
  };

  return (
    <section className="py-24 md:py-40 px-6 md:px-12 lg:px-16 bg-warm-beige">
      <div ref={sectionRef} className="max-w-5xl mx-auto text-center opacity-0">
        <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-12">{t('testimonials.eyebrow')}</p>
        <div className="relative min-h-[200px]">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center px-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                i === active
                  ? 'relative z-10'
                  : 'absolute inset-0 pointer-events-none z-0'
              }`}
              style={{ opacity: i === active ? 1 : 0, transform: i === active ? 'none' : 'translateY(2rem)' }}
              aria-hidden={i !== active}
            >
              <svg className="w-8 h-8 text-gold/30 mb-8" viewBox="0 0 24 24" fill="currentColor"><path d="M11 7.05V11H7.05C7.28 14.42 10.06 17.19 13.47 17.42V21.42C7.85 21.16 3.26 16.57 3 10.95H3V7.05H11ZM21 7.05V11H17.05C17.28 14.42 20.06 17.19 23.47 17.42V21.42C17.85 21.16 13.26 16.57 13 10.95V7.05H21Z" /></svg>
              <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-charcoal leading-relaxed max-w-3xl italic">&ldquo;{item.quote}&rdquo;</blockquote>
              <div className="mt-8">
                <p className="text-charcoal font-medium text-sm">{item.author}</p>
                <p className="text-dark-grey/50 text-xs mt-1">{item.role} — {item.project}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            className="w-10 h-10 border border-charcoal/15 flex items-center justify-center text-charcoal/50 hover:text-gold hover:border-gold/40 transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1"><path d="M10 3L5 8L10 13" /></svg>
          </button>
          <div className="flex items-center gap-3">
            {items.map((_, i) => (
              <button key={i} type="button" onClick={() => setActive(i)} className={`transition-all duration-300 ${i === active ? 'w-8 h-[2px] bg-gold' : 'w-4 h-[2px] bg-charcoal/15 hover:bg-charcoal/30'}`} aria-label={`Testimonial ${i + 1}`} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            className="w-10 h-10 border border-charcoal/15 flex items-center justify-center text-charcoal/50 hover:text-gold hover:border-gold/40 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1"><path d="M6 3L11 8L6 13" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
