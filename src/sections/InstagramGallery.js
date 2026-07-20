'use client';

import { useRevealAnimation, useStaggerReveal } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80',
];

export default function InstagramGallery() {
  const { t } = useLanguage();
  const headingRef = useRevealAnimation({ y: 30 });
  const gridRef = useStaggerReveal();

  return (
    <section className="py-24 md:py-32 bg-white">
      <div ref={headingRef} className="px-6 md:px-12 lg:px-16 text-center mb-12 opacity-0">
        <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4">{t('instagram.eyebrow')}</p>
        <h2 className="font-serif text-display text-charcoal">@yogeshchavanassociates</h2>
      </div>
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {GALLERY_IMAGES.map((src, i) => (
          <a key={i} data-stagger href="https://www.instagram.com/yogeshchavan_associates?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="group relative aspect-square overflow-hidden">
            <img src={src} alt={`YCA gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300 flex items-center justify-center">
              <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
