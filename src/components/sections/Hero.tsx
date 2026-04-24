'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import CountUp from '../motion/CountUp';

const stats = [
  { value: 14, suffix: '+', labelKey: 'years' },
  { value: 6, suffix: '', labelKey: 'products' },
  { value: 100, suffix: '%', labelKey: 'quality' },
  { value: 24, suffix: '/7', labelKey: 'support' },
] as const;

export default function Hero() {
  const t = useTranslations('home.hero');
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsFinePointer(mq.matches);
    const onChange = () => setIsFinePointer(mq.matches);
    mq.addEventListener('change', onChange);

    const onMove = (e: MouseEvent) => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMouse({ x, y });
    };
    const onScroll = () => setScrollY(window.scrollY);
    if (mq.matches) window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      mq.removeEventListener('change', onChange);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const parallax = (depth: number) =>
    isFinePointer
      ? { transform: `translate3d(${mouse.x * depth}px, ${mouse.y * depth}px, 0)` }
      : undefined;
  const scrollParallax = (depth: number) => ({
    transform: `translate3d(0, ${scrollY * depth}px, 0)`,
  });

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-brand-900 text-white"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,164,65,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(47,111,151,0.35),transparent_60%)]"
        aria-hidden
      />
      <div className="grain absolute inset-0" aria-hidden />

      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-full bg-white/40 animate-float-slow"
            style={{
              left: `${(i * 73) % 100}%`,
              top: `${(i * 47) % 100}%`,
              width: `${2 + (i % 4)}px`,
              height: `${2 + (i % 4)}px`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${6 + (i % 5)}s`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 800"
        style={parallax(-12)}
      >
        <defs>
          <pattern id="wave-hero" width="120" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M0 30 Q 30 0 60 30 T 120 30"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
              className="text-accent"
            />
          </pattern>
        </defs>
        <rect width="1200" height="800" fill="url(#wave-hero)" />
      </svg>

      <div
        className="pointer-events-none absolute -top-24 right-[-20%] h-[320px] w-[320px] rounded-full bg-accent/20 blur-3xl md:h-[520px] md:w-[520px] md:right-[-10%]"
        style={parallax(24)}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-[-20%] h-[300px] w-[300px] rounded-full bg-brand-500/40 blur-3xl md:h-[480px] md:w-[480px] md:left-[-8%]"
        style={parallax(-20)}
        aria-hidden
      />

      <div
        className="container relative z-10 mx-auto grid gap-10 py-16 sm:py-20 md:gap-12 md:py-24 lg:grid-cols-12 lg:items-center lg:py-32"
        style={scrollParallax(0.1)}
      >
        <div className="lg:col-span-7">
          <p className="eyebrow !text-accent-light animate-fade-in" style={{ animationDelay: '100ms' }}>
            {t('eyebrow')}
          </p>
          <h1
            className="mt-5 font-display text-[1.75rem] font-semibold leading-[1.1] tracking-tight text-balance break-words sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl animate-fade-up"
            style={{ animationDelay: '200ms' }}
          >
            {t('title').split(' ').map((word, i, arr) => (
              <span key={i}>
                {i === Math.floor(arr.length / 2) - 1 ? (
                  <span className="italic text-accent-light">{word} </span>
                ) : (
                  <>{word} </>
                )}
              </span>
            ))}
          </h1>
          <p
            className="mt-5 max-w-xl text-[13px] leading-relaxed text-brand-100/90 sm:text-sm md:mt-7 md:text-base lg:text-lg animate-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            {t('subtitle')}
          </p>
          <div
            className="mt-8 flex flex-wrap gap-3 animate-fade-up md:mt-10"
            style={{ animationDelay: '600ms' }}
          >
            <Link href="/products" className="btn-accent group">
              <span>{t('ctaPrimary')}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/contact" className="btn-ghost">
              {t('ctaSecondary')}
            </Link>
          </div>

          <div
            className="mt-10 border-t border-white/10 pt-5 animate-fade-up md:mt-14 md:pt-6"
            style={{ animationDelay: '800ms' }}
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-brand-200/70 md:text-[11px]">
              {t('trustedBy')}
            </p>
            <div className="mt-3 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:mt-4">
              <div className="flex shrink-0 animate-marquee gap-6 pr-6 rtl:animate-marquee-rtl md:gap-10 md:pr-10">
                {[...Array(2)].flatMap((_, dup) =>
                  ['sectors.construction', 'sectors.chemicals', 'sectors.food', 'sectors.pools', 'sectors.export', 'sectors.infrastructure', 'sectors.textiles', 'sectors.logistics'].map((key, i) => (
                    <span
                      key={`${dup}-${i}`}
                      className="flex items-center gap-6 whitespace-nowrap md:gap-10"
                    >
                      <span className="font-display text-sm italic text-brand-100/70 md:text-lg">
                        {t(key)}
                      </span>
                      <span className="inline-block h-1 w-1 rounded-full bg-accent/60" aria-hidden />
                    </span>
                  )),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:mx-0 lg:max-w-none" style={parallax(14)}>
          <div className="relative">
            <div
              className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-accent/30 via-brand-500/20 to-transparent blur-2xl md:-inset-6"
              aria-hidden
            />

            <div
              className="relative overflow-hidden rounded-[24px] border border-white/15 bg-white/[0.04] shadow-2xl backdrop-blur-sm md:rounded-[28px]"
              style={parallax(8)}
            >
              <div className="relative aspect-[4/3] md:aspect-[4/5]">
                <img
                  src="/hero.jpeg"
                  alt="Red Sea Salt Works"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-accent-light md:text-[11px]">
                    {t('locationLabel')}
                  </p>
                  <p className="mt-1 font-display text-xl md:mt-2 md:text-2xl">
                    Ras Gharib · <span className="italic text-accent-light">Red Sea</span>
                  </p>
                </div>
              </div>
            </div>

            <div
              className="absolute -left-2 -top-4 rounded-2xl border border-white/15 bg-brand-900/85 p-3 shadow-xl backdrop-blur-md rtl:-left-auto rtl:-right-2 md:-left-4 md:-top-6 md:p-4 rtl:md:-right-4"
              style={parallax(-26)}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-brand-900 md:h-10 md:w-10">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="md:h-[18px] md:w-[18px]">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="font-display text-lg md:text-xl">
                    <CountUp to={100} suffix="%" />
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-brand-100/80 md:text-[11px]">
                    {t('qualityAssured')}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute -bottom-5 right-3 rounded-full border border-accent/40 bg-brand-900/85 px-4 py-2.5 shadow-xl backdrop-blur-md rtl:right-auto rtl:left-3 md:-bottom-8 md:right-6 md:px-5 md:py-3 rtl:md:left-6"
              style={parallax(-18)}
            >
              <div className="text-[9px] uppercase tracking-[0.28em] text-accent-light md:text-[10px]">
                {t('since')}
              </div>
              <div className="font-display text-xl md:text-2xl">2011</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-brand-900/50 backdrop-blur">
        <div className="container mx-auto grid grid-cols-2 divide-x divide-y divide-white/10 sm:divide-y-0 md:grid-cols-4 rtl:divide-x-reverse">
          {stats.map((s, i) => (
            <div key={s.labelKey} className="px-4 py-5 text-center sm:px-6 md:py-8">
              <div className="font-display text-2xl font-semibold text-accent-light sm:text-3xl md:text-4xl">
                <CountUp to={s.value} suffix={s.suffix} duration={1600 + i * 200} />
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-brand-100/80 md:text-[11px]">
                {t(`stats.${s.labelKey}`)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-40 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.28em]">Scroll</span>
        <span className="relative h-10 w-[2px] overflow-hidden bg-white/15">
          <span className="absolute inset-x-0 top-0 h-4 animate-[scrollCue_1.8s_ease-in-out_infinite] bg-accent" />
        </span>
      </div>
    </section>
  );
}
