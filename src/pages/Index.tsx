import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Bookmaker {
  id: number;
  name: string;
  logo: string;
  rating: number;
  bonus: string;
  license: string;
  minDeposit: string;
  features: string[];
}

const bookmakers: Bookmaker[] = [
  {
    id: 1,
    name: 'BetBoom',
    logo: '🎰',
    rating: 5.0,
    bonus: '10 000₽',
    license: 'ФНС №17',
    minDeposit: '50₽',
    features: ['Высокие коэффициенты', 'Быстрый вывод', 'Мобильное приложение']
  },
  {
    id: 2,
    name: '1xСтавка',
    logo: '⚽',
    rating: 4.8,
    bonus: '15 000₽',
    license: 'ФНС №4',
    minDeposit: '100₽',
    features: ['Широкая линия', 'Live-ставки', 'Кэшбэк']
  },
  {
    id: 3,
    name: 'Фонбет',
    logo: '🏆',
    rating: 4.9,
    bonus: '15 000₽',
    license: 'ФНС №7',
    minDeposit: '100₽',
    features: ['Надежная БК', 'Пункты приема ставок', 'Акции и бонусы']
  },
  {
    id: 4,
    name: 'Мелбет',
    logo: '🎯',
    rating: 4.7,
    bonus: '8 000₽',
    license: 'ФНС №16',
    minDeposit: '50₽',
    features: ['Киберспорт', 'Казино', 'Промокоды']
  },
  {
    id: 5,
    name: 'Леон',
    logo: '🦁',
    rating: 4.6,
    bonus: '20 000₽',
    license: 'ФНС №5',
    minDeposit: '100₽',
    features: ['Удобный интерфейс', 'Бонусы новичкам', 'Стабильная работа']
  },
  {
    id: 6,
    name: 'Винлайн',
    logo: '💎',
    rating: 4.5,
    bonus: '5 000₽',
    license: 'ФНС №12',
    minDeposit: '100₽',
    features: ['Простая регистрация', 'Быстрая верификация', 'Поддержка 24/7']
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookmakers = bookmakers.filter(bk =>
    bk.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">Рейтинг Букмекеров</h1>
              <Badge variant="outline" className="text-xs">Партнерский проект</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2">Легальные букмекерские конторы</h2>
          <p className="text-muted-foreground">Рейтинг лучших лицензированных БК России</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="relative max-w-md">
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

        <div className="space-y-4">
          {filteredBookmakers.map((bk, index) => (
            <Card key={bk.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex items-center gap-4 lg:w-1/3">
                  <div className="bg-muted rounded-lg w-16 h-16 flex items-center justify-center text-3xl shrink-0">
                    {bk.logo}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded">
                        #{index + 1}
                      </span>
                      <h3 className="text-xl font-bold">{bk.name}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{bk.rating}</span>
                      <span className="text-muted-foreground">/5</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Бонус</div>
                    <div className="text-xl font-bold text-accent">{bk.bonus}</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Лицензия</div>
                    <div className="flex items-center gap-1">
                      <Icon name="Shield" size={16} className="text-accent" />
                      <span className="text-sm font-semibold">{bk.license}</span>
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Мин. депозит</div>
                    <div className="text-lg font-bold">{bk.minDeposit}</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:w-48">
                  <Button className="w-full font-semibold">
                    Перейти на сайт
                    <Icon name="ExternalLink" size={16} className="ml-2" />
                  </Button>
                  <Button variant="secondary" className="w-full">
                    Читать обзор
                  </Button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex flex-wrap gap-2">
                  {bk.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      <Icon name="Check" size={14} className="mr-1 text-accent" />
                      {feature}
                    </Badge>
                  ))}
                </div>
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
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>© 2024 Рейтинг Букмекеров. Информационный портал.</p>
            <p className="text-xs">
              Ставки на спорт доступны лицам старше 18 лет. Азартные игры могут вызывать зависимость.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
