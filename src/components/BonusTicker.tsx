import { bookmakers } from '@/data/bookmakers';

const BonusTicker = () => {
  const items = bookmakers.filter((b) => b.siteUrl);
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-b border-border bg-[hsl(var(--navy))] text-white">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[hsl(var(--navy))] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[hsl(var(--navy))] to-transparent" />
      <div className="animate-marquee flex w-max items-center gap-8 py-2">
        {loop.map((b, i) => (
          <a
            key={`${b.id}-${i}`}
            href={b.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 text-xs font-medium text-white/80 transition-colors hover:text-white sm:text-sm"
          >
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-semibold text-white">{b.name}</span>
            <span className="text-white/60">—</span>
            <span className="font-bold text-emerald-300">{b.bonus}</span>
            <span className="text-white/60">{b.bonusNote}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default BonusTicker;
