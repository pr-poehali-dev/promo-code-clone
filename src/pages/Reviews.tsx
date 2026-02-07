import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
}

const names = [
  'Алексей', 'Дмитрий', 'Сергей', 'Андрей', 'Иван', 'Михаил', 'Максим', 'Артём',
  'Денис', 'Владимир', 'Роман', 'Павел', 'Олег', 'Егор', 'Кирилл', 'Антон',
  'Никита', 'Илья', 'Евгений', 'Александр'
];

const reviewTexts = [
  'Отличная букмекерская контора! Быстрый вывод средств, удобный интерфейс.',
  'Пользуюсь уже полгода, всё устраивает. Высокие коэффициенты.',
  'Регистрация прошла быстро, бонус получил сразу. Рекомендую!',
  'Хорошая линия, много событий. Приложение работает стабильно.',
  'Вывод денег занял всего пару часов. Очень доволен!',
  'Поддержка отвечает быстро, помогли разобраться с верификацией.',
  'Большой выбор ставок на футбол и киберспорт. Супер!',
  'Удобное мобильное приложение, ставлю прямо с телефона.',
  'Бонусная программа радует, кэшбэк приходит регулярно.',
  'Никаких проблем с выводом, всё честно и прозрачно.',
  'Live-ставки работают отлично, коэффициенты обновляются быстро.',
  'Интерфейс понятный даже для новичка. Начал с малых сумм.',
  'Промокод сработал, получил бонус на первый депозит.',
  'Пунктов приёма ставок много, можно пополнить счёт наличными.',
  'Широкая линия на все виды спорта. Всегда нахожу что-то интересное.',
  'Вывод без комиссий на карту. Очень удобно!',
  'Техподдержка помогла решить вопрос за 5 минут.',
  'Коэффициенты выше, чем у конкурентов. Проверял.',
  'Акции и бонусы постоянно обновляются. Выгодно!',
  'Быстрая регистрация, не требуют лишних документов.'
];

const generateReviews = (count: number, startId: number): Review[] => {
  const reviews: Review[] = [];
  for (let i = 0; i < count; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomText = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
    const randomRating = Math.floor(Math.random() * 2) + 4;
    const randomDaysAgo = Math.floor(Math.random() * 90) + 1;
    
    reviews.push({
      id: startId + i,
      author: randomName,
      rating: randomRating,
      date: `${randomDaysAgo} ${randomDaysAgo === 1 ? 'день' : randomDaysAgo < 5 ? 'дня' : 'дней'} назад`,
      text: randomText
    });
  }
  return reviews;
};

const Reviews = () => {
  const { bookmakerName } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>(generateReviews(20, 1));
  const [totalShown, setTotalShown] = useState(20);

  const loadMore = () => {
    const newReviews = generateReviews(20, totalShown + 1);
    setReviews([...reviews, ...newReviews]);
    setTotalShown(totalShown + 20);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary border-b border-border shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-accent">Отзывы о {bookmakerName}</h1>
              <p className="text-sm text-muted-foreground">Реальные отзывы пользователей</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
                    {review.author[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold">{review.author}</h3>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  {Array.from({ length: 5 - review.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-gray-300" />
                  ))}
                </div>
              </div>
              <p className="text-foreground leading-relaxed">{review.text}</p>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button onClick={loadMore} size="lg" variant="outline" className="min-w-[200px]">
            Смотреть еще
            <Icon name="ChevronDown" size={18} className="ml-2" />
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

export default Reviews;