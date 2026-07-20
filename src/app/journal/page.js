'use client';

import Link from 'next/link';
import { useRevealAnimation, useStaggerReveal } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

const POST_IMAGES = [
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
];
const POST_DATES = ['March 2024', 'February 2024', 'January 2024', 'December 2023'];

export default function JournalPage() {
  const { t, tArray } = useLanguage();
  const heroRef = useRevealAnimation({ y: 60 });
  const gridRef = useStaggerReveal();
  const posts = tArray('journalPosts');

  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-6 md:px-12 lg:px-16 bg-white">
        <div ref={heroRef} className="max-w-3xl opacity-0">
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-6">{t('journalPage.eyebrow')}</p>
          <h1 className="font-serif text-display-lg text-charcoal mb-6">{t('journalPage.heading')}</h1>
          <p className="text-dark-grey/60 text-lg leading-relaxed">{t('journalPage.description')}</p>
        </div>
      </section>
      <section className="px-6 md:px-12 lg:px-16 pb-24 md:pb-40 bg-white">
        <div ref={gridRef}>
          {posts[0] && (
            <Link href={`/journal/${posts[0].slug}`} data-stagger className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 pb-16 border-b border-soft-grey">
              <div className="overflow-hidden aspect-[16/10]"><img src={POST_IMAGES[0]} alt={posts[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" /></div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4"><span className="text-gold text-[11px] tracking-[0.2em] uppercase">{posts[0].category}</span><span className="text-dark-grey/30 text-xs">·</span><span className="text-dark-grey/30 text-xs">{POST_DATES[0]}</span></div>
                <h2 className="font-serif text-heading text-charcoal group-hover:text-gold transition-colors duration-300 mb-4">{posts[0].title}</h2>
                <p className="text-dark-grey/50 leading-relaxed mb-6">{posts[0].excerpt}</p>
                <span className="text-[11px] tracking-[0.15em] uppercase text-dark-grey/40">{posts[0].readTime}</span>
              </div>
            </Link>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {posts.slice(1).map((post, i) => (
              <Link href={`/journal/${post.slug}`} key={post.slug} data-stagger className="group">
                <div className="overflow-hidden aspect-[4/3] mb-5"><img src={POST_IMAGES[i + 1]} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" /></div>
                <div className="flex items-center gap-3 mb-3"><span className="text-gold text-[10px] tracking-[0.2em] uppercase">{post.category}</span><span className="text-dark-grey/20 text-xs">·</span><span className="text-dark-grey/30 text-xs">{POST_DATES[i + 1]}</span></div>
                <h3 className="font-serif text-lg text-charcoal group-hover:text-gold transition-colors duration-300 mb-2">{post.title}</h3>
                <p className="text-dark-grey/40 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
