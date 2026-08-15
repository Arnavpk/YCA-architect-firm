'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRevealAnimation } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const JEWELLERY_IMAGES = [
    'https://res.cloudinary.com/dmjaisk94/image/upload/v1785751941/Fancy_re_1_habzol.jpg',
    'https://res.cloudinary.com/dmjaisk94/image/upload/v1785751941/Fancy_re_2_evfgmx.jpg',
    'https://res.cloudinary.com/dmjaisk94/image/upload/v1785751941/Fancy_re_1_habzol.jpg',
    'https://res.cloudinary.com/dmjaisk94/image/upload/v1785751941/Fancy_re_2_evfgmx.jpg',
];

export default function JewelleryShowcase() {
    const { t } = useLanguage();
    const headingRef = useRevealAnimation({ y: 50 });
    const scrollContainerRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        const track = trackRef.current;
        if (!container || !track) return;
        const totalScroll = track.scrollWidth - container.offsetWidth;
        if (totalScroll <= 0) return;
        const st = ScrollTrigger.create({
            trigger: container,
            start: 'top 15%',
            end: () => `+=${totalScroll}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            animation: gsap.to(track, { x: -totalScroll, ease: 'none' }),
        });
        return () => st.kill();
    }, []);

    return (
        <section className="py-24 md:py-32 bg-charcoal">
            <div ref={headingRef} className="px-6 md:px-12 lg:px-16 mb-16 opacity-0">
                <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4">
                    {t('jewelleryShowcase.eyebrow')}
                </p>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-2xl">
                        <h2 className="font-serif text-display text-white/90 mb-6">
                            {t('jewelleryShowcase.heading')}
                        </h2>
                        <p className="text-white/40 leading-relaxed">
                            {t('jewelleryShowcase.description')}
                        </p>
                    </div>
                    <Link
                        href="/portfolio/fancy-re-jewellery-studio"
                        className="inline-flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase text-gold hover:text-white transition-colors duration-300 shrink-0"
                    >
                        View Project
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M3 8H13M13 8L8 3M13 8L8 13" />
                        </svg>
                    </Link>
                </div>
            </div>
            <div ref={scrollContainerRef} className="overflow-hidden">
                <div ref={trackRef} className="flex gap-4 md:gap-6 pl-6 md:pl-12 lg:pl-16 pr-24">
                    {JEWELLERY_IMAGES.map((src, i) => (
                        <div key={i} className="shrink-0 w-[320px] md:w-[450px] lg:w-[550px]">
                            <div className="relative overflow-hidden aspect-[4/3]">
                                <img
                                    src={src}
                                    alt={`Jewellery store design ${i + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}