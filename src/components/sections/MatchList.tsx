import { useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Match, MatchTeam, useMatches } from './api';
import { Chips, SkeletonList, StateBox } from './ui';

const dayLabel = (d: Date) => {
  const today = new Date();
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diff = Math.round((x - t) / 864e5);
  const date = d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'long' });
  if (diff === 0) return `Сегодня, ${date}`;
  if (diff === 1) return `Завтра, ${date}`;
  return date.charAt(0).toUpperCase() + date.slice(1);
};

const Team = ({ t, right }: { t: MatchTeam; right?: boolean }) => (
  <div className={`flex min-w-0 flex-1 items-center gap-2 ${right ? 'flex-row-reverse text-right' : ''}`}>
    {t.logo ? (
      <img src={t.logo} alt="" loading="lazy" className="h-7 w-7 shrink-0 object-contain" />
    ) : (
      <div className="h-7 w-7 shrink-0 rounded-full bg-muted" />
    )}
    <span className="truncate text-sm font-semibold text-foreground">{t.name}</span>
  </div>
);

const Center = ({ m }: { m: Match }) => {
  if (m.state === 'pre')
    return (
      <div className="w-16 shrink-0 text-center text-sm font-bold text-foreground">
        {new Date(m.date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
      </div>
    );
  return (
    <div className="w-20 shrink-0 text-center">
      <div className={`text-base font-extrabold ${m.state === 'in' ? 'text-red-500' : 'text-foreground'}`}>
        {m.home.score ?? 0} : {m.away.score ?? 0}
      </div>
      <div className={`truncate text-[10px] font-semibold uppercase ${m.state === 'in' ? 'text-red-500' : 'text-muted-foreground'}`}>
        {m.state === 'in' ? m.clock || 'Live' : 'Завершён'}
      </div>
    </div>
  );
};

const MatchList = () => {
  const { data, isLoading, isError, refetch, isFetching } = useMatches();
  const [league, setLeague] = useState('Все');

  const leagues = useMemo(
    () => [
      'Все',
      ...Array.from(new Set([...(data ?? [])].sort((a, b) => (a.order ?? 99) - (b.order ?? 99)).map((m) => m.league))),
    ],
    [data],
  );

  const groups = useMemo(() => {
    const list = (data ?? []).filter((m) => league === 'Все' || m.league === league);
    const map = new Map<string, Map<string, Match[]>>();
    for (const m of list) {
      const day = dayLabel(new Date(m.date));
      if (!map.has(day)) map.set(day, new Map());
      const byLeague = map.get(day)!;
      if (!byLeague.has(m.league)) byLeague.set(m.league, []);
      byLeague.get(m.league)!.push(m);
    }
    return Array.from(map.entries()).map(
      ([day, byLeague]) =>
        [day, new Map([...byLeague.entries()].sort((a, b) => (a[1][0].order ?? 99) - (b[1][0].order ?? 99)))] as const,
    );
  }, [data, league]);

  const live = (data ?? []).filter((m) => m.state === 'in').length;

  if (isLoading) return <SkeletonList />;
  if (isError && !data?.length)
    return (
      <StateBox
        icon="WifiOff"
        title="Не удалось загрузить расписание"
        text="Проверьте интернет и попробуйте ещё раз."
        onRetry={() => refetch()}
      />
    );
  if (!groups.length)
    return <StateBox icon="CalendarX" title="Матчей нет" text="В ближайшие дни в выбранной лиге игр не запланировано." />;

  return (
    <>
      {live > 0 && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          Сейчас идёт матчей: {live}
        </div>
      )}
      <Chips items={leagues} value={league} onChange={setLeague} />
      <div className="space-y-8">
        {groups.map(([day, byLeague]) => (
          <section key={day}>
            <h2 className="mb-3 text-lg font-extrabold text-foreground">{day}</h2>
            <div className="space-y-4">
              {Array.from(byLeague.entries()).map(([lg, ms]) => (
                <div key={lg} className="overflow-hidden rounded-2xl bg-white ring-1 ring-border">
                  <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    <Icon
                      name={ms[0].sport === 'hockey' ? 'Disc' : ms[0].sport === 'basketball' ? 'Dribbble' : 'Goal'}
                      fallback="Trophy"
                      size={14}
                    />
                    {lg}
                  </div>
                  {ms.map((m) => (
                    <a
                      key={m.id}
                      href={m.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 border-b border-border px-4 py-3 transition-colors last:border-0 hover:bg-muted/50 ${
                        m.state === 'in' ? 'bg-red-50/50' : ''
                      }`}
                    >
                      <Team t={m.home} />
                      <Center m={m} />
                      <Team t={m.away} right />
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Icon name={isFetching ? 'Loader2' : 'RefreshCw'} size={12} className={isFetching ? 'animate-spin' : ''} />
        Счёт обновляется автоматически · время указано по вашему часовому поясу
      </p>
    </>
  );
};

export default MatchList;
