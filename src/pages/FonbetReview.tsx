import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface RatingCategory {
  name: string;
  score: number;
  maxScore: number;
}

const FonbetReview = () => {
  const navigate = useNavigate();

  const topCategories = [
    'Букмекерские конторы с бонусами в России 2026',
    'Лучшие легальные букмекерские конторы',
    'Букмекерские конторы для ставок на футбол в 2026 году',
    'Букмекерские конторы с пунктами приема ставок'
  ];

  const pros = [
    'Надежная легальная букмекерская контора',
    'Большая сеть пунктов приема ставок по всей России',
    'Бонус до 15 000 рублей без депозита',
    'Регулярные акции и бонусы для постоянных клиентов',
    'Широкая линия на все виды спорта',
    'Качественные live-трансляции матчей'
  ];

  const cons = [
    'Обязательная идентификация через ЦУПИС',
    'Не самые высокие коэффициенты на популярные события',
    'Ограничения для профессиональных игроков'
  ];

  const generalInfo = [
    { label: 'Маржа', value: '5-6%' },
    { label: 'Выкуп ставки', value: 'Есть' },
    { label: 'Статус', value: 'Легальный' },
    { label: 'Вывод денег', value: 'До 3 дней' }
  ];

  const ratings: RatingCategory[] = [
    { name: 'Линия в прематче', score: 5, maxScore: 5 },
    { name: 'Линия в лайве', score: 5, maxScore: 5 },
    { name: 'Коэффициенты', score: 4, maxScore: 5 },
    { name: 'Удобство платежей', score: 5, maxScore: 5 },
    { name: 'Служба поддержки', score: 5, maxScore: 5 },
    { name: 'Надежность', score: 5, maxScore: 5 },
    { name: 'Бонусы и акции', score: 5, maxScore: 5 },
    { name: 'Интерфейс/Фичи', score: 4, maxScore: 5 }
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
            <h1 className="text-3xl font-bold">Fonbet</h1>
            <p className="text-primary-foreground/80 mt-1">Букмекерская контора: обзор и отзывы</p>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-primary to-accent py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="p-8 bg-card/95 backdrop-blur">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="text-left">
                <div className="mb-4">
                  <img 
                    src="https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/7b16f118-18f8-465f-af61-6fb278326782.png"
                    alt="Fonbet"
                    className="w-24 h-24 rounded-lg"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-2">Fonbet</h2>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={20} />
                  <span className="text-2xl font-bold">4.9</span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="Globe" size={16} />
                    <span>fonbet.ru</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircle" size={16} className="text-green-600" />
                    <span>Лицензия: Есть</span>
                  </div>
                </div>
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
              Fonbet — одна из старейших и наиболее надежных букмекерских контор в России. 
              Компания работает с 1994 года и имеет официальную лицензию ФНС РФ.
            </p>
            <p className="mb-3">
              Букмекер предлагает широчайшую линию ставок на все виды спорта: футбол, хоккей, 
              баскетбол, теннис, киберспорт и многое другое. Доступны прематч и live-ставки 
              с качественными трансляциями.
            </p>
            <p>
              Fonbet известен надежностью, большой сетью ППС по всей России и регулярными 
              акциями. Новым клиентам предоставляется бонус до 15 000 рублей без депозита.
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

        <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => navigate('/reviews/Fonbet')}
            className="gap-2"
          >
            Смотреть отзывы
            <Icon name="MessageSquare" size={18} />
          </Button>
          <Button 
            size="lg"
            onClick={() => navigate('/')}
            variant="outline"
            className="gap-2"
          >
            <Icon name="ArrowLeft" size={16} />
            Вернуться к списку букмекеров
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

export default FonbetReview;