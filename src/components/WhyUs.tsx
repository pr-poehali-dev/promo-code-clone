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
  <section className="mt-10 sm:mt-14">
    <div className="rounded-2xl bg-[hsl(var(--navy))] p-5 sm:p-10 text-white">
      <h2 className="text-xl sm:text-2xl font-bold mb-1 text-white">Почему нам можно доверять</h2>
      <p className="text-white/60 text-sm mb-5 sm:mb-6 max-w-2xl">
        Мы ведём рейтинг для игроков, а не для букмекеров.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {items.map((i) => (
          <div key={i.title} className="group flex flex-col gap-2 rounded-xl bg-white/5 p-3 sm:bg-transparent sm:p-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6 bg-white/10 flex items-center justify-center">
              <Icon name={i.icon} size={22} className="text-emerald-300" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold leading-tight text-white">{i.title}</h3>
            <p className="text-[11px] sm:text-xs text-white/60 leading-snug sm:leading-relaxed">{i.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs;