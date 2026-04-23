'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import Logo from '../Logo';
import LocaleSwitcher from '../LocaleSwitcher';

const navItems = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/products', key: 'products' },
  { href: '/industries', key: 'industries' },
  { href: '/faq', key: 'faq' },
  { href: '/contact', key: 'contact' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-brand-100 bg-ivory-50/90 shadow-sm backdrop-blur'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between gap-4">
        <Link href="/" className="shrink-0 transition-opacity hover:opacity-80">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`relative text-sm font-medium transition-colors ${
                  active ? 'text-brand-900' : 'text-brand-700 hover:text-brand-900'
                }`}
              >
                {t(item.key)}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <Link href="/contact" className="btn-primary hidden md:inline-flex !py-2.5 !text-xs">
            {t('requestQuote')}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-200 bg-white/60 backdrop-blur lg:hidden cursor-pointer"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d={open ? 'M5 5l10 10M15 5L5 15' : 'M3 6h14M3 10h14M3 14h14'}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-brand-100 bg-ivory-50 lg:hidden">
          <nav className="container mx-auto flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === item.href
                    ? 'bg-brand-50 text-brand-900'
                    : 'text-brand-700 hover:bg-brand-50'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              {t('requestQuote')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
