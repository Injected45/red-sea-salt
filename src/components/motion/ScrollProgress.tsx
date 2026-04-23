'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const next = total > 0 ? (h.scrollTop / total) * 100 : 0;
      setProgress(next);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-accent via-accent-light to-accent origin-left"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
