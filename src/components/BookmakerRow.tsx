import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Bookmaker } from '@/data/bookmakers';

interface Props {
  bk: Bookmaker;
  index: number;
}

const BookmakerRow = ({ bk, index }: Props) => {
  const navigate = useNavigate();
  const score = (bk.rating * 2).toFixed(1);

  return (
    <Card
      className="p-4 !bg-[hsl(200_10%_20%)] border-white/10 hover:!bg-[hsl(200_10%_24%)] hover:border-accent/40 transition-colors animate-in fade-in slide-in-from-bottom-2"
      style={{
        animationDelay: `${index * 60}ms`,
        animationDuration: '400ms',
        animationFillMode: 'both',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-4 flex items-center gap-3">
          <div
            className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-sm font-bold ${
              index === 0
                ? 'bg-yellow-500/20 text-yellow-400'
                : index === 1
                  ? 'bg-slate-400/20 text-slate-300'
                  : index === 2
                    ? 'bg-amber-700/25 text-amber-500'
                    : 'text-muted-foreground'
            }`}
          >
            {index + 1}
          </div>

          {bk.wideLogo && bk.image ? (
            <img
              src={bk.image}
              alt={bk.name}
              className="h-12 w-auto max-w-[200px] object-contain"
            />
          ) : (
            <>
              {bk.image ? (
                <img
                  src={bk.image}
                  alt={bk.name}
                  className="w-14 h-14 object-contain rounded-lg shrink-0"
                />
              ) : (
                <div
                  className={`w-14 h-14 shrink-0 rounded-lg flex items-center justify-center text-white font-black text-lg ${bk.color ?? 'bg-muted'}`}
                >
                  {bk.short}
                </div>
              )}

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold truncate">{bk.name}</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <Icon name="BadgeCheck" size={16} className="text-accent" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>Лицензия ФНС, {bk.license}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {bk.features.slice(0, 2).map((f) => (
                    <span
                      key={f}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="lg:hidden text-[11px] uppercase text-muted-foreground">Бонус</div>
          <div className="text-lg font-bold text-accent">{bk.bonus}</div>
        </div>

        <div className="lg:col-span-2 flex items-center gap-2">
          <div className="text-3xl font-bold text-yellow-500">{score}</div>
          <div className="flex flex-col">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Icon
                  key={s}
                  name="Star"
                  size={12}
                  className={
                    s <= Math.round(bk.rating)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-muted-foreground/40'
                  }
                />
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground">из 10</span>
          </div>
        </div>

        <div className="lg:col-span-2">
          <button
            onClick={() => navigate(`/reviews/${encodeURIComponent(bk.name)}`)}
            className="inline-flex items-center gap-1.5 text-accent hover:underline"
          >
            <Icon name="MessageSquare" size={16} />
            <span className="font-semibold">{bk.reviews}</span>
          </button>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-2">
          <Button className="font-semibold bg-accent hover:bg-accent/90 text-accent-foreground">
            Перейти на сайт
          </Button>
          {bk.route && (
            <Button variant="secondary" size="sm" onClick={() => navigate(bk.route!)}>
              Читать обзор
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BookmakerRow;