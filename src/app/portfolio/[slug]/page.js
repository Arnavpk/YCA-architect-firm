'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PROJECTS } from '@/lib/constants';
import { useRevealAnimation, useImageReveal } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

const PROJECT_KEYS = { 'kanchan-villa': 'kanchanVilla', 'grand-shaurya': 'grandshaurya', 'ganga-gold': 'gangaGold', 'pandharipuram-palace': 'PandharpuramPalace', 'fancy-re-jewellery-studio': 'fancyrejewellerystudio', 'lumiere-restaurant': 'lumiereRestaurant', 'dr-gholaps-residence': 'drGholapsResidence', 'maharaja-jewellers': 'maharajaJewellers' };

const INITIAL_GALLERY = 4;
const GALLERY_BATCH = 4;

export default function ProjectDetail() {
  const { t } = useLanguage();
  const params = useParams();
  const project = PROJECTS.find(p => p.id === params.slug);

  const [galleryCount, setGalleryCount] = useState(INITIAL_GALLERY);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const isOpen = lightboxIndex !== null;
  const allGallery = project?.gallery ?? [];
  const visibleGallery = allGallery.slice(0, galleryCount);
  const galleryRemaining = allGallery.length - galleryCount;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const stepLightbox = useCallback((delta) => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      const total = allGallery.length;
      return (current + delta + total) % total;
    });
  }, [allGallery.length]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') stepLightbox(1);
      else if (e.key === 'ArrowLeft') stepLightbox(-1);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, closeLightbox, stepLightbox]);

  if (!project) {
    return (
      <section className="pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-16 bg-white min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-display text-charcoal mb-4">Project not found</h1>
        <p className="text-dark-grey/50 mb-8">The project you are looking for does not exist.</p>
        <Link href="/portfolio" className="btn-luxury"><span>{t('projectDetail.backToPortfolio')}</span></Link>
      </section>
    );
  }

  const pk = PROJECT_KEYS[project.id];
  const title = pk ? t(`projectsList.${pk}.title`) : project.title;
  const desc = pk ? t(`projectsList.${pk}.description`) : project.description;
  const heroRef = useRevealAnimation({ y: 50 });
  const imgRef = useImageReveal();
  const nextProject = PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length];
  const npk = PROJECT_KEYS[nextProject.id];

  const details = [
    { label: t('projectDetail.category'), value: t(`categories.${project.category}`) || project.category },
    { label: t('projectDetail.location'), value: project.location },
    { label: t('projectDetail.year'), value: project.year },
    { label: t('projectDetail.area'), value: project.area },
    { label: t('projectDetail.durationLabel'), value: project.duration },
  ];

  return (
    <>
      <section className="pt-28 md:pt-36 pb-8 px-6 md:px-12 lg:px-16 bg-white">
        <div ref={heroRef} className="opacity-0">
          <Link href="/portfolio" className="text-[11px] tracking-[0.2em] uppercase text-dark-grey/60 hover:text-gold transition-colors duration-300 mb-8 inline-block">{t('projectDetail.backToPortfolio')}</Link>
          <h1 className="font-serif text-display-lg text-charcoal mb-4">{title}</h1>
          <p className="text-dark-grey/50 text-lg max-w-2xl">{desc}</p>
        </div>
      </section>
      <section ref={imgRef} className="px-6 md:px-12 lg:px-16 pb-16">
        <div className="w-full aspect-[21/9] overflow-hidden"><img src={project.image} alt={title} className="w-full h-full object-cover" loading="eager" /></div>
      </section>
      <section className="px-6 md:px-12 lg:px-16 pb-24 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
          <div className="space-y-8">
            {details.map(item => (
              <div key={item.label} className="border-b border-soft-grey pb-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-dark-grey/55 mb-1">{item.label}</p>
                <p className="text-charcoal font-medium text-sm">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2 space-y-8">
            {pk && t(`projectsList.${pk}.brief`) !== `projectsList.${pk}.brief` && (
              <>
                <h2 className="font-serif text-heading text-charcoal">{t('projectDetail.briefHeading')}</h2>
                <p className="text-dark-grey/70 leading-relaxed">{t(`projectsList.${pk}.brief`)}</p>
              </>
            )}
            {pk && t(`projectsList.${pk}.approach`) !== `projectsList.${pk}.approach` && (
              <>
                <h2 className="font-serif text-heading text-charcoal pt-8">{t('projectDetail.approachHeading')}</h2>
                <p className="text-dark-grey/70 leading-relaxed">{t(`projectsList.${pk}.approach`)}</p>
              </>
            )}
          </div>
        </div>
      </section>

      {allGallery.length > 0 && (
        <section className="px-6 md:px-12 lg:px-16 pb-24 bg-white">
          <h2 className="font-serif text-heading text-charcoal mb-8">{t('projectDetail.galleryHeading')}</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {visibleGallery.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group relative aspect-[3/4] overflow-hidden bg-soft-grey cursor-zoom-in"
              >
                <img src={src} alt={`${title} ${i + 1}`} className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]" loading="lazy" />
                <span className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/25" />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                  <span className="w-10 h-10 border border-white/70 flex items-center justify-center text-white">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                      <path d="M8 3.5V12.5M3.5 8H12.5" />
                    </svg>
                  </span>
                </span>
              </button>
            ))}
          </div>

          {galleryRemaining > 0 && (
            <div className="flex justify-center mt-10">
              <button
                type="button"
                onClick={() => setGalleryCount((c) => c + GALLERY_BATCH)}
                className="group relative inline-flex items-center gap-4 overflow-hidden border border-gold/50 px-10 py-4 text-gold transition-colors duration-500 hover:text-charcoal hover:border-gold"
              >
                <span className="absolute inset-0 bg-gold translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <span className="relative text-[12px] tracking-[0.2em] uppercase">
                  {t('projectDetail.showMorePhotos')}
                </span>
                <span className="relative text-[11px] tabular-nums opacity-60">{galleryRemaining}</span>
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

          {galleryRemaining <= 0 && allGallery.length > INITIAL_GALLERY && (
            <div className="flex justify-center mt-10">
              <button
                type="button"
                onClick={() => setGalleryCount(INITIAL_GALLERY)}
                className="text-[12px] tracking-[0.2em] uppercase text-dark-grey/55 hover:text-gold transition-colors duration-300"
              >
                {t('projectDetail.showLessPhotos')}
              </button>
            </div>
          )}
        </section>
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
            aria-label="Close"
            className="absolute top-5 right-5 md:top-8 md:right-8 w-11 h-11 flex items-center justify-center text-white/70 hover:text-gold transition-colors duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <path d="M3 3L13 13M13 3L3 13" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); stepLightbox(-1); }}
            aria-label="Previous"
            className="absolute left-3 md:left-8 w-11 h-11 flex items-center justify-center text-white/70 hover:text-gold transition-colors duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <path d="M10 3L5 8L10 13" />
            </svg>
          </button>

          <img
            src={allGallery[lightboxIndex]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full object-contain"
          />

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); stepLightbox(1); }}
            aria-label="Next"
            className="absolute right-3 md:right-8 w-11 h-11 flex items-center justify-center text-white/70 hover:text-gold transition-colors duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <path d="M6 3L11 8L6 13" />
            </svg>
          </button>

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-[11px] tracking-[0.2em] tabular-nums">
            {lightboxIndex + 1} / {allGallery.length}
          </span>
        </div>
      )}

      <section className="bg-warm-white">
        <Link href={`/portfolio/${nextProject.id}`} className="group block">
          <div className="px-6 md:px-12 lg:px-16 py-16 md:py-20 flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-dark-grey/55 mb-3">{t('projectDetail.nextProject')}</p>
              <h3 className="font-serif text-3xl md:text-4xl text-charcoal group-hover:text-gold transition-colors duration-300">{npk ? t(`projectsList.${npk}.title`) : nextProject.title}</h3>
              <p className="text-dark-grey/55 text-sm mt-2">{t(`categories.${nextProject.category}`) || nextProject.category} — {nextProject.location}</p>
            </div>
            <div className="mt-6 md:mt-0 w-24 h-24 md:w-32 md:h-32 overflow-hidden shrink-0"><img src={nextProject.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" /></div>
          </div>
        </Link>
      </section>
    </>
  );
}
