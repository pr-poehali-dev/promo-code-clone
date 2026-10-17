import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import FeedList from '@/components/sections/FeedList';
import MatchList from '@/components/sections/MatchList';

const sections: Record<string, { title: string; icon: string; text: string }> = {
  matches: {
    title: 'Матчи',
    icon: 'CalendarDays',
    text: 'Расписание и счёт матчей РПЛ, КХЛ, НХЛ, еврокубков и топовых европейских лиг на ближайшие дни.',
  },
  forecasts: {
    title: 'Прогнозы',
    icon: 'TrendingUp',
    text: 'Свежие прогнозы экспертов на матчи РПЛ, КХЛ, НХЛ, еврокубков и топовых лиг.',
  },
  sport: {
    title: 'Спорт',
    icon: 'Volleyball',
    text: 'Лента спортивных событий: футбол, хоккей, теннис, единоборства и другие виды спорта.',
  },
  news: {
    title: 'Новости',
    icon: 'Newspaper',
    text: 'Главные новости спорта и беттинга из ведущих спортивных изданий.',
  },
};

const Section = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const data = slug ? sections[slug] : undefined;

  if (!data) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-foreground hover:bg-muted"
          >
            <Icon name="ArrowLeft" size={22} />
          </Button>
          <h1 className="text-xl font-extrabold text-foreground sm:text-2xl">{data.title}</h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[hsl(var(--violet))]/10">
            <Icon name={data.icon} fallback="LayoutGrid" size={24} className="text-[hsl(var(--violet))]" />
          </div>
          <div>
            <div className="mb-1 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Онлайн
            </div>
            <p className="text-sm text-muted-foreground sm:text-base">{data.text}</p>
          </div>
        </div>

        {slug === 'matches' ? <MatchList /> : <FeedList type={slug as 'news' | 'sport' | 'forecasts'} />}

        <div className="mt-10 rounded-2xl bg-[hsl(var(--navy))] p-6 text-center text-white sm:p-8">
          <h3 className="mb-2 text-lg font-extrabold sm:text-xl">Где поставить на эти матчи?</h3>
          <p className="mb-5 text-sm text-white/70">Сравните бонусы и условия легальных букмекеров</p>
          <Button
            onClick={() => navigate('/')}
            className="h-12 rounded-xl bg-accent px-6 text-base font-semibold text-white hover:bg-accent/90"
          >
            Смотреть рейтинг букмекеров
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Section;
