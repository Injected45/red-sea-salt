'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from 'react';
import { useTranslations } from 'next-intl';

type Props = {
  images: string[];
  alt: string;
};

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const ZOOM_STEP = 2.5;

export default function ProductGallery({ images, alt }: Props) {
  const t = useTranslations('home.gallery');
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragStart = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const pinchRef = useRef<{ distance: number; scale: number } | null>(null);
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());

  const resetZoom = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const open = useCallback(
    (i: number) => {
      setActiveIndex(i);
      setOpenIndex(i);
      resetZoom();
    },
    [resetZoom],
  );

  const close = useCallback(() => {
    setOpenIndex(null);
    resetZoom();
  }, [resetZoom]);

  const go = useCallback(
    (delta: number) => {
      setOpenIndex((i) => {
        if (i === null) return null;
        const next = (i + delta + images.length) % images.length;
        setActiveIndex(next);
        return next;
      });
      resetZoom();
    },
    [images.length, resetZoom],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === '+' || e.key === '=')
        setScale((s) => clamp(s + 0.5, MIN_SCALE, MAX_SCALE));
      if (e.key === '-' || e.key === '_')
        setScale((s) => clamp(s - 0.5, MIN_SCALE, MAX_SCALE));
      if (e.key === '0') resetZoom();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, go, resetZoom]);

  const onWheel = (e: ReactWheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.005;
    setScale((s) => clamp(s + delta, MIN_SCALE, MAX_SCALE));
  };

  const onDoubleClick = () => {
    setScale((s) => {
      if (s > 1) {
        setOffset({ x: 0, y: 0 });
        return 1;
      }
      return ZOOM_STEP;
    });
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLImageElement>) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointersRef.current.size === 2) {
      const [a, b] = Array.from(pointersRef.current.values());
      pinchRef.current = {
        distance: Math.hypot(a.x - b.x, a.y - b.y),
        scale,
      };
      dragStart.current = null;
      return;
    }
    if (scale > 1) {
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        ox: offset.x,
        oy: offset.y,
      };
    }
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLImageElement>) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2 && pinchRef.current) {
      const [a, b] = Array.from(pointersRef.current.values());
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const ratio = d / pinchRef.current.distance;
      setScale(clamp(pinchRef.current.scale * ratio, MIN_SCALE, MAX_SCALE));
      return;
    }

    if (dragStart.current && scale > 1) {
      setOffset({
        x: dragStart.current.ox + (e.clientX - dragStart.current.x),
        y: dragStart.current.oy + (e.clientY - dragStart.current.y),
      });
    }
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLImageElement>) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;
    if (pointersRef.current.size === 0) dragStart.current = null;
  };

  const transform = useMemo(
    () => `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
    [offset.x, offset.y, scale],
  );

  if (images.length === 0) return null;

  return (
    <>
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => open(activeIndex)}
          className="group relative block w-full overflow-hidden rounded-3xl border border-brand-100 bg-brand-50 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={t('viewImage')}
        >
          <div
            className="aspect-[4/3] bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
            style={{ backgroundImage: `url(${images[activeIndex]})` }}
            role="img"
            aria-label={alt}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/70 text-brand-900 backdrop-blur-sm opacity-0 transition group-hover:opacity-100 rtl:right-auto rtl:left-4"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </button>

        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 lg:grid-cols-6">
            {images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => {
                  setActiveIndex(i);
                }}
                onDoubleClick={() => open(i)}
                className={`group relative aspect-square overflow-hidden rounded-xl border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer ${
                  i === activeIndex
                    ? 'border-accent ring-2 ring-accent/40'
                    : 'border-brand-100 hover:border-accent/40'
                }`}
                aria-label={`${alt} — ${i + 1}`}
                aria-current={i === activeIndex}
              >
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${src})` }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-900/95 p-4 backdrop-blur-md animate-fade-in md:p-8"
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

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
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
                  go(1);
                }}
                aria-label={t('next')}
                className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 cursor-pointer rtl:right-auto rtl:left-4"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          <div
            className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1 text-white backdrop-blur"
            onClick={(e) => e.stopPropagation()}
          >
            <ZoomBtn
              label="−"
              ariaLabel="Zoom out"
              onClick={() => setScale((s) => clamp(s - 0.5, MIN_SCALE, MAX_SCALE))}
              disabled={scale <= MIN_SCALE}
            />
            <span className="min-w-[4ch] px-2 text-center text-xs tabular-nums text-white/90">
              {Math.round(scale * 100)}%
            </span>
            <ZoomBtn
              label="+"
              ariaLabel="Zoom in"
              onClick={() => setScale((s) => clamp(s + 0.5, MIN_SCALE, MAX_SCALE))}
              disabled={scale >= MAX_SCALE}
            />
            <span className="mx-1 h-5 w-px bg-white/20" aria-hidden />
            <button
              type="button"
              onClick={resetZoom}
              className="rounded-full px-3 py-1 text-xs font-semibold transition hover:bg-white/15 cursor-pointer disabled:opacity-40"
              disabled={scale === 1 && offset.x === 0 && offset.y === 0}
            >
              Reset
            </button>
          </div>

          <figure
            className="relative flex max-h-[90vh] w-full max-w-6xl items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onWheel={onWheel}
          >
            <img
              src={images[openIndex]}
              alt={alt}
              draggable={false}
              onDoubleClick={onDoubleClick}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              className="max-h-[85vh] max-w-full select-none rounded-2xl shadow-2xl transition-transform duration-[60ms] ease-out will-change-transform"
              style={{
                transform,
                cursor: scale > 1 ? (dragStart.current ? 'grabbing' : 'grab') : 'zoom-in',
                touchAction: 'none',
              }}
            />
          </figure>

          {images.length > 1 && (
            <p className="absolute bottom-16 left-1/2 -translate-x-1/2 text-xs text-white/70">
              {openIndex + 1} / {images.length}
            </p>
          )}
        </div>
      )}
    </>
  );
}

function ZoomBtn({
  label,
  ariaLabel,
  onClick,
  disabled,
}: {
  label: string;
  ariaLabel: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-base font-bold transition hover:bg-white/15 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
    >
      {label}
    </button>
  );
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
