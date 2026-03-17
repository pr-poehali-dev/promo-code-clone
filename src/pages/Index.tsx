import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Bookmaker {
  id: number;
  name: string;
  logo: string;
  rating: number;
  bonus: string;
  reviews: number;
  minDeposit: string;
  features: string[];
}

const bookmakers: Bookmaker[] = [
  {
    id: 3,
    name: 'Fonbet',
    logo: '🏆',
    rating: 4.9,
    bonus: '15 000₽',
    reviews: 912,
    minDeposit: '100₽',
    features: ['Надежная БК', 'Пункты приема ставок', 'Акции и бонусы']
  },
  {
    id: 6,
    name: 'Winline',
    logo: '💎',
    rating: 4.9,
    bonus: '3 000₽',
    reviews: 289,
    minDeposit: '500₽',
    features: ['Простая регистрация', 'Быстрая верификация', 'Поддержка 24/7']
  },
  {
    id: 1,
    name: 'BetBoom',
    logo: '🎰',
    rating: 4.9,
    bonus: '10 000₽',
    reviews: 847,
    minDeposit: '100₽',
    features: ['Высокие коэффициенты', 'Быстрый вывод', 'Мобильное приложение']
  },
  {
    id: 2,
    name: '1xBet',
    logo: '⚽',
    rating: 4.8,
    bonus: '15 000₽',
    reviews: 623,
    minDeposit: '100₽',
    features: ['Широкая линия', 'Live-ставки', 'Кэшбэк']
  },
  {
    id: 5,
    name: 'Leon',
    logo: '🦁',
    rating: 4.6,
    bonus: '40 000₽',
    reviews: 734,
    minDeposit: '100₽',
    features: ['Удобный интерфейс', 'Бонусы новичкам', 'Стабильная работа']
  },
  {
    id: 4,
    name: 'Melbet',
    logo: '🎯',
    rating: 4.7,
    bonus: '30 000₽',
    reviews: 456,
    minDeposit: '50₽',
    features: ['Киберспорт', 'Казино', 'Промокоды']
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bonusDialogOpen, setBonusDialogOpen] = useState(false);
  const navigate = useNavigate();

  const filteredBookmakers = bookmakers.filter(bk =>
    bk.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Футбольный мяч с градиентом */}
      <div className="absolute top-[1000px] -right-32 w-96 h-96 pointer-events-none">
        <img 
          src="https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/60d09ce0-e6c7-4d5d-9540-344e6e699e8a.png"
          alt="Football"
          className="w-full h-full object-cover opacity-30"
          style={{ 
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)'
          }}
        />
      </div>

      <header className="bg-secondary border-b border-border shadow-sm sticky top-0 z-10 relative overflow-hidden">
        
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setBonusDialogOpen(true)}
              className="relative p-2 hover:bg-accent/10 rounded-lg transition-colors"
              aria-label="Акции и бонусы"
            >
              <Icon name="Gift" size={24} className="text-accent" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-secondary"></span>
            </button>
            
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-accent">Рейтинг Букмекеров</h1>
              <Badge variant="outline" className="text-xs">Партнерский проект</Badge>
            </div>
            
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      <div className="bg-muted py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">Легальные букмекерские конторы</h2>
          <p className="text-muted-foreground">Рейтинг лучших лицензированных БК России</p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="mb-8 p-6 bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
          <div className="flex items-start gap-4">
            <div className="bg-accent/20 p-3 rounded-lg">
              <Icon name="Newspaper" size={32} className="text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 text-accent">Новости</h3>
              <p className="text-foreground mb-3">Свежие новости о спорте</p>
              <a 
                href="https://ria.ru/sport/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors font-medium"
              >
                Читать на РИА Новости
                <Icon name="ExternalLink" size={16} />
              </a>
            </div>
          </div>
        </Card>

        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <Icon name="Search" className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Поиск букмекера..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredBookmakers.map((bk, index) => (
            <Card 
              key={bk.id} 
              className="p-4 hover:shadow-lg transition-all relative animate-in fade-in slide-in-from-bottom-4"
              style={{ 
                animationDelay: `${index * 150}ms`,
                animationDuration: '500ms',
                animationFillMode: 'both'
              }}
            >
              <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-center">
                {/* Левая часть: Номер + Логотип + Название + Рейтинг */}
                <div className="flex items-center gap-4 lg:min-w-[320px]">
                  {/* Номер */}
                  <div className="text-2xl font-bold text-muted-foreground/60 w-8 text-center shrink-0">
                    {index + 1}
                  </div>

                  {/* Логотип */}
                  {(bk.id === 1 || bk.id === 2 || bk.id === 3 || bk.id === 4 || bk.id === 5 || bk.id === 6) ? (
                    <div className="w-16 h-16 shrink-0">
                      <img 
                        src={
                          bk.id === 1 
                            ? "https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/90f32309-e331-487f-b31c-be4d770d94d7.png"
                            : bk.id === 2
                            ? "https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/896a0d3c-1d84-4209-b64c-f4d6ecad82b3.png"
                            : bk.id === 3
                            ? "https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/02e93614-f75a-4c7e-b8f9-4d86e2ff2459.png"
                            : bk.id === 4
                            ? "https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/98d00b0c-3ead-488d-b70c-eb83b808115f.png"
                            : bk.id === 5
                            ? "https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/0bb38841-4e9e-45a3-b471-eb977d7f0d05.png"
                            : "https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/d7e9f98a-d9ca-41c8-aa60-604944c82c3e.png"
                        }
                        alt={bk.name}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="bg-muted rounded-lg w-16 h-16 flex items-center justify-center text-2xl shrink-0">
                      {bk.logo}
                    </div>
                  )}

                  {/* Название */}
                  <h3 className="text-xl font-bold">{bk.name}</h3>
                </div>

                {/* Рейтинг */}
                <div className="flex items-center gap-2 lg:min-w-[140px]">
                  <div className="text-3xl font-bold text-yellow-500">{(bk.rating * 10).toFixed(1)}</div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Icon name="Info" size={18} className="text-muted-foreground cursor-help" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Рейтинг букмекера</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Кнопка */}
                <div className="flex-1 flex justify-end">
                  <Button className="px-8 font-semibold bg-yellow-600 hover:bg-yellow-700">
                    Перейти на сайт
                  </Button>
                </div>
              </div>

              {/* Дополнительная информация под основной строкой */}
              <div className="mt-4 flex flex-col sm:flex-row gap-4 items-start">
                {/* Блоки с информацией */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Бонус</div>
                    <div className="text-lg font-bold text-accent">{bk.bonus}</div>
                  </div>
                  <div 
                    className="bg-muted rounded-lg p-3 cursor-pointer hover:bg-accent/10 transition-colors"
                    onClick={() => navigate(`/reviews/${encodeURIComponent(bk.name)}`)}
                  >
                    <div className="text-xs text-muted-foreground mb-1">Отзывы</div>
                    <div className="flex items-center gap-1">
                      <Icon name="MessageCircle" size={16} className="text-accent" />
                      <span className="text-sm font-semibold">{bk.reviews}</span>
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Мин. депозит</div>
                    <div className="text-lg font-bold">{bk.minDeposit}</div>
                  </div>
                </div>

                {/* Кнопка "Читать обзор" */}
                <Button 
                  variant="secondary" 
                  className="w-full sm:w-auto px-8"
                  onClick={() => {
                    if (bk.id === 1) navigate('/betboom');
                    if (bk.id === 2) navigate('/1xbet');
                    if (bk.id === 3) navigate('/fonbet');
                    if (bk.id === 4) navigate('/melbet');
                    if (bk.id === 5) navigate('/leon');
                    if (bk.id === 6) navigate('/winline');
                  }}
                >
                  Читать обзор
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredBookmakers.length === 0 && (
          <div className="text-center py-12">
            <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">Букмекер не найден</p>
          </div>
        )}
      </main>

      <footer className="bg-muted border-t py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>© 2026 Рейтинг Букмекеров. Информационный портал.</p>
            <p className="text-xs">
              Ставки на спорт доступны лицам старше 18 лет. Азартные игры могут вызывать зависимость.
            </p>
          </div>
        </div>
      </footer>

      <Dialog open={bonusDialogOpen} onOpenChange={setBonusDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <Icon name="Home" size={20} />
              Акции и бонусы от букмекеров
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3 mt-4">
            {/* Фрибет */}
            <div className="bg-[#242424] rounded-lg p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <img 
                  src="https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/08eaa524-4591-4f3f-b092-aa225e369049.png" 
                  alt="Winline"
                  className="w-10 h-10 object-contain shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">Фрибет до <span className="text-orange-300">3 000</span>₽</div>
                  <div className="text-xs text-gray-400"></div>
                  <div className="text-xs text-gray-500 mt-1"></div>
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-xs shrink-0">
                ЗАБРАТЬ
              </Button>
            </div>

            {/* СУПЕР-фрибет */}
            <div className="bg-[#242424] rounded-lg p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <img 
                  src="https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/b60938bc-d68f-444a-b2b6-9e77a7e3c4a3.png" 
                  alt="Fonbet"
                  className="w-10 h-10 object-contain shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">Фрибет до <span className="text-orange-300">15 000</span>₽</div>
                  <div className="text-xs text-gray-400"></div>
                  <div className="text-xs text-gray-500 mt-1"></div>
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-xs shrink-0">
                ЗАБРАТЬ
              </Button>
            </div>

            {/* Фрибет БетБум */}
            <div className="bg-[#242424] rounded-lg p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <img 
                  src="https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/52da02c2-ed11-41b9-a655-1d48246b1478.png" 
                  alt="BetBoom"
                  className="w-10 h-10 object-contain shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">Фрибет до <span className="text-orange-300">10 000</span>₽</div>
                  <div className="text-xs text-gray-400"></div>
                  <div className="text-xs text-gray-500 mt-1"></div>
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-xs shrink-0">
                ЗАБРАТЬ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;