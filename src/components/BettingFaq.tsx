import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faq = [
  {
    q: 'Какая букмекерская контора считается легальной в России?',
    a: 'Легальной считается БК с разрешением ФНС, которая подключена к Единому центру учёта переводов интернет-ставок. Все конторы из нашего рейтинга работают в правовом поле и удерживают налог с выигрыша самостоятельно.',
  },
  {
    q: 'Нужна ли верификация перед выводом денег?',
    a: 'Да. Идентификация обязательна по закону: без неё вывод недоступен. Быстрее всего процедура проходит онлайн через ЕЦУПИС или Госуслуги — обычно от нескольких минут до суток.',
  },
  {
    q: 'Почему у бонуса такие сложные условия?',
    a: 'Бонус — это маркетинговый инструмент, а не подарок. Всегда смотрите на минимальный коэффициент, срок отыгрыша и максимальную сумму выигрыша. Часто фрибет на 3 000₽ выгоднее «бонуса» на 40 000₽.',
  },
  {
    q: 'Как быстро приходят выплаты?',
    a: 'В большинстве случаев вывод происходит моментально — деньги зачисляются на карту или кошелёк сразу после подтверждения заявки. Однако при подозрительной активности на счёте букмекер вправе запросить дополнительную проверку личности, и тогда выплата задержится до завершения проверки.',
  },
  {
    q: 'Можно ли зарабатывать на ставках стабильно?',
    a: 'Для абсолютного большинства игроков ставки — это развлечение с отрицательным математическим ожиданием из-за маржи букмекера. Планируйте бюджет заранее и не пытайтесь отыграться после проигрыша.',
  },
];

const BettingFaq = () => (
  <section id="faq" className="mt-10 sm:mt-14 scroll-mt-16">
    <h2 className="text-xl sm:text-3xl font-extrabold mb-2 text-foreground">Частые вопросы</h2>
    <p className="text-muted-foreground text-sm sm:text-base mb-5">
      Коротко о том, что чаще всего спрашивают начинающие игроки.
    </p>

    <Accordion
      type="single"
      collapsible
      className="w-full rounded-2xl bg-white px-4 sm:px-5 shadow-sm ring-1 ring-border"
    >
      {faq.map((item, i) => (
        <AccordionItem key={item.q} value={`item-${i}`}>
          <AccordionTrigger className="text-left text-[15px] sm:text-base text-secondary-foreground">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

export default BettingFaq;