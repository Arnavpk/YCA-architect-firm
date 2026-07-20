'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '@/lib/constants';
import { useRevealAnimation } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const PROJECT_KEYS = ['sereneVilla', 'terraOffice', 'goldenHour', 'monochromeFlat', 'craftKitchen', 'lumiereRestaurant'];

function ProjectCard({ project, projectKey, index }) {
  const cardRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.fromTo(card, { y: 80, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, delay: index * 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
    });
    return () => { ScrollTrigger.getAll().forEach(st => { if (st.trigger === card) st.kill(); }); };
  }, [index]);

  const title = t(`projectsList.${projectKey}.title`);
  const desc = t(`projectsList.${projectKey}.description`);

  return (
    <Link href={`/portfolio/${project.id}`} ref={cardRef} className="group block opacity-0">
      <div className="relative overflow-hidden aspect-[4/5] md:aspect-[3/4] mb-6">
        <img src={project.image} alt={title} className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" loading="lazy" />
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <span className="text-white/70 text-[11px] tracking-[0.2em] uppercase">{project.category} — {project.area}</span>
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-serif text-xl md:text-2xl text-charcoal group-hover:text-gold transition-colors duration-300">{title}</h3>
          <p className="text-dark-grey/50 text-sm mt-1">{project.location}</p>
        </div>
        <span className="text-dark-grey/30 text-sm mt-1">{project.year}</span>
      </div>
    </Link>
  );
}

export default function FeaturedProjects() {
  const { t } = useLanguage();
  const headingRef = useRevealAnimation({ y: 50 });
  const featured = PROJECTS.slice(0, 4);

  return (
    <section className="py-24 md:py-40 px-6 md:px-12 lg:px-16 bg-warm-white">
      <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 opacity-0">
        <div>
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4">{t('featuredProjects.eyebrow')}</p>
          <h2 className="font-serif text-display text-charcoal">{t('featuredProjects.heading')}</h2>
        </div>
        <Link href="/portfolio" className="mt-6 md:mt-0 inline-flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase text-dark-grey hover:text-gold transition-colors duration-300">
          {t('featuredProjects.viewAll')}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1"><path d="M3 8H13M13 8L8 3M13 8L8 13" /></svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {featured.map((project, i) => (
          <ProjectCard key={project.id} project={project} projectKey={PROJECT_KEYS[i]} index={i} />
        ))}
      </div>
    </section>
  );
}
