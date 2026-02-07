import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    minDeposit: '100₽',
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
  const navigate = useNavigate();

  const filteredBookmakers = bookmakers.filter(bk =>
    bk.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Декоративные спортивные иконки на фоне */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Icon name="Trophy" className="absolute top-20 left-10 text-muted-foreground/10" size={80} />
        <Icon name="Target" className="absolute top-40 right-20 text-muted-foreground/10" size={60} />
        <Icon name="Award" className="absolute top-96 left-1/4 text-muted-foreground/10" size={70} />
        <Icon name="Medal" className="absolute top-[500px] right-1/3 text-muted-foreground/10" size={65} />
        <Icon name="Flame" className="absolute top-[700px] left-20 text-muted-foreground/10" size={75} />
        <Icon name="Zap" className="absolute top-[800px] right-10 text-muted-foreground/10" size={85} />
        <Icon name="Star" className="absolute top-[1000px] right-1/4 text-muted-foreground/10" size={55} />
        <Icon name="Crown" className="absolute top-[300px] left-1/3 text-muted-foreground/10" size={70} />
        <Icon name="TrendingUp" className="absolute top-[1200px] right-1/2 text-muted-foreground/10" size={60} />
        <Icon name="Sparkles" className="absolute top-[900px] left-1/2 text-muted-foreground/10" size={65} />
        <Icon name="Swords" className="absolute top-[150px] right-1/4 text-muted-foreground/10" size={45} />
        <Icon name="Dumbbell" className="absolute top-[600px] left-1/2 text-muted-foreground/10" size={90} />
        <Icon name="Bike" className="absolute top-[1100px] left-10 text-muted-foreground/10" size={50} />
        <Icon name="CircleDot" className="absolute top-[400px] right-10 text-muted-foreground/10" size={40} />
        <Icon name="Flag" className="absolute top-[1300px] left-1/4 text-muted-foreground/10" size={55} />
        <Icon name="Timer" className="absolute top-[250px] left-1/2 text-muted-foreground/10" size={48} />
        <Icon name="Rocket" className="absolute top-[1400px] right-20 text-muted-foreground/10" size={70} />
        <Icon name="Heart" className="absolute top-[850px] right-1/3 text-muted-foreground/10" size={42} />
        <Icon name="Shield" className="absolute top-[550px] right-1/2 text-muted-foreground/10" size={75} />
        <Icon name="Diamond" className="absolute top-[1500px] left-1/3 text-muted-foreground/10" size={38} />
        <Icon name="Trophy" className="absolute top-[1700px] right-1/4 text-muted-foreground/10" size={68} />
        <Icon name="Target" className="absolute top-[1900px] left-20 text-muted-foreground/10" size={52} />
        <Icon name="Star" className="absolute top-[2100px] right-10 text-muted-foreground/10" size={46} />
        <Icon name="Award" className="absolute top-[2300px] left-1/2 text-muted-foreground/10" size={78} />
        <Icon name="Medal" className="absolute top-[2500px] right-1/3 text-muted-foreground/10" size={58} />
        <Icon name="Crown" className="absolute top-[2700px] left-1/4 text-muted-foreground/10" size={64} />
        <Icon name="Zap" className="absolute top-[2900px] right-20 text-muted-foreground/10" size={72} />
        <Icon name="Flame" className="absolute top-[3100px] left-10 text-muted-foreground/10" size={44} />
        
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
      </div>

      <header className="bg-secondary border-b border-border shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-2xl font-bold text-accent">Рейтинг Букмекеров</h1>
            <Badge variant="outline" className="text-xs">Партнерский проект</Badge>
          </div>
        </div>
      </header>

      <div className="bg-muted py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <Icon name="Circle" className="text-accent" size={32} />
            <h2 className="text-3xl font-bold">Легальные букмекерские конторы</h2>
            <Icon name="Circle" className="text-accent" size={32} />
          </div>
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

        <div className="space-y-4">
          {filteredBookmakers.map((bk, index) => (
            <Card 
              key={bk.id} 
              className={`p-6 hover:shadow-lg transition-all relative ${index < 3 ? 'border-2 border-red-500' : ''} animate-in fade-in slide-in-from-bottom-4`}
              style={{ 
                animationDelay: `${index * 150}ms`,
                animationDuration: '500ms',
                animationFillMode: 'both'
              }}
            >
              {index < 3 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white rounded-full p-2 z-10">
                  <Icon name="Star" size={20} className="fill-white" />
                </div>
              )}
              <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
                <div className="lg:w-1/3 flex flex-col">
                  {(bk.id === 1 || bk.id === 2 || bk.id === 3 || bk.id === 4 || bk.id === 5 || bk.id === 6) && (
                    <div className="mb-3">
                      <img 
                        src={
                          bk.id === 1 
                            ? "https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/e2f36443-708d-4f6a-8306-cbbfcbb4668a.png"
                            : bk.id === 2
                            ? "https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/74bcc5ab-af45-435f-99f4-0beafea5f677.png"
                            : bk.id === 3
                            ? "https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/d56a441e-e2f5-4402-8134-152b3264f798.png"
                            : bk.id === 4
                            ? "https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/f948aba1-e94e-4d49-a651-7ee198bae5c2.png"
                            : bk.id === 5
                            ? "https://cdn.poehali.dev/files/8e047f42-e896-48db-b62c-a31e06e44850.jpg"
                            : "https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/caa91320-7d93-44b6-acd8-f896732946a0.png"
                        }
                        alt={bk.name}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    {bk.id !== 1 && bk.id !== 2 && bk.id !== 3 && bk.id !== 4 && bk.id !== 5 && bk.id !== 6 && (
                      <div className="bg-muted rounded-lg w-20 h-20 flex items-center justify-center text-3xl shrink-0">
                        {bk.logo}
                      </div>
                    )}
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
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1 text-center">Бонус</div>
                    <div className={`text-xl font-bold text-accent ${bk.id !== 6 ? 'flex justify-center' : ''}`}>
                      <span className="whitespace-nowrap">{bk.bonus}</span>
                    </div>
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

                <div className="flex flex-col gap-2 lg:w-48">
                  <Button className="w-full font-semibold">
                    Перейти на сайт
                    <Icon name="ExternalLink" size={16} className="ml-2" />
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    onClick={() => {
                      if (bk.id === 1) navigate('/betboom');
                      if (bk.id === 3) navigate('/fonbet');
                      if (bk.id === 5) navigate('/leon');
                      if (bk.id === 6) navigate('/winline');
                    }}
                  >
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
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>© 2026 Рейтинг Букмекеров. Информационный портал.</p>
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