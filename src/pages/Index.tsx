import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { bookmakers, type Bookmaker } from '@/data/bookmakers';
import { reviews } from '@/data/reviews';
import BookmakerRow from '@/components/BookmakerRow';
import RatingCategories from '@/components/RatingCategories';
import RatingCriteria from '@/components/RatingCriteria';
import BettingFaq from '@/components/BettingFaq';
import WhyUs from '@/components/WhyUs';

type SortKey = 'rating' | 'bonus' | 'reviews' | 'deposit';

const filters = [
  { id: 'all', label: 'Все БК', icon: 'List' },
  { id: 'bonus', label: 'Крупный бонус', icon: 'Gift' },
  { id: 'top', label: 'Топ-рейтинг', icon: 'Crown' },
];

const categories = [
  { id: 'all', label: 'Все' },
  { id: 'top', label: 'Лучшие букмекеры' },
  { id: 'new', label: 'Новые букмекеры' },
  { id: 'fast', label: 'С быстрым выводом' },
  { id: 'esports', label: 'Киберспортивные букмекеры' },
  { id: 'odds', label: 'Конторы с высокими коэффициентами' },
  { id: 'bonus', label: 'Лучшие бонусы и фрибеты' },
];

const navLinks = [
  { label: 'Букмекеры', href: '#rating' },
  { label: 'Бонусы', href: '#bonuses' },
  { label: 'Матчи', href: '/section/matches' },
  { label: 'Прогнозы', href: '/section/forecasts' },
  { label: 'Конкурсы', href: '/section/contests' },
  { label: 'Жалобы', href: '/section/complaints' },
  { label: 'Спорт', href: '/section/sport' },
  { label: 'Бизнес', href: '/section/business' },
  { label: 'Новости', href: 'https://ria.ru/sport/' },
  { label: 'Знания', href: '#faq' },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bonusDialogOpen, setBonusDialogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    if (activeFilter === 'top') list = list.filter((bk) => bk.rating >= 4.8);

    if (category === 'top') list = list.filter((bk) => bk.rating >= 4.6);
    if (category === 'new') list = list.filter((bk) => (reviews[bk.route?.split('/').pop() ?? '']?.founded ?? '0') >= '2019');
    if (category === 'fast') list = list.filter((bk) => bk.scores.payout >= 4.6);
    if (category === 'esports')
      list = list.filter((bk) =>
        (reviews[bk.route?.split('/').pop() ?? '']?.about ?? []).some((t) => t.toLowerCase().includes('киберспорт')) ||
        bk.features.some((f) => f.toLowerCase().includes('киберспорт')),
      );
    if (category === 'odds') list = list.filter((bk) => bk.scores.odds >= 4.6);
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
      <header className="sticky top-0 z-30 border-b border-border bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3">
          <a href="#rating" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--navy))] text-white">
              <Icon name="ShieldCheck" size={18} />
            </span>
            <span className="leading-none">
              <span className="block text-lg font-extrabold tracking-tight text-foreground">
                БК<span className="text-[hsl(var(--violet))]">рейтинг</span>
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                легальные букмекеры
              </span>
            </span>
          </a>

          <nav className="hidden flex-1 items-center gap-0.5 text-sm font-medium text-muted-foreground xl:flex">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => {
                  setMenuOpen(false);
                  if (l.href === '#bonuses') {
                    e.preventDefault();
                    setBonusDialogOpen(true);
                  } else if (l.href.startsWith('http')) {
                    e.preventDefault();
                    window.open(l.href, '_blank', 'noopener,noreferrer');
                  } else if (l.href.startsWith('/')) {
                    e.preventDefault();
                    navigate(l.href);
                  }
                }}
                className="whitespace-nowrap rounded-lg px-2.5 py-2 transition-colors hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setBonusDialogOpen(true)}
              className="relative hidden items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted sm:inline-flex"
            >
              <Icon name="Gift" size={16} className="text-[hsl(var(--violet))]" />
              Бонусы
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
            </button>
            <button
              onClick={() => setBonusDialogOpen(true)}
              className="relative rounded-lg p-2 text-foreground transition-colors hover:bg-muted sm:hidden"
              aria-label="Акции и бонусы"
            >
              <Icon name="Gift" size={20} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted xl:hidden"
              aria-label="Меню"
            >
              <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="grid grid-cols-2 gap-1 border-t border-border bg-white px-4 py-3 xl:hidden animate-in fade-in slide-in-from-top-2">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => {
                  setMenuOpen(false);
                  if (l.href === '#bonuses') {
                    e.preventDefault();
                    setBonusDialogOpen(true);
                  } else if (l.href.startsWith('http')) {
                    e.preventDefault();
                    window.open(l.href, '_blank', 'noopener,noreferrer');
                  } else if (l.href.startsWith('/')) {
                    e.preventDefault();
                    navigate(l.href);
                  }
                }}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-muted"
              >
                {l.label}
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </a>
            ))}
          </nav>
        )}
      </header>

      <section className="relative overflow-hidden border-b border-border bg-white">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 pb-6 pt-7 sm:gap-10 sm:py-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Обновлено: октябрь 2026
            </div>
            <h1 className="mb-3 text-[28px] font-extrabold leading-[1.1] text-foreground sm:mb-4 sm:text-5xl">
              Рейтинг легальных
              <br className="hidden sm:block" />{' '}
              <span className="text-[hsl(var(--violet))]">букмекеров России</span>
            </h1>
            <p className="mb-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:mb-7 sm:text-lg">
              Сравниваем бонусы, коэффициенты, скорость выплат и качество поддержки. Только
              конторы с лицензией ФНС и членством в ЕЦУПИС.
            </p>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
              <Button
                asChild
                className="h-12 rounded-xl bg-[hsl(var(--navy))] px-3 text-sm sm:px-6 sm:text-base font-semibold text-white hover:bg-[hsl(var(--navy))]/90"
              >
                <a href="#rating">
                  <span className="sm:hidden">Рейтинг</span>
                  <span className="hidden sm:inline">Смотреть рейтинг</span>
                  <Icon name="ArrowRight" size={18} className="ml-1" />
                </a>
              </Button>
              <Button
                variant="outline"
                onClick={() => setBonusDialogOpen(true)}
                className="h-12 rounded-xl border-border bg-white px-3 text-sm sm:px-6 sm:text-base font-semibold text-foreground hover:bg-muted"
              >
                <Icon name="Gift" size={18} className="mr-1 text-[hsl(var(--violet))]" />
                <span className="sm:hidden">Бонусы</span>
                <span className="hidden sm:inline">Лучшие бонусы</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:grid-cols-2 sm:gap-3">
            {[
              { v: bookmakers.length.toString(), l: 'БК в рейтинге', i: 'Building2' },
              { v: '6', l: 'групп критериев', i: 'ListChecks' },
              {
                v: bookmakers.reduce((s, b) => s + b.reviews, 0).toLocaleString('ru-RU'),
                l: 'отзывов игроков',
                i: 'MessageSquare',
              },
              { v: '24/7', l: 'мониторинг выплат', i: 'Activity' },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-xl border border-border bg-white p-2.5 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:rounded-2xl sm:p-5 sm:text-left"
              >
                <div className="mb-3 hidden h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--violet))]/10 sm:flex">
                  <Icon name={s.i} size={18} className="text-[hsl(var(--violet))]" />
                </div>
                <div className="text-base font-extrabold text-foreground sm:text-3xl">{s.v}</div>
                <div className="text-[10px] font-medium leading-tight text-muted-foreground sm:text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div>
      <main className="max-w-7xl mx-auto px-4 py-5 sm:py-8">
        <div id="rating" className="scroll-mt-16 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-6">
          <div className="min-w-0">
            <div className="mb-4 flex flex-col gap-3 lg:mb-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
                {filters.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                      activeFilter === f.id
                        ? 'border-[hsl(var(--navy))] bg-[hsl(var(--navy))] text-white'
                        : 'border-border bg-white text-muted-foreground hover:border-foreground/30 hover:text-foreground'
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
                  className="absolute left-3 top-3 text-muted-foreground"
                  size={18}
                />
                <Input
                  type="text"
                  placeholder="Поиск букмекера..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 rounded-xl border-border bg-white pl-10 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-12 gap-3 px-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
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

            <div className="space-y-4 lg:space-y-3">
              {visible.map((bk, index) => (
                <BookmakerRow key={bk.id} bk={bk} index={index} />
              ))}
            </div>

            {visible.length === 0 && (
              <div className="py-12 text-center">
                <Icon name="SearchX" size={56} className="mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-lg text-muted-foreground">Ничего не найдено</p>
              </div>
            )}
          </div>

          <div className="order-first min-w-0 lg:order-none lg:sticky lg:top-20 lg:self-start">
            <RatingCategories items={categories} active={category} onSelect={setCategory} />
          </div>
        </div>

        <WhyUs />

        <RatingCriteria />

        <Card className="mt-10 rounded-2xl border-border bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex flex-row items-start gap-4">
            <div className="bg-[hsl(var(--violet))]/10 p-3 rounded-xl">
              <Icon name="Newspaper" size={28} className="text-[hsl(var(--violet))]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1 text-foreground">Спортивные новости</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Следите за событиями, которые влияют на коэффициенты, до открытия линии.
              </p>
              <a
                href="https://ria.ru/sport/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[hsl(var(--violet))] hover:opacity-80 transition-colors font-medium text-sm"
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

      <footer className="mt-12 bg-[hsl(var(--navy))] text-white sm:mt-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm md:grid-cols-[1.4fr_1fr_1.4fr] md:gap-10 md:py-12">
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                <Icon name="ShieldCheck" size={18} />
              </span>
              <span className="text-lg font-extrabold">БКрейтинг</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Информационный портал о легальных букмекерских конторах. Мы не принимаем ставки
              и не являемся оператором азартных игр.
            </p>
          </div>
          <div>
            <div className="mb-3 font-semibold">Разделы</div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-white/60 md:grid-cols-1">
              <li><a href="#rating" className="transition-colors hover:text-white">Рейтинг БК</a></li>
              <li><a href="#criteria" className="transition-colors hover:text-white">Методика оценки</a></li>
              <li><a href="#faq" className="transition-colors hover:text-white">Частые вопросы</a></li>
              <li>
                <button onClick={() => navigate('/privacy')} className="transition-colors hover:text-white">
                  Политика конфиденциальности
                </button>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-3 flex items-center gap-2 font-semibold">
              <span className="rounded-md border border-white/30 px-1.5 py-0.5 text-xs font-bold">18+</span>
              Играйте ответственно
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Ставки на спорт доступны лицам старше 18 лет. Азартные игры могут вызывать
              зависимость. Ставьте только те суммы, потеря которых не отразится на бюджете.
            </p>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/40 sm:flex-row">
            <span>© 2026 БКрейтинг. Все права защищены.</span>
            <span>Только легальные букмекеры с лицензией ФНС</span>
          </div>
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
                {p.siteUrl && ['Winline', 'BetBoom', 'Марафон', 'Fonbet', 'Melbet'].includes(p.name) ? (
                  <Button
                    asChild
                    className="shrink-0 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent/90"
                  >
                    <a
                      href={p.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setBonusDialogOpen(false)}
                    >
                      ЗАБРАТЬ
                    </a>
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setBonusDialogOpen(false);
                      if (p.route) navigate(p.route);
                    }}
                    className="shrink-0 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent/90"
                  >
                    ЗАБРАТЬ
                  </Button>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;