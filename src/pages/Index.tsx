import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { bookmakers, type Bookmaker } from '@/data/bookmakers';
import BookmakerRow from '@/components/BookmakerRow';
import RatingCriteria from '@/components/RatingCriteria';
import BettingFaq from '@/components/BettingFaq';
import WhyUs from '@/components/WhyUs';

type SortKey = 'rating' | 'bonus' | 'reviews' | 'deposit';

const filters = [
  { id: 'all', label: 'Все БК', icon: 'List' },
  { id: 'bonus', label: 'Крупный бонус', icon: 'Gift' },
  { id: 'lowdep', label: 'Депозит от 100₽', icon: 'Wallet' },
  { id: 'top', label: 'Топ-рейтинг', icon: 'Crown' },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bonusDialogOpen, setBonusDialogOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('rating');
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  const num = (s: string) => parseInt(s.replace(/\D/g, ''), 10) || 0;

  const topBonuses = useMemo(
    () => [...bookmakers].sort((a, b) => num(b.bonus) - num(a.bonus)).slice(0, 6),
    [],
  );

  const visible = useMemo(() => {
    let list: Bookmaker[] = bookmakers.filter((bk) =>
      bk.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (activeFilter === 'bonus') list = list.filter((bk) => num(bk.bonus) >= 10000);
    if (activeFilter === 'lowdep') list = list.filter((bk) => num(bk.minDeposit) <= 100);
    if (activeFilter === 'top') list = list.filter((bk) => bk.rating >= 4.8);

    return [...list].sort((a, b) => {
      if (sortKey === 'rating') return b.rating - a.rating;
      if (sortKey === 'bonus') return num(b.bonus) - num(a.bonus);
      if (sortKey === 'reviews') return b.reviews - a.reviews;
      return num(a.minDeposit) - num(b.minDeposit);
    });
  }, [searchQuery, sortKey, activeFilter]);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary/95 backdrop-blur border-b border-border sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Рейтинг Букмекеров</h1>
              <p className="text-[11px] text-muted-foreground leading-tight">
                независимая оценка легальных БК
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#rating" className="hover:text-accent transition-colors">Рейтинг</a>
            <a href="#criteria" className="hover:text-accent transition-colors">Методика</a>
            <a href="#faq" className="hover:text-accent transition-colors">Вопросы</a>
          </nav>

          <button
            onClick={() => setBonusDialogOpen(true)}
            className="relative p-2 hover:bg-accent/10 rounded-lg transition-colors"
            aria-label="Акции и бонусы"
          >
            <Icon name="Gift" size={22} className="text-accent" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-secondary" />
          </button>
        </div>
      </header>

      <section className="relative border-b border-border overflow-hidden">
        <img
          src="https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/6533da71-bf10-4253-83a7-203519419068.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

        <div className="relative max-w-6xl mx-auto px-4 py-14">
          <Badge variant="outline" className="mb-3 text-accent border-accent/40">
            Обновлено: сентябрь 2026
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 max-w-2xl">
            Рейтинг легальных букмекерских контор России
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-6">
            Сравниваем бонусы, коэффициенты, скорость выплат и качество поддержки. Только
            конторы с лицензией ФНС и членством в ЕЦУПИС.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            {[
              { v: bookmakers.length.toString(), l: 'БК в рейтинге' },
              { v: '12', l: 'критериев оценки' },
              {
                v: bookmakers
                  .reduce((s, b) => s + b.reviews, 0)
                  .toLocaleString('ru-RU'),
                l: 'отзывов игроков',
              },
              { v: '24/7', l: 'мониторинг выплат' },
            ].map((s) => (
              <div
                key={s.l}
                className="bg-card/80 backdrop-blur border border-border rounded-lg p-3 hover:border-accent/50 transition-colors"
              >
                <div className="text-xl font-bold text-accent">{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-b from-[hsl(190_35%_10%)] via-[hsl(215_30%_9%)] to-background">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div id="rating" className="scroll-mt-20">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between mb-5">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    activeFilter === f.id
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={f.icon} size={14} />
                  {f.label}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72">
              <Icon
                name="Search"
                className="absolute left-3 top-2.5 text-muted-foreground"
                size={18}
              />
              <Input
                type="text"
                placeholder="Поиск букмекера..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-12 gap-4 px-4 pb-2 text-xs uppercase tracking-wide text-muted-foreground">
            <div className="col-span-4">Букмекер</div>
            <button
              className="col-span-2 text-left hover:text-accent transition-colors"
              onClick={() => setSortKey('bonus')}
            >
              Бонус {sortKey === 'bonus' && '▾'}
            </button>
            <button
              className="col-span-2 text-left hover:text-accent transition-colors"
              onClick={() => setSortKey('rating')}
            >
              Рейтинг {sortKey === 'rating' && '▾'}
            </button>
            <button
              className="col-span-2 text-left hover:text-accent transition-colors"
              onClick={() => setSortKey('reviews')}
            >
              Отзывы {sortKey === 'reviews' && '▾'}
            </button>
            <div className="col-span-2 text-right">Действия</div>
          </div>

          <div className="space-y-3">
            {visible.map((bk, index) => (
              <BookmakerRow key={bk.id} bk={bk} index={index} />
            ))}
          </div>

          {visible.length === 0 && (
            <div className="text-center py-12">
              <Icon name="SearchX" size={56} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">Ничего не найдено</p>
            </div>
          )}
        </div>

        <WhyUs />

        <RatingCriteria />

        <Card className="mt-10 p-6 bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="bg-accent/20 p-3 rounded-lg">
              <Icon name="Newspaper" size={28} className="text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">Спортивные новости</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Следите за событиями, которые влияют на коэффициенты, до открытия линии.
              </p>
              <a
                href="https://ria.ru/sport/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors font-medium text-sm"
              >
                Читать на РИА Новости
                <Icon name="ExternalLink" size={15} />
              </a>
            </div>
          </div>
        </Card>

        <BettingFaq />
      </main>
      </div>

      <footer className="bg-secondary border-t border-border py-10 mt-12">
        <div className="max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-3 text-sm">
          <div>
            <div className="font-bold mb-2">Рейтинг Букмекеров</div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Информационный портал о легальных букмекерских конторах. Мы не принимаем ставки
              и не являемся оператором азартных игр.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-2">Разделы</div>
            <ul className="space-y-1 text-muted-foreground text-xs">
              <li><a href="#rating" className="hover:text-accent">Рейтинг БК</a></li>
              <li><a href="#criteria" className="hover:text-accent">Методика оценки</a></li>
              <li><a href="#faq" className="hover:text-accent">Частые вопросы</a></li>
              <li>
                <button onClick={() => navigate('/privacy')} className="hover:text-accent">
                  Политика конфиденциальности
                </button>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Играйте ответственно</div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Ставки на спорт доступны лицам старше 18 лет. Азартные игры могут вызывать
              зависимость. Ставьте только те суммы, потеря которых не отразится на бюджете.
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © 2026 Рейтинг Букмекеров. Все права защищены.
        </div>
      </footer>

      <Dialog open={bonusDialogOpen} onOpenChange={setBonusDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <Icon name="Gift" size={20} />
              Акции и бонусы от букмекеров
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 mt-4 max-h-[60vh] overflow-y-auto pr-1">
            {topBonuses.map((p) => (
              <div
                key={p.id}
                className="bg-[#242424] rounded-lg p-4 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-8 w-auto max-w-[90px] object-contain shrink-0"
                    />
                  ) : (
                    <div
                      className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center text-white font-black text-xs ${p.color ?? 'bg-muted'}`}
                    >
                      {p.short}
                    </div>
                  )}
                  <div className="text-sm font-semibold truncate">
                    До <span className="text-accent">{p.bonus}</span>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setBonusDialogOpen(false);
                    if (p.route) navigate(p.route);
                  }}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg font-semibold text-xs shrink-0"
                >
                  ЗАБРАТЬ
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;