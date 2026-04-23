'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Reveal from '../motion/Reveal';

const images = [
  {
    src: '/products/raw-salt/2.jpg',
    thumb: '/products/raw-salt/2.jpg',
    alt: 'Raw salt crystals',
    captionKey: 'rawHarvest',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: '/products/marine-salt/1.jpeg',
    thumb: '/products/marine-salt/1.jpeg',
    alt: 'Marine solar salt',
    captionKey: 'marine',
    span: 'md:col-span-2',
  },
  {
    src: '/products/tablet-salt/a1.jpg',
    thumb: '/products/tablet-salt/a1.jpg',
    alt: 'Salt tablets',
    captionKey: 'tablets',
    span: '',
  },
  {
    src: '/products/de-icing-rock-salt/a1.jpg',
    thumb: '/products/de-icing-rock-salt/a1.jpg',
    alt: 'Bulk rock salt ready for export',
    captionKey: 'rockSalt',
    span: '',
  },
  {
    src: '/products/food-grade-salt/1.jpg',
    thumb: '/products/food-grade-salt/1.jpg',
    alt: 'Food-grade refined salt',
    captionKey: 'foodGrade',
    span: 'md:col-span-2',
  },
  {
    src: '/products/industrial-salt/1.webp',
    thumb: '/products/industrial-salt/1.webp',
    alt: 'Industrial salt production',
    captionKey: 'industrial',
    span: 'md:col-span-2',
  },
];

export default function Gallery() {
  const t = useTranslations('home.gallery');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [],
  );
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + images.length) % images.length,
      ),
    [],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, close, next, prev]);

  return (
    <section className="section relative overflow-hidden bg-ivory-50">
      <div
        className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl"
        aria-hidden
      />

      <div className="container relative mx-auto">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">{t('eyebrow')}</p>
          <h2 className="section-title mt-4 text-balance">
            {t('title')}{' '}
            <span className="italic text-accent-dark">{t('titleItalic')}</span>
          </h2>
          <p className="mt-4 text-brand-700 md:text-lg">{t('subtitle')}</p>
          <div className="divider-ornament mt-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2l2.5 7H22l-6 4.5 2.5 7.5L12 16l-6.5 5L8 13.5 2 9h7.5z" fill="currentColor" />
            </svg>
          </div>
        </Reveal>

        <div className="mt-14 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {images.map((img, i) => (
            <Reveal
              key={i}
              variant="scale"
              delay={i * 80}
              className={`group relative overflow-hidden rounded-2xl ${img.span}`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                onFocus={() => setHoverIndex(i)}
                onBlur={() => setHoverIndex(null)}
                className="relative block h-full w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={`${t(`items.${img.captionKey}`)} — ${t('viewImage')}`}
              >
                <img
                  src={img.thumb}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-brand-900/85 via-brand-900/10 to-transparent transition-opacity duration-500 ${
                    hoverIndex === i ? 'opacity-100' : 'opacity-60'
                  }`}
                />
                <div
                  className={`absolute inset-x-0 bottom-0 p-4 text-white transition-all duration-500 md:p-5 ${
                    hoverIndex === i ? 'translate-y-0' : 'translate-y-1'
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.28em] text-accent-light">
                    {t('captionEyebrow')}
                  </p>
                  <p className="mt-1 font-display text-base leading-tight md:text-xl">
                    {t(`items.${img.captionKey}`)}
                  </p>
                </div>
                <span
                  className={`absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-all duration-500 rtl:right-auto rtl:left-3 md:right-4 md:top-4 rtl:md:left-4 ${
                    hoverIndex === i ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                  }`}
                  aria-hidden
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M10 3H5a2 2 0 00-2 2v5M21 10V5a2 2 0 00-2-2h-5M3 14v5a2 2 0 002 2h5M14 21h5a2 2 0 002-2v-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t(`items.${images[openIndex].captionKey}`)}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-900/90 p-4 animate-fade-in backdrop-blur-md md:p-8"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label={t('close')}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 cursor-pointer rtl:right-auto rtl:left-4"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label={t('prev')}
            className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 cursor-pointer rtl:left-auto rtl:right-4"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label={t('next')}
            className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 cursor-pointer rtl:right-auto rtl:left-4"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <figure
            className="relative max-h-[88vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[openIndex].src}
              alt={images[openIndex].alt}
              className="max-h-[82vh] w-full rounded-2xl object-contain shadow-2xl"
            />
            <figcaption className="mt-4 flex items-center justify-between gap-4 text-white">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-accent-light">
                  {t('captionEyebrow')}
                </p>
                <p className="mt-1 font-display text-lg md:text-xl">
                  {t(`items.${images[openIndex].captionKey}`)}
                </p>
              </div>
              <p className="text-xs text-white/70">
                {openIndex + 1} / {images.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
