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

  return (
    <Card
      className="p-4 hover:border-accent/40 transition-colors animate-in fade-in slide-in-from-bottom-2"
      style={{
        animationDelay: `${index * 80}ms`,
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
          <img
            src={bk.image}
            alt={bk.name}
            className="w-14 h-14 object-contain rounded-lg shrink-0"
          />
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
        </div>

        <div className="lg:col-span-2 flex items-center gap-2">
          <div className="text-3xl font-bold text-yellow-500">
            {(bk.rating * 2).toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground leading-tight">
            из 10
            <br />
            <button
              onClick={() => navigate(`/reviews/${encodeURIComponent(bk.name)}`)}
              className="text-accent hover:underline"
            >
              {bk.reviews} отзывов
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="text-lg font-bold text-accent">{bk.bonus}</div>
          <div className="text-xs text-muted-foreground">{bk.bonusNote}</div>
        </div>

        <div className="lg:col-span-2">
          <div className="text-base font-semibold">{bk.minDeposit}</div>
          <div className="text-xs text-muted-foreground">вывод {bk.payout}</div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-2">
          <Button className="font-semibold bg-yellow-600 hover:bg-yellow-700 text-white">
            Перейти на сайт
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(bk.route)}
          >
            Читать обзор
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BookmakerRow;
