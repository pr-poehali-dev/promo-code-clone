import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface RatingCategory {
  name: string;
  score: number;
  maxScore: number;
}

const BetboomReview = () => {
  const navigate = useNavigate();

  const topCategories = [
    'Букмекерские конторы с бонусами в России 2026',
    'Лучшие букмекерские конторы для ставок на киберспорт',
    'Букмекерские конторы для ставок на футбол в 2026 году',
    'Букмекерские конторы со ставками в формате live в 2026'
  ];

  const pros = [
    'Широкий выбор ставок на киберспортивные события',
    'Раздел с мини-играми',
    'Большую сеть ППС по всей России',
    'Приветственный бонус до 10 000 рублей',
    'Большое количество онлайн-трансляций на сайте',
    'Быстрый вывод средств'
  ];

  const cons = [
    'Возможное снижение лимита на ставки в качестве индивидуальной санкции',
    'Не реализована система самоограничений',
    'Нерегулярное обновление сторис',
    'Ограниченный функционал веб-версии: часть функций доступна лишь в приложении'
  ];

  const generalInfo = [
    { label: 'Маржа', value: '4-5%' },
    { label: 'Выкуп ставки', value: 'Есть' },
    { label: 'Статус', value: 'Легальный' },
    { label: 'Вывод денег', value: 'Мгновенно' }
  ];

  const ratings: RatingCategory[] = [
    { name: 'Линия в прематче', score: 4, maxScore: 5 },
    { name: 'Линия в лайве', score: 4, maxScore: 5 },
    { name: 'Коэффициенты', score: 4, maxScore: 5 },
    { name: 'Удобство платежей', score: 5, maxScore: 5 },
    { name: 'Служба поддержки', score: 5, maxScore: 5 },
    { name: 'Надежность', score: 5, maxScore: 5 },
    { name: 'Бонусы и акции', score: 4, maxScore: 5 },
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
            <h1 className="text-3xl font-bold">BetBoom</h1>
            <p className="text-primary-foreground/80 mt-1">Букмекерская контора: обзор и отзывы</p>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-primary to-accent py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="p-8 bg-card/95 backdrop-blur">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="text-center md:text-left flex-1">
                <div className="text-6xl mb-4">🎰</div>
                <h2 className="text-2xl font-bold mb-2">BetBoom</h2>
                <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                  <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={20} />
                  <span className="text-2xl font-bold">5.0</span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Icon name="Globe" size={16} />
                    <span>betboom.ru</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Icon name="CheckCircle" size={16} className="text-green-600" />
                    <span>Лицензия: Есть</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Icon name="Wallet" size={16} />
                    <span>Мин. депозит: 100 ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Места в рейтингах (6)</h2>
          <Card className="p-6">
            <div className="grid gap-3">
              {topCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent text-accent-foreground w-10 h-10 rounded flex items-center justify-center font-bold">
                      6
                    </div>
                    <span className="text-sm">{category}</span>
                  </div>
                  <Icon name="ExternalLink" size={16} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Плюсы и минусы</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="font-bold mb-4 text-green-600 flex items-center gap-2">
                <Icon name="ThumbsUp" size={20} />
                Плюсы
              </h3>
              <ul className="space-y-3">
                {pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Icon name="Check" size={16} className="text-green-600 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-4 text-red-600 flex items-center gap-2">
                <Icon name="ThumbsDown" size={20} />
                Минусы
              </h3>
              <ul className="space-y-3">
                {cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Icon name="X" size={16} className="text-red-600 shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Общая информация</h2>
          <Card className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {generalInfo.map((info, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded">
                  <span className="text-muted-foreground">{info.label}</span>
                  <span className="font-semibold">{info.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Оценка экспертов</h2>
          <Card className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {ratings.map((rating, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{rating.name}</span>
                    <span className="font-bold">
                      {rating.score} / {rating.maxScore}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all"
                      style={{ width: `${(rating.score / rating.maxScore) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="text-center">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="gap-2"
          >
            <Icon name="ArrowLeft" size={16} />
            Вернуться к списку букмекеров
          </Button>
        </section>
      </main>
    </div>
  );
};

export default BetboomReview;