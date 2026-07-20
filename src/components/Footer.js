'use client';

import Link from 'next/link';
import { COMPANY } from '@/lib/constants';
import { useRevealAnimation, useLineReveal } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

const NAV_KEYS = ['home', 'about', 'services', 'portfolio', 'process', 'journal', 'contact'];
const NAV_HREFS = ['/', '/about', '/services', '/portfolio', '/process', '/journal', '/contact'];
const SVC_KEYS = ['residential', 'commercial', 'office', 'kitchen', 'turnkey', 'architecture'];

export default function Footer() {
  const { t } = useLanguage();
  const titleRef = useRevealAnimation({ y: 40 });
  const lineRef = useLineReveal();

  return (
    <footer className="bg-charcoal text-white">
      <div className="px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div ref={titleRef} className="max-w-4xl">
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-6">{t('footer.ctaEyebrow')}</p>
          <h2 className="font-serif text-display-lg text-white/90 mb-8">{t('footer.ctaHeading')}</h2>
          <Link href="/contact" className="inline-flex items-center gap-3 border border-gold/40 px-8 py-4 text-[12px] tracking-[0.2em] uppercase text-gold hover:bg-gold hover:text-charcoal transition-all duration-500">
            <span>{t('footer.ctaButton')}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </div>
      <div ref={lineRef} className="mx-6 md:mx-12 lg:mx-16 h-px bg-white/10" />
      <div className="px-6 md:px-12 lg:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl mb-4">YCA</h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">{COMPANY.description}</p>
            <div className="flex gap-4 mt-8">
              {Object.entries(COMPANY.social).map(([platform, url]) => (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/40 transition-all duration-300 text-xs uppercase">
                  {platform[0].toUpperCase() + platform[1]}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-6">{t('footer.navigate')}</h4>
            <ul className="space-y-3">
              {NAV_KEYS.map((key, i) => (
                <li key={key}><Link href={NAV_HREFS[i]} className="text-sm text-white/50 hover:text-gold transition-colors duration-300">{t(`nav.${key}`)}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-6">{t('footer.services')}</h4>
            <ul className="space-y-3">
              {SVC_KEYS.map((key) => (
                <li key={key}><Link href={`/services#${key}`} className="text-sm text-white/50 hover:text-gold transition-colors duration-300">{t(`servicesList.${key}.title`)}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-6">{t('footer.studio')}</h4>
            <div className="space-y-4 text-sm text-white/50">
              <p>{COMPANY.address.line1}<br />{COMPANY.address.line2}</p>
              <p>{COMPANY.phone}</p>
              <p>{COMPANY.email}</p>
              <p className="text-white/30">{COMPANY.hours}</p>
            </div>
            <div className="mt-8">
              <h4 className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-4">{t('footer.newsletter')}</h4>
              <div className="flex border-b border-white/15">
                <input type="email" placeholder={t('footer.emailPlaceholder')} className="bg-transparent text-sm text-white/70 placeholder:text-white/20 flex-1 py-3 outline-none" />
                <button className="text-gold text-xs tracking-[0.2em] uppercase hover:text-white transition-colors duration-300 pl-4">{t('footer.join')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 md:px-12 lg:px-16 py-6 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-white/25">{t('footer.copyright').replace('{year}', new Date().getFullYear())}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[11px] text-white/25 hover:text-white/40 transition-colors">{t('footer.privacy')}</Link>
            <Link href="/terms" className="text-[11px] text-white/25 hover:text-white/40 transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
