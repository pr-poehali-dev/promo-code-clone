import { useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';
import { useFeed } from './api';
import { Chips, SkeletonList, StateBox, timeAgo } from './ui';

const SPORT_ICON: Record<string, string> = {
  Футбол: 'Goal',
  Хоккей: 'Disc',
  Теннис: 'CircleDot',
  Баскетбол: 'Dribbble',
  Единоборства: 'Swords',
  Биатлон: 'Target',
  Авто: 'Car',
  'Фигурное катание': 'Sparkles',
};

const FeedList = ({ type }: { type: 'news' | 'sport' | 'forecasts' }) => {
  const { data, isLoading, isError, refetch, isFetching } = useFeed(type);
  const [filter, setFilter] = useState('Все');
  const [limit, setLimit] = useState(15);

  const cats = useMemo(() => {
    const c = Array.from(new Set((data ?? []).map((i) => i.sport))).filter((s) => s !== 'Другое');
    return ['Все', ...c];
  }, [data]);

  const list = useMemo(
    () => (data ?? []).filter((i) => filter === 'Все' || i.sport === filter),
    [data, filter],
  );

  if (isLoading) return <SkeletonList />;
  if (isError && !data?.length)
    return (
      <StateBox
        icon="WifiOff"
        title="Не удалось загрузить материалы"
        text="Источник временно недоступен. Попробуйте обновить через минуту."
        onRetry={() => refetch()}
      />
    );
  if (!list.length)
    return <StateBox icon="Inbox" title="Пока пусто" text="Свежие материалы появятся совсем скоро." onRetry={() => refetch()} />;

  return (
    <>
      {cats.length > 2 && (
        <Chips
          items={cats}
          value={filter}
          onChange={(v) => {
            setFilter(v);
            setLimit(15);
          }}
        />
      )}
      <div className="space-y-3">
        {list.slice(0, limit).map((i, idx) => (
          <a
            key={i.link}
            href={i.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-4 rounded-2xl bg-white p-4 ring-1 ring-border transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-5"
          >
            {i.image ? (
              <img
                src={i.image}
                alt=""
                loading="lazy"
                className="hidden h-24 w-36 shrink-0 rounded-xl object-cover sm:block"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            ) : (
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--violet))]/10 sm:flex">
                <Icon
                  name={type === 'forecasts' ? 'TrendingUp' : SPORT_ICON[i.sport] ?? 'Newspaper'}
                  fallback="Newspaper"
                  size={22}
                  className="text-[hsl(var(--violet))]"
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                {idx === 0 && filter === 'Все' && (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">Главное</span>
                )}
                {i.sport !== 'Другое' && (
                  <span className="font-semibold text-[hsl(var(--violet))]">{i.sport}</span>
                )}
                <span>{timeAgo(i.date)}</span>
                <span>·</span>
                <span>{i.source}</span>
              </div>
              <h3 className="mb-1 font-bold leading-snug text-foreground group-hover:text-[hsl(var(--violet))]">
                {i.title}
              </h3>
              {i.text && i.text !== i.title && (
                <p className="line-clamp-2 text-sm text-muted-foreground">{i.text}</p>
              )}
            </div>
            <Icon
              name="ArrowUpRight"
              size={18}
              className="hidden shrink-0 text-muted-foreground transition-colors group-hover:text-[hsl(var(--violet))] sm:block"
            />
          </a>
        ))}
      </div>
      {list.length > limit && (
        <button
          onClick={() => setLimit((l) => l + 15)}
          className="mt-5 w-full rounded-xl bg-white py-3 text-sm font-semibold text-foreground ring-1 ring-border hover:bg-muted"
        >
          Показать ещё
        </button>
      )}
      <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Icon name={isFetching ? 'Loader2' : 'RefreshCw'} size={12} className={isFetching ? 'animate-spin' : ''} />
        Обновляется автоматически каждые 5 минут
      </p>
    </>
  );
};

export default FeedList;
