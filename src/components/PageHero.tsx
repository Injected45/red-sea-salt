type Props = {
  title: string;
  subtitle?: string;
};

export default function PageHero({ title, subtitle }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 to-brand-700 py-16 text-white md:py-24">
      <div className="absolute inset-0 opacity-20">
        <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 400" aria-hidden>
          <defs>
            <pattern id="waveHero" width="80" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q 20 0 40 20 T 80 20" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-accent" />
            </pattern>
          </defs>
          <rect width="800" height="400" fill="url(#waveHero)" />
        </svg>
      </div>
      <div className="container relative mx-auto">
        <h1 className="font-display text-4xl font-bold md:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-brand-100 md:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
