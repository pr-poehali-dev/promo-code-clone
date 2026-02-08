import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface RatingCategory {
  name: string;
  score: number;
  maxScore: number;
}

const MelbetReview = () => {
  const navigate = useNavigate();

  const topCategories = [
    'Букмекерские конторы с низким минимальным депозитом',
    'Лучшие БК для киберспорта 2026',
    'Букмекерские конторы с онлайн-казино',
    'БК с промокодами и фрибетами'
  ];

  const pros = [
    'Минимальный депозит всего 50 рублей',
    'Отличная линия по киберспорту',
    'Встроенное онлайн-казино',
    'Приветственный бонус до 30 000₽',
    'Регулярные промокоды и акции',
    'Мобильное приложение для iOS и Android'
  ];

  const cons = [
    'Интерфейс может показаться перегруженным',
    'Средняя скорость вывода средств',
    'Не всегда стабильная работа в часы пик'
  ];

  const generalInfo = [
    { label: 'Маржа', value: '5-7%' },
    { label: 'Выкуп ставки', value: 'Есть' },
    { label: 'Статус', value: 'Легальный' },
    { label: 'Вывод денег', value: 'До 72 часов' }
  ];

  const ratings: RatingCategory[] = [
    { name: 'Линия в прематче', score: 4, maxScore: 5 },
    { name: 'Линия в лайве', score: 4, maxScore: 5 },
    { name: 'Коэффициенты', score: 4, maxScore: 5 },
    { name: 'Удобство платежей', score: 5, maxScore: 5 },
    { name: 'Служба поддержки', score: 4, maxScore: 5 },
    { name: 'Надежность', score: 4, maxScore: 5 },
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
            <h1 className="text-3xl font-bold">Melbet</h1>
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
                    src="https://cdn.poehali.dev/projects/a62754ae-1012-417c-a1c5-8b7da123f178/bucket/98d00b0c-3ead-488d-b70c-eb83b808115f.png"
                    alt="Melbet"
                    className="w-32 h-32 rounded-lg object-contain"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-2">Melbet</h2>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={20} />
                  <span className="text-2xl font-bold">4.7</span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="Globe" size={16} />
                    <span>melbet.ru</span>
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

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Общая информация</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {generalInfo.map((item, index) => (
              <Card key={index} className="p-4 text-center">
                <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                <div className="font-bold text-lg">{item.value}</div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-6">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Icon name="Info" className="text-accent" />
            О букмекерской конторе Melbet
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Melbet — популярная букмекерская контора с одним из самых низких минимальных депозитов на рынке (всего 50 рублей). 
            Особенно хороша линия по киберспорту и наличие встроенного онлайн-казино. 
            Приветственный бонус до 30 000 рублей и регулярные промокоды делают игру выгодной для всех категорий игроков. 
            Букмекер имеет лицензию ФНС России и работает легально на территории РФ.
          </p>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-600">
              <Icon name="ThumbsUp" />
              Преимущества
            </h3>
            <ul className="space-y-2">
              {pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-green-600 mt-0.5 shrink-0" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-600">
              <Icon name="ThumbsDown" />
              Недостатки
            </h3>
            <ul className="space-y-2">
              {cons.map((con, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Icon name="X" size={20} className="text-red-600 mt-0.5 shrink-0" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-2xl font-bold mb-6">Детальная оценка</h3>
          <div className="space-y-4">
            {ratings.map((rating, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{rating.name}</span>
                  <span className="text-muted-foreground">{rating.score}/{rating.maxScore}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent transition-all"
                    style={{ width: `${(rating.score / rating.maxScore) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-accent/5 border-accent">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon name="Trophy" className="text-accent" />
            Топовые категории
          </h3>
          <ul className="space-y-2">
            {topCategories.map((category, index) => (
              <li key={index} className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Trophy" size={16} className="text-accent" />
                <span>{category}</span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => navigate('/reviews/Melbet')}
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

export default MelbetReview;