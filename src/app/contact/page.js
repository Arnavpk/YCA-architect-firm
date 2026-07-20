'use client';

import { useState } from 'react';
import { COMPANY } from '@/lib/constants';
import { useRevealAnimation, useLineReveal } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { t, tArray } = useLanguage();
  const heroRef = useRevealAnimation({ y: 60 });
  const formRef = useRevealAnimation({ y: 50, delay: 0.2 });
  const infoRef = useRevealAnimation({ y: 50, delay: 0.1 });
  const lineRef = useLineReveal();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const svcOptions = t('formOptions.services');
  const budgetOptions = t('formOptions.budgets');

  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-6 md:px-12 lg:px-16 bg-white">
        <div ref={heroRef} className="max-w-3xl opacity-0">
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-6">{t('contactPage.eyebrow')}</p>
          <h1 className="font-serif text-display-lg text-charcoal mb-6">{t('contactPage.heading')}</h1>
          <p className="text-dark-grey/60 text-lg leading-relaxed">{t('contactPage.description')}</p>
        </div>
      </section>
      <div ref={lineRef} className="mx-6 md:mx-12 lg:mx-16 h-px bg-soft-grey" />
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div ref={formRef} className="opacity-0">
            {submitted ? (
              <div className="text-center py-20">
                <span className="text-gold text-5xl mb-6 block">✓</span>
                <h3 className="font-serif text-2xl text-charcoal mb-3">{t('contactPage.formSuccess')}</h3>
                <p className="text-dark-grey/50">{t('contactPage.formSuccessMessage')}</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[11px] tracking-[0.15em] uppercase text-dark-grey/50 mb-2 block">{t('contactPage.formName')} *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border-b border-soft-grey py-3 bg-transparent text-charcoal outline-none focus:border-gold transition-colors duration-300" />
                  </div>
                  <div>
                    <label className="text-[11px] tracking-[0.15em] uppercase text-dark-grey/50 mb-2 block">{t('contactPage.formEmail')} *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border-b border-soft-grey py-3 bg-transparent text-charcoal outline-none focus:border-gold transition-colors duration-300" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[11px] tracking-[0.15em] uppercase text-dark-grey/50 mb-2 block">{t('contactPage.formPhone')}</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border-b border-soft-grey py-3 bg-transparent text-charcoal outline-none focus:border-gold transition-colors duration-300" />
                  </div>
                  <div>
                    <label className="text-[11px] tracking-[0.15em] uppercase text-dark-grey/50 mb-2 block">{t('contactPage.formService')}</label>
                    <select name="service" value={formData.service} onChange={handleChange} className="w-full border-b border-soft-grey py-3 bg-transparent text-charcoal outline-none focus:border-gold transition-colors duration-300 appearance-none">
                      <option value="">{t('contactPage.formServicePlaceholder')}</option>
                      {Array.isArray(svcOptions) && svcOptions.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.15em] uppercase text-dark-grey/50 mb-2 block">{t('contactPage.formBudget')}</label>
                  <select name="budget" value={formData.budget} onChange={handleChange} className="w-full border-b border-soft-grey py-3 bg-transparent text-charcoal outline-none focus:border-gold transition-colors duration-300 appearance-none">
                    <option value="">{t('contactPage.formBudgetPlaceholder')}</option>
                    {Array.isArray(budgetOptions) && budgetOptions.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.15em] uppercase text-dark-grey/50 mb-2 block">{t('contactPage.formMessage')} *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full border-b border-soft-grey py-3 bg-transparent text-charcoal outline-none focus:border-gold transition-colors duration-300 resize-none" placeholder={t('contactPage.formMessagePlaceholder')} />
                </div>
                <button onClick={(e) => { e.preventDefault(); setSubmitted(true); }} className="btn-luxury btn-gold mt-4"><span>{t('contactPage.formSubmit')}</span></button>
              </div>
            )}
          </div>
          <div ref={infoRef} className="opacity-0 space-y-10">
            <div><h3 className="text-[11px] tracking-[0.2em] uppercase text-dark-grey/40 mb-4">{t('contactPage.visitUs')}</h3><p className="text-charcoal leading-relaxed">{COMPANY.address.line1}<br />{COMPANY.address.line2}</p></div>
            <div><h3 className="text-[11px] tracking-[0.2em] uppercase text-dark-grey/40 mb-4">{t('contactPage.reachOut')}</h3><div className="space-y-2"><a href={`tel:${COMPANY.phone}`} className="block text-charcoal hover:text-gold transition-colors duration-300">{COMPANY.phone}</a><a href={`mailto:${COMPANY.email}`} className="block text-charcoal hover:text-gold transition-colors duration-300">{COMPANY.email}</a></div></div>
            <div><h3 className="text-[11px] tracking-[0.2em] uppercase text-dark-grey/40 mb-4">{t('contactPage.hours')}</h3><p className="text-charcoal">{COMPANY.hours}</p></div>
            <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3.5 text-[12px] tracking-[0.15em] uppercase hover:bg-[#22c55e] transition-colors duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              <span>{t('contactPage.whatsapp')}</span>
            </a>
            <div className="mt-8"><div className="aspect-[4/3] bg-warm-beige overflow-hidden"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.68076308974!2d73.72287834999999!3d18.524564449999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="YCA Studio Location" /></div></div>
          </div>
        </div>
      </section>
    </>
  );
}
