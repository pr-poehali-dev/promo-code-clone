import Icon from '@/components/ui/icon';

const items = [
  {
    icon: 'ShieldCheck',
    title: 'Только легальные БК',
    text: 'В рейтинг попадают конторы с разрешением ФНС и подключением к ЕЦУПИС.',
  },
  {
    icon: 'Scale',
    title: 'Честное сравнение',
    text: 'Мы не поднимаем места за деньги — позиция зависит только от оценок по критериям.',
  },
  {
    icon: 'RefreshCw',
    title: 'Актуальные данные',
    text: 'Бонусы, коэффициенты и сроки выплат проверяем и обновляем каждый месяц.',
  },
  {
    icon: 'Users',
    title: 'Мнение игроков',
    text: 'Учитываем реальные отзывы: жалобы на выплаты сразу влияют на итоговый балл.',
  },
];

const WhyUs = () => (
  <section className="mt-14">
    <div className="rounded-xl border border-border bg-gradient-to-br from-secondary to-background p-6 sm:p-8">
      <h2 className="text-2xl font-bold mb-1">Почему нам можно доверять</h2>
      <p className="text-muted-foreground text-sm mb-6 max-w-2xl">
        Мы ведём рейтинг для игроков, а не для букмекеров.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((i) => (
          <div key={i.title} className="flex flex-col gap-2">
            <div className="w-11 h-11 rounded-lg bg-accent/15 flex items-center justify-center">
              <Icon name={i.icon} size={22} className="text-accent" />
            </div>
            <h3 className="font-semibold">{i.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{i.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs;
