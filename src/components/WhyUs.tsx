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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
      <h2 className="text-2xl font-bold mb-1 text-white">Почему нам можно доверять</h2>
      <p className="text-white/60 text-sm mb-6 max-w-2xl">
        Мы ведём рейтинг для игроков, а не для букмекеров.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((i) => (
          <div key={i.title} className="flex flex-col gap-2">
            <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center">
              <Icon name={i.icon} size={22} className="text-accent" />
            </div>
            <h3 className="font-semibold text-white">{i.title}</h3>
            <p className="text-xs text-white/60 leading-relaxed">{i.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs;