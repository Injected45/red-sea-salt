'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOutAdmin } from '@/app/actions/admin-auth';

const items = [
  { href: '/admin', label: 'Dashboard', exact: true, icon: 'home' },
  { href: '/admin/reviews', label: 'Reviews', exact: false, icon: 'star' },
  { href: '/admin/contacts', label: 'Contacts', exact: false, icon: 'inbox' },
  { href: '/admin/products', label: 'Products', exact: false, icon: 'box' },
  { href: '/admin/content', label: 'Site Content', exact: false, icon: 'edit' },
] as const;

const icons: Record<string, React.ReactNode> = {
  home: <path d="M3 12l9-9 9 9M5 10v10h14V10" />,
  star: <path d="M12 2l3 7h7l-5.5 4.5L18 22l-6-4-6 4 1.5-8.5L2 9h7z" />,
  inbox: <path d="M3 13h6l1 2h4l1-2h6M5 5h14l2 8v6H3v-6z" />,
  box: <path d="M3 7l9-4 9 4-9 4-9-4zm0 0v10l9 4 9-4V7" />,
  edit: <path d="M11 4H6a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4z" />,
};

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ESC closes drawer
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="admin-sidebar"
          onClick={() => setOpen((v) => !v)}
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <Link href="/admin" className="font-display text-base font-bold text-slate-900">
          Red Sea Salt
        </Link>
        <span className="w-10" aria-hidden />
      </header>

      {/* Backdrop (mobile only) */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/40 md:hidden"
        />
      )}

      {/* Sidebar — fixed on desktop, drawer on mobile */}
      <aside
        id="admin-sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-slate-200 bg-white transition-transform duration-200 md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="border-b border-slate-200 px-5 py-5">
          <Link href="/admin" className="font-display text-lg font-bold text-slate-900">
            Red Sea Salt
          </Link>
          <p className="mt-0.5 text-xs text-slate-500">Admin Dashboard</p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {items.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  active
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {icons[item.icon]}
                </svg>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <form action={signOutAdmin} className="border-t border-slate-200 p-3">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-100"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            <span>Sign out</span>
          </button>
        </form>
      </aside>
    </>
  );
}
