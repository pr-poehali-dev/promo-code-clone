import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { reviews } from '@/data/reviews';
import { bookmakers } from '@/data/bookmakers';

const BookmakerReview = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const data = slug ? reviews[slug] : undefined;

  if (!data) return <Navigate to="/" replace />;

  const bk = bookmakers.find((b) => b.name === data.name);

  const generalInfo = [
    { label: 'Год основания', value: data.founded },
    { label: 'Маржа', value: data.margin },
    { label: 'Выкуп ставки', value: data.cashout },
    { label: 'Вывод денег', value: data.payout },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[hsl(168_46%_9%)] border-b border-white/5 py-5">
        <div className="max-w-4xl mx-auto px-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10 hover:text-accent"
          >
            <Icon name="ArrowLeft" size={22} />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{data.name}</h1>
            <p className="text-sm text-white/60">Букмекерская контора: обзор и отзывы</p>
          </div>
        </div>
      </header>

      <div className="border-b border-white/5 bg-gradient-to-b from-[hsl(168_40%_9%)] to-background py-10">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              {bk?.image ? (
                <img
                  src={bk.image}
                  alt={data.name}
                  className="h-14 w-auto max-w-[220px] object-contain"
                />
              ) : (
                <div
                  className={`w-20 h-20 rounded-lg flex items-center justify-center text-white font-black text-2xl ${bk?.color ?? 'bg-muted'}`}
                >
                  {bk?.short}
                </div>
              )}

              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start mb-3">
                  <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={22} />
                  <span className="text-3xl font-bold text-yellow-500">{data.score}</span>
                  <span className="text-sm text-muted-foreground">из 10</span>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Icon name="Globe" size={16} />
                    <span>{data.site}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Icon name="CheckCircle" size={16} className="text-green-600" />
                    <span>Лицензия ФНС: есть</span>
                  </div>
                </div>
              </div>

              {bk && (
                <div className="text-center bg-muted rounded-lg p-4 min-w-[160px]">
                  <div className="text-xs text-muted-foreground mb-1">Бонус новичкам</div>
                  <div className="text-2xl font-bold text-accent">{bk.bonus}</div>
                  <Button className="mt-3 w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Получить
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Общая информация</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {generalInfo.map((item) => (
              <Card key={item.label} className="p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                <div className="font-bold text-lg">{item.value}</div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Детальный рейтинг</h2>
          <Card className="p-6">
            <div className="space-y-4">
              {data.ratings.map((c) => (
                <div key={c.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{c.name}</span>
                    <span className="text-sm text-muted-foreground">{c.score}/5</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all"
                      style={{ width: `${(c.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="ThumbsUp" className="text-green-600" />
              Преимущества
            </h2>
            <ul className="space-y-2">
              {data.pros.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <Icon name="Check" className="text-green-600 mt-0.5 shrink-0" size={16} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="ThumbsDown" className="text-red-600" />
              Недостатки
            </h2>
            <ul className="space-y-2">
              {data.cons.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm">
                  <Icon name="X" className="text-red-600 mt-0.5 shrink-0" size={16} />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">О компании</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            {data.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Card>

        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Топ подборки</h2>
          <ul className="space-y-2">
            {data.topCategories.map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Trophy" size={16} className="text-accent" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="gap-2"
            onClick={() => navigate(`/reviews/${encodeURIComponent(data.name)}`)}
          >
            Смотреть отзывы
            <Icon name="MessageSquare" size={18} />
          </Button>
          <Button size="lg" variant="outline" className="gap-2" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={16} />
            Вернуться к списку букмекеров
          </Button>
        </div>
      </main>

      <footer className="bg-[hsl(168_46%_9%)] border-t border-white/5 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-white/50 space-y-2">
          <p>© 2026 БКрейтинг. Информационный портал.</p>
          <p className="text-xs">
            Ставки на спорт доступны лицам старше 18 лет. Азартные игры могут вызывать
            зависимость.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BookmakerReview;