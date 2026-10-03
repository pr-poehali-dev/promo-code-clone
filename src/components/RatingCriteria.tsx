import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const criteria = [
  {
    icon: 'ShieldCheck',
    title: 'Лицензия и надёжность',
    text: 'Проверяем разрешение ФНС, членство в ЕЦУПИС и историю споров с игроками.',
    weight: '25%',
  },
  {
    icon: 'Percent',
    title: 'Коэффициенты и маржа',
    text: 'Сравниваем котировки на топ-события: чем ниже маржа, тем выше балл.',
    weight: '20%',
  },
  {
    icon: 'Banknote',
    title: 'Скорость выплат',
    text: 'Замеряем фактическое время вывода на карту и электронные кошельки.',
    weight: '20%',
  },
  {
    icon: 'Smartphone',
    title: 'Сайт и приложение',
    text: 'Оцениваем удобство линии, работу Live-раздела и стабильность приложений.',
    weight: '15%',
  },
  {
    icon: 'Gift',
    title: 'Бонусы и условия',
    text: 'Смотрим не на размер бонуса, а на реальность его отыгрыша.',
    weight: '12%',
  },
  {
    icon: 'Headset',
    title: 'Поддержка игроков',
    text: 'Пишем в чат в разное время суток и фиксируем скорость и качество ответа.',
    weight: '8%',
  },
];

const RatingCriteria = () => (
  <section id="criteria" className="mt-10 sm:mt-14 scroll-mt-16">
    <div className="mb-5">
      <h2 className="text-xl sm:text-3xl font-extrabold mb-2 text-foreground">Как мы считаем рейтинг</h2>
      <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
        Итоговая оценка складывается из шести групп критериев. Данные пересматриваем
        ежемесячно, а также после каждой крупной жалобы игроков.
      </p>
    </div>

    <div className="-mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
      {criteria.map((c) => (
        <Card key={c.title} className="w-[78%] shrink-0 snap-start sm:w-auto p-5 rounded-2xl border-border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start gap-3">
            <div className="bg-[hsl(var(--violet))]/10 p-2 rounded-lg shrink-0">
              <Icon name={c.icon} size={20} className="text-[hsl(var(--violet))]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{c.title}</h3>
                <span className="text-[11px] text-[hsl(var(--violet))] font-bold">{c.weight}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{c.text}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </section>
);

export default RatingCriteria;