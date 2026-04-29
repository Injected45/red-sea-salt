'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { markContactRead } from '@/app/actions/admin-contacts';

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  product: string | null;
  message: string;
  locale: string;
  read: boolean;
  created_at: string;
};

export default function ContactRow({ contact }: { contact: Contact }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const toggleRead = () => {
    startTransition(async () => {
      await markContactRead(contact.id, !contact.read);
      router.refresh();
    });
  };

  const truncated = contact.message.length > 120
    ? contact.message.slice(0, 120) + '…'
    : contact.message;

  return (
    <article
      className={`rounded-2xl border bg-white p-5 transition ${
        contact.read ? 'border-slate-200' : 'border-sky-200 ring-1 ring-sky-100'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {!contact.read && (
              <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-sky-800">
                New
              </span>
            )}
            <span className="font-semibold text-slate-900">{contact.name}</span>
            <span className="text-xs text-slate-500">·</span>
            <a href={`mailto:${contact.email}`} className="text-xs text-slate-600 hover:text-slate-900">
              {contact.email}
            </a>
            {contact.phone && (
              <>
                <span className="text-xs text-slate-500">·</span>
                <a href={`tel:${contact.phone}`} className="text-xs text-slate-600 hover:text-slate-900">
                  {contact.phone}
                </a>
              </>
            )}
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-500">{formatDate(contact.created_at)}</span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
            {contact.company && (
              <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700">
                {contact.company}
              </span>
            )}
            {contact.product && (
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-emerald-800">
                {contact.product}
              </span>
            )}
            <span className="rounded bg-slate-100 px-2 py-0.5 font-semibold uppercase text-slate-600">
              {contact.locale}
            </span>
          </div>

          <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
            {open ? contact.message : truncated}
          </div>
          {contact.message.length > 120 && (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="mt-2 text-xs font-semibold text-slate-700 hover:text-slate-900"
            >
              {open ? 'Show less' : 'Show full message'}
            </button>
          )}
        </div>

        <div>
          <button
            type="button"
            onClick={toggleRead}
            disabled={pending}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition disabled:opacity-60 ${
              contact.read
                ? 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                : 'bg-sky-600 text-white hover:bg-sky-700'
            }`}
          >
            {pending ? '…' : contact.read ? 'Mark unread' : 'Mark read'}
          </button>
        </div>
      </div>
    </article>
  );
}

function formatDate(s: string) {
  const d = new Date(s);
  return d.toLocaleString('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
