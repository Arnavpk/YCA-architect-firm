'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { COMPANY } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

const NAV_HREFS = ['/', '/about', '/services', '/portfolio', '/process', '/contact'];
const NAV_KEYS = ['home', 'about', 'services', 'portfolio', 'process', 'contact'];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const overlayRef = useRef(null);

  const isHomeHero = pathname === '/' && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, visibility: 'visible', duration: 0.4, ease: 'power2.out' })
        .to(menuRef.current, { x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
        .fromTo(linksRef.current.filter(Boolean),
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        );
    } else {
      document.body.style.overflow = '';
      gsap.to(menuRef.current, { x: '100%', duration: 0.5, ease: 'power3.inOut' });
      gsap.to(overlayRef.current, { opacity: 0, visibility: 'hidden', duration: 0.3 });
    }
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const handleTrapFocus = useCallback((e) => {
    if (!isOpen || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    if (e.key === 'Escape') setIsOpen(false);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleTrapFocus);
    }
    return () => document.removeEventListener('keydown', handleTrapFocus);
  }, [isOpen, handleTrapFocus]);

  const linkClass = (href) => {
    const isActive = pathname === href;
    if (isHomeHero) {
      return `relative text-[13px] tracking-[0.1em] uppercase transition-colors duration-300 ${isActive ? 'text-gold' : 'text-white/80 hover:text-white'}`;
    }
    return `relative text-[13px] tracking-[0.1em] uppercase transition-colors duration-300 ${isActive ? 'text-gold' : 'text-dark-grey hover:text-charcoal'}`;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]' : isHomeHero ? '' : 'bg-transparent'}`}>
        {isHomeHero && !scrolled && (
          <div className="absolute inset-0 h-[150%] bg-gradient-to-b from-charcoal/70 via-charcoal/25 to-transparent pointer-events-none" />
        )}
        <nav className={`relative flex items-center justify-between px-6 md:px-12 lg:px-16 h-20 md:h-24 ${isHomeHero ? '[text-shadow:0_1px_3px_rgba(0,0,0,0.3)]' : ''}`}>
          <Link href="/" className="relative z-50">
            <div className="flex flex-col">
              <span className={`font-serif text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-300 ${isHomeHero ? 'text-white' : 'text-charcoal'}`}>YCA</span>
              <span className={`text-[10px] tracking-[0.25em] uppercase -mt-1 hidden md:block transition-colors duration-300 ${isHomeHero ? 'text-white/50' : 'text-dark-grey/60'}`}>
                {t('nav.architectureInteriors')}
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {NAV_KEYS.map((key, i) => (
              <Link key={key} href={NAV_HREFS[i]} className={linkClass(NAV_HREFS[i])}>
                {t(`nav.${key}`)}
                {pathname === NAV_HREFS[i] && <span className="absolute -bottom-1 left-0 w-full h-px bg-gold" />}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <LanguageToggle inverse={isHomeHero} />
            <Link href="/contact"
              className={`text-[12px] tracking-[0.15em] uppercase px-6 py-3 transition-all duration-500 ${isHomeHero ? 'text-white border border-white/30 hover:bg-white hover:text-charcoal' : 'text-charcoal border border-charcoal/20 hover:bg-charcoal hover:text-white'}`}>
              {t('nav.bookConsultation')}
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="relative z-50 lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5" aria-label="Toggle menu">
            <span className={`w-6 h-px transition-all duration-300 ${isHomeHero && !isOpen ? 'bg-white' : 'bg-charcoal'} ${isOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`w-6 h-px transition-all duration-300 ${isHomeHero && !isOpen ? 'bg-white' : 'bg-charcoal'} ${isOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </nav>
      </header>

      <div ref={overlayRef} className="fixed inset-0 bg-charcoal/40 z-40 opacity-0 invisible" onClick={() => setIsOpen(false)} />

      <div ref={menuRef} className="fixed top-0 right-0 h-full w-full md:w-[420px] bg-warm-white z-40 translate-x-full flex flex-col justify-center px-12 md:px-16">
        <div className="flex flex-col gap-1">
          {NAV_KEYS.map((key, i) => (
            <Link key={key} href={NAV_HREFS[i]}
              ref={(el) => (linksRef.current[i] = el)}
              className={`font-serif text-3xl md:text-4xl py-3 transition-colors duration-300 ${pathname === NAV_HREFS[i] ? 'text-gold' : 'text-charcoal hover:text-gold'}`}
              onClick={() => setIsOpen(false)}>
              {t(`nav.${key}`)}
            </Link>
          ))}
        </div>
        <LanguageToggle variant="mobile" />
        <Link
          href="/contact"
          onClick={() => setIsOpen(false)}
          className="mt-6 inline-flex items-center justify-center text-[12px] tracking-[0.15em] uppercase text-charcoal border border-charcoal/20 px-6 py-3 hover:bg-charcoal hover:text-white transition-all duration-500"
        >
          {t('nav.bookConsultation')}
        </Link>
        <div className="mt-8 pt-6 border-t border-charcoal/10">
          <a href={`mailto:${COMPANY.email}`} className="text-sm text-dark-grey/60 hover:text-gold transition-colors duration-300 block mb-2">{COMPANY.email}</a>
          <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="text-sm text-dark-grey/60 hover:text-gold transition-colors duration-300 block">{COMPANY.phone}</a>
        </div>
      </div>
    </>
  );
}
