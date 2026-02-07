import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface RatingCategory {
  name: string;
  score: number;
  maxScore: number;
}

const WinlineReview = () => {
  const navigate = useNavigate();

  const topCategories = [
    'Букмекерские конторы с бонусами в России 2026',
    'Лучшие букмекерские конторы для новичков',
    'Букмекерские конторы для ставок на футбол в 2026 году',
    'Букмекерские конторы с быстрой регистрацией'
  ];

  const pros = [
    'Простая и быстрая регистрация',
    'Приветственный фрибет 3000 рублей',
    'Быстрая верификация аккаунта',
    'Служба поддержки работает 24/7',
    'Удобный интерфейс для новичков',
    'Стабильная работа сайта и приложения'
  ];

  const cons = [
    'Не самые высокие коэффициенты',
    'Ограниченная линия по сравнению с конкурентами',
    'Меньше акций и бонусов'
  ];

  const generalInfo = [
    { label: 'Маржа', value: '5-7%' },
    { label: 'Выкуп ставки', value: 'Есть' },
    { label: 'Статус', value: 'Легальный' },
    { label: 'Вывод денег', value: 'До 24 часов' }
  ];

  const ratings: RatingCategory[] = [
    { name: 'Линия в прематче', score: 4, maxScore: 5 },
    { name: 'Линия в лайве', score: 4, maxScore: 5 },
    { name: 'Коэффициенты', score: 3, maxScore: 5 },
    { name: 'Удобство платежей', score: 5, maxScore: 5 },
    { name: 'Служба поддержки', score: 5, maxScore: 5 },
    { name: 'Надежность', score: 5, maxScore: 5 },
    { name: 'Бонусы и акции', score: 4, maxScore: 5 },
    { name: 'Интерфейс/Фичи', score: 5, maxScore: 5 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Winline</h1>
            <p className="text-primary-foreground/80 mt-1">Букмекерская контора: обзор и отзывы</p>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-primary to-accent py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="p-8 bg-card/95 backdrop-blur">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="text-center md:text-left flex-1">
                <div className="mb-4">
                  <div className="w-24 h-24 mx-auto md:mx-0 rounded-lg bg-orange-500 flex items-center justify-center text-5xl">
                    💎
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Winline</h2>
                <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                  <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={20} />
                  <span className="text-2xl font-bold">4.5</span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Icon name="Globe" size={16} />
                    <span>winline.ru</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Icon name="CheckCircle" size={16} className="text-green-600" />
                    <span>Лицензия: Есть</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <a 
                  href="https://winline.ru" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img 
                    src="https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/caa91320-7d93-44b6-acd8-f896732946a0.png"
                    alt="Фрибет 3000 новым игрокам"
                    className="w-full h-auto"
                  />
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Общая информация</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {generalInfo.map((item, index) => (
              <Card key={index} className="p-4 text-center">
                <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                <div className="font-bold text-lg">{item.value}</div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Детальный рейтинг</h2>
          <Card className="p-6">
            <div className="space-y-4">
              {ratings.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.score}/{category.maxScore}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all"
                      style={{ width: `${(category.score / category.maxScore) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="ThumbsUp" className="text-green-600" />
              Преимущества
            </h2>
            <ul className="space-y-2">
              {pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Icon name="Check" className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="ThumbsDown" className="text-red-600" />
              Недостатки
            </h2>
            <ul className="space-y-2">
              {cons.map((con, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Icon name="X" className="text-red-600 mt-0.5 flex-shrink-0" size={16} />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">О компании</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-3">
              Winline — легальная букмекерская контора в России, работающая с лицензией ФНС. 
              Компания специализируется на простоте и удобстве для начинающих игроков.
            </p>
            <p className="mb-3">
              Букмекер предлагает ставки на основные виды спорта: футбол, хоккей, баскетбол, 
              теннис. Доступны прематч и live-ставки с удобным интерфейсом.
            </p>
            <p>
              Winline известен быстрой регистрацией, круглосуточной поддержкой и надежностью. 
              Новым игрокам предоставляется приветственный фрибет 3000 рублей.
            </p>
          </div>
        </Card>

        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Топ подборки</h2>
          <ul className="space-y-2">
            {topCategories.map((category, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Trophy" size={16} className="text-accent" />
                <span>{category}</span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="text-center">
          <Button 
            size="lg" 
            onClick={() => navigate('/reviews/Winline')}
            className="gap-2"
          >
            Смотреть отзывы
            <Icon name="MessageSquare" size={18} />
          </Button>
        </div>
      </main>

      <footer className="bg-muted border-t py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4">
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

export default WinlineReview;
