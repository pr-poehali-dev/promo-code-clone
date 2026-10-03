import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const sections: Record<string, { title: string; icon: string; text: string }> = {
  matches: {
    title: 'Матчи',
    icon: 'CalendarDays',
    text: 'Расписание ближайших матчей по футболу, хоккею, баскетболу и теннису с лучшими коэффициентами легальных букмекеров.',
  },
  forecasts: {
    title: 'Прогнозы',
    icon: 'TrendingUp',
    text: 'Экспертные прогнозы на главные спортивные события с разбором формы команд и статистики.',
  },
  contests: {
    title: 'Конкурсы',
    icon: 'Trophy',
    text: 'Конкурсы прогнозов с призами для читателей. Угадывайте исходы матчей и соревнуйтесь с другими игроками.',
  },
  complaints: {
    title: 'Жалобы',
    icon: 'ShieldAlert',
    text: 'Помогаем игрокам решать споры с букмекерами: задержки выплат, блокировки счетов, отказ в бонусах.',
  },
  sport: {
    title: 'Спорт',
    icon: 'Volleyball',
    text: 'Главные спортивные новости, которые влияют на линию и коэффициенты букмекеров.',
  },
  business: {
    title: 'Бизнес',
    icon: 'Briefcase',
    text: 'Новости беттинг-индустрии: доходы букмекеров, спонсорские контракты, изменения в законодательстве.',
  },
  news: {
    title: 'Новости',
    icon: 'Newspaper',
    text: 'Свежие новости букмекерских контор: новые бонусы, акции, обновления приложений и сервисов.',
  },
};

const Section = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const data = slug ? sections[slug] : undefined;

  if (slug === 'news') {
    window.location.replace('https://ria.ru/sport/');
    return null;
  }

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

      <main className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
        <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-border sm:p-10">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--violet))]/10">
            <Icon name={data.icon} fallback="LayoutGrid" size={28} className="text-[hsl(var(--violet))]" />
          </div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Раздел скоро откроется
          </div>
          <h2 className="mb-3 text-2xl font-extrabold text-foreground sm:text-3xl">{data.title}</h2>
          <p className="mx-auto mb-7 max-w-xl text-muted-foreground">{data.text}</p>
          <Button
            onClick={() => navigate('/')}
            className="h-12 rounded-xl bg-[hsl(var(--navy))] px-6 text-base font-semibold text-white hover:bg-[hsl(var(--navy))]/90"
          >
            Смотреть рейтинг букмекеров
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Section;
