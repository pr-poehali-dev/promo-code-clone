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

  return (
    <div
      className={`rounded-2xl bg-secondary transition-all animate-in fade-in slide-in-from-bottom-2 ${
        highlight ? 'ring-2 ring-[hsl(var(--violet))]' : 'ring-1 ring-border'
      }`}
      style={{
        animationDelay: `${index * 50}ms`,
        animationDuration: '400ms',
        animationFillMode: 'both',
      }}
    >
      {highlight && (
        <div className="px-4 pt-3">
          <span className="inline-block rounded-full bg-[hsl(var(--violet))] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            {index === 0 ? 'Лучший выбор' : 'Эксклюзивный промокод'}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-12 items-center gap-3 px-4 py-4">
        <div className="col-span-2 lg:col-span-3 flex items-center gap-3">
          {bk.image ? (
            <img
              src={bk.image}
              alt={bk.name}
              className="h-9 w-auto max-w-[150px] object-contain"
            />
          ) : (
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-black text-white ${bk.color ?? 'bg-muted'}`}
            >
              {bk.short}
            </div>
          )}
          <span className="font-bold text-secondary-foreground lg:hidden">{bk.name}</span>
        </div>

        <div className="lg:col-span-2">
          <div className="text-[10px] uppercase text-muted-foreground lg:hidden">Бонус</div>
          <div className="text-base font-bold text-secondary-foreground">{bk.bonus}</div>
        </div>

        <div className="flex items-center gap-1 lg:col-span-2">
          <span className="text-base font-bold text-secondary-foreground">
            {bk.rating.toFixed(1)}
          </span>
          <Icon name="Star" size={15} className="fill-yellow-400 text-yellow-400" />
        </div>

        <button
          onClick={() => navigate(`/reviews/${encodeURIComponent(bk.name)}`)}
          className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-[hsl(var(--accent))] lg:col-span-1"
        >
          <Icon name="MessageSquare" size={15} />
          <span className="text-sm font-medium">{bk.reviews}</span>
        </button>

        <div className="col-span-2 flex items-center justify-end gap-2 lg:col-span-4">
          {bk.route && (
            <Button
              variant="outline"
              onClick={() => navigate(bk.route!)}
              className="h-9 rounded-lg border-border bg-transparent px-5 text-sm font-medium text-secondary-foreground hover:bg-muted"
            >
              Обзор
            </Button>
          )}

          {bk.siteUrl ? (
            <Button
              asChild
              className={`h-9 rounded-lg px-6 text-sm font-semibold text-white ${
                highlight
                  ? 'bg-[hsl(var(--violet))] hover:bg-[hsl(var(--violet))]/90'
                  : 'bg-accent hover:bg-accent/90'
              }`}
            >
              <a href={bk.siteUrl} target="_blank" rel="noopener noreferrer">
                На сайт
              </a>
            </Button>
          ) : (
            <Button
              className={`h-9 rounded-lg px-6 text-sm font-semibold text-white ${
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
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted"
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
        <div className="grid gap-4 border-t border-border px-4 py-4 text-sm sm:grid-cols-3">
          <div>
            <div className="mb-1 text-[11px] uppercase text-muted-foreground">Бонус</div>
            <p className="text-secondary-foreground/80 leading-relaxed text-xs">
              {bk.bonusTerms}
            </p>
          </div>
          <div>
            <div className="mb-1 text-[11px] uppercase text-muted-foreground">Условия</div>
            <ul className="space-y-1 text-xs text-secondary-foreground/80">
              <li>Минимальный депозит: {bk.minDeposit}</li>
              <li>Вывод средств: {bk.payout}</li>
              <li>Лицензия: {bk.license}</li>
              {bk.promo && <li>Промокод: {bk.promo}</li>}
            </ul>
          </div>
          <div>
            <div className="mb-1 text-[11px] uppercase text-muted-foreground">Особенности</div>
            <div className="flex flex-wrap gap-1.5">
              {bk.features.map((f) => (
                <span
                  key={f}
                  className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmakerRow;