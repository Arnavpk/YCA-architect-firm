'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { PROJECTS } from '@/lib/constants';
import { useRevealAnimation } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

const PROJECT_KEYS = { 'serene-villa': 'sereneVilla', 'terra-office': 'terraOffice', 'the-golden-hour': 'goldenHour', 'monochrome-flat': 'monochromeFlat', 'craft-kitchen': 'craftKitchen', 'lumiere-restaurant': 'lumiereRestaurant' };
const CATEGORIES_EN = ['All', ...new Set(PROJECTS.map(p => p.category))];

export default function PortfolioPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');
  const heroRef = useRevealAnimation({ y: 60 });
  const gridRef = useRef(null);

  const filtered = activeFilter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.project-card');
    if (!cards) return;
    gsap.fromTo(cards, { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out' });
  }, [activeFilter]);

  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 px-6 md:px-12 lg:px-16 bg-white">
        <div ref={heroRef} className="opacity-0">
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-6">{t('portfolioPage.eyebrow')}</p>
          <h1 className="font-serif text-display-lg text-charcoal mb-8">{t('portfolioPage.heading')}</h1>
          <p className="text-dark-grey/60 text-lg leading-relaxed max-w-2xl mb-12">{t('portfolioPage.description')}</p>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES_EN.map(cat => {
              const label = cat === 'All' ? t('portfolioPage.filterAll') : (t(`categories.${cat}`) || cat);
              return (
                <button key={cat} onClick={() => setActiveFilter(cat)}
                  className={`text-[12px] tracking-[0.15em] uppercase px-5 py-2.5 border transition-all duration-300 ${activeFilter === cat ? 'bg-charcoal text-white border-charcoal' : 'bg-transparent text-dark-grey border-soft-grey hover:border-charcoal'}`}>
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <section className="px-6 md:px-12 lg:px-16 pb-24 md:pb-40 bg-white">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((project, i) => {
            const pk = PROJECT_KEYS[project.id];
            const title = pk ? t(`projectsList.${pk}.title`) : project.title;
            const catLabel = t(`categories.${project.category}`) || project.category;
            return (
              <Link href={`/portfolio/${project.id}`} key={project.id} className={`project-card group block ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <div className={`relative overflow-hidden mb-4 ${i === 0 ? 'aspect-[16/10]' : 'aspect-[4/5]'}`}>
                  <img src={project.image} alt={title} className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-charcoal group-hover:text-gold transition-colors duration-300">{title}</h3>
                    <p className="text-dark-grey/40 text-sm mt-0.5">{catLabel} — {project.location}</p>
                  </div>
                  <span className="text-dark-grey/25 text-sm">{project.year}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
