'use client';

import { useRevealAnimation, useStaggerReveal } from '@/hooks/useGSAP';
import { useLanguage } from '@/context/LanguageContext';

const GALLERY_IMAGES = [
  'https://instagram.fpnq26-1.fna.fbcdn.net/v/t51.82787-15/685136336_18205305295338845_827371784558748825_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=Mzg5MTcxNzc3ODAxMjkzODg3Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuNTU2LnNkci5yZWd1bGFyX3Bob3RvLkMzIn0%3D&_nc_ohc=t4FS39i20CUQ7kNvwH4QxZt&_nc_oc=AdqImVGW8Hjc27qrYGH4sLqUwAaNcQ-lpBNbSFuDlrBKrNTxgrRjns3K0E2HUOdxOR0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fpnq26-1.fna&_nc_gid=IjaoucTdZ4k69Q96nyQL9A&_nc_ss=7a22e&oh=00_AQD8xucqD7duwC27sa37woCzb3VRevgOUB7NAR-VIrxo1Q&oe=6A6E57ED',
  'https://instagram.fpnq26-1.fna.fbcdn.net/v/t51.82787-15/671169721_18204809437338845_8885038075055066416_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=Mzg4ODIxMzI4Mjc0NjEwOTQxNQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=f0A0GVTJW7UQ7kNvwFdUTqf&_nc_oc=AdoZ55fpl1zMRuU-y1HOOYvErEI4GuaVPsr3HEdg3dubSzHA6d5B3kl6PtePksdRaDk&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fpnq26-1.fna&_nc_gid=IjaoucTdZ4k69Q96nyQL9A&_nc_ss=7a22e&oh=00_AQAjvnvyCQehHO77ScJkY7djonf9sGwLd2TTE3PWCKEgEg&oe=6A6E5A18',
  'https://instagram.fpnq26-1.fna.fbcdn.net/v/t51.82787-15/683762691_18204696460338845_2076256067042973193_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=Mzg4NzQ0MDg4NzQ3MDkzNzM2Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=3swv60YNwYMQ7kNvwEoJ_JW&_nc_oc=Ado5Z_uqDGFws44n6WHPvtLQMKD8blfzzZyKOYoE7k_SukpFpJnPh6SemwBEzvf4MuE&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fpnq26-1.fna&_nc_gid=IjaoucTdZ4k69Q96nyQL9A&_nc_ss=7a22e&oh=00_AQA97chcg0b0zxC77yB-qaxqpG92mCZg3lDsbtpw9SCiMw&oe=6A6E4C7F',
  'https://instagram.fpnq26-1.fna.fbcdn.net/v/t51.82787-15/527706034_18175291378338845_2771042152604889357_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ig_cache_key=MzY5MzMwMzkwODE3NDE1NTAxMg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=HOOHlnDky_oQ7kNvwFhluvV&_nc_oc=Adp1lP-ER0m-HOVr8No-ZA6SjOvye3inmRcIPC1zwV4qIfsnuHcAIrX6AMEPyKWZNrk&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fpnq26-1.fna&_nc_gid=Zv9sZ_T9BCIUwu_Z9OG0Tg&_nc_ss=7a22e&oh=00_AQDg2fjyISoxeGA7Mv6cj2RRlGgb4wtgh4GCVJE5JRcDYA&oe=6A6E397F',
  'https://instagram.fpnq26-1.fna.fbcdn.net/v/t51.82787-15/652561161_17964069591046794_5040066033079324390_n.webp?_nc_cat=100&ig_cache_key=MzUzMTcwMjIyMzQxODEzMDYxOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=XFdWiQ2xHvIQ7kNvwEY3-hH&_nc_oc=Adr4eOkrCtK_M9D7PLpYVmMtbezUkV03mutcBMmQPeYRM_z5dFocmPmJhOWU6jSarzI&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fpnq26-1.fna&_nc_gid=9zlCz1u2ULsiYUQQa54abg&_nc_ss=7a22e&oh=00_AQD_THLSYBtDJrIfW2_88qxdFMNujKeZE83kssaHUwPyrg&oe=6A6E5A13',
  'https://instagram.fpnq26-1.fna.fbcdn.net/v/t51.82787-15/655228769_18089842109178746_2270282799230115432_n.webp?_nc_cat=102&ig_cache_key=MzUzMzcxNTc1MjExMTA3MTAxNA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=tSeuBemjK4QQ7kNvwE71MaG&_nc_oc=AdqSAS5r3NLZZvOeBVnSfTSRMfZT-tZa9bxQ1pvM31905q9mO_2F3nDaiVlyfPY4DA8&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fpnq26-1.fna&_nc_gid=9zlCz1u2ULsiYUQQa54abg&_nc_ss=7a22e&oh=00_AQA5pUUKyhj1clmuQIEWCDRlALNBxJEEgL48QAWTg8RT_A&oe=6A6E41AD',
];

export default function InstagramGallery() {
  const { t } = useLanguage();
  const headingRef = useRevealAnimation({ y: 30 });
  const gridRef = useStaggerReveal();

  return (
    <section className="py-24 md:py-32 bg-white">
      <div ref={headingRef} className="px-6 md:px-12 lg:px-16 text-center mb-12 opacity-0">
        <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4">{t('instagram.eyebrow')}</p>
        <h2 className="font-serif text-display text-charcoal">@yogeshchavan_associates</h2>
      </div>
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {GALLERY_IMAGES.map((src, i) => (
          <a key={i} data-stagger href="https://www.instagram.com/yogeshchavan_associates?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="group relative aspect-square overflow-hidden">
            <img src={src} alt={`YCA gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300 flex items-center justify-center">
              <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
