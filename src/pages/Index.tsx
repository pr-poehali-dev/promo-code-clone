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
import RatingCategories from '@/components/RatingCategories';
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

const categories = [
  { id: 'all', label: 'Все' },
  { id: 'official', label: 'Официальные' },
  { id: 'top', label: 'Лучшие букмекеры' },
  { id: 'new', label: 'Новые букмекеры' },
  { id: 'fast', label: 'С быстрым выводом' },
  { id: 'esports', label: 'Киберспортивные букмекеры' },
  { id: 'lowdep', label: 'Букмекеры с минимальным депозитом' },
  { id: 'odds', label: 'Конторы с высокими коэффициентами' },
  { id: 'bonus', label: 'Лучшие бонусы и фрибеты' },
];

const navLinks = [
  { label: 'Рейтинг', href: '#rating' },
  { label: 'Все букмекеры', href: '#rating' },
  { label: 'Бонусы', href: '#rating' },
  { label: 'Методика', href: '#criteria' },
  { label: 'Вопросы', href: '#faq' },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bonusDialogOpen, setBonusDialogOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('rating');
  const [activeFilter, setActiveFilter] = useState('all');
  const [category, setCategory] = useState('all');
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

    if (category === 'top') list = list.filter((bk) => bk.rating >= 4.6);
    if (category === 'new') list = list.filter((bk) => bk.id >= 12);
    if (category === 'fast') list = list.filter((bk) => num(bk.payout) <= 6);
    if (category === 'esports')
      list = list.filter((bk) =>
        bk.features.some((f) => f.toLowerCase().includes('киберспорт')),
      );
    if (category === 'lowdep') list = list.filter((bk) => num(bk.minDeposit) <= 100);
    if (category === 'odds') list = list.filter((bk) => bk.scores.odds >= 4.5);
    if (category === 'bonus') list = list.filter((bk) => num(bk.bonus) >= 8000);

    return [...list].sort((a, b) => {
      if (sortKey === 'rating') return b.rating - a.rating;
      if (sortKey === 'bonus') return num(b.bonus) - num(a.bonus);
      if (sortKey === 'reviews') return b.reviews - a.reviews;
      return num(a.minDeposit) - num(b.minDeposit);
    });
  }, [searchQuery, sortKey, activeFilter, category]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[hsl(168_46%_9%)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <Icon name="TrendingUp" size={18} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tight text-white">
              БК<span className="text-accent">рейтинг</span>
            </span>
          </div>

          <nav className="hidden flex-1 items-center gap-5 text-sm text-white/70 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="whitespace-nowrap transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={() => setBonusDialogOpen(true)}
              className="relative rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-accent"
              aria-label="Акции и бонусы"
            >
              <Icon name="Gift" size={20} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <a
              href="#rating"
              className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-accent"
              aria-label="Поиск"
            >
              <Icon name="Search" size={20} />
            </a>
          </div>
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

        <div className="relative max-w-7xl mx-auto px-4 py-14">
          <Badge variant="outline" className="mb-3 text-accent border-accent/40">
            Обновлено: сентябрь 2026
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 max-w-2xl">
            Рейтинг легальных букмекерских контор России
          </h2>
          <p className="text-white/70 max-w-2xl mb-6">
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
                className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur transition-colors hover:border-accent/50"
              >
                <div className="text-xl font-bold text-accent">{s.v}</div>
                <div className="text-xs text-white/60">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-b from-[hsl(168_40%_9%)] via-[hsl(170_35%_8%)] to-background">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div id="rating" className="scroll-mt-20 grid gap-6 lg:grid-cols-[1fr_300px]">
          <div>
            <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {filters.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      activeFilter === f.id
                        ? 'border-accent bg-accent text-white'
                        : 'border-white/15 text-white/60 hover:text-white'
                    }`}
                  >
                    <Icon name={f.icon} size={14} />
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-64">
                <Icon
                  name="Search"
                  className="absolute left-3 top-2.5 text-white/40"
                  size={18}
                />
                <Input
                  type="text"
                  placeholder="Поиск букмекера..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 border-white/15 bg-white/5 pl-10 text-white placeholder:text-white/40"
                />
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-12 gap-3 px-4 pb-2 text-[11px] uppercase tracking-wide text-white/40">
              <div className="col-span-3">Букмекер</div>
              <button
                className="col-span-2 text-left transition-colors hover:text-accent"
                onClick={() => setSortKey('bonus')}
              >
                Бонус {sortKey === 'bonus' && '▾'}
              </button>
              <button
                className="col-span-2 text-left transition-colors hover:text-accent"
                onClick={() => setSortKey('rating')}
              >
                Рейтинг {sortKey === 'rating' && '▾'}
              </button>
              <button
                className="col-span-1 text-left transition-colors hover:text-accent"
                onClick={() => setSortKey('reviews')}
              >
                Отзывы
              </button>
              <div className="col-span-4 text-right">Действия</div>
            </div>

            <div className="space-y-3">
              {visible.map((bk, index) => (
                <BookmakerRow key={bk.id} bk={bk} index={index} />
              ))}
            </div>

            {visible.length === 0 && (
              <div className="py-12 text-center">
                <Icon name="SearchX" size={56} className="mx-auto mb-4 text-white/30" />
                <p className="text-lg text-white/60">Ничего не найдено</p>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-20 lg:self-start">
            <RatingCategories items={categories} active={category} onSelect={setCategory} />
          </div>
        </div>

        <WhyUs />

        <RatingCriteria />

        <Card className="mt-10 rounded-2xl border-white/10 bg-white/5 p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="bg-accent/20 p-3 rounded-xl">
              <Icon name="Newspaper" size={28} className="text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1 text-white">Спортивные новости</h3>
              <p className="text-white/60 text-sm mb-3">
                Следите за событиями, которые влияют на коэффициенты, до открытия линии.
              </p>
              <a
                href="https://ria.ru/sport/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium text-sm"
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

      <footer className="bg-[hsl(168_46%_9%)] border-t border-white/5 py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid gap-8 md:grid-cols-3 text-sm">
          <div>
            <div className="font-bold mb-2 text-white">БКрейтинг</div>
            <p className="text-white/50 text-xs leading-relaxed">
              Информационный портал о легальных букмекерских конторах. Мы не принимаем ставки
              и не являемся оператором азартных игр.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-2 text-white">Разделы</div>
            <ul className="space-y-1 text-white/50 text-xs">
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
            <div className="font-semibold mb-2 text-white">Играйте ответственно</div>
            <p className="text-white/50 text-xs leading-relaxed">
              Ставки на спорт доступны лицам старше 18 лет. Азартные игры могут вызывать
              зависимость. Ставьте только те суммы, потеря которых не отразится на бюджете.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/40">
          © 2026 БКрейтинг. Все права защищены.
        </div>
      </footer>

      <Dialog open={bonusDialogOpen} onOpenChange={setBonusDialogOpen}>
        <DialogContent className="max-w-md rounded-2xl bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Gift" size={20} />
              Акции и бонусы от букмекеров
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 mt-4 max-h-[60vh] overflow-y-auto pr-1">
            {topBonuses.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-secondary p-4"
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
                  className="shrink-0 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent/90"
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