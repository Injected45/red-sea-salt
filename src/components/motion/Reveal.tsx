'use client';

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

type Variant = 'up' | 'right' | 'scale';

type Tag = 'div' | 'section' | 'article' | 'header' | 'footer' | 'main' | 'aside' | 'span' | 'figure';

interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  as?: Tag;
  once?: boolean;
}

const variantClass: Record<Variant, string> = {
  up: 'reveal',
  right: 'reveal-right',
  scale: 'reveal-scale',
};

export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  className = '',
  as = 'div',
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [once]);

  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return createElement(
    as,
    {
      ref,
      style,
      className: `${variantClass[variant]} ${visible ? 'is-visible' : ''} ${className}`,
    },
    children,
  );
}
