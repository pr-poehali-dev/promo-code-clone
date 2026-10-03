import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { Bookmaker } from '@/data/bookmakers';

interface Props {
  bk: Bookmaker;
  index: number;
}

const BookmakerRow = ({ bk, index }: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const highlight = index < 3;
  const siteUrl = bk.siteUrl ?? 'https://golnk.ru/gGvBX';

  const ratingChips = [
    { label: 'Оценка пользователей', value: Math.round(bk.rating) },
    { label: 'Коэффициенты', value: Math.round(bk.scores.odds) },
    { label: 'Выплаты', value: Math.round(bk.scores.payout) },
    { label: 'Приложение', value: Math.round(bk.scores.app) },
    { label: 'Поддержка', value: Math.round(bk.scores.support) },
  ];

  const advantages = [
    ...bk.features,
    'Минимальный депозит от 100₽',
    'Вывод средств: обычно мгновенно, максимум до 5 рабочих дней',
    `Лицензия ФНС и членство в ${bk.license}`,
    bk.bonusNote.charAt(0).toUpperCase() + bk.bonusNote.slice(1) + ` — ${bk.bonus}`,
  ];

  return (
    <div
      className={`group/row relative rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg animate-in fade-in slide-in-from-bottom-2 ${
        highlight ? 'ring-2 ring-[hsl(var(--violet))]/70' : 'ring-1 ring-border'
      }`}
      style={{
        animationDelay: `${index * 50}ms`,
        animationDuration: '400ms',
        animationFillMode: 'both',
      }}
    >
      {index < 3 && (
        <span className="absolute -top-2.5 left-4 z-10 rounded-full bg-[hsl(var(--violet))] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm lg:hidden">
          Топ-{index + 1}
        </span>
      )}
      <div className="grid grid-cols-3 lg:grid-cols-12 items-center gap-x-3 gap-y-3 px-4 pb-4 pt-5 lg:py-4">
        <div className="col-span-3 lg:col-span-3 flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground lg:hidden">
            {index + 1}
          </span>
          {bk.image ? (
            <img
              src={bk.image}
              alt={bk.name}
              className="h-8 w-auto max-w-[130px] object-contain transition-transform duration-300 group-hover/row:scale-105 lg:h-9 lg:max-w-[150px]"
            />
          ) : (
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-black text-white ${bk.color ?? 'bg-muted'}`}
            >
              {bk.short}
            </div>
          )}
          <span className="ml-auto truncate text-sm font-bold text-secondary-foreground lg:hidden">{bk.name}</span>
        </div>

        <div className="rounded-xl bg-muted/70 px-3 py-2 lg:col-span-2 lg:bg-transparent lg:p-0">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground lg:hidden">Бонус</div>
          <div className="text-[15px] font-extrabold text-[hsl(var(--violet))] lg:text-base lg:font-bold lg:text-secondary-foreground">{bk.bonus}</div>
        </div>

        <div className="rounded-xl bg-muted/70 px-3 py-2 lg:col-span-2 lg:bg-transparent lg:p-0">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground lg:hidden">Рейтинг</div>
          <div className="flex items-center gap-1">
            <span className="text-[15px] font-extrabold text-secondary-foreground lg:text-base lg:font-bold">
              {bk.rating.toFixed(1)}
            </span>
            <Icon name="Star" size={15} className="fill-yellow-400 text-yellow-400 transition-transform duration-300 group-hover/row:rotate-[20deg] group-hover/row:scale-110" />
          </div>
        </div>

        <button
          onClick={() => navigate(`/reviews/${encodeURIComponent(bk.name)}`)}
          className="rounded-xl bg-muted/70 px-3 py-2 text-left text-muted-foreground transition-colors hover:text-[hsl(var(--accent))] lg:col-span-1 lg:bg-transparent lg:p-0"
        >
          <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground lg:hidden">Отзывы</div>
          <div className="flex items-center gap-1.5">
            <Icon name="MessageSquare" size={15} />
            <span className="text-[15px] font-bold text-secondary-foreground lg:text-sm lg:font-medium lg:text-muted-foreground">{bk.reviews}</span>
          </div>
        </button>

        <div className="col-span-3 flex items-center justify-end gap-2 lg:col-span-4">
          {bk.route && (
            <Button
              variant="outline"
              onClick={() => navigate(bk.route!)}
              className="h-11 flex-1 lg:flex-none lg:h-9 rounded-xl lg:rounded-lg border-border bg-transparent px-4 lg:px-5 text-sm font-medium text-secondary-foreground hover:bg-muted"
            >
              Обзор
            </Button>
          )}

          {siteUrl ? (
            <Button
              asChild
              className={`h-11 flex-[1.4] lg:flex-none lg:h-9 rounded-xl lg:rounded-lg px-6 text-sm font-semibold text-white transition-transform active:scale-[0.97] ${highlight ? 'btn-shine' : ''} ${
                highlight
                  ? 'bg-[hsl(var(--violet))] hover:bg-[hsl(var(--violet))]/90'
                  : 'bg-accent hover:bg-accent/90'
              }`}
            >
              <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                На сайт
              </a>
            </Button>
          ) : (
            <Button
              className={`h-11 flex-[1.4] lg:flex-none lg:h-9 rounded-xl lg:rounded-lg px-6 text-sm font-semibold text-white transition-transform active:scale-[0.97] ${highlight ? 'btn-shine' : ''} ${
                highlight
                  ? 'bg-[hsl(var(--violet))] hover:bg-[hsl(var(--violet))]/90'
                  : 'bg-accent hover:bg-accent/90'
              }`}
            >
              На сайт
            </Button>
          )}

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Подробнее"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted/70 text-muted-foreground transition-colors hover:bg-muted lg:h-9 lg:w-9 lg:rounded-lg lg:bg-transparent"
          >
            <Icon
              name="ChevronDown"
              size={18}
              className={`transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="grid gap-5 border-t border-border px-4 py-4 sm:px-5 sm:py-5 sm:grid-cols-[minmax(0,260px)_1fr]">
          <div>
            <h4 className="mb-3 font-bold text-secondary-foreground">Рейтинг</h4>
            <div className="flex flex-wrap gap-2">
              {ratingChips.map((c) => (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-1 rounded-lg bg-muted px-2.5 py-1.5 text-xs text-secondary-foreground"
                >
                  {c.label}: {c.value}
                  <Icon name="Star" size={13} className="fill-yellow-400 text-yellow-400" />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 font-bold text-secondary-foreground">
              Преимущества букмекера
            </h4>
            <ul className="space-y-2">
              {advantages.map((a) => (
                <li
                  key={a}
                  className="flex items-start gap-2 text-sm text-secondary-foreground"
                >
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                      highlight ? 'bg-[hsl(var(--violet))]' : 'bg-accent'
                    }`}
                  />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmakerRow;