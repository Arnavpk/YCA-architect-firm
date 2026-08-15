'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRevealAnimation } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const JEWELLERY_IMAGES = [
    'https://res.cloudinary.com/dmjaisk94/image/upload/v1786814984/0F28CF92-69E0-4702-AAFC-8B72D4ADF00E_gv7p0a.png',
    'https://res.cloudinary.com/dmjaisk94/image/upload/v1786814982/7C79AE14-61A3-4435-9983-68943FB83BF0_crwo6y.png',
    'https://res.cloudinary.com/dmjaisk94/image/upload/v1786814959/527D6BC1-0382-45B5-B2F1-C0BBB2DE68C2_phzhxk.png',
    'https://res.cloudinary.com/dmjaisk94/image/upload/v1786814934/F4A9E657-90FC-4C7A-9239-D2DE51588728_qehbrb.png',
    'https://res.cloudinary.com/dmjaisk94/image/upload/v1786814911/333CC337-F49A-4CFB-8FF9-151737EFC390_lobmao.png',
];

export default function JewelleryShowcase() {
    const { t } = useLanguage();
    const headingRef = useRevealAnimation({ y: 50 });
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const cards = track.querySelectorAll('.jewellery-card');
        gsap.fromTo(cards, { y: 60, opacity: 0 }, {
            y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: track, start: 'top 85%', toggleActions: 'play none none none' },
        });
        return () => { ScrollTrigger.getAll().forEach(st => { if (st.trigger === track) st.kill(); }); };
    }, []);

    return (
        <section id="jewellery" className="py-24 md:py-32 bg-charcoal scroll-mt-28">
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
                        {t('jewelleryShowcase.viewProject')}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M3 8H13M13 8L8 3M13 8L8 13" />
                        </svg>
                    </Link>
                </div>
            </div>
            <div className="overflow-x-auto scrollbar-hide">
                <div ref={trackRef} className="flex gap-4 md:gap-6 pl-6 md:pl-12 lg:pl-16 pr-6 md:pr-12 lg:pr-16 pb-4" style={{ minWidth: 'max-content' }}>
                    {JEWELLERY_IMAGES.map((src, i) => (
                        <div key={i} className="jewellery-card shrink-0 w-[280px] md:w-[380px] lg:w-[450px]">
                            <div className="relative overflow-hidden aspect-[4/3] group">
                                <img
                                    src={src}
                                    alt={`Jewellery store design ${i + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}