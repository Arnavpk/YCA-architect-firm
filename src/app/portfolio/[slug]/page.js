'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PROJECTS } from '@/lib/constants';
import { useRevealAnimation, useImageReveal } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

const PROJECT_KEYS = { 'serene-villa': 'sereneVilla', 'terra-office': 'terraOffice', 'the-golden-hour': 'goldenHour', 'monochrome-flat': 'monochromeFlat', 'craft-kitchen': 'craftKitchen', 'lumiere-restaurant': 'lumiereRestaurant' };

export default function ProjectDetail() {
  const { t } = useLanguage();
  const params = useParams();
  const project = PROJECTS.find(p => p.id === params.slug) || PROJECTS[0];
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
    { label: t('projectDetail.materials'), value: t('projectDetail.materialsValue') },
    { label: t('projectDetail.duration'), value: t('projectDetail.durationValue') },
  ];

  return (
    <>
      <section className="pt-28 md:pt-36 pb-8 px-6 md:px-12 lg:px-16 bg-white">
        <div ref={heroRef} className="opacity-0">
          <Link href="/portfolio" className="text-[11px] tracking-[0.2em] uppercase text-dark-grey/40 hover:text-gold transition-colors duration-300 mb-8 inline-block">{t('projectDetail.backToPortfolio')}</Link>
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
                <p className="text-[10px] tracking-[0.2em] uppercase text-dark-grey/40 mb-1">{item.label}</p>
                <p className="text-charcoal font-medium text-sm">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2 space-y-8">
            <h2 className="font-serif text-heading text-charcoal">{t('projectDetail.briefHeading')}</h2>
            <p className="text-dark-grey/70 leading-relaxed">{t('projectDetail.briefText')}</p>
            <h2 className="font-serif text-heading text-charcoal pt-8">{t('projectDetail.approachHeading')}</h2>
            <p className="text-dark-grey/70 leading-relaxed">{t('projectDetail.approachText')}</p>
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="aspect-[3/4] overflow-hidden"><img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" /></div>
              <div className="aspect-[3/4] overflow-hidden"><img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" /></div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-warm-white">
        <Link href={`/portfolio/${nextProject.id}`} className="group block">
          <div className="px-6 md:px-12 lg:px-16 py-16 md:py-20 flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-dark-grey/40 mb-3">{t('projectDetail.nextProject')}</p>
              <h3 className="font-serif text-3xl md:text-4xl text-charcoal group-hover:text-gold transition-colors duration-300">{npk ? t(`projectsList.${npk}.title`) : nextProject.title}</h3>
              <p className="text-dark-grey/40 text-sm mt-2">{t(`categories.${nextProject.category}`) || nextProject.category} — {nextProject.location}</p>
            </div>
            <div className="mt-6 md:mt-0 w-24 h-24 md:w-32 md:h-32 overflow-hidden shrink-0"><img src={nextProject.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" /></div>
          </div>
        </Link>
      </section>
    </>
  );
}
