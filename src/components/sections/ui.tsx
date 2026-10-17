import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

export const timeAgo = (iso: string) => {
  const diff = (Date.now() - new Date(iso).getTime()) / 60000;
  if (diff < 1) return 'только что';
  if (diff < 60) return `${Math.floor(diff)} мин назад`;
  if (diff < 24 * 60) return `${Math.floor(diff / 60)} ч назад`;
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
};

export const Chips = ({
  items,
  value,
  onChange,
}: {
  items: string[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
    {items.map((c) => (
      <button
        key={c}
        onClick={() => onChange(c)}
        className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
          value === c
            ? 'bg-[hsl(var(--navy))] text-white'
            : 'bg-white text-foreground ring-1 ring-border hover:bg-muted'
        }`}
      >
        {c}
      </button>
    ))}
  </div>
);

export const SkeletonList = ({ rows = 6 }: { rows?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="animate-pulse rounded-2xl bg-white p-5 ring-1 ring-border">
        <div className="mb-3 h-3 w-24 rounded bg-muted" />
        <div className="mb-2 h-4 w-3/4 rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />
      </div>
    ))}
  </div>
);

export const StateBox = ({
  icon,
  title,
  text,
  onRetry,
}: {
  icon: string;
  title: string;
  text: string;
  onRetry?: () => void;
}) => (
  <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-border">
    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
      <Icon name={icon} fallback="Info" size={24} className="text-muted-foreground" />
    </div>
    <h3 className="mb-1 font-bold text-foreground">{title}</h3>
    <p className="mb-5 text-sm text-muted-foreground">{text}</p>
    {onRetry && (
      <Button onClick={onRetry} className="rounded-xl bg-[hsl(var(--navy))] text-white hover:bg-[hsl(var(--navy))]/90">
        <Icon name="RefreshCw" size={16} className="mr-2" />
        Обновить
      </Button>
    )}
  </div>
);
