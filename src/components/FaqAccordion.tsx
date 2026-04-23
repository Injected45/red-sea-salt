'use client';

import { useState } from 'react';

type Item = { q: string; a: string };

export default function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div key={idx} className="overflow-hidden rounded-2xl border border-brand-100 bg-white">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 px-6 py-4 text-start"
              aria-expanded={isOpen}
            >
              <span className="font-display text-base font-bold text-brand-900 md:text-lg">
                {item.q}
              </span>
              <span
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-200 transition ${
                  isOpen ? 'rotate-45 bg-accent text-white' : 'text-brand-700'
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            <div className={`grid transition-all ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-brand-700">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
